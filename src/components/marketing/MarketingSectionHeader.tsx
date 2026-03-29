import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingSectionHeaderProps = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Default matches VelocitySection: left rail + muted panel */
  variant?: "rail" | "center";
  className?: string;
  marginBottomClassName?: string;
};

/**
 * Section title treatment used on the home page (e.g. VelocitySection):
 * rounded panel, primary left rail, bold heading + optional subcopy.
 */
export function MarketingSectionHeader({
  id,
  title,
  description,
  variant = "rail",
  className,
  marginBottomClassName = "mb-10 md:mb-12 2xl:mb-14",
}: MarketingSectionHeaderProps) {
  const isRail = variant === "rail";

  return (
    <header
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-muted/25 px-6 py-8 md:px-10 md:py-10 2xl:px-12 2xl:py-12",
        marginBottomClassName,
        variant === "center" && "pt-10 text-center md:pt-12",
        className,
      )}
    >
      {isRail ? (
        <span className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-primary" aria-hidden />
      ) : (
        <span
          className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-full bg-primary/90"
          aria-hidden
        />
      )}
      <div
        className={cn("relative", isRail ? "pl-4 md:pl-5" : "px-2")}
      >
        <h2
          id={id}
          className={cn(
            "font-heading text-3xl font-bold leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl 2xl:text-6xl",
            description ? "mb-5 md:mb-6" : undefined,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="w-full text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>
        ) : null}
      </div>
    </header>
  );
}
