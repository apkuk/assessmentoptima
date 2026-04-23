# Draft Proof Point: ChatGPT 5.5 + Codex 5.5 Build Sprint

## Core Observation

The most interesting thing about this build has not just been that ChatGPT 5.5 is faster. It is that it appears to work less linearly.

With previous models, if I asked for A, B, C, D, and E, the execution often felt like A -> B -> C -> D -> E. Competent, but sequential.

This felt different.

The model still completed the obvious tasks, but it also seemed to notice adjacent dependencies earlier: "If we are doing C, then F and G probably matter; if we are doing privacy, then dataset export, consent copy, deletion, public thresholds, and BYOK key handling all need to line up; if this is going on LinkedIn, then OG cards, share surfaces, build receipts, and the public story matter too."

That is the proof point for me: not just raw speed, but task awareness across the whole system.

## What Actually Happened

The brief was deliberately ambitious:

- create a Hogan-inspired, but original, work-style assessment;
- ground it in behavioural science rather than quiz theatre;
- keep it clearly developmental and not for high-stakes employment use;
- make it GDPR/privacy-aware;
- let people complete the assessment and get a result report;
- store consented submissions in MongoDB;
- expose an anonymised public dataset;
- allow people to download the data;
- allow BYOK AI analysis without burning platform API budget;
- explain the science and the limitations publicly;
- include a "How I Built This" page because the build process is the point.

The ChatGPT 5.5 Pro research/PRD phase produced the research-backed methodology and build brief in 47 minutes.

Codex then used that context to build the actual app locally: Next.js App Router, strict TypeScript, pnpm, Vitest, MongoDB Atlas, Zod schemas, scoring logic, public routes, API routes, result pages, dataset export, dynamic OG cards, delete-by-token, BYOK AI analysis, rate limiting, and a public build-story page.

## The Thing That Felt Different

The speed was obvious. It felt roughly twice as fast as the last model class I had used for this kind of work.

But the bigger difference was the way it connected tasks.

Examples:

- I asked for documentation and architecture, and it pushed the project toward a schema-first L0 model so Zod contracts became the single source of truth.
- I asked for privacy-aware open data, and it connected consent, Mongo storage, public export allowlists, monthly timestamp rounding, small-cell suppression, result-token hashing, and no raw PII.
- I asked for a "How I Built This" page, and it turned that into a build-log discipline, timestamped milestones, and a public case-study route.
- I shared UX feedback from Claude Code, and Codex did not just debate it. It implemented the high-ROI pieces: dynamic archetype OG images, radar charts, "you vs dataset" percentile badges, reliability snapshot, prompt transparency, API docs, deletion, calendar export, and rate limiting.
- I pushed on DRY/SSoT, and it moved route strings, product constants, model defaults, context field metadata, and schema-like values into the right shared modules.

That is the behaviour I care about: it was not waiting to be spoon-fed every adjacent implication.

## Current Build Receipts

The local v0 now includes:

- public landing page;
- science/methodology page;
- privacy and limitations pages;
- 54-item WorkStyle Compass assessment;
- consent and optional context capture;
- private results report;
- archetype, nine scale scores, radar chart, strengths, development edges, pressure flags, reflection prompts, and 30-day experiment;
- dynamic LinkedIn/social OG image per result;
- share actions and LinkedIn share link;
- "you vs dataset" percentile badges when public thresholds are met;
- MongoDB persistence;
- CSV and JSON public dataset exports;
- data dictionary;
- small-cell suppression;
- provisional Cronbach's alpha reliability snapshot;
- BYOK OpenAI/Anthropic analysis route and UI;
- prompt transparency and example AI output;
- AI route rate limiting;
- delete-by-token endpoint and UI;
- 30-day calendar export;
- public API docs;
- "How I Built This" page with git-derived build receipts and AI-human accountability.

The app passes:

```text
pnpm verify
pnpm build
```

And the build log records the main milestones:

- 47 minutes: ChatGPT 5.5 Pro created the research-backed PRD/methodology handoff.
- 21:21 BST: documentation and repo setup completed.
- 21:40 BST: first full Next.js v0 build passed locally.
- 21:49 BST: shareability and credibility slice implemented.
- 21:51 BST: global visual foundation tightened.
- 21:59 BST: DRY/SSoT consolidation completed.

## Caveat

This is not a validated psychometric product. It is a research-informed developmental prototype.

That matters. The site says that clearly. No hiring, promotion, redundancy, diagnosis, compensation, or high-stakes employment decisions.

But as a proof point for what a frontier model plus Codex can do with a serious product brief, the result is hard to ignore.

The output was not "a chatbot wrote some code."

It was closer to an AI-assisted product team moving through research, architecture, privacy, UX, data, AI, testing, and build-story execution at sprint speed.
