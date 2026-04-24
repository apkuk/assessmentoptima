# Product Routes And API

Status: Implementation-current master reference for public routes, API routes, and page-level requirements.

## Runtime

Use the Node.js runtime for route handlers that access MongoDB or provider SDKs:

```ts
export const runtime = "nodejs";
export const maxDuration = 30;
```

Do not import MongoDB or provider SDKs into client components.

## Public Routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/` | Landing page | Server Component |
| `/about` | Founder/about page for Andrew Kilshaw and the AI sabbatical context | Server Component |
| `/science` | Behavioural science and methodology | Server Component |
| `/privacy` | Consent, data use, anonymisation, open dataset explanation | Server Component |
| `/limitations` | Prohibited uses and validation roadmap | Server Component |
| `/assessment` | Assessment flow | Client component inside App Router page |
| `/results/[token]` | Personal results report | Server fetch plus client visualisation |
| `/archetypes/[slug]` | Share-safe public archetype page | Static/server page |
| `/dataset` | Public aggregate dashboard | Server data plus client charts |
| `/dataset/dictionary` | Data dictionary and export schema | Server Component |
| `/ai-analysis` | BYOK AI synthesis UI | Client component |
| `/how-i-built-this` | AI-assisted build story | Server Component |
| `/api/docs` | Public API curl examples | Server Component |

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/submit` | POST | Validate consent, score assessment, persist eligible response, return view and management tokens |
| `/api/results/[token]` | GET | Fetch respondent result by private view token |
| `/api/results/[token]` | DELETE | Delete respondent submission by private view token plus management token |
| `/api/results/[token]/experiment.ics` | GET | Download the 30-day experiment calendar reminder |
| `/api/aggregates` | GET | Return aggregate dashboard data with small-cell suppression |
| `/api/dataset.csv` | GET | Download anonymised public CSV |
| `/api/dataset.json` | GET | Download anonymised public JSON |
| `/api/dataset/dictionary.json` | GET | Return data dictionary |
| `/api/og/[token]` | GET | Private-token preview card retained for internal result previews |
| `/api/og/archetype/[slug]` | GET | Share-safe public archetype Open Graph card |
| `/api/ai/analyze` | POST | BYOK AI synthesis on public dataset summary |
| `/api/health` | GET | Lightweight deployment/database health endpoint |

Implementation constants:

- Public routes and API route builders are centralised in `src/config/routes.ts`.
- Product, version, filename, citation, local-default, and social image constants are centralised in `src/config/app.ts`.
- Page and route code must import those constants instead of recreating route strings, product/version values, filenames, or social image sizes inline.
- When adding a new public page, API route, export filename, or social/share URL, update the owning config module first and consume the builder/constant from pages, navigation, tests, docs, and metadata.
- Do not duplicate API request/response payload types in route handlers or client components. Validate with the relevant L0 Zod schema and infer types from that schema.

## Page Requirements

### Landing Page `/`

Must include:

- hero section;
- "Take the assessment" CTA;
- "Explore the science" CTA;
- "How I built this" link;
- clear v0 use boundary;
- "54 items / approx 8-10 minutes / developmental only" badges;
- summary of the nine dimensions;
- explanation of open dataset contribution;
- small aggregate dataset preview if data exists;
- credibility section: research-informed, transparent scoring, anonymised data, open methodology.

Tone: premium, plain English, confident, but not overclaiming.

### About Page `/about`

Must include:

- Andrew Kilshaw as the public builder/founder behind the project;
- current AI sabbatical context;
- phoque.ai as an AI-powered tutoring app being built in parallel;
- practical LinkedIn sharing posture: examples of what gets built and how to use AI properly;
- concise career credibility from the March 2025 resume, including TalentOptima, Sanofi, Shell, Nike, BlackRock/BGI, IMD, and enterprise transformation/capability experience;
- links to `/how-i-built-this` and phoque.ai;
- no private contact details copied from the resume unless explicitly approved for publication.

Tone: credible, human, pragmatic, and focused on hands-on AI/product-building rather than biography for its own sake.

### Science Page `/science`

Must explain:

- the model is inspired by occupational psychology and professional assessment architecture;
- the nine domains;
- bright-side / pressure-risk / motive-context logic;
- self-report limitations;
- no normative percentile claims yet;
- validation roadmap;
- why AI-Augmented Judgement is treated as a dynamic work-practice domain.

Include citation cards for:

- Big Five / occupational validity;
- HEXACO Honesty-Humility;
- Hogan-style bright/dark/inside architecture;
- Saville motive/talent integration;
- Korn Ferry whole-person model;
- privacy/anonymisation approach.

### Privacy Page `/privacy`

Must include:

- what is collected;
- what is not collected;
- why data is collected;
- consent choices;
- open dataset explanation;
- anonymisation caveat;
- small-cell suppression;
- contact placeholder;
- "not legal advice" footer.

Hard requirements:

- no names;
- no emails;
- no employer names;
- no exact job titles;
- no precise locations;
- no raw free-text fields;
- no public exact timestamps.

### Limitations Page `/limitations`

Must include:

- prohibited uses;
- v0 evidence limits;
- difference between profile bands and norms;
- no selection validity claim;
- validation roadmap;
- explanation that archetypes are summaries, not fixed psychological types.

### Assessment Page `/assessment`

Flow:

1. Introduction.
2. Consent.
3. Context capture.
4. Questionnaire.
5. Review/submit.
6. Submit to `/api/submit`.
7. Redirect to `/results/[token]`.

UX requirements:

- sticky progress indicator;
- item pages of 9 items each;
- back/next navigation;
- autosave to `localStorage`;
- mobile-friendly Likert controls;
- keyboard accessible;
- clear labels;
- no pre-ticked consent boxes;
- validation before next page;
- user can reset local progress.

### Results Page `/results/[token]`

Must display:

- title: "Your WorkStyle Compass report";
- use-boundary alert;
- archetype;
- top 3 strengths;
- 2 development edges;
- pressure-risk flags;
- nine scale cards with progress bars;
- nine-scale radar chart;
- no private result data in page metadata or social previews;
- share archetype CTA and LinkedIn share link that point to `/archetypes/[slug]`;
- current public sample comparison badges when threshold is met;
- composite index cards;
- interpretation guide;
- suggested 30-day experiment;
- ICS calendar export for the 30-day experiment;
- delete-my-submission action;
- print button;
- copy private result link button;
- download JSON result button;
- return to dataset page button.

Do not imply that the result is a diagnosis or validated prediction.

Deletion must require a `managementToken` that is separate from the private view token. Public share links must never contain either token.

### Dataset Page `/dataset`

Must display:

- total public dataset rows;
- assessment version;
- last updated;
- score distribution by scale;
- archetype distribution;
- composite averages;
- optional segment filters:
  - region;
  - sector;
  - role level;
  - organisation size;
- correlation matrix if enough rows;
- provisional internal-consistency snapshot only when the higher reliability threshold is met;
- citation block for the assessment and dataset DOI placeholder;
- small-cell warning;
- download CSV/JSON buttons;
- link to data dictionary.

If filtered group has `n < PUBLIC_DATASET_MIN_N`, show:

> Not enough public responses to display this segment without increasing identifiability risk.

### Dataset Dictionary Page `/dataset/dictionary`

Must include:

- exported field names;
- descriptions;
- possible enum values;
- scoring notes;
- suppression rules;
- licence and citation note.

### AI Analysis Page `/ai-analysis`

Must include:

- explanation of BYOK;
- provider select: OpenAI or Anthropic;
- model select or editable model field;
- API key password field;
- analysis type:
  - summarise dataset;
  - compare segments;
  - identify interesting patterns;
  - generate research hypotheses;
  - critique methodology;
- optional user question;
- run button;
- response panel;
- prompt transparency / guardrail prompt;
- baked example output for visitors without a provider key;
- server-side rate limiting;
- disclaimer:
  - key is sent to the server only for this request;
  - key is not stored;
  - the provider may process the request under the user's account;
  - output may be wrong;
  - do not use for employment decisions.

### How I Built This Page `/how-i-built-this`

Must follow [How I Built This](./how-i-built-this.md).

## API Contracts

### POST `/api/submit`

Request:

```json
{
  "consent": {
    "useBoundaryAccepted": true,
    "assessmentProcessing": true,
    "privateResultStorage": true,
    "researchStorage": true,
    "publicDataset": true,
    "consentVersion": "consent-v1.0"
  },
  "context": {
    "ageBand": "45_54",
    "regionBucket": "uk_ireland",
    "sectorBucket": "professional_services",
    "roleLevel": "c_suite_founder",
    "orgSizeBand": "solo",
    "workMode": "hybrid",
    "yearsExperienceBand": "21_plus"
  },
  "answers": {
    "D1": 4,
    "D2": 5
  }
}
```

Validation:

- all 54 items must be present;
- every answer must be an integer from 1 to 5;
- required consent booleans must be true;
- context values must be from approved enums;
- reject unexpected keys where practical.

Response:

```json
{
  "viewToken": "private-view-token",
  "managementToken": "private-management-token",
  "resultToken": "raw-token",
  "resultUrl": "/results/raw-token",
  "publicShareUrl": "/archetypes/builder",
  "publicDatasetEligible": true
}
```

### GET `/api/results/[token]`

Response:

```json
{
  "assessmentVersion": "wsc-v1.0",
  "createdAt": "ISO",
  "scores": {},
  "composites": {},
  "pressureFlags": [],
  "archetype": "The Builder",
  "interpretation": {}
}
```

Do not expose:

- raw Mongo `_id`;
- token hash;
- IP address;
- user agent;
- full internal submission document.

### DELETE `/api/results/[token]`

Request:

```json
{
  "managementToken": "private-management-token"
}
```

The API must hash the route view token and request management token, then delete only if both hashes match the same stored submission.

### GET `/api/dataset.csv`

Return export-safe rows only.

V0 row-level exports are score-first. They omit age, region, sector, role level, organisation size, work mode, and years-of-experience context fields until sample size and disclosure-control checks support safer contextual release.

Headers:

```ts
new Response(csv, {
  headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": "attachment; filename=workstyle-compass-public-dataset.csv",
  },
});
```

### GET `/api/dataset.json`

Response:

```json
{
  "meta": {
    "assessmentVersion": "wsc-v1.0",
    "generatedAt": "ISO timestamp",
    "rowCount": 123,
    "minGroupSize": 10
  },
  "rows": []
}
```

### GET `/api/aggregates`

If suppression applies:

```json
{
  "suppressed": true,
  "reason": "minimum_group_size",
  "minGroupSize": 10,
  "rowCount": 7
}
```

Otherwise return:

- total eligible rows;
- average score by scale;
- standard deviation by scale;
- distribution buckets by scale:
  - 0-19;
  - 20-39;
  - 40-59;
  - 60-79;
  - 80-100;
- archetype counts;
- composite averages;
- top pressure flags;
- correlation matrix across nine scale scores if `n >= 30`.

### POST `/api/ai/analyze`

See [AI Analysis](./ai-analysis.md).

## Suggested File Structure

```text
src/
  app/
    page.tsx
    science/page.tsx
    privacy/page.tsx
    limitations/page.tsx
    assessment/page.tsx
    results/[token]/page.tsx
    dataset/page.tsx
    dataset/dictionary/page.tsx
    ai-analysis/page.tsx
    how-i-built-this/page.tsx
    api/
      submit/route.ts
      results/[token]/route.ts
      aggregates/route.ts
      dataset.csv/route.ts
      dataset.json/route.ts
      dataset/dictionary.json/route.ts
      ai/analyze/route.ts
      health/route.ts
  components/
    ui/
    assessment/
    results/
    dataset/
  features/
    assessment/
      schemas/
      ports/
      application/
      adapters/
        mongo/
        ai/
      ui/
      tests/
  lib/
    env/
    mongo/
    security/
```
