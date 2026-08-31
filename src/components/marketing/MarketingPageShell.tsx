import { cn } from "@/lib/utils";
import {
  MarketingBackground,
  type MarketingBackgroundVariant,
} from "./MarketingBackground";

/** @deprecated Hero atmosphere lives on the hero band, not the page shell. */
export type MarketingHeroBackgroundOptions = {
  showDiagonalGrid?: boolean;
  showPixelRipple?: boolean;
  progressiveBlur?: boolean;
};

type MarketingPageShellProps = {
  children: React.ReactNode;
  /** Full-page atmosphere; use `none` when a child section provides its own stack. */
  background?: MarketingBackgroundVariant;
  className?: string;
  /** Applied to the content wrapper above the background (e.g. contain-layout). */
  contentClassName?: string;
  /** @deprecated Ignored. Hero atmosphere is per-hero. */
  heroBackgroundOptions?: MarketingHeroBackgroundOptions;
};

/**
 * Marketing page wrapper. White canvas like home. Heroes paint their own grid.
 */
export function MarketingPageShell({
  children,
  background = "none",
  className,
  contentClassName,
}: MarketingPageShellProps) {
  return (
    <div
      className={cn(
        "relative isolate z-0 min-h-screen home-canvas",
        className,
      )}
    >
      {background === "hero" ? <MarketingBackground variant="hero" /> : null}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
