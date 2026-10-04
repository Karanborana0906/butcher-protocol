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
  if (connection.isConnected === 1) {
    return mongoose;
  }

  const mongoUri = config.mongoUri;

  if (!mongoUri) {
    console.warn(
      '[DATABASE WARNING] MONGODB_URI is not set in environment variables. Database features will remain dormant until configured.'
    );
    return null;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('[DATABASE] MongoDB connection established successfully.');
    return db;
  } catch (error: any) {
    // Sanitize any potential URI / password from error message
    const safeMessage = error?.message
      ? error.message.replace(/mongodb(\+srv)?:\/\/[^@]+@/gi, 'mongodb$1://***:***@')
      : 'Unknown connection failure';
    console.error('[DATABASE ERROR] Failed to connect to MongoDB:', safeMessage);
    connection.isConnected = 0;
    return null;
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
