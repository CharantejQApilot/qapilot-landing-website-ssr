import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Cpu,
  ListChecks,
  Map,
  MousePointer2,
  Share2,
  Upload,
} from "lucide-react";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Upload Your App",
    description: "Start by uploading your Android or iOS app.",
    Icon: Upload,
  },
  {
    title: "Generate Knowledge Graph",
    description:
      "QApilot's crawler autonomously explores the app to produce a comprehensive knowledge graph of screens, transitions and states.",
    Icon: Share2,
  },
  {
    title: "Generate the Sitemap",
    description:
      "The network of intelligent agents builds a sitemap, prioritising critical paths and capturing edge cases.",
    Icon: Map,
  },
  {
    title: "Test Case Generation",
    description:
      "Agents convert the knowledge graph into structured test cases, ready for execution.",
    Icon: ListChecks,
  },
  {
    title: "Record & Playback",
    description:
      'A "human in the loop" module lets you record bespoke flows or override AI decisions when needed.',
    Icon: MousePointer2,
  },
  {
    title: "Test Execution",
    description:
      "Execute tests across real devices and cloud farms in parallel.",
    Icon: Cpu,
  },
  {
    title: "Reporting",
    description:
      "Receive detailed reports with coverage metrics, performance analytics and actionable insights.",
    Icon: BarChart3,
  },
];

/** Hero-inspired flowing paths. Dashed stroke offset animation */
function QualityJourneyFlowSvgPrimary() {
  return (
    <svg
      className="pointer-events-none absolute -right-[6%] -top-[4%] h-[min(92%,540px)] w-[min(72%,420px)] text-primary motion-reduce:opacity-40 sm:-right-[2%] lg:h-[min(88%,580px)] lg:w-[min(68%,460px)]"
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="quality-journey-flow-a"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="hsl(var(--primary))"
            stopOpacity={0.32}
          />
          <stop
            offset="50%"
            stopColor="hsl(var(--primary))"
            stopOpacity={0.1}
          />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g
        stroke="url(#quality-journey-flow-a)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path
          strokeDasharray="10 22"
          d="M 48 248 C 108 72 210 40 368 128 C 412 208 328 372 168 392"
          className="animate-journey-decor-flow motion-reduce:animate-none"
        />
        <path
          strokeDasharray="8 18"
          d="M 392 288 C 248 232 88 148 28 52"
          className="animate-journey-decor-flow-slow motion-reduce:animate-none [animation-direction:reverse]"
        />
      </g>
    </svg>
  );
}

function QualityJourneyFlowSvgSecondary() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-[6%] -left-[4%] h-[min(48%,300px)] w-[min(52%,320px)] text-primary motion-reduce:opacity-35 lg:bottom-0 lg:left-0"
      viewBox="0 0 280 280"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="quality-journey-flow-b"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor="hsl(var(--primary))"
            stopOpacity={0.28}
          />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        stroke="url(#quality-journey-flow-b)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray="7 16"
        d="M 24 248 Q 128 132 252 36"
        className="animate-journey-decor-flow-slow motion-reduce:animate-none"
      />
    </svg>
  );
}

export function PlatformOverviewQualityJourneySection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="platform-quality-journey-heading"
    >
      <MarketingBackground variant="soft" className="z-0" />

      <div className="section-full relative z-[1] pt-10 pb-10 md:pt-14 md:pb-14 2xl:pt-16 2xl:pb-16">
        <MarketingSectionHeader
          id="platform-quality-journey-heading"
          title={
            <>
              Your Journey For{" "}
              <span className="text-primary">Mobile App Quality</span>
            </>
          }
        />

        <div className="relative mt-10 w-full md:mt-12 2xl:mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted/[0.08] p-5 shadow-sm sm:p-7 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
            {/* Hero-adjacent atmosphere: mesh, grain, flowing SVGs, soft orbs, vignette */}
            <div
              className="pointer-events-none absolute inset-0 bg-journey-mesh-animated opacity-[0.85]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-hero-grain opacity-[0.32]"
              aria-hidden
            />
            <QualityJourneyFlowSvgPrimary />
            <QualityJourneyFlowSvgSecondary />
            <span
              className="hero-corner-orb pointer-events-none absolute -left-24 -top-28 h-60 w-60 rounded-full bg-primary/[0.05]"
              style={{ boxShadow: "0 0 110px 65px hsl(218 65% 28% / 0.07)" }}
              aria-hidden
            />
            <span
              className="hero-corner-orb pointer-events-none absolute -bottom-32 -right-20 h-52 w-52 rounded-full bg-primary/[0.045]"
              style={{
                boxShadow: "0 0 95px 55px hsl(218 65% 28% / 0.08)",
                animationDelay: "-7s",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 hero-vignette opacity-[0.85]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/78 via-transparent to-muted/28"
              aria-hidden
            />

            <div className="relative z-10">
              <MarketingLedger
                cols={2}
                aria-label="Mobile app quality journey steps"
              >
                {STEPS.map((step, index) => {
                  const Icon = step.Icon;
                  const stepNum = index + 1;
                  return (
                    <MarketingLedgerCell
                      key={step.title}
                      as="div"
                      className="bg-background/55"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/90 shadow-sm md:h-12 md:w-12">
                          <Icon
                            className="h-4 w-4 text-primary md:h-5 md:w-5"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Step {stepNum}
                          </p>
                          <h3 className="mt-1.5 font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl lg:mt-2 lg:text-xl xl:text-2xl">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-muted-foreground lg:text-lg lg:leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </MarketingLedgerCell>
                  );
                })}
              </MarketingLedger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
