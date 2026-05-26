# Ian Bin Syahrul Azlan — 3D Dynamic Portfolio

## Original problem statement
Build Ian's 3D dynamic developer portfolio (junior dev, Malaysia → Toulouse, seeking alternance Sept 2026). Theme: "developer from two worlds". Stack adapted to Emergent platform: CRA (JS) + FastAPI + MongoDB.

## Architecture (current)
- **Backend** (`/app/backend/server.py`): FastAPI exposing `/api/`, `/api/contact` (POST/GET), legacy `/api/status`. MongoDB via Motor. Contact messages stored in `contact_messages` collection.
- **Frontend** (`/app/frontend/src/`): CRA, Tailwind, Shadcn UI tokens overridden for dark/amber/teal palette. Components: Navbar, Hero (R3F floating icosahedrons + name typing), About (portrait + dot-matrix globe with Malaysia→France arc), Skills (3D orb cloud), Projects (3D-flip cards), Experience (timeline), Contact (form over particle field), Footer, CustomCursor.
- **i18n**: Bilingual EN/FR via `I18nContext`, persisted in localStorage.
- **3D libs**: three, @react-three/fiber, @react-three/drei.
- **Animation**: framer-motion + lenis smooth scroll.
- **Fonts**: Cabinet Grotesk + Satoshi (Fontshare), JetBrains Mono (Google Fonts).

## User personas
- Recruiter / Alternance hiring manager in France (primary).
- Fellow developers exploring Ian's work.

## Core requirements (static)
1. Bilingual EN/FR portfolio with persistent toggle.
2. CV-faithful content (skills, projects, experience).
3. R3F-driven 3D experiences (hero, globe, skills cloud, contact particles).
4. Contact form persisting to MongoDB.
5. Accessible (focus rings, prefers-reduced-motion, ARIA labels on canvases).
6. Mobile responsive.

## Implemented (2026-05-26)
- All sections shipped and rendering cleanly (verified via screenshots + testing agent: 100% backend, 100% frontend).
- R3F + @emergentbase/visual-edits compatibility patch applied to `@react-three/fiber` (skip `x-*` props in applyProps).
- aria-pressed added to locale toggle.
- Backend pytest suite at `/app/backend/tests/test_portfolio_api.py` (11/11 pass).
- Project cards use procedural CSS gradient covers (no external images required).

## Prioritized backlog (P0 / P1 / P2)
- **P1 — Real assets**: Replace placeholder portrait with Ian's actual photo; add real GitHub/LinkedIn URLs (currently set to expected handles) and resume PDF link.
- **P1 — Admin view for messages**: Lightweight `/admin` route (basic-auth or token) to view incoming contact messages without touching the DB directly.
- **P2 — Project links**: When repos go public, wire GitHub/demo URLs into project card backs.
- **P2 — SEO**: react-helmet-async to drive per-section meta + sitemap.
- **P2 — Resume download**: Host the alternance CV PDF on `/cv.pdf` and link it from the navbar.
- **P2 — Analytics**: Plausible or Umami for visit insights.
- **P2 — Anti-spam**: Honeypot + rate-limit on `POST /api/contact`.

## Next tasks
1. Swap in Ian's real photo and links once provided.
2. Add a simple admin gate for the messages inbox.
3. Add resume PDF + meta tags.
