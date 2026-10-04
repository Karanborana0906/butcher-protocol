import { fetchHimalayasJobs, type NormalizedJob } from './jobSource.js';
import { Job, type IJob } from '../../models/Job.js';
import { connectToDatabase } from '../../db/mongodb.js';

export interface SyncStats {
  success: boolean;
  fetched: number;
  inserted: number;
  duplicates: number;
}

export interface GetJobsOptions {
  q?: string;
  workplace?: string;
  minMatch?: number;
  priority?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJobsResult {
  jobs: IJob[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Sync remote jobs from Himalayas external source into MongoDB.
 * Duplicates are detected and ignored via externalId.
 */
export async function syncJobsFromExternalSource(limit = 20): Promise<SyncStats> {
  await connectToDatabase();

  const normalizedJobs: NormalizedJob[] = await fetchHimalayasJobs(limit);
  const fetchedCount = normalizedJobs.length;

  let insertedCount = 0;
  let duplicateCount = 0;

  for (const jobData of normalizedJobs) {
    try {
      // Check if job already exists via externalId or jobId
      const existing = await Job.findOne({
        $or: [{ externalId: jobData.externalId }, { jobId: jobData.jobId }],
      });

      if (existing) {
        duplicateCount++;
        continue;
      }

      await Job.create(jobData);
      insertedCount++;
    } catch (err: any) {
      // If duplicate key error (11000), treat as duplicate
      if (err.code === 11000) {
        duplicateCount++;
      } else {
        console.error(`[JOB SERVICE ERROR] Failed to save job "${jobData.title}":`, err.message);
      }
    }
  }

  console.log(
    `[JOB SERVICE] Sync Complete: Fetched=${fetchedCount}, Inserted=${insertedCount}, Duplicates=${duplicateCount}`
  );

  return {
    success: true,
    fetched: fetchedCount,
    inserted: insertedCount,
    duplicates: duplicateCount,
  };
}

/**
 * Retrieve jobs from MongoDB with search, filters, pagination, and sorting.
 */
export async function getJobsFromDatabase(options: GetJobsOptions): Promise<PaginatedJobsResult> {
  await connectToDatabase();

  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 20));
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = {};

  // Text search on title, company, or skills
  if (options.q && options.q.trim()) {
    const qRegex = new RegExp(options.q.trim(), 'i');
    filter.$or = [
      { title: qRegex },
      { company: qRegex },
      { skills: { $in: [qRegex] } },
      { description: qRegex },
    ];
  }

  // Workplace filter
  if (options.workplace && options.workplace.toUpperCase() !== 'ALL') {
    filter.workplaceType = new RegExp(`^${options.workplace.trim()}$`, 'i');
  }

  // Priority filter
  if (options.priority && options.priority !== 'ALL') {
    filter.priority = options.priority;
  }

  // Minimum match filter
  if (options.minMatch && options.minMatch > 0) {
    filter.matchPercentage = { $gte: options.minMatch };
  }

  // Sorting
  let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
  if (options.sort === 'MATCH') {
    sortObj = { matchPercentage: -1, createdAt: -1 };
  } else if (options.sort === 'DATE') {
    sortObj = { createdAt: -1 };
  } else if (options.sort === 'PRIORITY') {
    // Custom sort or alphabetical priority
    sortObj = { priority: 1, createdAt: -1 };
  }

  const [jobs, total] = await Promise.all([
    Job.find(filter).sort(sortObj).skip(skip).limit(limit),
    Job.countDocuments(filter),
  ]);

  return {
    jobs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}
