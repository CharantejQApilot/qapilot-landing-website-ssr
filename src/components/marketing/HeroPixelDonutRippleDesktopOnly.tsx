"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroPixelDonutRipple = dynamic(
  () =>
    import("@/components/marketing/HeroPixelDonutRipple").then((m) => ({
      default: m.HeroPixelDonutRipple,
    })),
  { ssr: false },
);

function isDesktopViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

/** Halftone ripple — desktop/tablet only; skipped on mobile (no chunk load, no hydration). */
export function HeroPixelDonutRippleDesktopOnly() {
  const [enable, setEnable] = useState(isDesktopViewport);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enable) return null;
  return <HeroPixelDonutRipple />;
}
