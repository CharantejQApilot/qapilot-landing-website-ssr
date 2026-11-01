"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NEXT_SECTION_ID = "prereqs";

/**
 * Slide-styled Install control. Click (or keyboard) advances to the next
 * guide section instead of using a standard button.
 */
export function McpGuideInstallSlider() {
  const [sliding, setSliding] = useState(false);

  const goToNext = () => {
    if (sliding) return;
    setSliding(true);
    window.setTimeout(() => {
      document
        .getElementById(NEXT_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${NEXT_SECTION_ID}`);
      window.setTimeout(() => setSliding(false), 700);
    }, 280);
  };

  return (
    <a
      href={`#${NEXT_SECTION_ID}`}
      onClick={(e) => {
        e.preventDefault();
        goToNext();
      }}
      className={cn(
        "group relative isolate mt-0 flex h-14 w-full max-w-[18rem] items-center overflow-hidden rounded-full",
        "border border-border bg-muted/50 shadow-sm",
        "transition-colors hover:border-primary/35 hover:bg-primary/[0.06]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label="Install — continue to the next section"
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 z-0 rounded-full bg-primary/15 transition-[width] duration-300 ease-out",
          sliding ? "w-[calc(100%-0.5rem)] bg-primary/25" : "w-12",
        )}
        aria-hidden
      />

      <span
        className={cn(
          "absolute top-1 z-[1] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-[left] duration-300 ease-out",
          sliding ? "left-[calc(100%-3.25rem)]" : "left-1",
        )}
        aria-hidden
      >
        <ChevronRight
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            sliding ? "translate-x-0.5" : "group-hover:translate-x-0.5",
          )}
        />
      </span>

      <span
        className={cn(
          "relative z-[1] w-full pl-14 pr-5 text-center font-heading text-sm font-semibold tracking-tight text-foreground transition-opacity duration-200 sm:text-base",
          sliding && "opacity-40",
        )}
      >
        Install
      </span>
    </a>
  );
}
