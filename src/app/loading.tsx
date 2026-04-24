/**
 * File: src/app/loading.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Global branded loading fallback for App Router route transitions.
 */
export default function Loading() {
  return (
    <main className="page" aria-busy="true" aria-live="polite">
      <section className="section">
        <div className="loading-panel">
          <span className="brand-mark" aria-hidden="true">
            AO
          </span>
          <div>
            <p className="panel-label">Loading</p>
            <div className="loading-line" />
            <div className="loading-line" data-short="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
