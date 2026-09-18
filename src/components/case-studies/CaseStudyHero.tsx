import type { ReactNode } from "react";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeHeroAtmosphere } from "@/components/home/HomeHeroAtmosphere";
import { marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type CaseStudyHeroProps = {
  titleId: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  cta?: ReactNode;
  children?: ReactNode;
};

/**
 * Text-only case-study thesis header. Same atmosphere as other marketing
 * heroes; H1 stays sentence-scale so long titles stay readable.
 */
export function CaseStudyHero({
  titleId,
  eyebrow,
  title,
  lead,
  cta,
  children,
}: CaseStudyHeroProps) {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-clip home-canvas"
      aria-labelledby={titleId}
    >
      <HomeHeroAtmosphere />
      <div className="relative z-10 w-full py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="section-full">
          <div className="flex w-full min-w-0 flex-col items-start text-left">
            {eyebrow ? <HomeEyebrow>{eyebrow}</HomeEyebrow> : null}

            <h1
              id={titleId}
              className="w-full max-w-5xl font-heading text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-pretty text-foreground sm:text-4xl sm:leading-[1.16] md:text-[2.5rem] md:leading-[1.14] lg:text-[2.75rem] xl:text-5xl xl:leading-[1.12]"
            >
              {title}
            </h1>

            {lead ? (
              typeof lead === "string" ? (
                <p className={cn(marketingHeroLeadClass, "mt-5 sm:mt-6 md:mt-7")}>
                  {lead}
                </p>
              ) : (
                <div className={cn(marketingHeroLeadClass, "mt-5 sm:mt-6 md:mt-7")}>
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
        </div>
      </div>
    </section>
  );
}
