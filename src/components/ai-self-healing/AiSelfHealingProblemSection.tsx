import { Layers, MousePointerClick, Wrench } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const TILES = [
  {
    title: "UI Keeps Changing",
    body: "Small changes break entire flows.",
    Icon: Layers,
  },
  {
    title: "Selectors Become Invalid",
    body: "IDs and XPaths don’t hold.",
    Icon: MousePointerClick,
  },
  {
    title: "Maintenance Never Ends",
    body: "Teams constantly fix tests instead of shipping.",
    Icon: Wrench,
  },
] as const;

export function AiSelfHealingProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="ash-problem-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-problem-heading"
          title={
            <>
              Why Test Automation <span className="text-primary">Breaks</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-7",
                "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
              )}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/[0.06]"
                aria-hidden
              />
              <tile.Icon className="relative h-9 w-9 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="relative mt-4 font-heading text-lg font-semibold text-foreground md:text-xl">
                {tile.title}
              </h3>
              <p className="relative mt-2 text-base font-medium text-muted-foreground md:text-lg">{tile.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
