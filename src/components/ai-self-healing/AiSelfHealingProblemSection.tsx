import { Layers, MousePointerClick, Wrench } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

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

        <MarketingLedger cols={3} aria-label="Test automation problems">
          {TILES.map((tile) => (
            <MarketingLedgerCell key={tile.title}>
              <tile.Icon className="h-9 w-9 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground md:text-xl">
                {tile.title}
              </h3>
              <p className="mt-2 text-base font-medium text-muted-foreground md:text-lg">{tile.body}</p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
