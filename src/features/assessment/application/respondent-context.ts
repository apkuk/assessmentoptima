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

interface RespondentContextOption {
  label: string;
  value: string;
}

function toContextOptions<T extends readonly string[]>(
  values: T,
  labels: Record<T[number], string>,
): readonly RespondentContextOption[] {
  return values.map((value) => ({
    label: labels[value as T[number]],
    value,
  }));
}

export const respondentContextFields = [
  {
    key: "ageBand",
    label: "Age band",
    options: toContextOptions(ageBands, {
      under_25: "Under 25",
      "25_34": "25–34",
      "35_44": "35–44",
      "45_54": "45–54",
      "55_64": "55–64",
      "65_plus": "65+",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "regionBucket",
    label: "Region",
    options: toContextOptions(regionBuckets, {
      uk_ireland: "UK & Ireland",
      north_america: "North America",
      europe: "Europe",
      asia_pacific: "Asia Pacific",
      middle_east_africa: "Middle East & Africa",
      latin_america: "Latin America",
      global_remote: "Global / Remote",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "sectorBucket",
    label: "Sector",
    options: toContextOptions(sectorBuckets, {
      technology: "Technology",
      finance: "Finance",
      healthcare: "Healthcare",
      education: "Education",
      professional_services: "Professional Services",
      manufacturing: "Manufacturing",
      public_nonprofit: "Public / Nonprofit",
      retail_hospitality: "Retail / Hospitality",
      media_creative: "Media / Creative",
      other: "Other",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "roleLevel",
    label: "Role level",
    options: toContextOptions(roleLevels, {
      student_early: "Student / Early Career",
      individual_contributor: "Individual Contributor",
      manager: "Manager",
      senior_manager: "Senior Manager",
      director_vp: "Director / VP",
      c_suite_founder: "C-suite / Founder",
      consultant_advisor: "Consultant / Advisor",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "orgSizeBand",
    label: "Organisation size",
    options: toContextOptions(orgSizeBands, {
      solo: "Solo",
      "2_10": "2–10",
      "11_50": "11–50",
      "51_250": "51–250",
      "251_1000": "251–1,000",
      "1001_10000": "1,001–10,000",
      "10000_plus": "10,000+",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "workMode",
    label: "Work mode",
    options: toContextOptions(workModes, {
      onsite: "On-site",
      hybrid: "Hybrid",
      remote: "Remote",
      varies: "Varies",
      prefer_not: "Prefer Not to Say",
    }),
  },
  {
    key: "yearsExperienceBand",
    label: "Years of work experience",
    options: toContextOptions(yearsExperienceBands, {
      "0_2": "0–2",
      "3_5": "3–5",
      "6_10": "6–10",
      "11_20": "11–20",
      "21_plus": "21+",
      prefer_not: "Prefer Not to Say",
    }),
  },
] as const satisfies readonly {
  key: keyof RespondentContext;
  label: string;
  options: readonly RespondentContextOption[];
}[];
