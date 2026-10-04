import { Router, Request, Response } from 'express';
import { syncJobsFromExternalSource, getJobsFromDatabase } from '../services/jobs/jobService.js';

export const jobsRouter = Router();

/**
 * POST /api/jobs/sync
 * Ingest fresh remote opportunities from Himalayas public API into MongoDB
 */
jobsRouter.post('/sync', async (req: Request, res: Response) => {
  try {
    const limit = req.body?.limit ? parseInt(req.body.limit, 10) : 20;
    const stats = await syncJobsFromExternalSource(limit);

    res.status(200).json({
      success: stats.success,
      fetched: stats.fetched,
      inserted: stats.inserted,
      duplicates: stats.duplicates,
    });
  } catch (error: any) {
    console.error('[API ERROR] /api/jobs/sync failed:', error?.message);
    res.status(500).json({
      success: false,
      error: 'Failed to synchronize remote jobs from external source',
      details: error?.message || 'Unknown server error',
    });
  }
});

/**
 * GET /api/jobs
 * Retrieve targets from MongoDB with query parameters: q, workplace, minMatch, sort, page, limit
 */
jobsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { q, workplace, minMatch, sort, page, limit } = req.query;

    const result = await getJobsFromDatabase({
      q: typeof q === 'string' ? q : undefined,
      workplace: typeof workplace === 'string' ? workplace : undefined,
      minMatch: minMatch ? parseInt(minMatch as string, 10) : undefined,
      sort: typeof sort === 'string' ? sort : undefined,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
    });

    res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      jobs: result.jobs,
    });
  } catch (error: any) {
    console.error('[API ERROR] GET /api/jobs failed:', error?.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve jobs from MongoDB',
      details: error?.message || 'Unknown server error',
    });
  }
});

export default jobsRouter;
