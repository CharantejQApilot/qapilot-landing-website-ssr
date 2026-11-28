import Link from "next/link";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  {
    n: "1",
    title: "The app renders",
    body: "The screen runs on a device, in the build that is heading to release. Not a static export of the design file.",
  },
  {
    n: "2",
    title: "The screen is compared",
    body: "Design Testing sets that rendered screen against the UI that was intended.",
  },
  {
    n: "3",
    title: "The team decides",
    body: "Spacing, type, color, and missing pieces are named. Design and QA choose what ships.",
  },
] as const;

export function DesignTestingFitSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="design-testing-fit-heading"
    >
      <div className="section-full relative z-10 py-16 md:py-20 lg:py-24">
        <MarketingSectionHeader
          id="design-testing-fit-heading"
          eyebrow="Where it sits"
          title={
            <>
              Part of the release.{" "}
              <span className="text-primary">Not a side tool.</span>
            </>
          }
          description="The journey still has to work. Design Testing adds whether the screen matches what was approved, on the same devices the rest of QApilot already runs."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm md:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {step.n}
              </p>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl text-base font-medium leading-relaxed text-foreground md:text-lg">
          Ship the screen that was approved.{" "}
          <Link
            href="#design-testing-request"
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
          >
            Request a walkthrough
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
