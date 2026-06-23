'use client';

import type { CoverageMatrixRow, MatrixSummary } from './types';
import { cn } from '@/lib/utils';

interface AdvisorMatrixTableProps {
  summary: MatrixSummary;
}

export default function AdvisorMatrixTable({ summary }: AdvisorMatrixTableProps) {
  const { allRows, includedRowCount } = summary;

  if (allRows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 py-12 text-center text-sm text-muted-foreground">
        No OEM profiles match the current filters.
      </div>
    );
  }

  const included = allRows.filter((row) => row.included);
  const excluded = allRows.filter((row) => !row.included);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">
          Recommended matrix
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Included ({includedRowCount})
          </span>
          {excluded.length > 0 && (
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Below target ({excluded.length})
            </span>
          )}
        </div>
      </div>

      {/* Mobile card layout */}
      <div className="space-y-3 md:hidden">
        {included.map((row, i) => (
          <MatrixCard key={`${row.device_oem}-${row.platform}`} row={row} index={i + 1} dimmed={false} />
        ))}
        {excluded.length > 0 && (
          <p className="py-2 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Coverage target reached
          </p>
        )}
        {excluded.map((row, i) => (
          <MatrixCard
            key={`${row.device_oem}-${row.platform}-ex`}
            row={row}
            index={includedRowCount + i + 1}
            dimmed
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 w-10">#</th>
                <th className="px-4 py-3">OEM</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">OS versions</th>
                <th className="px-4 py-3 text-center">Tier</th>
                <th className="px-4 py-3 text-right">Share</th>
                <th className="px-4 py-3 text-right">Cumulative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {included.map((row, i) => (
                <MatrixRow
                  key={`${row.device_oem}-${row.platform}`}
                  row={row}
                  index={i + 1}
                  dimmed={false}
                />
              ))}
              {excluded.length > 0 && (
                <tr>
                  <td colSpan={7} className="bg-muted/30 px-4 py-2">
                    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      <div className="flex-1 border-t border-border" />
                      <span>Coverage target reached</span>
                      <div className="flex-1 border-t border-border" />
                    </div>
                  </td>
                </tr>
              )}
              {excluded.map((row, i) => (
                <MatrixRow
                  key={`${row.device_oem}-${row.platform}`}
                  row={row}
                  index={includedRowCount + i + 1}
                  dimmed
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MatrixCard({
  row,
  index,
  dimmed,
}: {
  row: CoverageMatrixRow;
  index: number;
  dimmed: boolean;
}) {
  return (
    <article
      className={cn(
        'rounded-xl border bg-card p-4 shadow-sm transition',
        dimmed ? 'border-border/60 opacity-50' : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">#{index}</span>
            <h4 className="font-semibold text-foreground">{row.device_oem}</h4>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            OS {row.os_version_range}
            {row.os_version_count > 1 && ` (${row.os_version_count} versions)`}
          </p>
        </div>
        <PlatformBadge platform={row.platform} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
        <TierBadge tier={row.coverage_tier} />
        <div className="text-right">
          <div className="text-sm font-bold tabular-nums text-foreground">
            {(row.combined_share * 100).toFixed(1)}%
          </div>
          <div
            className={cn(
              'text-xs tabular-nums',
              dimmed ? 'text-muted-foreground' : 'font-semibold text-primary',
            )}
          >
            Cum. {(row.cumulative_share * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </article>
  );
}

function MatrixRow({
  row,
  index,
  dimmed,
}: {
  row: CoverageMatrixRow;
  index: number;
  dimmed: boolean;
}) {
  return (
    <tr
      className={cn(
        'transition-colors',
        dimmed ? 'opacity-45' : 'hover:bg-muted/30',
      )}
    >
      <td className="px-4 py-3 text-xs tabular-nums text-muted-foreground">{index}</td>
      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.device_oem}</td>
      <td className="px-4 py-3">
        <PlatformBadge platform={row.platform} />
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
        <span>{row.os_version_range}</span>
        {row.os_version_count > 1 && (
          <span className="ml-1 text-xs text-muted-foreground/80">
            ({row.os_version_count} versions)
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-center">
        <TierBadge tier={row.coverage_tier} />
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-foreground">
        {(row.combined_share * 100).toFixed(1)}%
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        <span
          className={cn(
            'font-mono text-sm',
            !dimmed ? 'font-semibold text-primary' : 'text-muted-foreground',
          )}
        >
          {(row.cumulative_share * 100).toFixed(1)}%
        </span>
      </td>
    </tr>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const isAndroid = platform === 'android';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
        isAndroid ? 'bg-emerald-500/15 text-emerald-700' : 'bg-sky-500/15 text-sky-700',
      )}
    >
      {isAndroid ? 'Android' : 'iOS'}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    P0: 'bg-red-500/15 text-red-700',
    P1: 'bg-orange-500/15 text-orange-700',
    P2: 'bg-amber-500/15 text-amber-800',
    P3: 'bg-muted text-muted-foreground',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold',
        styles[tier] ?? styles.P3,
      )}
    >
      {tier}
    </span>
  );
}
