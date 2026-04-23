"use client";

/**
 * File: src/features/assessment/components/likert-buttons.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Accessible labelled Likert button group for assessment items.
 */
import { likertOptions } from "@/features/assessment/application/assessment-flow";
import type { AnswerValue } from "@/features/assessment/schemas/assessment";

import styles from "./assessment-flow.module.css";

interface LikertButtonsProps {
  itemText: string;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}

export function LikertButtons({
  itemText,
  value,
  onChange,
}: LikertButtonsProps) {
  return (
    <div
      aria-label={`Rating for: ${itemText}`}
      className={styles.likertButtons}
      role="radiogroup"
    >
      {likertOptions.map((option) => (
        <button
          aria-checked={value === option.value}
          aria-label={option.label}
          className={styles.likertButton}
          data-selected={value === option.value}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          type="button"
        >
          <span className={styles.likertNumber}>{option.value}</span>
          <span className={styles.likertLabel}>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
