/**
 * File: src/components/site-header.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Global navigation and brand lockup for the public app shell.
 */
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link
        className="brand-lockup"
        href={routes.home}
        aria-label={`${appConfig.productName} home`}
      >
        <BrandMark priority />
        <span>
          <span className="brand-name">{appConfig.productName}</span>
          <span className="brand-line">Open work-style research</span>
        </span>
      </Link>

      <div className="header-actions">
        <SiteNav />
        <ThemeToggle />
      </div>
    </header>
  );
}
