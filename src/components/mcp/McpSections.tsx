import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  GitBranch,
  Layers,
} from "lucide-react";
import { HomeHeroTrustMarquee } from "@/components/HomeHeroTrustMarquee";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import {
  MCP_BUILDING_TOWARD,
  MCP_COMPARE_LINKS,
  MCP_DIFFERENTIATORS,
  MCP_PROBLEM_OUTCOME_PAIRS,
  MCP_SHIPS_TODAY,
  MCP_WORKFLOW_FRAMES,
} from "@/lib/mcp-page";
import {
  marketingEyebrowClass,
  marketingSectionH2Class,
} from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const GAP_STATS = [
  { value: "Minutes", label: "To verify before merge" },
  { value: "Days", label: "Until QA finds out" },
  { value: "0", label: "Agent-runnable mobile tests" },
] as const;

const STEP_LABELS = ["Say it", "Watch it", "Read it", "Keep it"] as const;

function StepNode() {
  return (
    <div
      className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
      aria-hidden
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
    </div>
  );
}

function McpStepsPipeline() {
  return (
    <>
      <div className="relative mx-auto max-w-lg md:hidden">
        <div
          className="pointer-events-none absolute bottom-4 left-[13px] top-4 z-0 w-px bg-gradient-to-b from-primary/25 via-border to-primary/25"
          aria-hidden
        />
        <ol className="relative z-[1] flex list-none flex-col">
          {STEP_LABELS.map((label, index) => (
            <Fragment key={label}>
              {index > 0 ? (
                <li className="list-none" aria-hidden="true">
                  <div className="h-3" />
                </li>
              ) : null}
              <li className="list-none">
                <div className="flex items-center gap-4">
                  <StepNode />
                  <span
                    className={cn(
                      "text-sm font-semibold sm:text-base",
                      index === STEP_LABELS.length - 1
                        ? "text-primary"
                        : "text-foreground",
                    )}
                  >
                    {label}
                  </span>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>

      <div className="relative hidden md:block">
        <div
          className="pointer-events-none absolute left-[1.125rem] right-[1.125rem] top-[13px] z-0 h-px bg-gradient-to-r from-primary/25 via-border to-primary/25"
          aria-hidden
        />
        <ol className="relative z-[1] flex list-none flex-row items-start justify-center gap-0">
          {STEP_LABELS.map((label, index) => (
            <Fragment key={label}>
              {index > 0 ? (
                <li
                  className="flex min-w-0 flex-1 list-none items-start justify-center pt-[9px]"
                  aria-hidden="true"
                >
                  <span className="h-px min-h-px min-w-[2px] flex-1 max-w-16 bg-border/80" />
                </li>
              ) : null}
              <li className="flex w-28 shrink-0 list-none flex-col items-center text-center sm:w-32">
                <StepNode />
                <span
                  className={cn(
                    "mt-3 text-sm font-semibold tracking-tight",
                    index === STEP_LABELS.length - 1
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {label}
                </span>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </>
  );
}

function SectionShell({
  labelledBy,
  children,
  className,
}: {
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "section-edge relative w-full overflow-hidden border-t border-border/60 bg-background",
        className,
      )}
      aria-labelledby={labelledBy}
    >
      <div className="section-full relative z-10 py-12 md:py-16 2xl:py-20">
        {children}
      </div>
    </section>
  );
}

export function McpGapSection() {
  return (
    <section
      className="relative w-full overflow-hidden section-edge"
      aria-labelledby="mcp-gap-heading"
    >
      <div className="section-navy w-full">
        <div className="section-full relative py-8 sm:py-10 md:py-12">
          <div
            className="pointer-events-none absolute inset-0 bg-structured-grid opacity-10"
            aria-hidden
          />
          <p className="relative z-10 mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
            The gap
          </p>
          <h2
            id="mcp-gap-heading"
            className={cn(marketingSectionH2Class, "relative z-10 text-left")}
          >
            Agents Made Code Cheap.{" "}
            <span className="text-primary-foreground">Verification Got Costly.</span>
          </h2>
        </div>
      </div>
      <div
        className="w-full border-y border-border bg-background"
        aria-label="Verification gap"
      >
        <div className="section-full flex w-full overflow-x-auto">
          {GAP_STATS.map((stat, index) => (
            <div
              key={stat.value}
              className="sig-telemetry-item min-w-[11rem] flex-1 sm:min-w-[12rem]"
              style={{
                paddingLeft: index === 0 ? 0 : undefined,
                paddingRight: index === GAP_STATS.length - 1 ? 0 : undefined,
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                {stat.label}
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl min-[1280px]:text-4xl">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function McpProblemOutcomeSection() {
  return (
    <section
      className="section-edge w-full border-t border-border/60 bg-background"
      aria-labelledby="mcp-problem-outcome-heading"
    >
      <div className="section-full py-12 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="mcp-problem-outcome-heading"
          eyebrow="Before the PR"
          title={
            <>
              Intent In. <span className="text-primary">Verified Build Out.</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />
        <div className="sig-ledger sig-ledger--2">
          {MCP_PROBLEM_OUTCOME_PAIRS.map(({ problem, outcome }) => (
            <article
              key={problem}
              className="sig-cell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-muted-foreground md:text-base">
                {problem}
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-primary sm:block"
                  aria-hidden
                />
                <p className="font-heading text-sm font-semibold text-foreground md:text-base">
                  {outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function McpStepsSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-border/60 bg-dot-pattern-subtle section-edge w-full"
      aria-labelledby="mcp-steps-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/25 via-transparent to-transparent"
        aria-hidden
      />
      <div className="section-full relative py-12 md:py-14 2xl:py-16">
        <header className="mb-10 md:mb-12">
          <p className={cn(marketingEyebrowClass, "text-left")}>In your editor</p>
          <h2
            id="mcp-steps-heading"
            className={cn(marketingSectionH2Class, "text-left")}
          >
            Four Steps. <span className="text-primary">No Scripts.</span>
          </h2>
        </header>
        <McpStepsPipeline />
      </div>
    </section>
  );
}

export function McpWorkflowSection() {
  return (
    <section
      className="section-edge w-full border-t border-border/60 bg-background"
      aria-labelledby="mcp-workflow-heading"
    >
      <div className="section-full py-12 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="mcp-workflow-heading"
          eyebrow="One session"
          title={
            <>
              Prompt. Device. <span className="text-primary">Report.</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {MCP_WORKFLOW_FRAMES.map((frame) => {
            const Icon = frame.Icon;
            return (
              <article
                key={frame.step}
                className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent"
                  aria-hidden
                />
                <div className="relative border-b border-border/60 bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-heading text-2xl font-semibold tabular-nums text-primary/80">
                      {frame.step}
                    </span>
                    <Icon
                      className="h-5 w-5 text-muted-foreground"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {frame.label}
                  </p>
                </div>
                <div className="relative p-4 sm:p-5">
                  <p className="font-mono text-xs leading-relaxed text-foreground/85 sm:text-sm">
                    {frame.sample}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function McpDifferentiatorsSection() {
  return (
    <section
      className="relative overflow-hidden section-edge w-full border-t border-border/60 section-cream"
      aria-labelledby="mcp-differentiators-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-[0.15]"
        aria-hidden
      />
      <div className="section-full relative py-12 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="mcp-differentiators-heading"
          eyebrow="Why QApilot MCP"
          title={
            <>
              Checkable On <span className="text-primary">Day One</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />
        <div className="sig-ledger sig-ledger--5">
          {MCP_DIFFERENTIATORS.map(({ title, tag, Icon }) => (
            <article
              key={title}
              className="sig-cell flex flex-col gap-3 text-center sm:text-left"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mx-0">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {tag}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground sm:text-sm">
          vs typical MCP testing tools ·{" "}
          {MCP_COMPARE_LINKS.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 ? " · " : null}
              <Link
                href={link.href}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

export function McpPrinciplesSection() {
  return (
    <section
      className="section-edge w-full border-t border-border/60 bg-background"
      aria-labelledby="mcp-principles-heading"
    >
      <div className="section-full py-12 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="mcp-principles-heading"
          eyebrow="Ships in early access"
          title={
            <>
              Local. Portable. <span className="text-primary">Yours.</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />
        <div className="sig-ledger sig-ledger--2">
          {MCP_SHIPS_TODAY.map(({ title, tag, Icon }) => (
            <article key={title} className="sig-cell flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  {tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function McpRoadmapSection() {
  return (
    <section
      className="relative isolate overflow-hidden section-cream section-edge w-full border-t border-border/60"
      aria-labelledby="mcp-roadmap-heading"
    >
      <div className="section-full relative z-10 py-12 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="mcp-roadmap-heading"
          eyebrow="Building toward"
          title={
            <>
              What To Test, <span className="text-primary">Not Just How</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {MCP_BUILDING_TOWARD.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-border/80 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground sm:px-4 sm:py-2 sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function McpScopeSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 section-navy"
      aria-labelledby="mcp-scope-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-structured-grid opacity-10"
        aria-hidden
      />
      <div className="section-full relative z-10 py-12 md:py-16 2xl:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          Two jobs
        </p>
        <h2
          id="mcp-scope-heading"
          className={cn(marketingSectionH2Class, "mb-8 text-white md:mb-10")}
        >
          Verify The Change.{" "}
          <span className="text-primary-foreground">Certify The Release.</span>
        </h2>
        <div className="sig-ledger sig-ledger--2 border-white/15 bg-white/[0.03]">
          <article className="sig-cell border-white/15 !bg-transparent">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-primary-foreground">
              <GitBranch className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
              QApilot MCP
            </h3>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              Before the PR · one device · local · agent-readable report
            </p>
          </article>
          <article className="sig-cell border-white/15 !bg-transparent">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-primary-foreground">
              <Layers className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
              QApilot Platform
            </h3>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              Device matrix · certification · release reporting
            </p>
            <Link
              href={PATHS.PRODUCT}
              className="mt-4 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              See the platform →
            </Link>
          </article>
        </div>
        <p className="mt-6 text-sm font-medium text-white/70 md:text-base">
          Same engine. Wider job.
        </p>
      </div>
    </section>
  );
}

export function McpPlatformSection() {
  return <McpScopeSection />;
}

export function McpTrustBadges() {
  return (
    <div className="mt-10 flex flex-wrap items-start gap-6 sm:gap-8">
      {[
        {
          src: "/compliance-badges/soc2.png",
          alt: "SOC 2 Type 2 compliance badge",
          label: "SOC 2",
          width: 551,
          height: 700,
        },
        {
          src: "/compliance-badges/hipaa.png",
          alt: "HIPAA compliance badge",
          label: "HIPAA",
          width: 1024,
          height: 1024,
          scale: 1.12,
        },
      ].map((badge) => (
        <figure key={badge.label} className="flex flex-col items-center gap-2.5">
          <div className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-xl border border-border bg-muted/30 p-2 sm:h-[5.5rem] sm:w-[5.5rem] sm:p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element -- static compliance badge asset */}
            <img
              src={badge.src}
              alt={badge.alt}
              width={badge.width}
              height={badge.height}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
              style={
                badge.scale
                  ? { transform: `scale(${badge.scale})`, transformOrigin: "center" }
                  : undefined
              }
            />
          </div>
          <figcaption className="flex items-center gap-1.5 text-[11px] font-medium leading-none tracking-wide text-muted-foreground sm:text-xs">
            <Clock className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden />
            <span>
              <span className="sr-only">{badge.label}: </span>
              In Progress
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function McpTrustSection() {
  return (
    <SectionShell labelledBy="mcp-trust-heading">
      <MarketingSectionHeader
        id="mcp-trust-heading"
        eyebrow="Already in production"
        title={
          <>
            The Platform Behind It{" "}
            <span className="text-primary">Runs Mobile QA</span>
          </>
        }
        marginBottomClassName="mb-8 md:mb-10"
      />
      <HomeHeroTrustMarquee layout="contained" density="compact" />
      <McpTrustBadges />
    </SectionShell>
  );
}
