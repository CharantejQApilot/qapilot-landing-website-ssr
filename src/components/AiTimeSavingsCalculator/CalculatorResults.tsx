"use client";

import { cn } from "@/lib/utils";
import type { EffortModelResult } from "@/lib/ai-time-savings/effort-model";

type BarSegment = {
  label: string;
  value: number;
  className: string;
  textClassName?: string;
};

function EffortBar({
  label,
  segments,
  total,
  note,
}: {
  label: string;
  segments: BarSegment[];
  total: number;
  note?: string;
}) {
  return (
    <div className="min-w-0 space-y-2.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {note ? (
          <span className="text-xs tabular-nums text-muted-foreground">
            {note}
          </span>
        ) : null}
      </div>

      <div className="flex h-10 w-full min-w-0 overflow-hidden rounded-xl border border-border bg-muted/50">
        {segments.map((s) => {
          const pct = total > 0 ? (s.value / total) * 100 : 0;
          return (
            <div
              key={s.label}
              className={cn(
                "flex min-w-0 items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-semibold tracking-wide transition-[width] duration-500 ease-out sm:text-[11px]",
                s.className,
                s.textClassName,
              )}
              style={{
                width: `${pct}%`,
                minWidth: s.value > 0 ? 2 : 0,
              }}
            >
              {pct > 14 ? s.label : ""}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {segments
          .filter((s) => s.value > 0)
          .map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={cn("size-2.5 shrink-0 rounded-sm", s.className)}
                aria-hidden
              />
              <span>
                {s.label}:{" "}
                <span className="font-heading font-semibold tabular-nums text-foreground">
                  {Math.round((s.value / total) * 100)}%
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

function FormulaRow({
  label,
  op,
  value,
  valueClassName,
  bold,
}: {
  label: string;
  op: string;
  value: string;
  valueClassName?: string;
  bold?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-xl px-3.5 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-3.5",
        bold ? "border border-border bg-muted/40" : "border border-transparent",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
        <span className="w-4 shrink-0 text-center text-sm font-medium leading-5 text-muted-foreground sm:leading-none">
          {op}
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 text-sm leading-snug",
            bold ? "font-medium text-foreground" : "text-foreground/75",
          )}
        >
          {label}
        </span>
      </div>
      <span
        className={cn(
          "pl-7 font-heading text-sm tabular-nums sm:pl-0 sm:text-right",
          bold ? "font-bold" : "font-semibold",
          valueClassName ?? "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

const WORKFLOWS = [
  {
    label: "Manual workflow",
    steps: ["Write test case", "Record / script it"],
    note: "Effort is predictable but high",
    accentClass: "text-foreground",
    stepBg: "border-border bg-muted text-foreground",
  },
  {
    label: "AI-assisted workflow",
    steps: ["AI generates", "Verify all cases", "Re-record wrong ones"],
    note: "Effort depends on AI accuracy",
    accentClass: "text-primary",
    stepBg: "border-primary/25 bg-primary/10 text-primary",
  },
] as const;

interface CalculatorResultsProps {
  accuracy: number;
  verifyRatio: number;
  model: EffortModelResult;
}

export default function CalculatorResults({
  accuracy,
  verifyRatio,
  model,
}: CalculatorResultsProps) {
  const {
    N,
    manualEffort,
    genEffort,
    verifyEffort,
    wrongCases,
    rerecordEffort,
    aiTotal,
    savings,
    savingsPct,
    naiveSavings,
    maxBar,
  } = model;

  const displaySavingsPct = Math.max(0, savingsPct);
  const displaySavingsUnits = Math.max(0, Math.round(savings));

  return (
    <div className="grid w-full min-w-0 gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
      {/* Workflows */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-2">
        {WORKFLOWS.map((w) => (
          <div
            key={w.label}
            className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <p
              className={cn(
                "mb-4 text-[11px] font-semibold uppercase tracking-wider",
                w.accentClass,
              )}
            >
              {w.label}
            </p>
            <ul className="space-y-3.5">
              {w.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                      w.stepBg,
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 pt-0.5 text-sm leading-relaxed text-foreground/80">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              {w.note}
            </p>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:col-span-7">
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            Key insight
          </p>

          <div className="grid grid-cols-2 items-start gap-4 sm:gap-8 md:flex md:flex-wrap md:items-end md:gap-12">
            <div className="min-w-0">
              <p className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {naiveSavings}%
              </p>
              <p className="mt-2 text-xs font-medium leading-snug text-foreground/70 sm:text-sm">
                Naïve savings estimate
                <span className="mt-0.5 block text-[11px] font-normal text-muted-foreground sm:text-xs">
                  {`("AI got ${accuracy}% right")`}
                </span>
              </p>
            </div>

            <span
              className="mb-8 hidden font-heading text-2xl text-foreground/35 md:block"
              aria-hidden
            >
              →
            </span>

            <div className="min-w-0">
              <p
                className={cn(
                  "font-heading text-3xl font-bold tabular-nums tracking-tight sm:text-4xl md:text-5xl",
                  savings > 0 ? "text-primary" : "text-destructive",
                )}
              >
                {displaySavingsPct}%
              </p>
              <p className="mt-2 text-xs font-medium leading-snug text-foreground/70 sm:text-sm">
                Actual savings after
                <span className="mt-0.5 block text-[11px] font-normal text-muted-foreground sm:text-xs">
                  verification + re-recording
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
          The gap between these two numbers is the{" "}
          <strong className="font-semibold text-foreground">
            hidden verification tax
          </strong>
          . And it grows as AI accuracy drops or verification takes longer.
          {savings <= 0 ? (
            <span className="text-destructive">
              {" "}
              At these settings, AI-assisted QA is actually{" "}
              <strong className="font-semibold">slower</strong> than manual. The
              break-even requires either higher accuracy or faster verification.
            </span>
          ) : null}
        </p>
      </div>

      {/* Effort bars */}
      <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:col-span-7">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Effort breakdown (per 100 test cases)
        </p>

        <div className="space-y-7">
          <EffortBar
            label="Manual"
            note="baseline"
            total={maxBar}
            segments={[
              {
                label: "Write + record",
                value: manualEffort,
                className: "bg-navy",
                textClassName: "text-primary-foreground",
              },
            ]}
          />

          <EffortBar
            label="AI-assisted"
            note={`actual total: ${Math.round(aiTotal)} units`}
            total={maxBar}
            segments={[
              {
                label: "AI gen",
                value: genEffort,
                className: "bg-primary",
                textClassName: "text-primary-foreground",
              },
              {
                label: "Verify",
                value: verifyEffort,
                className: "bg-primary/55",
                textClassName: "text-primary-foreground",
              },
              {
                label: "Re-record",
                value: rerecordEffort,
                className: "bg-foreground",
                textClassName: "text-background",
              },
            ]}
          />
        </div>
      </div>

      {/* Formula */}
      <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 lg:col-span-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          The real savings formula
        </p>

        <div className="-mx-1 space-y-1 sm:mx-0 sm:space-y-1.5">
          <FormulaRow
            label="Manual effort (baseline)"
            op="−"
            value={`${manualEffort} units`}
          />
          <FormulaRow
            label="AI gen overhead (~5% of baseline)"
            op="−"
            value={`${genEffort} units`}
            valueClassName="text-primary"
          />
          <FormulaRow
            label={`Verify all ${N} cases (${verifyRatio}% cost each)`}
            op="−"
            value={`${Math.round(verifyEffort)} units`}
            valueClassName="text-foreground/80"
          />
          <FormulaRow
            label={`Re-record ${Math.round(wrongCases)} wrong cases (100% cost each)`}
            op="−"
            value={`${Math.round(rerecordEffort)} units`}
            valueClassName="text-foreground"
          />
          <FormulaRow
            label="Actual time saved"
            op="="
            value={`${displaySavingsUnits} units (${displaySavingsPct}%)`}
            valueClassName={savings > 0 ? "text-primary" : "text-destructive"}
            bold
          />
        </div>
      </div>
    </div>
  );
}
