/**
 * File: src/features/assessment/components/assessment-stepper.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Stepper and save/progress summary for the gated assessment flow.
 */
import type { CSSProperties } from "react";

import {
  assessmentFlowSteps,
  assessmentStepLabels,
  type AssessmentFlowStep,
} from "@/features/assessment/application/assessment-flow";

import styles from "./assessment-flow.module.css";

interface AssessmentStepperProps {
  activeStep: AssessmentFlowStep;
  answeredCount: number;
  itemCount: number;
  savedLabel: string;
}

export function AssessmentStepper({
  activeStep,
  answeredCount,
  itemCount,
  savedLabel,
}: AssessmentStepperProps) {
  const activeIndex = assessmentFlowSteps.indexOf(activeStep);
  const completion = Math.round((answeredCount / itemCount) * 100);

  return (
    <div className={styles.flowStatus} aria-label="Assessment progress">
      <div className={styles.saveStatus} aria-live="polite">
        {savedLabel}
      </div>
      <div
        aria-label={`${answeredCount} of ${itemCount} questions answered`}
        className={styles.progressCircle}
        style={
          {
            "--assessment-progress": `${completion}%`,
          } as CSSProperties
        }
      >
        <strong>
          {answeredCount}/{itemCount}
        </strong>
        <span>answered</span>
      </div>
      <ol className={styles.stepper}>
        {assessmentFlowSteps.map((step, index) => (
          <li
            className={styles.stepperItem}
            data-active={step === activeStep}
            data-complete={index < activeIndex}
            key={step}
          >
            <span>{index + 1}</span>
            {assessmentStepLabels[step]}
          </li>
        ))}
      </ol>
    </div>
  );
}
