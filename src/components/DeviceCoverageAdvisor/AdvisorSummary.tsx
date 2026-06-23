'use client';

import { Target, TrendingUp, Users } from 'lucide-react';
import type { MatrixSummary } from './types';
import { cn } from '@/lib/utils';

interface AdvisorSummaryProps {
  summary: MatrixSummary;
}

export default function AdvisorSummary({ summary }: AdvisorSummaryProps) {
  const achievedPct = summary.achievedCoverage * 100;
  const achieved = achievedPct.toFixed(1);
  const progressWidth = Math.min(100, (achievedPct / summary.targetCoverage) * 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-muted/30 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          For{' '}
          <span className="font-semibold text-foreground">{summary.countryName}</span>
          {' · '}
          <span className="font-semibold text-foreground">{summary.platformLabel}</span>
          , targeting{' '}
          <span className="font-semibold text-primary">{summary.targetCoverage}%</span>
          {' '}coverage needs{' '}
          <span className="font-semibold text-foreground">
            {summary.includedRowCount} OEM{' '}
            {summary.includedRowCount !== 1 ? 'profiles' : 'profile'}
          </span>
          {' '}(achieving{' '}
          <span className="font-semibold text-primary">{achieved}%</span>).
        </p>

        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <span>Progress to target</span>
            <span className="tabular-nums text-foreground">{achieved}% / {summary.targetCoverage}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressWidth}%` }}
              role="progressbar"
              aria-valuenow={achievedPct}
              aria-valuemin={0}
              aria-valuemax={summary.targetCoverage}
              aria-label="Coverage progress toward target"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Profiles included"
          value={`${summary.includedRowCount} / ${summary.totalRowCount}`}
        />
        <StatCard icon={TrendingUp} label="Achieved coverage" value={`${achieved}%`} highlight />
        <StatCard icon={Target} label="Target" value={`${summary.targetCoverage}%`} />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-card px-4 py-4 sm:px-6 sm:py-5">
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          highlight ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
        )}
        aria-hidden
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <div
          className={cn(
            'font-heading text-xl font-bold tabular-nums leading-none sm:text-2xl',
            highlight ? 'text-primary' : 'text-foreground',
          )}
        >
          {value}
        </div>
        <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
      </div>
    </div>
  );
}
