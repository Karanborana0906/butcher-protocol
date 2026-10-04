/**
 * BUTCHER PROTOCOL — Gemma 4 31B IT Prompt Templates
 * Model identifier: gemma-4-31b-it
 * 
 * Target Architecture:
 * - Structured JSON output only.
 * - Deterministic scoring is calculated by application logic, NOT by the LLM.
 * - Absolute integrity: zero hallucination/fabrication of candidate qualifications.
 */

export const GEMMA_MODEL_IDENTIFIER = 'gemma-4-31b-it';

export const SYSTEM_INTELLIGENCE_DIRECTIVE = `
YOU ARE BUTCHER PROTOCOL CAREER INTELLIGENCE CORE (MODEL: ${GEMMA_MODEL_IDENTIFIER}).
You operate under strict tactical extraction protocols:
1. OUTPUT STRUCTURED JSON ONLY. Do not prepend markdown formatting, explanations, or commentary outside the JSON block.
2. ZERO FABRICATION POLICY: Never hallucinate skills, certifications, work experiences, or degrees. Only synthesize and refine genuine candidate inputs.
3. SCORING RESTRICTION: Do not calculate final composite match percentages. Extract criteria cleanly; deterministic application logic executes algorithmic score calculations.
`.trim();

export const analyzeJobPrompt = (jobDescription: string): string => `
${SYSTEM_INTELLIGENCE_DIRECTIVE}

TASK: Extract structured intelligence from the following job target description.

TARGET INTEL:
"""
${jobDescription}
"""

EXPECTED JSON SCHEMA:
{
  "role": "Extracted exact role title",
  "company": "Company or organization name",
  "requiredSkills": ["Skill 1", "Skill 2"],
  "preferredSkills": ["Skill 1", "Skill 2"],
  "experience": "Years and level of required experience",
  "education": "Degree requirements or equivalent experience",
  "location": "Geographic location or remote specification",
  "employmentType": "Full-time / Contract / Internship",
  "summary": "Concise 2-sentence executive summary of the target role",
  "keyResponsibilities": ["Duty 1", "Duty 2", "Duty 3"]
}
`.trim();

export const tailorResumePrompt = (
  candidateProfile: string,
  baseResume: string,
  jobDescription: string
): string => `
${SYSTEM_INTELLIGENCE_DIRECTIVE}

TASK: Forge a targeted resume tailored to the specific target requisition.
ETHICAL CONSTRAINT: Strictly reorder and highlight genuine candidate competencies. NEVER introduce false past employers, non-existent projects, or unearned credentials.

CANDIDATE BASE PROFILE:
"""
${candidateProfile}
"""

BASE RESUME:
"""
${baseResume}
"""

TARGET JOB REQUISITION:
"""
${jobDescription}
"""

EXPECTED JSON SCHEMA:
{
  "targetRole": "Role title",
  "targetCompany": "Target organization",
  "candidateName": "Candidate full name",
  "headline": "High-impact tactical headline",
  "summary": "Tailored career summary aligning genuine background to target requirements",
  "tailoredSkills": ["Prioritized genuine skills matching the target role"],
  "experienceHighlights": [
    {
      "title": "Role Title",
      "company": "Company Name",
      "period": "Start - End Date",
      "highlights": ["Tailored bullet emphasizing genuine impact relevant to target"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "tech": ["Python", "PyTorch"],
      "description": "Clear problem statement and architecture",
      "outcomes": ["Quantifiable result or metric"]
    }
  ],
  "education": {
    "degree": "Verified Degree",
    "institution": "Verified Institution",
    "year": "Graduation Year"
  },
  "integrityVerified": true
}
`.trim();

export const analyzeATSPrompt = (
  resumeText: string,
  jobDescription: string
): string => `
${SYSTEM_INTELLIGENCE_DIRECTIVE}

TASK: Conduct deep keyword and qualification gap extraction between the candidate resume and target requisition.
LABELING: This analysis serves as an INTERNAL COMPATIBILITY ESTIMATE.

CANDIDATE RESUME:
"""
${resumeText}
"""

TARGET REQUISITION:
"""
${jobDescription}
"""

EXPECTED JSON SCHEMA:
{
  "matchedSkills": ["Explicitly matched skills found in both"],
  "missingSkills": ["Skills demanded by target but absent in candidate profile"],
  "keywordCoverageEstimate": 85,
  "recommendations": [
    "Concrete, honest suggestions to highlight genuine relevant experience",
    "Formatting or technical keyword optimization guidance"
  ],
  "diagnosticNotes": [
    {
      "category": "CRITICAL",
      "message": "Missing core requirement: e.g. Distributed Systems experience"
    },
    {
      "category": "OPTIMIZATION",
      "message": "Project descriptions could emphasize throughput metrics"
    },
    {
      "category": "PASSED",
      "message": "Python, PyTorch, and Docker experience verified in profile"
    }
  ]
}
`.trim();
