/**
 * File: scripts/bootstrap-mongo.ts
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: Bootstraps MongoDB collections, indexes, and schema metadata from the app's current source-of-truth contracts.
 */
import { readFileSync } from "node:fs";

import { MongoAssessmentSubmissionRepository } from "../src/features/assessment/adapters/mongo/assessment-submission-repository";
import {
  expectedItemIds,
  operatingSystemDefinitions,
  scaleKeys,
  scales,
} from "../src/features/assessment/application/model";
import {
  publicDatasetFields,
  storedAssessmentSubmissionSchema,
} from "../src/features/assessment/schemas/assessment";
import { getServerEnv } from "../src/lib/env/server";
import { getMongoClient, getMongoDb } from "../src/lib/mongo/client";

function loadLocalEnvFile(path: string) {
  try {
    const content = readFileSync(path, "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      process.env[key] ??= value.replace(/^["']|["']$/g, "");
    }
  } catch {
    // Vercel and CI provide environment variables directly; local runs use .env.
  }
}

loadLocalEnvFile(".env");

const SCHEMA_METADATA_COLLECTION = "schema_metadata";
const SUBMISSIONS_COLLECTION = "assessment_submissions";
const CURRENT_CONTRACT_KEY = "assessmentoptima.current_contract";

function removeMongoId(document: Record<string, unknown>) {
  const clone = { ...document };
  delete clone._id;
  return clone;
}

async function validateExistingSubmissions() {
  const db = await getMongoDb();
  const collection = db.collection(SUBMISSIONS_COLLECTION);
  const cursor = collection.find({}).limit(100);
  let checkedCount = 0;

  for await (const document of cursor) {
    checkedCount += 1;
    storedAssessmentSubmissionSchema.parse(removeMongoId(document));
  }

  return checkedCount;
}

async function writeSchemaMetadata() {
  const env = getServerEnv();
  const db = await getMongoDb();
  const now = new Date();
  const metadata = {
    key: CURRENT_CONTRACT_KEY,
    assessmentVersion: env.ASSESSMENT_VERSION,
    consentVersion: env.CONSENT_VERSION,
    scaleKeys,
    scaleNames: Object.fromEntries(
      scaleKeys.map((scaleKey) => [scaleKey, scales[scaleKey].name]),
    ),
    operatingSystems: Object.values(operatingSystemDefinitions).map(
      (system) => ({
        key: system.key,
        name: system.name,
        scaleKeys: system.scaleKeys,
      }),
    ),
    expectedItemIds,
    publicDatasetFields,
    updatedAt: now,
  };

  const collection = db.collection(SCHEMA_METADATA_COLLECTION);
  await collection.createIndex({ key: 1 }, { unique: true });
  await collection.updateOne(
    { key: CURRENT_CONTRACT_KEY },
    {
      $set: metadata,
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
}

async function main() {
  const env = getServerEnv();
  const client = await getMongoClient();
  const db = await getMongoDb();
  const repository = new MongoAssessmentSubmissionRepository();

  await db.command({ ping: 1 });
  await repository.ensureIndexes();
  const checkedCount = await validateExistingSubmissions();
  await writeSchemaMetadata();

  console.info(
    JSON.stringify(
      {
        ok: true,
        database: env.MONGODB_DB,
        assessmentVersion: env.ASSESSMENT_VERSION,
        consentVersion: env.CONSENT_VERSION,
        collections: [SUBMISSIONS_COLLECTION, SCHEMA_METADATA_COLLECTION],
        checkedSubmissionDocuments: checkedCount,
      },
      null,
      2,
    ),
  );

  await client.close();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
