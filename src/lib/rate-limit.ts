/**
 * File: src/lib/rate-limit.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Upstash-backed rate limiting with a local development fallback.
 */
import type { ServerEnv } from "@/lib/env/server";

interface RateLimitInput {
  key: string;
  limit: number;
  windowSeconds: number;
  env: Pick<ServerEnv, "UPSTASH_REDIS_REST_URL" | "UPSTASH_REDIS_REST_TOKEN">;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

declare global {
  var assessmentOptimaRateLimitBuckets:
    | Map<string, { count: number; resetAt: number }>
    | undefined;
}

async function upstashCommand(
  env: RateLimitInput["env"],
  command: string[],
): Promise<unknown> {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  const response = await fetch(env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();

  if (payload && typeof payload === "object" && "result" in payload) {
    return payload.result;
  }

  return null;
}

async function upstashRateLimit(
  input: RateLimitInput,
): Promise<RateLimitResult | null> {
  if (
    !input.env.UPSTASH_REDIS_REST_URL ||
    !input.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  const bucketKey = `rate:${input.key}`;
  const resetAt = Date.now() + input.windowSeconds * 1000;
  const countResult = await upstashCommand(input.env, ["INCR", bucketKey]);
  const count = typeof countResult === "number" ? countResult : null;

  if (count === null) {
    return null;
  }

  if (count === 1) {
    await upstashCommand(input.env, [
      "EXPIRE",
      bucketKey,
      String(input.windowSeconds),
    ]);
  }

  return {
    allowed: count <= input.limit,
    remaining: Math.max(0, input.limit - count),
    resetAt,
  };
}

function memoryRateLimit(input: RateLimitInput): RateLimitResult {
  globalThis.assessmentOptimaRateLimitBuckets ??= new Map();

  const now = Date.now();
  const resetAt = now + input.windowSeconds * 1000;
  const current = globalThis.assessmentOptimaRateLimitBuckets.get(input.key);
  const bucket =
    current && current.resetAt > now ? current : { count: 0, resetAt };

  bucket.count += 1;
  globalThis.assessmentOptimaRateLimitBuckets.set(input.key, bucket);

  return {
    allowed: bucket.count <= input.limit,
    remaining: Math.max(0, input.limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export async function rateLimit(
  input: RateLimitInput,
): Promise<RateLimitResult> {
  return (await upstashRateLimit(input)) ?? memoryRateLimit(input);
}
