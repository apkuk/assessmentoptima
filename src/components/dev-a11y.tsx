"use client";

/**
 * File: src/components/dev-a11y.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Development-only axe-core React accessibility checks for browser console QA.
 */
import { useEffect } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

export function DevA11y() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    let active = true;

    void import("@axe-core/react").then((axe) => {
      if (active) {
        void axe.default(React, ReactDOM, 1000);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
