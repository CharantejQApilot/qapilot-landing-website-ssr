"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import {
  HUBSPOT_CAREERS_FORM_ID,
  HUBSPOT_CAREERS_FORM_NAME,
} from "@/lib/constants";

const CareersHeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <MarketingThesisHero
        ariaLabel="Careers hero"
        titleId="careers-hero-title"
        eyebrow="Join Our Team"
        title={
          <>
            Help Shape What <span className="text-primary">Quality</span> Looks Like In An{" "}
            <span className="text-primary">AI-First World</span>.
          </>
        }
        lead="We're building the future of software quality assurance. Join a team of innovators, engineers, and dreamers who are redefining what's possible with AI-powered testing."
        cta={
          <Button
            type="button"
            onClick={() => setIsFormOpen(true)}
            variant="outline"
            size="lg"
            className="rounded-xl border-2 border-primary/40 bg-transparent px-8 py-6 text-base font-semibold text-foreground shadow-none transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary sm:px-10 sm:py-7 sm:text-lg"
          >
            Reach out to us
          </Button>
        }
      />

      <HubSpotFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="General application"
        description="Tell us about yourself and we'll get back to you. No open role required."
        formId={HUBSPOT_CAREERS_FORM_ID}
        formName={HUBSPOT_CAREERS_FORM_NAME}
        apiPath="/api/hubspot/careers"
      />
    </>
  );
};

export default CareersHeroSection;
