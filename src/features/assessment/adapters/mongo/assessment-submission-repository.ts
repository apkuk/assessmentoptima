/**
 * File: src/features/assessment/adapters/mongo/assessment-submission-repository.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: MongoDB implementation of the assessment submission repository port.
 */
import type { Collection, WithId } from "mongodb";

import { getMongoDb } from "@/lib/mongo/client";

import {
  storedAssessmentSubmissionSchema,
  type StoredAssessmentSubmission,
} from "../../schemas/assessment";
import type { AssessmentSubmissionRepository } from "../../ports/submission-repository";

const COLLECTION_NAME = "assessment_submissions";

function stripMongoId(
  document: WithId<StoredAssessmentSubmission>,
): StoredAssessmentSubmission {
  const submission: Partial<WithId<StoredAssessmentSubmission>> = {
    ...document,
  };
  delete submission._id;

  return storedAssessmentSubmissionSchema.parse(submission);
}

export class MongoAssessmentSubmissionRepository implements AssessmentSubmissionRepository {
  private collectionPromise: Promise<Collection<StoredAssessmentSubmission>>;

  constructor() {
    this.collectionPromise = getMongoDb().then((db) =>
      db.collection<StoredAssessmentSubmission>(COLLECTION_NAME),
    );
  }

  private async collection(): Promise<Collection<StoredAssessmentSubmission>> {
    return this.collectionPromise;
  }

  async ensureIndexes(): Promise<void> {
    const collection = await this.collection();

    await Promise.all([
      collection.createIndex({ tokenHash: 1 }, { unique: true }),
      collection.createIndex(
        { viewTokenHash: 1 },
        { unique: true, sparse: true },
      ),
      collection.createIndex(
        { managementTokenHash: 1 },
        { unique: true, sparse: true },
      ),
      collection.createIndex(
        { publicShareId: 1 },
        { unique: true, sparse: true },
      ),
      collection.createIndex({ publicRowId: 1 }, { unique: true }),
      collection.createIndex({ publicDatasetEligible: 1, createdMonth: 1 }),
    ]);
  }

  async save(submission: StoredAssessmentSubmission): Promise<void> {
    const collection = await this.collection();
    const parsed = storedAssessmentSubmissionSchema.parse(submission);

    await this.ensureIndexes();
    await collection.insertOne(parsed);
  }

  async findByViewTokenHash(
    viewTokenHash: string,
  ): Promise<StoredAssessmentSubmission | null> {
    const collection = await this.collection();
    const document = await collection.findOne({
      $or: [{ viewTokenHash }, { tokenHash: viewTokenHash }],
    });

    return document ? stripMongoId(document) : null;
  }

  async listPublicDatasetEligible(): Promise<StoredAssessmentSubmission[]> {
    const collection = await this.collection();
    const documents = await collection
      .find({ publicDatasetEligible: true, "consent.publicDataset": true })
      .sort({ createdAt: 1 })
      .toArray();

    return documents.map(stripMongoId);
  }

  async deleteByManagementTokenHash(input: {
    viewTokenHash: string;
    managementTokenHash: string;
  }): Promise<boolean> {
    const collection = await this.collection();
    const result = await collection.deleteOne({
      $or: [
        {
          viewTokenHash: input.viewTokenHash,
          managementTokenHash: input.managementTokenHash,
        },
        {
          tokenHash: input.viewTokenHash,
          managementTokenHash: input.managementTokenHash,
        },
      ],
    });

    return result.deletedCount === 1;
  }
}

export function createAssessmentSubmissionRepository(): AssessmentSubmissionRepository {
  return new MongoAssessmentSubmissionRepository();
}
