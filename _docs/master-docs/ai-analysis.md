# AI Analysis

Status: Implementation-current master reference for BYOK dataset analysis.

Related source-of-truth docs:

- [Assessment Model](./assessment-model.md) owns domain labels, composites, and pressure-drift language used in AI prompts.
- [Data Architecture](./data-architecture.md) owns public export shape and AI run metadata limits.
- [Privacy And Open Data](./privacy-and-open-data.md) owns privacy copy, prohibited data, and provider-key handling boundaries.

## Decision

V0 AI analysis is **bring your own key** only.

No public server-funded AI analysis in v0.

The user may provide an OpenAI or Anthropic-compatible API key for a single analysis request. The key is sent to the AssessmentOptima server so the provider call can be made, then sent to the chosen provider under the user's account. The key must never be stored, logged, persisted to localStorage, returned in a response, or sent in a URL.

## User Inputs

The AI analysis page collects:

- provider: `openai` or `anthropic`;
- API key;
- model name;
- analysis type;
- optional user question.

API key field requirements:

- `type="password"`;
- never pre-filled;
- never persisted;
- clearable after request.

## Analysis Types

```ts
type AnalysisType =
  | "summarise_dataset"
  | "compare_segments"
  | "interesting_patterns"
  | "research_hypotheses"
  | "methodology_critique";
```

## Model Handling

Recommended defaults:

OpenAI:

- use the current low-cost model available in implementation context;
- allow editable model string so the product does not hard-fail when defaults change.

Anthropic:

- use the current low-cost model available in implementation context;
- allow editable model string so the product does not hard-fail when defaults change.

Do not hard-code outdated model names as the only allowed options.

## Server Flow

The route handler should:

1. Validate input with Zod.
2. Fetch public dataset summary, not raw private submissions.
3. Include data dictionary, aggregate stats, and prototype score-level public rows only.
4. Build a bounded prompt.
5. Call the selected provider with the supplied key.
6. Validate/normalise output for display where practical.
7. Return model output.
8. Store only non-sensitive metadata if event logging is enabled.

The route handler must not:

- store the API key;
- include the API key in a URL;
- log request body;
- send raw private submission documents to the provider;
- send respondent context fields to the provider in v0;
- send non-consented data;
- claim causal findings;
- recommend hiring, promotion, diagnosis, or individual suitability decisions.

## Prompt Guardrails

System message:

```text
You are analysing an anonymised public aggregate dataset from a developmental work-style assessment.
Do not make hiring, promotion, diagnostic, or individual suitability recommendations.
Do not infer protected characteristics.
Do not claim causal relationships.
Separate observed patterns from hypotheses.
Mention sample-size limitations.
Use plain English and make uncertainty visible.
```

User data block:

```json
{
  "datasetMeta": {},
  "aggregateStats": {},
  "dataDictionary": {},
  "analysisType": "summarise_dataset",
  "question": "optional user question"
}
```

## API Contract

Route:

```text
POST /api/ai/analyze
```

Request:

```json
{
  "provider": "openai",
  "apiKey": "sk-...",
  "model": "user-editable-model",
  "analysisType": "summarise_dataset",
  "question": "What are the most interesting patterns?"
}
```

Response:

```json
{
  "provider": "openai",
  "model": "user-editable-model",
  "rowCount": 123,
  "analysis": "..."
}
```

Warnings and boundaries are displayed in page copy and prompt guardrails rather than repeated in the current response payload.

## Event Logging

Optional metadata collection may store:

```ts
type AiAnalysisEvent = {
  provider: "openai" | "anthropic";
  analysisType: AnalysisType;
  rowCount: number;
  minGroupSize: number;
  createdAt: Date;
  status: "succeeded" | "failed";
  errorCode?: string;
};
```

Never store:

- API key;
- raw prompt with user key;
- full request body;
- private submission rows.

## UI Requirements

The `/ai-analysis` page must include:

- clear BYOK explanation;
- provider select;
- editable model field;
- API key password field;
- analysis type select;
- optional question field;
- run button;
- loading state;
- error state for invalid key/provider failure;
- result panel;
- warning that outputs may be wrong;
- warning that outputs are not employment advice;
- statement that the API key is transmitted to the server only for this request and is not stored.
- statement that the selected provider may process the request under the user's account.

## Implementation Notes

Recommended files:

```text
src/features/assessment/schemas/assessment.ts
src/features/assessment/application/ai-analysis.ts
src/app/api/ai/analyze/route.ts
src/features/assessment/components/ai-analysis-form.tsx
src/app/ai-analysis/page.tsx
src/lib/rate-limit.ts
```

SSoT rule:

- Provider enum, analysis-type enum, request schema, and response schema live in `src/features/assessment/schemas/assessment.ts`.
- Provider default model strings and prompt guardrails live in `src/features/assessment/application/ai-analysis.ts`.
- Route paths live in `src/config/routes.ts`.
- The UI imports those values; it must not recreate provider lists, model defaults, analysis-type lists, or API paths inline.
- AI prompts, provider defaults, and output shapes are versioned product contracts. Do not duplicate them in pages, tests, or route handlers; import from the owner and test the owner directly.
- If a new provider or analysis type is added, update the L0 schema and L3 prompt/default owner first, then derive UI options, validation, tests, and docs from those changes.

Test requirements:

- rejects missing provider;
- rejects missing key;
- rejects unsupported analysis type;
- never returns or persists key;
- calls AI port with aggregate/export-safe data only;
- safe error response for provider failure.

## Future Server-Funded Mode

Server-funded AI can be added later only with:

- admin gating or hard rate limits;
- cost controls;
- abuse protection;
- server-side key in Vercel Environment Variables;
- explicit privacy copy update;
- event logging that does not capture secrets.
