/**
 * File: src/app/api/health/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Lightweight health check for Vercel and local smoke testing.
 */
import { jsonResponse } from "@/lib/api/responses";
import { appConfig } from "@/config/app";

export const runtime = "nodejs";

export async function GET() {
  return jsonResponse({
    ok: true,
    service: appConfig.productSlug,
    checkedAt: new Date().toISOString(),
  });
}
