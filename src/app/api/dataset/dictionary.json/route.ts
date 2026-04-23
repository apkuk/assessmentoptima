/**
 * File: src/app/api/dataset/dictionary.json/route.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Serves the public dataset data dictionary.
 */
import { dataDictionary } from "@/features/assessment/application/public-dataset";
import { jsonResponse } from "@/lib/api/responses";

export const runtime = "nodejs";

export async function GET() {
  return jsonResponse({
    fields: dataDictionary,
    generatedAt: new Date().toISOString(),
  });
}
