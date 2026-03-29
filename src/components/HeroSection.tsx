"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, LayoutGrid } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ROLLING_WORDS = ["Intelligent", "Autonomous", "Continuous", "Here"];
const ROLL_WORD_MS = 2600;
const HERE_HOLD_MS = 5200; /* twice as long as other rolling words */
const EXIT_DURATION_MS = 300;
const ENTER_DURATION_MS = 300;
const IS_HERE_INDEX = 3;

type HeroPhase = "rolling" | "exiting" | "entering";

const HERO_METRICS = [
  {
    value: "Zero Touch",
    description: "Sanity testing",
    icon: Zap,
  },
  {
    value: "5×",
    description: "More Coverage/ Effort",
    icon: TrendingUp,
  },
  {
    value: "100%",
    description: "Visibility",
    icon: LayoutGrid,
  },
];

const HeroSection = () => {
  const { openForm } = useHubSpotForm();
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("rolling");

  useEffect(() => {
    if (phase === "rolling") {
      if (wordIndex < IS_HERE_INDEX) {
        const t = setTimeout(() => setWordIndex((i) => i + 1), ROLL_WORD_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("exiting"), HERE_HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === "exiting") {
      const t = setTimeout(() => {
        setWordIndex(0);
        setPhase("entering");
      }, EXIT_DURATION_MS);
      return () => clearTimeout(t);
    }
    if (phase === "entering") {
      const t = setTimeout(() => setPhase("rolling"), ENTER_DURATION_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, wordIndex]);

  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Hero"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center px-1 sm:px-0">
          <h1 className="font-heading font-semibold tracking-[-0.02em] text-foreground mb-5 sm:mb-6 md:mb-8 leading-[1.12] text-[2.5rem] sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:text-7xl lg:leading-[1.06] xl:text-7xl 2xl:text-8xl 2xl:leading-[1.05]">
            <div
              className={
                phase === "exiting"
                  ? "hero-headline-exit"
                  : phase === "entering"
                    ? "hero-headline-enter"
                    : undefined
              }
            >
              {/* Strictly two lines at every breakpoint: line 1 = static phrase, line 2 = rolling word */}
              <span className="flex flex-col flex-nowrap items-center gap-y-2 sm:gap-y-2.5 md:gap-y-3">
                <span className="block w-full whitespace-nowrap text-center leading-[inherit]">
                  The Future Of Quality Is
                </span>
                <span className="relative inline-block shrink-0" aria-live="polite" aria-atomic="true">
                  <span
                    key={
                      phase === "rolling"
                        ? wordIndex
                        : phase === "entering"
                          ? "intelligent"
                          : "here"
                    }
                    className={`inline-block ${phase === "entering" ? "" : "animate-hero-word"} ${wordIndex === IS_HERE_INDEX ? "text-hero-here" : "text-primary"}`}
                  >
                    {ROLLING_WORDS[wordIndex]}
                  </span>
                  {wordIndex === IS_HERE_INDEX && (
                    <svg
                      className="hero-here-underline"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="hero-underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(205 70% 48%)" />
                        </linearGradient>
                      </defs>
                      <path pathLength="1" d="M 0 14 Q 50 6 100 14" strokeWidth="2.6" />
                    </svg>
                  )}
                </span>
              </span>
            </div>
          </h1>

          <p className={cn(marketingHeroLeadClass, "mx-auto max-w-3xl mb-8 sm:mb-10 md:mb-11")}>
            Mobile app release readiness — without the QE bottleneck.
          </p>

          <div className="mb-12 sm:mb-14 md:mb-16">
            <Button
              onClick={() => openForm()}
              size="lg"
              className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 font-semibold rounded-xl px-10 py-7 text-lg sm:px-12 sm:py-7 sm:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl transition-shadow"
            >
              Get Access
            </Button>
          </div>

          <div
            className="w-full max-w-2xl border-t border-border/80 pt-12 sm:max-w-3xl sm:pt-14 md:pt-16"
            aria-label="Key outcomes"
          >
            <div className="grid grid-cols-1 gap-10 sm:hidden">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.value} className="flex flex-col items-center gap-3 text-center">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1.5 text-base leading-snug text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden sm:mx-auto sm:grid sm:w-full sm:max-w-3xl sm:grid-cols-3 sm:grid-rows-[auto_auto] sm:gap-x-8 sm:gap-y-1 md:gap-x-12">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.value}
                    className="grid min-w-0 grid-cols-[auto_1fr] grid-rows-subgrid row-span-2 gap-x-3 gap-y-1"
                  >
                    <div className="row-span-2 flex items-start justify-center pt-0.5">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10 md:h-12 md:w-12"
                        aria-hidden
                      >
                        <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
                      </span>
                    </div>
                    <p className="col-start-2 row-start-1 self-start text-left font-heading text-2xl font-semibold leading-none tracking-tight text-foreground md:text-3xl">
                      {metric.value}
                    </p>
                    <p className="col-start-2 row-start-2 self-start text-left text-sm leading-snug text-muted-foreground md:text-base">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
