/**
 * File: src/config/routes.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Canonical route and API path builders for the app.
 */
export const routes = {
  home: "/",
  assessment: "/assessment",
  science: "/science",
  privacy: "/privacy",
  limitations: "/limitations",
  dataset: "/dataset",
  datasetDictionary: "/dataset/dictionary",
  aiAnalysis: "/ai-analysis",
  howIBuiltThis: "/how-i-built-this",
  apiDocs: "/api/docs",
  archetype: (slug: string) => `/archetypes/${slug}`,
  result: (token: string) => `/results/${token}`,
} as const;

export const apiRoutes = {
  health: "/api/health",
  submit: "/api/submit",
  aggregates: "/api/aggregates",
  datasetCsv: "/api/dataset.csv",
  datasetJson: "/api/dataset.json",
  datasetDictionaryJson: "/api/dataset/dictionary.json",
  aiAnalyze: "/api/ai/analyze",
  result: (token: string) => `/api/results/${token}`,
  resultExperimentIcs: (token: string) =>
    `/api/results/${token}/experiment.ics`,
  resultOg: (token: string) => `/api/og/${token}`,
  archetypeOg: (slug: string) => `/api/og/archetype/${slug}`,
} as const;
