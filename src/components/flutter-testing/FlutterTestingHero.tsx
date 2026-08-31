"use client";

import { FlutterHeroLeadForm } from "@/components/flutter-testing/FlutterHeroLeadForm";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
  marketingHeroFormCardClass,
  marketingHeroFormInnerClass,
} from "@/lib/forms/marketing-form-classes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function FlutterTestingHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas"
      aria-label="Flutter testing"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-28 2xl:py-32">
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:gap-y-0",
            "xl:gap-x-14 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-16",
          )}
        >
          <div className="flex min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-2 xl:pr-4">
            <HomeEyebrow>Platform · Flutter</HomeEyebrow>
            <h1
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8",
              )}
            >
              Flutter Testing That{" "}
              <span className="text-primary">Actually Works</span>
            </h1>
            <p
              className={cn(
                "mt-0 max-w-2xl text-left text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed",
                "lg:max-w-xl xl:max-w-2xl",
              )}
            >
              Flutter apps break traditional automation in ways web-first tools
              were never built to handle. QApilot brings reliable Flutter test
              automation with context switching across Flutter, native, and
              webviews, AI-assisted element discovery, and lower-maintenance
              execution built for modern mobile teams.
            </p>
            <p
              className={cn(
                "mt-5 max-w-2xl border-t border-border/50 pt-5 text-left text-sm font-medium leading-relaxed text-muted-foreground sm:text-base",
                "lg:mt-6 lg:max-w-xl lg:border-border/40 lg:pt-6 xl:max-w-2xl",
              )}
            >
              Built for teams shipping complex Flutter apps across real devices,
              real user journeys, and real release cycles.
            </p>
          </div>

          <div
            id="flutter-demo"
            className="min-w-0 w-full scroll-mt-28 lg:pl-2 xl:pl-4"
          >
            <div className={marketingHeroFormCardClass}>
              <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>
                  Test Your Flutter App on QApilot
                </h2>
                <p className={marketingFormIntroClass}>
                  Share a few details. We&apos;ll show you a tailored
                  walkthrough.
                </p>
              </div>
              <div className={marketingHeroFormInnerClass}>
                <FlutterHeroLeadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
