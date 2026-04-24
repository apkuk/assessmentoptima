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
- Store only hashes of private view and management tokens so database rows do not expose private result URLs or deletion credentials.

## Database

Default database name: `assessmentoptima`.

The default lives in `src/config/app.ts` and can be overridden with `MONGODB_DB`. The Atlas connection string belongs in `MONGODB_URI`.

## Bootstrap And Alignment

MongoDB alignment is handled by `pnpm mongo:bootstrap`, which runs `scripts/bootstrap-mongo.ts`.

The script is intentionally schema-first:

- loads local `.env` values when running outside Vercel;
- pings the configured MongoDB Atlas database;
- creates or reuses compatible indexes through the same Mongo repository used by the app;
- validates existing `assessment_submissions` documents against `storedAssessmentSubmissionSchema`;
- writes a `schema_metadata` record containing the current assessment version, consent version, scale keys, operating-system model, expected item IDs, and public dataset fields.

This avoids a separate migration file that drifts from L0 schemas. If the app schema changes, update the L0 owner first, then rerun `pnpm mongo:bootstrap` against the target environment.

## DRY/SSoT Ownership

The database layer must consume the same contracts as the rest of the app. It must not define parallel document, export, or context shapes inline.

- Stored submission documents are parsed through `storedAssessmentSubmissionSchema` in `src/features/assessment/schemas/assessment.ts`.
- Public export rows are built from the canonical public dataset field list in `src/features/assessment/schemas/assessment.ts`.
- Default database name, dataset filenames, assessment version, consent version, and threshold defaults come from `src/config/app.ts`.
- Mongo adapters may contain persistence mapping code, but they should not own domain enums, consent keys, scale keys, public field names, or result payload shapes.
- If persistence needs a new field, add it to the L0 schema first, then update the repository mapping, API response shaping, tests, and docs.

## Collections

### `assessment_submissions`

One document per completed assessment.

This is the source of truth for respondent answers, scores, and public dataset eligibility.

```ts
type AssessmentSubmissionDocument = {
  _id: ObjectId;
  viewTokenHash: string;
  managementTokenHash: string;
  publicShareId?: string; // optional if a future share-specific page is used.
  publicRowId: string;
  assessmentVersion: string;
  consent: {
    useBoundaryAccepted: true;
    assessmentProcessing: true;
    privateResultStorage: true;
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
- { viewTokenHash: 1 } unique
- { managementTokenHash: 1 } unique
- { publicShareId: 1 } unique sparse
- { publicRowId: 1 } unique
- { publicDatasetEligible: 1, createdMonth: 1 }
```

Index creation is drift-tolerant. If Atlas already has a compatible unique index from an earlier run, the repository reuses it instead of attempting to recreate the same key with conflicting options.

Rules:

- Do not store name, email, company name, precise job title, exact location, IP address, or free-text responses in this collection for v0.
- `createdMonth` is safe for export; `createdAt` is operational and should not be included in public datasets.
- Store item responses by stable `itemId`, not array position alone.
- Store calculated scores at submission time so later scoring model changes do not rewrite historical meaning.
- Generate separate raw `viewToken` and `managementToken` values for the user, store only hashes, and query results by `viewTokenHash`.
- Deletion must require both the private result URL token and the management token. Never use the public share URL as a deletion credential.
- Public sharing should use archetype-level pages such as `/archetypes/[slug]`, not `/results/[token]`.

### `assessment_models`

Versioned assessment metadata: item definitions, scale mappings, scoring weights, narrative templates, and consent copy references.

For the current prototype, the assessment model lives in code and is documented in [Assessment Model](./assessment-model.md). Move it into this collection only when there is an admin or release process that needs runtime model changes.

Current schema metadata is stored in `schema_metadata`, not `assessment_models`, because the source of truth remains code and L0 schemas for v0.

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
    | "interesting_patterns"
    | "research_hypotheses"
    | "methodology_critique";
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
commitment_rhythm_score
adaptive_learning_score
mobilising_communication_score
mutuality_repair_score
pressure_regulation_score
systems_sensemaking_score
trust_stewardship_score
change_navigation_score
augmented_judgement_score
operational_clarity
human_coordination
adaptive_capacity
archetype
pressure_drift_count
```

Excluded v0 export fields:

```text
_id
internal_submission_id
viewTokenHash
managementTokenHash
publicShareId
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

Context fields may be stored privately for aggregate analysis, but v0 row-level CSV/JSON exports are score-first and omit respondent context to reduce uniqueness risk while the sample is small.

Aggregate pages and filtered views must enforce a minimum group size. Default threshold: `n >= 10`. If the PRD makes demographic slicing prominent, consider `n >= 20`.

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
- [Assessment Science Research](./assessment-science/research.md)
- [Privacy And Open Data](./privacy-and-open-data.md)
- [Product Routes And API](./product-routes-and-api.md)
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
