/**
 * File: src/config/app.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Product-level constants shared across environment, routes, UI, and exports.
 */
export const appConfig = {
  productName: "AssessmentOptima",
  productSlug: "assessmentoptima",
  assessmentName: "WorkStyle Compass",
  defaultAppUrl: "http://localhost:3000",
  defaultDatabaseName: "assessmentoptima",
  defaultAssessmentVersion: "wsc-v1.0",
  defaultConsentVersion: "consent-v1.0",
  localDevelopmentHashSecret: "assessmentoptima-local-development-token-secret",
  publicDatasetFilename: "assessmentoptima-public-dataset.csv",
  privacyContactEmail: "privacy@assessmentoptima.com",
  retentionPolicyPlaceholder:
    "Private report records are retained for the public prototype until deletion is requested or a formal retention schedule is published.",
  experimentCalendarFilename: "assessmentoptima-30-day-experiment.ics",
  calendarProductId: "-//AssessmentOptima//WorkStyle Compass//EN",
  datasetDoiPlaceholder: "10.0000/assessmentoptima.dataset.v0",
  socialImageSize: { width: 1200, height: 630 },
  socialImageContentType: "image/png",
  reliabilityMinRespondents: 100,
} as const;

export const citations = {
  assessment:
    "@misc{assessmentoptima2026, title={AssessmentOptima WorkStyle Compass v0}, year={2026}, note={Developmental open research prototype}}",
  methodology:
    "@misc{assessmentoptima2026, title={AssessmentOptima WorkStyle Compass v0 methodology}, year={2026}, note={Research-informed developmental prototype}}",
} as const;
