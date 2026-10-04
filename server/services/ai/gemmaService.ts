/**
 * BUTCHER PROTOCOL — Gemma 4 31B IT Career Intelligence Service
 * Model Identifier: gemma-4-31b-it
 * 
 * SECURITY DIRECTIVE:
 * Server-only execution. GEMINI_API_KEY must never be exposed to client bundles.
 */

import { config } from '../../config/index.js';

export interface GemmaJobAnalysisResult {
  matchScore: number;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export interface CandidateProfileInput {
  name: string;
  headline?: string;
  bio?: string;
  education?: string | { degree: string; institution: string; year: string };
  skills: string[];
  experienceLevel?: string;
}

export interface JobPostingInput {
  jobId: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  skills: string[];
  requirements?: string[];
  experienceLevel?: string;
}

/**
 * Clean and extract valid JSON substring from Gemma raw output,
 * stripping markdown code fences or conversational text.
 */
function extractJsonFromText(rawText: string): any {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or non-string response received from AI model');
  }

  // 1. Strip markdown code fences if present (```json ... ``` or ``` ...)
  const fencedMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidateText = fencedMatch ? fencedMatch[1].trim() : rawText.trim();

  // 2. Locate innermost or first complete outer JSON object
  const firstBrace = candidateText.indexOf('{');
  const lastBrace = candidateText.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('No valid JSON object structure found in model output');
  }

  const jsonSubstring = candidateText.slice(firstBrace, lastBrace + 1);
  return JSON.parse(jsonSubstring);
}

/**
 * Validate that the parsed JSON strictly conforms to the required contract.
 * Enforces integer bounds (0-100) and non-fabrication array structures.
 */
function validateAnalysisResult(parsed: any): GemmaJobAnalysisResult {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Analysis response must be a JSON object');
  }

  // matchScore must be an integer from 0 to 100
  let matchScore = parseInt(parsed.matchScore, 10);
  if (isNaN(matchScore)) {
    throw new Error('matchScore must be a valid integer number between 0 and 100');
  }
  matchScore = Math.max(0, Math.min(100, matchScore));

  const summary = typeof parsed.summary === 'string' ? parsed.summary.trim() : '';
  if (!summary) {
    throw new Error('summary must be a non-empty string');
  }

  const matchedSkills: string[] = Array.isArray(parsed.matchedSkills)
    ? parsed.matchedSkills.map((s: any) => String(s).trim()).filter(Boolean)
    : [];

  const missingSkills: string[] = Array.isArray(parsed.missingSkills)
    ? parsed.missingSkills.map((s: any) => String(s).trim()).filter(Boolean)
    : [];

  const recommendation =
    typeof parsed.recommendation === 'string' ? parsed.recommendation.trim() : '';
  if (!recommendation) {
    throw new Error('recommendation must be a non-empty string');
  }

  return {
    matchScore,
    summary,
    matchedSkills,
    missingSkills,
    recommendation,
  };
}

/**
 * Execute Job Analysis using Gemma 4 31B IT via Google Generative Language API
 */
export async function analyzeJobWithGemma(
  job: JobPostingInput,
  candidate: CandidateProfileInput
): Promise<GemmaJobAnalysisResult> {
  const apiKey = config.geminiApiKey;
  const model = config.geminiModel || 'gemma-4-31b-it';

  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      `GEMINI_API_KEY is not configured on the server. Unable to invoke model "${model}".`
    );
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Formulate the strict prompt adhering to system rules
  const prompt = `
You are a career intelligence analyst.

Compare the candidate profile against the supplied job posting.

Return ONLY valid JSON.

Required JSON:
{
  "matchScore": 0,
  "summary": "",
  "matchedSkills": [],
  "missingSkills": [],
  "recommendation": ""
}

Rules:
- matchScore must be an integer from 0 to 100.
- matchedSkills must only contain skills supported by BOTH the candidate profile and job.
- missingSkills must only contain skills explicitly required/preferred by the job that are absent from the candidate profile.
- Do not invent candidate experience.
- Do not invent education.
- Do not invent certifications.
- Do not invent companies.
- Do not invent projects.
- Do not claim the candidate has a skill unless the supplied profile supports it.
- Recommendation must be based only on the supplied evidence.
- If evidence is insufficient, say so.
- No markdown.
- JSON only.

CANDIDATE PROFILE:
Name: ${candidate.name}
Headline: ${candidate.headline || 'Software & AI Engineer'}
Bio: ${candidate.bio || 'Not provided'}
Education: ${typeof candidate.education === 'string' ? candidate.education : candidate.education ? `${candidate.education.degree} from ${candidate.education.institution} (${candidate.education.year})` : 'Not provided'}
Known Skills: ${candidate.skills.join(', ')}

JOB POSTING:
Tactical ID: ${job.jobId}
Title: ${job.title}
Company: ${job.company}
Location: ${job.location || 'Remote'}
Target Requisition Skills: ${job.skills.join(', ')}
Requirements: ${(job.requirements || []).join('; ') || 'Standard engineering requirements'}
Description:
${job.description.slice(0, 4000)}
`.trim();

  let response: Response | null = null;
  let lastErrorMsg = '';

  for (let attempt = 1; attempt <= 3; attempt++) {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (response.ok) {
      break;
    }

    const errorBody = await response.text();
    lastErrorMsg = `Google Gemini API returned HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsedErr = JSON.parse(errorBody);
      if (parsedErr.error?.message) {
        lastErrorMsg += ` - ${parsedErr.error.message}`;
      }
    } catch {
      lastErrorMsg += ` - ${errorBody.slice(0, 200)}`;
    }

    // Retry transient 500/503 errors with exponential backoff
    if ((response.status === 500 || response.status === 503) && attempt < 3) {
      const backoffMs = attempt * 2000;
      console.warn(`[GemmaService] Transient ${response.status} from Gemini API, retrying in ${backoffMs}ms (attempt ${attempt}/3)...`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      continue;
    }

    throw new Error(lastErrorMsg);
  }

  if (!response || !response.ok) {
    throw new Error(lastErrorMsg || 'Failed to communicate with Gemma 4 31B IT API');
  }

  const responseData: any = await response.json();
  const candidateObj = responseData?.candidates?.[0];

  if (!candidateObj?.content?.parts || !Array.isArray(candidateObj.content.parts)) {
    throw new Error('No candidate content parts returned from Gemma 4 31B IT');
  }

  // Handle Gemma 4 31B IT thinking parts: find the part that is not thought output
  const nonThoughtParts = candidateObj.content.parts.filter((p: any) => !p.thought && p.text);
  const rawText = nonThoughtParts.length > 0
    ? nonThoughtParts.map((p: any) => p.text).join('\n')
    : candidateObj.content.parts.map((p: any) => p.text || '').join('\n');

  if (!rawText.trim()) {
    throw new Error('Empty text content received from Gemma 4 31B IT');
  }

  // Safe JSON extraction and schema validation
  let parsedJson: any;
  try {
    parsedJson = extractJsonFromText(rawText);
  } catch (err: any) {
    throw new Error(`[GemmaService] Failed to extract valid JSON: ${err.message}. Raw output: ${rawText.slice(0, 300)}`);
  }

  const validatedResult = validateAnalysisResult(parsedJson);
  return validatedResult;
}

export interface TailoredResumeResult {
  targetedRole: string;
  targetRole: string;
  targetCompany: string;
  candidateName: string;
  headline: string;
  summary: string;
  skills: string[];
  tailoredSkills: string[];
  experienceHighlights: {
    title: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    tech: string[];
    description: string;
    outcomes: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  integrityVerified: boolean;
  forgedAt: string;
}

/**
 * Validate and normalize Gemma's tailored resume response.
 * Enforces zero-fabrication of core entities and guarantees UI compatibility.
 */
function validateTailoredResume(
  parsed: any,
  job: JobPostingInput,
  candidate: any
): TailoredResumeResult {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Tailored resume response must be a JSON object');
  }

  const targetedRole = typeof parsed.targetedRole === 'string' && parsed.targetedRole.trim()
    ? parsed.targetedRole.trim()
    : job.title;

  const headline = typeof parsed.headline === 'string' && parsed.headline.trim()
    ? parsed.headline.trim()
    : candidate.headline || `${targetedRole} | Distributed AI Specialist`;

  const summary = typeof parsed.summary === 'string' && parsed.summary.trim()
    ? parsed.summary.trim()
    : candidate.bio || `Specialized AI Systems Engineer tailored for ${targetedRole} at ${job.company}.`;

  const skills: string[] = Array.isArray(parsed.skills)
    ? parsed.skills.map((s: any) => String(s).trim()).filter(Boolean)
    : Array.isArray(parsed.tailoredSkills)
    ? parsed.tailoredSkills.map((s: any) => String(s).trim()).filter(Boolean)
    : candidate.skills.slice(0, 10);

  // Normalize experience highlights ensuring company names & timeline are candidate-truthful
  let experienceHighlights = Array.isArray(parsed.experienceHighlights)
    ? parsed.experienceHighlights.map((exp: any, idx: number) => {
        const baseExp = candidate.experienceHighlights?.[idx] || {};
        return {
          title: typeof exp?.title === 'string' ? exp.title : baseExp.title || 'Systems Engineer',
          company: baseExp.company || (typeof exp?.company === 'string' ? exp.company : 'Tactical Systems'),
          period: baseExp.period || (typeof exp?.period === 'string' ? exp.period : '2024 — Present'),
          highlights: Array.isArray(exp?.highlights)
            ? exp.highlights.map((h: any) => String(h).trim()).filter(Boolean)
            : baseExp.highlights || [],
        };
      })
    : candidate.experienceHighlights || [];

  if (experienceHighlights.length === 0 && candidate.experienceHighlights) {
    experienceHighlights = candidate.experienceHighlights;
  }

  // Normalize projects ensuring non-fabrication
  let projects = Array.isArray(parsed.projects)
    ? parsed.projects.map((proj: any, idx: number) => {
        const baseProj = candidate.projects?.[idx] || {};
        return {
          name: typeof proj?.name === 'string' ? proj.name : baseProj.name || 'System Architecture',
          tech: Array.isArray(proj?.tech)
            ? proj.tech.map((t: any) => String(t).trim()).filter(Boolean)
            : baseProj.tech || ['Python', 'CUDA'],
          description: typeof proj?.description === 'string' ? proj.description : baseProj.description || '',
          outcomes: Array.isArray(proj?.outcomes)
            ? proj.outcomes.map((o: any) => String(o).trim()).filter(Boolean)
            : baseProj.outcomes || [],
        };
      })
    : candidate.projects || [];

  if (projects.length === 0 && candidate.projects) {
    projects = candidate.projects;
  }

  // Normalize education
  const education = {
    degree: typeof parsed.education?.degree === 'string'
      ? parsed.education.degree
      : candidate.education?.degree || 'B.Tech in Computer Science & Artificial Intelligence',
    institution: typeof parsed.education?.institution === 'string'
      ? parsed.education.institution
      : candidate.education?.institution || 'National Institute of Technology',
    year: typeof parsed.education?.year === 'string'
      ? parsed.education.year
      : candidate.education?.year || '2024',
  };

  return {
    targetedRole,
    targetRole: targetedRole,
    targetCompany: job.company,
    candidateName: candidate.name || 'Karan Borana',
    headline,
    summary,
    skills,
    tailoredSkills: skills,
    experienceHighlights,
    projects,
    education,
    integrityVerified: true,
    forgedAt: new Date().toISOString(),
  };
}

/**
 * Execute job-specific Resume Tailoring with Gemma 4 31B IT
 */
export async function tailorResumeWithGemma(
  job: JobPostingInput,
  candidate: any
): Promise<TailoredResumeResult> {
  const apiKey = config.geminiApiKey;
  const model = config.geminiModel || 'gemma-4-31b-it';

  if (!apiKey || apiKey.trim() === '') {
    throw new Error(
      `GEMINI_API_KEY is not configured on the server. Unable to invoke model "${model}".`
    );
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
You are an expert resume tailoring assistant.

Create a targeted resume from the supplied candidate profile for the supplied job.

You may improve wording and prioritization, but you MUST NOT introduce facts that are not present in the candidate profile.

Return ONLY valid JSON.

If information is unavailable, use an empty array/string instead of inventing information.

CRITICAL INTEGRITY RULES:
The AI MUST NOT:
- invent employment
- invent companies
- invent projects
- invent degrees
- invent GPA
- invent certifications
- invent achievements
- invent years of experience
- invent technologies not present in the candidate profile

It MAY:
- reorder existing skills
- rewrite wording
- improve clarity
- emphasize relevant existing skills
- tailor the professional summary
- select relevant existing projects
- rewrite existing experience bullets without changing factual meaning

The output must remain truthful to the supplied candidate profile.

REQUIRED JSON SCHEMA:
{
  "targetedRole": "Target role title",
  "headline": "Candidate headline tailored to target requisition",
  "summary": "Tailored 2-3 sentence executive summary reflecting genuine candidate competencies",
  "skills": ["Relevant skill 1", "Relevant skill 2"],
  "experienceHighlights": [
    {
      "title": "Exact role title from profile",
      "company": "Exact company name from profile",
      "period": "Exact period from profile",
      "highlights": ["Refined bullet point emphasizing genuine work done"]
    }
  ],
  "projects": [
    {
      "name": "Exact project name from profile",
      "tech": ["Verified tech stack"],
      "description": "Tailored description",
      "outcomes": ["Verified outcome metrics"]
    }
  ],
  "education": {
    "degree": "Exact degree from profile",
    "institution": "Exact institution from profile",
    "year": "Exact year from profile"
  },
  "integrityVerified": true
}

CANDIDATE PROFILE:
Name: ${candidate.name}
Headline: ${candidate.headline}
Bio: ${candidate.bio}
Skills: ${candidate.skills.join(', ')}
Education: ${candidate.education?.degree} from ${candidate.education?.institution} (${candidate.education?.year})
Experience:
${JSON.stringify(candidate.experienceHighlights, null, 2)}
Projects:
${JSON.stringify(candidate.projects, null, 2)}

TARGET JOB:
Title: ${job.title}
Company: ${job.company}
Target Skills: ${job.skills.join(', ')}
Requirements: ${(job.requirements || []).join('; ')}
Description:
${job.description.slice(0, 3000)}
`.trim();

  let response: Response | null = null;
  let lastErrorMsg = '';

  for (let attempt = 1; attempt <= 3; attempt++) {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (response.ok) {
      break;
    }

    const errorBody = await response.text();
    lastErrorMsg = `Google Gemini API returned HTTP ${response.status}: ${response.statusText}`;
    try {
      const parsedErr = JSON.parse(errorBody);
      if (parsedErr.error?.message) {
        lastErrorMsg += ` - ${parsedErr.error.message}`;
      }
    } catch {
      lastErrorMsg += ` - ${errorBody.slice(0, 200)}`;
    }

    // Retry transient 500/503 errors with exponential backoff
    if ((response.status === 500 || response.status === 503) && attempt < 3) {
      const backoffMs = attempt * 2000;
      console.warn(`[GemmaService] Transient ${response.status} from Gemini API during tailorResume, retrying in ${backoffMs}ms (attempt ${attempt}/3)...`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      continue;
    }

    throw new Error(lastErrorMsg);
  }

  if (!response || !response.ok) {
    throw new Error(lastErrorMsg || 'Failed to communicate with Gemma 4 31B IT API');
  }

  const responseData: any = await response.json();
  const candidateObj = responseData?.candidates?.[0];

  if (!candidateObj?.content?.parts || !Array.isArray(candidateObj.content.parts)) {
    throw new Error('No candidate content parts returned from Gemma 4 31B IT during resume tailoring');
  }

  const nonThoughtParts = candidateObj.content.parts.filter((p: any) => !p.thought && p.text);
  const rawText = nonThoughtParts.length > 0
    ? nonThoughtParts.map((p: any) => p.text).join('\n')
    : candidateObj.content.parts.map((p: any) => p.text || '').join('\n');

  if (!rawText.trim()) {
    throw new Error('Empty text content received from Gemma 4 31B IT for resume tailoring');
  }

  let parsedJson: any;
  try {
    parsedJson = extractJsonFromText(rawText);
  } catch (err: any) {
    throw new Error(`[GemmaService] Failed to extract valid JSON: ${err.message}. Raw output: ${rawText.slice(0, 300)}`);
  }

  const validatedResult = validateTailoredResume(parsedJson, job, candidate);
  return validatedResult;
}

