"use client";

import { Download, Mail } from "lucide-react";
import type { FilterState, MatrixSummary } from "./types";
import { LeadMagnetEmailCapture } from "@/components/lead-magnet";

interface AdvisorCtasProps {
  summary: MatrixSummary;
  filters: FilterState;
}

function downloadMatrixCsv(summary: MatrixSummary, filters: FilterState) {
  const included = summary.allRows.filter((row) => row.included);
  const headers = [
    "OEM",
    "Platform",
    "OS Versions",
    "OS Version Count",
    "Tier",
    "Share (%)",
    "Cumulative (%)",
  ];
  const csvRows = included.map((row) => [
    row.device_oem,
    row.platform,
    row.os_version_range,
    String(row.os_version_count),
    row.coverage_tier,
    (row.combined_share * 100).toFixed(1),
    (row.cumulative_share * 100).toFixed(1),
  ]);

  const csv = [headers, ...csvRows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `device-matrix-${filters.country}-${filters.coveragePct}pct.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdvisorCtas({ summary, filters }: AdvisorCtasProps) {
  return (
    <LeadMagnetEmailCapture
      pageName="Device Coverage Matrix"
      fieldId="device-matrix-lead-email"
      title="Save or share your matrix"
      description="Enter your work email, then choose how you'd like to receive it."
      emailLabel="Work email"
      emailPlaceholder="you@company.com"
      successMessages={{
        download: "Download started. Check your downloads folder.",
        email: "We'll send your matrix details to that email shortly.",
      }}
      actions={[
        {
          id: "download",
          label: "Download CSV",
          icon: Download,
          variant: "outline",
          hubspotActionLabel: ". Download CSV",
          onAfterCapture: () => downloadMatrixCsv(summary, filters),
        },
        {
          id: "email",
          label: "Send to email",
          icon: Mail,
          variant: "default",
          hubspotActionLabel: ". Send matrix to email",
          onAfterCapture: async () => {},
        },
      ]}
    />
  );
}
