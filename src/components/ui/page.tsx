/**
 * File: src/components/ui/page.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared page, section, grid, and card primitives for consistent public UI surfaces.
 */
import type { ReactNode } from "react";

type SurfaceVariant = "panel" | "callout" | "report-card" | "dataset-card";
type Tone = "science" | "pressure";

function mergeClassName(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="page">{children}</main>;
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={mergeClassName("section", className)}>
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  lede,
  title,
}: {
  eyebrow: string;
  lede: string;
  title: string;
}) {
  return (
    <Section>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="lede">{lede}</p>
    </Section>
  );
}

export function ContentGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={mergeClassName("content-grid", className)}>
      {children}
    </section>
  );
}

export function Surface({
  children,
  label,
  title,
  tone,
  variant = "panel",
}: {
  children: ReactNode;
  label?: string;
  title?: string;
  tone?: Tone;
  variant?: SurfaceVariant;
}) {
  return (
    <div className={variant} data-tone={tone}>
      {label ? <p className="panel-label">{label}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  );
}

export function MetricCard({
  children,
  label,
  value,
}: {
  children: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {children}
    </div>
  );
}
