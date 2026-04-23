/**
 * File: src/lib/build/git-timeline.ts
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Reads local git history for the public build timeline when available.
 */
import { execFileSync } from "node:child_process";

export interface GitTimelineEntry {
  hash: string;
  committedAt: string;
  subject: string;
}

export function getGitTimeline(maxCount = 8): GitTimelineEntry[] {
  try {
    const output = execFileSync(
      "git",
      ["log", `--max-count=${maxCount}`, "--pretty=format:%h%x09%cI%x09%s"],
      { encoding: "utf8" },
    );

    return output
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash = "", committedAt = "", subject = ""] = line.split("\t");
        return { hash, committedAt, subject };
      });
  } catch {
    return [];
  }
}

export function getWorkingTreeSummary(): string {
  try {
    const output = execFileSync("git", ["status", "--short"], {
      encoding: "utf8",
    });
    const count = output.split("\n").filter(Boolean).length;

    return count === 0
      ? "Working tree clean."
      : `${count} changed paths in the active local sprint before the next commit.`;
  } catch {
    return "Git metadata unavailable in this runtime.";
  }
}
