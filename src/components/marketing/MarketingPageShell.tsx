import { cn } from "@/lib/utils";
import {
  MarketingBackground,
  type MarketingBackgroundVariant,
} from "./MarketingBackground";

type MarketingPageShellProps = {
  children: React.ReactNode;
  /** Full-page atmosphere; use `none` when a child section provides its own stack. */
  background?: MarketingBackgroundVariant;
  className?: string;
  /** Applied to the content wrapper above the background (e.g. contain-layout). */
  contentClassName?: string;
};

/**
 * Standard marketing page wrapper: min-height, optional unified background, content above layers.
 */
export function MarketingPageShell({
  children,
  background = "hero",
  className,
  contentClassName,
}: MarketingPageShellProps) {
  return (
    <div
      className={cn(
        "relative isolate z-0 min-h-screen bg-background",
        className,
      )}
    >
      {background !== "none" ? (
        <MarketingBackground variant={background} />
      ) : null}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
