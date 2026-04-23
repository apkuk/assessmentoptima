"use client";

/**
 * File: src/features/assessment/components/result-actions.tsx
 * Created: 2026-04-23
 * Updated: 2026-04-23
 * Description: Share, calendar, and delete actions for a private result report.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Copy, Share2, Trash2 } from "lucide-react";

import { appConfig } from "@/config/app";
import { apiRoutes, routes } from "@/config/routes";

interface ResultActionsProps {
  token: string;
  archetypeName: string;
  shareUrl: string;
}

export function ResultActions({
  token,
  archetypeName,
  shareUrl,
}: ResultActionsProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const shareCopy = `I got ${archetypeName} on ${appConfig.productName}'s ${appConfig.assessmentName}. Developmental, open-research prototype, not selection.`;

  async function copyShareText() {
    await navigator.clipboard.writeText(`${shareCopy}\n${shareUrl}`);
    setMessage("Share copy added to clipboard.");
  }

  async function deleteResult() {
    const confirmed = window.confirm(
      "Delete this submission and remove it from the research dataset if present?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const response = await fetch(apiRoutes.result(token), { method: "DELETE" });

    if (!response.ok) {
      setMessage("Deletion failed. Try again or refresh the page.");
      setIsDeleting(false);
      return;
    }

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
        Share copy
      </button>
      <a
        className="button-secondary"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        rel="noreferrer"
        target="_blank"
      >
        <Share2 size={18} aria-hidden="true" />
        LinkedIn
      </a>
      <a
        className="button-secondary"
        href={apiRoutes.resultExperimentIcs(token)}
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
