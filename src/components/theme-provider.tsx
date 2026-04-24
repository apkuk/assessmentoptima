"use client";

/**
 * File: src/components/theme-provider.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Client theme provider wrapper for system, light, and dark UI themes.
 */
import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
