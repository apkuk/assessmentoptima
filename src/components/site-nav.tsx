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
  Compass,
  FlaskConical,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { routes } from "@/config/routes";

const navItems = [
  { href: routes.assessment, label: "Assessment", icon: Activity },
  { href: routes.model, label: "Model", icon: Compass },
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
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const renderNavLinks = () =>
    navItems.map((item) => {
      const Icon = item.icon;
      const active = isActive(pathname, item.href);

      return (
        <Link
          aria-current={active ? "page" : undefined}
          className="nav-link"
          data-active={active}
          href={item.href}
          key={item.href}
          onClick={() => setOpen(false)}
        >
          <Icon aria-hidden="true" size={16} strokeWidth={2.1} />
          <span>{item.label}</span>
        </Link>
      );
    });

  return (
    <>
      <nav
        className="site-nav site-nav--desktop"
        aria-label="Primary navigation"
      >
        {renderNavLinks()}
      </nav>

      <button
        aria-haspopup="dialog"
        aria-label="Open navigation menu"
        className="nav-menu-button"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" size={18} strokeWidth={2.1} />
        <span>Menu</span>
      </button>

      <dialog
        aria-labelledby="nav-dialog-title"
        className="nav-dialog"
        ref={dialogRef}
      >
        <div className="nav-dialog__head">
          <h2 id="nav-dialog-title">Navigation</h2>
          <button
            aria-label="Close navigation menu"
            className="icon-button"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X aria-hidden="true" size={18} strokeWidth={2.1} />
          </button>
        </div>
        <nav className="site-nav-dialog" aria-label="Mobile navigation">
          {renderNavLinks()}
        </nav>
      </dialog>
    </>
  );
}
