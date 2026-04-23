/**
 * File: src/components/page-footer.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Shared footer with use-boundary and project links.
 */
import Link from "next/link";

import { appConfig } from "@/config/app";
import { routes } from "@/config/routes";

export function PageFooter() {
  return (
    <footer className="page-footer">
      <p>
        {appConfig.productName} is a developmental research prototype, not a
        validated selection instrument.
      </p>
      <div>
        <Link href={routes.privacy}>Privacy</Link>
        <Link href={routes.limitations}>Limitations</Link>
        <Link href={routes.datasetDictionary}>Data dictionary</Link>
        <Link href={routes.apiDocs}>API docs</Link>
      </div>
    </footer>
  );
}
