/**
 * File: src/components/site-header.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Global navigation and brand lockup for the public app shell.
 */
import Link from "next/link";
import {
  Activity,
  BarChart3,
  BookOpen,
  FlaskConical,
  Sparkles,
} from "lucide-react";

import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

const navItems = [
  { href: routes.assessment, label: "Assessment", icon: Activity },
  { href: routes.science, label: "Science", icon: FlaskConical },
  { href: routes.dataset, label: "Dataset", icon: BarChart3 },
  { href: routes.aiAnalysis, label: "AI analysis", icon: Sparkles },
  { href: routes.howIBuiltThis, label: "Build story", icon: BookOpen },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link
        className="brand-lockup"
        href={routes.home}
        aria-label={`${appConfig.productName} home`}
      >
        <span className="brand-mark" aria-hidden="true">
          AO
        </span>
        <span>
          <span className="brand-name">{appConfig.productName}</span>
          <span className="brand-line">Open work-style research</span>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} className="nav-link" href={item.href}>
              <Icon aria-hidden="true" size={16} strokeWidth={2.1} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
