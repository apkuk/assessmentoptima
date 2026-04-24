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
  options: {
    code?: string;
    requestId?: string;
    retryable?: boolean;
  } = {},
): NextResponse {
  return NextResponse.json(
    apiErrorResponseSchema.parse({
      error,
      ...(options.code ? { code: options.code } : {}),
      ...(detail ? { detail } : {}),
      ...(options.requestId ? { requestId: options.requestId } : {}),
      ...(options.retryable !== undefined
        ? { retryable: options.retryable }
        : {}),
    }),
    { status },
  );
}

export function zodErrorDetail(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");
}
