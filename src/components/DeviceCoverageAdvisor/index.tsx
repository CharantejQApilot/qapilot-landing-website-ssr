"use client";

import {
  useBaselineData,
  useCountryOptions,
  useFamilyMatrix,
  useFilters,
} from "./hooks";
import AdvisorShell from "./AdvisorShell";
import AdvisorForm from "./AdvisorForm";
import AdvisorSummary from "./AdvisorSummary";
import AdvisorMatrixTable from "./AdvisorMatrixTable";
import AdvisorCtas from "./AdvisorCtas";

export default function DeviceCoverageAdvisor() {
  const { data, status } = useBaselineData();
  const countries = useCountryOptions(data);
  const { filters, setCountry, setPlatform, setCoveragePct } = useFilters(countries);
  const summary = useFamilyMatrix(data, filters);

  const formControls = (
    <AdvisorForm
      countries={countries}
      selectedCountry={filters.country}
      selectedPlatform={filters.platform}
      coveragePct={filters.coveragePct}
      onCountryChange={setCountry}
      onPlatformChange={setPlatform}
      onCoveragePctChange={setCoveragePct}
    />
  );

  if (status === "loading") {
    return (
      <AdvisorShell controls={formControls}>
        <div className="flex items-center justify-center py-10">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
            aria-hidden
          />
          <span className="ml-3 text-sm text-muted-foreground">Loading device coverage data…</span>
        </div>
      </AdvisorShell>
    );
  }

  if (status === "error") {
    return (
      <AdvisorShell controls={formControls}>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center">
          <p className="text-sm font-medium text-foreground">Failed to load device coverage data.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The baseline dataset could not be loaded. Please refresh and try again.
          </p>
        </div>
      </AdvisorShell>
    );
  }

  return (
    <AdvisorShell controls={formControls}>
      {summary ? (
        <>
          <AdvisorSummary summary={summary} />
          <AdvisorMatrixTable summary={summary} />
          <AdvisorCtas summary={summary} filters={filters} />
        </>
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">
          Select a target market to generate your device matrix.
        </p>
      )}
    </AdvisorShell>
  );
}
