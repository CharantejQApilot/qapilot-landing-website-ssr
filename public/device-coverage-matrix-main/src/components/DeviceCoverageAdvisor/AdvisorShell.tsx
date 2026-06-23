'use client';

import type { ReactNode } from 'react';

interface AdvisorShellProps {
  children: ReactNode;
}

export default function AdvisorShell({ children }: AdvisorShellProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-xl border border-[var(--qp-border)] bg-[var(--qp-card)] shadow-sm overflow-hidden">
        <div className="border-b border-white/10 bg-[var(--qp-banner-navy)] px-4 py-3 sm:px-5">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Device Coverage Advisor
          </h2>
          <p className="mt-0.5 text-xs text-white/75">
            Data-driven testing matrix by target market.
          </p>
        </div>
        <div className="px-4 py-4 sm:px-5 space-y-5">{children}</div>
      </div>
    </div>
  );
}
