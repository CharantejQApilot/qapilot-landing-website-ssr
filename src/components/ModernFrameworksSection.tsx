import type { ComponentType } from "react";
import { Smartphone, Layers, CodeXml, Cpu } from "lucide-react";

const PANORAMA_SRC = "/compatibility-panorama.png";

const diagonalFill =
  "repeating-linear-gradient(-45deg, transparent 0, transparent 6px, hsl(var(--foreground) / 0.2) 6px, hsl(var(--foreground) / 0.2) 7px)";

/** Matches Velocity section rail + hatch; left or right edge toward content */
function FrameworkSidePillar({ side }: { side: "left" | "right" }) {
  const border = side === "left" ? "border-y border-r border-border" : "border-y border-l border-border";
  const dir = side === "left" ? "flex-row" : "flex-row-reverse";
  return (
    <div
      className={`relative flex h-full min-h-0 w-9 ${dir} overflow-hidden bg-muted/30 sm:w-10 md:w-11 lg:w-12 ${border}`}
      aria-hidden
    >
      <span className="min-h-0 w-[2px] shrink-0 self-stretch bg-foreground/25" />
      <div className="min-h-0 min-w-0 flex-1 self-stretch bg-muted/25" style={{ backgroundImage: diagonalFill }} />
      <span className="min-h-0 w-[2px] shrink-0 self-stretch bg-foreground/25" />
    </div>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.44.09 1.17-.33 2.35-1.02 3.28-.69.93-1.84 1.64-2.86 1.66-.12-1.15.41-2.35 1.04-3.5z" />
    </svg>
  );
}

type Platform = {
  id: string;
  label: string;
  sub: string;
  icon: ComponentType<Record<string, any>>;
};

const topPlatforms: Platform[] = [
  { id: "android", label: "Android", sub: "APK · AAB · native & hybrid", icon: Smartphone },
  { id: "ios", label: "iOS", sub: "Simulator & physical devices", icon: AppleIcon },
];

const bottomPlatforms: Platform[] = [
  { id: "flutter", label: "Flutter", sub: "Cross-platform", icon: Layers },
  { id: "react-native", label: "React Native", sub: "JS-driven apps", icon: CodeXml },
  { id: "native", label: "Native", sub: "Kotlin · Swift · Obj-C", icon: Cpu },
];

const pillars = [
  {
    headline: "100%",
    title: "Flutter-ready",
    body: "Full compatibility with Flutter apps — same flows, real validation.",
  },
  {
    headline: "Unified",
    title: "One platform",
    body: "Android, iOS & Flutter in a single test matrix — no siloed tooling.",
  },
  {
    headline: "Real",
    title: "Device execution",
    body: "Tests run on actual devices and builds, not mocked runtimes.",
  },
];

function PillarContent({
  headline,
  title,
  body,
  variant = "default",
}: {
  headline: string;
  title: string;
  body: string;
  variant?: "default" | "compact" | "panorama";
}) {
  if (variant === "panorama") {
    return (
      <div className="relative z-10 w-full px-1 py-0.5 sm:px-2 sm:py-1">
        <div className="rounded-xl border border-white/30 bg-[hsl(220_52%_18%/0.85)] px-3 py-3 shadow-lg backdrop-blur-sm ring-1 ring-white/20 sm:rounded-2xl sm:px-4 sm:py-3.5 md:px-4 md:py-4 lg:px-5 lg:py-4">
          <p className="font-heading text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-4xl lg:text-5xl">
            {headline}
          </p>
          <p className="mt-1.5 font-heading text-sm font-semibold text-white sm:text-base md:mt-2 md:text-lg">
            {title}
          </p>
          <p className="mt-2 max-w-none text-xs leading-relaxed text-white/90 sm:text-sm md:mt-2.5 md:text-sm">
            {body}
          </p>
        </div>
      </div>
    );
  }
  const compact = variant === "compact";
  return (
    <div className={`relative z-10 ${compact ? "p-3 sm:p-4" : "p-4 sm:p-5 md:p-6"}`}>
      <div
        className={`rounded-xl border border-white/20 bg-[hsl(220_55%_22%/0.78)] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md ring-1 ring-white/10 ${
          compact ? "px-4 py-4 md:px-5 md:py-5" : "px-5 py-6 md:px-6 md:py-7"
        }`}
      >
        <p
          className={`font-heading font-bold tracking-tight text-white drop-shadow-sm ${
            compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
          }`}
        >
          {headline}
        </p>
        <p
          className={`mt-1.5 font-heading font-semibold text-white/95 ${compact ? "text-base md:text-lg" : "text-lg md:text-xl"}`}
        >
          {title}
        </p>
        <p
          className={`leading-relaxed text-white/75 ${compact ? "mt-2 text-xs md:text-sm" : "mt-3 text-sm md:text-[0.9375rem]"}`}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function PlatformTile({
  p,
  hero,
  className = "",
}: {
  p: Platform;
  hero?: boolean;
  className?: string;
}) {
  const Icon = p.icon;
  const isApple = p.id === "ios";
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/90 bg-card shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md ${
        hero
          ? "min-h-[140px] p-4 sm:min-h-[168px] sm:p-5 md:min-h-[180px] md:p-6"
          : "min-h-[118px] p-4 md:min-h-[128px] md:p-5"
      } ${className}`}
    >
      <div
        className={`mb-3 flex shrink-0 items-center justify-center rounded-lg bg-muted/80 text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary ${
          hero ? "h-11 w-11 md:h-12 md:w-12" : "h-10 w-10 md:h-11 md:w-11"
        }`}
      >
        {isApple ? (
          <AppleIcon className={hero ? "h-6 w-6 md:h-7 md:w-7" : "h-5 w-5 md:h-6 md:w-6"} />
        ) : (
          <Icon className={hero ? "h-6 w-6 md:h-7 md:w-7" : "h-5 w-5 md:h-6 md:w-6"} strokeWidth={1.5} aria-hidden />
        )}
      </div>
      <div>
        <p className={`font-heading font-bold text-foreground ${hero ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>
          {p.label}
        </p>
        <p className={`mt-0.5 text-muted-foreground ${hero ? "text-xs md:text-sm" : "text-[11px] md:text-xs"}`}>{p.sub}</p>
      </div>
    </div>
  );
}

const ModernFrameworksSection = () => {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-background section-edge w-full"
      aria-labelledby="frameworks-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="section-full relative z-10 pt-10 md:pt-14 2xl:pt-16 pb-[2.8rem] md:pb-14 2xl:pb-[4.2rem]">
        <header className="mb-10 w-full rounded-2xl border border-border bg-muted/20 px-6 py-8 md:mb-12 md:px-10 md:py-10 2xl:px-12 2xl:py-12 relative overflow-hidden shadow-sm">
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" aria-hidden />
          <div className="relative pl-4 md:pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3 md:mb-4">
              Compatibility
            </p>
            <h2
              id="frameworks-heading"
              className="font-heading text-2xl font-bold text-foreground tracking-tight leading-snug sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.25rem]"
            >
              Built for <span className="text-primary">Modern Mobile</span> Frameworks
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
              QApilot works <strong className="font-semibold text-foreground">post-build</strong> — it validates real
              application behavior on your binaries, independent of how they were built.
            </p>
          </div>
        </header>

        {/* Pillars: below header, above panorama — Velocity-style rails both sides */}
        <div className="mb-10 grid w-full grid-cols-1 items-stretch gap-x-4 md:mb-12 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-5 lg:gap-x-7 2xl:gap-x-9">
          <div className="hidden md:flex md:h-full md:min-h-0 md:self-stretch">
            <FrameworkSidePillar side="left" />
          </div>

          <div className="min-w-0 md:px-0">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10">
              <div className="flex min-w-0 flex-col justify-center gap-5">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:pr-2">
                  Ship with confidence whether your team uses native toolchains, Flutter, or React Native. One pipeline
                  validates what users actually experience — no framework-specific test harness required.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm md:px-3.5 md:text-sm">
                    Post-build validation
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary md:px-3.5 md:text-sm">
                    Framework-agnostic
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3 md:gap-4">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  {topPlatforms.map((p) => (
                    <PlatformTile key={p.id} p={p} hero />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:gap-4">
                  {bottomPlatforms.map((p) => (
                    <PlatformTile
                      key={p.id}
                      p={p}
                      className={p.id === "native" ? "col-span-2 sm:col-span-1" : ""}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:h-full md:min-h-0 md:self-stretch">
            <FrameworkSidePillar side="right" />
          </div>
        </div>

        {/* Panorama — full width, outside pillar rails */}
        <div className="md:mt-2 2xl:mt-4">
          <p className="sr-only">
            Panoramic landscape behind three highlights: {pillars.map((p) => p.headline).join(", ")}
          </p>

          <div className="hidden overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:grid sm:grid-cols-3 sm:gap-0">
            {pillars.map((item, i) => (
              <article
                key={item.headline}
                className={`relative flex items-center justify-center overflow-hidden px-1.5 py-2 sm:px-2 sm:py-2.5 md:py-3 ${
                  i < 2 ? "border-b border-white/15 sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <img
                  src={PANORAMA_SRC}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-[300%] max-w-none select-none object-cover"
                  style={{
                    transform: `translateX(-${i * (100 / 3)}%)`,
                    objectPosition: "center 30%",
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="relative z-10 w-full max-w-none">
                  <PillarContent variant="panorama" headline={item.headline} title={item.title} body={item.body} />
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:hidden">
            {pillars.map((item, i) => (
              <article
                key={item.headline}
                className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 px-2 py-2.5 shadow-xl"
              >
                <img
                  src={PANORAMA_SRC}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: `${i === 0 ? "18%" : i === 1 ? "50%" : "82%"} 30%`,
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="relative z-10 w-full">
                  <PillarContent variant="panorama" headline={item.headline} title={item.title} body={item.body} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFrameworksSection;
