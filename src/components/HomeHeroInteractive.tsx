"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ROLLING_WORDS = ["Intelligent", "Autonomous", "Continuous", "Here"];
const ROLL_WORD_MS = 2600;
const HERE_HOLD_MS = 5200;
const EXIT_DURATION_MS = 300;
const ENTER_DURATION_MS = 300;
const IS_HERE_INDEX = 3;

type HeroPhase = "rolling" | "exiting" | "entering";

export default function HomeHeroInteractive() {
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
    <>
      <h1
        className={cn(
          marketingHeroH1Class,
          "mb-5 sm:mb-6 md:mb-8",
          "max-lg:text-[clamp(1.1rem,0.85rem+2.65vw,3.45rem)] max-lg:leading-[1.1]",
        )}
      >
        <div
          className={
            phase === "exiting"
              ? "hero-headline-exit"
              : phase === "entering"
                ? "hero-headline-enter"
                : undefined
          }
        >
          <span className="flex flex-col flex-nowrap items-center gap-y-2 sm:gap-y-2.5 md:gap-y-3">
            <span className="block w-full text-center leading-[inherit] whitespace-nowrap px-1">
              The Future Of Quality Is
            </span>
            <span className="relative inline-block shrink-0 whitespace-nowrap" aria-live="polite" aria-atomic="true">
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
          type="button"
          onClick={() => openForm()}
          size="lg"
          className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 font-semibold rounded-xl px-8 py-5 text-base sm:px-10 sm:py-7 sm:text-lg md:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl transition-shadow"
        >
          Book a Demo
        </Button>
      </div>
    </>
  );
}
