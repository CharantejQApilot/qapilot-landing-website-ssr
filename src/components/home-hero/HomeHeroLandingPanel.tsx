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

type HomeHeroLandingPanelProps = {
  /** When false, overlays stay hidden (avoids flash with stale coords). */
  active?: boolean;
};

/**
 * Slide 1 content. Headline stays vertically centered (spacer preserves prior layout).
 * Product Hunt + capsules are measured into the true midpoints of the empty bands
 * (menu → headline, headline → slider).
 */
export default function HomeHeroLandingPanel({ active = true }: HomeHeroLandingPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const capsulesRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const headline = headlineRef.current;
    const badge = badgeRef.current;
    const capsules = capsulesRef.current;
    if (!root || !headline || !badge || !capsules) return;

    const placeTops = () => {
      const siteHeader = document.querySelector("[data-site-header]");
      const slider = document.querySelector("[data-hero-slider]");
      if (!siteHeader || !slider) return false;

      const rootTop = root.getBoundingClientRect().top;
      const menuBottom = siteHeader.getBoundingClientRect().bottom;
      const headlineBox = headline.getBoundingClientRect();
      const sliderTop = slider.getBoundingClientRect().top;

      badge.style.top = `${Math.max(0, (menuBottom + headlineBox.top) / 2 - rootTop - badge.offsetHeight / 2)}px`;
      capsules.style.top = `${Math.max(0, (headlineBox.bottom + sliderTop) / 2 - rootTop - capsules.offsetHeight / 2)}px`;
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
    ro.observe(headline);
    ro.observe(badge);
    ro.observe(capsules);

    window.addEventListener("resize", rafPlace);
    window.addEventListener("scroll", rafPlace, { passive: true });
    window.addEventListener("home-hero-layout", rafPlace);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(rafPlace);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", rafPlace);
      window.removeEventListener("scroll", rafPlace);
      window.removeEventListener("home-hero-layout", rafPlace);
    };
  }, [active]);

  const showOverlays = active && ready;

  return (
    <div ref={rootRef} className="relative h-full w-full min-w-0">
      <div
        ref={badgeRef}
        className={cn(
          "absolute inset-x-0 z-[2] flex justify-center lg:justify-start",
          !showOverlays && "invisible",
        )}
        aria-hidden={!showOverlays}
      >
        <HomeHeroProductHuntBadge className="shrink-0 lg:self-start" />
      </div>

      <div className="flex h-full w-full items-center justify-center lg:justify-start">
        <div className="flex w-full min-w-0 flex-col items-center gap-6 sm:gap-7 lg:items-start lg:gap-8">
          <div className="invisible shrink-0" aria-hidden>
            <HomeHeroProductHuntBadge />
          </div>
          <h1
            ref={headlineRef}
            data-home-hero-band-headline
            className={cn(
              marketingHeroH1Class,
              "mb-0 w-full text-center sm:mb-0 lg:text-left",
              "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
            )}
          >
            <span className="flex flex-col items-center gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:items-start lg:gap-y-4">
              <span className="flex flex-col items-center gap-y-2 px-1 leading-[inherit] sm:gap-y-2.5 md:block md:whitespace-nowrap lg:items-start">
                <span className="block md:inline">Mobile-First</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline">Apps Need</span>
              </span>
              <Link
                href={PATHS.COMPARE_WEB_FIRST}
                className="flex flex-col items-center gap-y-2 rounded-sm px-1 leading-[inherit] text-hero-here transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-y-2.5 md:block md:whitespace-nowrap lg:items-start"
              >
                <span className="block md:inline">Mobile-First</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline">Testing</span>
              </Link>
            </span>
          </h1>
        </div>
      </div>

      <nav
        ref={capsulesRef}
        className={cn(
          "absolute inset-x-0 z-[2] flex justify-center lg:justify-start",
          !showOverlays && "invisible",
        )}
        aria-label="Product highlights"
        aria-hidden={!showOverlays}
      >
        <ul className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:justify-start">
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
