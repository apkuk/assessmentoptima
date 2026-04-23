# Environment Variables

Local secrets belong in `.env.local`. Production and preview secrets belong in Vercel Environment Variables.

Do not commit real credentials, API keys, database passwords, connection strings, or provider tokens.

## Variables

| Name | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes, once persistence is implemented | MongoDB Atlas connection string for assessment responses, scores, and aggregate data. |
| `OPENAI_API_KEY` | No | Server-side OpenAI key for curated or admin-gated AI features. Public BYOK analysis should not require this. |

## Notes

- Prefer least-privilege database users for deployed environments.
- Use separate credentials for local development, preview deployments, and production.
- Rotate any credential that has appeared in chat, logs, screenshots, or committed history.
- Do not log secrets or full connection strings.
