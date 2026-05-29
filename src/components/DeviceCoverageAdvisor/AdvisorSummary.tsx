"use client";

import type { MatrixSummary } from "./types";

interface AdvisorSummaryProps {
  summary: MatrixSummary;
}

export default function AdvisorSummary({ summary }: AdvisorSummaryProps) {
  const achieved = (summary.achievedCoverage * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-border bg-primary-light/60 p-4 md:p-5">
      <p className="text-sm leading-snug text-foreground/90 md:text-base">
        For <span className="font-semibold text-foreground">{summary.countryName}</span>,{" "}
        <span className="font-semibold text-foreground">{summary.platformLabel}</span>, targeting{" "}
        <span className="font-semibold text-primary">{summary.targetCoverage}%</span> coverage requires{" "}
        <span className="font-semibold text-foreground">
          {summary.includedFamilyCount} device{" "}
          {summary.includedFamilyCount !== 1 ? "families" : "family"}
        </span>{" "}
        (achieving <span className="font-semibold text-primary">{achieved}%</span>).
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Families included"
          value={`${summary.includedFamilyCount} / ${summary.totalFamilyCount}`}
        />
        <StatCard label="Achieved coverage" value={`${achieved}%`} />
        <StatCard label="Target" value={`${summary.targetCoverage}%`} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5 text-center">
      <div className="font-heading text-base font-bold tabular-nums text-foreground md:text-lg">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
