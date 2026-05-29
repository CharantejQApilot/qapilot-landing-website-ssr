"use client";

import { useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import type { LeadFormData, MatrixSummary, FilterState } from "./types";

interface AdvisorCtasProps {
  summary: MatrixSummary;
  filters: FilterState;
}

export default function AdvisorCtas({ summary, filters }: AdvisorCtasProps) {
  const { openForm } = useHubSpotForm();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    email: "",
    company: "",
    appLink: "",
  });

  function handleBookSession() {
    openForm(
      "Book a working session",
      "Tell us about your app and target markets—we'll help you turn this device matrix into a practical test plan.",
    );
  }

  function handleDownloadCsv() {
    const included = summary.allFamilies.filter((f) => f.included);
    const headers = [
      "Family",
      "OEM",
      "Platform",
      "OS Range",
      "Type",
      "Models",
      "Representative Devices",
      "Share (%)",
      "Cumulative (%)",
    ];
    const csvRows = included.map((f) => [
      f.device_family,
      f.device_oem,
      f.platform,
      f.os_version_range,
      f.device_type,
      String(f.model_count),
      f.representative_models,
      (f.combined_share * 100).toFixed(1),
      (f.cumulative_share * 100).toFixed(1),
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const included = summary.allFamilies.filter((f) => f.included);
    const payload = {
      ...formData,
      filters,
      selectedFamilies: included.map((f) => ({
        family: f.device_family,
        oem: f.device_oem,
        share: f.combined_share,
        models: f.model_count,
      })),
    };

    console.log("[DeviceCoverageAdvisor] Matrix email request:", payload);
    setSubmitted(true);
    setShowForm(false);
  }

  return (
    <div className="space-y-4 border-t border-border/80 pt-5">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button type="button" onClick={handleBookSession}>
          Book a 30-minute working session
        </Button>
        <Button type="button" variant="outline" onClick={() => setShowForm(true)}>
          Email me this matrix
        </Button>
        <Button type="button" variant="secondary" onClick={handleDownloadCsv}>
          <Download className="h-4 w-4" aria-hidden />
          Download CSV
        </Button>
      </div>

      {showForm && !submitted && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-xl border border-border bg-muted/30 p-4 md:p-5"
        >
          <h3 className="text-sm font-semibold text-foreground">
            We&apos;ll email you this device matrix
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="lead-email" className="mb-1 block text-xs font-medium text-muted-foreground">
                Work email *
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label htmlFor="lead-company" className="mb-1 block text-xs font-medium text-muted-foreground">
                Company
              </label>
              <input
                id="lead-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="Acme Inc."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label htmlFor="lead-app" className="mb-1 block text-xs font-medium text-muted-foreground">
                App link
              </label>
              <input
                id="lead-app"
                type="url"
                value={formData.appLink}
                onChange={(e) => setFormData((p) => ({ ...p, appLink: e.target.value }))}
                placeholder="https://play.google.com/store/apps/..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">Send matrix</Button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="rounded-xl border border-primary/20 bg-primary-light p-4 text-sm text-foreground">
          <strong>Thank you!</strong> We&apos;ll send your device matrix shortly.
        </div>
      )}
    </div>
  );
}
