import {
  AlertTriangle,
  Clock,
  Eye,
  HelpCircle,
  type LucideIcon,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CHALLENGE_ITEMS: { title: string; icon: LucideIcon }[] = [
  { title: "Unclear go / no-go decisions", icon: HelpCircle },
  { title: "Last-minute test delays", icon: Clock },
  { title: "Inconsistent regression cycles", icon: RefreshCw },
  { title: "Poor visibility into real release risk", icon: Eye },
  {
    title: "Fragmented signals across QA, product, and engineering",
    icon: Users,
  },
  { title: "Production issues discovered after launch", icon: AlertTriangle },
];

const RELEASE_OPERATIONS_ITEMS = [
  "Existing sprint cadence",
  "Existing approvals",
  "Existing QA handoffs",
  "Existing launch processes",
];

type Outcome = {
  title: string;
  body: string;
  capabilities: string[];
};

const OUTCOMES: Outcome[] = [
  {
    title: "Make Faster Go / No-Go Decisions",
    body: "Replace scattered updates and unclear test status with structured release readiness signals built from real execution outcomes.",
    capabilities: ["Reporting"],
  },
  {
    title: "Catch Critical Issues Before Production",
    body: "Identify broken flows, slow screens, missing loads, and execution failures before launch windows are missed.",
    capabilities: ["Intelligent Bug Detection"],
  },
  {
    title: "Shorten Pre-Release Validation Cycles",
    body: "Generate and execute sanity coverage faster so teams spend less time waiting before each release.",
    capabilities: ["Autonomous Testing", "Parallel Execution"],
  },
  {
    title: "Reduce Delays Caused by Flaky Automation",
    body: "Unstable tests slow launches and create false alarms. QApilot improves execution resilience with AI healing.",
    capabilities: ["AI Self Healing"],
  },
  {
    title: "Improve Cross-Team Alignment",
    body: "Give QA, engineering, and product teams one shared view of release readiness instead of conflicting updates.",
    capabilities: ["Reporting", "Dashboards"],
  },
  {
    title: "Validate Across Real Mobile Conditions",
    body: "Release with more confidence across devices, OS versions, and app environments.",
    capabilities: ["Device Coverage", "Cloud Execution"],
  },
];

export function ForReleaseManagerSections() {
  return (
    <>
      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="rm-challenge-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="rm-challenge-heading"
            eyebrow="The challenge"
            title={
              <>
                The Challenge Facing{" "}
                <span className="text-primary">Release Managers</span>
              </>
            }
            description={
              <p>
                Every release carries pressure to move fast without breaking
                user experience.
              </p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <p
            className={cn(
              marketingSectionIntroClass,
              "mb-8 font-medium text-foreground/90 md:mb-10",
            )}
          >
            But many teams still face:
          </p>

          <MarketingLedger cols={2} aria-label="Release manager challenges">
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
        aria-labelledby="rm-outcomes-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="rm-outcomes-heading"
            eyebrow="Outcomes"
            title={
              <>
                Outcomes <span className="text-primary">Release Managers</span>{" "}
                Care About
              </>
            }
            description="Structured readiness and resilient automation replace guessing during every launch window."
            marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
          />

          <MarketingLedger cols={2} aria-label="Release manager outcomes">
            {OUTCOMES.map((outcome) => (
              <MarketingLedgerCell key={outcome.title}>
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {outcome.title}
                </h3>
                <p className={cn(marketingSectionIntroClass, "mt-4")}>
                  {outcome.body}
                </p>
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
        aria-labelledby="rm-release-ops-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="rm-release-ops-heading"
            eyebrow="Release ops"
            title={
              <>
                Fits Into{" "}
                <span className="text-primary">
                  Existing Release Operations
                </span>
              </>
            }
            description={
              <p>
                Improve release decisions without changing current release
                governance.
              </p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {RELEASE_OPERATIONS_ITEMS.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex gap-3 rounded-2xl border border-border/80 bg-card/80 px-4 py-3.5 shadow-sm backdrop-blur-sm md:px-5 md:py-4",
                  "motion-safe:hover:border-primary/25",
                )}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span className="text-base leading-relaxed text-foreground/90 md:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
        aria-labelledby="rm-why-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <div className="sig-close">
            <MarketingSectionHeader
              id="rm-why-heading"
              eyebrow="Why QApilot"
              title={
                <>
                  Why Release Managers Choose{" "}
                  <span className="text-primary">QApilot</span>
                </>
              }
              description="Because releases should be delayed only by real risk. Not unclear testing signals. QApilot helps Release Managers move faster with stronger confidence."
              marginBottomClassName="mb-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
