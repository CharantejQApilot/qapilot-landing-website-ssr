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

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HomeHeroExploreStage({
  children,
}: HomeHeroExploreStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<PanelId>("landing");
  const [autoPlay, setAutoPlay] = useState(true);
  const [inView, setInView] = useState(false);
  const [timerArmed, setTimerArmed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(false);
    setTimerArmed(false);
  }, []);

  const goToLanding = useCallback(() => {
    setPanel("landing");
  }, []);

  const goToSecondary = useCallback(() => {
    setPanel("secondary");
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
    if (!autoPlay || reducedMotion) return;

    let engageBound = false;
    const onPointerDown = () => {
      if (!engageBound) return;
      stopAutoPlay();
    };

    const grace = window.setTimeout(() => {
      engageBound = true;
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
    }, 150);

    return () => {
      window.clearTimeout(grace);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [autoPlay, reducedMotion, stopAutoPlay]);

  useEffect(() => {
    if (reducedMotion || !autoPlay || !inView) {
      setTimerArmed(false);
      return;
    }

    setTimerArmed(true);
    const timer = window.setTimeout(() => {
      setPanel((current) => (current === "landing" ? "secondary" : "landing"));
    }, HOME_HERO_EXPLORE_IDLE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [panel, autoPlay, inView, reducedMotion]);

  const showLanding = panel === "landing";
  const showSecondary = panel === "secondary";

  useEffect(() => {
    const notify = () => {
      window.dispatchEvent(new Event("home-hero-layout"));
    };
    notify();
    // After opacity settle. Overlays stay hidden until placed with final geometry
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
        {!reducedMotion && autoPlay && timerArmed && (
          <div
            key={panel}
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
            onClick={() => {
              stopAutoPlay();
              goToLanding();
            }}
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
            onClick={() => {
              stopAutoPlay();
              goToSecondary();
            }}
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
