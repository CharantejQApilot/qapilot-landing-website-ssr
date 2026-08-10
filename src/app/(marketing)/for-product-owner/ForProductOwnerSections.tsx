import {
  Bug,
  Clock,
  Eye,
  Hourglass,
  ShieldAlert,
  type LucideIcon,
  Users,
} from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const CHALLENGE_ITEMS: { title: string; icon: LucideIcon }[] = [
  { title: "Release delays caused by late QA cycles", icon: Clock },
  { title: "Bugs discovered after launch", icon: Bug },
  { title: "Limited visibility into release readiness", icon: Eye },
  { title: "Slow validation of new features", icon: Hourglass },
  { title: "Cross-functional misalignment before launch", icon: Users },
  { title: "Customer trust impacted by poor releases", icon: ShieldAlert },
];

const BUILT_ITEMS = [
  "Validate critical journeys before launch",
  "Reduce blockers caused by unclear QA status",
  "Improve confidence during release planning",
  "Align teams around shared readiness signals",
  "Launch faster with lower quality risk",
];

type Outcome = {
  title: string;
  body: string;
  capabilities: string[];
};

const OUTCOMES: Outcome[] = [
  {
    title: "Launch Features With More Confidence",
    body: "Know whether critical user journeys are working before release instead of relying on fragmented status updates.",
    capabilities: ["Reporting", "Autonomous Testing"],
  },
  {
    title: "Reduce Last-Minute Release Delays",
    body: "Generate and execute sanity coverage faster so launches are not blocked by long validation cycles.",
    capabilities: ["Autonomous Testing", "Parallel Execution"],
  },
  {
    title: "Catch User-Impacting Issues Earlier",
    body: "Surface broken flows, slow screens, missing loads, and execution failures before customers experience them.",
    capabilities: ["Intelligent Bug Detection"],
  },
  {
    title: "Improve Visibility Across Teams",
    body: "Give product, QA, and engineering teams one shared view of readiness before launch.",
    capabilities: ["Reporting"],
  },
  {
    title: "Move Faster Across Frequent Releases",
    body: "Support faster release cadences without increasing quality risk.",
    capabilities: ["AI Self Healing", "Autonomous Testing"],
  },
  {
    title: "Protect Customer Trust and Experience",
    body: "Better release quality means fewer production issues, fewer escalations, and stronger user confidence.",
    capabilities: ["Intelligent Bug Detection", "Security Reports"],
  },
];

export function ForProductOwnerSections() {
  return (
    <>
      <section
        className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
        aria-labelledby="pm-challenge-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="pm-challenge-heading"
            eyebrow="The challenge"
            title={
              <>
                The Challenge Facing <span className="text-primary">Product Managers</span>
              </>
            }
            description={
              <p>
                Shipping product is not just about building features—it is about launching them reliably.
              </p>
            }
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <p className={cn(marketingSectionIntroClass, "mb-8 font-medium text-foreground/90 md:mb-10")}>
            Common challenges include:
          </p>

          <MarketingLedger cols={2} aria-label="Product manager challenges">
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
        aria-labelledby="pm-outcomes-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="pm-outcomes-heading"
            eyebrow="Outcomes"
            title={
              <>
                Outcomes <span className="text-primary">Product Managers</span> Care About
              </>
            }
            description="Clear readiness signals and faster validation loops keep roadmap cadence tied to real quality."
            marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
          />

          <MarketingLedger cols={2} aria-label="Product manager outcomes">
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
        aria-labelledby="pm-built-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="pm-built-heading"
            eyebrow="Delivery"
            title={
              <>
                Built for <span className="text-primary">Product Delivery</span> Rhythm
              </>
            }
            description={<p>QApilot helps Product Managers keep launches moving.</p>}
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
        aria-labelledby="pm-why-heading"
      >
        <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
          <div className="sig-close">
            <MarketingSectionHeader
              id="pm-why-heading"
              eyebrow="Why QApilot"
              title={
                <>
                  Why Product Managers Choose <span className="text-primary">QApilot</span>
                </>
              }
              description="Because product velocity only matters when releases work—QApilot helps Product Managers ship faster with stronger confidence."
              marginBottomClassName="mb-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
