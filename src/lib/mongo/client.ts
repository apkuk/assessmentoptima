/**
 * File: src/lib/mongo/client.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: MongoDB client and database access with development-safe caching.
 */
import { MongoClient, type MongoClientOptions } from "mongodb";

import { getServerEnv } from "@/lib/env/server";

declare global {
  var assessmentOptimaMongoClientPromise: Promise<MongoClient> | undefined;
}

export class MongoConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MongoConfigurationError";
  }
}

const mongoClientOptions = {
  connectTimeoutMS: 8000,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 20000,
} satisfies MongoClientOptions;

const connectivityErrorNames = new Set([
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
  "MongoServerSelectionError",
  "MongoTimeoutError",
]);

export function isMongoConnectivityError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (connectivityErrorNames.has(error.name) ||
      error.message.toLowerCase().includes("server selection timed out"))
  );
}

export async function getMongoClient(): Promise<MongoClient> {
  const { MONGODB_URI } = getServerEnv();

  if (!MONGODB_URI) {
    throw new MongoConfigurationError("MONGODB_URI is not configured.");
  }

  globalThis.assessmentOptimaMongoClientPromise ??= new MongoClient(
    MONGODB_URI,
    mongoClientOptions,
  ).connect();

  return globalThis.assessmentOptimaMongoClientPromise;
}

export async function getMongoDb() {
  const { MONGODB_DB } = getServerEnv();
  const client = await getMongoClient();

  return client.db(MONGODB_DB);
}
