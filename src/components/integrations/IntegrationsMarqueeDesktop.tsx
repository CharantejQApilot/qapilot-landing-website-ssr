"use client";

import { useNearViewport } from "@/hooks/use-near-viewport";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type IntegrationsMarqueeDesktopProps = {
  children: ReactNode;
};

/** Desktop integration logo marquee — animation runs only when the strip is near the viewport. */
export function IntegrationsMarqueeDesktop({ children }: IntegrationsMarqueeDesktopProps) {
  const { ref, isNear } = useNearViewport({ rootMargin: "200px 0px", threshold: 0 });

  return (
    <div ref={ref} className="relative hidden w-full overflow-hidden md:block">
      <div
        className={cn(
          "flex w-max motion-safe:animate-[infinite-scroll_52s_linear_infinite] motion-reduce:animate-none hover:motion-safe:[animation-play-state:paused] will-change-transform",
          !isNear && "motion-safe:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[hsl(30_20%_97%)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[hsl(30_20%_97%)] to-transparent" />
    </div>
  );
}
