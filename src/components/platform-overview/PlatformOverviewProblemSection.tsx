import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, LayoutGrid, Workflow } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const BLOCKS: readonly {
  title: string;
  sublabel: string;
  Icon: LucideIcon;
  body: ReactNode;
}[] = [
  {
    title: "Coverage is Incomplete",
    sublabel: "Fragmented Mobile Ecosystem",
    Icon: LayoutGrid,
    body: (
      <>
        Mobile apps must work across{" "}
        <strong className="font-semibold text-primary">
          devices, OS versions, network conditions, and user behaviors
        </strong>
        . Predefined test cases capture only a{" "}
        <strong className="font-semibold text-primary">fraction of real-world usage</strong>.
      </>
    ),
  },
  {
    title: "Execution is Fragile",
    sublabel: "Brittle Tests And Changing UI",
    Icon: Workflow,
    body: (
      <>
        <strong className="font-semibold text-primary">Small changes</strong> in UI or flows break tests.
        Maintaining test suites becomes a{" "}
        <strong className="font-semibold text-primary">constant effort</strong>.
      </>
    ),
  },
  {
    title: "Signals are Noisy or Missing",
    sublabel: "Lack Of Meaningful Runtime Insights",
    Icon: Activity,
    body: (
      <>
        Failures often lack context. Critical signals like{" "}
        <strong className="font-semibold text-primary">
          accessibility issues, action latency, and page load failures
        </strong>{" "}
        are either missed or hard to interpret.
      </>
    ),
  },
];

export function PlatformOverviewProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="platform-problem-heading"
    >
      <div className="section-full pt-10 md:pt-14 2xl:pt-16">
        <MarketingSectionHeader
          id="platform-problem-heading"
          title={
            <>
              The Mobile App Testing <span className="text-primary">Problem</span>
            </>
          }
          description="Mobile testing challenges don't exist in isolation."
        />
      </div>

      {/* Full-bleed cream + overlays — same as homepage “In their words” */}
      <div className="relative mt-10 overflow-hidden section-cream py-10 md:mt-12 md:py-12 2xl:mt-14 2xl:py-14">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle" aria-hidden />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <svg className="absolute inset-0 h-full w-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="platform-problem-diagonal"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(15)"
              >
                <line x1="0" y1="0" x2="0" y2="24" stroke="hsl(var(--foreground))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#platform-problem-diagonal)" />
          </svg>
        </div>

        <div className="section-full relative z-10">
          <MarketingLedger cols={3} aria-label="Mobile testing problems">
            {BLOCKS.map((block) => {
              const Icon = block.Icon;
              return (
                <MarketingLedgerCell key={block.title}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-primary md:h-14 md:w-14">
                    <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground md:text-xl 2xl:text-2xl">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground md:text-[0.8125rem]">
                    {block.sublabel}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg 2xl:text-xl">
                    {block.body}
                  </p>
                </MarketingLedgerCell>
              );
            })}
          </MarketingLedger>
        </div>
      </div>

      <div className="section-full border-t border-border/50 pt-8 pb-10 md:pt-10 md:pb-12 2xl:pt-12 2xl:pb-14">
        <p className="max-w-none text-left text-lg font-medium leading-snug tracking-tight text-foreground md:text-xl lg:text-xl lg:whitespace-nowrap lg:leading-tight xl:text-2xl">
          Solving any one of these in isolation isn&apos;t enough. Reliable mobile testing requires addressing all three -{" "}
          <span className="font-semibold text-primary">together</span>.
        </p>
      </div>
    </section>
  );
}
