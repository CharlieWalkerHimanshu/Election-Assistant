# 🧭 Election Navigator – AI-Powered Voting Assistant

> Making elections accessible — especially for first-time voters.

Election Navigator is an AI-powered assistant that simplifies the election process by providing step-by-step voting guidance, interactive election timelines, and AI-powered Q&A support.

---

## 🚀 Overview

| Module | Description |
|---|---|
| 🧭 **Guided Voting Flow** | Decision-tree wizard — eligibility → registration → polling booth → voting day |
| 📅 **Election Timeline** | Interactive horizontal timeline with hover-to-expand details |
| 🤖 **AI Assistant** | Context-aware Q&A grounded with structured election data |
| 📍 **Location-based Info** | Find voting instructions by region _(optional, Phase 4)_ |

---

## ✨ Features

### 🧭 Guided Voting Flow
- Eligibility check ("Are you 18+? Are you a citizen?")
- Registration steps with document checklist
- Required documents list
- Voting day instructions

### 📅 Election Timeline
- Registration phase
- Campaign period
- Voting days
- Result declaration

### 🤖 AI Assistant
- Answers election-related queries in natural language
- Context-aware responses using a structured knowledge base (never just raw GPT)
- Fallback message for out-of-scope questions

### 📍 Location-based Info _(Optional)_
- Find voting-related instructions by city / PIN code

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite) + Tailwind CSS + TypeScript |
| **Backend** | Node.js + Express.js + TypeScript |
| **AI** | Google Gemini API (gemini-2.0-flash) |
| **Backend Deployment** | Render (Docker, Free tier) |
| **Frontend Deployment** | Vercel |

---

## 📁 Project Structure

```
election-navigator/
├── backend/
│   ├── src/
│   │   ├── app.ts                      # Express app factory
│   │   ├── server.ts                   # Entry point + graceful shutdown
│   │   ├── controllers/
│   │   │   ├── aiController.ts
│   │   │   ├── timelineController.ts
│   │   │   ├── votingInfoController.ts
│   │   │   └── wizardController.ts
│   │   ├── routes/
│   │   │   ├── healthRoutes.ts
│   │   │   ├── aiRoutes.ts             # POST /api/ai/chat
│   │   │   ├── timelineRoutes.ts       # GET  /api/timeline
│   │   │   ├── votingInfoRoutes.ts     # GET  /api/voting-info
│   │   │   └── wizardRoutes.ts         # GET  /api/voting-steps
│   │   ├── services/
│   │   │   ├── aiService.ts            # Google Gemini integration
│   │   │   ├── timelineService.ts
│   │   │   ├── votingInfoService.ts
│   │   │   └── wizardService.ts
│   │   ├── middlewares/
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── validateRequest.ts
│   │   └── utils/
│   │       └── logger.ts
│   ├── tests/
│   │   ├── health.test.ts
│   │   ├── ai.test.ts
│   │   ├── timeline.test.ts
│   │   ├── votingInfo.test.ts
│   │   └── wizard.test.ts
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/                   # AI Chat UI (WhatsApp-style bubbles)
│   │   │   ├── Layout/                 # Navbar + Footer
│   │   │   ├── Timeline/               # Horizontal timeline + hover cards
│   │   │   └── Wizard/                 # Stepper UI with Next/Back
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── WizardPage.tsx
│   │   │   ├── TimelinePage.tsx
│   │   │   ├── VotingInfoPage.tsx
│   │   │   └── ChatPage.tsx
│   │   ├── hooks/
│   │   ├── services/                   # API call wrappers
│   │   └── utils/
│   ├── vercel.json
│   └── tailwind.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
→ 200 { success: true, status: "ok", service: "election-navigator-api", timestamp }
```

### Voting Steps
```
GET /api/voting-steps

Response:
[
  { "step": 1, "title": "Check Eligibility",  "description": "Must be 18+ and a citizen" },
  { "step": 2, "title": "Register to Vote",   "description": "Fill Form 6 on voters.eci.gov.in" },
  { "step": 3, "title": "Find Polling Booth", "description": "Use Voter ID or call 1950" },
  { "step": 4, "title": "Voting Day",         "description": "Carry photo ID, vote on EVM" }
]
```

### Election Timeline
```
GET /api/timeline
GET /api/timeline?country=india    (default)

Response:
[
  { "phase": "Registration", "date": "2026-04-01", "description": "Last date to register",     "icon": "📝" },
  { "phase": "Campaign",     "date": "2026-04-15", "description": "Campaign period begins",    "icon": "📣" },
  { "phase": "Voting",       "date": "2026-05-01", "description": "Polling day",               "icon": "🗳️" },
  { "phase": "Results",      "date": "2026-05-04", "description": "Vote counting and results", "icon": "📊" }
]
```

### AI Chat
```
POST /api/chat
Content-Type: application/json

Request:  { "message": "I don't have voter ID" }
Response: { "success": true, "reply": "You can apply using Form 6..." }

422 – validation error (empty / too long / missing field)
429 – rate limit exceeded (20 req/min per IP on AI endpoint)
503 – AI service temporarily unavailable
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env      # then set GOOGLE_API_KEY in .env
npm run dev               # → http://localhost:8080
```

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| PORT | No | 8080 | Server port |
| NODE_ENV | No | development | Environment |
| ALLOWED_ORIGINS | Yes | — | Comma-separated CORS origins |
| GOOGLE_API_KEY | **Yes** | — | Your Google Gemini API key |
| GEMINI_MODEL | No | gemini-2.0-flash | Gemini model to use |
| AI_RATE_LIMIT_MAX | No | 20 | Max AI req/min per IP |
| GLOBAL_RATE_LIMIT_MAX | No | 100 | Global rate limit per IP |

> ⚠️ Never commit your .env file — it is listed in .gitignore.

---

## 🧪 Testing

Backend: **Jest + Supertest** | Frontend: **React Testing Library** (Phase 2)

```bash
cd backend
npm test                # run all tests
npm run test:coverage   # with coverage report
```

**Test coverage:**

```
Health suite   ✓ 200 ok / JSON header / 404 / Helmet headers / 10kb limit
AI Chat suite  ✓ 200 reply / 422 empty / 422 missing / 422 too-long / 503 failure / key not exposed / XSS sanitized
Timeline suite ✓ 200 with phases / country filter / required fields on each phase
Wizard suite   ✓ 200 with steps / required fields on each step
```

---

## 🔐 Security

- API keys in environment variables only — never in source code
- Helmet HTTP security headers on every response
- CORS restricted to an explicit origin allowlist
- Rate limiting: 100 req/min global, 20 req/min on AI endpoint
- Request body capped at 10 KB (payload attack prevention)
- Input validation on all endpoints via express-validator
- HTML escaping on AI input (XSS prevention)
- Non-root Docker user in production image

---

## ♿ Accessibility

- ARIA labels on all interactive elements
- Full keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen-reader friendly step indicators in Wizard

---

## 🚀 Deployment

### Backend → Render

1. Connect GitHub repo at [render.com](https://render.com)
2. Create a **Web Service** with:
   - **Runtime:** Docker
   - **Root Directory:** `backend`
   - **Instance Type:** Free
3. Add environment variables:
   ```
   NODE_ENV=production
   GOOGLE_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-2.0-flash
   ALLOWED_ORIGINS=https://your-app.vercel.app
   ```
4. Render auto-deploys on every push to master.

### Frontend → Vercel

1. Connect GitHub repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   ```
   VITE_API_URL=https://election-navigator-api.onrender.com
   ```
4. Vercel auto-deploys on every push to master.

---

## 🖼️ UI Plan (Phase 2)

### 🏠 Home Page
- Hero section with tagline
- "Start Voting Guide" CTA button
- "Ask AI" quick access section

### 🧭 Voting Flow Page
- Stepper UI (step indicators at top)
- Dynamic step content area
- Next / Back navigation buttons

### 📅 Timeline Page
- Horizontal scrollable timeline
- Hover → detail card expands
- Clean phase cards (Registration, Campaign, Voting, Results)

### 🤖 AI Chat Page
- WhatsApp-style chat bubbles
- Input box + send button
- Typing indicator while AI responds
- Suggested quick questions

---

## 📌 Future Improvements

- Multi-language support (Hindi, Tamil, Bengali, etc.)
- Real-time election data from ECI API
- User personalization and saved preferences
- SMS / WhatsApp chatbot integration
- PWA (offline-capable mobile app)

---

## 📊 Build Progress

| Phase | Feature | Status |
|---|---|---|
| 1 | Backend scaffolding (Express, TS, middleware, Docker) | ✅ Done |
| 1 | AI Chat endpoint (POST /api/chat) | ✅ Done |
| 1 | Voting Steps API (GET /api/voting-steps) | ✅ Done |
| 1 | Election Timeline API (GET /api/timeline) | ✅ Done |
| 2 | Frontend scaffold (Vite + React + Tailwind) | ✅ Done |
| 2 | Home Page UI | ✅ Done |
| 2 | AI Chat UI | ✅ Done |
| 2 | Timeline UI | ✅ Done |
| 2 | Wizard UI | ✅ Done |
| 3 | Docker + Render + Vercel deployment | ✅ Done |
| 3 | GitHub Actions CI (backend + frontend) | ✅ Done |
| 4 | Find My Voting Info (city/PIN lookup, 10 regions) | ✅ Done |
| 5 | Switched AI provider to Google Gemini | ✅ Done |

---

## 👨‍💻 Author

Built for the Election Navigator project — AI-powered civic tech.
