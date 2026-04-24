/**
 * File: src/features/assessment/tests/consent.test.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Unit tests for canonical consent schema behavior.
 */
import { describe, expect, it } from "vitest";

import { appConfig } from "@/config/app";

import {
  type ConsentDraft,
  updateConsentDraft,
} from "../application/assessment-flow";
import { consentSchema } from "../schemas/assessment";

const initialConsentDraft: ConsentDraft = {
  useBoundaryAccepted: false,
  assessmentProcessing: false,
  researchStorage: false,
  publicDataset: false,
};

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

describe("updateConsentDraft", () => {
  it("enables research storage when public dataset is selected", () => {
    expect(
      updateConsentDraft(initialConsentDraft, "publicDataset", true),
    ).toMatchObject({
      researchStorage: true,
      publicDataset: true,
    });
  });

  it("clears public dataset when research storage is disabled", () => {
    expect(
      updateConsentDraft(
        { ...initialConsentDraft, researchStorage: true, publicDataset: true },
        "researchStorage",
        false,
      ),
    ).toMatchObject({
      researchStorage: false,
      publicDataset: false,
    });
  });
});
