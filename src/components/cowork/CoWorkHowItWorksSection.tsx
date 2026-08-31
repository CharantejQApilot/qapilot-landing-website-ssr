import type { ReactNode } from "react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

type Step = {
  id: string;
  number: string;
  title: ReactNode;
  body: string;
  bullets?: string[];
};

const STEPS: Step[] = [
  {
    id: "import",
    number: "01",
    title: "Import Existing Tests",
    body: "Bring test cases from Jira, TestRail, spreadsheets, or other test management tools.",
  },
  {
    id: "context",
    number: "02",
    title: "Build Execution Context",
    body: "CoWork converts natural-language test cases into structured BDD context. It understands:",
    bullets: ["Where the test starts", "What actions must happen", "What outcome should be validated"],
  },
  {
    id: "execute",
    number: "03",
    title: "Execute on Real Devices",
    body: "CoWork builds an execution plan and begins running the test. No scripts required.",
  },
  {
    id: "replan",
    number: "04",
    title: "Replan When Reality Changes",
    body: "Unexpected popup? Different screen? Changed flow? CoWork proposes the next best action and requests approval before proceeding.",
  },
  {
    id: "complete",
    number: "05",
    title: "Complete the Journey",
    body: "When user input is required, CoWork pauses and asks. When the input arrives, execution resumes. The test continues without losing context.",
  },
];

export function CoWorkHowItWorksSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60"
      aria-labelledby="cowork-how-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="cowork-how-heading"
          title={
            <>
              How <span className="text-primary">CoWork</span> Works
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <ol className="relative space-y-0">
          <div
            className="absolute bottom-8 left-[1.125rem] top-8 w-px bg-gradient-to-b from-border via-primary/25 to-primary/50 md:left-[1.375rem]"
            aria-hidden
          />
          {STEPS.map((step) => (
            <li key={step.id} className="relative pl-12 pb-10 last:pb-0 md:pl-14 md:pb-12">
              <span
                className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 md:h-11 md:w-11 md:text-sm"
                aria-hidden
              >
                {step.number}
              </span>
              <div className="rounded-2xl border border-border/80 bg-background/90 p-5 shadow-sm sm:p-6 md:p-7">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step.body}
                </p>
                {step.bullets ? (
                  <ul className="mt-4 space-y-2 text-sm text-foreground md:text-base">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-primary" aria-hidden>·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
