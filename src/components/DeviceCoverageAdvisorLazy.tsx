"use client";

import dynamic from "next/dynamic";
import { useLazyLoad } from "@/hooks/use-scroll-animation";

const DeviceCoverageAdvisor = dynamic(
  () => import("@/components/DeviceCoverageAdvisor"),
  { ssr: false },
);

const PLACEHOLDER = (
  <div
    className="min-h-[420px] w-full rounded-2xl border border-border bg-card/80 shadow-[var(--shadow-sm)]"
    aria-hidden
  />
);

/** Defers advisor hydration and JSON fetch until the section nears the viewport. */
export default function DeviceCoverageAdvisorLazy() {
  const { ref, shouldLoad } = useLazyLoad("400px 0px");

  return (
    <div ref={ref} className="w-full">
      {shouldLoad ? <DeviceCoverageAdvisor /> : PLACEHOLDER}
    </div>
  );
}
