/**
 * File: src/components/ui/page.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared page, section, grid, and card primitives for consistent public UI surfaces.
 */
import type { ReactNode } from "react";

type SurfaceVariant = "panel" | "callout" | "report-card" | "dataset-card";
type Tone = "science" | "pressure";

export interface PageNavItem {
  href: string;
  label: string;
}

function mergeClassName(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="page">{children}</main>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={mergeClassName("section", className)} id={id}>
      {children}
    </section>
  );
}

export function PageBody({
  children,
  navItems,
}: {
  children: ReactNode;
  navItems: readonly PageNavItem[];
}) {
  return (
    <div className="page-layout">
      <nav className="page-local-nav" aria-label="On this page">
        <p>On this page</p>
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="page-layout__content">{children}</div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  lede,
  title,
}: {
  eyebrow: string;
  lede?: string;
  title: string;
}) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p>{lede}</p> : null}
    </div>
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
  prose,
  title,
  tone,
  variant = "panel",
}: {
  children: ReactNode;
  label?: string;
  prose?: boolean;
  title?: string;
  tone?: Tone;
  variant?: SurfaceVariant;
}) {
  return (
    <div
      className={mergeClassName(variant, prose ? "prose prose-ao" : undefined)}
      data-tone={tone}
    >
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
