/**
 * File: src/components/ui/actions.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Shared action row and button-link primitives for consistent navigation CTAs.
 */
import type { ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonClassByVariant = {
  primary: "button",
  secondary: "button-secondary",
  ghost: "button-ghost",
} as const satisfies Record<ButtonVariant, string>;

export function ActionRow({
  children,
  placement = "default",
}: {
  children: ReactNode;
  placement?: "default" | "hero";
}) {
  return (
    <div className={placement === "hero" ? "hero-actions" : "action-row"}>
      {children}
    </div>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
}) {
  return (
    <Link className={buttonClassByVariant[variant]} href={href}>
      {children}
    </Link>
  );
}
