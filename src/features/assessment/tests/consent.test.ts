/**
 * File: src/features/assessment/tests/consent.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Unit tests for canonical consent schema behavior.
 */
import { describe, expect, it } from "vitest";

import { appConfig } from "@/config/app";

import { consentSchema } from "../schemas/assessment";

describe("consentSchema", () => {
  it("requires use-boundary acceptance", () => {
    const result = consentSchema.safeParse({
      useBoundaryAccepted: false,
      assessmentProcessing: true,
      researchStorage: true,
      publicDataset: true,
      consentVersion: appConfig.defaultConsentVersion,
    });

    expect(result.success).toBe(false);
  });

  it("requires assessment processing consent", () => {
    const result = consentSchema.safeParse({
      useBoundaryAccepted: true,
      assessmentProcessing: false,
      researchStorage: true,
      publicDataset: true,
      consentVersion: appConfig.defaultConsentVersion,
    });

    expect(result.success).toBe(false);
  });

  it("allows public dataset consent to be false", () => {
    const result = consentSchema.safeParse({
      useBoundaryAccepted: true,
      assessmentProcessing: true,
      researchStorage: true,
      publicDataset: false,
      consentVersion: appConfig.defaultConsentVersion,
    });

    expect(result.success).toBe(true);
  });
});
