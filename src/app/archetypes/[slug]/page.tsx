/**
 * File: src/app/archetypes/[slug]/page.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Public archetype share page that avoids exposing private result tokens or score profiles.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { appConfig } from "@/config/app";
import { apiRoutes, routes } from "@/config/routes";
import { publicArchetypes } from "@/features/assessment/application/scoring";

interface ArchetypePageProps {
  params: Promise<{ slug: string }>;
}

function findArchetype(slug: string) {
  return publicArchetypes.find((archetype) => archetype.id === slug);
}

export function generateStaticParams() {
  return publicArchetypes.map((archetype) => ({ slug: archetype.id }));
}

export async function generateMetadata({
  params,
}: ArchetypePageProps): Promise<Metadata> {
  const { slug } = await params;
  const archetype = findArchetype(slug);

  if (!archetype) {
    return { title: "Archetype | AssessmentOptima" };
  }

  const title = `${archetype.name} | ${appConfig.productName}`;

  return {
    title,
    description: `${archetype.summary} A public ${appConfig.assessmentName} archetype summary.`,
    openGraph: {
      title,
      description: archetype.summary,
      url: routes.archetype(archetype.id),
      images: [
        {
          url: new URL(
            apiRoutes.archetypeOg(archetype.id),
            process.env.NEXT_PUBLIC_APP_URL ?? appConfig.defaultAppUrl,
          ).toString(),
          width: appConfig.socialImageSize.width,
          height: appConfig.socialImageSize.height,
          alt: title,
        },
      ],
    },
  };
}

export default async function ArchetypePage({ params }: ArchetypePageProps) {
  const { slug } = await params;
  const archetype = findArchetype(slug);

  if (!archetype) {
    notFound();
  }

  return (
    <main className="page">
      <section className="report-hero">
        <div>
          <p className="eyebrow">Public archetype</p>
          <h1 className="page-title">{archetype.name}</h1>
          <p className="lede">{archetype.summary}</p>
        </div>
        <aside className="archetype-panel">
          <p className="panel-label">Share-safe summary</p>
          <p>
            This page shows only an archetype-level description. It does not
            expose private result tokens, respondent context, detailed scores,
            or deletion credentials.
          </p>
          <Link className="button" href={routes.assessment}>
            Take the assessment
          </Link>
        </aside>
      </section>

      <section className="content-grid section">
        <div className="panel">
          <h2>What this means</h2>
          <p>
            WorkStyle Compass archetypes are shorthand for a person&apos;s most
            visible current work-style pattern. They are developmental prompts,
            not fixed types, diagnoses, or selection recommendations.
          </p>
        </div>
        <div className="panel">
          <h2>How to read it</h2>
          <p>
            A full private report includes scale scores, pressure risks, and a
            30-day experiment. Public share pages intentionally stay at the
            archetype level to keep respondent data private.
          </p>
        </div>
      </section>
    </main>
  );
}
