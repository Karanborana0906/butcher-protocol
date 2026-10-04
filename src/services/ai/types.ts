/**
 * BUTCHER PROTOCOL — AI Service Types
 * Defines structured JSON interfaces for Gemma 4 31B IT operations.
 * 
 * Rules:
 * 1. AI extracts and structures data; deterministic application logic calculates match scores.
 * 2. Zero fabrication rule: experience, skills, and degrees must never be invented.
 * 3. ATS score is always labeled INTERNAL COMPATIBILITY ESTIMATE.
 */

export interface JobAnalysis {
  role: string;
  company: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experience: string;
  education: string;
  location: string;
  employmentType: string;
  summary: string;
  keyResponsibilities: string[];
  industry?: string;
  extractedAt?: string;
}

export interface ResumeGeneration {
  targetRole: string;
  targetCompany: string;
  candidateName: string;
  headline: string;
  summary: string;
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
  integrityVerified: boolean; // Confirms zero fabricated credentials
  forgedAt: string;
}

export interface ATSAnalysis {
  atsReadiness: number; // Deterministic internal compatibility estimate (0-100)
  keywordCoverage: number; // Percentage
  skillMatch: number; // Percentage
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  diagnosticNotes: {
    category: 'CRITICAL' | 'OPTIMIZATION' | 'PASSED';
    message: string;
  }[];
  disclaimer: 'INTERNAL COMPATIBILITY ESTIMATE';
  timestamp: string;
}

export interface AnalyzeJobParams {
  jobDescriptionText: string;
  sourceUrl?: string;
}

export interface TailorResumeParams {
  baseResumeId: string;
  targetJobId: string;
  targetRole: string;
  targetCompany: string;
  jobDescription: string;
  userSkills: string[];
}

export interface AnalyzeATSParams {
  resumeId: string;
  jobId: string;
  resumeContent?: string;
  jobDescription?: string;
}
