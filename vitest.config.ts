import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    include: ["tests/**/*.test.ts", "src/**/*.test.ts", "src/**/*.spec.ts"],
    passWithNoTests: false,
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage"
    }
  }
});
