"use client";

import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function AutonomousTestingHero() {
  const { openForm } = useHubSpotForm();

  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Autonomous testing for mobile"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-1 text-center sm:px-0">
          <h1
            className={cn(
              "mb-5 font-heading font-semibold leading-[1.12] tracking-[-0.02em] text-foreground sm:mb-6 md:mb-8",
              "text-[2.5rem] sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:text-7xl lg:leading-[1.06] xl:text-7xl 2xl:text-8xl 2xl:leading-[1.05]",
            )}
          >
            <span className="flex flex-col flex-nowrap items-center gap-y-2 sm:gap-y-2.5 md:gap-y-3">
              <span className="block w-full text-balance leading-[inherit]">
                <span className="text-primary">Autonomous</span> Testing
              </span>
              <span className="block w-full text-balance leading-[inherit]">
                for <span className="text-primary">Mobile Applications</span>
              </span>
            </span>
          </h1>

          <p className={cn(marketingHeroLeadClass, "mx-auto mb-8 max-w-3xl text-balance sm:mb-10 md:mb-11")}>
            QApilot moves testing beyond scripts, record-and-playback, and AI assistance. It explores your app,
            builds coverage across real user journeys, and continuously adapts as the app evolves — creating a
            faster path to release readiness.
          </p>

          <div className="mb-2 sm:mb-4">
            <Button
              type="button"
              onClick={() => openForm()}
              size="lg"
              className="rounded-xl bg-primary px-10 py-7 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 sm:px-12 sm:py-7 sm:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
