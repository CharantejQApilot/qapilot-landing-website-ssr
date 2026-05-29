"use client";

import type { RefObject } from "react";
import dynamic from "next/dynamic";
import { useLazyLoad } from "@/hooks/use-scroll-animation";

const CoreAdvantageHeading = dynamic(() => import("@/components/CoreAdvantageHeading"), {
  ssr: false,
});

const PLACEHOLDER = (
  <div className="section-cream section-edge min-h-[480px] w-full" aria-hidden />
);

/**
 * Defers Core Advantage hydration until the section nears the viewport.
 * Same skeleton as page-level dynamic loading — no visual change once scrolled into view.
 */
export default function CoreAdvantageLazy() {
  const { ref, shouldLoad } = useLazyLoad("300px 0px");

  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      {shouldLoad ? <CoreAdvantageHeading /> : PLACEHOLDER}
    </div>
  );
}
