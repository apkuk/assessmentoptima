/**
 * File: src/lib/security/tokens.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Result token, token hashing, public row ID, and month helpers.
 */
import { createHash, randomBytes, randomUUID } from "node:crypto";

import { appConfig } from "@/config/app";

export function createResultToken(): string {
  return `${randomUUID()}-${randomBytes(18).toString("base64url")}`;
}

export function resolveHashSecret(
  configuredSecret: string | undefined,
): string {
  if (configuredSecret) {
    return configuredSecret;
  }

  if (process.env.NODE_ENV !== "production") {
    return appConfig.localDevelopmentHashSecret;
  }

  throw new Error("HASH_SECRET is required in production.");
}

export function hashResultToken(token: string, secret: string): string {
  return createHash("sha256").update(`${token}:${secret}`).digest("hex");
}

export function createPublicRowId(): string {
  return randomUUID();
}

export function createPublicShareId(): string {
  return randomBytes(9).toString("base64url");
}

export function getCreatedMonth(date = new Date()): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0",
  )}`;
}
