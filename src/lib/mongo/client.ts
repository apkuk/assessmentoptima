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
  connectTimeoutMS: 3000,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 10000,
} satisfies MongoClientOptions;

const connectivityErrorNames = new Set([
  "MongoNetworkError",
  "MongoNetworkTimeoutError",
  "MongoServerSelectionError",
  "MongoTimeoutError",
]);

export function isMongoConnectivityError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  return (
    error instanceof Error &&
    (connectivityErrorNames.has(error.name) ||
      message.includes("server selection timed out") ||
      message.includes("querysrv") ||
      message.includes("enotfound") ||
      message.includes("econnrefused") ||
      message.includes("etimedout"))
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
  )
    .connect()
    .catch((error: unknown) => {
      globalThis.assessmentOptimaMongoClientPromise = undefined;
      throw error;
    });

  return globalThis.assessmentOptimaMongoClientPromise;
}

export async function getMongoDb() {
  const { MONGODB_DB } = getServerEnv();
  const client = await getMongoClient();

  return client.db(MONGODB_DB);
}
