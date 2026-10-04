/**
 * BUTCHER PROTOCOL — External Job Source Client (Himalayas API)
 * Official Public Remote Jobs API: https://himalayas.app/jobs/api
 * 
 * DESIGN PRINCIPLE:
 * All external network fetching, payload validation, and data normalization
 * remain strictly encapsulated within this module.
 */

export interface HimalayasRawJob {
  title: string;
  excerpt?: string;
  companyName: string;
  companySlug?: string;
  companyLogo?: string;
  employmentType?: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  salaryPeriod?: string;
  seniority?: string[];
  currency?: string | null;
  locationRestrictions?: string[];
  timezoneRestrictions?: number[];
  categories?: string[];
  parentCategories?: string[];
  description: string;
  pubDate: number;
  expiryDate?: number;
  applicationLink: string;
  guid: string;
}

export interface HimalayasApiResponse {
  totalCount: number;
  limit: number;
  offset?: number;
  nextCursor?: string;
  jobs: HimalayasRawJob[];
}

export interface NormalizedJob {
  jobId: string;
  externalId: string;
  title: string;
  company: string;
  location: string;
  workplaceType: 'Remote' | 'On-site' | 'Hybrid';
  source: string;
  postedDate: string;
  skills: string[];
  matchPercentage: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  salary: string;
  requirements: string[];
  experienceLevel: string;
  applicationUrl: string;
}

/**
 * Utility to strip HTML tags from description and decode common entities
 */
function cleanHtmlDescription(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract requirement bullets from HTML or categories
 */
function extractRequirements(html: string, categories: string[] = []): string[] {
  const reqs: string[] = [];
  
  // Try extracting <li> items from HTML
  const liMatches = html.match(/<li>(.*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    for (const li of liMatches) {
      const text = cleanHtmlDescription(li);
      if (text.length > 10 && text.length < 250) {
        reqs.push(text);
      }
      if (reqs.length >= 5) break;
    }
  }

  // Fallback to categories if no bullet points found
  if (reqs.length === 0 && categories.length > 0) {
    reqs.push(
      ...categories.slice(0, 4).map((c) => `Demonstrated proficiency in ${c.replace(/-/g, ' ')}`)
    );
  }

  return reqs.length > 0 ? reqs : ['Demonstrated software engineering and system architecture competencies'];
}

/**
 * Format relative or human-readable posted date from unix timestamp (seconds)
 */
function formatPostedDate(unixSeconds: number): string {
  if (!unixSeconds) return 'Recently';
  const nowMs = Date.now();
  const postedMs = unixSeconds * 1000;
  const diffHours = Math.floor((nowMs - postedMs) / (1000 * 60 * 60));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1d ago';
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

/**
 * Format compensation range
 */
function formatSalary(job: HimalayasRawJob): string {
  if (job.minSalary && job.maxSalary) {
    const curr = job.currency || '$';
    return `${curr}${job.minSalary.toLocaleString()} - ${curr}${job.maxSalary.toLocaleString()}${
      job.salaryPeriod ? ` / ${job.salaryPeriod}` : ''
    }`;
  }
  if (job.minSalary) {
    const curr = job.currency || '$';
    return `From ${curr}${job.minSalary.toLocaleString()}`;
  }
  return 'Competitive / Undisclosed';
}

/**
 * Normalize an external Himalayas job record into BUTCHER PROTOCOL JobTarget schema
 */
export function normalizeHimalayasJob(raw: HimalayasRawJob, index: number): NormalizedJob {
  // Extract unique slug or numeric id from guid URL
  const guidParts = raw.guid.replace(/\/$/, '').split('/');
  const slug = guidParts[guidParts.length - 1] || `${index + 1}`;
  const tacticalId = `TGT-HIM-${slug.slice(0, 18).toUpperCase()}`;

  // Location string
  const locList = raw.locationRestrictions || [];
  const location = locList.length > 0 ? `Remote (${locList.slice(0, 3).join(', ')})` : 'Remote (Worldwide)';

  // Priority heuristic based on seniority
  let priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' = 'HIGH';
  const seniority = (raw.seniority?.[0] || '').toLowerCase();
  if (seniority.includes('senior') || seniority.includes('lead') || seniority.includes('staff')) {
    priority = 'CRITICAL';
  } else if (seniority.includes('entry') || seniority.includes('junior')) {
    priority = 'MEDIUM';
  }

  // Clean skills from categories
  const skills = (raw.categories || [])
    .map((c) => c.replace(/-/g, ' ').trim())
    .filter((c) => c.length > 1 && c.length < 35)
    .slice(0, 8);

  const cleanDescription = cleanHtmlDescription(raw.description);
  const requirements = extractRequirements(raw.description, raw.categories);

  return {
    jobId: tacticalId,
    externalId: raw.guid,
    title: raw.title.trim(),
    company: raw.companyName.trim(),
    location,
    workplaceType: 'Remote',
    source: 'Himalayas Intel',
    postedDate: formatPostedDate(raw.pubDate),
    skills: skills.length > 0 ? skills : ['Distributed Systems', 'Remote Work'],
    matchPercentage: 0, // Deterministic application logic will score against candidate profile
    priority,
    description: cleanDescription || raw.excerpt || 'No description provided.',
    salary: formatSalary(raw),
    requirements,
    experienceLevel: raw.seniority?.[0] || 'Mid-Senior',
    applicationUrl: raw.applicationLink || raw.guid,
  };
}

/**
 * Fetch and normalize jobs from Himalayas public API
 */
export async function fetchHimalayasJobs(limit = 20): Promise<NormalizedJob[]> {
  const url = `https://himalayas.app/jobs/api?limit=${limit}`;

  try {
    console.log(`[JOB INGESTION] Fetching remote jobs from Himalayas API: ${url}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'ButcherProtocol-CareerIntel/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Himalayas API responded with HTTP status ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as HimalayasApiResponse;

    if (!data.jobs || !Array.isArray(data.jobs)) {
      console.warn('[JOB INGESTION WARNING] Invalid payload structure returned from Himalayas API.');
      return [];
    }

    console.log(`[JOB INGESTION] Successfully fetched ${data.jobs.length} raw jobs from Himalayas API.`);
    return data.jobs.map((job, idx) => normalizeHimalayasJob(job, idx));
  } catch (error) {
    console.error('[JOB INGESTION ERROR] Failed to fetch from Himalayas API:', error);
    throw error;
  }
}
