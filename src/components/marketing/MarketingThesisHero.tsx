import type { ReactNode } from "react";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingHeroH1Class,
  marketingHeroLeadClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type MarketingThesisHeroProps = {
  /** Accessible name when no visible title id is enough */
  ariaLabel?: string;
  titleId?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Primary lead under the H1 */
  lead?: ReactNode;
  /** Extra paragraphs / supporting copy under the lead */
  children?: ReactNode;
  cta?: ReactNode;
  /** Optional right-column media (S01 split). */
  media?: ReactNode;
  /** Match home / compare viewport height treatment */
  fillViewport?: boolean;
  /** Overrides default section-full vertical padding */
  paddingClassName?: string;
  className?: string;
};

/**
 * S01 thesis hero. Left-aligned copy; optional media from lg up.
 */
export function MarketingThesisHero({
  ariaLabel,
  titleId,
  eyebrow,
  title,
  lead,
  children,
  cta,
  media,
  fillViewport = false,
  paddingClassName,
  className,
}: MarketingThesisHeroProps) {
  const copy = (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-start text-left",
        media && "lg:max-w-none",
      )}
    >
      {eyebrow ? (
        <p className="mb-3 w-full text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
          {eyebrow}
        </p>
      ) : null}

      <h1
        id={titleId}
        className={cn(
          marketingHeroH1Class,
          "mb-5 w-full text-balance sm:mb-6 md:mb-8",
          "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
        )}
      >
        {title}
      </h1>

      {lead ? (
        typeof lead === "string" ? (
          <p className={cn(marketingHeroLeadClass, "mb-8 sm:mb-10 md:mb-11")}>
            {lead}
          </p>
        ) : (
          <div className={cn(marketingHeroLeadClass, "mb-8 sm:mb-10 md:mb-11")}>
            {lead}
          </div>
        )
      ) : null}

      {children}

      {cta ? (
        <div className="sig-cta-row mt-2 w-full justify-start">
          {cta}
        </div>
      ) : null}
    </div>
  );

  return (
    <section
      className={cn(
        "hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible",
        fillViewport &&
          "border-b border-border/40 lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:flex-col",
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div
        className={cn(
          "relative z-10 w-full",
          fillViewport
            ? "flex flex-col lg:min-h-0 lg:flex-1 lg:justify-center"
            : undefined,
        )}
      >
        <div
          className={cn(
            "section-full",
            paddingClassName
              ? paddingClassName
              : fillViewport
                ? "flex flex-col pt-10 sm:pt-16 md:pt-20 lg:pt-0 lg:pb-0"
                : "py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32",
          )}
        >
          {media ? (
            <div className="sig-split max-lg:[grid-template-columns:minmax(0,1fr)] items-center">
              {copy}
              <div className="hidden min-w-0 w-full lg:block">{media}</div>
            </div>
          ) : (
            copy
          )}
        </div>
      </div>
    </section>
  );
}
