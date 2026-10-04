# AGENTS.md — BUTCHER PROTOCOL

Instructions for AI coding agents working in this repository.

## 1. Project

**BUTCHER PROTOCOL** is an AI-powered career intelligence system.
Tagline: **AI-POWERED CAREER INTELLIGENCE SYSTEM**

Read these first, in order:

1. `PRODUCT.md`: what the product is and what it must (not) do
2. `DESIGN_SYSTEM.md`: colors, typography, terminology, components, motion
3. This file: how to work in the repo

If anything here conflicts with an older note or an outdated product name, follow `PRODUCT.md` and `DESIGN_SYSTEM.md`. The product name is always **BUTCHER PROTOCOL**.

## 2. Current Phase

**Phase 1: frontend MVP + Gemma-ready architecture.**

Allowed:

* Frontend pages, components, layout, animations
* Local mock data and TypeScript types
* AI service folder structure, types, stubs and placeholder prompt templates
* `.env.example`

Not allowed in Phase 1:

* Real Gemini/Gemma API calls
* viaSocket, real job APIs, web scraping
* Supabase or any real database
* Real authentication
* Real resume generation or real ATS analysis
* Automatic job applications

Do not start the next phase on your own. Finish the requested phase, verify, report, and stop.

## 3. Working Rules

1. Inspect the existing project before changing anything.
2. Use the existing framework, router, styling system and package manager. Do not switch stacks.
3. Preserve working functionality. Do not rewrite or delete working code without a reason.
4. No duplicate components or utilities. Search before creating.
5. Keep it simple. This is a rapid MVP. No abstractions without a clear need.
6. Minimal dependencies. Remove anything unused.
7. No debug code. No `console.log` left behind.
8. Prefer small, focused files with clear names.

## 4. Tech Conventions

* **Language:** TypeScript with explicit types for shared data.
* **Animation:** Framer Motion plus lightweight CSS transforms. No Three.js unless truly necessary.
* **Fonts:** Inter (body) and Space Grotesk (headings/labels).
* **Theme:** dark-only, tokens defined once and reused (see `DESIGN_SYSTEM.md`).
* **Components:** organize by feature where it helps.

```text
src/
  components/
    layout/      Sidebar, TopBar, AppShell
    ui/          Button, Card, Badge, Input, Modal, ProgressRing, SearchBar
    dashboard/
    jobs/
    identity/
    protocol/
    operations/
  data/          mockJobs.ts, mockOperations.ts, mockProfile.ts, mockIntel.ts
  services/
    ai/          gemma.ts (server-only), aiClient.ts, types.ts, prompts.ts
  pages/ or app/ routes per the existing project convention
```

Follow the existing project's folder convention if it differs.

## 5. Routes

Public: `/`, `/login`
Application: `/dashboard`, `/intel-feed`, `/identity-forge`, `/protocol-scan`, `/operations`, `/profile`
Placeholders: `/target-database`, `/settings`

All application routes share one app shell (sidebar and top bar). No broken links.

## 6. Mock Data Rules

* All fake data lives in `src/data/` with TypeScript types. Never hardcode job objects inside large UI components.
* Use fictional company names. No real logos or recruiter data.
* UI must be able to swap mock data for real data later without restructuring.
* Mock/simulated screens may carry a subtle `DEVELOPMENT DATA` marker. Do not claim live AI or live job sources.

## 7. AI Architecture Rules

* Planned model: **Gemma 4 31B IT** through the Gemini API. Model identifier: `gemma-4-31b-it`.
* The API key `GEMINI_API_KEY` must **never** appear in client code, and never use a client-exposed prefix (`NEXT_PUBLIC_`, `VITE_`, etc.).
* `gemma.ts` is server-only. UI code must not import it.
* UI calls a client-side wrapper (`aiClient.ts`) that returns mock data in Phase 1 and will call server endpoints in Phase 3.
* Planned operations: `analyzeJob()`, `tailorResume()`, `analyzeATS()`.
* AI returns **structured JSON**. The AI does **not** compute the final match percentage; deterministic application logic does.
* Resume tailoring must never fabricate experience, skills, employers, degrees or dates.
* ATS score is always labeled **INTERNAL COMPATIBILITY ESTIMATE**.

`.env.example` (no real secrets):

```text
GEMINI_API_KEY=
GEMINI_MODEL=gemma-4-31b-it
```

## 8. Security

* No secrets in source, logs or commits.
* Do not commit `.env` files. Only `.env.example`.
* Do not make direct browser-to-Gemini requests.
* Validate and sanitize any future AI output before rendering.

## 9. Quality Checklist (run before finishing)

1. App starts without errors.
2. Every route loads, including placeholders.
3. Sidebar and CTA navigation work.
4. Job search, filters and sorting work on mock data.
5. Responsive at desktop, laptop, tablet and mobile with no horizontal overflow.
6. TypeScript check passes.
7. Production build passes.
8. Browser console has no errors.
9. No broken links.
10. No API key or secret in the codebase. `.env.example` exists.
11. Model identifier is exactly `gemma-4-31b-it`.
12. No real Gemini request is made in Phase 1.
13. Loading, empty and error states exist where relevant.

## 10. Final Report Format

When a phase is done, report:

* **Completed:** pages and components created
* **Files Modified:** important files
* **Verification:** dev server, TypeScript, build, console errors, responsive status
* **Future Integration Points:** where Job API, viaSocket, Supabase (Phase 2) and Gemma (Phase 3) will connect

Then stop.

## 11. Roadmap Reference

| Phase | Scope |
|---|---|
| 1 | Frontend MVP + Gemma-ready architecture (current) |
| 2 | viaSocket + Job API + Supabase |
| 3 | Gemma 4 integration via server-side layer |
| 4 | Final integration and polish |