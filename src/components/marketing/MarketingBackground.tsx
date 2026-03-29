import { cn } from "@/lib/utils";

export type MarketingBackgroundVariant = "hero" | "soft" | "none";

type MarketingBackgroundProps = {
  variant?: MarketingBackgroundVariant;
  className?: string;
};

/**
 * Layered backgrounds matching the home hero (globals.css utilities).
 * Place inside a `relative` container (full bleed: `absolute inset-0` or `inset-0`).
 */
export function MarketingBackground({
  variant = "hero",
  className,
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
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-diagonal-grid" />
      <div className="absolute inset-0 bg-hero-grain" />
      <div className="hero-vignette" />
      <span
        className="hero-corner-orb absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/5"
        style={{ boxShadow: "0 0 140px 90px hsl(218 65% 28% / 0.1)" }}
      />
      <span
        className="hero-corner-orb absolute bottom-0 right-0 h-56 w-56 rounded-full bg-primary/10"
        style={{
          boxShadow: "0 0 120px 70px hsl(218 65% 28% / 0.18)",
          animationDelay: "-6s",
        }}
      />
    </div>
  );
}
