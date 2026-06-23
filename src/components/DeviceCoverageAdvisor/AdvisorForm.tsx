'use client';

import type { PlatformFilter } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { marketingFormControlClass } from '@/lib/forms/marketing-form-classes';
import { cn } from '@/lib/utils';

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
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:items-end lg:gap-6">
      <div className="lg:col-span-4">
        <label
          htmlFor="advisor-country"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/60"
        >
          Target market
        </label>
        <Select
          value={selectedCountry || undefined}
          onValueChange={onCountryChange}
        >
          <SelectTrigger
            id="advisor-country"
            aria-label="Target market"
            className={cn(
              marketingFormControlClass({ selectPlaceholder: !selectedCountry }),
              'h-11 rounded-xl font-medium data-[placeholder]:text-muted-foreground',
            )}
          >
            <SelectValue placeholder="Select market…" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            align="start"
            className="z-[100] max-h-72 border-border bg-popover text-popover-foreground shadow-lg"
          >
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="lg:col-span-3">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/60">
          Platform
        </span>
        <div className="flex h-11 overflow-hidden rounded-xl border border-white/15 bg-white/5 p-1">
          {PLATFORM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onPlatformChange(opt.value)}
              className={cn(
                'flex flex-1 items-center justify-center rounded-lg px-2 text-xs font-semibold transition sm:text-sm',
                selectedPlatform === opt.value
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
            Coverage target
          </span>
          <span
            className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/80"
            title="Coverage band"
          >
            {label}
          </span>
        </div>

        <div className="flex h-11 items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 sm:gap-4 sm:px-4">
          <span
            className="shrink-0 font-heading text-lg font-bold tabular-nums leading-none text-white sm:text-xl"
            aria-live="polite"
          >
            {coveragePct}%
          </span>

          <div className="relative flex h-full min-w-0 flex-1 items-center">
            <div
              className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/15"
              aria-hidden
            />
            <div
              className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
              style={{ width: `${coveragePct}%` }}
              aria-hidden
            />
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
              className="advisor-coverage-slider relative z-10 w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
