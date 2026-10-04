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
const server = app.listen(config.port, async () => {
  console.log(`
======================================================
  BUTCHER PROTOCOL // BACKEND COMMAND SERVER
  PORT: ${config.port}
  CLIENT URL: ${config.clientUrl}
  HEALTH CHECK: http://localhost:${config.port}/api/health
======================================================
  `);

  // Attempt database connection
  await connectToDatabase();
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
