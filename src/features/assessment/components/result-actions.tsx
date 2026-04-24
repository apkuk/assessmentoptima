"use client";

/**
 * File: src/features/assessment/components/result-actions.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-24
 * Description: Share, calendar, and delete actions for a private result report.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Copy, Share2, Trash2 } from "lucide-react";

import { appConfig } from "@/config/app";
import { apiRoutes, routes } from "@/config/routes";
import { resultManagementTokenStoragePrefix } from "@/features/assessment/application/assessment-flow";

interface ResultActionsProps {
  archetypeName: string;
  privateReportUrl: string;
  publicShareUrl: string;
  viewToken: string;
}

export function ResultActions({
  archetypeName,
  privateReportUrl,
  publicShareUrl,
  viewToken,
}: ResultActionsProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const shareCopy = `I got ${archetypeName} on ${appConfig.productName}'s ${appConfig.assessmentName}. Developmental, open-research prototype, not selection.`;

  async function copyShareText() {
    await navigator.clipboard.writeText(`${shareCopy}\n${publicShareUrl}`);
    setMessage("Archetype share copy added to clipboard.");
  }

  async function copyPrivateLink() {
    await navigator.clipboard.writeText(privateReportUrl);
    setMessage("Private result link copied.");
  }

  async function deleteResult() {
    const managementToken = window.localStorage.getItem(
      `${resultManagementTokenStoragePrefix}.${viewToken}`,
    );

    if (!managementToken) {
      setMessage(
        "Deletion is available from the browser that created this result.",
      );
      return;
    }

    const confirmed = window.confirm(
      "Delete this submission and remove it from the research dataset if present?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const response = await fetch(apiRoutes.result(viewToken), {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ managementToken }),
    });

    if (!response.ok) {
      setMessage("Deletion failed. Try again or refresh the page.");
      setIsDeleting(false);
      return;
    }

    window.localStorage.removeItem(
      `${resultManagementTokenStoragePrefix}.${viewToken}`,
    );
    router.push(routes.home);
  }

  return (
    <div className="result-actions">
      <button
        className="button-secondary"
        onClick={copyShareText}
        type="button"
      >
        <Copy size={18} aria-hidden="true" />
        Share archetype
      </button>
      <button
        className="button-secondary"
        onClick={copyPrivateLink}
        type="button"
      >
        <Copy size={18} aria-hidden="true" />
        Copy private link
      </button>
      <a
        className="button-secondary"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicShareUrl)}`}
        rel="noreferrer"
        target="_blank"
      >
        <Share2 size={18} aria-hidden="true" />
        LinkedIn
      </a>
      <a
        className="button-secondary"
        href={apiRoutes.resultExperimentIcs(viewToken)}
      >
        <CalendarPlus size={18} aria-hidden="true" />
        30-day calendar
      </a>
      <button
        className="button-ghost"
        disabled={isDeleting}
        onClick={deleteResult}
        type="button"
      >
        <Trash2 size={18} aria-hidden="true" />
        Delete my submission
      </button>
      {message ? <p className="action-message">{message}</p> : null}
    </div>
  );
}
