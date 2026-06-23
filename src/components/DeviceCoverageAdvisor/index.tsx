'use client';

import {
  useBaselineData,
  useCountryOptions,
  useCoverageMatrix,
  useFilters,
} from './hooks';
import AdvisorShell from './AdvisorShell';
import AdvisorForm from './AdvisorForm';
import AdvisorSummary from './AdvisorSummary';
import AdvisorMatrixTable from './AdvisorMatrixTable';
import AdvisorCtas from './AdvisorCtas';

export default function DeviceCoverageAdvisor() {
  const { data, status } = useBaselineData();
  const countries = useCountryOptions(data);
  const { filters, setCountry, setPlatform, setCoveragePct } = useFilters(countries);
  const summary = useCoverageMatrix(data, filters);

  if (status === 'loading') {
    return (
      <AdvisorShell>
        <div className="flex flex-col items-center justify-center gap-4 py-16 sm:py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading April 2026 device data…</p>
        </div>
      </AdvisorShell>
    );
  }

  if (status === 'error') {
    return (
      <AdvisorShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold text-destructive">
            Failed to load device coverage data.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Make sure <code className="font-mono text-foreground">device_coverage_april2026.json</code> is
            available under <code className="font-mono text-foreground">/public/device-coverage/</code>.
          </p>
        </div>
      </AdvisorShell>
    );
  }

  const formProps = {
    countries,
    selectedCountry: filters.country,
    selectedPlatform: filters.platform,
    coveragePct: filters.coveragePct,
    onCountryChange: setCountry,
    onPlatformChange: setPlatform,
    onCoveragePctChange: setCoveragePct,
  };

  return (
    <AdvisorShell
      controls={<AdvisorForm {...formProps} />}
      contentClassName="pb-1 sm:pb-2 md:pb-2"
    >
      {summary && (
        <>
          <AdvisorSummary summary={summary} />
          <AdvisorMatrixTable summary={summary} />
          <AdvisorCtas summary={summary} filters={filters} />
        </>
      )}
    </AdvisorShell>
  );
}
