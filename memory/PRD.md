# Ian Bin Syahrul Azlan — 3D Dynamic Portfolio

## Original problem statement
Build Ian's 3D dynamic developer portfolio (junior dev, Malaysia → Toulouse, seeking alternance Sept 2026). Theme: "developer from two worlds". Stack adapted to Emergent platform: CRA (JS) + FastAPI + MongoDB.

## Architecture (current)
- **Backend** (`/app/backend/server.py`): FastAPI exposing `/api/`, `/api/contact` (POST/GET), `/api/admin/login`, `/api/admin/contact`, `/api/admin/stats`, `/api/admin/contact/{id}` (DELETE). Admin endpoints guarded by `x-admin-token` header against `ADMIN_TOKEN` in `.env`.
- **Frontend** (`/app/frontend/src/`): CRA, Tailwind, React Router with `/` (Home) and `/admin` (Inbox). I18n EN/FR via `I18nContext`. 3D via three + @react-three/fiber + @react-three/drei. ErrorBoundary wraps all canvases.
- **Assets** (`/app/frontend/public/assets/`):
  - `ian-portrait.jpg` — real photo (compressed JPG, 416 kB).
  - `Ian_Bin_Syahrul_Azlan_CV.pdf` — alternance CV.

## Implemented (2026-05-26 → 2026-05-27)
- All sections shipped (Hero, About w/ portrait + globe, Skills, Projects, Experience, Contact). Bilingual EN/FR.
- R3F + visual-edits compatibility patch on `@react-three/fiber`.
- Backend pytest 11/11 + frontend 100% in iteration 1.
- ErrorBoundary safety net on all 3D scenes.
- **2026-05-27**: Real portrait + CV PDF + correct GitHub (`https://github.com/ianniboss`). CV link added to nav (desktop & mobile) and footer. Admin inbox at `/admin` (token-protected: list, search, view detail, reply via mailto, delete, stats: total/24h/7d).

## Test credentials
- Admin token: `ian-portfolio-2026` (in `backend/.env`).
- Routes: `/` (public), `/admin` (token-gated).

## Prioritized backlog (P0 / P1 / P2)
- **P1 — Resend/SendGrid email notifications** so Ian gets emailed on new contact submissions (currently DB-only).
- **P1 — Anti-spam**: honeypot field + simple rate-limit (5 msg / 15 min / IP) on `POST /api/contact`.
- **P2 — Project links**: wire real GitHub repo URLs into project card backs when repos go public.
- **P2 — SEO**: react-helmet-async, sitemap, OG image.
- **P2 — Analytics**: Plausible / Umami.
- **P2 — Mark as read** state on admin messages.
- **P2 — Sticky "Hire me" CTA** on scroll.

## Next tasks
1. Hook contact form into Resend (needs API key from user) to notify Ian.
2. Add honeypot + rate-limit on `POST /api/contact`.
3. Wire real GitHub repo URLs onto project cards.
