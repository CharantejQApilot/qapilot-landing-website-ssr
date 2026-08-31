import { Fragment } from "react";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeSeam } from "@/components/home/HomeSeam";
import {
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const STEPS = [
  "Upload Build",
  "Knowledge Graph",
  "Test Generation",
  "Test Execution",
  "Release Ready",
] as const;

function StepNode() {
  return (
    <div
      className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary bg-background"
      aria-hidden
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
          ? "relative mb-10 md:mb-12 2xl:mb-14 w-full overflow-hidden rounded-md border border-border"
          : "relative overflow-hidden home-tint section-edge w-full"
      }
    >
      {embedded ? null : <HomeSeam />}
      <div
        className={
          embedded
            ? "relative w-full px-4 py-8 sm:px-6 md:px-8 md:py-10 2xl:py-12"
            : "section-full relative py-16 md:py-20 lg:py-24"
        }
      >
        <header className={embedded ? "mb-8 md:mb-10" : "mb-10 md:mb-12"}>
          <HomeEyebrow>Pipeline</HomeEyebrow>
          <h2
            id="release-readiness-flow-heading"
            className={cn(
              marketingSectionH2Class,
              "mb-0 text-left text-foreground",
            )}
          >
            From Build to{" "}
            <span className="text-primary">Release Readiness</span>
          </h2>
          <p
            className={cn(
              marketingSectionIntroClass,
              "mt-4 w-full min-w-0 max-w-none px-0 text-left md:mt-5",
            )}
          >
            Trace every stage from build upload to release sign-off. Structured
            visibility so teams always know where quality stands.
          </p>
        </header>

        <div className="relative mx-auto max-w-lg md:hidden">
          <div
            className="pointer-events-none absolute bottom-4 left-[13px] top-4 z-0 w-px bg-border"
            aria-hidden
          />
          <ol className="relative z-[1] flex list-none flex-col">
            {STEPS.map((label, index) => {
              return (
                <Fragment key={label}>
                  {index > 0 ? (
                    <li className="list-none" aria-hidden="true">
                      <div className="h-4" />
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

        <div className="relative hidden md:block">
          <div
            className="pointer-events-none absolute left-[1.125rem] right-[1.125rem] top-[13px] z-0 h-px bg-border"
            aria-hidden
          />
          <ol className="relative z-[1] flex list-none flex-row items-start justify-between gap-0">
            {STEPS.map((label, index) => {
              return (
                <li
                  key={label}
                  className="relative z-[1] flex min-w-0 flex-1 list-none flex-col items-center text-center"
                >
                  <StepNode />
                  <span
                    className={`mt-3 px-1 text-sm font-semibold leading-tight tracking-tight ${
                      isLastStep(index) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Tag>
  );
}
