# How I Built This

Status: Implementation-current master reference. This is a required public product page, not an internal note.

## Decision

The final product must include a public page titled **How I Built This**.

The page should explain that AssessmentOptima was designed and built with ChatGPT 5.5 and Codex as an AI-assisted product, research, and engineering workflow. This is a core point of the project: the site is both a work-style assessment demo and a transparent example of using frontier AI tools to take an idea from product framing to deployed software.

Recommended route:

```text
/how-i-built-this
```

Recommended file:

```text
src/app/how-i-built-this/page.tsx
```

## Purpose

The page should give public visitors a clear, credible account of:

- why the product exists
- how ChatGPT 5.5 was used for product thinking, research framing, and PRD creation
- how Codex was used inside VS Code to implement the app
- what architectural and privacy decisions were made
- what was intentionally deferred from v0
- where the assessment is provisional and where future validation is needed

This should read like a polished product/build case study, not a raw chat transcript.

## Core Narrative

The story should follow this arc:

1. The initial idea was to explore a modern, Hogan-inspired work-style assessment experience.
2. The project deliberately pivoted away from cloning proprietary assessments.
3. The product became an original, developmental, research-informed work-style platform.
4. ChatGPT 5.5 helped reason through the professional assessment landscape, ethical boundaries, Vercel architecture, privacy risks, and v0 scope.
5. Codex helped turn the requirements into a TypeScript/Next.js/Vercel application.
6. MongoDB Atlas was selected as the v0 database because assessment submissions are cohesive document-shaped records.
7. The final product includes public results, a science/methodology explanation, an anonymised open dataset, aggregate visualisations, and optional AI-assisted dataset analysis.
8. The project remains explicit that the assessment is developmental and exploratory, not validated for high-stakes employment decisions.

## Public Launch Promise

The public build story is anchored by the project owner's LinkedIn launch framing:

```text
Ask 1 of ChatGPT 5.5 Pro:
Create a project requirements document for a new Hogan-type psychometric assessment, based in real behavioural science, with a strong UX, GDPR-aware data handling, the full assessee cycle, results interpretation, open dataset access, downloadable data, and BYOK AI querying.

Ask 2 of Codex 5.5:
Build the site and launch it on Vercel.

Target:
Stand up the project from that workflow in about two hours.
```

Use this as the page's public narrative spine, but keep it precise:

- The ChatGPT 5.5 Pro research and PRD handoff took 47 minutes.
- The 47-minute figure refers to creating the research-backed Markdown handoff documents, not completing the deployed application.
- The page may say the project was scoped as a two-hour AI-assisted build challenge.
- The page should distinguish between a target, a prototype sprint, and the actual final delivery time.
- The page should not repeat volatile leaderboard or model-release claims unless the PRD later provides source links.
- The page should not imply the assessment became professionally validated within the sprint.
- The page should reinforce that the interesting question is pragmatic: what can ChatGPT 5.5 and Codex produce when given serious product, science, privacy, and UX constraints?

## Build Log Snapshot

At **2026-04-23 21:21 BST**, the project documentation and repository setup phase was complete.

What existed at this milestone:

- GitHub repository initialised and connected.
- pnpm package management selected.
- Next.js App Router scaffold created.
- strict TypeScript, Vitest, ESLint, Prettier, Tailwind v4, and PostCSS configured.
- AssessmentOptima brand tokens and global CSS foundation created.
- MongoDB/OpenAI environment scaffolding documented.
- PRD consolidated into a source-of-truth product document.
- Master docs created for architecture, data, brand, assessment model, routes/API, privacy/open data, AI analysis, delivery/QA, and the How I Built This page.
- Master backlog created to track implementation progress.

Source tree snapshot, excluding secrets, `.git`, `node_modules`, local editor settings, and generated build output:

```text
.env.example
.gitignore
.prettierignore
AGENTS.md
StartingThoughts.md
_docs/PRD.md
_docs/README.md
_docs/environment.md
_docs/master-docs/ai-analysis.md
_docs/master-docs/application-architecture.md
_docs/master-docs/assessment-model.md
_docs/master-docs/brand-guidelines.md
_docs/master-docs/data-architecture.md
_docs/master-docs/delivery-and-qa.md
_docs/master-docs/how-i-built-this.md
_docs/master-docs/privacy-and-open-data.md
_docs/master-docs/product-routes-and-api.md
_docs/master_backlog.md
_docs/research.md
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
pnpm-lock.yaml
postcss.config.mjs
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
tests/tooling.test.ts
tsconfig.json
vitest.config.ts
```

At **2026-04-23 21:22 BST**, the public product naming decision was confirmed:

- Public product name: **AssessmentOptima**.
- Assessment instrument name: **WorkStyle Compass**.
- Future build-log milestones should be recorded in this document as work progresses.

At **2026-04-23 21:23 BST**, the implementation phase started.

- Build target: v0 against the consolidated PRD and master backlog.
- First implementation slice: dependencies, Zod schemas, assessment model, scoring, consent/export rules, and tests.
- Build-log rule added to `AGENTS.md`: meaningful changes must record timestamped milestones here.

At **2026-04-23 21:25 BST**, implementation standards were tightened before continuing the build.

- L0/Zod schemas were made the explicit single source of truth for contracts and inferred types.
- DRY/SSoT guidance was added for schemas, enums, validation rules, API shapes, exports, and tests.
- Source files now need concise file-header JSDoc where useful, including path, created date, updated date, and description.
- UI quality bar was raised explicitly: the finished product must be polished, memorable, responsive, and portfolio-worthy.

At **2026-04-23 21:29 BST**, the first implementation slice passed verification.

- Latest core runtime dependencies were installed for Zod, MongoDB, and Lucide React.
- L0 schemas were expanded for consent, respondent context, item contracts, answer maps, result reports, public dataset rows, API responses, aggregate payloads, and BYOK AI requests.
- WorkStyle Compass scale definitions and the 54-item bank were implemented.
- Pure scoring covered reverse scoring, bands, pressure flags, composites, archetype derivation, strengths, development edges, and the 30-day experiment.
- Public export shaping covered row allowlisting, monthly timestamp fields, CSV generation, small-cell suppression, and aggregate calculation.
- Vitest coverage for scoring, consent, public exports, suppression, aggregates, and result tokens passed: 5 files, 20 tests.

At **2026-04-23 21:33 BST**, the MongoDB/API layer was implemented.

- MongoDB Atlas persistence was wired through a repository port and Mongo adapter.
- Startup-safe indexes were added for private result token hashes, public row IDs, and public dataset queries.
- API routes were implemented for health, submit, result lookup, aggregates, JSON export, CSV export, data dictionary, and BYOK AI analysis.
- The OpenAI BYOK adapter uses the Responses API with `store: false`; the Anthropic adapter uses the Messages API.
- API keys pasted into BYOK analysis are passed through for the request and are not stored in MongoDB.

At **2026-04-23 21:40 BST**, the first full Next.js v0 build passed locally.

- Public routes were implemented for the landing page, science page, privacy page, limitations page, assessment flow, private results, dataset dashboard, data dictionary, BYOK AI analysis, and How I Built This.
- The UI moved from a scaffold to a bespoke AssessmentOptima interface with global navigation, responsive layout, assessment progress, Likert controls, report visuals, aggregate score bars, and editorial build-story pages.
- `pnpm verify` passed: strict TypeScript, ESLint with zero warnings, Prettier check, and Vitest.
- `pnpm build` passed under Next.js 16.2.4 with Turbopack.
- Local HTTP smoke tests passed for `/api/health`, `/assessment`, `/dataset`, `POST /api/submit`, and `GET /api/results/[token]`.
- Two synthetic smoke-test submissions were removed from MongoDB immediately after verification so they did not remain in the public research dataset.

At **2026-04-23 21:49 BST**, the shareability and credibility slice from external feedback was implemented.

- Dynamic archetype OG images were added for LinkedIn/social previews.
- The result report gained a radar chart, current-sample comparison badges, share actions, LinkedIn share link, 30-day experiment calendar export, and a delete-my-submission flow.
- Dataset credibility was strengthened with a live, small-cell-protected internal-consistency snapshot labelled provisional.
- The AI analysis page gained a baked example output and published prompt guardrails so first-time visitors can understand the feature without supplying a key.
- The How I Built This page gained git-derived build receipts and an AI-human accountability section.
- API documentation was added at `/api/docs` with curl examples.
- BYOK AI analysis gained rate limiting with optional Upstash Redis REST support and a local fallback.
- `pnpm verify` and `pnpm build` both passed after the slice.
- Smoke tests passed for result page rendering, dynamic OG image, calendar export, API docs, and delete-by-management-token.

At **2026-04-23 21:51 BST**, the global visual foundation was tightened after UX/CSS feedback.

- The site-wide grid/radial background was removed in favour of a calmer research-lab surface.
- Type and spacing rhythm tokens were added to `globals.css` so pages do not invent ad-hoc scale values.
- Button interactions gained hover, active, disabled, size, transition, and icon-slot treatment.
- The global focus ring moved from amber-only to a brand ring with a soft halo.
- Print styles were added so result/report pages do not print the navigation or action controls.
- Root Open Graph metadata, a default generated OG image, and an SVG favicon were added for public sharing and browser chrome.

At **2026-04-23 21:59 BST**, the DRY/SSoT implementation pass was completed.

- Schema-like constants were consolidated into `src/features/assessment/schemas/assessment.ts`, including `scaleKeys`, answer values, respondent context buckets/defaults, public dataset fields, response schemas, comparison schemas, and reliability schemas.
- Product defaults moved into `src/config/app.ts`, including product name, assessment name, database default, version defaults, filenames, citation strings, local hash-secret fallback, and social image settings.
- Public route strings and API route builders moved into `src/config/routes.ts`.
- Respondent context form metadata moved into `src/features/assessment/application/respondent-context.ts` so the assessment form no longer recreates schema field lists inline.
- Public dataset helper interfaces were replaced with schema-derived types and `Pick<>` from the canonical stored submission contract.
- Master docs were updated to match the actual file structure and SSoT rules.
- `pnpm verify` and `pnpm build` passed after the consolidation.

At **2026-04-24 11:02 BST**, the public-launch hardening pass was completed from ChatGPT Pro review feedback.

- Private result viewing and deletion were split into separate view and management tokens, with only hashes stored in MongoDB.
- LinkedIn sharing was moved away from `/results/[token]` and onto share-safe `/archetypes/[slug]` pages with public archetype OG cards.
- Public row-level dataset exports were tightened to score-level fields only for v0; respondent context remains private for aggregate analysis until sample size and disclosure controls justify release.
- Result comparisons were renamed from percentiles to current public sample comparisons, with explicit "not a representative norm" copy.
- The Delivery item-bank inconsistency was fixed so each scale has four core items, one reverse item, and one overuse item.
- BYOK AI copy now states that keys are sent to the server for the request, are not stored by the app, and may be processed by the chosen provider.
- Privacy copy now clarifies hosting-provider operational metadata, contact, and retention placeholders.
- The global CSS was split into base, layout, reporting, and responsive layers so source files stay under the 600-line maintainability rule.

At **2026-04-23 22:07 BST**, the home page hero formatting was corrected after visual review.

- The oversized viewport-scaled hero title was replaced with breakpoint-based display tokens.
- The report preview panel was width-capped and aligned inside the hero grid so it cannot overlap the headline.
- The home page typography now avoids viewport-driven font scaling while preserving the large editorial brand treatment.
- `pnpm verify` and `pnpm build` passed after the CSS fix.

At **2026-04-23 22:12 BST**, the first GitHub-to-Vercel deployment issue was found and fixed.

- Commit `441ccab` was pushed to `origin/main`, triggering the Vercel production build for `assessmentoptima`.
- Vercel installed dependencies and completed the Next.js build successfully, then failed because the project was still configured as Framework Preset `Other` with a static `public` output directory expectation.
- A root `vercel.json` was added to force the project to deploy as Next.js with `pnpm build`, `pnpm install --frozen-lockfile`, and the Next.js default output handling.
- The local linked Vercel production build then completed successfully into `.vercel/output`.

At **2026-04-23 22:22 BST**, the first production runtime smoke test identified the next launch blocker.

- Vercel production environment variables were added for MongoDB, result-token hashing, app URL, assessment/consent versions, dataset threshold, AI analysis flags, and the server OpenAI key.
- Production redeploy succeeded and `https://assessmentoptima.vercel.app` plus `/api/health` returned `200`.
- A synthetic `/api/submit` smoke test timed out at the Vercel function limit, indicating a runtime persistence connectivity issue rather than a build issue.
- MongoDB client handling was tightened with server-selection/connect timeouts below the Vercel function limit, production-safe client reuse, and clean `503 Database connection unavailable` responses for database connectivity failures.
- Local `pnpm verify`, `pnpm build`, and linked `vercel build --prod` passed after the runtime hardening.

At **2026-04-23 22:24 BST**, production deployment status was confirmed after runtime hardening.

- Commit `1c831ea` deployed successfully to Vercel production.
- `https://assessmentoptima.vercel.app/` returned `200`.
- `https://assessmentoptima.vercel.app/api/health` returned `200`.
- The dataset page returned `200`, with persistence unavailable handled by page-level fallback.
- Synthetic `/api/submit` returned `503 Database connection unavailable` in about 9 seconds, confirming the remaining blocker is MongoDB Atlas connectivity from Vercel rather than a Vercel build failure or missing production env variables.

At **2026-04-23 22:26 BST**, maintainability standards were tightened for future work.

- `AGENTS.md` now sets a default maximum of 600 lines of code per file.
- Files approaching that size should be split by coherent capability or module boundary, while allowing documented exceptions for generated, mostly static, or intentionally cohesive files.

At **2026-04-23 22:28 BST**, the home hero was adjusted after visual review on the deployed page.

- The report preview visual was made smaller and the two-column hero grid was rebalanced to give the unbroken AssessmentOptima wordmark more room.
- Desktop display type was reduced slightly while preserving the editorial first-screen impact.
- The existing global stylesheet remains above the new 600-line guidance because this was a targeted launch polish change; splitting the global CSS should be handled as a separate capability-based refactor.

At **2026-04-23 22:37 BST**, the assessment experience was rebuilt from a form dump into a gated flow.

- `/assessment` now follows the intended sequence: Intro, Consent, About you, Assessment, Review, Submit.
- The questionnaire is split into six screens of nine statements, with a single answered-count progress indicator instead of nine empty scale bars.
- Likert controls now use labelled buttons with clear response anchors, and item IDs are kept out of the visible UI.
- Consent and context copy was rewritten in plainer language, optional context is skippable, and progress is saved locally in the browser.
- The implementation was split into capability-focused components and a feature-scoped CSS module so new files stay below the 600-line maintainability threshold.
- `pnpm verify` and `pnpm build` passed after the assessment flow rewrite.

At **2026-04-23 22:42 BST**, the DRY/SSoT architecture rules were strengthened.

- `AGENTS.md` now states "DRY/SSoT all day" as an explicit development rule.
- The application architecture doc now defines source-of-truth owners for schemas, env contracts, product constants, routes, derived feature metadata, and UI-only presentation data.
- Master docs were updated so assessment, data, API, privacy, AI, and QA guidance all reinforce the same rule: add or change the owner first, then import, infer, or derive everywhere else.

At **2026-04-23 22:49 BST**, the public How I Built This UI was upgraded into a fuller launch case study.

- The page now presents the Ask 1 / Ask 2 narrative, 47-minute document phase, two-hour sprint target, shipped product proof points, and AI-human accountability in the public UI.
- The story now makes the model-behaviour proof point clearer: speed mattered, but the stronger signal was connecting adjacent requirements across privacy, open data, sharing, maintainability, and deployment.
- The page now includes an honest launch-status section: local verification/build and public Vercel routes are green, while production MongoDB persistence still needs Atlas network access from Vercel/serverless egress before the assessment can be shared as fully transactional.

At **2026-04-23 22:59 BST**, the core assessment journey was made resilient to production persistence outages.

- A signed stateless result-token fallback was added for cases where MongoDB is temporarily unreachable from Vercel.
- If persistence fails at submit time, users still receive a private result report, result API response, social OG image, and 30-day experiment calendar export.
- Public dataset persistence/export still requires MongoDB Atlas network access, so the fallback does not pretend that non-persisted responses were added to the research dataset.
- MongoDB connection timeouts were shortened so unavailable persistence fails quickly and the user journey can continue.

At **2026-04-23 23:02 BST**, the dataset page was polished for launch resilience.

- Public export buttons are locked while the dataset is suppressed or persistence is unavailable, preventing visitors from clicking into raw error responses.
- The dataset page now explains that private reports work and public exports unlock once MongoDB Atlas accepts Vercel traffic and release thresholds are met.

## Required Sections

### Hero

Title:

```text
How I Built This
```

Suggested subtitle:

```text
An AI-assisted build story: from a rough work-style assessment idea to a public Next.js product using ChatGPT 5.5, Codex, MongoDB, and Vercel.
```

The hero should be editorial and confident, but it must not imply that AI alone created a validated psychometric instrument.

### The Original Question

Summarise the starting prompt in plain English:

- Can we create a public, shareable work-style assessment inspired by professional assessment architecture?
- Can users take it, receive a useful developmental report, and contribute anonymously to an open dataset?
- Can the dataset be explored publicly and optionally analysed with AI?
- Can this be built quickly enough for a Codex/Vercel sprint?
- Can the build publicly demonstrate the practical workflow from ChatGPT 5.5 Pro research/PRD generation to Codex 5.5 implementation and Vercel launch?

Do not paste raw secrets, private chat, or full internal transcripts.

### The Pivot

Explain the key product decision:

```text
This should not be a Hogan clone or a pretend-clinical assessment. It should be an original, developmental, research-informed work-style tool with clear use boundaries.
```

This section should mention:

- Hogan-style architecture as inspiration only: everyday style, pressure/overuse risks, motives/values, and role context.
- No copying of proprietary scales, items, reports, labels, or protected materials.
- Public-facing claims should be cautious and disciplined.

### What ChatGPT 5.5 Helped With

Describe ChatGPT 5.5 as a thinking and drafting partner for:

- creating the initial build-grade PRD
- producing the research-backed handoff documents in 47 minutes
- product positioning
- research synthesis
- scope control
- privacy risk identification
- architecture tradeoffs
- PRD creation
- methodology language
- validation roadmap framing

The page should make clear that AI assistance does not replace professional validation, legal review, or psychometric evidence.

### What Codex Helped With

Describe Codex as the implementation partner for:

- Next.js App Router setup
- TypeScript strict-mode setup
- pnpm scripts and tooling
- Vitest tests
- MongoDB data architecture
- route handlers/server actions
- UI implementation
- Vercel readiness
- turning the PRD and master docs into a deployed public product

This section can include a concise build timeline if accurate. Do not claim “built in two hours” unless the actual public build was completed in that window. It is safer to say:

```text
The v0 was scoped for a two-hour Codex build sprint.
```

If using a timeline, include:

```text
47 minutes: ChatGPT 5.5 Pro generated the research basis and Codex-ready PRD as Markdown handoff documents.
Next phase: Codex used those documents and the master docs to build the Next.js/Vercel product.
```

### Architecture Choices

Summarise the technical stack:

```text
Next.js App Router
TypeScript
pnpm
Vitest
MongoDB Atlas
Vercel
OpenAI/Anthropic-compatible AI analysis model, with BYOK preferred for public use
```

Reference the hexagonal architecture:

```text
L0 - Zod schemas and shared contracts
L1 - MongoDB adapters
L2 - AI adapters
L3 - business orchestration
L4 - API/server entrypoints
L5 - web frontend
```

Link to the public methodology/science page and, if appropriate, the public dataset page.

### Responsible Data And AI

Explain the privacy posture:

- no names
- no email capture in v0
- no company names
- no precise job titles
- no precise locations
- no IP address in public dataset
- no free text in public exports
- coarse demographic buckets only
- timestamps rounded to month for export
- minimum group threshold for public subgroup views
- BYOK AI analysis should not store user API keys

This section should reinforce that the site is a public research/demo platform, not a production selection system.

### What Is Provisional

Be explicit:

- the item set is original and provisional
- the report is developmental
- no norms are claimed in v0
- no reliability or validity evidence is claimed in v0
- the tool should not be used for hiring, promotion, redundancy, diagnosis, or other high-stakes decisions

### What Comes Next

Include a forward-looking roadmap:

- reliability analysis
- factor analysis
- validation study
- fairness and adverse-impact review
- qualified interpretation guidance
- larger dataset quality checks
- improved public dashboard
- curated AI insights
- documented versioning of the instrument

## Required Tone

The page should feel like a serious, transparent build case study:

- clear
- polished
- candid
- technically credible
- product-led
- ethically careful

Avoid:

- hype
- “AI built this all by itself” claims
- psychometric overclaiming
- copying raw chat logs
- exposing internal prompts verbatim unless deliberately curated
- mentioning secrets or private operational details

## UI Requirements

The page should be beautiful enough to act as a portfolio artefact.

Recommended structure:

- full-width editorial hero
- timeline or process section
- stack/architecture visual
- “AI helped with / humans stayed accountable for” comparison
- privacy and validity callout
- links to assessment, science page, dataset page, and GitHub repository

Avoid a marketing-card wall. Use dense but readable editorial sections with restrained visual styling, diagrams, and concrete artefacts.

## Acceptance Criteria

- `/how-i-built-this` exists and is reachable from the main navigation/footer.
- Page explicitly mentions ChatGPT 5.5 and Codex.
- Page references the public Ask 1 / Ask 2 launch challenge.
- Page states that the research/PRD handoff took 47 minutes and makes clear that this was the document phase.
- Page frames the two-hour target accurately as a sprint goal unless the final delivery record proves it was achieved.
- Page explains the pivot away from cloning proprietary assessments.
- Page states that the assessment is developmental, exploratory, and not validated for high-stakes decisions.
- Page links to the science/methodology page.
- Page links to the open dataset page once available.
- Page does not expose secrets, private keys, private chat logs, or raw environment details.
- Page does not claim validated psychometric status.
- Page does not imply that API keys pasted into BYOK AI analysis are stored.

## Source Background

This requirement comes from the project owner’s stated goal: the exercise is not only to build an assessment site, but to publicly show how ChatGPT 5.5 and Codex were used to shape and build it.

The background notes emphasise:

- public LinkedIn framing: ChatGPT 5.5 Pro creates the research-backed PRD; Codex 5.5 builds and launches the site on Vercel
- 47-minute ChatGPT 5.5 Pro document phase for the research-backed methodology brief and Codex-ready PRD
- two-hour target for standing up the v0 from the AI-assisted workflow
- start as product/design build, not pretend-clinical assessment
- research the professional assessment landscape
- borrow broad architecture patterns while staying original
- include clear limits and validation caveats
- use Next.js/Vercel for public deployment
- include public science/methodology pages
- include individual results, anonymised open dataset, aggregate visualisations, and optional AI synthesis
- prevent AI/API cost exposure by preferring BYOK for public analysis
