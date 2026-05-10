"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Handshake,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import { MarketingBackground, MarketingSectionHeader } from "@/components/marketing";
import { HUBSPOT_PARTNERS_FORM_ID } from "@/lib/constants";
import {
  marketingHeroH1Class,
  marketingHeroLeadClass,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import {
  DEFAULT_PARTNER_LOGO_CLASS,
  PARTNERS,
  resolvePartnerLogoSrc,
} from "@/lib/partners-data";
import { cn } from "@/lib/utils";

const valueChips = [
  { label: "Outcomes-led", Icon: Target },
  { label: "AI-native delivery", Icon: Sparkles },
  { label: "Scalable on demand", Icon: Rocket },
  { label: "Service + software ecosystem", Icon: Handshake },
] as const;

const sasPillars = [
  {
    title: "Outcomes, Not Effort",
    description:
      "Engagements anchored to measurable QE outcomes such as release readiness, regression coverage, and time-to-feedback, instead of billable hours and script counts.",
    Icon: Target,
  },
  {
    title: "Software Where Services Used To Be",
    description:
      "Routine, predictable testing work moves into AI-native software. Partners focus on strategy, judgment, and the customer outcomes humans do best.",
    Icon: Sparkles,
  },
  {
    title: "A Service + Software Ecosystem",
    description:
      "QApilot's platform pairs with our partners' delivery muscle, so enterprises adopt Service-as-Software for mobile app testing without rebuilding their teams.",
    Icon: Handshake,
  },
] as const;

const partnerBenefits = [
  {
    title: "Dedicated Partner Management",
    description: "A named partner manager and solution engineer to support every engagement end-to-end.",
    Icon: Handshake,
  },
  {
    title: "Co-Marketing & Enablement",
    description: "Joint webinars, case studies, and campaign collateral that put your QA practice front and centre.",
    Icon: Megaphone,
  },
  {
    title: "Training & Certification",
    description: "Role-based onboarding, hands-on labs, and certification paths for your QE practitioners.",
    Icon: BookOpen,
  },
  {
    title: "Listing On QApilot Website",
    description: "Featured placement on this page and in customer conversations as a recommended QApilot partner.",
    Icon: Users,
  },
] as const;

const PartnersClient = () => {
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);

  return (
    <>
      <section
        className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
        aria-label="Partners hero"
        aria-labelledby="partners-hero-title"
      >
        <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple={false} progressiveBlur={false} />
        <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
            <h1
              id="partners-hero-title"
              className={cn(
                marketingHeroH1Class,
                "mb-4 w-full text-balance sm:mb-5 md:mb-6",
                "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
              )}
            >
              Partners Powering <span className="text-primary">Smarter Mobile QE</span>
            </h1>
            <p className="mb-6 font-heading text-base font-semibold tracking-tight text-primary sm:mb-7 sm:text-lg md:mb-8 md:text-xl">
              Service-as-Software For Mobile App Testing
            </p>
            <p
              className={cn(
                marketingHeroLeadClass,
                "mx-auto mb-10 max-w-3xl text-balance sm:mb-11 md:mb-12 lg:max-w-4xl",
              )}
            >
              Together with our partners, QApilot delivers mobile quality engineering as software: outcomes-led,
              AI-native, and built to scale beyond manual effort.
            </p>

            <ul className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {valueChips.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-card/80 p-3 shadow-sm backdrop-blur-sm sm:p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/30">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <span className="text-left text-sm font-medium text-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="section-edge w-full border-t border-border/60 bg-background"
        aria-labelledby="partners-sas-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="partners-sas-heading"
            title={
              <>
                What <span className="text-primary">Service-as-Software</span> Means For Mobile App Testing
              </>
            }
            description="Mobile app testing has long been delivered as a service: scripts, manual coverage, and people-heavy maintenance. With QApilot, our partners deliver it as software that is automated, outcomes-led, and built to scale."
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {sasPillars.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex h-full items-start gap-3 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-sm md:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15 md:h-11 md:w-11">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-base font-semibold text-foreground md:text-lg">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section-edge w-full border-t border-border/60 bg-gradient-to-b from-muted/[0.12] via-background to-background"
        aria-labelledby="partners-grid-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="partners-grid-heading"
            title={
              <>
                Meet Our <span className="text-primary">Partners</span>
              </>
            }
            description="A growing ecosystem of services and technology partners helping teams put AI-native mobile testing into practice."
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
            {PARTNERS.map((partner) => {
              const logoSrc = resolvePartnerLogoSrc(partner.logo);
              const logoSizeClass = partner.logoClassName ?? DEFAULT_PARTNER_LOGO_CLASS;
              const cardInner = (
                <>
                  <div className="mb-6 flex h-20 w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background/80 px-4 py-3">
                    <img
                      src={logoSrc}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-auto w-auto object-contain",
                        logoSizeClass,
                      )}
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                    {partner.name}
                  </h3>
                  <p className={cn(marketingSectionIntroClass, "mt-3 flex-1 text-pretty text-sm md:text-base")}>
                    {partner.description}
                  </p>
                  {partner.url ? (
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                      <span className="sr-only"> about {partner.name} (opens in a new tab)</span>
                    </span>
                  ) : null}
                </>
              );

              const cardClass = cn(
                "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8",
                "transition-colors motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
              );

              return (
                <li key={partner.name} className="h-full">
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                      aria-label={`${partner.name} - opens in a new tab`}
                    >
                      <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/80" aria-hidden />
                      <div className="relative flex h-full flex-col pl-3 md:pl-4">{cardInner}</div>
                    </a>
                  ) : (
                    <article className={cardClass}>
                      <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/80" aria-hidden />
                      <div className="relative flex h-full flex-col pl-3 md:pl-4">{cardInner}</div>
                    </article>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="section-edge w-full border-t border-border/60 bg-gradient-to-b from-primary/[0.04] via-background to-background"
        aria-labelledby="partners-cta-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="partners-cta-heading"
            eyebrow="Become A Partner"
            title="Build The Next Chapter Of Mobile QE With Us"
            description="Join a growing ecosystem of consulting and technology partners delivering Service-as-Software for mobile app testing, together with QApilot."
            className="border-primary/25 bg-gradient-to-br from-primary/[0.07] via-card/90 to-card/80 shadow-md backdrop-blur-sm"
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          <ul className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-12 md:gap-5 lg:grid-cols-4 2xl:mb-14">
            {partnerBenefits.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex h-full items-start gap-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur-sm md:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15 md:h-11 md:w-11">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-base font-semibold text-foreground md:text-lg">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <Button
              onClick={() => setIsPartnerFormOpen(true)}
              size="lg"
              className="bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 2xl:text-lg"
            >
              Become a Partner →
            </Button>
          </div>
        </div>
      </section>

      <HubSpotFormDialog
        isOpen={isPartnerFormOpen}
        onClose={() => setIsPartnerFormOpen(false)}
        title="Become a Partner"
        description="Tell us about your firm and how you'd like to partner with QApilot. Our team will be in touch."
        formId={HUBSPOT_PARTNERS_FORM_ID}
        formName="Partners - Become a Partner"
        apiPath="/api/hubspot/partners"
      />
    </>
  );
};

export default PartnersClient;
