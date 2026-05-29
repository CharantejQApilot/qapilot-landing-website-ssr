"use client";

import type { ReactNode } from "react";

interface AdvisorShellProps {
  controls?: ReactNode;
  children: ReactNode;
}

/** Full-width widget chrome — section title lives in DeviceCoverageSection. */
export default function AdvisorShell({ controls, children }: AdvisorShellProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-md)]">
      {controls ? (
        <div className="border-b border-border/80 bg-muted/30 px-4 py-4 sm:px-6 md:px-8 lg:px-10">
          {controls}
        </div>
      ) : null}
      <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-6 sm:py-6 md:px-8 lg:px-10">{children}</div>
    </div>
  );
}
