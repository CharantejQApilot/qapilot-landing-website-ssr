"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import HomeHeroIntentLanes from "@/components/home-hero/HomeHeroIntentLanes";
import { HOME_HERO_EXPLORE_IDLE_MS } from "@/lib/home-hero-explore";
import { cn } from "@/lib/utils";

type PanelId = "landing" | "explore";

type HomeHeroExploreStageProps = {
  /** Server-rendered Panel 1 (H1 + lead) for SEO. */
  children: ReactNode;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HomeHeroExploreStage({ children }: HomeHeroExploreStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<PanelId>("landing");
  const [lanesAnimateIn, setLanesAnimateIn] = useState(false);
  const [timerArmed, setTimerArmed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cancelledRef = useRef(false);
  const advancedRef = useRef(false);

  const goToExplore = useCallback((withMotion: boolean) => {
    cancelledRef.current = true;
    setTimerArmed(false);
    const alreadyOnExplore = advancedRef.current;
    advancedRef.current = true;
    setPanel("explore");
    if (!alreadyOnExplore && withMotion && !prefersReducedMotion()) {
      setLanesAnimateIn(true);
    }
  }, []);

  const goToLanding = useCallback(() => {
    advancedRef.current = false;
    setLanesAnimateIn(false);
    setPanel("landing");
  }, []);

  const cancelAutoAdvance = useCallback(() => {
    cancelledRef.current = true;
    setTimerArmed(false);
  }, []);

  useEffect(() => {
    const landing = landingRef.current;
    const explore = exploreRef.current;
    if (landing) landing.inert = panel !== "landing";
    if (explore) explore.inert = panel !== "explore";
  }, [panel]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    setReducedMotion(reduced);
    if (reduced) return;

    const stage = stageRef.current;
    if (!stage) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let inView = false;
    let engageBound = false;

    const clearIdle = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    };

    const armIdle = () => {
      clearIdle();
      if (cancelledRef.current || advancedRef.current || !inView) return;
      setTimerArmed(true);
      idleTimer = setTimeout(() => {
        if (cancelledRef.current || advancedRef.current) return;
        goToExplore(true);
      }, HOME_HERO_EXPLORE_IDLE_MS);
    };

    const onEngage = () => {
      if (!engageBound || advancedRef.current) return;
      cancelAutoAdvance();
      clearIdle();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (inView && !cancelledRef.current && !advancedRef.current) {
          armIdle();
        } else {
          clearIdle();
          setTimerArmed(false);
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(stage);

    // Ignore load/restoration scroll noise before binding engage listeners
    const grace = window.setTimeout(() => {
      engageBound = true;
      window.addEventListener("scroll", onEngage, { passive: true });
      window.addEventListener("pointerdown", onEngage, { passive: true });
      window.addEventListener("keydown", onEngage);
    }, 150);

    return () => {
      clearIdle();
      window.clearTimeout(grace);
      observer.disconnect();
      window.removeEventListener("scroll", onEngage);
      window.removeEventListener("pointerdown", onEngage);
      window.removeEventListener("keydown", onEngage);
    };
  }, [cancelAutoAdvance, goToExplore]);

  const showLanding = panel === "landing";
  const showExplore = panel === "explore";

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
      <div
        ref={stageRef}
        className="relative grid w-full min-w-0"
        aria-live="polite"
      >
        {/*
          Grid stack: both panels occupy one cell so height = max(landing, explore).
          Book a Demo / logos stay put when the stage advances.
        */}
        <div
          ref={landingRef}
          className={cn(
            "col-start-1 row-start-1 flex w-full items-center justify-center duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:transition-[opacity,transform]",
            showLanding
              ? "z-[1] translate-y-0 opacity-100"
              : "pointer-events-none z-0 opacity-0 motion-safe:-translate-y-[12%]",
          )}
          aria-hidden={!showLanding}
        >
          {children}
        </div>

        <div
          ref={exploreRef}
          className={cn(
            "col-start-1 row-start-1 flex w-full items-center justify-center duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:transition-[opacity,transform]",
            showExplore
              ? "z-[1] translate-y-0 opacity-100"
              : "pointer-events-none z-0 opacity-0 motion-safe:translate-y-[12%]",
          )}
          aria-hidden={!showExplore}
        >
          <HomeHeroIntentLanes animateIn={lanesAnimateIn && showExplore} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {!reducedMotion && showLanding && timerArmed && (
          <div
            className="h-0.5 w-24 overflow-hidden rounded-full bg-primary/15 sm:w-28"
            aria-hidden
          >
            <div
              className="h-full origin-left rounded-full bg-primary/40"
              style={{
                animation: `home-hero-timer-fill ${HOME_HERO_EXPLORE_IDLE_MS}ms linear forwards`,
              }}
            />
          </div>
        )}

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Hero content"
        >
          <button
            type="button"
            role="tab"
            aria-selected={showLanding}
            aria-label="Show headline"
            className={cn(
              "h-1.5 w-4 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              showLanding ? "bg-primary" : "bg-muted-foreground/35 hover:bg-muted-foreground/55",
            )}
            onClick={() => {
              cancelAutoAdvance();
              goToLanding();
            }}
          />
          <button
            type="button"
            role="tab"
            aria-selected={showExplore}
            aria-label="Explore your essentials for confident mobile releases"
            className={cn(
              "h-1.5 w-4 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              showExplore ? "bg-primary" : "bg-muted-foreground/35 hover:bg-muted-foreground/55",
            )}
            onClick={() => {
              cancelAutoAdvance();
              goToExplore(!reducedMotion);
            }}
          />
        </div>

        {reducedMotion && showLanding && (
          <button
            type="button"
            onClick={() => goToExplore(false)}
            className="rounded-sm text-sm font-medium text-primary underline decoration-primary/45 underline-offset-[0.2em] transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore priorities
          </button>
        )}
      </div>
    </div>
  );
}
