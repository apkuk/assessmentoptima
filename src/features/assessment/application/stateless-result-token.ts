/**
 * File: src/features/assessment/application/stateless-result-token.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Signed fallback result tokens for demo-mode reports when persistence is unavailable.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";

import {
  assessmentResultResponseSchema,
  type AssessmentResultResponse,
} from "../schemas/assessment";

const STATELESS_RESULT_PREFIX = "srt1";

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signaturesMatch(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function createStatelessResultToken(
  payload: AssessmentResultResponse,
  secret: string,
): string {
  const parsedPayload = assessmentResultResponseSchema.parse(payload);
  const compressedPayload = deflateRawSync(
    Buffer.from(JSON.stringify(parsedPayload), "utf8"),
  ).toString("base64url");
  const signature = signPayload(compressedPayload, secret);

  return `${STATELESS_RESULT_PREFIX}.${compressedPayload}.${signature}`;
}

export function parseStatelessResultToken(
  token: string,
  secret: string,
): AssessmentResultResponse | null {
  const [prefix, compressedPayload, signature] = token.split(".");

  if (
    prefix !== STATELESS_RESULT_PREFIX ||
    !compressedPayload ||
    !signature ||
    !signaturesMatch(signPayload(compressedPayload, secret), signature)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      inflateRawSync(Buffer.from(compressedPayload, "base64url")).toString(
        "utf8",
      ),
    );

    return assessmentResultResponseSchema.parse(payload);
  } catch {
    return null;
  }
}
