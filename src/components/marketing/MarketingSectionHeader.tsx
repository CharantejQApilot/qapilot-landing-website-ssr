import { type ReactNode } from "react";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import {
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type MarketingSectionHeaderProps = {
  id: string;
  /** Small caps label above the title */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Overrides the default full-width measure on the intro. */
  descriptionClassName?: string;
  /** @deprecated Kept for call-site compat; headers are flush left. */
  variant?: "rail" | "center";
  className?: string;
  marginBottomClassName?: string;
  /** Navy chapters: fade the eyebrow to white. */
  invert?: boolean;
};

/**
 * Full-width flush section header. Call-site card chrome (border/bg/shadow) is ignored
 * so titles are not trapped in a narrow white panel.
 */
export function MarketingSectionHeader({
  id,
  eyebrow,
  title,
  description,
  descriptionClassName,
  className: _ignoredChrome,
  marginBottomClassName = "mb-10 md:mb-12 2xl:mb-14",
  invert = false,
}: MarketingSectionHeaderProps) {
  return (
    <header className={cn("relative w-full border-b border-border/80 pb-6 md:pb-8", invert && "border-white/15", marginBottomClassName)}>
      {eyebrow ? <HomeEyebrow invert={invert}>{eyebrow}</HomeEyebrow> : null}
      <h2
        id={id}
        className={cn(
          marketingSectionH2Class,
          "w-full max-w-none text-foreground text-balance",
          eyebrow || description ? "mb-0" : undefined,
        )}
      >
        {title}
      </h2>
      {description ? (
        typeof description === "string" ? (
          <p
            className={cn(
              marketingSectionIntroClass,
              "mt-4 w-full max-w-none md:mt-5",
              invert && "!text-white/65",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : (
          <div
            className={cn(
              marketingSectionIntroClass,
              "mt-4 w-full max-w-none space-y-4 md:mt-5",
              invert && "!text-white/65",
              descriptionClassName,
            )}
          >
            {description}
          </div>
        )
      ) : null}
    </header>
  );
}
