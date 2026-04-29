# Election Navigator – Project Specification & Engineering Rules

> AI-powered assistant to guide users through election processes, timelines, and voting steps.

---

## 1. DEVELOPMENT APPROACH

Always think in phases:

1. **Architecture Design**
2. **Folder Structure**
3. **Feature Implementation**
4. **Testing**
5. **Optimization**

- Never jump directly into code without context
- Before writing code, explain:
  - What we are building
  - Why this approach is used

---

## 2. TECH STACK (MANDATORY)

### Frontend
- React (with Vite or Next.js)
- Tailwind CSS

### Backend
- Node.js with Express

### AI Integration
- OpenAI API (or Gemini)

### Deployment
- Backend → Google Cloud Run
- Frontend → Vercel

---

## 3. CORE FEATURES

### A. 🧭 Guided Voting Flow — "How Do I Vote?" (Decision Tree UI)
Decision-tree entry:
- "Are you a first-time voter?"
- "Do you have a voter ID?"
- Dynamically shows next steps based on answers

Step-by-step wizard:
- Step 1: Eligibility check
- Step 2: Registration steps + documents required
- Step 3: Find polling booth
- Step 4: Voting day instructions

### B. 📅 Election Timeline (Visual, Interactive)
Horizontal visual timeline covering:
- Registration Deadline
- Campaign Period
- Voting Day(s)
- Result / Counting Day

Interactions:
- Hover over each phase → show explanation tooltip
- Bonus: filter by country (India-focused default)

### C. 🤖 AI Assistant (Grounded, Not Just GPT)
**Do NOT** just plug GPT blindly.

Strategy:
1. Preload structured content into system prompt:
   - Eligibility rules
   - Documents required
   - Voting steps
2. Use LLM to explain and simplify that structured content
3. Implement fallback logic for out-of-scope questions

Example:
- User: "I don't have voter ID"
- Assistant: gives exact steps + required documents

### D. 📍 "Find My Voting Info" (Optional Bonus)
- Input: city / PIN code
- Output: how to find polling booth + links to official portals

---

## 4. PROJECT STRUCTURE (STRICT)

```
/frontend
  /components
  /pages
  /hooks
  /services
  /utils

/backend
  /controllers
  /routes
  /services
  /middlewares
  /utils
  /tests
```

---

## 5. CODING STANDARDS

- Use clean, modular, reusable code
- Use TypeScript wherever possible
- Follow SOLID principles
- Add comments ONLY where necessary
- Avoid hardcoding values

---

## 6. TESTING (MANDATORY)

For EVERY feature:
- Write unit tests
- Write integration tests

**Backend:** Jest / Supertest  
**Frontend:** React Testing Library

Also:
- Include edge cases
- Mock API calls where needed

---

## 7. SECURITY PRACTICES

- Store API keys in environment variables
- Validate all inputs
- Prevent XSS / injection
- Use CORS properly

---

## 8. ACCESSIBILITY (IMPORTANT)

- Add ARIA labels
- Ensure keyboard navigation
- Maintain color contrast

---

## 9. RESPONSE FORMAT (EVERY RESPONSE)

1. Feature Name
2. Goal
3. Approach
4. File Structure (which files to create/update)
5. Code Implementation
6. Test Cases
7. Improvements / Edge Cases

---

## 10. ITERATION RULE

- Never dump full project at once
- Build feature by feature
- After each feature → ask for confirmation before proceeding

---

## 11. REVIEW MODE

If user says **"REVIEW CODE"**:
- Analyze for: Bugs, Performance issues, Security gaps, Code quality
- Suggest improvements

---

## 12. DEBUG MODE

If user says **"DEBUG"**:
- Identify root cause
- Explain clearly
- Provide fix with minimal changes

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│                     Client (Browser)                │
│          React + Vite + Tailwind CSS                │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────┐ │
│  │ Voting Wizard │  │ Timeline │  │  AI Chat UI   │ │
│  └──────────────┘  └──────────┘  └───────────────┘ │
└─────────────────────┬───────────────────────────────┘
                      │ HTTPS / REST
┌─────────────────────▼───────────────────────────────┐
│                 Backend (Express API)               │
│              Node.js + TypeScript                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  /wizard │  │/timeline │  │    /ai/chat       │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────────────────┐   │
│  │           Middlewares                        │   │
│  │  CORS · Rate Limiting · Input Validation     │   │
│  └──────────────────────────────────────────────┘   │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
┌──────────▼──────┐    ┌──────────▼──────────────────┐
│  OpenAI / Gemini│    │     (Future) Database        │
│      API        │    │   PostgreSQL / Firestore     │
└─────────────────┘    └─────────────────────────────┘
```

### Deployment

```
Frontend  ──►  Vercel (CDN-optimized, edge network)
Backend   ──►  Google Cloud Run (containerized, auto-scaling)
Secrets   ──►  Environment Variables / GCP Secret Manager
```

---

## 13. SCORING CRITERIA (AI Evaluation — High Priority)

| Criteria       | What To Do                                              |
|----------------|---------------------------------------------------------|
| Code Quality   | Clean folder structure, reusable components             |
| Security       | Hide API keys, use `.env`, never commit secrets         |
| Efficiency     | Avoid redundant API calls; cache where possible         |
| Testing        | Minimum 2–3 test cases per feature                      |
| Accessibility  | Readable UI, ARIA labels, color contrast compliance     |
| Google Services| Deploy backend on **Google Cloud Run** ✅               |

---

## 14. AI ASSISTANT DESIGN RULES

- Always ground responses with preloaded structured data (eligibility rules, documents, steps)
- System prompt must include election context before any user message
- Fallback message for out-of-scope questions: `"I can only help with election-related queries."`
- Rate-limit AI calls server-side (prevent API abuse)
- Never expose the OpenAI API key to the client

---

## Build Log

| Date       | Phase         | Status      |
|------------|---------------|-------------|
| 2026-04-29 | Architecture  | Designed    |
| -          | Backend Setup | Pending     |
| -          | Frontend Setup| Pending     |
| -          | AI Chat       | Pending     |
| -          | Wizard Flow   | Pending     |
| -          | Timeline      | Pending     |
