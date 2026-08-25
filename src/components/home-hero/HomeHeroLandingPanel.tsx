"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import HomeHeroProductHuntBadge from "@/components/home-hero/HomeHeroProductHuntBadge";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const HOME_HERO_PRODUCT_LINKS = [
  { label: "CoWork", href: PATHS.COWORK },
  { label: "Flutter Testing", href: PATHS.FOR_FLUTTER },
  { label: "Dual Device Testing", href: PATHS.DUAL_DEVICE_TESTING },
  { label: "Release Readiness Suite", href: PATHS.RELEASE_READINESS_SUITE },
] as const;

const LG_MIN = "(min-width: 1024px)";

type HomeHeroLandingPanelProps = {
  /** When false, overlays stay hidden (avoids flash with stale coords). */
  active?: boolean;
};

/**
 * Slide 1 content.
 * Mobile: document-flow stack (badge → headline → capsules) to avoid overlap.
 * Desktop (lg+): badge + capsules are absolutely placed in the midpoints of the
 * empty bands (menu → headline, headline → slider).
 */
export default function HomeHeroLandingPanel({ active = true }: HomeHeroLandingPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  /** H1 + compare link — used for capsule placement so the link never overlaps pills. */
  const headlineBandRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const capsulesRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const headlineBand = headlineBandRef.current;
    const badge = badgeRef.current;
    const capsules = capsulesRef.current;
    if (!root || !headlineBand || !badge || !capsules) return;

    const placeTops = () => {
      // Mobile uses in-flow layout; clear any leftover absolute tops.
      if (!window.matchMedia(LG_MIN).matches) {
        badge.style.top = "";
        capsules.style.top = "";
        return true;
      }

      const siteHeader = document.querySelector("[data-site-header]");
      const slider = document.querySelector("[data-hero-slider]");
      if (!siteHeader || !slider) return false;

      const rootTop = root.getBoundingClientRect().top;
      const menuBottom = siteHeader.getBoundingClientRect().bottom;
      const bandBox = headlineBand.getBoundingClientRect();
      const sliderTop = slider.getBoundingClientRect().top;

      badge.style.top = `${Math.max(0, (menuBottom + bandBox.top) / 2 - rootTop - badge.offsetHeight / 2)}px`;
      // Midpoint between the full headline band (H1 + link) and the slider — not H1 alone.
      capsules.style.top = `${Math.max(0, (bandBox.bottom + sliderTop) / 2 - rootTop - capsules.offsetHeight / 2)}px`;
      return true;
    };

    if (!active) {
      setReady(false);
      return;
    }

    if (placeTops()) setReady(true);

    const onLayout = () => {
      if (placeTops()) setReady(true);
    };
    const rafPlace = () => requestAnimationFrame(onLayout);

    const ro = new ResizeObserver(rafPlace);
    ro.observe(root);
    ro.observe(headlineBand);
    ro.observe(badge);
    ro.observe(capsules);

    const mq = window.matchMedia(LG_MIN);
    mq.addEventListener("change", rafPlace);
    window.addEventListener("resize", rafPlace);
    window.addEventListener("scroll", rafPlace, { passive: true });
    window.addEventListener("home-hero-layout", rafPlace);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(rafPlace);
    }

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", rafPlace);
      window.removeEventListener("resize", rafPlace);
      window.removeEventListener("scroll", rafPlace);
      window.removeEventListener("home-hero-layout", rafPlace);
    };
  }, [active]);

  // Mobile is always visible in-flow; desktop waits for measured placement.
  const showDesktopOverlays = active && ready;

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-full min-w-0 flex-col items-start justify-center gap-5 sm:gap-6 lg:block lg:gap-0"
    >
      <div
        ref={badgeRef}
        className={cn(
          "z-[2] flex w-full justify-start",
          "relative shrink-0",
          "lg:absolute lg:inset-x-0 lg:top-0",
          !showDesktopOverlays && "lg:invisible",
        )}
      >
        <HomeHeroProductHuntBadge className="shrink-0 self-start" />
      </div>

      <div className="flex w-full min-w-0 flex-col items-start lg:h-full lg:items-center lg:justify-start">
        <div className="flex w-full min-w-0 flex-col items-start gap-0 lg:h-full lg:justify-center lg:gap-8">
          {/* Desktop-only spacer so the headline stays vertically centered under the absolute badge */}
          <div className="invisible hidden shrink-0 lg:block" aria-hidden>
            <HomeHeroProductHuntBadge />
          </div>
          <div ref={headlineBandRef} className="w-full min-w-0">
            <h1
              data-home-hero-band-headline
              className={cn(
                marketingHeroH1Class,
                "mb-0 w-full text-left sm:mb-0",
                "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
              )}
            >
              <span className="flex flex-col items-start gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:gap-y-4">
                <span className="flex flex-col items-start gap-y-2 px-1 leading-[inherit] sm:gap-y-2.5 md:block md:whitespace-nowrap">
                  <span className="block md:inline">Mobile-First</span>
                  <span className="hidden md:inline"> </span>
                  <span className="block md:inline">Businesses Need</span>
                </span>
                <span className="flex flex-col items-start gap-y-2 px-1 leading-[inherit] text-hero-here sm:gap-y-2.5 md:block md:whitespace-nowrap">
                  <span className="block md:inline">Mobile-First</span>
                  <span className="hidden md:inline"> </span>
                  <span className="block md:inline">App Testing</span>
                </span>
              </span>
            </h1>
            <p className="mt-3 px-1 text-sm text-muted-foreground md:mt-4 md:text-base">
              <Link
                href={PATHS.COMPARE_WEB_FIRST}
                className="font-medium text-primary underline-offset-4 transition-opacity hover:opacity-90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See why mobile-first beats web-first testing tools
              </Link>
            </p>
          </div>
        </div>
      </div>

      <nav
        ref={capsulesRef}
        className={cn(
          "z-[2] flex w-full justify-start",
          "relative shrink-0",
          "lg:absolute lg:inset-x-0",
          !showDesktopOverlays && "lg:invisible",
        )}
        aria-label="Product highlights"
      >
        <ul className="flex max-w-full flex-wrap items-center justify-start gap-2 sm:gap-2.5">
          {HOME_HERO_PRODUCT_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border border-border/80 bg-background/80",
                  "px-3.5 py-1.5 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur-sm",
                  "transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "sm:px-4 sm:py-2 sm:text-[15px]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
