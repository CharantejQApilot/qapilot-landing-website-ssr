"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Zap, TrendingUp, LayoutGrid, CheckCircle2, Sparkles } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";

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
    description: "More Coverage/QA",
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
      // wordIndex === IS_HERE_INDEX: show "Here" + underline, then exit
      const t = setTimeout(() => setPhase("exiting"), HERE_HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === "exiting") {
      const t = setTimeout(() => {
        setWordIndex(0); // reappear with "Intelligent"
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
      className="relative min-h-screen flex flex-col justify-center section-edge w-full overflow-x-hidden overflow-y-visible lg:h-screen lg:overflow-hidden"
      aria-label="Hero"
    >
      <MarketingBackground variant="hero" />

      {/* Content: 40% left (text), 60% right (GIF) on large screens */}
      <div className="relative z-10 w-full section-full py-10 sm:py-14 md:py-16 lg:py-24 2xl:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 sm:gap-10 lg:gap-14 xl:gap-16 2xl:gap-20 items-center lg:items-stretch min-h-0 lg:min-h-[70vh]">
          {/* Left column (40%): headline, tagline, CTAs, metrics */}
          <div className="flex flex-col items-start text-left order-1 justify-center">
            <h1 className="font-heading font-medium tracking-tight text-foreground mb-3 sm:mb-5 md:mb-6 leading-[1.35] text-[2.0625rem] sm:text-[2.625rem] md:text-[2.625rem] lg:text-[3.375rem] xl:text-[4.125rem] 2xl:text-[5.25rem]">
              <div
                className={
                  phase === "exiting"
                    ? "hero-headline-exit"
                    : phase === "entering"
                      ? "hero-headline-enter"
                      : undefined
                }
              >
                <span className="block">The Future Of Quality Is</span>
                <span
                  className="block mt-1.5 sm:mt-2.5 relative inline-block"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span
                    key={phase === "rolling" ? wordIndex : phase === "entering" ? "intelligent" : "here"}
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
                      <path pathLength="1" d="M 0 14 Q 50 6 100 14" strokeWidth="2.2" />
                    </svg>
                  )}
                </span>
              </div>
            </h1>

            <p className="text-base md:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl">
              Mobile app release readiness — without the QA bottleneck.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-14 lg:mb-16">
              <Button
                onClick={() => openForm()}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-lg text-base 2xl:text-lg 2xl:px-10 2xl:py-7 w-full sm:w-auto"
              >
                Get Access
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted font-medium px-8 py-6 rounded-lg text-base 2xl:text-lg 2xl:px-10 2xl:py-7 w-full sm:w-auto"
                onClick={() => {
                  const videoSection = document.querySelector(
                    '[data-section="video"]'
                  );
                  videoSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play size={18} className="mr-2" aria-hidden />
                Watch Demo
              </Button>
            </div>

            {/* Metrics: icon + value on one line, description below */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full max-w-xl">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.value} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 min-h-[2.75rem]">
                      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0" aria-hidden>
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </span>
                      <span className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug pl-[3.25rem]">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column (60%): product demo GIF with labels and subtle decorations */}
          <div className="flex items-center justify-center lg:justify-end order-2 min-h-[320px] lg:min-h-0 lg:self-stretch">
            <div className="relative w-full h-full min-h-[320px] lg:min-h-[65vh] rounded-2xl flex items-center justify-center">
              {/* Labels on the GIF */}
              <span className="absolute top-4 left-4 z-20 font-heading text-sm font-semibold text-foreground/90 tracking-wide bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                Autonomous Testing
              </span>
              <span className="absolute bottom-4 right-4 z-20 font-heading text-sm font-semibold text-foreground/90 tracking-wide bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                In Action
              </span>

              {/* Subtle floating icons around the GIF */}
              <span className="absolute top-12 right-8 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary animate-float" aria-hidden style={{ animationDelay: '0s' }}>
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <span className="absolute top-1/3 left-6 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary animate-float" aria-hidden style={{ animationDelay: '0.8s' }}>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="absolute bottom-1/3 right-6 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary animate-float" aria-hidden style={{ animationDelay: '0.4s' }}>
                <Zap className="w-3.5 h-3.5" />
              </span>
              <span className="absolute bottom-12 left-10 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary animate-float" aria-hidden style={{ animationDelay: '1.2s' }}>
                <Play className="w-4 h-4" />
              </span>

              {/* Small decorative dots / SVG */}
              <svg className="absolute top-8 right-16 w-2 h-2 text-primary/40 animate-pulse" aria-hidden fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="2" />
              </svg>
              <svg className="absolute bottom-16 left-12 w-2.5 h-2.5 text-primary/30 animate-pulse" aria-hidden fill="currentColor" viewBox="0 0 10 10" style={{ animationDelay: '0.5s' }}>
                <circle cx="5" cy="5" r="2.5" />
              </svg>

              <img
                src="/Landing%20Website%20Gif%20QApilot.gif"
                alt="QApilot crawler and testing interface"
                className="w-full h-full object-contain object-center relative z-0"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
