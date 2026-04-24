/**
 * File: src/app/not-found.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Branded 404 fallback for unknown routes and missing share/result resources.
 */
import Link from "next/link";

import { routes } from "@/config/routes";

export default function NotFoundPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="error-panel">
          <p className="panel-label">Not found</p>
          <h1>That page is not available</h1>
          <p>
            The link may be wrong, expired, or deliberately unavailable because
            private reports and open-data exports are protected.
          </p>
          <div className="action-row">
            <Link className="button" href={routes.assessment}>
              Take the assessment
            </Link>
            <Link className="button-secondary" href={routes.home}>
              Go home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
