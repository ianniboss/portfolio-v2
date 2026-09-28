# Ian Bin Syahrul Azlan — Developer Portfolio (v2)

A bilingual (EN/FR) developer portfolio built as a React SPA, showcasing projects, skills, and a CNRS internship case study.

**Live site:** [https://portfolio-v2-bay-two.vercel.app](https://portfolio-v2-bay-two.vercel.app)

## Tech Stack
* **Frontend:** React (client-rendered SPA), Tailwind CSS
* **3D & Animations:** Three.js for 3D backgrounds (Hero scene, contact particles), Framer Motion for animations and scroll-driven interactions
* **Internationalization:** Custom i18n Context for EN/FR bilingual support
* **Backend:** Python/FastAPI backend (deployed separately on Render) for the contact form

## Key Features
* Bilingual content throughout (English and French)
* Animated 3D hero and skills visualization
* A scroll-expansion case-study section for the CNRS internship
* A project showcase with flip-card interactions
* A working contact form

## Local Setup

### Frontend
```bash
cd frontend
yarn install
yarn start
```
*(The frontend runs via `craco start` as configured in `package.json`.)*

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```
*(Alternatively, run `python server.py` depending on the setup in `server.py`.)*

## Design System
Please refer to `design_guidelines.json` as the source of truth for colors, typography, and spacing tokens used throughout the application.
