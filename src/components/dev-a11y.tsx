"use client";

/**
 * File: src/components/dev-a11y.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Development-only axe-core accessibility checks for browser console QA.
 */
import { useEffect } from "react";

export function DevA11y() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    let active = true;
    const timeoutId = window.setTimeout(() => {
      void import("axe-core").then(async ({ default: axe }) => {
        if (!active) {
          return;
        }

        const results = await axe.run(document, {
          resultTypes: ["violations"],
        });

        if (results.violations.length === 0) {
          return;
        }

        console.groupCollapsed(
          `[axe] ${results.violations.length} accessibility issue(s) found`,
        );
        for (const violation of results.violations) {
          console.warn(violation.help, {
            id: violation.id,
            impact: violation.impact,
            helpUrl: violation.helpUrl,
            nodes: violation.nodes.map((node) => node.target),
          });
        }
        console.groupEnd();
      });
    }, 1000);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
