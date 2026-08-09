import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { HeroPixelDonutRippleDesktopOnly } from "@/components/marketing/HeroPixelDonutRippleDesktopOnly";

/** Progressive blur bands — values taken from exalt-studio.com hero (Framer export). */
const HERO_EXALT_BLUR_LAYERS: { blurPx: number; stops: [number, number, number, number] }[] = [
  { blurPx: 0.0390625, stops: [0, 12.5, 25, 37.5] },
  { blurPx: 0.078125, stops: [12.5, 25, 37.5, 50] },
  { blurPx: 0.15625, stops: [25, 37.5, 50, 62.5] },
  { blurPx: 0.3125, stops: [37.5, 50, 62.5, 75] },
  { blurPx: 0.625, stops: [50, 62.5, 75, 87.5] },
  { blurPx: 1.25, stops: [62.5, 75, 87.5, 100] },
  { blurPx: 2.5, stops: [75, 87.5, 100, 112.5] },
  { blurPx: 5, stops: [87.5, 100, 112.5, 125] },
];

function exaltBlurMask(a: number, b: number, c: number, d: number) {
  return `linear-gradient(to top, rgba(0,0,0,0) ${a}%, rgba(0,0,0,1) ${b}%, rgba(0,0,0,1) ${c}%, rgba(0,0,0,0) ${d}%)`;
}

export type MarketingBackgroundVariant = "hero" | "soft" | "none";

type MarketingBackgroundProps = {
  variant?: MarketingBackgroundVariant;
  className?: string;
  /** When false, omits `bg-hero-diagonal-grid` (e.g. home hero). Default true. */
  showDiagonalGrid?: boolean;
  /** Halftone ripple for `variant="hero"`. Default true. */
  showPixelRipple?: boolean;
  /**
   * When false, skips the stacked `backdrop-filter` progressive blur (8 full-viewport layers).
   * Much cheaper while scrolling; use on the home hero for smoother first paint / scroll.
   */
  progressiveBlur?: boolean;
};

/**
 * Layered backgrounds matching the home hero (globals.css utilities).
 * Place inside a `relative` container (full bleed: `absolute inset-0` or `inset-0`).
 */
export function MarketingBackground({
  variant = "hero",
  className,
  showDiagonalGrid = true,
  showPixelRipple = true,
  progressiveBlur = false,
}: MarketingBackgroundProps) {
  if (variant === "none") return null;

  if (variant === "soft") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-dot-pattern-subtle opacity-80" />
        <div className="absolute inset-0 bg-hero-grain" />
        <div className="hero-vignette" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="hero-exalt-mesh">
        <div className="hero-exalt-blob hero-exalt-blob--a" />
        <div className="hero-exalt-blob hero-exalt-blob--b" />
        <div className="hero-exalt-blob hero-exalt-blob--c" />
      </div>
      <div className="absolute inset-0 z-[1] bg-hero-gradient" />
      {showDiagonalGrid ? <div className="absolute inset-0 z-[2] bg-hero-diagonal-grid" /> : null}
      {showPixelRipple ? <HeroPixelDonutRippleDesktopOnly /> : null}
      <div className="absolute inset-0 z-[4] bg-hero-grain" />
      <span
        className="hero-corner-orb absolute left-0 top-0 z-[5] h-64 w-64 rounded-full bg-primary/5"
        style={{ boxShadow: "0 0 140px 90px hsl(218 65% 28% / 0.1)" }}
      />
      <span
        className="hero-corner-orb absolute bottom-0 right-0 z-[5] h-56 w-56 rounded-full bg-primary/10"
        style={{
          boxShadow: "0 0 120px 70px hsl(218 65% 28% / 0.18)",
          animationDelay: "-6s",
        }}
      />
      {progressiveBlur ? (
        <div className="hero-exalt-progressive-blur">
          {HERO_EXALT_BLUR_LAYERS.map(({ blurPx, stops }, i) => {
            const style: CSSProperties = {
              zIndex: i + 1,
              ["--hero-exalt-blur" as string]: `blur(${blurPx}px)`,
              ["--hero-exalt-mask" as string]: exaltBlurMask(stops[0], stops[1], stops[2], stops[3]),
            };
            return <div key={i} style={style} />;
          })}
        </div>
      ) : null}
      <div className="hero-exalt-top-fade" />
      <div className="hero-vignette z-[10]" />
    </div>
  );
}
