"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

const CareersHeroSection = () => {
  const scrollToPositions = () => {
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MarketingThesisHero
      ariaLabel="Careers hero"
      titleId="careers-hero-title"
      eyebrow="Join Our Team"
      title={
        <>
          Help shape what <span className="text-primary">quality</span> looks like in an{" "}
          <span className="text-primary">AI-first world</span>.
        </>
      }
      lead="We're building the future of software quality assurance. Join a team of innovators, engineers, and dreamers who are redefining what's possible with AI-powered testing."
      cta={
        <Button
          type="button"
          onClick={scrollToPositions}
          variant="outline"
          size="lg"
          className="group rounded-xl border-2 border-primary/40 bg-transparent px-8 py-6 text-base font-semibold text-foreground shadow-none transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary sm:px-10 sm:py-7 sm:text-lg"
        >
          <span className="inline-flex items-center gap-3">
            View Open Positions
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
              <ChevronDown className="h-5 w-5 text-primary" aria-hidden />
            </span>
          </span>
        </Button>
      }
    />
  );
};

export default CareersHeroSection;
