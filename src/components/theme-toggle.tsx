"use client";

/**
 * File: src/components/theme-toggle.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Header icon control for switching between light and dark themes.
 */
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <Icon aria-hidden="true" size={17} strokeWidth={2.1} />
    </button>
  );
}
