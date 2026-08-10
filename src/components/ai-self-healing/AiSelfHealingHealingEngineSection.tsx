import { Crosshair, Eye, Hash, Waypoints } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const LAYERS = [
  {
    badge: "Layer 1",
    title: "Element ID / Accessibility ID",
    sub: "Primary match",
    Icon: Hash,
  },
  {
    badge: "Layer 2",
    title: "XPath & Attributes",
    sub: "Fuzzy structural match",
    Icon: Waypoints,
  },
  {
    badge: "Layer 3",
    title: "Visual Matching",
    sub: "Detects elements by appearance",
    Icon: Eye,
  },
  {
    badge: "Layer 4",
    title: "Coordinate Fallback",
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

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {LAYERS.map((layer) => (
            <li
              key={layer.badge}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm motion-safe:transition-[border-color] motion-safe:hover:border-primary/30 md:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex w-fit shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {layer.badge}
                </span>
                <layer.Icon
                  className="h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.35}
                  aria-hidden
                />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold leading-snug text-foreground md:text-lg">
                  {layer.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                  {layer.sub}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-left text-base font-medium text-foreground md:text-lg">
          Always finds the best possible match before failing.
        </p>
      </div>
    </section>
  );
}
