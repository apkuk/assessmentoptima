"use client";

/**
 * File: src/app/model/archetype-dialog-grid.tsx
 * Created: 2026-04-24
 * Updated: 2026-04-24
 * Description: In-page archetype card grid with accessible modal details for the model explainer page.
 */
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/actions";
import { routes } from "@/config/routes";
import type { PublicArchetype } from "@/features/assessment/application/scoring";

export function ArchetypeDialogGrid({
  archetypes,
}: {
  archetypes: readonly PublicArchetype[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeArchetype = archetypes.find(
    (archetype) => archetype.id === activeId,
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (activeArchetype && !dialog.open) {
      dialog.showModal();
    }

    if (!activeArchetype && dialog.open) {
      dialog.close();
    }
  }, [activeArchetype]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleClose = () => setActiveId(null);
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <>
      <div className="archetype-grid">
        {archetypes.map((archetype) => (
          <button
            className="archetype-card"
            key={archetype.id}
            onClick={() => setActiveId(archetype.id)}
            type="button"
          >
            <h3>{archetype.name}</h3>
            <p>{archetype.summary}</p>
            <span className="archetype-card__cue">
              View summary <ArrowRight aria-hidden="true" size={16} />
            </span>
          </button>
        ))}
      </div>

      <dialog
        aria-labelledby={
          activeArchetype
            ? `archetype-dialog-title-${activeArchetype.id}`
            : undefined
        }
        className="archetype-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setActiveId(null);
          }
        }}
        ref={dialogRef}
      >
        {activeArchetype ? (
          <div className="archetype-dialog__panel">
            <div className="archetype-dialog__head">
              <div>
                <p className="panel-label">Archetype summary</p>
                <h3 id={`archetype-dialog-title-${activeArchetype.id}`}>
                  {activeArchetype.name}
                </h3>
              </div>
              <button
                aria-label="Close archetype summary"
                className="icon-button"
                onClick={() => setActiveId(null)}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <p className="archetype-dialog__summary">
              {activeArchetype.summary}
            </p>
            <div className="archetype-dialog__notes">
              <div>
                <h4>How to read it</h4>
                <p>
                  Treat this as a shorthand for your most visible current work
                  pattern. It is not a fixed personality type, diagnosis, or
                  employment recommendation.
                </p>
              </div>
              <div>
                <h4>What the full report adds</h4>
                <p>
                  Domain scores, Work Operating System summaries, pressure-drift
                  prompts, and a practical 30-day experiment.
                </p>
              </div>
            </div>
            <div className="action-row">
              <ButtonLink href={routes.assessment}>
                Start assessment <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <button
                className="button-secondary"
                onClick={() => setActiveId(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
