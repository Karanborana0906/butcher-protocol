import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Load .env first if it exists
if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Load .env.local with override if it exists
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
}

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemma-4-31b-it',
  nodeEnv: process.env.NODE_ENV || 'development',
};
