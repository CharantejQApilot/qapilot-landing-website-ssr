import { Fragment } from "react";
import {
  marketingEyebrowClass,
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const STEPS = [
  "Upload Build",
  "Knowledge Graph",
  "App Sitemap",
  "Test Generation",
  "Record & Playback",
  "Test Execution",
  "Reporting",
  "Release Ready",
] as const;

function StepNode() {
  return (
    <div
      className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
      aria-hidden
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
    </div>
  );
}

function isLastStep(index: number) {
  return index === STEPS.length - 1;
}

export type ReleaseReadinessFlowSectionProps = {
  /** When true, styled to sit inside VelocitySection (no full-bleed section chrome). */
  embedded?: boolean;
};

export default function ReleaseReadinessFlowSection({
  embedded = false,
}: ReleaseReadinessFlowSectionProps) {
  const Tag = embedded ? "div" : "section";
  return (
    <Tag
      {...(embedded ? { role: "region" as const } : {})}
      aria-labelledby="release-readiness-flow-heading"
      className={
        embedded
          ? "relative mb-10 md:mb-12 2xl:mb-14 w-full overflow-hidden rounded-2xl border border-border/60 bg-dot-pattern-subtle"
          : "relative overflow-hidden border-t border-border/60 bg-dot-pattern-subtle section-edge w-full"
      }
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/30 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className={
          embedded
            ? "relative w-full px-4 py-8 sm:px-6 md:px-8 md:py-10 2xl:py-12"
            : "section-full relative py-12 md:py-14 2xl:py-16"
        }
      >
        <header className={embedded ? "mb-8 md:mb-10" : "mb-10 md:mb-12"}>
          <p className={cn(marketingEyebrowClass, "text-center")}>Pipeline</p>
          <h2
            id="release-readiness-flow-heading"
            className={cn(
              marketingSectionH2Class,
              "mb-0 text-center text-foreground",
            )}
          >
            From Build to{" "}
            <span className="text-primary">Release Readiness</span>
          </h2>
          <p
            className={cn(
              marketingSectionIntroClass,
              "mx-auto mt-4 w-full min-w-0 max-w-none px-2 text-center md:mt-5",
            )}
          >
            Trace every stage from build upload to release sign-off. Structured
            visibility so teams always know where quality stands.
          </p>
        </header>

        {/* Small screens: vertical pipeline (no cards); rail lives outside <ol> for valid HTML */}
        <div className="relative mx-auto max-w-lg md:hidden">
          <div
            className="pointer-events-none absolute bottom-4 left-[13px] top-4 z-0 w-px bg-gradient-to-b from-primary/25 via-border to-primary/25"
            aria-hidden
          />
          <ol className="relative z-[1] flex list-none flex-col">
            {STEPS.map((label, index) => {
              return (
                <Fragment key={label}>
                  {index > 0 ? (
                    <li className="list-none" aria-hidden="true">
                      <div className="h-3" />
                    </li>
                  ) : null}
                  <li className="list-none">
                    <div className="flex items-center gap-4">
                      <div className="relative z-[1] flex w-7 shrink-0 justify-center">
                        <StepNode />
                      </div>
                      <span
                        className={`min-w-0 text-sm font-semibold leading-snug sm:text-base ${
                          isLastStep(index) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </div>

        {/* md–xl: horizontal scroll, edge fade */}
        <div
          className={
            embedded
              ? "relative hidden md:block xl:hidden"
              : "relative hidden md:block xl:hidden md:-mx-12 lg:-mx-16"
          }
        >
          <div
            className="pointer-events-none absolute inset-y-2 left-0 z-10 w-10 bg-gradient-to-r from-background via-background/90 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-2 right-0 z-10 w-10 bg-gradient-to-l from-background via-background/90 to-transparent"
            aria-hidden
          />
          <div
            className={`snap-x snap-mandatory overflow-x-auto overflow-y-visible overscroll-x-contain [-webkit-overflow-scrolling:touch] pb-3 pt-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/80 ${
              embedded ? "px-1 sm:px-2" : "px-6 sm:px-8 md:px-12 lg:px-16"
            }`}
          >
            <div className="relative mx-auto min-w-min max-w-max">
              <div
                className="pointer-events-none absolute left-[calc(0.875rem+4px)] right-[calc(0.875rem+4px)] top-[13px] z-0 h-px bg-gradient-to-r from-primary/25 via-border to-primary/25"
                aria-hidden
              />
              <ol className="relative z-[1] flex list-none flex-row flex-nowrap items-start justify-start gap-0">
                {STEPS.map((label, index) => {
                  return (
                    <Fragment key={label}>
                      {index > 0 ? (
                        <li
                          className="flex list-none items-start justify-center pt-[9px]"
                          aria-hidden="true"
                        >
                          <div className="flex w-10 shrink-0 items-center self-center px-0.5 sm:w-12">
                            <span className="h-px min-h-px w-full min-w-[2px] bg-border/80" />
                          </div>
                        </li>
                      ) : null}
                      <li className="flex w-[7.5rem] shrink-0 snap-start list-none flex-col items-center text-center sm:w-[8.25rem]">
                        <StepNode />
                        <span
                          className={`mt-3 px-1 text-[0.8125rem] font-semibold leading-tight tracking-tight ${
                            isLastStep(index)
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {label}
                        </span>
                      </li>
                    </Fragment>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* xl+: full-width horizontal pipeline */}
        <div className="relative hidden xl:block">
          <div
            className="pointer-events-none absolute left-[1.125rem] right-[1.125rem] top-[13px] z-0 h-px bg-gradient-to-r from-primary/25 via-border to-primary/25"
            aria-hidden
          />
          <ol className="relative z-[1] flex list-none flex-row items-start justify-center gap-0">
            {STEPS.map((label, index) => {
              return (
                <Fragment key={label}>
                  {index > 0 ? (
                    <li
                      className="relative z-[1] flex min-h-0 min-w-0 list-none flex-1 flex-row items-start justify-center pt-[9px]"
                      aria-hidden="true"
                    >
                      <div className="flex min-w-0 max-w-[3.5rem] flex-1 items-center px-0.5 2xl:max-w-[4.5rem]">
                        <span className="h-px min-h-px min-w-[2px] flex-1 bg-border/80" />
                      </div>
                    </li>
                  ) : null}
                  <li className="relative z-[1] flex w-[min(11vw,9.25rem)] shrink-0 list-none flex-col items-center text-center 2xl:w-auto 2xl:min-w-0 2xl:flex-1">
                    <StepNode />
                    <span
                      className={`mt-3 px-0.5 text-[0.8125rem] font-semibold leading-tight tracking-tight 2xl:text-[0.9375rem] ${
                        isLastStep(index) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </Tag>
  );
}
