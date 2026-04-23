/**
 * File: src/features/assessment/ports/submission-repository.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Hexagonal repository port for persisted assessment submissions.
 */
import type { StoredAssessmentSubmission } from "../schemas/assessment";

export interface AssessmentSubmissionRepository {
  ensureIndexes(): Promise<void>;
  save(submission: StoredAssessmentSubmission): Promise<void>;
  findByTokenHash(
    tokenHash: string,
  ): Promise<StoredAssessmentSubmission | null>;
  listPublicDatasetEligible(): Promise<StoredAssessmentSubmission[]>;
  deleteByTokenHash(tokenHash: string): Promise<boolean>;
}
