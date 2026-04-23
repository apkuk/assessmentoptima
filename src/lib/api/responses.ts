/**
 * File: src/lib/api/responses.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Shared API response helpers for typed JSON and error payloads.
 */
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { apiErrorResponseSchema } from "@/features/assessment/schemas/assessment";

export function jsonResponse<T>(body: T, init?: ResponseInit): NextResponse<T> {
  return NextResponse.json(body, init);
}

export function apiError(
  status: number,
  error: string,
  detail?: string,
): NextResponse {
  return NextResponse.json(
    apiErrorResponseSchema.parse({ error, ...(detail ? { detail } : {}) }),
    { status },
  );
}

export function zodErrorDetail(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");
}
