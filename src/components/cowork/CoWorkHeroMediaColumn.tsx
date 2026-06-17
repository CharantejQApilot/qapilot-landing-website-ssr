"use client";

import { ArrowRight, Bot, CheckCircle2, Smartphone, Sparkles } from "lucide-react";
import { CoWorkHeroVideo } from "@/components/cowork/CoWorkHeroVideo";
import { cn } from "@/lib/utils";

function CoWorkHeroDecorTop() {
  return (
    <div className="relative w-full shrink-0 px-0.5">
      <div
        className="pointer-events-none absolute inset-x-[10%] top-1/2 h-14 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-2xl"
        aria-hidden
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/55",
          "bg-gradient-to-br from-card/95 via-background/90 to-card/80",
          "shadow-[0_8px_32px_-12px_hsl(220_25%_8%/0.12)] backdrop-blur-sm",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/[0.06] blur-2xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-[11px]">
              Your test backlog
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-foreground/90 sm:text-base">
              Jira, TestRail, CSV, and more
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 px-1 text-primary/55 sm:px-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/35 sm:w-8" aria-hidden />
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-primary/35 sm:w-8" aria-hidden />
          </div>

          <div
            className={cn(
              "flex items-center gap-2.5 rounded-xl border border-primary/20",
              "bg-gradient-to-br from-primary/[0.1] to-primary/[0.04] px-3 py-2.5 sm:min-w-[9.5rem]",
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/20">
              <Bot className="h-4 w-4 text-primary" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">CoWork</p>
              <p className="text-xs font-medium text-muted-foreground">Plans &amp; runs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoWorkHeroDecorBottom() {
  const items = [
    { icon: Smartphone, label: "iOS · Android · Flutter" },
    { icon: Sparkles, label: "AI-assisted planning" },
    { icon: CheckCircle2, label: "Human-approved steps" },
  ] as const;

  return (
    <div className="relative w-full shrink-0 px-0.5">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {items.map((item) => (
          <span
            key={item.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-border/60",
              "bg-background/75 px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm sm:text-xs",
            )}
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 text-primary/85" aria-hidden />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CoWorkHeroMediaColumn() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5">
      <CoWorkHeroDecorTop />
      <CoWorkHeroVideo className="w-full shrink-0" />
      <CoWorkHeroDecorBottom />
    </div>
  );
}
