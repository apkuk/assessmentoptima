# Delivery And QA

Status: Implementation-current master reference for testing, deployment, README, and roadmap.

Current implementation status as of 2026-04-24 11:02 BST:

- Next.js App Router, strict TypeScript, pnpm, Tailwind v4, ESLint, Prettier, and Vitest are implemented.
- L0 schemas, Mongo repository, API routes, assessment flow, result report, score-first dataset exports, BYOK AI analysis, share-safe archetype OG cards, separate view/delete tokens, and How I Built This are implemented.
- `pnpm verify`, `pnpm build`, and linked `vercel build --prod` pass locally.
- The first GitHub-triggered Vercel deployment exposed a project configuration issue: Vercel was set to Framework Preset `Other` and expected a static `public` output directory after the Next.js build.
- A root `vercel.json` now forces the deployment to use the Next.js framework preset, `pnpm install --frozen-lockfile`, `pnpm build`, and default Next.js output handling.
- Production environment variables have been added and production redeploy is ready at `https://assessmentoptima.vercel.app`.
- `/`, `/dataset`, and `/api/health` return `200` in production.
- First synthetic `/api/submit` smoke testing exposed a MongoDB connectivity timeout in Vercel runtime. Atlas network access still needs to allow Vercel/serverless egress before persistence-backed routes can pass.
- The core assessment journey now has a signed stateless result-token fallback. If MongoDB is unreachable during submission, the user can still receive a private report, result API payload, dynamic OG image, and 30-day experiment calendar export. These fallback results are not added to the public dataset.
- Remaining launch work is MongoDB Atlas network access/runtime persistence QA, mobile hands-on QA, final dataset licence decision, and optional seed/logging/test expansion.

## Build Order

Prioritise in this order:

1. Preserve the current pnpm/Next/TypeScript/Tailwind/Vitest baseline.
2. Add environment parsing and server-only guardrails.
3. Add Zod schemas for consent, context, answers, scoring output, public dataset rows, and AI analysis requests.
4. Implement assessment model and scoring.
5. Add tests for scoring, pressure flags, composites, and archetypes.
6. Implement consent and public dataset eligibility.
7. Add tests for consent and export eligibility.
8. Add MongoDB client and repository adapter.
9. Implement `/api/submit`.
10. Build assessment flow.
11. Build results page.
12. Implement public dataset CSV/JSON exports.
13. Implement aggregate dashboard and small-cell suppression.
14. Implement dataset dictionary page and endpoint.
15. Implement BYOK AI analysis route and UI.
16. Build science, privacy, limitations, and how-I-built-this pages.
17. Polish responsive UI against brand guidelines.
18. Run `pnpm verify`.
19. Run `pnpm build`.
20. Prepare Vercel deployment instructions.

This build order has been executed for the local v0. Keep it as historical sequence and as a recovery checklist for future rebuilds.

## Automated Tests

Use Vitest.

### DRY/SSoT Checks

Before a change is considered ready:

- schema-like values must have one owner and must be imported or inferred elsewhere;
- route paths and API builders must come from `src/config/routes.ts`;
- product/version/default constants must come from `src/config/app.ts`;
- payload types must be inferred from L0 schemas or derived with TypeScript utility types;
- UI tests should import canonical field lists and constants rather than retyping them;
- any file approaching 600 lines of code should be split by coherent capability unless it is generated, mostly static, or easier to maintain as one documented exception.

### Scoring Tests

Create `scoring.test.ts`.

Required coverage:

- reverse scoring works;
- overuse item is excluded from core score;
- all scales have exactly six items;
- each scale has exactly four core items, one reverse item, and one overuse item;
- every answer is required;
- score conversion is correct;
- pressure flags trigger correctly;
- archetype derivation is deterministic.

### Export Tests

Implemented as `src/features/assessment/tests/public-dataset.test.ts`.

Required coverage:

- exported CSV excludes disallowed fields;
- exact timestamp is not exported;
- row count matches eligible submissions;
- public dataset includes only consented rows;
- data dictionary fields match export fields;
- small-cell suppression returns the expected suppression response.

### Consent Tests

Create `consent.test.ts`.

Required coverage:

- cannot submit without use-boundary acceptance;
- cannot submit without processing consent;
- public dataset false means no public export;
- consent defaults are false.

### AI Tests

Create `ai-analysis.test.ts` when we add fake-provider route/orchestration coverage.

Required coverage:

- invalid provider rejected;
- missing key rejected;
- unsupported analysis type rejected;
- key is not included in persisted metadata;
- AI orchestration uses aggregate/export-safe data only.

## Manual QA

Before marking v0 done, manually verify:

- mobile assessment flow;
- desktop assessment flow;
- back/next questionnaire behaviour;
- local progress reset;
- results page copy and visual hierarchy;
- results page print view;
- dataset page with no data;
- dataset page with seeded data;
- dataset page small-n suppression;
- CSV download;
- JSON download;
- data dictionary;
- AI analysis invalid-key error;
- AI analysis happy path if a valid key is available;
- `/how-i-built-this` route and navigation/footer link;
- Vercel build.

## Seed Data

Create a development-only seed script or dev-only route if needed.

Seed target:

```text
30 fake public rows
```

Rules:

- fake rows must be clearly marked as development-only;
- never include names/emails;
- never include employer names;
- never run seed in production unless explicitly intended;
- seed data should exercise archetypes, scale distributions, and suppression states.

## Required Scripts

The repo should keep these scripts working:

```text
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm test
pnpm test:watch
pnpm test:ui
pnpm test:coverage
pnpm typecheck
pnpm verify
pnpm clean
```

`pnpm dev` and `pnpm dev:3001` should open the local frontend in Chrome by default through `scripts/dev-open.mjs`. Use `OPEN_BROWSER=false` when running in automation or when a browser launch is not desired.

Database migration scripts can be added only if/when a migration approach is selected for MongoDB schema/index setup.

## Deployment To Vercel

Steps:

1. Push project to GitHub.
2. In Vercel, import GitHub repo.
3. Set framework preset to Next.js.
4. Set package manager to pnpm.
5. Add environment variables.
6. Deploy preview.
7. Test core routes:
   - `/`;
   - `/assessment`;
   - `/dataset`;
   - `/api/health`;
   - `/api/dataset.csv`.
8. Promote to production after checks pass.

Vercel settings:

```text
Install command: pnpm install --frozen-lockfile
Build command: pnpm build
Output: default Next.js
Node: use a Next.js-supported Node runtime, preferably Node 22 where available
```

The repo includes `vercel.json` to enforce these settings per deployment because the initial Vercel project was created with the wrong `Other` framework/static output settings.

## Environment Variables

Required once persistence is implemented:

```text
MONGODB_URI
HASH_SECRET
NEXT_PUBLIC_APP_URL
ASSESSMENT_VERSION
CONSENT_VERSION
PUBLIC_DATASET_MIN_N
```

Optional:

```text
MONGODB_DB
AI_ANALYSIS_ENABLED
AI_ANALYSIS_RATE_LIMIT
AI_ANALYSIS_RATE_WINDOW_SECONDS
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
OPENAI_API_KEY
ANTHROPIC_API_KEY
```

Notes:

- `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` are not required for BYOK-only public analysis.
- Server-funded keys must not be exposed client-side.
- BYOK keys are user-provided per request and never stored.

## README Requirements

Generate/update `README.md` before deployment with:

- product summary;
- stack;
- local setup commands;
- environment variables;
- MongoDB setup;
- testing commands;
- deployment steps;
- prohibited uses;
- privacy notes;
- dataset export schema;
- validation roadmap;
- link to `/how-i-built-this` once deployed.

## Performance Requirements

- Landing page Lighthouse performance target: 90+.
- Assessment client JavaScript should be lightweight.
- Avoid loading chart libraries on assessment page.
- Dataset charts can be client-side.
- Cache public aggregate responses for 60 seconds if easy.
- Avoid expensive database queries on every paint.

## Security Requirements

- Do not expose secrets client-side.
- No API keys in URLs.
- No BYOK key persistence.
- No public raw database errors.
- Zod validate all API inputs.
- Result token must be unguessable.
- Store token hash only.
- Suppress public aggregates with small n.
- Avoid analytics tools in v0 unless privacy page is updated.

## Acceptance Checklist

Do not consider v0 complete until:

- [x] All pages render without TypeScript errors.
- [x] Assessment can be completed end-to-end on desktop/local smoke test.
- [x] Results report is contextual and attractive.
- [x] MongoDB write works.
- [x] Public dataset excludes non-consented rows.
- [x] CSV download works.
- [x] JSON download works.
- [x] Dataset page handles no-data state.
- [x] Dataset page handles small-n suppression.
- [x] AI BYOK route does not store key.
- [x] `/how-i-built-this` is implemented and linked.
- [x] `pnpm verify` passes.
- [x] `pnpm build` passes.
- [x] README includes local setup, env vars, database setup, and deployment basics.
- [ ] Mobile end-to-end assessment reviewed by a human.
- [ ] Vercel preview deployment passes.
- [ ] Vercel production deployment passes.

## Roadmap

### v0.2

- admin dashboard;
- PDF report generation;
- improved dataset snapshots;
- better AI report citations;
- saved aggregate insight summaries.
- richer mobile polish after user feedback.

### v0.3

- item-level research export with stricter governance;
- reliability dashboard expansion;
- omega calculations;
- item-total correlations;
- exploratory factor analysis offline notebook;
- validation study onboarding.

### v1.0

- technical manual;
- validated norms;
- role context interpretation;
- qualified practitioner mode;
- team reports;
- organisation-level private dashboards;
- paid coaching report.
