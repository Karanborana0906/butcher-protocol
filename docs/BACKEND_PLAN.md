# BUTCHER PROTOCOL — BACKEND ARCHITECTURE & INTEGRATION PLAN

> **Document Status:** Architectural Specification  
> **Target Scope:** Transition from Phase 1 Frontend MVP to Phase 2/3 Backend (MongoDB + Job API + Gemma 4 31B IT)  
> **Guiding Principle:** Zero visual redesign. Preserve all existing UI, layout, styling tokens, and user experience.

---

## 1. Executive Summary & Framework Audit

### Current Framework Status (Item 8)
- **Framework in Repository:** **Vite (v8.3.2) + React (v19.2.8) + React Router DOM (v7.18.4) + TypeScript**.
- **Routing Paradigm:** Client-side SPA routing (`src/App.tsx` with `<BrowserRouter>`, `<Routes>`, `<Route>`).
- **Build & Dev Tool:** `vite.config.ts` with `@vitejs/plugin-react`.
- **Finding:** The repository is **not yet a Next.js project**.
- **Architectural Paths Available:**
  1. **Option A (Next.js App Router Migration):** Migrate the existing React components and CSS tokens into a Next.js App Router structure (`app/api/...` route handlers, `app/(shell)/...` page components), maintaining 100% component code and styling without visual changes.
  2. **Option B (Node.js / Express Backend Companion):** Maintain Vite for the frontend and introduce a lightweight Node.js/Express backend (`server/`) exposing `/api/*` endpoints backed by MongoDB, configured via Vite dev server proxy (`/api -> localhost:5000`).

---

## 2. Current Frontend Architecture

```text
src/
  components/
    dashboard/
      HighPriorityTargets.tsx  (Consumes mockJobs)
      QuickActions.tsx         (Triggers simulated job scan, navigates)
      RecentTargets.tsx        (Consumes mockJobs)
      StatCard.tsx             (Displays telemetry numbers)
    identity/
      ForgeWorkflow.tsx        (4-stage resume forging flow)
      ResumeDocument.tsx       (Classified tailored resume document preview/edit/export)
    jobs/
      JobCard.tsx              (Tactical job dossier card with match ring & actions)
      JobDetailModal.tsx       (Detailed modal for target requisition)
      JobFilterBar.tsx         (Search, location, match score, sorting)
    layout/
      AppShell.tsx             (Application wrapper: Sidebar + TopBar + Main Outlet)
      Sidebar.tsx              (Fixed tactical navigation + telemetry status)
      TopBar.tsx               (Header + Operator chip + Gemma model indicator)
    operations/
      KanbanBoard.tsx          (5-column application status tracker)
      OperationCard.tsx        (Stage card with advancement controls)
    protocol/
      DiagnosticPanel.tsx      (Passed/Optimization/Critical audit log)
      ScanDashboard.tsx        (ATS readiness, keyword coverage, skill match)
    ui/
      Badge.tsx, Button.tsx, Card.tsx, Input.tsx, Modal.tsx, ProgressRing.tsx, SearchBar.tsx
  data/
    mockJobs.ts                (Fictional target requisitions)
    mockOperations.ts          (Kanban application operations)
    mockProfile.ts             (Candidate baseline career dossier)
    mockIntel.ts               (Telemetry stats & live signal logs)
  pages/
    CommandCenterPage.tsx      (Route: /dashboard)
    IdentityForgePage.tsx      (Route: /identity-forge)
    IntelFeedPage.tsx          (Route: /intel-feed)
    LandingPage.tsx            (Route: /)
    LoginPage.tsx              (Route: /login)
    OperationsPage.tsx         (Route: /operations)
    ProfilePage.tsx            (Route: /profile)
    ProtocolScanPage.tsx       (Route: /protocol-scan)
    SettingsPage.tsx           (Route: /settings)
    TargetDatabasePage.tsx     (Route: /target-database)
  services/
    ai/
      aiClient.ts              (Client-side abstraction boundary with deterministic scoring)
      gemma.ts                 (Server-only Gemma 4 31B IT service stub with runtime guard)
      prompts.ts               (JSON-schema system prompt directives)
      types.ts                 (TypeScript interfaces: JobAnalysis, ResumeGeneration, ATSAnalysis)
```

---

## 3. Existing Mock Data Locations & Structures

### 3.1 Job Target Requisitions (`src/data/mockJobs.ts`)
```typescript
export interface JobTarget {
  id: string;               // e.g. "TGT-8901"
  title: string;            // e.g. "Staff AI Systems Engineer"
  company: string;          // e.g. "Apex Intelligence Labs"
  location: string;         // e.g. "San Francisco, CA"
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  source: 'Direct Intel' | 'Classified Feed' | 'Strategic Wire' | 'Encrypted Board';
  postedDate: string;       // e.g. "2 hours ago"
  skills: string[];         // e.g. ["Python", "PyTorch", "CUDA", "vLLM"]
  matchPercentage: number;  // e.g. 96 (calculated deterministically)
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  salary: string;           // e.g. "$180,000 - $220,000"
  requirements: string[];
  experienceLevel: string;  // e.g. "Senior / Staff"
  isSaved?: boolean;
}
```

### 3.2 Application Operations (`src/data/mockOperations.ts`)
```typescript
export type OperationStatus = 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER';

export interface OperationCardItem {
  id: string;               // e.g. "OP-101"
  jobId: string;            // e.g. "TGT-8901"
  title: string;
  company: string;
  location: string;
  matchScore: number;
  status: OperationStatus;
  appliedDate?: string;     // e.g. "2026-09-28"
  nextStep?: string;        // e.g. "System Architecture & CUDA Profiling Screen"
  salary?: string;
  notes?: string;
}
```

### 3.3 User Career Intelligence Profile (`src/data/mockProfile.ts`)
```typescript
export interface UserCareerProfile {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    securityBadge: string;
    clearanceStatus: string;
    bio: string;
  };
  education: {
    degree: string;
    college: string;
    graduationYear: string;
    gpa: string;
    honors: string;
  };
  skills: {
    programming: string[];
    aiml: string[];
    data: string[];
    tools: string[];
  };
  careerTargets: {
    desiredRoles: string[];
    targetLocations: string[];
    remotePreference: 'Remote' | 'Hybrid' | 'Flexible' | 'On-site';
    minimumCompensation: string;
    availability: string;
  };
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}
```

### 3.4 Telemetry & Signal Intel (`src/data/mockIntel.ts`)
```typescript
export interface SystemTelemetry {
  targetsAcquired: number;
  highMatchTargets: number;
  atsReadinessEstimate: number;
  activeOperations: number;
  systemStatus: 'PROTOCOL ONLINE' | 'CALIBRATING' | 'RECON SILENT';
  modelTarget: 'gemma-4-31b-it';
  recentSignals: {
    id: string;
    timestamp: string;
    type: 'DISCOVERY' | 'ANALYSIS' | 'FORGE' | 'STATUS_CHANGE';
    title: string;
    details: string;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  }[];
}
```

### 3.5 AI Service Generation & Analysis Data (`src/services/ai/types.ts`)
- `JobAnalysis`: Extracted roles, required/preferred skills, experience, education, key responsibilities, summary.
- `ResumeGeneration`: Tailored role, candidate headline, summary, tailored skills, experience highlights, projects with measurable outcomes, education, `integrityVerified: boolean`.
- `ATSAnalysis`: `atsReadiness` (0-100), `keywordCoverage`, `skillMatch`, `matchedSkills`, `missingSkills`, `recommendations`, `diagnosticNotes`, `disclaimer: "INTERNAL COMPATIBILITY ESTIMATE"`.

---

## 4. Frontend Actions & Buttons Mapping to Backend APIs

| Page / Component | Interactive Element | Current Phase 1 Behavior | Required Backend API | Method |
|---|---|---|---|---|
| **LoginPage** (`/login`) | `INITIALIZE SESSION` button | Simulated timeout (1100ms) -> `/dashboard` | `/api/auth/login` | `POST` |
| **LoginPage** (`/login`) | `CREATE IDENTITY` button | Simulated timeout (800ms) -> `/dashboard` | `/api/auth/register` | `POST` |
| **CommandCenter** (`/dashboard`) | Telemetry metric cards | Reads `SYSTEM_TELEMETRY` static object | `/api/telemetry/stats` | `GET` |
| **CommandCenter** (`/dashboard`) | `SCAN FOR JOBS` button | 1200ms simulated sweep | `/api/jobs/sync` | `POST` |
| **CommandCenter** & **IntelFeed** | `SAVE TARGET` (Bookmark icon) | Toggles local state `job.isSaved` | `/api/jobs/:id/save` | `POST` / `DELETE` |
| **IntelFeed** (`/intel-feed`) | Search bar, workplace pills, match filter, sort | Filters local array `INITIAL_MOCK_JOBS` | `/api/jobs?q=&workplace=&minMatch=&sort=` | `GET` |
| **IntelFeed** (`/intel-feed`) | `REFRESH SIGNALS` button | Resets local mock array | `/api/jobs/sync` | `POST` |
| **JobDetailModal** | `VIEW TARGET` click | Displays selected `JobTarget` object in modal | `/api/jobs/:id` | `GET` |
| **IdentityForge** (`/identity-forge`) | Base Resume selection | Toggles local string ID | `/api/resumes` | `GET` |
| **IdentityForge** (`/identity-forge`) | Target requisition dropdown | Reads `INITIAL_MOCK_JOBS` | `/api/jobs` | `GET` |
| **IdentityForge** (`/identity-forge`) | `EXECUTE FORGE PIPELINE` | Calls `aiClient.tailorResume()` with 1400ms delay | `/api/ai/tailor-resume` | `POST` |
| **ResumeDocument** | `COMMIT EDITS` button | Updates local state `editedResume` | `/api/resumes/:id` | `PUT` |
| **ProtocolScan** (`/protocol-scan`) | `EXECUTE PROTOCOL SCAN` | Calls `aiClient.analyzeATS()` with 1100ms delay | `/api/ai/analyze-ats` | `POST` |
| **Operations** (`/operations`) | Kanban board columns load | Reads `INITIAL_OPERATIONS` array | `/api/operations` | `GET` |
| **Operations** (`/operations`) | `ADVANCE` button | Updates item status in local React state | `/api/operations/:id/status` | `PATCH` |
| **Profile** (`/profile`) | Form load | Reads `INITIAL_USER_PROFILE` | `/api/profile` | `GET` |
| **Profile** (`/profile`) | `COMMIT CHANGES` button | Updates local `profile` state with 3s banner | `/api/profile` | `PUT` |
| **TargetDatabase** (`/target-database`) | `UNARCHIVE` button | Filters out ID from local `savedTargets` array | `/api/jobs/:id/save` | `DELETE` |
| **Settings** (`/settings`) | `APPLY CONFIGURATION` | Sets local React booleans with banner | `/api/settings` | `PUT` |

---

## 5. Backend Architecture & MongoDB Schema Design

```text
Backend Layer
  ├── Authentication & Session Management (JWT / HTTP-Only Cookie)
  ├── MongoDB Database (Persistent storage for jobs, users, resumes, applications)
  ├── Deterministic Match Scoring Engine (Pure algorithmic scoring, not LLM-calculated)
  ├── Gemma 4 31B IT AI Service (Server-side Gemini API client for extraction & tailoring)
  └── Job Aggregator Service (Fetches from external job APIs, normalizes to JobTarget schema)
```

### Proposed MongoDB Collections

#### 1. `users` Collection
```json
{
  "_id": "ObjectId",
  "email": "operator@butcherprotocol.intel",
  "passwordHash": "$2b$12$...",
  "securityBadge": "OPERATOR-DELTA-9",
  "clearanceStatus": "ACTIVE ADJUDICATION (SECRET ELIGIBLE)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

#### 2. `profiles` Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "personal": {
    "fullName": "Karan Borana",
    "email": "karan.borana@protocol.intel",
    "phone": "+1 (555) 019-4821",
    "location": "San Francisco, CA",
    "securityBadge": "OPERATOR-DELTA-9",
    "clearanceStatus": "ACTIVE ADJUDICATION (SECRET ELIGIBLE)",
    "bio": "AI Systems Engineer..."
  },
  "education": {
    "degree": "B.Tech in Computer Science & Artificial Intelligence",
    "college": "National Institute of Technology",
    "graduationYear": "2024",
    "gpa": "3.92 / 4.00",
    "honors": "Summa Cum Laude, Dean’s Honors Research Fellow"
  },
  "skills": {
    "programming": ["Python", "C++", "CUDA", "Rust"],
    "aiml": ["PyTorch", "vLLM", "TensorRT-LLM", "Distributed Systems"],
    "data": ["PostgreSQL", "Redis", "Milvus"],
    "tools": ["Docker", "Kubernetes", "Linux Internals"]
  },
  "careerTargets": {
    "desiredRoles": ["Staff AI Systems Engineer"],
    "targetLocations": ["San Francisco, CA", "Remote / US"],
    "remotePreference": "Flexible",
    "minimumCompensation": "$160,000 / year",
    "availability": "Immediate"
  },
  "links": {
    "github": "https://github.com/karanborana",
    "linkedin": "https://linkedin.com/in/karanborana",
    "portfolio": "https://karanborana.systems"
  },
  "updatedAt": "ISODate"
}
```

#### 3. `jobs` Collection
```json
{
  "_id": "ObjectId",
  "jobId": "TGT-8901",
  "title": "Staff AI Systems Engineer",
  "company": "Apex Intelligence Labs",
  "location": "San Francisco, CA",
  "workplaceType": "Hybrid",
  "source": "Direct Intel",
  "postedDate": "ISODate",
  "skills": ["Python", "PyTorch", "Distributed Systems", "CUDA", "vLLM", "Linux Internals"],
  "matchPercentage": 96,
  "priority": "CRITICAL",
  "salary": "$180,000 - $220,000",
  "experienceLevel": "Senior / Staff",
  "description": "Lead the architecture of low-latency distributed inference engines...",
  "requirements": [
    "Proven expertise profiling and tuning GPU memory pipelines and CUDA kernels"
  ],
  "rawJobData": {},
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

#### 4. `saved_jobs` Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "jobId": "TGT-8901",
  "savedAt": "ISODate"
}
```

#### 5. `resumes` Collection (Base & Forged Documents)
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "type": "BASE" | "FORGED",
  "targetJobId": "TGT-8901",
  "targetRole": "Staff AI Systems Engineer",
  "targetCompany": "Apex Intelligence Labs",
  "candidateName": "Karan Borana",
  "headline": "AI Systems Engineer | Distributed Inference & Scalable Deep Learning",
  "summary": "Performance-focused engineer specialized in large-scale model orchestration...",
  "tailoredSkills": ["Python", "PyTorch", "Distributed Systems", "CUDA"],
  "experienceHighlights": [
    {
      "title": "Autonomous Systems Engineer",
      "company": "Aether Tactical Labs",
      "period": "2024 — Present",
      "highlights": ["Engineered distributed model serving pipeline..."]
    }
  ],
  "projects": [
    {
      "name": "Project Hyperion",
      "tech": ["Python", "C++", "CUDA"],
      "description": "Engineered custom tensor execution scheduler...",
      "outcomes": ["Sustained 180 tok/sec throughput"]
    }
  ],
  "education": {
    "degree": "B.Tech in Computer Science & Artificial Intelligence",
    "institution": "National Institute of Technology",
    "year": "2024"
  },
  "integrityVerified": true,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

#### 6. `operations` Collection (Kanban Application Records)
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "operationId": "OP-101",
  "jobId": "TGT-8901",
  "title": "Staff AI Systems Engineer",
  "company": "Apex Intelligence Labs",
  "location": "San Francisco, CA",
  "matchScore": 96,
  "status": "INTERVIEW",
  "appliedDate": "2026-09-28",
  "nextStep": "System Architecture Screen",
  "salary": "$180,000 - $220,000",
  "notes": "Recruiter commended custom runtime benchmarks.",
  "history": [
    { "status": "SAVED", "timestamp": "2026-09-25T10:00:00Z" },
    { "status": "APPLIED", "timestamp": "2026-09-28T14:30:00Z" },
    { "status": "INTERVIEW", "timestamp": "2026-10-02T09:15:00Z" }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

#### 7. `ats_scans` Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "resumeId": "ObjectId",
  "jobId": "TGT-8901",
  "atsReadiness": 84,
  "keywordCoverage": 89,
  "skillMatch": 82,
  "matchedSkills": ["Python", "PyTorch", "Distributed Systems", "Docker", "CUDA"],
  "missingSkills": ["SQL", "Scikit-learn"],
  "recommendations": ["Highlight genuine relevant projects..."],
  "diagnosticNotes": [
    { "category": "PASSED", "message": "Primary technical stack strongly aligned..." }
  ],
  "disclaimer": "INTERNAL COMPATIBILITY ESTIMATE",
  "createdAt": "ISODate"
}
```

---

## 6. Proposed API Routes & Request/Response Contracts

### Authentication (`/api/auth`)
- `POST /api/auth/login`: `{ email, password }` -> `{ user, token }`
- `POST /api/auth/register`: `{ email, password, fullName }` -> `{ user, token }`
- `GET /api/auth/me`: Headers `Bearer <token>` -> `{ user, profile }`

### Job Targets (`/api/jobs`)
- `GET /api/jobs`: Query params `?q=&workplace=&minMatch=&sort=&page=&limit=` -> `{ jobs: JobTarget[], total: number }`
- `GET /api/jobs/:id`: URL param `id` -> `{ job: JobTarget }`
- `POST /api/jobs/:id/save`: URL param `id` -> `{ success: true, isSaved: true }`
- `DELETE /api/jobs/:id/save`: URL param `id` -> `{ success: true, isSaved: false }`
- `POST /api/jobs/sync`: Trigger background fetch from external Job API -> `{ newCount: number, updatedCount: number }`

### Operations Tracker (`/api/operations`)
- `GET /api/operations`: -> `{ operations: OperationCardItem[] }`
- `POST /api/operations`: `{ jobId, status?, notes? }` -> `{ operation: OperationCardItem }`
- `PATCH /api/operations/:id/status`: `{ status: 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER' }` -> `{ operation: OperationCardItem }`
- `PUT /api/operations/:id`: `{ nextStep, notes, salary }` -> `{ operation: OperationCardItem }`
- `DELETE /api/operations/:id`: URL param `id` -> `{ success: true }`

### User Profile (`/api/profile`)
- `GET /api/profile`: -> `{ profile: UserCareerProfile }`
- `PUT /api/profile`: `{ personal, education, skills, careerTargets, links }` -> `{ profile: UserCareerProfile }`

### Resumes & Identity Forge (`/api/resumes`)
- `GET /api/resumes`: -> `{ resumes: ResumeGeneration[] }`
- `GET /api/resumes/:id`: -> `{ resume: ResumeGeneration }`
- `PUT /api/resumes/:id`: `{ headline, summary, tailoredSkills, experienceHighlights, projects }` -> `{ resume: ResumeGeneration }`
- `DELETE /api/resumes/:id`: -> `{ success: true }`

### AI Services (`/api/ai`) — Server-Side Gemma 4 31B IT Layer
- `POST /api/ai/analyze-job`: `{ jobDescription }`
  - Calls `gemmaService.analyzeJob()` on server with `GEMINI_API_KEY`
  - Runs deterministic scoring algorithm against candidate profile
  - Returns `{ analysis: JobAnalysis, deterministicMatch: number }`
- `POST /api/ai/tailor-resume`: `{ baseResumeId, targetJobId }`
  - Retrieves genuine candidate profile & base resume from MongoDB
  - Calls `gemmaService.tailorResume()` with zero-fabrication constraint
  - Saves tailored record to `resumes` collection
  - Returns `{ resume: ResumeGeneration }`
- `POST /api/ai/analyze-ats`: `{ resumeId, jobId }`
  - Retrieves resume & job requisition from MongoDB
  - Calls `gemmaService.analyzeATS()`
  - Computes deterministic ATS readiness percentage
  - Stores scan in `ats_scans` collection
  - Returns `{ analysis: ATSAnalysis }`

### Telemetry (`/api/telemetry`)
- `GET /api/telemetry/stats`: -> `{ targetsAcquired, highMatchTargets, atsReadinessEstimate, activeOperations, recentSignals }`

---

## 7. Recommended Code Structure & Service Folders

To keep architecture cleanly separated without polluting the frontend:

```text
src/ (or server/)
  lib/
    db/
      mongodb.ts              # MongoDB Client / Mongoose connection singleton with connection caching
      models/
        User.ts               # User schema
        Profile.ts            # Profile schema
        Job.ts                # Job target schema
        SavedJob.ts           # Saved target joins
        Operation.ts          # Application operation schema
        Resume.ts             # Base & forged resume schema
        AtsScan.ts            # Diagnostic scan records
    services/
      jobs/
        jobAggregator.ts      # External Job API client & normalizer
        scoringEngine.ts      # Deterministic application matching logic
      ai/
        geminiClient.ts       # Secure server-side Gemini SDK configured for gemma-4-31b-it
        gemmaService.ts       # Extraction, tailoring, and ATS analysis pipelines
  services/ai/aiClient.ts     # Client-side API wrapper: currently returns mock; will fetch('/api/...')
```

---

## 8. Frontend Integration Mapping (Transition Strategy)

The frontend already has a clean isolation barrier: `src/services/ai/aiClient.ts`!

To connect the backend without touching any UI component:
1. `src/services/ai/aiClient.ts`: Replace simulated `setTimeout` return values with `fetch('/api/ai/...')` and `fetch('/api/jobs/...')`.
2. Pages (`CommandCenterPage`, `IntelFeedPage`, `OperationsPage`, `ProfilePage`, `TargetDatabasePage`):
   - Replace direct imports of `INITIAL_MOCK_JOBS`, `INITIAL_OPERATIONS`, `INITIAL_USER_PROFILE` with standard `useEffect` / data fetching hooks (e.g., `useJobs()`, `useOperations()`, `useProfile()`) pointing to `/api/*`.
   - Maintain the mock data as a fallback if the API is offline during local demos.

---

## 9. Identified Discrepancies & Recommendations

1. **Framework Mismatch:** The prompt specifies *"Our backend architecture will be: Existing Next.js Frontend ↓ Next.js API Routes..."*, but the project is currently a **Vite + React SPA**.
   - *Recommendation:* Decide whether to:
     - (A) Migrate to Next.js App Router (preserving all UI components, tokens, and layouts), OR
     - (B) Retain Vite and deploy a lightweight Express/Fastify API server alongside it.
2. **Deterministic Match Scoring Rule:** Ensure that external Job APIs and Gemma AI do *not* generate match percentages directly. The server-side `scoringEngine.ts` must execute the weighted mathematical overlap formula between candidate verified skills and requisition requirements.
3. **Zero Fabrication Enforcement:** In `POST /api/ai/tailor-resume`, the server must validate that forged resume entries only contain verified past employers and credentials originating from the user's `profiles` document in MongoDB.
4. **ATS Disclaimer Requirement:** All responses from `/api/ai/analyze-ats` must return the fixed field `"disclaimer": "INTERNAL COMPATIBILITY ESTIMATE"` to strictly adhere to ethical guidelines.
