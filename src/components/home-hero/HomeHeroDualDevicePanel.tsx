"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { DualDeviceHeroVisual } from "@/components/dual-device-testing/DualDeviceHeroVisual";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const INDUSTRIES = ["Marketplace", "Messaging", "Field Force"] as const;

type HomeHeroDualDevicePanelProps = {
  /** When false, industry strip stays hidden (avoids flash before measured place). */
  active?: boolean;
};

/**
 * Home hero slide 2: Dual Device Testing + product-page phone visual.
 * Industry labels share the same Y band as slide 1 product capsules
 * (midpoint of slide-1 headline → slider), not the dual-device title → lead gap.
 */
export default function HomeHeroDualDevicePanel({
  active = false,
}: HomeHeroDualDevicePanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const industries = industriesRef.current;
    if (!root || !industries) return;

    const placeTop = () => {
      const slider = document.querySelector("[data-hero-slider]");
      // Same band reference as slide 1 capsules (still laid out while opacity:0)
      const bandHeadline = document.querySelector("[data-home-hero-band-headline]");
      if (!slider || !bandHeadline) return false;

      const rootTop = root.getBoundingClientRect().top;
      const bandBottom = bandHeadline.getBoundingClientRect().bottom;
      const sliderTop = slider.getBoundingClientRect().top;

      industries.style.top = `${Math.max(0, (bandBottom + sliderTop) / 2 - rootTop - industries.offsetHeight / 2)}px`;
      return true;
    };

    if (!active) {
      setReady(false);
      return;
    }

    if (placeTop()) setReady(true);

    const onLayout = () => {
      if (placeTop()) setReady(true);
    };
    const rafPlace = () => requestAnimationFrame(onLayout);

    const ro = new ResizeObserver(rafPlace);
    ro.observe(root);
    ro.observe(industries);
    const bandHeadline = document.querySelector("[data-home-hero-band-headline]");
    if (bandHeadline) ro.observe(bandHeadline);

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

  const showIndustries = active && ready;

  return (
    <div ref={rootRef} className="relative h-full w-full min-w-0">
      <div
        className={cn(
          "flex h-full w-full min-w-0 flex-col items-center justify-center gap-8 py-1",
          "lg:flex-row lg:items-center lg:gap-x-10 xl:gap-x-12",
        )}
      >
        <div className="flex min-w-0 flex-[0.95] flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm">
            Synchronised across two devices
          </p>
          <p
            className={cn(
              marketingHeroH1Class,
              "mb-3 w-full text-balance sm:mb-4",
              "text-[clamp(1.85rem,4.5vw,3.15rem)] leading-[1.08]",
            )}
          >
            Dual Device{" "}
            <Link
              href={PATHS.DUAL_DEVICE_TESTING}
              className="text-hero-here transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Testing
            </Link>
          </p>
          <p
            className={cn(
              marketingHeroLeadClass,
              "max-w-md text-pretty text-base leading-relaxed sm:text-lg",
            )}
          >
            Real journeys span two devices. QApilot runs both sides as one continuous transaction.
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-1 items-center justify-center lg:justify-end">
          <DualDeviceHeroVisual />
        </div>
      </div>

      <p
        ref={industriesRef}
        className={cn(
          "absolute inset-x-0 z-[2] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-foreground/80 lg:justify-start",
          !showIndustries && "invisible",
        )}
        aria-label="Industries where dual-device testing matters"
        aria-hidden={!showIndustries}
      >
        {INDUSTRIES.map((name, i) => (
          <span key={name} className="inline-flex items-center gap-x-3">
            {i > 0 ? (
              <span className="text-border" aria-hidden>
                ·
              </span>
            ) : null}
            <span>{name}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
