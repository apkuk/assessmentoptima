# Master Backlog

Status: Active execution tracker.

Use this file to track build progress against the PRD and master docs. Keep statuses current as implementation moves.

Legend:

```text
[ ] Not started
[~] In progress
[x] Done
[!] Blocked / needs decision
```

## Source Docs

- [PRD](./PRD.md)
- [Application Architecture](./master-docs/application-architecture.md)
- [Data Architecture](./master-docs/data-architecture.md)
- [Brand Guidelines](./master-docs/brand-guidelines.md)
- [Assessment Model](./master-docs/assessment-model.md)
- [Product Routes And API](./master-docs/product-routes-and-api.md)
- [Privacy And Open Data](./master-docs/privacy-and-open-data.md)
- [AI Analysis](./master-docs/ai-analysis.md)
- [Delivery And QA](./master-docs/delivery-and-qa.md)
- [How I Built This](./master-docs/how-i-built-this.md)
- [Research Notes](./research.md)

## Decisions

- [x] Package manager: pnpm.
- [x] App framework: Next.js App Router.
- [x] Language: strict TypeScript.
- [x] DRY/SSoT: schemas/config/routes own mirrored constants and contract types.
- [x] Database: MongoDB Atlas.
- [x] Test runner: Vitest 4.
- [x] Styling direction: Tailwind v4 plus AssessmentOptima global tokens.
- [x] Global background polish: calm lab surface, no site-wide grid.
- [x] V0 assessment instrument: WorkStyle Compass.
- [x] Public AI story page required: `/how-i-built-this`.
- [x] Final public product name: AssessmentOptima.
- [x] WorkStyle Compass remains the internal/assessment instrument name.
- [x] Confirm whether Anthropic BYOK is required in v0 or OpenAI-only BYOK is acceptable for first deploy.
- [ ] Confirm final dataset licence: CC BY 4.0, CC0, or placeholder pending legal review.
- [ ] Confirm public contact route/email placeholder for privacy and dataset pages.
- [ ] Confirm whether result links should be shareable indefinitely in v0.

## Foundation

- [x] Initialise git repo and push baseline.
- [x] Switch to pnpm.
- [x] Add Next.js App Router scaffold.
- [x] Add strict TypeScript config.
- [x] Add Vitest baseline.
- [x] Add ESLint and Prettier.
- [x] Add Tailwind v4 and PostCSS.
- [x] Add global brand tokens and font setup.
- [x] Add `.env.example` and environment docs.
- [x] Add README for local setup, env vars, and deployment.
- [x] Add Zod dependency.
- [x] Add MongoDB driver dependency.
- [x] Add Lucide React dependency.
- [x] Chart approach: implement accessible CSS charts first.

## L0 Schemas And Contracts

- [x] Server env schema.
- [~] Public/client env schema.
- [x] Consent schema.
- [x] Respondent context schema.
- [x] Assessment item schema.
- [x] Answer map schema.
- [x] Scoring output schema.
- [x] Public dataset row schema.
- [x] Aggregate response schema.
- [x] AI analysis request/response schema.
- [x] Result token schema.
- [x] Scale key export is derived from `scaleKeySchema`.
- [x] Respondent context defaults and buckets are centralised in L0 schemas.
- [x] Public dataset/reliability/comparison contracts are schema-derived.

## L3 Assessment Logic

- [x] Implement assessment scale definitions.
- [x] Implement 54-item bank.
- [x] Implement answer completeness validation.
- [x] Implement reverse scoring.
- [x] Implement scale score conversion.
- [x] Implement profile bands.
- [x] Implement pressure flags.
- [x] Implement composite scores.
- [x] Implement archetype derivation.
- [x] Implement report interpretation helpers.
- [x] Implement 30-day experiment selection.

## Tests

- [x] Tooling smoke test.
- [x] Scoring tests.
- [x] Assessment model integrity tests.
- [x] Consent tests.
- [x] Public export tests.
- [x] Small-cell suppression tests.
- [x] Result token hashing tests.
- [x] Aggregate calculation tests.
- [x] SSoT consolidation compiles under strict TypeScript.
- [ ] AI orchestration tests with fake provider.

## L1 MongoDB

- [x] Server-only Mongo client utility.
- [x] Database name configuration.
- [x] Assessment submission repository.
- [x] Public dataset repository.
- [x] Aggregate repository.
- [ ] AI analysis event repository, optional.
- [x] Index creation script or startup-safe index helper.
- [ ] Development seed data script.

## L4 API And Server Entrypoints

- [x] `GET /api/health`.
- [x] `POST /api/submit`.
- [x] `GET /api/results/[token]`.
- [x] `GET /api/aggregates`.
- [x] `GET /api/dataset.csv`.
- [x] `GET /api/dataset.json`.
- [x] `GET /api/dataset/dictionary.json`.
- [x] `POST /api/ai/analyze`.
- [x] `GET /api/og/[token]`.
- [x] `GET /api/og/archetype/[slug]`.
- [x] `DELETE /api/results/[token]`.
- [x] `GET /api/results/[token]/experiment.ics`.
- [x] Public API docs page at `/api/docs`.

## L5 Public Pages

- [x] Landing page `/`.
- [x] Science/methodology page `/science`.
- [x] Privacy/data page `/privacy`.
- [x] Limitations page `/limitations`.
- [x] Assessment page `/assessment`.
- [x] Results page `/results/[token]`.
- [x] Public archetype share page `/archetypes/[slug]`.
- [x] Dataset dashboard `/dataset`.
- [x] Dataset dictionary `/dataset/dictionary`.
- [x] AI analysis page `/ai-analysis`.
- [x] How I Built This page `/how-i-built-this`.
- [x] Global navigation.
- [x] Footer with use-boundary language.

## UI Components

- [x] Button.
- [x] Badge.
- [x] Alert.
- [x] Progress indicator.
- [x] Section header.
- [x] Likert item.
- [x] Assessment stepper.
- [x] Scale score card.
- [x] Archetype hero.
- [x] Pressure flag panel.
- [x] Dataset metric.
- [x] Aggregate chart.
- [x] Data dictionary table.
- [x] BYOK AI analysis form.
- [x] Radar chart.
- [x] Result share actions.
- [x] Current public sample comparison badges.
- [x] Reliability snapshot block.
- [x] Git-derived build timeline.
- [x] AI-human accountability panel.
- [x] Button hover/active/disabled/size states.
- [x] Brand-tinted focus ring with soft halo.
- [x] Print stylesheet for reports.
- [x] Default generated OG image and favicon.

## Privacy And Dataset

- [x] Consent copy implemented.
- [x] No pre-ticked consent defaults.
- [x] No names/emails/employers/exact job titles/free text.
- [x] Public export allowlist implemented.
- [x] Public row ID not tied to Mongo `_id`.
- [x] Monthly timestamp rounding.
- [x] Minimum group threshold.
- [x] Dataset dictionary.
- [x] Public dataset no-data state.
- [x] Public dataset suppression state.
- [ ] Dataset licence copy.
- [x] Separate private view and management/delete tokens.
- [x] Public archetype sharing that does not expose private result URLs.
- [x] Score-first public row exports with v0 context fields omitted.
- [x] Delete-by-management-token flow.
- [x] Provisional internal-consistency snapshot with higher sample threshold.

## AI Analysis

- [x] BYOK page copy.
- [x] Provider selection.
- [x] API key password field.
- [x] No key localStorage persistence.
- [x] OpenAI adapter.
- [x] Anthropic adapter, if confirmed for v0.
- [x] Prompt guardrails.
- [x] Prompt transparency on public AI analysis page.
- [x] Baked example AI analysis output.
- [x] Aggregate/export-safe data only.
- [x] Safe provider error handling.
- [x] AI analysis rate limiting.
- [ ] Optional non-secret event logging.

## Deployment

- [x] Vercel project linked.
- [x] Vercel env vars configured.
- [!] MongoDB Atlas network/user permissions confirmed for Vercel.
- [ ] Preview deployment passes.
- [x] Production deployment passes.
- [x] Core route smoke test after deploy.
- [ ] Dataset export smoke test after deploy.
- [!] Submit/result smoke test after deploy.

## Acceptance

- [x] `pnpm verify` passes.
- [x] `pnpm build` passes.
- [x] End-to-end assessment works on desktop.
- [ ] End-to-end assessment works on mobile.
- [x] MongoDB write works.
- [x] Result link fetch works.
- [x] Public dataset excludes non-consented rows.
- [x] CSV export works.
- [x] JSON export works.
- [x] Small-n suppression works.
- [x] BYOK key is not stored or logged.
- [x] Share-safe archetype OG image works.
- [x] 30-day experiment calendar export works.
- [x] Delete-by-management-token works.
- [x] How I Built This page includes 47-minute research/PRD phase and two-hour build target accurately.
- [x] How I Built This page includes timestamped build-log milestones through deployment.
- [x] README complete.

## Remaining Recommended Next Steps

- [ ] User product/UI review on desktop.
- [ ] User product/UI review on mobile.
- [ ] Feedback polish pass after review.
- [ ] Decide dataset licence.
- [x] Add privacy/contact and retention placeholders.
- [ ] Allow Vercel production functions to reach MongoDB Atlas, then rerun submit/result smoke.
- [ ] Deploy Vercel preview.
