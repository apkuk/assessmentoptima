# AssessmentOptima

Public work-style assessment prototype built with Next.js, strict TypeScript,
MongoDB Atlas, Vitest, and Vercel.

## Local Setup

```bash
pnpm install
pnpm dev
```

Local app:

```text
http://localhost:3000
```

## Environment

Copy `.env.example` to `.env` and provide:

- `MONGODB_URI`
- `MONGODB_DB`
- `HASH_SECRET` for stable production result-token hashing
- `NEXT_PUBLIC_APP_URL`
- optional provider keys for controlled server-side use

Public BYOK AI analysis does not store visitor API keys.

## Scripts

```bash
pnpm dev
pnpm verify
pnpm build
pnpm start
```

`pnpm verify` runs strict TypeScript, ESLint, Prettier check, and Vitest.

## Project Docs

The source-of-truth documentation lives in `_docs/`:

- `_docs/PRD.md`
- `_docs/master_backlog.md`
- `_docs/master-docs/`
- `_docs/research.md`

The public product name is **AssessmentOptima**. The v0 instrument name is
**WorkStyle Compass**.
