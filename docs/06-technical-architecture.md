# HeyDrew — Technical Architecture

This document describes the current prototype's technical state and outlines what a production architecture would look like.

---

## Current State: Prototype

```
┌───────────────────────────────────────────┐
│            GitHub Pages (static)          │
│                                           │
│  index.html ─── Client app (mobile)      │
│  admin.html ─── Admin dashboard (desktop) │
│  desktop.html ── Client app (desktop)    │
│                                           │
│  No backend. No database. No auth.       │
│  All JS is inline. All data is mocked.   │
└───────────────────────────────────────────┘
```

**Tech stack:**
- Vanilla HTML/CSS/JavaScript (no framework)
- Google Fonts: Nunito (body), Quicksand (headings)
- Deployed via GitHub Pages
- All CSS is embedded in `<style>` tags (no external stylesheets)
- All JS is embedded in `<script>` tags (no external scripts)
- Drew avatar is a base64-encoded image inline in the JS
- Client app renders in a 390×844px phone frame (mobile mockup)

**What works in the prototype:**
- All screen navigation and transitions
- Conversational chat flow with branching logic
- Document upload UI (drag & drop, camera, file list)
- Strategy detail with interactive task list
- Admin case queue, case detail with tabs
- Strategy library, token generator, activity log
- Input validation (token format, password strength, phone formatting)
- Keyboard shortcuts for developer navigation

**What is simulated:**
- All data (no persistence between page loads)
- Document upload (files aren't stored)
- Document analysis (hardcoded delay then mock results)
- AI chat responses (branching if/else, not actual AI)
- Authentication (token validation is format-checking only)
- Messaging (pre-populated, not real-time)
- Strategy recommendations (hardcoded, not dynamically generated)

---

## Production Architecture

```
┌─────────────────┐     ┌─────────────────┐
│  Client App     │     │  Admin Dashboard │
│  (Mobile Web /  │     │  (Desktop Web)   │
│   PWA / Native) │     │                  │
└────────┬────────┘     └────────┬─────────┘
         │                       │
         └──────────┬────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   API Gateway       │
         │   (Auth middleware)  │
         └──────────┬──────────┘
                    │
         ┌──────────┼──────────────────┐
         │          │                  │
         ▼          ▼                  ▼
  ┌────────────┐ ┌────────────┐ ┌──────────────┐
  │ Core API   │ │ Chat /     │ │ Document     │
  │ Service    │ │ AI Service │ │ Processing   │
  │            │ │            │ │ Service      │
  │ - Auth     │ │ - Convo    │ │              │
  │ - Cases    │ │   engine   │ │ - Upload     │
  │ - Profiles │ │ - Strategy │ │ - OCR/Parse  │
  │ - Tokens   │ │   matching │ │ - Analysis   │
  │ - Messages │ │ - LLM calls│ │              │
  │ - Activity │ │            │ │              │
  └─────┬──────┘ └─────┬──────┘ └──────┬───────┘
        │               │               │
        ▼               ▼               ▼
  ┌──────────┐   ┌──────────┐   ┌──────────────┐
  │ Database │   │ LLM      │   │ File Storage │
  │ (Postgres│   │ Provider │   │ (S3 or       │
  │  or      │   │ (Claude, │   │  equivalent) │
  │  similar)│   │  etc.)   │   │              │
  └──────────┘   └──────────┘   └──────────────┘
```

---

## Key Technical Decisions Needed

### 1. Frontend Framework

The prototype is vanilla HTML/JS. For production, the team needs to choose a framework.

| Consideration | Notes |
|---|---|
| Client app is mobile-first | Could be a PWA, React Native, or native app |
| Admin dashboard is desktop web | Standard SPA (React, Next.js, etc.) |
| Shared component library? | If both apps use the same framework, components can be shared |
| Phone frame in prototype | Production client app would be full-screen, not in a frame |

### 2. AI/Chat Architecture

The prototype's chat is a hardcoded decision tree. Production needs actual AI.

| Approach | Trade-off |
|---|---|
| Structured conversation flow with AI fill-in | More predictable, easier to control. AI handles natural language, but flow is guided by predefined steps. |
| Fully open-ended LLM conversation | More flexible but harder to keep on-track. Needs guardrails to ensure it asks the right questions. |
| Hybrid: structured steps + freeform Q&A | Guided discovery flow for strategy matching, with ability to ask Drew open-ended questions at any point. This matches what the prototype does. |

**The prototype implies a hybrid approach:** Drew asks specific questions in order (business type → home office → meetings at home) but also handles tangent questions (security, how analysis works, etc.).

### 3. Document Processing

| Component | What's Needed |
|---|---|
| File upload | Secure multipart upload to cloud storage |
| OCR/Parsing | Extract structured data from tax returns, Schedule C, 1099s |
| Analysis | Match extracted data against strategy eligibility rules |
| Human review | Tax pro reviews AI recommendations before client sees them |

### 4. Real-time vs. Polling

| Feature | Real-time Needed? |
|---|---|
| Chat with Drew | Yes — typing indicators, streaming responses |
| Messaging (client ↔ CPA) | Nice-to-have — could poll every 30s |
| Case status updates | No — polling or on-navigation fetch is fine |
| Admin case queue | No — polling or manual refresh is fine |
| Document analysis progress | Nice-to-have — could use SSE for progress updates |

---

## Third-Party Integrations (Implied)

Based on what the prototype shows, these integrations would be needed:

| Integration | Purpose | Evidence in Prototype |
|---|---|---|
| LLM API (e.g., Claude) | Conversational AI, document analysis | Chat flow, strategy discovery |
| OCR Service | Extract data from tax documents | Document viewer shows extracted fields |
| File Storage (S3/GCS) | Store uploaded documents | Upload screen |
| Email Service | Token delivery, notifications | Token management, notification settings |
| Payment Processor | Not shown yet but likely needed | Not in prototype |

---

## Security Considerations

| Concern | Notes |
|---|---|
| Tax documents contain PII/financial data | Encryption at rest and in transit required |
| Access tokens are the only gate | Need rate limiting, expiration, single-use enforcement |
| Client ↔ CPA communication | End-to-end encryption would be ideal for messaging |
| Admin dashboard access | Role-based access control, audit logging |
| Document retention | Need a clear policy — how long are docs kept? |
| SOC 2 compliance | Referenced in the prototype's security assurances |

---

## What the Prototype Doesn't Address

These are gaps between the prototype and production that the team will need to think through:

1. **Error states** — What happens when document upload fails? When AI analysis returns no strategies? When a token is expired?
2. **Empty states** — What does the dashboard look like with no documents uploaded? No strategies found? No messages?
3. **Loading states** — The prototype has scanning/analyzing screens, but what about general API latency?
4. **Offline behavior** — Is the client app expected to work offline? (Probably not for v1)
5. **Multi-year support** — Can a client have cases for multiple tax years?
6. **Billing/payments** — How do clients pay? Per-case? Subscription? Through their CPA?
7. **Multiple tax professionals** — Can a case be transferred or reviewed by multiple CPAs?
8. **Strategy updates** — What happens when tax law changes and a strategy is no longer valid?
9. **Notification delivery** — Push notifications? Email? SMS? The settings screen implies preferences.
10. **Mobile app vs. PWA vs. responsive web** — The prototype is a phone-frame mockup. What ships to actual users?
