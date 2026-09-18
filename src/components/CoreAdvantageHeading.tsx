"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeSeam } from "@/components/home/HomeSeam";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { HOME_PAGE_MCP } from "@/lib/home-page-seo";
import { PATHS, PLATFORM_BY_SOLUTION } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Suite pillars + MCP are not separate Platform → By Solution items. */
const KNOW_MORE_HREFS: Record<string, string> = {
  "Intelligent Bug Detection": PATHS.INTELLIGENT_BUG_DETECTION,
  "Security Reports": PATHS.SECURITY_REPORTS,
  "AI Self Healing": PATHS.AI_SELF_HEALING,
  "QApilot MCP": PATHS.MCP,
};

function knowMoreHrefForLabel(label: string): string {
  const specialHref = KNOW_MORE_HREFS[label];
  if (specialHref) return specialHref;

  const entry = PLATFORM_BY_SOLUTION.find((i) => i.label === label);
  if (!entry || entry.path === PATHS.OVERVIEW) {
    throw new Error(
      `Missing Platform → By Solution path for capability: ${label}`,
    );
  }
  return entry.path;
}

function CapHighlight({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-primary">{children}</strong>;
}

const inlineSeoLinkClass =
  "font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary";

function SeoLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={inlineSeoLinkClass}>
      {children}
    </Link>
  );
}

type Capability = {
  id: string;
  label: string;
  description: ReactNode;
  href: string;
};

const CAPABILITY_DEFINITIONS: Omit<Capability, "href">[] = [
  {
    id: "autonomous",
    label: "Autonomous Testing",
    description: (
      <>
        Automatically validates <CapHighlight>critical app flows</CapHighlight>{" "}
        without any scripts or setup. From the moment you upload your app,
        QApilot&apos;s{" "}
        <SeoLink href={PATHS.AUTONOMOUS_TESTING}>
          autonomous mobile app crawler
        </SeoLink>{" "}
        explores it like a <CapHighlight>real user</CapHighlight> and generates
        meaningful test coverage, giving{" "}
        <CapHighlight>instant visibility into app health</CapHighlight>.
      </>
    ),
  },
  {
    id: "cowork",
    label: "CoWork",
    description: (
      <>
        <SeoLink href={PATHS.COWORK}>CoWork</SeoLink> turns the test cases you
        already have into runnable mobile automation. AI plans the steps, a
        human approves what matters, and execution happens on real devices. So
        planned coverage stops living only as a checklist.
      </>
    ),
  },
  {
    id: "flutter",
    label: "Flutter Testing",
    description: (
      <>
        Built to handle{" "}
        <SeoLink href={PATHS.FOR_FLUTTER}>Flutter testing</SeoLink> and{" "}
        <CapHighlight>Flutter&apos;s hybrid nature</CapHighlight>, QApilot
        seamlessly switches between <CapHighlight>native</CapHighlight> and{" "}
        <CapHighlight>Flutter contexts</CapHighlight>. This ensures reliable,
        end-to-end testing across platforms without breaking flows or requiring
        custom handling.
      </>
    ),
  },
  {
    id: "dual-device",
    label: "Dual Device Testing",
    description: (
      <>
        Real journeys span users and roles: buyer and seller, sender and
        receiver, agent and supervisor.{" "}
        <SeoLink href={PATHS.DUAL_DEVICE_TESTING}>Dual device testing</SeoLink>{" "}
        runs both sides as{" "}
        <CapHighlight>one continuous transaction</CapHighlight> with step-level
        sync, so marketplace, messaging, and field workflows are proven before
        they break in production.
      </>
    ),
  },
  {
    id: "security",
    label: "Security Reports",
    description: (
      <>
        Continuously analyzes your app for{" "}
        <CapHighlight>vulnerabilities</CapHighlight> like insecure requests,
        tracker risks, and configuration issues.{" "}
        <SeoLink href={PATHS.SECURITY_REPORTS}>Mobile security reports</SeoLink>{" "}
        provide <CapHighlight>clear, actionable insights</CapHighlight> to
        strengthen security before every release.
      </>
    ),
  },
  {
    id: "self-healing",
    label: "AI Self Healing",
    description: (
      <>
        <SeoLink href={PATHS.AI_SELF_HEALING}>AI self-healing tests</SeoLink>{" "}
        adapt automatically to UI changes by intelligently updating element
        references during execution. This reduces{" "}
        <CapHighlight>flaky tests</CapHighlight> and eliminates the need for
        constant <CapHighlight>maintenance</CapHighlight>, keeping your{" "}
        <CapHighlight>test suite stable</CapHighlight> over time.
      </>
    ),
  },
  {
    id: "bug-detection",
    label: "Intelligent Bug Detection",
    description: (
      <>
        <SeoLink href={PATHS.INTELLIGENT_BUG_DETECTION}>
          Intelligent bug detection
        </SeoLink>{" "}
        autonomously finds <CapHighlight>accessibility gaps</CapHighlight>,{" "}
        <CapHighlight>action latency issues</CapHighlight>, and{" "}
        <CapHighlight>page load failures</CapHighlight> during execution. It
        surfaces real user-impacting problems without manual effort, helping
        teams <CapHighlight>catch issues early</CapHighlight> and continuously.
      </>
    ),
  },
  {
    id: "mcp",
    label: "QApilot MCP",
    description: (
      <>
        <SeoLink href={PATHS.MCP}>{HOME_PAGE_MCP.name}</SeoLink> puts mobile
        verification in the coding agent you already use. Say what needs to
        hold in plain language. QApilot builds the test, runs it on your{" "}
        <CapHighlight>local device or emulator</CapHighlight>, and returns a{" "}
        <CapHighlight>markdown report</CapHighlight> the agent can query.{" "}
        <CapHighlight>Local-first</CapHighlight>: the app stays on your
        machine. Works with {HOME_PAGE_MCP.agents.slice(0, -1).join(", ")}, and{" "}
        {HOME_PAGE_MCP.agents[HOME_PAGE_MCP.agents.length - 1]}.
      </>
    ),
  },
];

const CAPABILITIES: Capability[] = CAPABILITY_DEFINITIONS.map((item) => ({
  ...item,
  href: knowMoreHrefForLabel(item.label),
}));

/**
 * Platform capabilities: pick one at a time (earlier UX).
 * Left nav fills the old screenshot column; detail stays focused.
 */
export default function CoreAdvantageHeading() {
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active];

  return (
    <section
      className="relative isolate overflow-hidden home-canvas section-edge w-full"
      aria-labelledby="core-advantage-heading"
    >
      <HomeSeam />

      <div className="section-full relative z-10 pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-20 2xl:pb-24">
        <MarketingSectionHeader
          id="core-advantage-heading"
          eyebrow="Platform"
          title={
            <>
              Deliver Reliable <span className="text-primary">Mobile App</span>{" "}
              Testing
            </>
          }
          description="Autonomous exploration is a script-free way to map real app journeys. From exploration to security, self-healing, and QApilot MCP, QApilot unifies the capabilities your team needs to ship mobile quality with less manual effort."
          marginBottomClassName="mb-8 md:mb-10 2xl:mb-12"
        />

        <div className="relative z-[1] overflow-hidden border border-border bg-background">
          {/* Mobile: horizontal chips */}
          <div
            className="flex gap-0 overflow-x-auto border-b border-border lg:hidden scrollbar-thin [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Product capabilities"
          >
            {CAPABILITIES.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`deliver-panel-${item.id}`}
                  id={`deliver-tab-mobile-${item.id}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "shrink-0 border-b-2 px-3.5 py-3 text-left text-sm font-semibold transition-colors",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[minmax(14rem,18.5rem)_minmax(0,1fr)]">
            {/* Desktop: vertical capability list (fills former media column) */}
            <div
              className="hidden border-r border-border bg-[hsl(var(--home-tint))] lg:block"
              role="tablist"
              aria-label="Product capabilities"
              aria-orientation="vertical"
            >
              {CAPABILITIES.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`deliver-panel-${item.id}`}
                    id={`deliver-tab-${item.id}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 border-b border-border px-5 py-3.5 text-left text-sm font-semibold transition-colors last:border-b-0",
                      isActive
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                    )}
                  >
                    <span className="min-w-0 leading-snug">{item.label}</span>
                    <span
                      className={cn(
                        "font-heading shrink-0 text-xs tabular-nums",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/45",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`deliver-panel-${current.id}`}
              aria-labelledby={`deliver-tab-${current.id}`}
              className="flex min-h-0 flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 lg:min-h-[22rem] lg:px-12 lg:py-12"
            >
              <div
                key={current.id}
                className="flex max-w-2xl flex-col gap-5 animate-in fade-in duration-300 md:gap-6"
              >
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl leading-snug">
                  {current.label}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                  {current.description}
                </p>
                <Link
                  href={current.href}
                  className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:text-base"
                >
                  Know more
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
