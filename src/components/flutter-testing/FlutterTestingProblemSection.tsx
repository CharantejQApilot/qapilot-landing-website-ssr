import { Crosshair, Gauge, Unlink } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const TILES = [
  {
    title: "Missing Selectors",
    line: "Elements are hard to identify reliably",
    icon: Crosshair,
  },
  {
    title: "Flaky Execution",
    line: "Passes locally, fails in CI",
    icon: Gauge,
  },
  {
    title: "Broken Transitions",
    line: "Flutter, native, and webviews don’t sync",
    icon: Unlink,
  },
] as const;

export function FlutterTestingProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="flutter-problems-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-problems-heading"
          title={
            <>
              Why <span className="text-primary">Flutter Testing</span> Breaks
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-shadow motion-safe:hover:shadow-md md:p-7",
              )}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/[0.06] transition-opacity group-hover:bg-primary/[0.08]"
                aria-hidden
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="relative flex flex-col gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary motion-safe:transition-transform motion-safe:group-hover:scale-[1.02]"
                  aria-hidden
                >
                  <tile.icon className="h-6 w-6" strokeWidth={1.35} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {tile.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {tile.line}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
