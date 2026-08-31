import { Brain, Layers, Radar, Wrench } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const CARDS = [
  {
    title: "Cross-Context Execution",
    line: "Flutter + Native + Webview in one flow",
    icon: Layers,
  },
  {
    title: "AI Element Discovery",
    line: "Works even when selectors fail",
    icon: Brain,
  },
  {
    title: "Low-Maintenance Tests",
    line: "Adapts as UI changes",
    icon: Wrench,
  },
  {
    title: "Autonomous Risk Detection",
    line: "Finds latency and accessibility issues",
    icon: Radar,
  },
] as const;

export function FlutterTestingSolutionSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/40"
      aria-labelledby="flutter-solution-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/[0.35] via-transparent to-transparent" aria-hidden />
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-solution-heading"
          title={
            <>
              Built for <span className="text-primary">Flutter</span> Complexity
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="Flutter testing solution">
          {CARDS.map((card) => (
            <MarketingLedgerCell key={card.title}>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary"
                  aria-hidden
                >
                  <card.icon className="h-7 w-7" strokeWidth={1.35} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    {card.line}
                  </p>
                </div>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
