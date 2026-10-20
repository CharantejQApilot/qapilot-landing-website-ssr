"use client";

import Link from "next/link";
import HomeHeroProductHuntQuotes from "@/components/home-hero/HomeHeroProductHuntQuotes";
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
  /** Pause the quote rotation while this slide is off-screen. */
  active?: boolean;
};

/**
 * Slide 1. Headline and product links stay together at the top.
 * The shared slide toggle is centered in the band below this block.
 */
export default function HomeHeroLandingPanel({ active = true }: HomeHeroLandingPanelProps) {
  return (
    <div className="flex h-full w-full min-w-0 flex-col items-start">
      <div className="w-full">
        <h1
          data-home-hero-band-headline
          className={cn(
            marketingHeroH1Class,
            "mb-0 w-full text-left",
            "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
          )}
        >
          <span className="flex flex-col items-start gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:gap-y-4">
            <span className="flex flex-col items-start gap-y-2 px-1 leading-[inherit] sm:gap-y-2.5 md:block md:whitespace-nowrap">
              <span className="block md:inline">Mobile First</span>
              <span className="hidden md:inline"> </span>
              <span className="block md:inline">Businesses Need</span>
            </span>
            <Link
              href={PATHS.COMPARE_WEB_FIRST}
              className="flex flex-col items-start gap-y-2 rounded-sm px-1 leading-[inherit] text-hero-here transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-y-2.5 md:block md:whitespace-nowrap"
            >
              <span className="block md:inline">Mobile First</span>
              <span className="hidden md:inline"> </span>
              <span className="block md:inline">Testing</span>
            </Link>
          </span>
        </h1>

        <nav
          className="relative z-[2] mt-5 flex w-full justify-start lg:mt-6 lg:max-w-[calc(100%-28rem)]"
          aria-label="Product highlights"
        >
          <ul className="flex max-w-full flex-wrap items-center justify-start gap-2 sm:gap-2.5">
            {HOME_HERO_PRODUCT_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md border border-border bg-background",
                    "px-3.5 py-1.5 text-sm font-medium text-foreground/80",
                    "transition-colors hover:border-foreground/25 hover:text-foreground",
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

        {/* Anchored to the hero group in HomeHeroContent; bottom-14 is the CTA row height, so the card ends where the buttons begin. */}
        <div className="z-[2] mt-6 hidden w-[min(24.5rem,42%)] lg:absolute lg:bottom-14 lg:right-0 lg:mt-0 lg:block">
          <HomeHeroProductHuntQuotes active={active} />
        </div>
      </div>
    </div>
  );
}
