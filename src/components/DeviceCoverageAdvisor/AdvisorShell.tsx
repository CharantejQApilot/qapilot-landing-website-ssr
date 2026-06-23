'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AdvisorShellProps {
  children: ReactNode;
  controls?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function AdvisorShell({ children, controls, className, contentClassName }: AdvisorShellProps) {
  return (
    <section
      id="coverage-calculator"
      className={cn(
        'relative w-full scroll-mt-20 bg-gradient-to-b from-muted/40 via-background to-background',
        className,
      )}
      aria-label="Device coverage calculator"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden
      />

      {controls ? (
        <div className="relative border-b border-white/10 bg-brand-dark text-white">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_50%_-20%,hsl(var(--primary)/0.35),transparent_55%)]"
            aria-hidden
          />
          <div className="relative section-full py-4 sm:py-5 md:py-6">{controls}</div>
        </div>
      ) : null}

      <div className={cn("section-full py-8 sm:py-10 md:py-12", contentClassName)}>
        <div className="mx-auto w-full max-w-[100rem] space-y-6 sm:space-y-8">{children}</div>
      </div>
    </section>
  );
}
