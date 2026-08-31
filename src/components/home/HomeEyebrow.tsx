import type { ReactNode } from "react";
import { marketingEyebrowClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type HomeEyebrowProps = {
  children: ReactNode;
  invert?: boolean;
  className?: string;
  id?: string;
};

/**
 * Section eyebrow with a short leading rule. Same typeface as the rest of
 * the site — presence comes from the rule, not a font swap.
 */
export function HomeEyebrow({ children, invert = false, className, id }: HomeEyebrowProps) {
  return (
    <p
      id={id}
      className={cn(
        marketingEyebrowClass,
        "inline-flex items-center gap-2.5",
        invert && "!text-white/50",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-3 shrink-0",
          invert ? "bg-white/35" : "bg-muted-foreground/55",
        )}
        aria-hidden
      />
      {children}
    </p>
  );
}
