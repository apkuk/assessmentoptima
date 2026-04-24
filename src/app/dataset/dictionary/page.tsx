/**
 * File: src/app/dataset/dictionary/page.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Human-readable public dataset data dictionary page.
 */
import type { Metadata } from "next";

import { dataDictionary } from "@/features/assessment/application/public-dataset";

export const metadata: Metadata = {
  title: "Data Dictionary",
};

export default function DataDictionaryPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Dataset schema</p>
        <h1 className="page-title">Data dictionary</h1>
        <p className="lede">
          The v0 public dataset exposes anonymised score-level rows only.
          Respondent context fields are held back from row-level export until
          sample size and disclosure controls support safer release.
        </p>
      </section>

      <section className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            {dataDictionary.map((field) => (
              <tr key={field.field}>
                <td className="mono">{field.field}</td>
                <td>{field.description}</td>
                <td>{field.public ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
