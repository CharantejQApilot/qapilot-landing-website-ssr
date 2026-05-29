"use client";

import type { PlatformFilter } from "./types";

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
  { value: "both", label: "Both" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
];

function getSliderLabel(pct: number): string {
  if (pct <= 30) return "Minimal";
  if (pct <= 55) return "Lean";
  if (pct <= 75) return "Balanced";
  if (pct <= 90) return "Broad";
  return "Extensive";
}

const LABEL_ROW =
  "block min-h-[2.5rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground leading-tight";

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
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-8">
      <div className="flex min-w-0 shrink-0 flex-col lg:w-[220px]">
        <label htmlFor="advisor-country" className={LABEL_ROW}>
          Target market
        </label>
        <div className="relative mt-1">
          <select
            id="advisor-country"
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            aria-label="Target market"
            className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-input bg-background py-2 pl-3 pr-10 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
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
            className="pointer-events-none absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-muted-foreground"
            aria-hidden
          >
            <ChevronDownIcon className="shrink-0" />
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col">
        <span className={LABEL_ROW}>Platform</span>
        <div className="mt-1 flex min-h-10 items-center">
          <div className="inline-flex h-10 overflow-hidden rounded-lg border border-input">
            {PLATFORM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPlatformChange(opt.value)}
                className={`flex h-10 min-w-[3.5rem] items-center justify-center px-3.5 text-xs font-medium transition ${
                  selectedPlatform === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-muted"
                } ${opt.value !== "both" ? "border-l border-input" : ""}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col lg:min-w-[300px]">
        <div className={LABEL_ROW}>Coverage target</div>
        <div className="mt-1 flex min-h-10 items-center gap-3">
          <span
            className="shrink-0 font-heading text-xl font-bold tabular-nums leading-none text-primary"
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
            className="h-2 min-w-0 flex-1 cursor-pointer self-center appearance-none rounded-full bg-border accent-primary"
          />
          <span
            className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-medium leading-none text-muted-foreground"
            title="Coverage band"
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
