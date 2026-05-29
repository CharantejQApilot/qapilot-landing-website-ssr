'use client';

import type { MatrixSummary } from './types';

interface AdvisorSummaryProps {
  summary: MatrixSummary;
}

export default function AdvisorSummary({ summary }: AdvisorSummaryProps) {
  const achieved = (summary.achievedCoverage * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-[var(--qp-border)] bg-[var(--qp-accent-soft)] p-4">
      <p className="text-sm text-[var(--qp-ink)]/90 leading-snug">
        For{' '}
        <span className="font-semibold text-[var(--qp-ink)]">{summary.countryName}</span>,{' '}
        <span className="font-semibold text-[var(--qp-ink)]">{summary.platformLabel}</span>,
        targeting{' '}
        <span className="font-semibold text-[var(--qp-accent)]">
          {summary.targetCoverage}%
        </span>{' '}
        coverage requires{' '}
        <span className="font-semibold text-[var(--qp-ink)]">
          {summary.includedFamilyCount} device{' '}
          {summary.includedFamilyCount !== 1 ? 'families' : 'family'}
        </span>{' '}
        (achieving{' '}
        <span className="font-semibold text-[var(--qp-accent)]">{achieved}%</span>).
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <StatCard
          label="Families Included"
          value={`${summary.includedFamilyCount} / ${summary.totalFamilyCount}`}
        />
        <StatCard label="Achieved Coverage" value={`${achieved}%`} />
        <StatCard label="Target" value={`${summary.targetCoverage}%`} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] px-3 py-2 text-center">
      <div className="text-base font-bold tabular-nums text-[var(--qp-ink)]">{value}</div>
      <div className="text-[10px] text-[var(--qp-muted)] mt-0.5">{label}</div>
    </div>
  );
}
