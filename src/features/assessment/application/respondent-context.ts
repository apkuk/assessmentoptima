/**
 * File: src/features/assessment/application/respondent-context.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Respondent context field metadata derived from the canonical L0 schemas.
 */
import {
  ageBands,
  orgSizeBands,
  regionBuckets,
  roleLevels,
  sectorBuckets,
  workModes,
  yearsExperienceBands,
  type RespondentContext,
} from "../schemas/assessment";

export const respondentContextFields = [
  { key: "ageBand", label: "Age band", options: ageBands },
  { key: "regionBucket", label: "Region", options: regionBuckets },
  { key: "sectorBucket", label: "Sector", options: sectorBuckets },
  { key: "roleLevel", label: "Role level", options: roleLevels },
  { key: "orgSizeBand", label: "Organisation size", options: orgSizeBands },
  { key: "workMode", label: "Work mode", options: workModes },
  {
    key: "yearsExperienceBand",
    label: "Years of work experience",
    options: yearsExperienceBands,
  },
] as const satisfies readonly {
  key: keyof RespondentContext;
  label: string;
  options: readonly string[];
}[];
