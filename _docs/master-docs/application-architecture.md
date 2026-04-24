# Application Architecture

Status: Implementation-current master reference. This file defines the project structure and dependency rules for implementation.

## Architecture Style

Use a pragmatic hexagonal architecture, also known as ports and adapters.

The core rule is simple: product behavior should not depend directly on Next.js, MongoDB, OpenAI, or browser UI code. Business logic should be executable in fast Vitest tests with fake adapters.

This project will use the layer names requested for the build:

```text
L0 - Zod schemas and shared contracts
L1 - Database adapters
L2 - AI adapters
L3 - Orchestrators and business logic
L4 - API and server entrypoints
L5 - Web frontend
```

## Dependency Direction

Allowed dependencies:

```text
L5 -> L4
L4 -> L3 + L0 + concrete adapter factories
L3 -> L0 + port interfaces
L1 -> L0 + port interfaces
L2 -> L0 + port interfaces
L0 -> no application layers
```

Disallowed dependencies:

```text
L0 -> L1/L2/L3/L4/L5
L3 -> Next.js, React, MongoDB driver, OpenAI SDK, browser APIs
L5 -> MongoDB driver, OpenAI SDK, process.env secrets
L1 -> React components
L2 -> React components
```

Ports should sit with the core contracts, not inside infrastructure-only folders. L1 and L2 are adapter implementations of those ports.

## DRY/SSoT Architecture Contract

DRY/SSoT is an architecture rule, not a style preference. Every reusable definition needs one owner. All other layers import, infer, or derive from that owner.

Before adding a type, constant, enum-like array, field list, label map, route path, env key, schema, validation rule, prompt contract, or API/data shape, identify the owner first. If no owner exists, create one in the correct layer and then consume it everywhere else.

| Concern | Owner |
| --- | --- |
| Domain enums, consent shape, context buckets, item/answer schemas, result schemas, aggregate schemas, public dataset fields, AI request/response schemas | `src/features/assessment/schemas/assessment.ts` |
| Environment variable contracts | `src/lib/env/server.ts` and client-safe env modules if added |
| Product names, assessment names, version defaults, database defaults, filenames, citation strings, local fallbacks, OG image sizes | `src/config/app.ts` |
| Public page paths and API route builders | `src/config/routes.ts` |
| Derived feature metadata such as respondent context labels, AI provider defaults, scoring composites, archetype rules, prompt guardrails, and page grouping logic | L3 application modules under `src/features/*/application/` |
| Reusable page shells, headers, grids, action rows, button links, cards, surfaces, and metric primitives | `src/components/ui/*` |
| Component-only presentational copy or layout arrays that do not mirror a schema/config/route/contract | The component or a nearby UI helper |

Implementation rules:

- L0 Zod schemas own domain and boundary contracts; TypeScript types should be inferred from those schemas where practical.
- L5 components must not recreate schema enums, route strings, product constants, provider lists, context bucket defaults, or public dataset fields inline.
- Local component constants are allowed only when they are pure presentation copy/data and do not mirror schemas, routes, config, ports, or domain contracts.
- Local interfaces are allowed for component props or route context. API/domain payload types should be schema-inferred or derived with `Pick<>`/`Omit<>` from L0 contracts.
- Tests should import canonical field lists and constants unless the test is explicitly asserting the canonical list itself.
- Docs should describe the same owners used in code and should not introduce alternate field names or route paths.
- L5 pages should use `src/components/ui/*` primitives for repeated layout and surface patterns before adding raw class combinations inline.

Change procedure:

1. Update the owner module first.
2. Export inferred types, builders, labels, or derived helpers from the owner or the nearest L3 application module.
3. Replace local mirrors in UI, API routes, repositories, tests, and docs.
4. Run `pnpm verify` before merging or deploying.

## Proposed Source Layout

```text
src/
  app/                         # L4/L5 Next.js App Router entrypoints
    api/                       # L4 Route Handlers
    about/                     # L5 founder/about page
    assessment/                 # L5 assessment page
    science/                    # L5 science/methodology page
    dataset/                    # L5 dataset dashboard and dictionary pages
    ai-analysis/                # L5 BYOK AI analysis page
    results/[token]/            # L5 private report page
    how-i-built-this/           # L5 public AI-assisted build-story page
  config/                       # product constants and route builders
  components/                  # L5 reusable UI components
  features/
    assessment/
      schemas/                 # L0 Zod schemas and inferred types
      ports/                   # L0/L3 port interfaces
      application/             # L3 model, scoring, export, reliability, AI prompts
      adapters/
        mongo/                 # L1 MongoDB implementation
      components/              # L5 feature-specific UI
      tests/                   # focused feature tests
  lib/
    env/                       # server/client env parsing
    mongo/                     # shared Mongo client factory
    api/                        # response helpers
    build/                      # git/build timeline helpers
    security/                   # result token helpers
```

This layout can be adjusted once the Next.js scaffold exists, but the dependency rules should remain stable.

## L0: Zod Schemas And Shared Contracts

L0 owns:

- assessment item schemas
- answer schemas
- respondent context schemas
- scoring output schemas
- public dataset row schemas
- AI output schemas
- environment variable schemas
- port interface types when they are pure domain contracts

Rules:

- Zod schemas are the runtime source of truth for external input validation.
- TypeScript types should be inferred from schemas where practical.
- L0 must not import React, Next.js, MongoDB, OpenAI SDKs, or server-only utilities.

Example files:

```text
src/features/assessment/schemas/assessment.ts
src/lib/env/server.ts
```

## L1: Database Adapters

L1 owns persistence implementation.

MongoDB responsibilities:

- connect through a server-only Mongo client utility
- implement repository ports from L3/L0
- persist assessment submissions
- query aggregate dashboard data
- generate public export rows from allowlisted fields
- enforce minimum-group thresholds in aggregation queries or immediately after aggregation

Rules:

- No UI imports.
- No business scoring logic beyond data mapping.
- No raw Mongo documents returned to public API handlers.
- No secrets in logs.
- Mongo adapter tests should use fake repositories for unit tests and optional integration tests when a test database is available.

Example files:

```text
src/lib/mongo/client.ts
src/features/assessment/adapters/mongo/assessment-submission-repository.ts
```

## L2: AI Adapters

L2 owns provider-specific AI calls.

Responsibilities:

- call OpenAI or another provider
- convert domain-safe inputs into provider requests
- request structured outputs when the UI needs predictable fields
- map provider responses back into L0 schemas
- record non-secret metadata for observability

Rules:

- Do not let UI code call provider SDKs directly for server-funded features.
- BYOK features may use client-side calls only if the PRD explicitly chooses that UX and the key is never stored.
- Prefer aggregate/export-safe data over row-level submissions.
- Validate AI outputs before rendering or persistence.
- Keep prompt templates versioned.

Example files:

```text
src/features/assessment/application/ai-analysis.ts
src/app/api/ai/analyze/route.ts
```

## L3: Orchestrators And Business Logic

L3 owns product behavior.

Responsibilities:

- consent and submission orchestration
- scoring
- result profile generation
- export eligibility decisions
- aggregate analysis rules
- minimum group threshold enforcement
- AI analysis orchestration through ports

Rules:

- Must be testable without Next.js, MongoDB, or OpenAI.
- Accept dependencies as port implementations.
- Return typed results, not framework responses.
- Do not read `process.env` directly.

Example files:

```text
src/features/assessment/application/model.ts
src/features/assessment/application/scoring.ts
src/features/assessment/application/public-dataset.ts
src/features/assessment/application/reliability.ts
src/features/assessment/application/respondent-context.ts
src/features/assessment/application/ai-analysis.ts
```

## L4: API And Server Entrypoints

L4 owns HTTP, Server Actions, and server composition.

Use Next.js App Router conventions:

- Route Handlers for public API endpoints, exports, webhooks, health checks, and non-React clients.
- Server Actions for app-owned form submissions and mutations where the UX benefits from React/Next integration.
- Server Components for server-side data loading for pages.

Responsibilities:

- parse incoming request data with L0 schemas
- compose L1/L2 adapters with L3 orchestrators
- translate domain results into HTTP responses, redirects, or action state
- set caching behavior intentionally
- ensure database and AI code run in the Node.js runtime

Example files:

```text
src/app/api/submit/route.ts
src/app/api/results/[token]/route.ts
src/app/api/dataset.csv/route.ts
src/app/api/dataset.json/route.ts
src/app/api/ai/analyze/route.ts
src/app/api/health/route.ts
```

## L5: Web Frontend

L5 owns the user experience.

Responsibilities:

- public landing/science/methodology pages
- consent flow
- assessment questionnaire UI
- results page
- dashboard and export UI
- BYOK AI analysis UI
- public "How I Built This" page covering ChatGPT 5.5, Codex, architecture, privacy, and validation boundaries

Rules:

- Client components receive data through props, Server Actions, or route calls.
- Do not import database, AI provider, or server env modules.
- Keep forms accessible and resilient.
- Keep high-risk claims out of UI copy unless the PRD explicitly approves them.
- Follow the privacy positioning: developmental, exploratory, not validated for employment decisions.

Example files:

```text
src/app/page.tsx
src/app/science/page.tsx
src/app/how-i-built-this/page.tsx
src/app/assessment/page.tsx
src/app/results/[token]/page.tsx
src/features/assessment/components/assessment-form.tsx
```

## API Surface

Current public/server endpoints:

```text
GET  /
GET  /about
GET  /science
GET  /privacy
GET  /limitations
GET  /assessment
GET  /how-i-built-this
GET  /archetypes/[slug]
GET  /results/[token]
GET  /dataset
GET  /dataset/dictionary
GET  /ai-analysis
GET  /api/docs
POST /api/submit
GET  /api/results/[token]
DELETE /api/results/[token]
GET  /api/results/[token]/experiment.ics
GET  /api/dataset.json
GET  /api/dataset.csv
GET  /api/dataset/dictionary.json
GET  /api/aggregates
GET  /api/og/[token]
GET  /api/og/archetype/[slug]
POST /api/ai/analyze
GET  /api/health
```

Prefer Server Actions for the main assessment submit flow if the app remains web-only. Prefer Route Handlers where an endpoint is public, downloadable, monitored, or useful outside the React app.

## Testing Strategy

Use Vitest as the default test runner.

Priority tests:

- L0 schema parsing and invalid input cases
- L3 scoring
- L3 consent and public export eligibility
- L3 minimum group threshold logic
- L3 AI orchestration using fake AI ports
- L1 repository mapping with mocked Mongo collections or integration tests
- L4 route/action parsing for invalid and valid payloads

Test pyramid:

```text
Most: L0/L3 pure unit tests
Some: L1 adapter and L4 entrypoint tests
Few: browser or full app workflow tests once UI exists
```

## Runtime And Deployment Rules

- Target Vercel with Next.js App Router.
- Keep MongoDB and server-funded AI calls in server-only code.
- Use Vercel Environment Variables for preview and production.
- Keep `.env` or `.env.local` local-only and ignored by git.
- Do not use Edge runtime for code that imports the MongoDB Node.js driver unless a future implementation proves compatibility.

## Implementation Sequence

1. Scaffold Next.js App Router with TypeScript.
2. Add Zod and MongoDB driver.
3. Add L0 schemas for env, respondent context, answers, scores, and public dataset rows.
4. Add L3 scoring and export eligibility with Vitest coverage.
5. Add L1 Mongo repository adapters.
6. Add L4 submit and export entrypoints.
7. Add L5 assessment and results UI.
8. Add the public `/how-i-built-this` page and link it from global navigation/footer.
9. Add L2 BYOK AI adapters and keep server-funded analysis disabled unless the PRD is updated with cost and abuse controls.

## Related Docs

- [PRD](../PRD.md)
- [Assessment Model](./assessment-model.md)
- [Assessment Science Research](./assessment-science/research.md)
- [Product Routes And API](./product-routes-and-api.md)
- [Data Architecture](./data-architecture.md)
- [Delivery And QA](./delivery-and-qa.md)

## Sources

- [Alistair Cockburn: Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js mutating data with Server Functions and Server Actions](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Next.js forms with Server Actions](https://nextjs.org/docs/app/guides/forms)
- [MongoDB Next.js integration](https://www.mongodb.com/docs/drivers/node-frameworks/next-integration/)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Zod documentation](https://zod.dev/)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
