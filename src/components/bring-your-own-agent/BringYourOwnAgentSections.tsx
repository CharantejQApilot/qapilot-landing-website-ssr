import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Cable,
  CheckCircle2,
  CircleSlash,
  Database,
  Eye,
  FileCheck,
  GitBranch,
  Layers,
  Lightbulb,
  MousePointerClick,
  Network,
  Puzzle,
  Route,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionH2Class, marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const WHY_HIGHLIGHTS: readonly { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Every team is different",
    body: "Domain logic, custom validations, and workflows that don’t fit a one-size template.",
    Icon: Users,
  },
  {
    title: "Beyond standard capabilities",
    body: "When you need checks or flows that native tooling alone won’t cover.",
    Icon: Layers,
  },
  {
    title: "Core stays coherent",
    body: "Extend behavior without forked stacks or breaking how QApilot explores and learns.",
    Icon: GitBranch,
  },
];

const KG_TILES: readonly { label: string; Icon: LucideIcon; hint: string }[] = [
  { label: "Screens", Icon: Layers, hint: "What users see" },
  { label: "Flows", Icon: Route, hint: "Paths through the app" },
  { label: "Interactions", Icon: MousePointerClick, hint: "Touches, inputs, transitions" },
  { label: "Relationships", Icon: Share2, hint: "How it all connects" },
];

const HOW_STEPS: readonly { step: string; title: string; body: string; Icon: LucideIcon }[] = [
  {
    step: "01",
    title: "Read context",
    body: "Pull structure and state from the shared knowledge graph.",
    Icon: BookOpen,
  },
  {
    step: "02",
    title: "Understand the app",
    body: "See where the app is in a flow and what matters next.",
    Icon: Eye,
  },
  {
    step: "03",
    title: "Act & validate",
    body: "Run your tasks, rules, or checks against live context.",
    Icon: CheckCircle2,
  },
  {
    step: "04",
    title: "Write back",
    body: "Record outcomes so the system stays one source of truth.",
    Icon: Database,
  },
];

const ENABLES: readonly { title: string; Icon: LucideIcon }[] = [
  { title: "Custom validation logic", Icon: Sparkles },
  { title: "Domain-specific workflows", Icon: Workflow },
  { title: "Specialized testing scenarios", Icon: Target },
  { title: "Integration with internal systems", Icon: Cable },
];

const USEFUL: readonly { title: string; Icon: LucideIcon }[] = [
  { title: "Business-specific rules", Icon: FileCheck },
  { title: "Flows unique to your app", Icon: Route },
  { title: "Internal compliance checks", Icon: ShieldCheck },
  { title: "Reporting & validation extensions", Icon: Lightbulb },
];

export function BringYourOwnAgentWhySection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="byoa-why-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="byoa-why-heading"
          eyebrow="Extensibility"
          title={
            <>
              Built for <span className="text-primary">Extensibility</span>
            </>
          }
          description="Domain rules, custom checks, and org-specific workflows deserve a first-class path—without fragmenting your testing system."
          marginBottomClassName="mb-10 md:mb-14 2xl:mb-16"
        />

        <div className="grid w-full items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 2xl:gap-20">
          <div className="relative min-w-0">
            <span
              className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-primary"
              aria-hidden
            />
            <div className={cn("space-y-5 pl-6 md:pl-8", marketingSectionIntroClass)}>
              <p className="text-base md:text-lg 2xl:text-xl">
                Every team has different testing needs. Some require domain-specific logic, custom validations, or
                specialized workflows that go beyond standard capabilities.
              </p>
              <p className="text-base font-semibold text-foreground md:text-lg 2xl:text-xl">
                QApilot is designed to support this flexibility — without breaking the core system.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4 md:gap-5">
            {WHY_HIGHLIGHTS.map(({ title, body, Icon }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-muted/15 px-5 py-5 transition-colors duration-200 hover:border-primary/25 hover:bg-muted/25 md:px-6 md:py-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="relative flex gap-4 md:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-sm md:h-12 md:w-12">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-bold text-foreground md:text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BringYourOwnAgentFoundationSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-muted/10"
      aria-labelledby="byoa-foundation-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-[0.35]" aria-hidden />

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="byoa-foundation-heading"
          eyebrow="Shared context"
          title={
            <>
              Powered by the <span className="text-primary">Knowledge Graph</span>
            </>
          }
          description="One evolving map of screens, flows, and behavior keeps native and custom agents aligned with how your app actually works."
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid w-full gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex min-h-[200px] flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-br from-background/90 to-muted/30 p-6 shadow-sm md:p-8 lg:col-span-5">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Network className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </div>
              <p className={cn("text-foreground", marketingSectionIntroClass)}>
                <span className="font-semibold text-foreground">Shared context</span> sits at the center of QApilot —
                always updating as your app is explored and tested.
              </p>
            </div>
            <p className="mt-6 text-sm font-medium text-muted-foreground md:text-base">
              At the core is a knowledge graph that captures structure and behavior in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7 lg:grid-cols-2">
            {KG_TILES.map(({ label, Icon, hint }) => (
              <div
                key={label}
                className="flex flex-col rounded-2xl border border-border/80 bg-background/80 px-4 py-5 text-left shadow-sm transition-shadow hover:shadow-md md:px-5 md:py-6"
              >
                <Icon className="mb-3 h-5 w-5 text-primary md:h-6 md:w-6" strokeWidth={1.5} aria-hidden />
                <span className="font-heading text-sm font-semibold text-foreground md:text-base">{label}</span>
                <span className="mt-1.5 text-xs text-muted-foreground md:text-sm">{hint}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/[0.08] via-primary/[0.04] to-transparent px-6 py-6 md:mt-10 md:px-10 md:py-8 2xl:px-12 2xl:py-10">
          <p className="max-w-4xl text-base font-semibold leading-relaxed text-foreground md:text-lg lg:text-xl">
            This shared context is what makes it possible for external agents to operate effectively within the system.
          </p>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted-foreground md:mt-8 md:text-base">
          That context is continuously built and updated as the app is explored and tested — so custom agents always work
          against reality, not stale assumptions.
        </p>
      </div>
    </section>
  );
}

export function BringYourOwnAgentHowSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 section-cream"
      aria-labelledby="byoa-how-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-deliver-diagonal-grid opacity-[0.06]" aria-hidden />

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="byoa-how-heading"
          eyebrow="Architecture"
          title="How It Fits Into the System"
          description="External agents plug into the same pipelines—read graph state, act on builds, and write results where teams already look."
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {HOW_STEPS.map(({ step, title, body, Icon }) => (
            <div
              key={step}
              className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/75 p-5 shadow-sm backdrop-blur-sm md:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="font-heading text-3xl font-bold tabular-nums text-primary/25 md:text-4xl">{step}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
              <h3 className="font-heading text-base font-bold text-foreground md:text-lg">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-muted/20 px-5 py-5 text-center md:mt-12 md:px-8 md:py-6">
          <p className={cn("mx-auto max-w-3xl font-medium text-foreground md:text-lg", marketingSectionIntroClass)}>
            Custom agents can read from the knowledge graph, understand current app state, perform tasks or validations,
            and write results back. They operate alongside QApilot&apos;s native agents, using the same shared context.
          </p>
        </div>
      </div>
    </section>
  );
}

export function BringYourOwnAgentEnablesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="byoa-enables-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="byoa-enables-heading"
          eyebrow="Coverage"
          title={
            <>
              Extend Testing for Your <span className="text-primary">Use Cases</span>
            </>
          }
          description="Shape coverage and checks around how your org actually ships — without giving up a unified context layer."
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {ENABLES.map(({ title, Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-muted/10 px-5 py-7 text-left transition-colors duration-200 hover:border-primary/30 hover:bg-background md:px-6 md:py-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <Icon
                className="relative mb-4 h-6 w-6 text-primary md:h-7 md:w-7"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="relative text-sm font-semibold leading-snug text-foreground md:text-base">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BringYourOwnAgentPositioningSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-muted/10"
      aria-labelledby="byoa-positioning-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="byoa-positioning-heading"
          eyebrow="Principles"
          title={
            <>
              Flexible, <span className="text-primary">Without Losing Structure</span>
            </>
          }
          description="BYOA augments the platform—exploration, graph, and native agents stay authoritative while extensions specialize where you need them."
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-background p-6 shadow-sm md:p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <CircleSlash className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-semibold text-muted-foreground md:text-xl">Not a replacement</h3>
            <p className={cn("mt-4 flex-1", marketingSectionIntroClass)}>
              <span className="font-semibold text-foreground">Bring Your Own Agent does not replace the system.</span>{" "}
              Your foundation — exploration, graph, and native agents — stays intact.
            </p>
          </div>

          <div
            className={cn(
              "flex h-full flex-col rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.08] via-primary/[0.04] to-background p-6 shadow-md shadow-primary/10 md:p-8",
              "ring-1 ring-primary/15",
            )}
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Puzzle className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary md:text-xl">An extension</h3>
            <p className={cn("mt-4 flex-1 font-medium text-foreground md:text-lg", marketingSectionIntroClass)}>
              It extends the platform. Custom agents plug into the same context layer, ensuring consistency while allowing
              flexibility where it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BringYourOwnAgentUsefulSection() {
  return (
    <section
      className="section-navy relative section-edge w-full overflow-hidden border-t border-white/10 pb-8 pt-14 md:pb-12 md:pt-20 2xl:pb-14 2xl:pt-24"
      aria-labelledby="byoa-useful-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-structured-grid opacity-10" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-[0.12]" aria-hidden />

      <div className="section-full relative z-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/55 md:mb-4">
          Examples
        </p>
        <h2
          id="byoa-useful-heading"
          className={cn(marketingSectionH2Class, "mb-3 max-w-4xl text-primary-foreground md:mb-4")}
        >
          Where It Can Be <span className="text-primary">Useful</span>
        </h2>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-[hsl(var(--navy-muted))] md:mb-12 md:text-lg 2xl:text-xl">
          Concrete places teams layer BYOA on top of QApilot&apos;s graph-backed testing.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {USEFUL.map(({ title, Icon }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-5 backdrop-blur-[2px] transition-colors duration-200 hover:bg-white/[0.07] md:gap-5 md:px-6 md:py-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-primary-foreground">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <p className="pt-0.5 font-heading text-base font-semibold leading-snug text-primary-foreground md:text-lg">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
