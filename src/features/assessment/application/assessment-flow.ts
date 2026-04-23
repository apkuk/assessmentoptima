/**
 * File: src/features/assessment/application/assessment-flow.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: UI flow constants for the gated WorkStyle Compass assessment.
 */
import { answerValues, type AnswerValue } from "../schemas/assessment";

export const assessmentStorageKey = "assessmentoptima.workstyle-compass.v1";
export const assessmentPageSize = 9;

export const assessmentFlowSteps = [
  "intro",
  "consent",
  "context",
  "questions",
  "review",
] as const;

export type AssessmentFlowStep = (typeof assessmentFlowSteps)[number];

export const assessmentStepLabels: Record<AssessmentFlowStep, string> = {
  intro: "Intro",
  consent: "Consent",
  context: "About you",
  questions: "Assessment",
  review: "Review",
};

export const likertOptions = answerValues.map((value) => {
  const labels: Record<AnswerValue, string> = {
    1: "Strongly disagree",
    2: "Disagree",
    3: "Mixed",
    4: "Agree",
    5: "Strongly agree",
  };

  return {
    value,
    label: labels[value],
  };
});

export interface ConsentDraft {
  useBoundaryAccepted: boolean;
  assessmentProcessing: boolean;
  researchStorage: boolean;
  publicDataset: boolean;
}
