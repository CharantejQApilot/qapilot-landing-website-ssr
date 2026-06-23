'use client';

import {
  useBaselineData,
  useCountryOptions,
  useFamilyMatrix,
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
  const summary = useFamilyMatrix(data, filters);

  if (status === 'loading') {
    return (
      <AdvisorShell>
        <div className="flex items-center justify-center py-8">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[var(--qp-border)] border-t-[var(--qp-accent)]" />
          <span className="ml-3 text-sm text-[var(--qp-muted)]">Loading device data...</span>
        </div>
      </AdvisorShell>
    );
  }

  if (status === 'error') {
    return (
      <AdvisorShell>
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
          <p className="text-sm text-red-800 font-medium">
            Failed to load device coverage data.
          </p>
          <p className="text-xs text-red-600 mt-1">
            Make sure <code className="font-mono">device_coverage_baseline.json</code> is
            available under <code className="font-mono">/public/device-coverage/</code>.
          </p>
        </div>
      </AdvisorShell>
    );
  }

  return (
    <AdvisorShell>
      <AdvisorForm
        countries={countries}
        selectedCountry={filters.country}
        selectedPlatform={filters.platform}
        coveragePct={filters.coveragePct}
        onCountryChange={setCountry}
        onPlatformChange={setPlatform}
        onCoveragePctChange={setCoveragePct}
      />

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
