"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LeadMagnetEmailCapture } from "@/components/lead-magnet";
import type { CaseStudy } from "@/lib/case-studies-data";
import {
  isCaseStudiesUnlockedIncludingSession,
  markCaseStudiesUnlocked,
} from "@/lib/case-study-unlock";
import { cn } from "@/lib/utils";

type CaseStudySoftGateProps = {
  study: CaseStudy;
  /** Full article from the server — always in the HTML for crawlers. */
  children: ReactNode;
};

/**
 * Soft lead-magnet gate: article HTML is always present (SSR).
 * Locked visitors see an overlay; unlock does not re-fetch content.
 */
export function CaseStudySoftGate({ study, children }: CaseStudySoftGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUnlocked(isCaseStudiesUnlockedIncludingSession());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked || unlocked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [checked, unlocked]);

  const showGate = checked && !unlocked;

  return (
    <div className="relative">
      <div
        className={cn(
          showGate &&
            "pointer-events-none max-h-[100dvh] overflow-hidden select-none blur-[2px]",
        )}
        aria-hidden={showGate || undefined}
      >
        {children}
      </div>

      {showGate ? (
        <div
          className="fixed inset-0 z-[1200] flex items-end justify-center bg-background/70 p-4 backdrop-blur-[2px] sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`case-study-gate-title-${study.slug}`}
        >
          <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-lg sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Case studies
            </p>
            <h2
              id={`case-study-gate-title-${study.slug}`}
              className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]"
            >
              Unlock {study.clientName} case study
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Enter your work email to keep reading. One unlock opens every case
              study on this device.
            </p>
            <div className="mt-6">
              <LeadMagnetEmailCapture
                layout="stacked"
                pageName={`Case studies. Unlock. ${study.clientName}`}
                fieldId={`case-study-gate-${study.slug}`}
                title="Get instant access"
                description="One email unlocks Wio, Geml, and GrowSari stories."
                actions={[
                  {
                    id: "unlock",
                    label: "Unlock stories",
                    variant: "default",
                    hubspotActionLabel: ". Unlock",
                    onAfterCapture: () => {
                      markCaseStudiesUnlocked();
                      setUnlocked(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    },
                  },
                ]}
                successMessages={{
                  unlock: "You're in. Enjoy the full story.",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
