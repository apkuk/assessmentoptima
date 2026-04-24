"use client";

/**
 * File: src/components/site-nav.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Client-side primary navigation with active-route state.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  FlaskConical,
  Sparkles,
  UserRound,
} from "lucide-react";

import { routes } from "@/config/routes";

const navItems = [
  { href: routes.assessment, label: "Assessment", icon: Activity },
  { href: routes.science, label: "Science", icon: FlaskConical },
  { href: routes.dataset, label: "Dataset", icon: BarChart3 },
  { href: routes.aiAnalysis, label: "AI analysis", icon: Sparkles },
  { href: routes.about, label: "About", icon: UserRound },
  { href: routes.howIBuiltThis, label: "Build story", icon: BookOpen },
] as const;

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className="nav-link"
            data-active={active}
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" size={16} strokeWidth={2.1} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
