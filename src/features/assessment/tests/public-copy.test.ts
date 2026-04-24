/**
 * File: src/features/assessment/tests/public-copy.test.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Guardrail tests for public assessment positioning language.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicSourceRoots = [
  "src/app",
  "src/features/assessment/components",
  "src/features/assessment/application/ai-analysis.ts",
];

const bannedPublicPhrases = [
  "Hogan alternative",
  "Hogan-style",
  "bright side",
  "dark side",
  "derailer score",
  "validated psychometric",
  "selection-ready",
];

function sourceFiles(path: string): string[] {
  const stats = statSync(path);

  if (stats.isFile()) {
    return /\.(ts|tsx)$/.test(path) ? [path] : [];
  }

  return readdirSync(path).flatMap((entry) => {
    const fullPath = join(path, entry);

    if (entry.endsWith(".test.ts") || entry.endsWith(".test.tsx")) {
      return [];
    }

    return sourceFiles(fullPath);
  });
}

describe("public assessment copy", () => {
  it("avoids banned v2 positioning phrases", () => {
    const text = publicSourceRoots
      .flatMap(sourceFiles)
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    for (const phrase of bannedPublicPhrases) {
      expect(text).not.toContain(phrase);
    }
  });
});
