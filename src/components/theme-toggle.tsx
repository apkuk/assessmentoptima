"use client";

/**
 * File: src/components/theme-toggle.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Header control for switching between light, dark, and system themes.
 */
import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themeOrder = ["system", "light", "dark"] as const;

function subscribeMounted(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);

  return () => undefined;
}

function getClientMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

function nextTheme(currentTheme: string | undefined) {
  const currentIndex = themeOrder.findIndex((theme) => theme === currentTheme);
  return themeOrder[(currentIndex + 1) % themeOrder.length] ?? "system";
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );
  const activeTheme = mounted ? (theme ?? "system") : "system";
  const Icon =
    activeTheme === "dark" ||
    (activeTheme === "system" && resolvedTheme === "dark")
      ? Moon
      : activeTheme === "light"
        ? Sun
        : Monitor;

  return (
    <button
      aria-label={`Switch theme. Current setting: ${activeTheme}.`}
      className="theme-toggle"
      onClick={() => setTheme(nextTheme(activeTheme))}
      type="button"
    >
      <Icon aria-hidden="true" size={16} strokeWidth={2.1} />
      <span>{activeTheme}</span>
    </button>
  );
}
