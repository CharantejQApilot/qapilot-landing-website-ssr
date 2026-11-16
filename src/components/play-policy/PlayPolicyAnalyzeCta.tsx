"use client";

import { useCallback, useState } from "react";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import { PlayPolicyAnalyzeDialog } from "@/components/play-policy/PlayPolicyAnalyzeDialog";
import { PLAY_POLICY_ACCESS_ID } from "@/lib/play-policy-checker";
import { cn } from "@/lib/utils";

type PlayPolicyAnalyzeCtaProps = {
  className?: string;
};

export function PlayPolicyAnalyzeCta({ className }: PlayPolicyAnalyzeCtaProps) {
  const [analyzeOpen, setAnalyzeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = useCallback(() => {
    setAnalyzeOpen(false);
    // Let the analyze dialog unmount/close before opening HubSpot (same z-index).
    window.setTimeout(() => setContactOpen(true), 150);
  }, []);

  return (
    <div
      id={PLAY_POLICY_ACCESS_ID}
      className={cn("w-full max-w-md scroll-mt-28", className)}
    >
      <span className="qg-cta-glow">
        <span className="qg-cta-glow__spin" aria-hidden="true" />
        <button
          type="button"
          className="qg-btn qg-btn--hero"
          onClick={() => setAnalyzeOpen(true)}
        >
          Analyze your app
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </span>
      <p className="qg-cta-note">
        Android only. 5 free scans per email. Report by email in 2 to 3 hours.
      </p>

      <PlayPolicyAnalyzeDialog
        open={analyzeOpen}
        onOpenChange={setAnalyzeOpen}
        onContactUs={openContact}
      />

      <HubSpotFormDialog
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        title="Contact us"
        description="Tell us about your app and we'll get back to you shortly."
      />
    </div>
  );
}
