'use client';

import type { DeviceFamilyRow, MatrixSummary } from './types';

interface AdvisorMatrixTableProps {
  summary: MatrixSummary;
}

export default function AdvisorMatrixTable({ summary }: AdvisorMatrixTableProps) {
  const { allFamilies, includedFamilyCount } = summary;

  if (allFamilies.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-[var(--qp-muted)]">
        No device families match the current filters.
      </div>
    );
  }

  const included = allFamilies.filter((f) => f.included);
  const excluded = allFamilies.filter((f) => !f.included);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-[var(--qp-accent)]/30 bg-[var(--qp-accent-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--qp-accent)]">
          Included ({includedFamilyCount})
        </span>
        {excluded.length > 0 && (
          <span className="inline-flex items-center rounded-md border border-[var(--qp-border)] bg-[var(--qp-subtle)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--qp-muted)]">
            Below target ({excluded.length})
          </span>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--qp-border)]">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-[var(--qp-subtle)] text-left text-[10px] font-semibold uppercase tracking-wide text-[var(--qp-muted)]">
              <th className="px-3 py-2 w-8">#</th>
              <th className="px-3 py-2">Device Family</th>
              <th className="px-3 py-2">OEM</th>
              <th className="px-3 py-2">Platform</th>
              <th className="px-3 py-2">OS Range</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2 text-center">Models</th>
              <th className="px-3 py-2 text-right">Share</th>
              <th className="px-3 py-2 text-right">Cumulative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--qp-border)]">
            {included.map((row, i) => (
              <FamilyRow key={`${row.device_family}-${row.platform}`} row={row} index={i + 1} dimmed={false} />
            ))}
            {excluded.length > 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-1.5 bg-[var(--qp-subtle)]">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--qp-muted)]">
                    <div className="flex-1 border-t border-[var(--qp-border)]" />
                    <span>coverage target reached</span>
                    <div className="flex-1 border-t border-[var(--qp-border)]" />
                  </div>
                </td>
              </tr>
            )}
            {excluded.map((row, i) => (
              <FamilyRow
                key={`${row.device_family}-${row.platform}`}
                row={row}
                index={includedFamilyCount + i + 1}
                dimmed
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FamilyRow({
  row,
  index,
  dimmed,
}: {
  row: DeviceFamilyRow;
  index: number;
  dimmed: boolean;
}) {
  return (
    <tr className={`transition-colors ${dimmed ? 'opacity-40' : 'hover:bg-[var(--qp-subtle)]/80'}`}>
      <td className="px-3 py-2 text-[var(--qp-muted)] text-[11px] tabular-nums">{index}</td>
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="font-medium text-[var(--qp-ink)]">{row.device_family}</div>
        <div className="text-[10px] text-[var(--qp-muted)] mt-0.5 truncate max-w-[180px] sm:max-w-[220px]">
          {row.representative_models}
        </div>
      </td>
      <td className="px-3 py-2 text-[var(--qp-ink)]/80 whitespace-nowrap">{row.device_oem}</td>
      <td className="px-3 py-2">
        <PlatformBadge platform={row.platform} />
      </td>
      <td className="px-3 py-2 text-[var(--qp-ink)]/80 whitespace-nowrap">{row.os_version_range}</td>
      <td className="px-3 py-2 text-[var(--qp-ink)]/80 capitalize">{row.device_type}</td>
      <td className="px-3 py-2 text-center text-[var(--qp-ink)]/80 tabular-nums">{row.model_count}</td>
      <td className="px-3 py-2 text-right font-mono text-[var(--qp-ink)] tabular-nums">
        {(row.combined_share * 100).toFixed(1)}%
      </td>
      <td className="px-3 py-2 text-right tabular-nums">
        <span
          className={`font-mono text-xs ${!dimmed ? 'font-semibold text-[var(--qp-accent)]' : 'text-[var(--qp-muted)]'}`}
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
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
        isAndroid ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
      }`}
    >
      {isAndroid ? 'Android' : 'iOS'}
    </span>
  );
}
