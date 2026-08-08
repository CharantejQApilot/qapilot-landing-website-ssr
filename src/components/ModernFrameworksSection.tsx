import type { ComponentType } from "react";
import Link from "next/link";
import { Smartphone, Layers, CodeXml, Cpu } from "lucide-react";
import { marketingEyebrowClass, marketingSectionH2Class, marketingSectionIntroClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

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
  href?: string;
};

const topPlatforms: Platform[] = [
  {
    id: "android",
    label: "Android",
    sub: "APK · AAB · native & hybrid",
    icon: Smartphone,
    href: PATHS.FOR_ANDROID,
  },
  {
    id: "ios",
    label: "iOS",
    sub: "Simulator & physical devices",
    icon: AppleIcon,
    href: PATHS.FOR_IOS,
  },
];

const bottomPlatforms: Platform[] = [
  { id: "flutter", label: "Flutter", sub: "Cross-platform", icon: Layers, href: PATHS.FOR_FLUTTER },
  {
    id: "react-native",
    label: "React Native",
    sub: "JS-driven apps",
    icon: CodeXml,
    href: PATHS.FOR_REACT_NATIVE,
  },
  { id: "native", label: "Native", sub: "Kotlin · Swift · Obj-C", icon: Cpu },
];

const tileLinkClass =
  "font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary";

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
  const inner = (
    <>
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
    </>
  );
  const shellClass = `group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/90 bg-card shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-md ${
    hero
      ? "min-h-[140px] p-4 sm:min-h-[168px] sm:p-5 md:min-h-[180px] md:p-6"
      : "min-h-[118px] p-4 md:min-h-[128px] md:p-5"
  } ${className}`;

  if (p.href) {
    return (
      <Link href={p.href} className={shellClass} aria-label={`${p.label} testing`}>
        {inner}
      </Link>
    );
  }

  return <div className={shellClass}>{inner}</div>;
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
            <p className={marketingEyebrowClass}>Compatibility</p>
            <h2
              id="frameworks-heading"
              className={cn(marketingSectionH2Class, "text-foreground")}
            >
              Built for <span className="text-primary">Modern Mobile</span> Frameworks
            </h2>
            <p className={cn(marketingSectionIntroClass, "mt-4 w-full min-w-0 max-w-none md:mt-5")}>
              QApilot works <strong className="font-semibold text-foreground">post-build</strong>
              {"\u00A0"}— it validates real application behavior on your binaries, independent of how they were built.
            </p>
          </div>
        </header>

        {/* Platform grid — Velocity-style rails both sides */}
        <div className="mb-10 grid w-full grid-cols-1 items-stretch gap-x-4 md:mb-12 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-5 lg:gap-x-7 2xl:gap-x-9">
          <div className="hidden md:flex md:h-full md:min-h-0 md:self-stretch">
            <FrameworkSidePillar side="left" />
          </div>

          <div className="min-w-0 md:px-0">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10">
              <div className="flex min-w-0 flex-col justify-center gap-5">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:pr-2">
                  Ship with confidence whether your team uses{" "}
                  <Link href={PATHS.FOR_ANDROID} className={tileLinkClass}>
                    Android
                  </Link>
                  ,{" "}
                  <Link href={PATHS.FOR_IOS} className={tileLinkClass}>
                    iOS
                  </Link>
                  ,{" "}
                  <Link href={PATHS.FOR_FLUTTER} className={tileLinkClass}>
                    Flutter
                  </Link>
                  , or{" "}
                  <Link href={PATHS.FOR_REACT_NATIVE} className={tileLinkClass}>
                    React Native
                  </Link>
                  . One pipeline validates what users actually experience — no framework-specific test harness required.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  <span className="font-semibold text-foreground">Post-build validation</span>
                  <span className="mx-2 select-none text-muted-foreground/45 md:mx-2.5" aria-hidden>
                    ·
                  </span>
                  <span className="font-semibold text-foreground">Framework-agnostic</span>
                </p>
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
      </div>
    </section>
  );
};

export default ModernFrameworksSection;
