"use client";

/**
 * File: src/app/error.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Global branded error boundary for recoverable App Router failures.
 */
import { useEffect } from "react";
import Link from "next/link";

import { routes } from "@/config/routes";
import { logger } from "@/lib/observability/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error({
      event: "app.error_boundary",
      requestId: error.digest,
      message: error.message,
      error,
    });
  }, [error]);

  return (
    <main className="page">
      <section className="section">
        <div className="error-panel" role="alert">
          <p className="panel-label">Something went wrong</p>
          <h1>That page could not finish loading</h1>
          <p>
            Try again, or head back to the assessment while the page recovers.
            {error.digest ? ` Reference: ${error.digest}.` : ""}
          </p>
          <div className="action-row">
            <button className="button" onClick={reset} type="button">
              Try again
            </button>
            <Link className="button-secondary" href={routes.home}>
              Go home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
