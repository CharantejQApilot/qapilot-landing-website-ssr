import { Crosshair, Eye, Hash, Waypoints } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const LAYERS = [
  {
    badge: "Layer 1",
    title: "Element ID / Accessibility ID",
    sub: "Primary match",
    Icon: Hash,
  },
  {
    badge: "Layer 2",
    title: "XPath & attributes",
    sub: "Fuzzy structural match",
    Icon: Waypoints,
  },
  {
    badge: "Layer 3",
    title: "Visual matching",
    sub: "Detects elements by appearance",
    Icon: Eye,
  },
  {
    badge: "Layer 4",
    title: "Coordinate fallback",
    sub: "Last-resort interaction",
    Icon: Crosshair,
  },
] as const;

export function AiSelfHealingHealingEngineSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="ash-engine-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-engine-heading"
          title={
            <>
              Multi-Layer <span className="text-primary">Healing Engine</span>
            </>
          }
          description="A stacked fallback system so execution keeps moving before giving up."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="relative mx-auto max-w-lg">
          <div
            className="pointer-events-none absolute left-1/2 top-8 bottom-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-border to-primary/20 md:block"
            aria-hidden
          />
          <ul className="relative space-y-4">
            {LAYERS.map((layer, i) => (
              <li
                key={layer.badge}
                className={cn(
                  "relative rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm md:p-6",
                  "motion-safe:transition-transform motion-safe:hover:border-primary/30",
                  i > 0 && "md:ml-4",
                  i === 2 && "md:ml-2",
                  i === 3 && "md:ml-0",
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <span className="inline-flex w-fit shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {layer.badge}
                  </span>
                  <div className="flex min-w-0 flex-1 gap-3">
                    <layer.Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" strokeWidth={1.35} aria-hidden />
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">{layer.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground md:text-base">{layer.sub}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base font-medium text-foreground md:text-lg">
          Always finds the best possible match before failing.
        </p>
      </div>
    </section>
  );
}
