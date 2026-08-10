"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { DualDeviceHeroVisual } from "@/components/dual-device-testing/DualDeviceHeroVisual";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const INDUSTRIES = ["Marketplace", "Messaging", "Field Force"] as const;
const LG_MIN = "(min-width: 1024px)";

type HomeHeroDualDevicePanelProps = {
  /** When false, industry strip stays hidden (avoids flash before measured place). */
  active?: boolean;
};

/**
 * Home hero slide 2: Dual Device Testing + product-page phone visual.
 * Mobile: industries sit in document flow under the copy.
 * Desktop (lg+): industry labels share the same Y band as slide 1 product capsules.
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
      if (!window.matchMedia(LG_MIN).matches) {
        industries.style.top = "";
        return true;
      }

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

  const showDesktopIndustries = active && ready;

  return (
    <div
      ref={rootRef}
      className="relative flex h-full w-full min-w-0 flex-col items-start justify-center gap-5 sm:gap-6 lg:block lg:gap-0"
    >
      <div
        className={cn(
          "flex w-full min-w-0 flex-col items-start",
          "lg:h-full lg:flex-row lg:items-center lg:gap-x-10 xl:gap-x-12",
        )}
      >
        <div className="flex min-w-0 flex-col items-start text-left lg:flex-[0.95]">
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

        <div className="hidden w-full min-w-0 flex-1 items-center justify-end lg:flex">
          <DualDeviceHeroVisual />
        </div>
      </div>

      <p
        ref={industriesRef}
        className={cn(
          "z-[2] flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-sm font-medium text-foreground/80",
          "relative shrink-0",
          "lg:absolute lg:inset-x-0",
          !showDesktopIndustries && "lg:invisible",
        )}
        aria-label="Industries where dual-device testing matters"
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
