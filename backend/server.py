from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Ian Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# =========================
# Models
# =========================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)
    locale: Optional[str] = Field(default="en")


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    locale: str = "en"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =========================
# Routes
# =========================
@api_router.get("/")
async def root():
    return {"message": "Ian Portfolio API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as exc:
        logging.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail="Could not save message")
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 50):
    limit = max(1, min(limit, 200))
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for m in messages:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return messages


# =========================
# Admin (token-protected)
# =========================
def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected:
        raise HTTPException(status_code=503, detail="Admin token not configured")
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


class AdminStats(BaseModel):
    total: int
    last_24h: int
    last_7d: int


@api_router.post("/admin/login")
async def admin_login(payload: dict):
    """Lightweight check so the frontend can validate the token before
    showing the inbox. Returns 200 on success, 401 on bad token."""
    token = (payload or {}).get("token", "")
    expected = os.environ.get("ADMIN_TOKEN", "").strip()
    if not expected:
        raise HTTPException(status_code=503, detail="Admin token not configured")
    if token != expected:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return {"ok": True}


@api_router.get("/admin/contact", response_model=List[ContactMessage])
async def admin_list_messages(
    limit: int = 200,
    _: bool = Depends(require_admin),
):
    limit = max(1, min(limit, 500))
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for m in messages:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return messages


@api_router.get("/admin/stats", response_model=AdminStats)
async def admin_stats(_: bool = Depends(require_admin)):
    from datetime import timedelta
    now = datetime.now(timezone.utc)
    iso_24h = (now - timedelta(hours=24)).isoformat()
    iso_7d = (now - timedelta(days=7)).isoformat()
    total = await db.contact_messages.count_documents({})
    last_24h = await db.contact_messages.count_documents({"created_at": {"$gte": iso_24h}})
    last_7d = await db.contact_messages.count_documents({"created_at": {"$gte": iso_7d}})
    return AdminStats(total=total, last_24h=last_24h, last_7d=last_7d)


@api_router.delete("/admin/contact/{message_id}")
async def admin_delete_message(message_id: str, _: bool = Depends(require_admin)):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"ok": True, "deleted": message_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
