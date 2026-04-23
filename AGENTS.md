# Agent Working Guide

This project is a TypeScript-first Vercel app for a public, research-informed work-style assessment. Keep the product language disciplined: developmental, exploratory, and research-oriented. Do not present the assessment as a validated hiring, diagnosis, promotion, or employment decision tool.

## Development Defaults

- Use TypeScript everywhere and keep `strict` mode clean.
- Prefer small, named functions and explicit domain types over broad object bags.
- Keep behavior at the edges validated. When the app adds forms, API routes, server actions, or imports, use schema validation rather than trusting untyped input.
- Avoid premature framework churn. Start with Next.js App Router conventions when the app scaffold is added, because Vercel deployment is the target.
- Keep UI and domain logic separate enough that scoring, export eligibility, and privacy rules can be tested without rendering React.

## Developer Experience

- Every meaningful behavior change should be covered by a fast unit test unless the risk is genuinely trivial.
- Use `npm run verify` as the local confidence check. It runs strict typechecking and the Vitest suite.
- Keep scripts boring and predictable: `test`, `test:watch`, `typecheck`, and `verify` should continue to work throughout the project.
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
- Keep implementation notes close to the code when they explain non-obvious constraints.
- Update docs when changing public claims, privacy behavior, scoring assumptions, or deployment requirements.

## Git Hygiene

- The repository may contain user work in progress. Do not revert unrelated changes.
- Keep commits focused once git is initialized.
- Before opening a PR or deploying, run `npm run verify` and summarize any known gaps.
