/**
 * File: src/lib/observability/logger.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared structured logging helpers with redaction for server and browser diagnostics.
 */
type LogLevel = "debug" | "info" | "warn" | "error";

type LogValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | LogValue[]
  | { [key: string]: LogValue };

export interface LogEvent {
  event: string;
  level?: LogLevel;
  requestId?: string | undefined;
  route?: string | undefined;
  method?: string | undefined;
  status?: number | undefined;
  code?: string | undefined;
  message?: string | undefined;
  error?: unknown;
  context?: Record<string, unknown> | undefined;
}

const sensitiveKeyPattern =
  /(api[-_]?key|authorization|bearer|cookie|connection[-_]?string|mongodb|password|secret|token|uri)/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function createRequestId(prefix = "ao"): string {
  const random =
    globalThis.crypto && "randomUUID" in globalThis.crypto
      ? globalThis.crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${random}`;
}

function serializeError(error: unknown): Record<string, LogValue> | undefined {
  if (!(error instanceof Error)) {
    return undefined;
  }

  return {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  };
}

export function redactForLog(value: unknown, depth = 0): LogValue {
  if (depth > 6) {
    return "[MaxDepth]";
  }

  if (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Error) {
    return serializeError(value) ?? value.message;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => redactForLog(entry, depth + 1));
  }

  if (!isRecord(value)) {
    return String(value);
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      sensitiveKeyPattern.test(key)
        ? "[REDACTED]"
        : redactForLog(entry, depth + 1),
    ]),
  );
}

function payload(input: LogEvent, level: LogLevel): Record<string, LogValue> {
  return {
    level,
    event: input.event,
    requestId: input.requestId,
    route: input.route,
    method: input.method,
    status: input.status,
    code: input.code,
    message: input.message,
    error: input.error ? redactForLog(input.error) : undefined,
    context: input.context ? redactForLog(input.context) : undefined,
    at: new Date().toISOString(),
  };
}

function write(level: LogLevel, input: LogEvent): void {
  const line = payload(input, level);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  if (level === "debug") {
    console.debug(line);
    return;
  }

  console.info(line);
}

export const logger = {
  debug: (input: LogEvent) => write("debug", input),
  info: (input: LogEvent) => write("info", input),
  warn: (input: LogEvent) => write("warn", input),
  error: (input: LogEvent) => write("error", input),
};
