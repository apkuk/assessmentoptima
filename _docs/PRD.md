# AssessmentOptima PRD

Status: Consolidated v0 product requirements.

Product brand: **AssessmentOptima**

Assessment instrument: **WorkStyle Compass**

Public product name: **AssessmentOptima**

Deployment target: **Vercel**

Package manager: **pnpm**

Primary database: **MongoDB Atlas**

## Product Summary

AssessmentOptima is a public, research-informed work-style assessment platform. It lets users complete the WorkStyle Compass assessment instrument, receive a developmental report, contribute anonymised score-level data to an open dataset, explore aggregate insights, and optionally run bring-your-own-key AI synthesis on the public dataset.

The product must look credible, polished, and calm: more like a modern behavioural science lab than a personality quiz or generic HR SaaS app.

Core positioning:

> WorkStyle Compass is a developmental, research-informed assessment for self-reflection and open research. It is not validated for hiring, promotion, diagnosis, redundancy, compensation, or other high-stakes decisions.

## Launch Narrative

This project is also a public AI-assisted build case study.

- Ask 1: ChatGPT 5.5 Pro creates the behavioural-science research basis and Codex-ready PRD/research handoff in 47 minutes.
- Ask 2: Codex 5.5 uses the PRD and master docs to build and launch the site on Vercel.
- Target: stand up a strong v0 in about two hours from the AI-assisted workflow.

The public site must include a `/how-i-built-this` page that tells this story accurately. The 47-minute timing refers to the research/PRD document phase, not the full deployed application.

## Master Docs

- [Application Architecture](./master-docs/application-architecture.md): hexagonal L0-L5 structure, dependency rules, Next.js/Vercel boundaries, and implementation sequence.
- [Data Architecture](./master-docs/data-architecture.md): MongoDB collections, validation, public export rules, privacy constraints, and AI data handling.
- [Brand Guidelines](./master-docs/brand-guidelines.md): visual identity, CSS tokens, typography, accessibility, chart palette, layout rules, and global CSS direction.
- [Assessment Model](./master-docs/assessment-model.md): nine scales, 54-item bank, scoring, pressure flags, composites, archetypes, and report interpretation.
- [Product Routes And API](./master-docs/product-routes-and-api.md): public pages, API routes, request/response contracts, and page-level requirements.
- [Privacy And Open Data](./master-docs/privacy-and-open-data.md): consent, context fields, anonymised exports, suppression, legal copy, and dataset licence.
- [AI Analysis](./master-docs/ai-analysis.md): BYOK analysis flow, prompt guardrails, provider handling, and security requirements.
- [Delivery And QA](./master-docs/delivery-and-qa.md): build order, tests, manual QA, deployment, README requirements, and roadmap.
- [How I Built This](./master-docs/how-i-built-this.md): required public AI-assisted build-story page.

## Research Inputs

- [Research Notes](./research.md): behavioural-science research basis and source material.
- [Starting Thoughts](../StartingThoughts.md): initial product framing and v0 direction.

## Current Stack Decisions

Use the stack already established in this repository unless a later PRD revision explicitly changes it:

| Area | Decision |
| --- | --- |
| App framework | Next.js App Router |
| Language | TypeScript, strict mode |
| Package manager | pnpm |
| Runtime | Node.js on Vercel functions |
| Database | MongoDB Atlas |
| Validation | Zod at boundaries and domain contracts |
| Styling | Tailwind CSS v4 plus global AssessmentOptima tokens |
| Testing | Vitest 4 |
| Charts | Recharts or accessible HTML/CSS charts |
| Icons | Lucide React |
| AI | BYOK-first OpenAI/Anthropic-compatible analysis |

The original proposed PRD referenced Yarn, Neon Postgres, Drizzle, and Vitest 3.2. Those are superseded by current project decisions: pnpm, MongoDB Atlas, and Vitest 4.

## V0 Scope

In scope:

- Public Next.js/Vercel website.
- Premium, responsive UI following the brand guidelines.
- Public pages:
  - landing;
  - science/methodology;
  - privacy/data;
  - limitations;
  - open dataset;
  - dataset dictionary;
  - API docs;
  - AI analysis;
  - how I built this.
- Assessment flow:
  - intro;
  - consent;
  - optional context capture;
  - 54 questionnaire items;
  - review and submit;
  - results report.
- Server-side scoring and persistence.
- MongoDB storage for consented submissions.
- Public aggregate dashboard.
- Dataset export endpoints:
  - CSV;
  - JSON;
  - data dictionary.
- Dynamic archetype Open Graph cards for shareable results.
- Delete-by-token result deletion.
- 30-day experiment calendar export.
- Provisional reliability snapshot on the public dataset page.
- BYOK AI synthesis:
  - user provides OpenAI or Anthropic key;
  - key is used only for that request;
  - key is never stored.
- Tests for scoring, consent, export eligibility, anonymised export, and suppression.
- Vercel deployment readiness.

Out of scope for v0:

- authentication;
- admin dashboard;
- organisation accounts;
- email capture;
- payment;
- PDF generation;
- psychometric norming;
- candidate selection workflow;
- team or organisation benchmarking;
- raw item-level public exports;
- free-text response collection;
- server-funded public LLM analysis;
- user profile accounts;
- legal/privacy policy drafted by counsel.

## Success Criteria

The build is successful when:

1. A user can complete the assessment end-to-end on desktop and mobile.
2. A user receives a results page with an archetype, nine scale scores, strengths, development edges, pressure-risk flags, interpretation guidance, and a 30-day experiment.
3. A consented respondent creates a MongoDB submission document.
4. Non-consented public dataset submissions are excluded from public exports.
5. The dataset page shows aggregate results and handles no-data state.
6. CSV and JSON export endpoints work.
7. Public exports do not include PII, exact timestamps, IP addresses, user agents, emails, names, employer names, exact job titles, free text, or API keys.
8. Filtered visualisations suppress results where `n < PUBLIC_DATASET_MIN_N`.
9. BYOK AI analysis does not store, log, or expose the user key.
10. `/how-i-built-this` explains the ChatGPT 5.5 Pro and Codex 5.5 workflow accurately.
11. `pnpm verify` passes.
12. `pnpm build` passes.
13. The app is deployable to Vercel with documented environment variables.

## Required Routes

Public routes:

```text
/
/science
/privacy
/limitations
/assessment
/results/[token]
/dataset
/dataset/dictionary
/ai-analysis
/how-i-built-this
/api/docs
```

API routes:

```text
POST /api/submit
GET  /api/results/[token]
DELETE /api/results/[token]
GET  /api/results/[token]/experiment.ics
GET  /api/aggregates
GET  /api/dataset.csv
GET  /api/dataset.json
GET  /api/dataset/dictionary.json
GET  /api/og/[token]
POST /api/ai/analyze
GET  /api/health
```

See [Product Routes And API](./master-docs/product-routes-and-api.md) for page-level requirements and API contracts.

## Use Boundaries

Every core public page should include or link to the use boundary:

> WorkStyle Compass is a developmental research assessment. It is not validated for hiring, promotion, diagnosis, redundancy, compensation, or employment decisions.

The product must not claim:

- clinical validity;
- selection validity;
- job-performance prediction;
- normative percentiles;
- validated archetypes;
- completed adverse-impact review;
- validated AI-generated conclusions.

## Implementation Priorities

Build in this order:

1. Keep the existing pnpm/Next/TypeScript/Tailwind/Vitest baseline stable.
2. Add Zod schemas and domain contracts.
3. Implement the assessment model and scoring with tests.
4. Implement consent and public export eligibility rules with tests.
5. Add MongoDB connection and repository adapters.
6. Build assessment flow and results page.
7. Build dataset exports and aggregate dashboard.
8. Add BYOK AI analysis.
9. Add science, privacy, limitations, and how-I-built-this pages.
10. Polish responsive UI against the brand guidelines.
11. Run `pnpm verify` and `pnpm build`.

See [Delivery And QA](./master-docs/delivery-and-qa.md) for the detailed build order, QA checklist, and deployment requirements.
