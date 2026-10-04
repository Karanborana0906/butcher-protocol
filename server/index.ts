import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { connectToDatabase, disconnectDatabase } from './db/mongodb.js';
import { apiRouter } from './routes/index.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Root Route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    service: 'BUTCHER PROTOCOL API',
    status: 'ONLINE',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      jobs: '/api/jobs',
      aiAnalyzeJob: '/api/ai/analyze-job',
      aiTailorResume: '/api/ai/tailor-resume',
    },
  });
});

// Direct Health Route
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    service: 'butcher-protocol-api',
    status: 'online',
  });
});

// Mount modular API router
app.use('/api', apiRouter);

// Start Server
const server = app.listen(config.port, '0.0.0.0', async () => {
  console.log(`
======================================================
  BUTCHER PROTOCOL // BACKEND COMMAND SERVER
  PORT: ${config.port}
  CLIENT URL: ${config.clientUrl}
  HEALTH CHECK: http://localhost:${config.port}/api/health
======================================================
  `);

  // Attempt database connection
  try {
    await connectToDatabase();
  } catch (err: any) {
    console.warn('[DATABASE] Initial connection delayed; will auto-retry on incoming requests.');
  }
});

// Graceful Shutdown
const handleShutdown = async (signal: string) => {
  console.log(`\n[SYSTEM] Received ${signal}. Shutting down backend gracefully...`);
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
