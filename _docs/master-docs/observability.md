# Observability And Error Handling

Status: Implementation-current master reference for logging, error responses, and dev-console diagnostics.

## Goals

The product needs enough production-grade observability to support public testing without exposing secrets or respondent data. The v0 standard is:

- every API failure returns a consistent JSON shape;
- every handled server failure is logged as a structured event;
- client-side API failures are logged to the browser console with the same request reference;
- logs redact secrets, tokens, provider keys, credentials, cookies, and connection strings;
- user-facing errors stay calm and actionable.

## Source Of Truth

- Error response schema: `apiErrorResponseSchema` in `src/features/assessment/schemas/assessment.ts`.
- API response helper: `src/lib/api/responses.ts`.
- API error classifier: `src/lib/api/route-errors.ts`.
- Shared logger/redactor: `src/lib/observability/logger.ts`.
- Client API error parser/logger: `src/lib/api/client-errors.ts`.
- Global React error boundary: `src/app/error.tsx`.

## API Error Shape

All API errors should follow this shape:

```json
{
  "error": "Database connection unavailable.",
  "code": "DATABASE_UNAVAILABLE",
  "detail": "Development-only detail when safe.",
  "requestId": "ao_...",
  "retryable": true
}
```

`requestId` is the value the user can share from the browser console or API response. Server logs include the same ID so debugging can connect client reports to route logs.

## Codes

Use stable, uppercase error codes:

- `VALIDATION_ERROR`
- `ASSESSMENT_SCORING_ERROR`
- `DATABASE_CONFIGURATION_ERROR`
- `DATABASE_UNAVAILABLE`
- `SMALL_CELL_SUPPRESSED`
- `RATE_LIMITED`
- `AI_ANALYSIS_DISABLED`
- `NOT_FOUND`
- `INTERNAL_ERROR`

Add a new code only when a caller, test, or user-facing workflow needs to distinguish it.

## Server Route Pattern

API route handlers should not hand-roll catch blocks. Use:

```ts
return routeFailure({
  error,
  fallbackMessage: "Assessment submission failed.",
  operation: "POST /api/submit",
  request,
  validationMessage: "Invalid assessment submission.",
});
```

For expected rejections, such as small-cell suppression or rate limits, use `routeErrorResponse`.

## Client Pattern

Client components that call API routes should:

1. parse the response body;
2. call `parseClientApiError`;
3. log the event with `logClientApiError`;
4. show `formatClientApiError` to the user.

This keeps browser-console logs shareable without printing request bodies, API keys, or raw secrets.

## Redaction Rules

The logger redacts keys matching:

```text
apiKey, authorization, bearer, cookie, connectionString, mongodb, password, secret, token, uri
```

Do not log:

- raw assessment answers;
- raw tokens;
- management tokens;
- provider API keys;
- full BYOK prompts;
- MongoDB connection strings;
- cookies or authorization headers.

## What To Share During QA

When testing locally, share:

- the browser console structured log object;
- the visible error message;
- the `requestId`;
- the route or page where it happened;
- the steps that triggered it.

Do not share `.env` values, raw tokens, provider keys, or copied request bodies that contain secrets.

## Future Upgrade Path

This system is intentionally dependency-light. If the product moves beyond prototype launch, add one observability sink behind the same logger interface, for example:

- Sentry for frontend/server exception capture;
- Vercel Log Drains for structured logs;
- OpenTelemetry if deeper tracing becomes necessary.

The application code should keep calling the shared logger and route helpers either way.
