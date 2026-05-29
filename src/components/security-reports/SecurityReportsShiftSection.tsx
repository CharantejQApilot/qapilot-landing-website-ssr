import { Fragment } from "react";
import { ArrowRight, LayoutList, ShieldAlert, TestTube2 } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  { label: "Testing", sub: "Runs on real devices", Icon: TestTube2 },
  { label: "Issues", sub: "Findings grouped & scored", Icon: LayoutList },
  { label: "Risk Layer", sub: "One report for release", Icon: ShieldAlert },
] as const;

export function SecurityReportsShiftSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="sr-shift-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-shift-heading"
          title={
            <>
              From Testing to <span className="text-primary">Risk Awareness</span>
            </>
          }
          description="QApilot connects execution outcomes to a structured security narrative your whole team can read."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-3 md:gap-4">
          {STEPS.map((step, i) => (
            <Fragment key={step.label}>
              <div className="flex flex-1 flex-col rounded-2xl border border-border/70 bg-muted/20 p-5 text-center shadow-sm sm:p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-foreground md:text-lg">{step.label}</p>
                <p className="mt-1 text-sm text-muted-foreground md:text-base">{step.sub}</p>
              </div>
              {i < STEPS.length - 1 ? (
                <div className="flex shrink-0 items-center justify-center py-1 sm:flex-col sm:py-0" aria-hidden>
                  <ArrowRight className="h-6 w-6 rotate-90 text-primary/50 sm:rotate-0" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
