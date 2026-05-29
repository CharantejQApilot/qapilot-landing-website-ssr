"use client";

import type { DeviceFamilyRow, MatrixSummary } from "./types";
import { cn } from "@/lib/utils";

interface AdvisorMatrixTableProps {
  summary: MatrixSummary;
}

export default function AdvisorMatrixTable({ summary }: AdvisorMatrixTableProps) {
  const { allFamilies, includedFamilyCount } = summary;

  if (allFamilies.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No device families match the current filters.
      </div>
    );
  }

  const included = allFamilies.filter((f) => f.included);
  const excluded = allFamilies.filter((f) => !f.included);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary-light px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          Included ({includedFamilyCount})
        </span>
        {excluded.length > 0 && (
          <span className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            Below target ({excluded.length})
          </span>
        )}
      </div>

      <div className="-mx-4 overflow-x-auto border-y border-border sm:-mx-6 md:-mx-8 lg:-mx-10">
        <table className="min-w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-muted/50 text-left text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-8 px-3 py-2.5 sm:px-4">#</th>
              <th className="px-3 py-2.5 sm:px-4">Device family</th>
              <th className="px-3 py-2.5 sm:px-4">OEM</th>
              <th className="px-3 py-2.5 sm:px-4">Platform</th>
              <th className="px-3 py-2.5 sm:px-4">OS range</th>
              <th className="px-3 py-2.5 sm:px-4">Type</th>
              <th className="px-3 py-2.5 text-center sm:px-4">Models</th>
              <th className="px-3 py-2.5 text-right sm:px-4">Share</th>
              <th className="px-3 py-2.5 text-right sm:px-4">Cumulative</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {included.map((row, i) => (
              <FamilyRow
                key={`${row.device_family}-${row.platform}`}
                row={row}
                index={i + 1}
                dimmed={false}
              />
            ))}
            {excluded.length > 0 && (
              <tr>
                <td colSpan={9} className="bg-muted/40 px-3 py-2 sm:px-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="flex-1 border-t border-border" />
                    <span>Coverage target reached</span>
                    <div className="flex-1 border-t border-border" />
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
    <tr
      className={cn(
        "transition-colors",
        dimmed ? "opacity-40" : "hover:bg-muted/40",
      )}
    >
      <td className="px-3 py-2 text-[11px] tabular-nums text-muted-foreground sm:px-4">{index}</td>
      <td className="whitespace-nowrap px-3 py-2 sm:px-4">
        <div className="font-medium text-foreground">{row.device_family}</div>
        <div className="mt-0.5 max-w-[180px] truncate text-[10px] text-muted-foreground sm:max-w-[240px]">
          {row.representative_models}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-foreground/80 sm:px-4">{row.device_oem}</td>
      <td className="px-3 py-2 sm:px-4">
        <PlatformBadge platform={row.platform} />
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-foreground/80 sm:px-4">{row.os_version_range}</td>
      <td className="px-3 py-2 capitalize text-foreground/80 sm:px-4">{row.device_type}</td>
      <td className="px-3 py-2 text-center tabular-nums text-foreground/80 sm:px-4">{row.model_count}</td>
      <td className="px-3 py-2 text-right font-mono tabular-nums text-foreground sm:px-4">
        {(row.combined_share * 100).toFixed(1)}%
      </td>
      <td className="px-3 py-2 text-right tabular-nums sm:px-4">
        <span
          className={cn(
            "font-mono text-xs",
            !dimmed ? "font-semibold text-primary" : "text-muted-foreground",
          )}
        >
          {(row.cumulative_share * 100).toFixed(1)}%
        </span>
      </td>
    </tr>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const isAndroid = platform === "android";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
        isAndroid ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800",
      )}
    >
      {isAndroid ? "Android" : "iOS"}
    </span>
  );
}
