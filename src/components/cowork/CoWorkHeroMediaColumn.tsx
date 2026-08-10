"use client";

import { CheckCircle2, Smartphone, Sparkles } from "lucide-react";
import { CoWorkHeroVideo } from "@/components/cowork/CoWorkHeroVideo";
import { PRODUCT_HUNT_TOP_POST_BADGE } from "@/lib/product-hunt-badge";
import { cn } from "@/lib/utils";

function CoWorkHeroProductHuntBadge() {
  return (
    <a
      href={PRODUCT_HUNT_TOP_POST_BADGE.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full justify-center transition-opacity hover:opacity-90"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Product Hunt embed widget */}
      <img
        alt={PRODUCT_HUNT_TOP_POST_BADGE.imageAlt}
        width={PRODUCT_HUNT_TOP_POST_BADGE.width}
        height={PRODUCT_HUNT_TOP_POST_BADGE.height}
        src={PRODUCT_HUNT_TOP_POST_BADGE.imageSrc}
        className="h-auto w-[min(220px,65vw)]"
      />
    </a>
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
    <div className="hidden h-full w-full flex-col items-center justify-center gap-3 sm:gap-4 lg:flex lg:gap-5">
      <CoWorkHeroProductHuntBadge />
      <CoWorkHeroVideo className="w-full shrink-0" />
      <CoWorkHeroDecorBottom />
    </div>
  );
}
