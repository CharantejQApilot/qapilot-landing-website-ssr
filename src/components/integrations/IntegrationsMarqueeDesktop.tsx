"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type IntegrationsMarqueeDesktopProps = {
  children: ReactNode;
};

/** Desktop integration logo marquee. CSS infinite scroll (always runs on md+). */
export function IntegrationsMarqueeDesktop({
  children,
}: IntegrationsMarqueeDesktopProps) {
  return (
    <div className="relative hidden w-full overflow-hidden md:block">
      <div className="flex w-max motion-safe:animate-[infinite-scroll_52s_linear_infinite] motion-reduce:animate-none hover:motion-safe:[animation-play-state:paused] will-change-transform">
        {children}
        {children}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[hsl(30_20%_97%)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[hsl(30_20%_97%)] to-transparent" />
    </div>
  );
}
