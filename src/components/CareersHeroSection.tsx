"use client";

import { Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CareersHeroSection = () => {
  const scrollToPositions = () => {
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Careers hero"
      aria-labelledby="careers-hero-title"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple={false} progressiveBlur={false} />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 sm:mb-6">
            <Users className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium text-primary">Join Our Team</span>
          </div>

          <h1
            id="careers-hero-title"
            className={cn(
              marketingHeroH1Class,
              "mb-5 w-full text-balance sm:mb-6 md:mb-8",
              "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
            )}
          >
            Help shape what <span className="text-primary">quality</span> looks like in an{" "}
            <span className="text-primary">AI-first world</span>.
          </h1>

          <p
            className={cn(
              marketingHeroLeadClass,
              "mx-auto mb-10 max-w-3xl text-balance sm:mb-11 md:mb-12 lg:max-w-4xl",
            )}
          >
            We&apos;re building the future of software quality assurance. Join a team of innovators, engineers, and
            dreamers who are redefining what&apos;s possible with AI-powered testing.
          </p>

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
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
