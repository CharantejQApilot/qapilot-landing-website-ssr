import { Zap, TrendingUp, LayoutGrid } from "lucide-react";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroInteractive from "@/components/HomeHeroInteractive";

const HERO_METRICS = [
  {
    value: "Zero Touch",
    description: "Sanity testing",
    icon: Zap,
  },
  {
    value: "5×",
    description: "More Coverage/ Effort",
    icon: TrendingUp,
  },
  {
    value: "100%",
    description: "Visibility",
    icon: LayoutGrid,
  },
];

export default function HeroSection() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Hero"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center px-1 sm:px-0">
          <HomeHeroInteractive />

          <div
            className="w-full max-w-2xl border-t border-border/80 pt-12 sm:max-w-3xl sm:pt-14 md:pt-16"
            aria-label="Key outcomes"
          >
            <div className="grid grid-cols-1 gap-10 sm:hidden">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.value} className="flex flex-col items-center gap-3 text-center">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground">
                        {metric.value}
                      </p>
                      <p className="mt-1.5 text-base leading-snug text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden sm:mx-auto sm:grid sm:w-full sm:max-w-3xl sm:grid-cols-3 sm:grid-rows-[auto_auto] sm:gap-x-8 sm:gap-y-1 md:gap-x-12">
              {HERO_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.value}
                    className="grid min-w-0 grid-cols-[auto_1fr] gap-x-3 gap-y-1"
                  >
                    <div className="row-span-2 flex items-start justify-center pt-0.5">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10 md:h-12 md:w-12"
                        aria-hidden
                      >
                        <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
                      </span>
                    </div>
                    <p className="col-start-2 row-start-1 self-start text-left font-heading text-2xl font-semibold leading-none tracking-tight text-foreground md:text-3xl">
                      {metric.value}
                    </p>
                    <p className="col-start-2 row-start-2 self-start text-left text-sm leading-snug text-muted-foreground md:text-base">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
