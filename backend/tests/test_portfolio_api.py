"""Portfolio backend API tests - covers health, contact create/list, validation."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback: read frontend .env if env var not propagated to pytest
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip()
                    break
    except Exception:
        pass

BASE_URL = (BASE_URL or "").rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL is not configured"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_returns_ok_message(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert "running" in data["message"].lower() or "ok" in data["message"].lower()


# ---------- Contact create / validation / list ----------
class TestContact:
    def test_create_contact_success(self, api):
        payload = {
            "name": "TEST_Ian Reviewer",
            "email": "test_ian_reviewer@example.com",
            "message": "Hello Ian, this is a test message from the backend pytest suite.",
            "locale": "en",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        # data assertions
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert data["locale"] == "en"
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert "created_at" in data
        # store for next test
        pytest.created_contact_id = data["id"]
        pytest.created_contact_email = data["email"]

    def test_create_contact_default_locale(self, api):
        payload = {
            "name": "TEST_NoLocale",
            "email": "test_nolocale@example.com",
            "message": "Locale default check.",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 201, r.text
        assert r.json()["locale"] == "en"

    def test_invalid_email_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "TEST_BadEmail", "email": "not-an-email", "message": "hello world"},
        )
        assert r.status_code == 422

    def test_missing_name_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"email": "test_missing_name@example.com", "message": "hello world"},
        )
        assert r.status_code == 422

    def test_missing_message_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "TEST_NoMsg", "email": "test_nomsg@example.com"},
        )
        assert r.status_code == 422

    def test_empty_name_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={"name": "", "email": "test_empty@example.com", "message": "hello"},
        )
        assert r.status_code == 422

    def test_message_too_long_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_Long",
                "email": "test_long@example.com",
                "message": "x" * 4001,
            },
        )
        assert r.status_code == 422

    def test_name_too_long_returns_422(self, api):
        r = api.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "x" * 121,
                "email": "test_longname@example.com",
                "message": "ok",
            },
        )
        assert r.status_code == 422

    def test_list_contacts_returns_recent_first(self, api):
        r = api.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 2  # at least the two we created
        # The most recent created should be at index 0; verify recently created email is in top results
        emails = [m.get("email") for m in data[:10]]
        assert "test_ian_reviewer@example.com" in emails

        # Verify ordering descending by created_at
        timestamps = [m["created_at"] for m in data]
        sorted_desc = sorted(timestamps, reverse=True)
        assert timestamps == sorted_desc

        # Ensure _id is never leaked
        for m in data:
            assert "_id" not in m

    def test_list_contacts_respects_limit(self, api):
        r = api.get(f"{BASE_URL}/api/contact", params={"limit": 1})
        assert r.status_code == 200
        assert len(r.json()) <= 1
