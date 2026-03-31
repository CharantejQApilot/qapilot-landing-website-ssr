"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HubSpotFormsEmbedFrame } from "@/components/HubSpotFormsEmbedFrame";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { cn } from "@/lib/utils";

const FLUTTER_DEMO_FORM_ID = "b1b77d10-8753-4791-93a3-23783baf8ecb";

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
          <div className="flex min-w-0 flex-col items-center text-center lg:max-w-none lg:pr-2 xl:pr-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
              Platform · Flutter
            </p>
            <h1
              className={cn(
                "w-full font-heading font-semibold tracking-[-0.02em] text-foreground",
                "mb-5 text-balance leading-[1.12] text-[2rem] sm:mb-6 sm:text-5xl sm:leading-[1.1] md:mb-8 md:text-6xl md:leading-[1.08]",
                "lg:text-7xl lg:leading-[1.06] xl:text-7xl 2xl:text-8xl 2xl:leading-[1.05]",
              )}
            >
              Flutter Testing That{" "}
              <span className="text-primary">Actually Works</span>
            </h1>
            <p
              className={cn(
                "mx-auto mt-0 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed",
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
                "mx-auto mt-5 max-w-2xl border-t border-border/50 pt-5 text-sm font-medium leading-relaxed text-muted-foreground sm:text-base",
                "lg:mt-6 lg:max-w-xl lg:border-border/40 lg:pt-6 xl:max-w-2xl",
              )}
            >
              Built for teams shipping complex Flutter apps across real devices, real user journeys,
              and real release cycles.
            </p>
            <div className="mt-8 flex justify-center sm:mt-9">
              <Button
                size="lg"
                className="rounded-xl bg-primary px-9 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/15 sm:px-10 sm:text-lg"
                asChild
              >
                <Link href="#flutter-demo">Book a Demo</Link>
              </Button>
            </div>
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
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  See QApilot on Your Flutter App
                </h2>
                <p className="max-w-prose text-sm leading-snug text-muted-foreground sm:text-[0.9375rem]">
                  Share a few details—we&apos;ll show you a tailored walkthrough.
                </p>
              </div>
              <div className="relative z-[1] min-h-0 min-w-0 flex-1 rounded-xl border border-border/40 bg-background/70 p-3 sm:p-4 md:p-5">
                <HubSpotFormsEmbedFrame
                  formId={FLUTTER_DEMO_FORM_ID}
                  className="flutter-hero-hs-frame"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
