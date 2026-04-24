/**
 * File: src/features/assessment/schemas/assessment.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Canonical L0 Zod schemas and inferred types for assessment contracts.
 */
import { z } from "zod";

export const scaleKeySchema = z.enum([
  "delivery",
  "learning",
  "influence",
  "collaboration",
  "regulation",
  "strategy",
  "integrity",
  "change",
  "ai",
]);
export const scaleKeys = scaleKeySchema.options;

export const answerValues = [1, 2, 3, 4, 5] as const;
export const ageBands = [
  "under_25",
  "25_34",
  "35_44",
  "45_54",
  "55_64",
  "65_plus",
  "prefer_not",
] as const;
export const regionBuckets = [
  "uk_ireland",
  "north_america",
  "europe",
  "asia_pacific",
  "middle_east_africa",
  "latin_america",
  "global_remote",
  "prefer_not",
] as const;
export const sectorBuckets = [
  "technology",
  "finance",
  "healthcare",
  "education",
  "professional_services",
  "manufacturing",
  "public_nonprofit",
  "retail_hospitality",
  "media_creative",
  "other",
  "prefer_not",
] as const;
export const roleLevels = [
  "student_early",
  "individual_contributor",
  "manager",
  "senior_manager",
  "director_vp",
  "c_suite_founder",
  "consultant_advisor",
  "prefer_not",
] as const;
export const orgSizeBands = [
  "solo",
  "2_10",
  "11_50",
  "51_250",
  "251_1000",
  "1001_10000",
  "10000_plus",
  "prefer_not",
] as const;
export const workModes = [
  "onsite",
  "hybrid",
  "remote",
  "varies",
  "prefer_not",
] as const;
export const yearsExperienceBands = [
  "0_2",
  "3_5",
  "6_10",
  "11_20",
  "21_plus",
  "prefer_not",
] as const;
export const defaultRespondentContext = {
  ageBand: "prefer_not",
  regionBucket: "prefer_not",
  sectorBucket: "prefer_not",
  roleLevel: "prefer_not",
  orgSizeBand: "prefer_not",
  workMode: "prefer_not",
  yearsExperienceBand: "prefer_not",
} as const;
export const aiProviders = ["openai", "anthropic"] as const;
export const aiAnalysisTypes = [
  "summarise_dataset",
  "compare_segments",
  "interesting_patterns",
  "research_hypotheses",
  "methodology_critique",
] as const;

export const itemTypeSchema = z.enum(["core", "reverse", "overuse"]);
export const answerValueSchema = z.union([
  z.literal(answerValues[0]),
  z.literal(answerValues[1]),
  z.literal(answerValues[2]),
  z.literal(answerValues[3]),
  z.literal(answerValues[4]),
]);

export const consentSchema = z
  .object({
    useBoundaryAccepted: z.literal(true),
    assessmentProcessing: z.literal(true),
    privateResultStorage: z.literal(true).default(true),
    researchStorage: z.boolean(),
    publicDataset: z.boolean(),
    consentVersion: z.string().min(1),
  })
  .strict();

export const respondentContextSchema = z
  .object({
    ageBand: z.enum(ageBands).optional(),
    regionBucket: z.enum(regionBuckets).optional(),
    sectorBucket: z.enum(sectorBuckets).optional(),
    roleLevel: z.enum(roleLevels).optional(),
    orgSizeBand: z.enum(orgSizeBands).optional(),
    workMode: z.enum(workModes).optional(),
    yearsExperienceBand: z.enum(yearsExperienceBands).optional(),
  })
  .strict();

export const assessmentItemSchema = z
  .object({
    id: z.string().min(1),
    scale: scaleKeySchema,
    type: itemTypeSchema,
    text: z.string().min(1),
  })
  .strict();

export const answerMapSchema = z.record(z.string().min(1), answerValueSchema);

export const scaleScoreSchema = z
  .object({
    key: scaleKeySchema,
    name: z.string(),
    shortName: z.string(),
    score: z.number().int().min(0).max(100),
    mean: z.number().min(1).max(5),
    band: z.enum(["low", "moderate", "high"]),
    overuseRaw: answerValueSchema.optional(),
  })
  .strict();

export const pressureFlagSchema = z
  .object({
    scale: scaleKeySchema,
    itemId: z.string(),
    severity: z.enum(["watch", "high"]),
    message: z.string(),
  })
  .strict();

export const archetypeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    summary: z.string(),
  })
  .strict();

export const assessmentResultSchema = z
  .object({
    scores: z.record(scaleKeySchema, scaleScoreSchema),
    composites: z.record(z.string(), z.number().int().min(0).max(100)),
    pressureFlags: z.array(pressureFlagSchema),
    archetype: archetypeSchema,
    topScales: z.array(scaleKeySchema),
    lowScales: z.array(scaleKeySchema),
    strengths: z.array(z.string()),
    developmentEdges: z.array(z.string()),
    experiment: z.string(),
    reflectionPrompts: z.array(z.string()),
  })
  .strict();

export const submitAssessmentSchema = z
  .object({
    consent: consentSchema,
    context: respondentContextSchema.default({}),
    answers: answerMapSchema,
  })
  .strict();

export const aiAnalysisRequestSchema = z
  .object({
    provider: z.enum(aiProviders),
    apiKey: z.string().min(8),
    model: z.string().min(1),
    analysisType: z.enum(aiAnalysisTypes),
    question: z.string().max(1000).optional(),
  })
  .strict();

export const aiAnalysisResponseSchema = z
  .object({
    provider: z.enum(aiProviders),
    model: z.string().min(1),
    rowCount: z.number().int().min(0),
    analysis: z.string(),
  })
  .strict();

export const publicDatasetFields = [
  "row_id",
  "assessment_version",
  "created_month",
  "delivery_score",
  "learning_score",
  "influence_score",
  "collaboration_score",
  "regulation_score",
  "strategy_score",
  "integrity_score",
  "change_score",
  "ai_score",
  "operating_rhythm",
  "trust_backbone",
  "learning_engine",
  "change_leadership",
  "human_centred_influence",
  "archetype",
  "pressure_flag_count",
] as const;

export const publicDatasetFieldSchema = z.enum(publicDatasetFields);

export const publicDatasetRowSchema = z
  .object({
    row_id: z.string(),
    assessment_version: z.string(),
    created_month: z.string(),
    delivery_score: z.number().int().min(0).max(100),
    learning_score: z.number().int().min(0).max(100),
    influence_score: z.number().int().min(0).max(100),
    collaboration_score: z.number().int().min(0).max(100),
    regulation_score: z.number().int().min(0).max(100),
    strategy_score: z.number().int().min(0).max(100),
    integrity_score: z.number().int().min(0).max(100),
    change_score: z.number().int().min(0).max(100),
    ai_score: z.number().int().min(0).max(100),
    operating_rhythm: z.number().int().min(0).max(100),
    trust_backbone: z.number().int().min(0).max(100),
    learning_engine: z.number().int().min(0).max(100),
    change_leadership: z.number().int().min(0).max(100),
    human_centred_influence: z.number().int().min(0).max(100),
    archetype: z.string(),
    pressure_flag_count: z.number().int().min(0),
  })
  .strict();

export const resultTokenSchema = z.string().min(32);
export const publicShareIdSchema = z.string().min(2);

export const deleteResultRequestSchema = z
  .object({
    managementToken: resultTokenSchema,
  })
  .strict();

export const storedAssessmentSubmissionSchema = z
  .object({
    viewTokenHash: z.string().min(32).optional(),
    managementTokenHash: z.string().min(32).optional(),
    tokenHash: z.string().min(32).optional(),
    publicShareId: publicShareIdSchema.optional(),
    publicRowId: z.string().uuid(),
    assessmentVersion: z.string().min(1),
    consent: consentSchema,
    context: respondentContextSchema,
    answers: answerMapSchema,
    result: assessmentResultSchema,
    publicDatasetEligible: z.boolean(),
    createdAt: z.date(),
    createdMonth: z.string().regex(/^\d{4}-\d{2}$/),
  })
  .strict()
  .refine((submission) => submission.viewTokenHash ?? submission.tokenHash, {
    message: "A view token hash or legacy token hash is required.",
  });

export const submitAssessmentResponseSchema = z
  .object({
    viewToken: resultTokenSchema,
    managementToken: resultTokenSchema,
    resultToken: resultTokenSchema,
    resultUrl: z.string().min(1),
    publicShareUrl: z.string().min(1),
    publicDatasetEligible: z.boolean(),
  })
  .strict();

export const assessmentResultResponseSchema = z
  .object({
    assessmentVersion: z.string().min(1),
    createdMonth: z.string(),
    context: respondentContextSchema,
    result: assessmentResultSchema,
    publicDatasetEligible: z.boolean(),
  })
  .strict();

export const publicDatasetResponseSchema = z
  .object({
    rows: z.array(publicDatasetRowSchema),
    rowCount: z.number().int().min(0),
    generatedAt: z.string(),
  })
  .strict();

export const aggregateResponseSchema = z
  .object({
    suppressed: z.boolean(),
    rowCount: z.number().int().min(0),
    minGroupSize: z.number().int().min(1),
    averageByScale: z.partialRecord(
      scaleKeySchema,
      z.number().int().min(0).max(100),
    ),
    archetypeCounts: z.record(z.string(), z.number().int().min(0)),
    compositeAverages: z.record(z.string(), z.number().int().min(0).max(100)),
  })
  .strict();

export const datasetComparisonSchema = z
  .object({
    suppressed: z.boolean(),
    rowCount: z.number().int().min(0),
    minGroupSize: z.number().int().min(1),
    currentSampleComparisonByScale: z.partialRecord(
      scaleKeySchema,
      z.number().int().min(0).max(100),
    ),
  })
  .strict();

export const reliabilityScaleSnapshotSchema = z
  .object({
    scale: scaleKeySchema,
    itemCount: z.number().int().min(2),
    respondentCount: z.number().int().min(0),
    cronbachAlpha: z.number().min(-1).max(1).nullable(),
    label: z.string(),
  })
  .strict();

export const reliabilitySnapshotSchema = z
  .object({
    suppressed: z.boolean(),
    rowCount: z.number().int().min(0),
    minGroupSize: z.number().int().min(1),
    scales: z.array(reliabilityScaleSnapshotSchema),
  })
  .strict();

export const apiErrorResponseSchema = z
  .object({
    error: z.string(),
    detail: z.string().optional(),
  })
  .strict();

export type ScaleKey = z.infer<typeof scaleKeySchema>;
export type ItemType = z.infer<typeof itemTypeSchema>;
export type AnswerValue = z.infer<typeof answerValueSchema>;
export type AnswerMap = z.infer<typeof answerMapSchema>;
export type Consent = z.infer<typeof consentSchema>;
export type RespondentContext = z.infer<typeof respondentContextSchema>;
export type AssessmentItem = z.infer<typeof assessmentItemSchema>;
export type ScaleScore = z.infer<typeof scaleScoreSchema>;
export type PressureFlag = z.infer<typeof pressureFlagSchema>;
export type AssessmentResult = z.infer<typeof assessmentResultSchema>;
export type SubmitAssessmentInput = z.infer<typeof submitAssessmentSchema>;
export type AiAnalysisRequest = z.infer<typeof aiAnalysisRequestSchema>;
export type AiAnalysisResponse = z.infer<typeof aiAnalysisResponseSchema>;
export type PublicDatasetField = z.infer<typeof publicDatasetFieldSchema>;
export type PublicDatasetRow = z.infer<typeof publicDatasetRowSchema>;
export type StoredAssessmentSubmission = z.infer<
  typeof storedAssessmentSubmissionSchema
>;
export type SubmitAssessmentResponse = z.infer<
  typeof submitAssessmentResponseSchema
>;
export type AssessmentResultResponse = z.infer<
  typeof assessmentResultResponseSchema
>;
export type PublicDatasetResponse = z.infer<typeof publicDatasetResponseSchema>;
export type AggregateResponse = z.infer<typeof aggregateResponseSchema>;
export type DatasetComparison = z.infer<typeof datasetComparisonSchema>;
export type ReliabilityScaleSnapshot = z.infer<
  typeof reliabilityScaleSnapshotSchema
>;
export type ReliabilitySnapshot = z.infer<typeof reliabilitySnapshotSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
