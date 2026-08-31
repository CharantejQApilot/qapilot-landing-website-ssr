import type { ReactNode } from "react";
import {
  HomeDarkAtmosphere,
  type HomeDarkGlow,
} from "@/components/home/HomeDarkAtmosphere";
import { HomeSeam } from "@/components/home/HomeSeam";
import { cn } from "@/lib/utils";

export type MarketingSectionSurface = "canvas" | "tint" | "ice" | "navy";

type MarketingSectionProps = {
  children: ReactNode;
  surface?: MarketingSectionSurface;
  /** Hairline + `+` at the top of the band. Default true. */
  seam?: boolean;
  /** Navy atmosphere glow. Ignored on light surfaces. */
  glow?: HomeDarkGlow;
  className?: string;
  /** Inner `.section-full` padding. */
  paddingClassName?: string;
  /** Skip the inner `.section-full` when children already provide it. */
  unpadded?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

const SURFACE: Record<MarketingSectionSurface, string> = {
  canvas: "home-canvas",
  tint: "home-tint",
  ice: "home-ice",
  navy: "section-navy",
};

/**
 * Canonical marketing chapter. Same seams, surfaces, and padding as home.
 */
export function MarketingSection({
  children,
  surface = "canvas",
  seam = true,
  glow = "top",
  className,
  paddingClassName = "py-16 md:py-20 lg:py-24",
  unpadded = false,
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: MarketingSectionProps) {
  const navy = surface === "navy";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(
        "relative section-edge w-full overflow-hidden",
        SURFACE[surface],
        className,
      )}
    >
      {seam ? <HomeSeam invert={navy} /> : null}
      {navy ? <HomeDarkAtmosphere glow={glow} /> : null}
      {surface === "ice" ? (
        <div
          className="pointer-events-none absolute inset-0 home-ice-grid"
          aria-hidden
        />
      ) : null}
      {unpadded ? (
        children
      ) : (
        <div className={cn("section-full relative z-[1]", paddingClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}
