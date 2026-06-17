import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const REASONS = [
  {
    title: "Activate More of Your Existing Test Inventory",
    body: "Most organizations already know what should be tested. CoWork helps them execute more of it.",
  },
  {
    title: "Human Control Where It Matters",
    body: "CoWork acts autonomously. But never silently changes test intent. When uncertainty appears, humans stay in control.",
  },
  {
    title: "Built for Real Mobile Applications",
    body: "Works across Android, iOS, and Flutter, including dynamic content, popups, interruptions, and changing user journeys.",
  },
] as const;

export function CoWorkWhyTeamsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="cowork-why-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="cowork-why-heading"
          title={
            <>
              Why Teams Use <span className="text-primary">CoWork</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {REASONS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:p-8"
            >
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
