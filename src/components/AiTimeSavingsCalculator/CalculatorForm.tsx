"use client";

import { cn } from "@/lib/utils";

interface CalculatorFormProps {
  accuracy: number;
  verifyRatio: number;
  onAccuracyChange: (value: number) => void;
  onVerifyRatioChange: (value: number) => void;
}

function SliderControl({
  id,
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  hint?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="min-w-0 text-[11px] font-semibold uppercase tracking-wider text-white/60"
        >
          {label}
        </label>
        <span
          className="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 font-heading text-[11px] font-semibold tabular-nums tracking-wide text-white/90"
          aria-live="polite"
        >
          {value}%
        </span>
      </div>

      <div className="flex h-11 items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 sm:gap-4 sm:px-4">
        <div className="relative flex h-full min-w-0 flex-1 items-center">
          <div
            className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/15"
            aria-hidden
          />
          <div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
            style={{ width: `${pct}%` }}
            aria-hidden
          />
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            className={cn(
              "advisor-coverage-slider relative z-10 w-full cursor-pointer appearance-none bg-transparent",
            )}
          />
        </div>
      </div>

      {hint ? (
        <p className="mt-2 text-xs leading-relaxed text-white/45">{hint}</p>
      ) : null}
    </div>
  );
}

export default function CalculatorForm({
  accuracy,
  verifyRatio,
  onAccuracyChange,
  onVerifyRatioChange,
}: CalculatorFormProps) {
  return (
    <div className="grid min-w-0 gap-5 sm:gap-6 md:grid-cols-2 md:items-start md:gap-8">
      <SliderControl
        id="ai-accuracy"
        label="AI accuracy"
        value={accuracy}
        min={10}
        max={99}
        onChange={onAccuracyChange}
        hint="% of generated test cases that are correct"
      />
      <SliderControl
        id="verify-ratio"
        label="Verification cost"
        value={verifyRatio}
        min={10}
        max={80}
        onChange={onVerifyRatioChange}
        hint="Review cost as % of writing one case manually"
      />
    </div>
  );
}
