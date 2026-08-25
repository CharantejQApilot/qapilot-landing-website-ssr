"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import HomeHeroDualDevicePanel from "@/components/home-hero/HomeHeroDualDevicePanel";
import { HOME_HERO_EXPLORE_IDLE_MS } from "@/lib/home-hero-explore";
import { cn } from "@/lib/utils";

type PanelId = "landing" | "secondary";

type HomeHeroExploreStageProps = {
  /** Slide 1 panel; receives `active` so overlays can place before paint. */
  children: ReactNode;
};

const TICK_MS = 50;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Two-panel hero stage. Auto-advances every {@link HOME_HERO_EXPLORE_IDLE_MS},
 * pauses only while the pointer is over the slide area (or a slide is focused),
 * and resumes when the pointer leaves — same rules as the home case-studies strip.
 */
export default function HomeHeroExploreStage({
  children,
}: HomeHeroExploreStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const [panel, setPanel] = useState<PanelId>("landing");
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const goToLanding = useCallback(() => {
    setPanel("landing");
  }, []);

  const goToSecondary = useCallback(() => {
    setPanel("secondary");
  }, []);

  const pauseAuto = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resumeAuto = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    const landing = landingRef.current;
    const secondary = secondaryRef.current;
    if (landing) landing.inert = panel !== "landing";
    if (secondary) secondary.inert = panel !== "secondary";
  }, [panel]);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [panel]);

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;

      elapsedRef.current += TICK_MS;
      const next = Math.min(1, elapsedRef.current / HOME_HERO_EXPLORE_IDLE_MS);
      setProgress(next);

      if (elapsedRef.current >= HOME_HERO_EXPLORE_IDLE_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        setPanel((current) =>
          current === "landing" ? "secondary" : "landing",
        );
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [inView, reducedMotion]);

  const showLanding = panel === "landing";
  const showSecondary = panel === "secondary";

  useEffect(() => {
    const notify = () => {
      window.dispatchEvent(new Event("home-hero-layout"));
    };
    notify();
    const t = window.setTimeout(notify, 20);
    return () => window.clearTimeout(t);
  }, [panel]);

  const landing = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child as ReactElement<{ active?: boolean }>, {
      active: showLanding,
    });
  });

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-stretch justify-center gap-3 sm:gap-4">
      <div
        ref={stageRef}
        className="relative grid w-full min-w-0"
        aria-live="polite"
        onMouseEnter={pauseAuto}
        onMouseLeave={resumeAuto}
        onFocusCapture={pauseAuto}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            resumeAuto();
          }
        }}
      >
        <div
          ref={landingRef}
          className={cn(
            // Opacity-only: transforms skew getBoundingClientRect and flash overlay placement
            "col-start-1 row-start-1 flex h-full w-full self-stretch duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:transition-opacity",
            showLanding
              ? "z-[1] opacity-100"
              : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={!showLanding}
        >
          {landing}
        </div>

        <div
          ref={secondaryRef}
          className={cn(
            // Match landing: full-stage stretch so overlay midpoints use the same band as slide 1
            "col-start-1 row-start-1 flex h-full min-h-0 w-full self-stretch duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:transition-opacity",
            showSecondary
              ? "z-[1] opacity-100"
              : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={!showSecondary}
        >
          <div className="h-full min-h-0 w-full min-w-0">
            <HomeHeroDualDevicePanel active={showSecondary} />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2.5">
        {!reducedMotion && inView && (
          <div
            className="h-0.5 w-24 overflow-hidden rounded-full bg-primary/15 sm:w-28"
            aria-hidden
          >
            <div
              className="h-full origin-left rounded-full bg-primary/40"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        )}

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Hero content"
          data-hero-slider
        >
          <button
            type="button"
            role="tab"
            aria-selected={showLanding}
            aria-label="Show headline"
            className={cn(
              "h-1.5 w-4 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              showLanding
                ? "bg-primary"
                : "bg-muted-foreground/35 hover:bg-muted-foreground/55",
            )}
            onClick={goToLanding}
          />
          <button
            type="button"
            role="tab"
            aria-selected={showSecondary}
            aria-label="Show Dual Device Testing"
            className={cn(
              "h-1.5 w-4 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              showSecondary
                ? "bg-primary"
                : "bg-muted-foreground/35 hover:bg-muted-foreground/55",
            )}
            onClick={goToSecondary}
          />
        </div>

        {reducedMotion && showLanding && (
          <button
            type="button"
            onClick={goToSecondary}
            className="rounded-sm text-sm font-medium text-primary underline decoration-primary/45 underline-offset-[0.2em] transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Dual Device Testing
          </button>
        )}
      </div>
    </div>
  );
}
