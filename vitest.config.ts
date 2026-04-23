/**
 * File: vitest.config.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Vitest configuration for TypeScript unit tests and coverage.
 */
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    globals: false,
    include: ["tests/**/*.test.ts", "src/**/*.test.ts", "src/**/*.spec.ts"],
    passWithNoTests: false,
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
    },
  },
});
