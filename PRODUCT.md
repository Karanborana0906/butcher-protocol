# PRODUCT.md — BUTCHER PROTOCOL

## 1. Identity

**Name:** BUTCHER PROTOCOL
**Tagline:** AI-POWERED CAREER INTELLIGENCE SYSTEM

BUTCHER PROTOCOL is a career intelligence platform. It discovers relevant job opportunities, analyzes job requirements, helps tailor resumes to specific roles, estimates resume compatibility, and tracks applications.

The product is presented as an intelligence command center: the user is the operator, job openings are "targets", and every analysis reads like an intelligence file. The theme is original. It is inspired by serious intelligence/thriller interfaces only in mood, never in assets, characters, logos or screenshots from any existing franchise.

> If any other file (including older versions of `AGENTS.md`) uses a different or outdated product name, **BUTCHER PROTOCOL** is the correct one.

## 2. Problem

Job seekers lose time on:

* scrolling through irrelevant listings
* reading long job descriptions to find real requirements
* rewriting resumes for every role
* guessing whether a resume will pass automated screening
* losing track of where they applied

BUTCHER PROTOCOL turns this into one structured workflow.

## 3. Target User

Students and early-career professionals (initially tech and AI/ML/data roles) who apply to many roles and want a faster, more organized, more honest process.

## 4. Core Modules

| Module | Route | Purpose |
|---|---|---|
| Landing | `/` | Public, cinematic introduction |
| Login | `/login` | Entry screen (UI only in Phase 1) |
| Command Center | `/dashboard` | Overview of targets, readiness, operations, quick actions |
| Intel Feed | `/intel-feed` | Browse and filter job intelligence |
| Target Database | `/target-database` | Placeholder in Phase 1 (saved/archived targets later) |
| Identity Forge | `/identity-forge` | Tailored resume generation workflow |
| Protocol Scan | `/protocol-scan` | Resume vs job compatibility analysis |
| Operation Status | `/operations` | Application tracking board |
| Profile | `/profile` | User career profile |
| Settings | `/settings` | Placeholder in Phase 1 |

## 5. Core Flows (Target Architecture)

### Job analysis
```text
JOB DESCRIPTION → Gemma 4 31B IT → STRUCTURED JOB ANALYSIS → APPLICATION LOGIC → MATCH SCORE → COMMAND CENTER
```

### Resume tailoring
```text
USER PROFILE + BASE RESUME + JOB DESCRIPTION → Gemma 4 31B IT → TAILORED RESUME → USER REVIEW → PDF
```

### ATS compatibility
```text
RESUME + JOB DESCRIPTION → Gemma 4 31B IT → KEYWORD / SKILL ANALYSIS → APPLICATION LOGIC → ATS COMPATIBILITY ESTIMATE
```

## 6. AI Principles

* **Model:** Gemma 4 31B IT via the Gemini API. Model identifier: `gemma-4-31b-it`.
* The AI **extracts and analyzes**. It does **not** calculate the final match percentage. Match score is computed by deterministic application logic.
* AI output must be **structured JSON**, validated before use, never uncontrolled free text rendered directly.
* The API key lives only on the server (`GEMINI_API_KEY`). Never in client code.

## 7. Honesty and Ethics Rules

* Resume tailoring must **never invent** experience, skills, employers, degrees or dates. It may reword and reorder what the user truly has.
* The ATS number is always labeled **INTERNAL COMPATIBILITY ESTIMATE**. It is not a universal ATS score and must not be presented as one.
* No automatic job applications. The user reviews and decides.
* In Phase 1, all data is mock/development data and the UI must not claim live AI processing or live job sources.

## 8. Roadmap

| Phase | Scope |
|---|---|
| **Phase 1** (current) | Presentation-ready frontend + Gemma-ready architecture. Mock data only. |
| Phase 2 | viaSocket + Job API + Supabase (auth, storage) |
| Phase 3 | Gemma 4 integration through a server-side layer (`analyzeJob`, `tailorResume`, `analyzeATS`) |
| Phase 4 | Final integration, polish, demo hardening |

## 9. Phase 1 Non-Goals

No real authentication, database, job APIs, viaSocket, Gemini calls, scraping, real resume generation, real ATS analysis or automatic applications.

## 10. Success Criteria for Phase 1

* Every route loads without errors and navigation works.
* The product feels like a cohesive intelligence platform, not a generic job portal.
* Mock data is isolated and easily replaceable.
* The AI service boundary exists and no secret is exposed.
* The build passes and the app is demo-ready on desktop, with working responsive layouts.