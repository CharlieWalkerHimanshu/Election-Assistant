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
| **AI** | OpenAI API (gpt-4o) |
| **Backend Deployment** | Google Cloud Run (Docker) |
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
│   │   │   └── wizardController.ts
│   │   ├── routes/
│   │   │   ├── healthRoutes.ts
│   │   │   ├── aiRoutes.ts             # POST /api/chat
│   │   │   ├── timelineRoutes.ts       # GET  /api/timeline
│   │   │   └── wizardRoutes.ts         # GET  /api/voting-steps
│   │   ├── services/
│   │   │   ├── aiService.ts
│   │   │   ├── timelineService.ts
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
│   │   └── wizard.test.ts
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/                           # Phase 2 – React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat/                   # AI Chat UI (WhatsApp-style bubbles)
│   │   │   ├── Timeline/               # Horizontal timeline + hover cards
│   │   │   └── Wizard/                 # Stepper UI with Next/Back
│   │   ├── pages/
│   │   │   ├── HomePage.tsx            # Hero + CTA buttons
│   │   │   ├── WizardPage.tsx
│   │   │   ├── TimelinePage.tsx
│   │   │   └── ChatPage.tsx
│   │   ├── hooks/
│   │   ├── services/                   # API call wrappers
│   │   └── utils/
│   └── tailwind.config.ts
├── docker-compose.yml
├── ELECTION_NAVIGATOR_SPEC.md
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
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env      # then set OPENAI_API_KEY in .env
npm run dev               # → http://localhost:8080
```

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| PORT | No | 8080 | Server port |
| NODE_ENV | No | development | Environment |
| ALLOWED_ORIGINS | Yes | — | Comma-separated CORS origins |
| OPENAI_API_KEY | **Yes** | — | Your OpenAI secret key |
| OPENAI_MODEL | No | gpt-4o | Model to use |
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

### Backend → Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/election-navigator-api

gcloud run deploy election-navigator-api \
  --image gcr.io/YOUR_PROJECT/election-navigator-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=$OPENAI_API_KEY,ALLOWED_ORIGINS=https://your-app.vercel.app
```

### Frontend → Vercel _(Phase 2)_

Connect GitHub repo to Vercel → auto-deploy on push to master.

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
| 2 | Frontend scaffold (Vite + React + Tailwind) | 🔜 Next |
| 2 | Home Page UI | 🔜 |
| 2 | AI Chat UI | 🔜 |
| 2 | Timeline UI | 🔜 |
| 2 | Wizard UI | 🔜 |
| 3 | Docker + Cloud Run + Vercel config | 🔜 |

---

## 👨‍💻 Author

Built for the Election Navigator project — AI-powered civic tech.
