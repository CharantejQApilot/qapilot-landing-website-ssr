import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const PAIRS = [
  { a: "Initiate", b: "Approve" },
  { a: "Assign", b: "Accept" },
  { a: "Send", b: "Receive" },
  { a: "Trigger", b: "Validate" },
] as const;

/** Cross-device interaction pattern strip. */
export function DualDevicePatternSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ddt-pattern-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ddt-pattern-heading"
          title={
            <>
              Traditional Automation Tests Sessions.{" "}
              <span className="text-primary">Real Workflows Connect Them.</span>
            </>
          }
          description="Step-level dependencies and cross-device validation turn two independent runs into one continuous transaction."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {PAIRS.map((pair) => (
            <div
              key={`${pair.a}-${pair.b}`}
              className="flex flex-col rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm md:p-6"
            >
              <div className="flex items-center justify-between gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Device A</span>
                <span aria-hidden className="text-primary/50">
                  →
                </span>
                <span>Device B</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <span className="font-heading text-lg font-semibold text-foreground md:text-xl">{pair.a}</span>
                <span className="font-heading text-lg font-semibold text-primary md:text-xl">{pair.b}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
