import type { ReactNode } from "react";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingEyebrowClass,
  marketingHeroH1Class,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type CaseStudyHeroProps = {
  titleId: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
  media?: ReactNode;
  mediaVariant?: "logo" | "device";
};

/**
 * Case-study thesis hero. Device variant uses home-hero H1 scale so the
 * headline wraps across more lines beside the phone.
 */
export function CaseStudyHero({
  titleId,
  eyebrow,
  title,
  lead,
  cta,
  children,
  media,
  mediaVariant = "logo",
}: CaseStudyHeroProps) {
  const isDevice = mediaVariant === "device";

  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-clip border-b border-border/40"
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
          isDevice
            ? "py-12 sm:py-14 md:py-16 lg:py-16 xl:py-20"
            : "py-12 sm:py-14 md:py-16 lg:py-20",
        )}
      >
        <div className="section-full">
          <div
            className={cn(
              "w-full min-w-0",
              media &&
                isDevice &&
                "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-8 xl:gap-x-10",
              media &&
                !isDevice &&
                "flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(14rem,0.7fr)] lg:items-start lg:gap-12 xl:gap-16",
              !media && "flex flex-col",
            )}
          >
            <div className="flex min-w-0 w-full flex-col items-start text-left">
              {eyebrow ? (
                <p className={cn(marketingEyebrowClass, "text-primary/90")}>
                  {eyebrow}
                </p>
              ) : null}

              <h1
                id={titleId}
                className={cn(
                  isDevice
                    ? cn(marketingHeroH1Class, "w-full text-pretty")
                    : "w-full max-w-3xl font-heading text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-foreground text-pretty sm:text-4xl sm:leading-[1.16] md:text-[2.5rem] md:leading-[1.14] lg:text-[2.75rem] xl:text-5xl xl:leading-[1.12]",
                )}
              >
                {title}
              </h1>

              {lead ? (
                typeof lead === "string" ? (
                  <p
                    className={cn(
                      "mt-5 w-full leading-relaxed text-muted-foreground sm:mt-6",
                      isDevice
                        ? "text-lg sm:text-xl md:text-[1.35rem] md:leading-relaxed"
                        : "max-w-2xl text-base md:text-lg",
                    )}
                  >
                    {lead}
                  </p>
                ) : (
                  <div
                    className={cn(
                      "mt-5 w-full leading-relaxed text-muted-foreground sm:mt-6",
                      isDevice
                        ? "text-lg sm:text-xl md:text-[1.35rem] md:leading-relaxed"
                        : "max-w-2xl text-base md:text-lg",
                    )}
                  >
                    {lead}
                  </div>
                )
              ) : null}

              {children}

              {cta ? (
                <div className="sig-cta-row mt-8 w-full justify-start sm:mt-9">
                  {cta}
                </div>
              ) : null}
            </div>

            {media ? (
              <div
                className={cn(
                  "hidden min-w-0 lg:flex",
                  isDevice ? "items-center justify-center" : "w-full pt-10",
                )}
              >
                {media}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
