"use client";

/**
 * File: src/features/assessment/components/respondent-context-form.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Optional respondent context fields for the assessment flow.
 */
import { respondentContextFields } from "@/features/assessment/application/respondent-context";
import {
  defaultRespondentContext,
  type RespondentContext,
} from "@/features/assessment/schemas/assessment";

import styles from "./assessment-flow.module.css";

interface RespondentContextFormProps {
  context: RespondentContext;
  onChange: (
    key: (typeof respondentContextFields)[number]["key"],
    value: string,
  ) => void;
}

export function RespondentContextForm({
  context,
  onChange,
}: RespondentContextFormProps) {
  return (
    <div className={styles.contextGrid}>
      {respondentContextFields.map((field) => (
        <div className="field" key={field.key}>
          <label>
            {field.label}
            <select
              value={context[field.key] ?? defaultRespondentContext[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}
