import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

export function AutonomousTestingReleaseReadinessSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 section-cream"
      aria-labelledby="autonomous-release-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg className="absolute inset-0 h-full w-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="autonomous-release-diagonal"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(15)"
            >
              <line x1="0" y1="0" x2="0" y2="24" stroke="hsl(var(--foreground))" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#autonomous-release-diagonal)" />
        </svg>
      </div>

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-release-heading"
          title={
            <>
              <span className="text-primary">Autonomy</span> Changes What{" "}
              <span className="text-primary">Ready to Release</span> Looks Like
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="mx-auto max-w-4xl">
          <figure className="group relative w-full overflow-hidden rounded-xl border border-border bg-background">
            <span
              className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-primary/35"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-xl border-b-2 border-r-2 border-primary/35"
              aria-hidden
            />
            <blockquote className="space-y-5 px-5 py-6 sm:px-6 md:px-8 md:py-7 2xl:px-10 2xl:py-8">
              <p className="w-full font-heading text-base leading-relaxed tracking-tight text-foreground md:text-lg 2xl:text-xl">
                Release confidence doesn&apos;t come from passing a fixed set of scripts. It comes from knowing your
                app has been explored, validated, and monitored across the flows and conditions that matter.
              </p>
              <p className="w-full font-heading text-base font-medium leading-relaxed tracking-tight text-foreground md:text-lg 2xl:text-xl">
                Autonomous testing brings that confidence closer by expanding coverage, reducing maintenance drag, and
                surfacing meaningful release signals earlier.
              </p>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
