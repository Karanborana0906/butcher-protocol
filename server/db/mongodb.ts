import mongoose from 'mongoose';
import { config } from '../config/index.js';

interface ConnectionState {
  isConnected?: number;
}

const connection: ConnectionState = {};

/**
 * Connect to MongoDB with connection reuse and graceful error handling.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  // If already connected, reuse connection
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // If currently connecting, wait for connection
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => mongoose.connection.once('connected', resolve));
    return mongoose;
  }

  const mongoUri = config.mongoUri;

  if (!mongoUri) {
    console.warn(
      '[DATABASE WARNING] MONGODB_URI is not set in environment variables. Database features will remain dormant until configured.'
    );
    throw new Error('MONGODB_URI is not set on the server.');
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('[DATABASE] MongoDB connection established successfully.');
    return db;
  } catch (error: any) {
    // Sanitize any potential URI / password from error message
    const safeMessage = error?.message
      ? error.message.replace(/mongodb(\+srv)?:\/\/[^@]+@/gi, 'mongodb$1://***:***@')
      : 'Unknown connection failure';
    console.error('[DATABASE ERROR] Failed to connect to MongoDB:', safeMessage);
    throw new Error(`MongoDB connection failed (${safeMessage}). If using MongoDB Atlas, make sure Network Access has 0.0.0.0/0 allowed.`);
  }
}

/**
 * Returns true if MongoDB connection is active
 */
export function isDatabaseConnected(): boolean {
  return connection.isConnected === 1;
}

/**
 * Disconnect from MongoDB (useful for graceful shutdown or tests).
 */
export async function disconnectDatabase(): Promise<void> {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = 0;
    console.log('[DATABASE] MongoDB connection closed.');
  }
}

export default connectToDatabase;
