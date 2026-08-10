import {
  Activity,
  AlertTriangle,
  Eye,
  type LucideIcon,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CHALLENGE_ITEMS: { title: string; icon: LucideIcon }[] = [
  { title: "Releases introducing preventable user-facing issues", icon: AlertTriangle },
  { title: "Limited pre-release visibility into mobile risk", icon: Eye },
  { title: "Incidents caused by broken critical flows", icon: Zap },
  { title: "Slow diagnosis when failures surface post-release", icon: Search },
  { title: "Poor alignment between QA, engineering, and operations", icon: Users },
  { title: "Growing pressure to maintain uptime during fast release cycles", icon: Activity },
];

const BUILT_ITEMS = [
  "Improve confidence before deployments",
  "Prevent incidents tied to poor releases",
  "Investigate failures faster with better evidence",
  "Support velocity without sacrificing stability",
  "Strengthen collaboration across delivery teams",
];

type Outcome = {
  title: string;
  body: string;
  capabilities: string[];
};

const OUTCOMES: Outcome[] = [
  {
    title: "Reduce Release-Caused Incidents",
    body: "Catch broken flows, failed actions, slow screens, and loading issues before production deployments.",
    capabilities: ["Intelligent Bug Detection"],
  },
  {
    title: "Strengthen Pre-Release Risk Signals",
    body: "Move beyond pass/fail test summaries with clearer readiness signals before launch.",
    capabilities: ["Reporting", "Autonomous Testing"],
  },
  {
    title: "Improve Incident Prevention",
    body: "Validate critical customer journeys early so operational issues are less likely to reach production.",
    capabilities: ["Autonomous Testing"],
  },
  {
    title: "Accelerate Root Cause Analysis",
    body: "When failures occur, faster evidence matters. QApilot captures screenshots, logs, network traces, and device metrics for quicker triage.",
    capabilities: ["Reporting", "Network Traces", "Device Metrics"],
  },
  {
    title: "Support Fast Release Cadence Safely",
    body: "As teams ship more frequently, QApilot helps maintain confidence without slowing delivery velocity.",
    capabilities: ["AI Self Healing", "Parallel Execution"],
  },
  {
    title: "Improve Cross-Functional Reliability Ownership",
    body: "Give QA, engineering, release, and operations teams shared visibility into release quality.",
    capabilities: ["Reporting"],
  },
];

export function ForSRESections() {
  return (
    <>
      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="sre-challenge-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="sre-challenge-heading"
            eyebrow="The challenge"
            title={
              <>
                The Challenge Facing <span className="text-primary">SRE Teams</span>
              </>
            }
            description={
              <p>Reliability is often impacted long before production incidents begin.</p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <p className={cn(marketingSectionIntroClass, "mb-8 font-medium text-foreground/90 md:mb-10")}>
            Common challenges include:
          </p>

          <MarketingLedger cols={2} aria-label="SRE challenges">
            {CHALLENGE_ITEMS.map(({ title, icon: Icon }) => (
              <MarketingLedgerCell key={title} className="flex gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 self-center text-base font-medium leading-snug text-foreground md:text-lg">
                  {title}
                </span>
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="sre-outcomes-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="sre-outcomes-heading"
            eyebrow="Outcomes"
            title={
              <>
                Outcomes <span className="text-primary">SRE Teams</span> Care About
              </>
            }
            description="Stronger pre-release signals and faster evidence shorten the path from code to confident deploy."
            marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
          />

          <MarketingLedger cols={2} aria-label="SRE outcomes">
            {OUTCOMES.map((outcome) => (
              <MarketingLedgerCell key={outcome.title}>
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
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="sre-built-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="sre-built-heading"
            eyebrow="Operations"
            title={
              <>
                Built for <span className="text-primary">Reliability Operations</span>
              </>
            }
            description={<p>QApilot helps SRE teams reduce avoidable production risk.</p>}
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
        aria-labelledby="sre-why-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <div className="sig-close">
            <MarketingSectionHeader
              id="sre-why-heading"
              eyebrow="Why QApilot"
              title={
                <>
                  Why SRE Teams Choose <span className="text-primary">QApilot</span>
                </>
              }
              description="Because reliability starts before production—QApilot helps SRE teams reduce operational risk through stronger mobile release readiness."
              marginBottomClassName="mb-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
