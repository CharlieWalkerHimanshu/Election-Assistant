# Election Navigator

> AI-powered assistant that guides users through election processes, timelines, and voting steps.

---

## What It Does

| Module | Description |
|---|---|
| 🧭 **Guided Voting Wizard** | Decision-tree UI — eligibility → registration → polling booth → voting day |
| 📅 **Election Timeline** | Interactive horizontal timeline with hover tooltips |
| 🤖 **AI Chat Assistant** | LLM grounded with structured election data; not just raw GPT |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS + TypeScript |
| Backend | Node.js + Express + TypeScript |
| AI | OpenAI `gpt-4o` |
| Backend Deployment | Google Cloud Run (Docker) |
| Frontend Deployment | Vercel |

---

## Project Structure

```
election-navigator/
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Express app factory
│   │   ├── server.ts                 # Entry point + graceful shutdown
│   │   ├── controllers/
│   │   │   ├── aiController.ts
│   │   │   ├── timelineController.ts
│   │   │   └── wizardController.ts
│   │   ├── routes/
│   │   │   ├── healthRoutes.ts
│   │   │   ├── aiRoutes.ts
│   │   │   ├── timelineRoutes.ts
│   │   │   └── wizardRoutes.ts
│   │   ├── services/
│   │   │   ├── aiService.ts          # OpenAI integration
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
├── frontend/                         # (Phase 2)
├── docker-compose.yml
├── ELECTION_NAVIGATOR_SPEC.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env
# → Edit .env and set OPENAI_API_KEY

# 3. Start dev server (hot reload)
npm run dev

# Server runs at http://localhost:8080
```

### Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: `8080`) |
| `NODE_ENV` | No | `development` / `production` |
| `ALLOWED_ORIGINS` | Yes | Comma-separated CORS origins |
| `OPENAI_API_KEY` | **Yes** | Your OpenAI secret key |
| `OPENAI_MODEL` | No | Model to use (default: `gpt-4o`) |
| `AI_RATE_LIMIT_MAX` | No | Max AI requests/window per IP (default: `20`) |
| `AI_RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms (default: `60000`) |
| `GLOBAL_RATE_LIMIT_MAX` | No | Global rate limit per IP (default: `100`) |

> **Never commit your `.env` file.** It is in `.gitignore`.

---

## API Reference

### Health

```
GET /api/health
→ 200 { success: true, status: "ok", service: "election-navigator-api", timestamp }
```

### AI Chat

```
POST /api/ai/chat
Content-Type: application/json

{
  "message": "How do I register to vote?"
}

→ 200 { success: true, reply: "..." }
→ 422 Validation error
→ 429 Rate limit exceeded
→ 500 AI service error
```

### Election Timeline _(coming in Phase 3)_

```
GET /api/timeline
GET /api/timeline?country=india
```

### Voting Wizard _(coming in Phase 4)_

```
POST /api/wizard
{ "step": "eligibility", "answers": { "age": 19, "citizen": true } }
```

---

## Running Tests

```bash
cd backend
npm test               # run all tests
npm run test:coverage  # with coverage report
```

**Current test results:**

```
✓ GET /api/health → 200 ok
✓ JSON content-type header
✓ 404 for unknown routes
✓ /api/ai placeholder → 501
✓ /api/timeline placeholder → 501
✓ /api/wizard placeholder → 501
✓ helmet X-Content-Type-Options header
✓ body > 10kb rejected
✓ POST /api/ai/chat → 200 with mocked reply
✓ rejects empty message
✓ rejects message over 500 chars
✓ handles OpenAI API failure gracefully
✓ rate limiter headers present
```

---

## Docker (Local)

```bash
# From project root
docker-compose up --build

# API available at http://localhost:8080
```

---

## Deployment

### Backend → Google Cloud Run

```bash
cd backend

# Build and push image
gcloud builds submit --tag gcr.io/YOUR_PROJECT/election-navigator-api

# Deploy
gcloud run deploy election-navigator-api \
  --image gcr.io/YOUR_PROJECT/election-navigator-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=$$OPENAI_API_KEY,ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Frontend → Vercel _(Phase 2)_

```bash
cd frontend
vercel deploy
```

---

## Security

- API keys stored in environment variables only
- Helmet sets security headers on every response
- CORS restricted to explicit allowlist
- Rate limiting: 100 req/min global, 20 req/min on AI endpoint
- Request body capped at 10 KB
- Input validation on all endpoints via `express-validator`
- Non-root Docker user

---

## Build Progress

| Phase | Feature | Status |
|---|---|---|
| 1 | Backend scaffolding | ✅ Done |
| 1 | AI Chat endpoint | ✅ Done |
| 2 | Election Timeline API | 🔜 Next |
| 3 | Voting Wizard API | 🔜 |
| 4 | Frontend (Vite + React + Tailwind) | 🔜 |
| 5 | Chat UI | 🔜 |
| 6 | Timeline UI | 🔜 |
| 7 | Wizard UI | 🔜 |
| 8 | Docker + Cloud Run + Vercel config | 🔜 |
