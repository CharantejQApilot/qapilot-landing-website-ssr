'use client';

import type { PlatformFilter } from './types';

interface CountryOption {
  code: string;
  name: string;
}

interface AdvisorFormProps {
  countries: CountryOption[];
  selectedCountry: string;
  selectedPlatform: PlatformFilter;
  coveragePct: number;
  onCountryChange: (code: string) => void;
  onPlatformChange: (platform: PlatformFilter) => void;
  onCoveragePctChange: (pct: number) => void;
}

const PLATFORM_OPTIONS: { value: PlatformFilter; label: string }[] = [
  { value: 'both', label: 'Both' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
];

function getSliderLabel(pct: number): string {
  if (pct <= 30) return 'Minimal';
  if (pct <= 55) return 'Lean';
  if (pct <= 75) return 'Balanced';
  if (pct <= 90) return 'Broad';
  return 'Extensive';
}

const LABEL_ROW =
  'block min-h-[2.5rem] text-[11px] font-semibold uppercase tracking-wide text-[var(--qp-ink)]/65 leading-tight';

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdvisorForm({
  countries,
  selectedCountry,
  selectedPlatform,
  coveragePct,
  onCountryChange,
  onPlatformChange,
  onCoveragePctChange,
}: AdvisorFormProps) {
  const label = getSliderLabel(coveragePct);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-5">
      <div className="min-w-0 shrink-0 lg:w-[200px] flex flex-col">
        <label htmlFor="advisor-country" className={LABEL_ROW}>
          Target market
        </label>
        <div className="relative mt-1">
          <select
            id="advisor-country"
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            aria-label="Target market"
            className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-[var(--qp-border)] bg-[var(--qp-card)] py-2 pl-3 pr-10 text-sm text-[var(--qp-ink)] shadow-sm transition focus:border-[var(--qp-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--qp-accent)]/20"
          >
            <option value="" disabled>
              Select...
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <span
            className="pointer-events-none absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-[var(--qp-muted)]"
            aria-hidden
          >
            <ChevronDownIcon className="shrink-0" />
          </span>
        </div>
      </div>

      <div className="shrink-0 flex flex-col">
        <span className={LABEL_ROW}>Platform</span>
        <div className="mt-1 flex min-h-[36px] items-center">
          <div className="inline-flex h-9 overflow-hidden rounded-lg border border-[var(--qp-border)]">
            {PLATFORM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPlatformChange(opt.value)}
                className={`flex h-9 min-w-[3.25rem] items-center justify-center px-3 text-xs font-medium transition ${
                  selectedPlatform === opt.value
                    ? 'bg-[var(--qp-accent)] text-white'
                    : 'bg-[var(--qp-card)] text-[var(--qp-ink)] hover:bg-[var(--qp-subtle)]'
                } ${opt.value !== 'both' ? 'border-l border-[var(--qp-border)]' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 flex flex-col lg:min-w-[280px]">
        <div className={LABEL_ROW}>Coverage target</div>
        <div className="mt-1 flex min-h-[36px] items-center gap-3">
          <span
            className="shrink-0 text-lg font-bold tabular-nums leading-none text-[var(--qp-accent)]"
            aria-live="polite"
          >
            {coveragePct}%
          </span>
          <input
            id="advisor-coverage"
            type="range"
            min={0}
            max={100}
            step={5}
            value={coveragePct}
            onChange={(e) => onCoveragePctChange(Number(e.target.value))}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={coveragePct}
            aria-label="Coverage target percentage"
            className="h-1.5 min-w-0 flex-1 cursor-pointer self-center rounded-full appearance-none bg-[var(--qp-border)] accent-[var(--qp-accent)]"
          />
          <span
            className="shrink-0 rounded-full bg-[var(--qp-subtle)] px-2 py-1 text-[10px] font-medium leading-none text-[var(--qp-muted)]"
            title="Coverage band"
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
