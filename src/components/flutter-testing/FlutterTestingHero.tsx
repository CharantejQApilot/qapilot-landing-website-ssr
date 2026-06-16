"use client";

import { FlutterHeroLeadForm } from "@/components/flutter-testing/FlutterHeroLeadForm";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
} from "@/lib/forms/marketing-form-classes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function FlutterTestingHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Flutter testing"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-28 2xl:py-32">
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:gap-y-0",
            "xl:gap-x-14 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-16",
          )}
        >
          <div className="flex min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-2 xl:pr-4">
            <p className="mb-3 w-full text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
              Platform · Flutter
            </p>
            <h1 className={cn(marketingHeroH1Class, "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8")}>
              Flutter Testing That{" "}
              <span className="text-primary">Actually Works</span>
            </h1>
            <p
              className={cn(
                "mt-0 max-w-2xl text-left text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed",
                "lg:max-w-xl xl:max-w-2xl",
              )}
            >
              Flutter apps break traditional automation in ways web-first tools were never built to
              handle. QApilot brings reliable Flutter test automation with context switching across
              Flutter, native, and webviews, AI-assisted element discovery, and lower-maintenance
              execution built for modern mobile teams.
            </p>
            <p
              className={cn(
                "mt-5 max-w-2xl border-t border-border/50 pt-5 text-left text-sm font-medium leading-relaxed text-muted-foreground sm:text-base",
                "lg:mt-6 lg:max-w-xl lg:border-border/40 lg:pt-6 xl:max-w-2xl",
              )}
            >
              Built for teams shipping complex Flutter apps across real devices, real user journeys,
              and real release cycles.
            </p>
          </div>

          <div
            id="flutter-demo"
            className="min-w-0 w-full scroll-mt-28 lg:pl-2 xl:pl-4"
          >
            <div
              className={cn(
                "relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/85 p-5 shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.25)] backdrop-blur-md",
                "sm:p-7 md:p-8",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.06] before:via-transparent before:to-transparent",
              )}
            >
              <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>
                  Test Your Flutter App on QApilot
                </h2>
                <p className={marketingFormIntroClass}>
                  Share a few details—we&apos;ll show you a tailored walkthrough.
                </p>
              </div>
              <div className="relative z-[1] min-h-0 min-w-0 flex-1 rounded-xl border border-border/40 bg-background/70 p-3 sm:p-4 md:p-5">
                <FlutterHeroLeadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
