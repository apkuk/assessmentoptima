# Privacy And Open Data

Status: Implementation-current master reference for consent, public dataset rules, anonymisation constraints, and legal copy.

## Privacy Position

AssessmentOptima is privacy-first by design.

The public dataset must be built from an allowlist of coarse, score-level fields. It must never expose raw submissions, exact timestamps, identifying context, free text, or operational metadata.

Important caveat:

> Anonymisation is a risk-reduction process, not magic. V0 uses coarse buckets, no direct identifiers, monthly timestamps, and small-cell suppression to reduce identifiability risk.

## Prohibited Data Collection In V0

Do not collect or store:

- name;
- email;
- employer;
- company name;
- exact job title;
- exact city;
- precise location;
- free-text comments;
- IP address;
- user agent;
- LLM API keys.

Do not include exact timestamps in public export.

## Consent Flow

Consent screen must include these checkboxes. None may be pre-ticked.

1. "I understand this is for self-reflection and research, not hiring, diagnosis, or employment decisions."
2. "I consent to my answers being processed to generate my report."
3. "I consent to my private report being stored so I can revisit it through a private result link."
4. "I consent to my anonymised scores being stored for research."
5. "I consent to my anonymised scores being included in the public open dataset."

Rules:

- #1, #2, and #3 are required for the current token-based v0 report flow.
- #4 controls research-storage eligibility.
- #5 is optional.
- Public exports include only submissions where #4 and #5 are true and export eligibility passes.
- A future no-storage mode may generate an immediate report without a revisit link or dataset contribution.

## Context Fields

All context fields are optional.

The canonical context bucket values live in `src/features/assessment/schemas/assessment.ts`; this document intentionally does not duplicate the enum lists. UI controls, export builders, aggregate filters, and tests must import the canonical values and labels from L0/L3 helpers rather than retyping them.

The current optional context dimensions are age band, broad region, broad sector, role level, organisation size, work mode, and years of work experience. V0 row-level public exports omit these fields; they are retained only for private report context and threshold-protected aggregate analysis.

## Public Dataset Eligibility

A submission is eligible for the public dataset when:

```ts
consent.researchStorage === true;
```

and:

```ts
consent.publicDataset === true;
```

and:

```ts
publicDatasetEligible === true;
```

and:

- all exported fields comply with the public export schema;
- no prohibited fields are present in the export row;
- any filtered aggregate output respects the minimum group threshold.

## Public CSV Fields

CSV columns:

The canonical field order and allowlist live in `src/features/assessment/schemas/assessment.ts`. Export endpoints, data dictionary generation, tests, and docs must stay aligned to that owner.

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

## Public JSON Shape

```json
{
  "rows": [],
  "rowCount": 123,
  "generatedAt": "ISO timestamp"
}
```

## Excluded Public Fields

Never export:

```text
_id
internal_submission_id
result_token_hash
createdAt
exact timestamp
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

V0 row-level exports intentionally omit respondent context fields. Coarse context may be used for aggregate dashboards or later research exports only when minimum-cell and uniqueness-risk checks are satisfied.

## Row IDs

`row_id` should be one of:

- random UUID generated only for the public dataset row; or
- salted hash that cannot reveal internal submission ID or result token.

Do not use MongoDB `_id` as the public row ID.

## Small-Cell Suppression

Default minimum group threshold:

```text
PUBLIC_DATASET_MIN_N=10
```

If a filtered aggregate result has fewer than `PUBLIC_DATASET_MIN_N` rows, return:

```json
{
  "suppressed": true,
  "reason": "minimum_group_size",
  "minGroupSize": 10,
  "rowCount": 7
}
```

UI copy:

> Not enough public responses to display this segment without increasing identifiability risk.

Consider increasing the threshold to `n >= 20` if demographic slicing becomes prominent.

## Dataset Page Copy

Dataset page must include:

> The public dataset contains anonymised, coarse-grained assessment results from participants who consented to public data inclusion. Small groups are suppressed to reduce identifiability risk.

Dataset citation copy:

> The public dataset is made available for analysis and research. Please cite WorkStyle Compass and do not attempt to re-identify participants.

## Legal And Use-Boundary Copy

Every page footer should include or link to:

> WorkStyle Compass is a developmental research assessment. It is not validated for hiring, promotion, diagnosis, redundancy, compensation, or employment decisions.

Consent page must include:

> We do not collect your name, email address, employer, exact job title, exact location, or free-text comments in this version.

AI page must include:

> AI analysis is generated from the public dataset and may be incomplete or wrong. Do not use it to make employment or individual suitability decisions.

AI page must also state:

> Your provider key is sent to the server for this request so the provider call can be made. The app does not store it. Your provider may process the request under your account.

## Dataset Licence

Recommended v0 posture:

- site content: copyright Andrew Kilshaw / chosen company;
- public anonymised dataset: CC BY 4.0 or CC0 after legal review.

Do not finalise the licence as legal advice.

## Implementation Notes

Recommended files:

```text
src/features/assessment/schemas/assessment.ts
src/features/assessment/application/public-dataset.ts
src/features/assessment/application/reliability.ts
src/features/assessment/application/respondent-context.ts
src/features/assessment/tests/consent.test.ts
src/features/assessment/tests/public-dataset.test.ts
```

SSoT rule:

- Consent, respondent context buckets, default respondent context, public dataset fields, public dataset row shape, aggregate shape, and reliability snapshot shape live in `src/features/assessment/schemas/assessment.ts`.
- Public export shaping and suppression live in `src/features/assessment/application/public-dataset.ts`.
- Product defaults and public filenames live in `src/config/app.ts`.
- UI code and API routes must import those values instead of recreating field allowlists, bucket enums, filenames, or threshold payload shapes inline.

Test requirements:

- cannot submit without use-boundary acceptance;
- cannot submit without processing consent;
- cannot submit without private result storage consent in the current v0 report flow;
- public dataset false means no public export;
- consent defaults are not pre-ticked;
- exact timestamp is not exported;
- public dataset includes only consented rows;
- export fields match the dictionary;
- small-cell suppression triggers correctly.

## Related Docs

- [Data Architecture](./data-architecture.md)
- [Product Routes And API](./product-routes-and-api.md)
- [Assessment Model](./assessment-model.md)
- [Assessment Science Research](./assessment-science/research.md)
