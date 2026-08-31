import { cn } from "@/lib/utils";
import { HomeHeroAtmosphere } from "@/components/home/HomeHeroAtmosphere";

export type MarketingBackgroundVariant = "hero" | "soft" | "none";

type MarketingBackgroundProps = {
  variant?: MarketingBackgroundVariant;
  className?: string;
  /** @deprecated Homepage lattice is the only hero atmosphere. Kept for call-site compat. */
  showDiagonalGrid?: boolean;
  /** @deprecated Pixel ripple removed. Kept for call-site compat. */
  showPixelRipple?: boolean;
  /** @deprecated Progressive blur removed. Kept for call-site compat. */
  progressiveBlur?: boolean;
};

/**
 * Site-wide atmosphere. Hero: structured grid + scan (same as home).
 * Soft: none — parent `home-canvas` is the surface.
 */
export function MarketingBackground({
  variant = "hero",
  className,
}: MarketingBackgroundProps) {
  if (variant === "none" || variant === "soft") return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <HomeHeroAtmosphere />
    </div>
  );
}
