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

/** Halftone ripple — desktop/tablet only; deferred until idle to reduce initial TBT. */
export function HeroPixelDonutRippleDesktopOnly() {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const mount = () => setEnable(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(mount, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (!mq.matches) setEnable(false);
    };
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enable) return null;
  return <HeroPixelDonutRipple />;
}
