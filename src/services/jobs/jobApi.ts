import type { JobTarget } from '../../data/mockJobs';

// Base API configuration with environment variable support
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface JobFilterParams {
  searchQuery?: string;
  workplace?: string;
  minMatch?: number;
  priority?: string;
  sortBy?: 'MATCH' | 'DATE' | 'PRIORITY';
  page?: number;
  limit?: number;
}

export interface FetchJobsResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  jobs: JobTarget[];
}

export interface SyncJobsResponse {
  success: boolean;
  fetched: number;
  inserted: number;
  duplicates: number;
}

/**
 * Fetch targets from backend MongoDB API
 */
export async function getJobs(params: JobFilterParams = {}): Promise<FetchJobsResponse> {
  const query = new URLSearchParams();

  if (params.searchQuery && params.searchQuery.trim()) {
    query.set('q', params.searchQuery.trim());
  }
  if (params.workplace && params.workplace !== 'ALL') {
    query.set('workplace', params.workplace);
  }
  if (params.minMatch && params.minMatch > 0) {
    query.set('minMatch', params.minMatch.toString());
  }
  if (params.priority && params.priority !== 'ALL') {
    query.set('priority', params.priority);
  }
  if (params.sortBy) {
    query.set('sort', params.sortBy);
  }
  if (params.page) {
    query.set('page', params.page.toString());
  }
  if (params.limit) {
    query.set('limit', params.limit.toString());
  }

  const queryString = query.toString();
  const url = `${API_BASE_URL}/api/jobs${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Backend API returned HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Trigger backend ingestion sync from external Himalayas API
 */
export async function syncJobs(limit = 20): Promise<SyncJobsResponse> {
  const url = `${API_BASE_URL}/api/jobs/sync`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ limit }),
  });

  if (!response.ok) {
    throw new Error(`Sync failed with HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export interface JobAnalysisResult {
  matchScore: number;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export interface AnalyzeJobResponse {
  success: boolean;
  analysis: JobAnalysisResult;
  error?: string;
}

/**
 * Execute real AI Job Analysis via Gemma 4 31B IT on backend
 */
export async function analyzeJobTarget(jobId: string): Promise<AnalyzeJobResponse> {
  const url = `${API_BASE_URL}/api/ai/analyze-job`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ jobId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Failed to analyze target requisition`);
  }

  return data;
}

export interface TailorResumeResponse {
  success: boolean;
  resume: any;
  error?: string;
}

/**
 * Execute real AI Job-Specific Resume Tailoring via Gemma 4 31B IT on backend
 */
export async function tailorResumeTarget(jobId: string): Promise<TailorResumeResponse> {
  const url = `${API_BASE_URL}/api/ai/tailor-resume`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ jobId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Failed to tailor resume with Gemma 4`);
  }

  return data;
}


