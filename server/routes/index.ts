import { Router } from 'express';

import { jobsRouter } from './jobs.js';
import { aiRouter } from './ai.js';

export const apiRouter = Router();

// Health route (also exposed at root level /api/health)
apiRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    service: 'butcher-protocol-api',
    status: 'online',
  });
});

// Mount Jobs Router (/api/jobs)
apiRouter.use('/jobs', jobsRouter);

// Mount AI Router (/api/ai)
apiRouter.use('/ai', aiRouter);

export default apiRouter;
