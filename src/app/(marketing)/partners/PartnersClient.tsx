"use client";

import { useState } from "react";
import {
  Bot,
  Brain,
  Building2,
  ClipboardList,
  Cpu,
  Handshake,
  Layers,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";
import {
  MarketingBackground,
  MarketingSectionHeader,
} from "@/components/marketing";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { HUBSPOT_PARTNERS_FORM_ID } from "@/lib/constants";
import {
  marketingHeroH1Class,
  marketingHeroLeadClass,
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import type { Partner } from "@/lib/partners-data";
import {
  DEFAULT_PARTNER_LOGO_CLASS,
  PARTNERS,
  resolvePartnerLogoSrc,
} from "@/lib/partners-data";
import { cn } from "@/lib/utils";

const opportunitySteps = [
  {
    key: "land",
    title: "Land",
    body: "Win with high-friction mobile use cases like regression, Flutter testing, or release validation.",
    Icon: Rocket,
  },
  {
    key: "prove",
    title: "Prove",
    body: "Show faster test creation, reduced maintenance, and stronger coverage through a focused POC.",
    Icon: ShieldCheck,
  },
  {
    key: "expand",
    title: "Expand",
    body: "Grow into QA framework modernization, AI services, and broader quality transformation.",
    Icon: Sparkles,
  },
] as const;

const whyChooseCards = [
  {
    title: "Mobile-First Platform",
    body: "Built for real mobile complexity, not retrofitted from web automation.",
    Icon: Smartphone,
  },
  {
    title: "Agentic AI Advantage",
    body: "Bring autonomous testing, self-healing, and AI agents into customer conversations.",
    Icon: Bot,
  },
  {
    title: "Partner-Led Delivery",
    body: "You own the customer relationship. QApilot powers the platform layer.",
    Icon: Handshake,
  },
] as const;

const partnerTypeCards = [
  {
    title: "System Integrator Partners",
    body: "Embed QApilot into enterprise modernization programs and help customers connect mobile QA with their wider engineering, DevOps, and release workflows.",
    Icon: Building2,
  },
  {
    title: "Testing / QE Services Partners",
    body: "Use QApilot to deliver faster mobile automation, stronger regression coverage, Flutter testing, and release-readiness programs without scaling manual effort.",
    Icon: TestTube2,
  },
  {
    title: "AI Consulting Partners",
    body: "Bring a practical agentic AI use case to customers through autonomous test creation, context-aware agents, self-healing automation, and measurable QA outcomes.",
    Icon: Brain,
  },
] as const;

const revenueCards = [
  {
    title: "Automation Backlog",
    body: "Accelerate mobile test creation without heavy scripting.",
    Icon: ClipboardList,
  },
  {
    title: "Flutter Coverage",
    body: "Serve customers struggling with Flutter, native, and web-view transitions.",
    Icon: Layers,
  },
  {
    title: "Release Validation",
    body: "Continuously test critical journeys before every release.",
    Icon: Rocket,
  },
  {
    title: "AI Transformation",
    body: "Add a practical agentic AI story to QA modernization programs.",
    Icon: Cpu,
  },
] as const;

const portfolioPills = [
  "Test Automation Implementation",
  "QA Framework Modernization",
  "AI Services & Consulting",
  "Flutter Testing Services",
  "Release Readiness Programs",
  "Regression Testing at Scale",
  "Mobile App Quality Audits",
  "POC-led Customer Expansion",
] as const;

const partnerLogoTileClass = cn(
  "flex min-h-[5.75rem] w-full items-center justify-center rounded-xl border border-border/60 bg-background/80 px-6 py-5 sm:min-h-24 sm:px-7 sm:py-6",
  "transition-colors hover:border-border hover:bg-background",
);

function PartnersLogoTile({ partner }: { partner: Partner }) {
  const logoSrc = resolvePartnerLogoSrc(partner.logo);
  const logoSizeClass = partner.logoClassName ?? DEFAULT_PARTNER_LOGO_CLASS;

  const logoWell = (
    <div className={cn(partnerLogoTileClass, partner.logoFrameClassName)}>
      <img
        src={logoSrc}
        alt={`${partner.name} logo`}
        loading="lazy"
        decoding="async"
        className={cn("h-auto w-auto object-contain", logoSizeClass)}
      />
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {logoWell}
        <span className="sr-only">{partner.name} (opens in new tab)</span>
      </a>
    );
  }

  return logoWell;
}

const PartnersClient = () => {
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);

  const openForm = () => setIsPartnerFormOpen(true);

  return (
    <>
      <section
        className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40"
        aria-label="Partners hero"
        aria-labelledby="partners-hero-title"
      >
        <MarketingBackground
          variant="hero"
          showDiagonalGrid={false}
          showPixelRipple={false}
          progressiveBlur={false}
        />
        <div className="relative z-10 section-full py-14 sm:py-16 md:py-20 lg:py-24 2xl:py-28">
          <div className="flex max-w-5xl flex-col items-start text-left">
            <h1
              id="partners-hero-title"
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-balance sm:mb-6",
                "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
              )}
            >
              Build The Next Chapter Of{" "}
              <span className="text-primary">Mobile QE</span> With Us
            </h1>
            <p
              className={cn(
                marketingHeroLeadClass,
                "mb-10 sm:mb-11",
              )}
            >
              Help customers move from brittle mobile automation to AI-native
              release readiness. QApilot gives partners a mobile-first platform
              to land faster, expand wider, and bring agentic AI into every QA
              conversation.
            </p>
            <Button
              type="button"
              onClick={openForm}
              size="lg"
              className="bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 2xl:text-lg"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      <section
        className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/25 via-background to-background py-12 md:py-16 2xl:py-20"
        aria-labelledby="partner-opportunity-heading"
      >
        <div className="section-full">
          <MarketingSectionHeader
            id="partner-opportunity-heading"
            variant="center"
            title={
              <>
                Land Mobile. <span className="text-primary">Expand QA.</span>
              </>
            }
            description="Start with one painful mobile testing problem. Expand into automation, QA modernization, AI consulting, and release readiness."
            marginBottomClassName="mb-8 md:mb-10"
          />

          <MarketingLedger cols={3} aria-label="Partner opportunity steps">
            {opportunitySteps.map((step, index) => (
              <MarketingLedgerCell key={step.key} className="relative">
                <span
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold tabular-nums text-primary md:right-6 md:top-6"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="relative pr-10">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <step.Icon
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.body}
                  </p>
                </div>
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section
        className="section-edge w-full border-b border-border/50 bg-background py-12 md:py-16 2xl:py-20"
        aria-labelledby="partners-logos-heading why-partners-heading"
      >
        <div className="section-full">
          <MarketingSectionHeader
            id="partners-logos-heading"
            title={
              <>
                Partners Building{" "}
                <span className="text-primary">With QApilot</span>
              </>
            }
            description="Consulting, QA, and digital engineering partners bringing AI-native mobile testing to enterprise customers."
            marginBottomClassName="mb-8 md:mb-10"
          />

          <ul
            className="grid w-full grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4 md:gap-7 lg:gap-8"
            aria-label="Partner logos"
          >
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <PartnersLogoTile partner={partner} />
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-border/40 pt-10 md:mt-14 md:pt-12">
            <h2 id="why-partners-heading" className="sr-only">
              Why partners choose QApilot
            </h2>
            <MarketingLedger cols={3} aria-label="Why partners choose QApilot">
              {whyChooseCards.map(({ title, body, Icon }) => (
                <MarketingLedgerCell key={title} as="div">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {body}
                  </p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
          </div>
        </div>
      </section>

      <section
        className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-background to-muted/15 py-12 md:py-16 2xl:py-20"
        aria-labelledby="partner-types-heading"
      >
        <div className="section-full">
          <MarketingSectionHeader
            id="partner-types-heading"
            title={
              <>
                Built for Different{" "}
                <span className="text-primary">Partner Motions</span>
              </>
            }
            description="Whether you lead transformation, own QA delivery, or advise enterprises on AI adoption, QApilot gives you a mobile-first platform to turn agentic testing into customer outcomes."
            marginBottomClassName="mb-8 md:mb-10"
          />

          <MarketingLedger cols={3} aria-label="Partner types">
            {partnerTypeCards.map(({ title, body, Icon }) => (
              <MarketingLedgerCell key={title} as="div">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.07] text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-foreground md:text-lg">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section
        className="section-edge w-full border-b border-border/50 bg-background py-12 md:py-16 2xl:py-20"
        aria-labelledby="revenue-heading"
      >
        <div className="section-full">
          <MarketingSectionHeader
            id="revenue-heading"
            title={
              <>
                Turn Customer QA Pain Into{" "}
                <span className="text-primary">Partner Revenue</span>
              </>
            }
            marginBottomClassName="mb-8 md:mb-10"
          />

          <MarketingLedger cols={2} aria-label="Partner revenue motions">
            {revenueCards.map(({ title, body, Icon }) => (
              <MarketingLedgerCell key={title} as="div">
                <Icon
                  className="h-5 w-5 text-primary"
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-3 font-heading text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section
        className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20"
        aria-labelledby="portfolio-heading"
      >
        <div className="section-full">
          <MarketingSectionHeader
            id="portfolio-heading"
            title={
              <>
                Where QApilot Fits Into Your{" "}
                <span className="text-primary">Services Portfolio</span>
              </>
            }
            marginBottomClassName="mb-8 md:mb-10"
          />

          <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
            {portfolioPills.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-border/70 bg-card/90 px-4 py-2 text-center text-xs font-medium text-foreground shadow-sm sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-edge w-full border-t border-primary/15 bg-gradient-to-b from-primary/[0.08] via-primary/[0.04] to-background py-12 md:py-16 2xl:py-20"
        aria-labelledby="final-cta-heading"
      >
        <div className="section-full">
          <div className="sig-close">
            <h2
              id="final-cta-heading"
              className={cn(marketingSectionH2Class, "text-foreground")}
            >
              Build Your Agentic Mobile QA Practice{" "}
              <span className="text-primary">With QApilot</span>
            </h2>
            <p
              className={cn(
                marketingSectionIntroClass,
                "mx-auto mt-4 max-w-xl text-pretty",
              )}
            >
              Land with mobile testing. Expand into QA modernization, AI
              services, and release readiness.
            </p>
            <div className="sig-cta-row">
              <Button
                type="button"
                onClick={openForm}
                size="lg"
                className="bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 2xl:text-lg"
              >
                Become a Partner
              </Button>
            </div>
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
