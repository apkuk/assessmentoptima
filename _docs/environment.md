# Environment Variables

Local secrets belong in `.env.local`. Production and preview secrets belong in Vercel Environment Variables.

Do not commit real credentials, API keys, database passwords, connection strings, or provider tokens.

## Variables

| Name | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes for local/deployed persistence | MongoDB Atlas connection string for assessment responses, scores, and aggregate data. |
| `MONGODB_DB` | No | MongoDB database name. Defaults to `assessmentoptima` when unset. |
| `HASH_SECRET` | Yes in production | Secret used to hash private result tokens before persistence. Local development falls back to a non-production default from `src/config/app.ts` if unset. |
| `NEXT_PUBLIC_APP_URL` | Yes, once deployed | Public app URL for generated links and deployment metadata. |
| `ASSESSMENT_VERSION` | No | Version string for the assessment model and scoring interpretation. Defaults from `src/config/app.ts`. |
| `CONSENT_VERSION` | No | Version string for consent language. Defaults from `src/config/app.ts`. |
| `PUBLIC_DATASET_MIN_N` | Yes | Minimum group size for public aggregate display and filtered exports. |
| `AI_ANALYSIS_ENABLED` | No | Feature flag for BYOK AI analysis. |
| `AI_ANALYSIS_RATE_LIMIT` | No | Number of BYOK AI analysis requests allowed per rate window. Defaults to `8`. |
| `AI_ANALYSIS_RATE_WINDOW_SECONDS` | No | Rate-limit window in seconds. Defaults to `900`. |
| `UPSTASH_REDIS_REST_URL` | No | Optional Upstash Redis REST endpoint for durable Vercel rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | No | Optional Upstash Redis REST token for durable Vercel rate limiting. |
| `OPENAI_API_KEY` | No | Server-side OpenAI key for curated or admin-gated AI features. Public BYOK analysis should not require this. |
| `ANTHROPIC_API_KEY` | No | Server-side Anthropic key for curated or admin-gated AI features. Public BYOK analysis should not require this. |

## Notes

- Prefer least-privilege database users for deployed environments.
- Use separate credentials for local development, preview deployments, and production.
- Rotate any credential that has appeared in chat, logs, screenshots, or committed history.
- Do not log secrets or full connection strings.
- Local Vercel linkage and downloaded Vercel env files live under `.vercel/`, which is gitignored.
- Root `vercel.json` owns the deployment framework/build/install/output settings so GitHub-triggered builds do not inherit an incorrect static output directory.
- MongoDB Atlas network access must allow Vercel production functions to connect. If `/api/submit` returns `503 Database connection unavailable`, check Atlas IP/network access before changing application code.
