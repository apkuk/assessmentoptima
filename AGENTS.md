# Agent Working Guide

This project is a TypeScript-first Vercel app for a public, research-informed work-style assessment. Keep the product language disciplined: developmental, exploratory, and research-oriented. Do not present the assessment as a validated hiring, diagnosis, promotion, or employment decision tool.

The final product must include a public `How I Built This` page explaining the AI-assisted build process with ChatGPT 5.5 and Codex. Keep that page transparent and polished without exposing secrets, raw private chat logs, or overstating the assessment's validity.

The `How I Built This` page is a core purpose of this exercise, not a nice-to-have. When making meaningful project changes, update `_docs/master-docs/how-i-built-this.md` with a dated build-log note covering what changed and when. Use the current timestamp available in the environment/tooling. Log milestones, stack decisions, major docs, architecture changes, implementation phases, verification results, and deployment events. Do not log secrets, raw private chat, or sensitive operational details.

The public launch framing is an Ask 1 / Ask 2 challenge: ChatGPT 5.5 Pro creates the research-backed PRD/research handoff in 47 minutes, then Codex with GPT-5.5 builds and launches the site on Vercel with a two-hour target. Treat the two-hour timebox as a target unless the actual build record proves it was met, and do not repeat volatile leaderboard claims without citations.

Follow `_docs/master-docs/brand-guidelines.md` for visual design. The brand should feel like a modern behavioural science lab: evidence-led, calm, transparent, precise, and accessible. The UI needs to be materially better than a generic scaffold: polished, memorable, responsive, and portfolio-worthy. Avoid quiz-like styling, generic HR SaaS visuals, purple/blue AI gradients, decorative blobs, and psychometric overclaiming.

## Development Defaults

- Use TypeScript everywhere and keep `strict` mode clean.
- DRY/SSoT all day. Before adding a type, constant, enum-like array, field list, label map, route path, env key, schema, validation rule, prompt contract, or API/data shape, first identify the owning module. If no owner exists, create it in the correct layer and derive/import from it everywhere else.
- Treat L0 schemas as king. Zod schemas and shared contracts are the single source of truth for request shapes, form state, domain objects, API responses, persistence boundaries, and AI outputs.
- Keep schema-derived types DRY. Prefer `z.infer` from the canonical schema over hand-written duplicate interfaces unless a boundary genuinely needs a separate persistence or view model.
- Treat duplicated schema-like data as a bug. UI, API, repositories, exports, tests, and docs should consume canonical schemas/config/routes rather than maintain parallel definitions.
- Do not create parallel enums, validation rules, route strings, env-key lists, or field lists when they can be imported from the owner module. If a UI, API, repository, export, or test needs a definition, it should reference the canonical schema/constant.
- Prefer small, named functions and explicit domain types over broad object bags.
- Keep files below 600 lines of code by default. If a file approaches that size, split it along sensible capability/module boundaries such as schemas, adapters, orchestration, view components, data transforms, or tests. Do not split mechanically when the file is generated, mostly static data, or clearly easier to maintain as one cohesive unit, but record the rationale if keeping it large.
- Keep behavior at the edges validated. When the app adds forms, API routes, server actions, or imports, use schema validation rather than trusting untyped input.
- Avoid premature framework churn. Start with Next.js App Router conventions when the app scaffold is added, because Vercel deployment is the target.
- Keep UI and domain logic separate enough that scoring, export eligibility, and privacy rules can be tested without rendering React.
- Build front-end pages from shared UI primitives first. Prefer `src/components/ui/*` for repeated page shells, headers, grids, surfaces, metrics, action rows, and button links instead of recreating raw class combinations inline. Add or extend a primitive when a pattern repeats across pages.

## Developer Experience

- Every meaningful behavior change should be covered by a fast unit test unless the risk is genuinely trivial.
- Use `pnpm verify` as the local confidence check. It runs strict typechecking, linting, format checks, and the Vitest suite.
- Keep scripts boring and predictable: `dev`, `build`, `lint`, `test`, `test:watch`, `typecheck`, and `verify` should continue to work throughout the project. `pnpm dev` opens the local frontend in Chrome by default; set `OPEN_BROWSER=false` to suppress that behavior or `BROWSER="<app name>"` to override the browser.
- Add dependencies only when they remove real complexity or match the selected stack. Avoid one-off libraries for simple formatting or data transforms.
- Prefer clear file names and stable module boundaries over clever abstractions.

## Testing Standards

- Test scoring, consent/export eligibility, anonymisation, aggregation thresholds, and data-shaping rules as pure TypeScript wherever possible.
- Keep tests deterministic. Do not depend on live APIs, current time, random values, or network calls unless they are explicitly mocked or injected.
- Use Vitest imports directly instead of global test APIs.
- Add regression tests before fixing a bug when the failure can be reproduced in a small test.

## Privacy And Data

- Do not collect names, emails, company names, precise job titles, precise locations, IP addresses, or free-text responses for public dataset rows unless a later PRD explicitly changes that with a privacy review.
- Use coarse buckets for demographics and timestamps intended for export.
- Protect small groups. Aggregates and exports should enforce a minimum group threshold before exposing subgroup slices.
- Treat API keys and provider tokens as secrets. Never expose server-side keys to client components or logs.
- Store local credentials only in `.env.local`; deployed credentials belong in Vercel Environment Variables.

## Documentation

- Put project documents in `_docs/`.
- Add a short file-header JSDoc comment at the top of source files where the file is not self-explanatory. Include file path, created date, updated date, and a concise description.
- Keep file headers current when materially changing a file. Prefer concise headers over noisy boilerplate.
- Use inline comments for non-obvious business rules, privacy constraints, scoring decisions, or security boundaries. Do not comment obvious assignments or JSX structure.
- Keep implementation notes close to the code when they explain non-obvious constraints.
- Update docs when changing public claims, privacy behavior, scoring assumptions, or deployment requirements.
- Keep `_docs/master_backlog.md` current as work progresses.
- Keep `_docs/master-docs/how-i-built-this.md` current with timestamped build-log milestones.

## Git Hygiene

- The repository may contain user work in progress. Do not revert unrelated changes.
- Keep commits focused once git is initialized.
- Before opening a PR or deploying, run `pnpm verify` and summarize any known gaps.
