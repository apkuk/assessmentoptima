/**
 * File: src/lib/env/server.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Server-side environment parsing and defaults.
 */
import { z } from "zod";

import { appConfig } from "@/config/app";

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1).optional(),
  MONGODB_DB: z.string().min(1).default(appConfig.defaultDatabaseName),
  HASH_SECRET: z.string().min(24).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default(appConfig.defaultAppUrl),
  ASSESSMENT_VERSION: z
    .string()
    .min(1)
    .default(appConfig.defaultAssessmentVersion),
  CONSENT_VERSION: z.string().min(1).default(appConfig.defaultConsentVersion),
  PUBLIC_DATASET_MIN_N: z.coerce.number().int().min(2).default(10),
  AI_ANALYSIS_ENABLED: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),
  AI_ANALYSIS_RATE_LIMIT: z.coerce.number().int().min(1).default(8),
  AI_ANALYSIS_RATE_WINDOW_SECONDS: z.coerce.number().int().min(60).default(900),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse(process.env);
}
