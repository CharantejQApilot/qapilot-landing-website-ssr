import {
  AlertTriangle,
  Clock,
  Eye,
  Layers,
  type LucideIcon,
  Repeat,
  Smartphone,
} from "lucide-react";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CHALLENGE_ITEMS: { title: string; icon: LucideIcon }[] = [
  { title: "High maintenance automation suites", icon: Layers },
  { title: "Flaky tests that teams stop trusting", icon: AlertTriangle },
  { title: "Slow regression cycles before releases", icon: Clock },
  { title: "Growing device / OS fragmentation", icon: Smartphone },
  { title: "Limited release visibility", icon: Eye },
  { title: "Too much effort spent maintaining tests", icon: Repeat },
];

const STACK_ITEMS = [
  "CI/CD pipelines",
  "Jira workflows",
  "Cloud device providers",
  "Existing automation investments",
  "Manual QA processes",
  "Brownfield engineering environments",
];

type Outcome = {
  title: string;
  body: string;
  capabilities: string[];
};

const OUTCOMES: Outcome[] = [
  {
    title: "Reduce Test Maintenance Overhead",
    body: "UI changes and unstable locators create constant upkeep. QApilot uses intelligent healing and resilient execution to reduce breakage and lower maintenance effort.",
    capabilities: ["AI Self Healing"],
  },
  {
    title: "Expand Coverage Without Expanding Team Size",
    body: "Manual scripting slows coverage growth. QApilot autonomously explores the app and generates usable sanity coverage faster.",
    capabilities: ["Autonomous Testing"],
  },
  {
    title: "Improve Release Confidence Before Every Launch",
    body: "Passing tests alone do not guarantee readiness. QApilot detects broken flows, latency issues, and quality risks before production.",
    capabilities: ["Intelligent Bug Detection", "Security Reports"],
  },
  {
    title: "Accelerate Debugging and RCA",
    body: "Failures waste time when evidence is missing. QApilot captures logs, screenshots, network traces, and device metrics for faster diagnosis.",
    capabilities: ["Reporting", "Network Traces", "Device Metrics"],
  },
  {
    title: "Support Modern Mobile Architectures Like Flutter",
    body: "Legacy tools often struggle with Flutter apps. QApilot is purpose-built for mobile environments and supports Flutter workflows reliably.",
    capabilities: ["Flutter Testing"],
  },
  {
    title: "Create Better Quality Signals Across Teams",
    body: "Turn noisy test outputs into clearer readiness signals for engineering, product, and release stakeholders.",
    capabilities: ["Reporting"],
  },
];

export function ForQALeaderSections() {
  return (
    <>
      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="qe-challenge-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qe-challenge-heading"
            eyebrow="The challenge"
            title={
              <>
                The Challenge Facing{" "}
                <span className="text-primary">QE Leaders</span>
              </>
            }
            description={
              <p>
                Quality engineering teams are expected to move faster, test
                more, and block fewer releases. Often without additional
                headcount.
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
            But traditional testing stacks create drag:
          </p>

          <MarketingLedger cols={2} aria-label="QE leader challenges">
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
        aria-labelledby="qe-outcomes-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qe-outcomes-heading"
            eyebrow="Outcomes"
            title={
              <>
                Outcomes <span className="text-primary">QE Leaders</span> Care
                About
              </>
            }
            description="What changes when autonomous exploration, healing, and structured signals replace brittle script-only automation."
            marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
          />

          <MarketingLedger cols={2} aria-label="QE leader outcomes">
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
        aria-labelledby="qe-stack-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="qe-stack-heading"
            eyebrow="Your stack"
            title={
              <>
                Works With Your{" "}
                <span className="text-primary">Existing Stack</span>
              </>
            }
            description={
              <p>
                QApilot fits into enterprise environments without
                rip-and-replace.
              </p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {STACK_ITEMS.map((item) => (
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
          <p className={cn(marketingSectionIntroClass, "mt-8 w-full")}>
            Adopt progressively while preserving current workflows.
          </p>
        </div>
      </section>

      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
        aria-labelledby="qe-why-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <div className="sig-close">
            <MarketingSectionHeader
              id="qe-why-heading"
              eyebrow="Why QApilot"
              title={
                <>
                  Why QE Leaders Choose{" "}
                  <span className="text-primary">QApilot</span>
                </>
              }
              description="Because quality engineering should improve release velocity. Not become the bottleneck. QApilot helps leaders move from maintenance-heavy operations to scalable mobile release readiness."
              marginBottomClassName="mb-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
