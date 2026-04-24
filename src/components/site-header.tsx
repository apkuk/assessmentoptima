/**
 * File: src/components/site-header.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Global navigation and brand lockup for the public app shell.
 */
import Link from "next/link";

import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";

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

      <div className="header-actions">
        <ThemeToggle />
        <SiteNav />
      </div>
    </header>
  );
}
