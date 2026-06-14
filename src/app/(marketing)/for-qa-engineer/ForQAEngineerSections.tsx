import {
  AlertTriangle,
  Clock,
  Compass,
  Eye,
  Smartphone,
  type LucideIcon,
  Wrench,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CHALLENGE_ITEMS: { title: string; icon: LucideIcon }[] = [
  { title: "Fixing broken automation after UI changes", icon: Wrench },
  { title: "Slow test creation for new features", icon: Clock },
  { title: "Flaky failures that waste debugging time", icon: AlertTriangle },
  { title: "Limited visibility into root causes", icon: Eye },
  { title: "Device and OS fragmentation", icon: Smartphone },
  { title: "Less time for exploratory testing", icon: Compass },
];

const BUILT_ITEMS = [
  "Validate new features quickly",
  "Investigate failures with clear evidence",
  "Re-run tests confidently after changes",
  "Spend less time maintaining scripts",
  "Keep focus on quality, not tooling friction",
];

type Outcome = {
  title: string;
  body: string;
  capabilities: string[];
};

const OUTCOMES: Outcome[] = [
  {
    title: "Spend Less Time Fixing Broken Tests",
    body: "UI changes and unstable locators frequently break scripts. QApilot uses AI self-healing and resilient execution to reduce maintenance effort.",
    capabilities: ["AI Self Healing"],
  },
  {
    title: "Create Coverage Faster",
    body: "New releases need fast validation. QApilot's autonomous crawler explores the app and generates usable sanity coverage quickly.",
    capabilities: ["Autonomous Testing"],
  },
  {
    title: "Debug Failures Faster",
    body: "Missing evidence slows triage. QApilot captures screenshots, logs, network traces, and device metrics so engineers can diagnose issues quickly.",
    capabilities: ["Reporting", "Network Traces", "Device Metrics"],
  },
  {
    title: "Catch Real Issues Earlier",
    body: "Surface broken flows, latency issues, missing loads, and execution failures before production.",
    capabilities: ["Intelligent Bug Detection"],
  },
  {
    title: "Test Modern Mobile Apps More Reliably",
    body: "Legacy tools often struggle with evolving mobile stacks. QApilot is purpose-built for mobile environments, including Flutter apps.",
    capabilities: ["Flutter Testing"],
  },
  {
    title: "Focus on Higher-Value QA Work",
    body: "Reduce repetitive setup and maintenance so more time goes into exploratory testing, edge cases, and improving product quality.",
    capabilities: ["Autonomous Testing", "AI Self Healing"],
  },
];

export function ForQAEngineerSections() {
  return (
    <>
      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="qa-eng-challenge-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qa-eng-challenge-heading"
            eyebrow="The challenge"
            title={
              <>
                The Challenge Facing <span className="text-primary">Quality Assurance Engineers</span>
              </>
            }
            description={
              <p>
                QA Engineers are often closest to release pressure—but spend too much time on repetitive testing work.
              </p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <p className={cn(marketingSectionIntroClass, "mb-8 font-medium text-foreground/90 md:mb-10")}>
            Common challenges include:
          </p>

          <ul className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
            {CHALLENGE_ITEMS.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className={cn(
                  "relative flex gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-7",
                  "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
                )}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 self-center text-base font-medium leading-snug text-foreground md:text-lg">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="qa-eng-outcomes-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qa-eng-outcomes-heading"
            eyebrow="Outcomes"
            title={
              <>
                Outcomes <span className="text-primary">Quality Assurance Engineers</span> Care About
              </>
            }
            description="Healing, autonomous coverage, and evidence-rich runs change what a QA engineer can deliver in a single sprint."
            marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
          />

          <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
            {OUTCOMES.map((outcome) => (
              <article
                key={outcome.title}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8",
                  "motion-safe:hover:border-primary/30",
                )}
              >
                <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/90" aria-hidden />
                <div className="pl-4 md:pl-5">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {outcome.title}
                  </h3>
                  <p className={cn(marketingSectionIntroClass, "mt-4")}>{outcome.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {outcome.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="qa-eng-built-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qa-eng-built-heading"
            eyebrow="Day-to-day"
            title={
              <>
                Built for How <span className="text-primary">Engineers</span> Actually Work
              </>
            }
            description={
              <p>QApilot helps QA Engineers move faster inside real delivery environments.</p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {BUILT_ITEMS.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex gap-3 rounded-2xl border border-border/80 bg-card/80 px-4 py-3.5 shadow-sm backdrop-blur-sm md:px-5 md:py-4",
                  "motion-safe:hover:border-primary/25",
                )}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-base leading-relaxed text-foreground/90 md:text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
        aria-labelledby="qa-eng-why-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qa-eng-why-heading"
            eyebrow="Why QApilot"
            title={
              <>
                Why QA Engineers Choose <span className="text-primary">QApilot</span>
              </>
            }
            description="Because engineers should spend time improving product quality—not babysitting brittle tests—QApilot helps QA Engineers move faster with less friction."
            marginBottomClassName="mb-0"
          />
        </div>
      </section>
    </>
  );
}
