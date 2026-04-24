/**
 * File: src/features/assessment/adapters/mongo/assessment-submission-repository.ts
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: MongoDB implementation of the assessment submission repository port.
 */
import type { Collection, IndexDescription, WithId } from "mongodb";

import { getMongoDb } from "@/lib/mongo/client";

import {
  storedAssessmentSubmissionSchema,
  type StoredAssessmentSubmission,
} from "../../schemas/assessment";
import type { AssessmentSubmissionRepository } from "../../ports/submission-repository";

const COLLECTION_NAME = "assessment_submissions";
const TOKEN_INDEX_OPTIONS = { unique: true } as const;
const PUBLIC_SHARE_INDEX_OPTIONS = { unique: true, sparse: true } as const;

function sameIndexKey(
  current: IndexDescription["key"],
  expected: Record<string, 1 | -1>,
): boolean {
  const currentKeyCount =
    current instanceof Map ? current.size : Object.keys(current).length;
  const expectedEntries = Object.entries(expected);
  const directionFor = (key: string) =>
    current instanceof Map ? current.get(key) : current[key];

  return (
    currentKeyCount === expectedEntries.length &&
    expectedEntries.every(([key, direction]) => directionFor(key) === direction)
  );
}

function hasCompatibleIndex(
  indexes: IndexDescription[],
  key: Record<string, 1 | -1>,
  options: { unique?: boolean; sparse?: boolean } = {},
): boolean {
  return indexes.some((index) => {
    const matchesKey = sameIndexKey(index.key, key);
    const matchesUnique =
      options.unique === undefined || Boolean(index.unique) === options.unique;
    const matchesSparse =
      options.sparse === undefined || Boolean(index.sparse) === options.sparse;

    return matchesKey && matchesUnique && matchesSparse;
  });
}

async function createIndexIfMissing(
  collection: Collection<StoredAssessmentSubmission>,
  indexes: IndexDescription[],
  key: Record<string, 1 | -1>,
  options: { unique?: boolean; sparse?: boolean } = {},
): Promise<void> {
  if (hasCompatibleIndex(indexes, key, options)) {
    return;
  }

  await collection.createIndex(key, options);
}

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
    const indexes = await collection.indexes();

    await Promise.all([
      createIndexIfMissing(
        collection,
        indexes,
        { viewTokenHash: 1 },
        TOKEN_INDEX_OPTIONS,
      ),
      createIndexIfMissing(
        collection,
        indexes,
        { managementTokenHash: 1 },
        TOKEN_INDEX_OPTIONS,
      ),
      createIndexIfMissing(
        collection,
        indexes,
        { publicShareId: 1 },
        PUBLIC_SHARE_INDEX_OPTIONS,
      ),
      createIndexIfMissing(
        collection,
        indexes,
        { publicRowId: 1 },
        TOKEN_INDEX_OPTIONS,
      ),
      createIndexIfMissing(collection, indexes, {
        publicDatasetEligible: 1,
        createdMonth: 1,
      }),
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
    const document = await collection.findOne({ viewTokenHash });

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
      viewTokenHash: input.viewTokenHash,
      managementTokenHash: input.managementTokenHash,
    });

    return result.deletedCount === 1;
  }
}

export function createAssessmentSubmissionRepository(): AssessmentSubmissionRepository {
  return new MongoAssessmentSubmissionRepository();
}
