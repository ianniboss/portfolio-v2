"""Admin endpoint tests - token-gated inbox: login, list, stats, delete + asset reachability."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
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

ADMIN_TOKEN = "ian-portfolio-2026"


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def auth_headers():
    return {"x-admin-token": ADMIN_TOKEN, "Content-Type": "application/json"}


# ---------- Admin login ----------
class TestAdminLogin:
    def test_login_valid_token(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"token": ADMIN_TOKEN})
        assert r.status_code == 200, r.text
        assert r.json() == {"ok": True}

    def test_login_invalid_token(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={"token": "WRONG"})
        assert r.status_code == 401

    def test_login_missing_token(self, api):
        r = api.post(f"{BASE_URL}/api/admin/login", json={})
        assert r.status_code == 401


# ---------- Admin list contact ----------
class TestAdminContact:
    def test_list_without_token_returns_401(self, api):
        r = api.get(f"{BASE_URL}/api/admin/contact")
        assert r.status_code == 401

    def test_list_with_wrong_token_returns_401(self, api):
        r = requests.get(f"{BASE_URL}/api/admin/contact", headers={"x-admin-token": "nope"})
        assert r.status_code == 401

    def test_list_with_valid_token(self, auth_headers):
        # seed at least one message via public endpoint
        seed = {
            "name": "TEST_AdminSeed",
            "email": "test_adminseed@example.com",
            "message": "admin seed message",
        }
        rc = requests.post(f"{BASE_URL}/api/contact", json=seed)
        assert rc.status_code == 201
        seeded_id = rc.json()["id"]
        pytest.seeded_admin_id = seeded_id

        r = requests.get(f"{BASE_URL}/api/admin/contact?limit=200", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # Newly created should be on top (desc by created_at)
        timestamps = [m["created_at"] for m in data]
        assert timestamps == sorted(timestamps, reverse=True)
        # _id not leaked
        for m in data:
            assert "_id" not in m
        # Find seeded item
        assert any(m["id"] == seeded_id for m in data)


# ---------- Admin stats ----------
class TestAdminStats:
    def test_stats_without_token(self, api):
        r = api.get(f"{BASE_URL}/api/admin/stats")
        assert r.status_code == 401

    def test_stats_with_token(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert set(data.keys()) == {"total", "last_24h", "last_7d"}
        assert isinstance(data["total"], int)
        assert data["total"] >= 1
        assert data["last_24h"] <= data["total"]
        assert data["last_7d"] <= data["total"]
        assert data["last_24h"] <= data["last_7d"]

    def test_post_contact_increments_stats(self, auth_headers):
        before = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers).json()
        rc = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "TEST_StatsBumper",
                "email": "test_stats_bumper@example.com",
                "message": "stats bump test",
            },
        )
        assert rc.status_code == 201
        pytest.stats_bump_id = rc.json()["id"]
        after = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers).json()
        assert after["total"] == before["total"] + 1
        assert after["last_24h"] >= before["last_24h"] + 1


# ---------- Admin delete ----------
class TestAdminDelete:
    def test_delete_without_token(self, api):
        r = api.delete(f"{BASE_URL}/api/admin/contact/some-id")
        assert r.status_code == 401

    def test_delete_nonexistent_returns_404(self, auth_headers):
        r = requests.delete(
            f"{BASE_URL}/api/admin/contact/00000000-0000-0000-0000-000000000000",
            headers=auth_headers,
        )
        assert r.status_code == 404

    def test_delete_deletes_only_matched(self, auth_headers):
        # Create 2 messages
        a = requests.post(
            f"{BASE_URL}/api/contact",
            json={"name": "TEST_DelA", "email": "test_dela@example.com", "message": "A"},
        ).json()
        b = requests.post(
            f"{BASE_URL}/api/contact",
            json={"name": "TEST_DelB", "email": "test_delb@example.com", "message": "B"},
        ).json()

        r = requests.delete(
            f"{BASE_URL}/api/admin/contact/{a['id']}", headers=auth_headers
        )
        assert r.status_code == 200
        assert r.json()["deleted"] == a["id"]

        # Verify A gone, B still present
        all_msgs = requests.get(
            f"{BASE_URL}/api/admin/contact?limit=500", headers=auth_headers
        ).json()
        ids = [m["id"] for m in all_msgs]
        assert a["id"] not in ids
        assert b["id"] in ids

        # Cleanup B
        requests.delete(f"{BASE_URL}/api/admin/contact/{b['id']}", headers=auth_headers)

        # Re-delete A -> 404
        r2 = requests.delete(
            f"{BASE_URL}/api/admin/contact/{a['id']}", headers=auth_headers
        )
        assert r2.status_code == 404


# ---------- Static assets via REACT_APP_BACKEND_URL ----------
class TestStaticAssets:
    def test_portrait_image_reachable(self):
        r = requests.get(f"{BASE_URL}/assets/ian-portrait.jpg", timeout=15)
        assert r.status_code == 200, f"portrait unreachable: {r.status_code}"
        ctype = r.headers.get("content-type", "")
        assert "image" in ctype or len(r.content) > 1000

    def test_cv_pdf_reachable(self):
        r = requests.get(
            f"{BASE_URL}/assets/Ian_Bin_Syahrul_Azlan_CV.pdf", timeout=15
        )
        assert r.status_code == 200, f"cv pdf unreachable: {r.status_code}"
        # PDF magic header
        assert r.content[:4] == b"%PDF" or len(r.content) > 1000


# ---------- Cleanup TEST_ prefixed data ----------
class TestCleanup:
    def test_cleanup_test_messages(self, auth_headers):
        msgs = requests.get(
            f"{BASE_URL}/api/admin/contact?limit=500", headers=auth_headers
        ).json()
        deleted = 0
        for m in msgs:
            if m.get("name", "").startswith("TEST_"):
                r = requests.delete(
                    f"{BASE_URL}/api/admin/contact/{m['id']}", headers=auth_headers
                )
                if r.status_code == 200:
                    deleted += 1
        # Just informational - at least one deletion expected
        assert deleted >= 1
