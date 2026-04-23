# Data Architecture

Status: Implementation-current master reference. Product details in the PRD may add fields or flows, but should not bypass the privacy, validation, and persistence constraints here without an explicit update.

## Decision

Use MongoDB Atlas as the primary application database.

Mongo fits this v0 because assessment submissions are naturally document-shaped: consent metadata, coarse respondent context, item answers, computed scores, result labels, and export eligibility can be written as one cohesive record. MongoDB's flexible document model is appropriate when related data can be embedded and returned in a single database operation, while schema validation can still be used to keep production data consistent.

The Next.js app should use the official MongoDB Node.js driver through a server-only connection utility. `MONGODB_URI` must remain server-side and must never be prefixed with `NEXT_PUBLIC_`.

## Data Goals

- Store complete assessment submissions without collecting direct personal identifiers.
- Keep scoring and export decisions reproducible by versioning the assessment model, consent copy, and scoring schema.
- Support public aggregate dashboards and anonymised CSV/JSON exports.
- Keep AI analysis runs auditable without storing user-provided BYOK secrets.
- Make privacy failures difficult by separating public-export fields from private operational metadata.
- Store only a hash of private result tokens so database rows do not expose private result URLs.

## Database

Default database name: `assessmentoptima`.

The default lives in `src/config/app.ts` and can be overridden with `MONGODB_DB`. The Atlas connection string belongs in `MONGODB_URI`.

## Collections

### `assessment_submissions`

One document per completed assessment.

This is the source of truth for respondent answers, scores, and public dataset eligibility.

```ts
type AssessmentSubmissionDocument = {
  _id: ObjectId;
  tokenHash: string;
  publicRowId: string;
  assessmentVersion: string;
  consent: {
    useBoundaryAccepted: true;
    assessmentProcessing: true;
    researchStorage: boolean;
    publicDataset: boolean;
    consentVersion: string;
  };
  context: {
    regionBucket?: string;
    ageBand?: string;
    sectorBucket?: string;
    roleLevel?: string;
    orgSizeBand?: string;
    workMode?: string;
    yearsExperienceBand?: string;
  };
  answers: Record<string, 1 | 2 | 3 | 4 | 5>;
  result: AssessmentResult;
  publicDatasetEligible: boolean;
  createdAt: Date;
  createdMonth: string; // YYYY-MM for public exports.
};
```

The canonical persistence contract is `storedAssessmentSubmissionSchema` in `src/features/assessment/schemas/assessment.ts`. The Mongo repository parses documents through that schema before returning them to the application.

Indexes:

```text
assessment_submissions
- { tokenHash: 1 } unique
- { publicRowId: 1 } unique
- { publicDatasetEligible: 1, createdMonth: 1 }
```

Rules:

- Do not store name, email, company name, precise job title, exact location, IP address, or free-text responses in this collection for v0.
- `createdMonth` is safe for export; `createdAt` is operational and should not be included in public datasets.
- Store item responses by stable `itemId`, not array position alone.
- Store calculated scores at submission time so later scoring model changes do not rewrite historical meaning.
- Generate a raw result token for the user, store only `sha256(token + HASH_SECRET)`, and query by `tokenHash`.

### `assessment_models`

Versioned assessment metadata: item definitions, scale mappings, scoring weights, narrative templates, and consent copy references.

For early v0, the assessment model may live in code. Move it into this collection only when there is an admin or release process that needs runtime model changes.

```ts
type AssessmentModelDocument = {
  _id: ObjectId;
  version: string;
  status: "draft" | "active" | "retired";
  createdAt: Date;
  consentVersion: string;
  items: Array<{
    id: string;
    scale: string;
    prompt: string;
    reverseScored: boolean;
  }>;
  scoring: {
    minLikert: number;
    maxLikert: number;
    scaleDefinitions: Record<string, { label: string; description: string }>;
  };
};
```

Indexes:

```text
assessment_models
- { version: 1 } unique
- { status: 1 }
```

### `dataset_exports`

Optional collection for generated dataset snapshot metadata. Use this if exports become expensive or if the public site needs stable downloadable snapshots.

```ts
type DatasetExportDocument = {
  _id: ObjectId;
  generatedAt: Date;
  assessmentVersion?: string;
  rowCount: number;
  format: "csv" | "json";
  minGroupSize: number;
  filters: Record<string, string>;
  blobUrl?: string;
  checksum?: string;
};
```

Indexes:

```text
dataset_exports
- { generatedAt: -1 }
- { format: 1, generatedAt: -1 }
```

### `ai_analysis_runs`

Metadata for AI-powered analysis requests. This is for observability, safety, and product analytics.

Do not store pasted BYOK provider keys. Do not store raw model prompts containing row-level data unless a later privacy review explicitly allows it.

```ts
type AiAnalysisRunDocument = {
  _id: ObjectId;
  createdAt: Date;
  mode: "byok" | "server";
  provider: "openai" | "anthropic";
  analysisType:
    | "summarise_dataset"
    | "compare_segments"
    | "identify_patterns"
    | "generate_research_questions"
    | "critique_methodology";
  assessmentVersion?: string;
  inputSummary: {
    rowCount: number;
    filters: Record<string, string>;
    minGroupSize: number;
  };
  outputShapeVersion: string;
  status: "started" | "succeeded" | "failed";
  errorCode?: string;
};
```

Indexes:

```text
ai_analysis_runs
- { createdAt: -1 }
- { mode: 1, createdAt: -1 }
- { analysisType: 1, createdAt: -1 }
```

### `analytics_rollups`

Optional precomputed dashboard data. Start with live aggregation from `assessment_submissions`; introduce rollups only when live aggregation becomes slow or expensive.

```ts
type AnalyticsRollupDocument = {
  _id: ObjectId;
  generatedAt: Date;
  period: "all_time" | "month";
  periodKey: string;
  assessmentVersion?: string;
  minGroupSize: number;
  metrics: Record<string, unknown>;
};
```

## Validation Strategy

Use two validation layers:

1. Zod schemas at the application boundary for request parsing, form data, scoring inputs, domain outputs, and AI structured outputs.
2. MongoDB collection schema validation for production persistence guardrails once document shapes stabilize.

Zod should be the source of TypeScript inference in application code. MongoDB validation should reject malformed writes that bypass normal application paths.

## Public Dataset Shape

Public exports should be built from an allowlist, not from raw Mongo documents.

Allowed v0 export fields:

```text
row_id
assessment_version
created_month
region_bucket
age_band
sector_bucket
role_level
org_size_band
employment_type
work_mode
years_experience_band
delivery_score
learning_score
influence_score
collaboration_score
regulation_score
strategy_score
integrity_score
change_score
ai_score
operating_rhythm
trust_backbone
learning_engine
change_leadership
human_centred_influence
archetype
pressure_flag_count
```

Excluded v0 export fields:

```text
_id
internal_submission_id
tokenHash
createdAt
IP address
user agent
name
email
company name
exact job title
precise location
free text
raw item-level answers
raw AI prompts
API keys
```

Aggregate pages and filtered exports must enforce a minimum group size. Default threshold: `n >= 10`. If the PRD makes demographic slicing prominent, consider `n >= 20`.

## Mongo Connection Policy

- Use one server-only Mongo client promise module so serverless invocations can reuse pooled connections where the runtime allows it.
- Keep the connection utility out of client components.
- Do not import Mongo adapters into React UI components.
- Use the Node.js runtime for database access. Do not move MongoDB driver calls into Edge runtime code.
- Keep `MONGODB_URI` in `.env` or `.env.local` locally and Vercel Environment Variables for preview/production.

## AI And Data Policy

- BYOK analysis should process only aggregate or export-safe data by default.
- Server-funded analysis should be admin-gated or rate-limited.
- Use structured AI outputs when the UI needs predictable fields.
- Persist AI run metadata, not secrets.
- Do not send raw, potentially identifying submission documents to AI providers. Shape and aggregate data first.

## Open Questions

- Whether dataset exports are generated dynamically or stored as snapshots.
- Whether item-level research export is ever allowed under stricter governance after v0.

## Related Docs

- [Assessment Model](./assessment-model.md)
- [Privacy And Open Data](./privacy-and-open-data.md)
- [AI Analysis](./ai-analysis.md)

## Sources

- [MongoDB data modeling](https://www.mongodb.com/docs/manual/data-modeling/)
- [MongoDB schema validation](https://www.mongodb.com/docs/manual/core/schema-validation/)
- [MongoDB Next.js integration](https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/)
- [MongoDB connection pools, Node.js driver](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/connection-pools/)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Zod documentation](https://zod.dev/)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI enterprise privacy](https://openai.com/enterprise-privacy/)
