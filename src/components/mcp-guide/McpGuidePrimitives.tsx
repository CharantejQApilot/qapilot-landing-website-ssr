import type { ReactNode } from "react";
import {
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GuideSection({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-guide-section={id}
      className="scroll-mt-8 border-b border-border/80 py-12 last:border-b-0 last:pb-0 md:py-14"
    >
      {children}
    </section>
  );
}

const NUM_TONES = {
  primary: "bg-primary text-primary-foreground",
  green: "bg-emerald-600 text-white",
  amber: "bg-orange text-white",
  plain: "border border-border bg-muted/60 text-muted-foreground",
} as const;

export function GuideSectionLabel({
  n,
  tone = "primary",
  children,
}: {
  n: string;
  tone?: keyof typeof NUM_TONES;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold",
          NUM_TONES[tone],
        )}
      >
        {n}
      </span>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {children}
      </h2>
    </div>
  );
}

export function GuideP({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground last:mb-0">
      {children}
    </p>
  );
}

export function GuidePrompt({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-primary/15 bg-primary-light">
      <div className="flex items-center gap-2 border-b border-primary/15 px-4 py-2">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
          aria-hidden
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          {label}
        </span>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-3 font-sans text-[13.5px] leading-relaxed text-foreground">
        {children}
      </pre>
    </div>
  );
}

export function GuidePrompts({ children }: { children: ReactNode }) {
  return <div className="my-3 flex flex-col gap-2">{children}</div>;
}

const CALLOUT = {
  info: {
    wrap: "border-primary/20 bg-primary/[0.06] text-foreground",
    icon: Info,
    iconClass: "text-primary",
  },
  tip: {
    wrap: "border-emerald-500/25 bg-emerald-50 text-foreground",
    icon: Lightbulb,
    iconClass: "text-emerald-700",
  },
  warn: {
    wrap: "border-orange/30 bg-orange/[0.08] text-foreground",
    icon: AlertTriangle,
    iconClass: "text-orange",
  },
} as const;

export function GuideCallout({
  tone,
  children,
}: {
  tone: keyof typeof CALLOUT;
  children: ReactNode;
}) {
  const { wrap, icon: Icon, iconClass } = CALLOUT[tone];
  return (
    <div className={cn("my-3 flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed", wrap)}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClass)} aria-hidden />
      <div className="min-w-0 text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}

export function GuideStep({
  n,
  title,
  description,
  last = false,
  children,
}: {
  n: string;
  title: string;
  description?: string;
  last?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-5">
      <div className="flex flex-col items-center pt-0.5">
        <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card font-heading text-xs font-bold text-muted-foreground">
          {n}
        </span>
        {last ? null : (
          <span className="mt-1.5 w-px min-h-[1.25rem] flex-1 bg-border" aria-hidden />
        )}
      </div>
      <div className={cn(last ? "pb-0" : "pb-8")}>
        <h3 className="mb-1 font-heading text-[15px] font-semibold text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mb-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function GuideFeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-1.5 font-heading text-sm font-semibold text-foreground">
        {title}
      </h3>
      <p className="m-0 text-[13px] leading-relaxed text-muted-foreground">
        {children}
      </p>
    </article>
  );
}
