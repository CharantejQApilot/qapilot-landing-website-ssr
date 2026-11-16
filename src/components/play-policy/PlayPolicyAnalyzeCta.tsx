"use client";

import { useCallback, useState } from "react";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import { PlayPolicyAnalyzeDialog } from "@/components/play-policy/PlayPolicyAnalyzeDialog";
import { Button } from "@/components/ui/button";
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
      <Button
        type="button"
        onClick={() => setAnalyzeOpen(true)}
        className="h-12 px-6 text-base font-semibold sm:h-14 sm:px-7"
      >
        Analyze your app
      </Button>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
