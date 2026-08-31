import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Minus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyPhoneScreenshot, GemlAppMock } from "@/components/case-studies/CaseStudyPhoneFrame";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import {
  MarketingLedger,
  MarketingLedgerCell,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing";
import { CASE_STUDIES, caseStudyPath, type CaseStudy } from "@/lib/case-studies-data";
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = [Sparkles, ShieldCheck, Cpu, Users] as const;

function CaseStudyLogo({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-md border border-border/70 bg-card px-8 py-10",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={study.logoSrc}
        alt={study.logoAlt}
        className="max-h-14 w-auto max-w-[12rem] object-contain sm:max-h-16"
      />
    </div>
  );
}

function CaseStudyHeroMedia({
  study,
  priority = false,
}: {
  study: CaseStudy;
  priority?: boolean;
}) {
  if (study.heroImageSrc) {
    return (
      <CaseStudyPhoneScreenshot
        src={study.heroImageSrc}
        alt={study.heroImageAlt ?? study.logoAlt}
        priority={priority}
      />
    );
  }

  if (study.heroMock === "geml") {
    return <GemlAppMock />;
  }

  return <CaseStudyLogo study={study} />;
}

function IconWell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const hasDeviceMedia = Boolean(study.heroImageSrc || study.heroMock);
  const relatedStudies = CASE_STUDIES.filter((other) => other.slug !== study.slug);
  const aboutFacts = [
    { label: "Industry", value: study.about.industry },
    { label: "Headquarters", value: study.about.headquarters },
    { label: "Engagement", value: study.about.engagement },
    { label: "Platforms", value: study.about.platforms },
  ] as const;

  return (
    <main>
      <CaseStudyHero
        titleId={`${study.slug}-hero`}
        eyebrow={
          <>
            <Link href={PATHS.CASE_STUDIES} className="hover:text-primary">
              Case studies
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{study.clientName}</span>
          </>
        }
        title={
          <>
            {study.titleBefore}
            <em className="font-semibold not-italic text-primary sm:italic">
              {study.titleAccent}
            </em>
            {study.titleAfter}
          </>
        }
        lead={study.subtitle}
        cta={
          <BookDemoCtaButton
            size="lg"
            className="rounded-xl px-6 py-3.5 text-base font-semibold shadow-md shadow-primary/20 sm:px-8 sm:py-4 sm:text-lg"
          >
            Book a Demo
          </BookDemoCtaButton>
        }
        media={<CaseStudyHeroMedia study={study} priority />}
        mediaVariant={hasDeviceMedia ? "device" : "logo"}
      >
        <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
          {study.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div
          className={cn(
            "w-full lg:hidden",
            hasDeviceMedia ? "mt-8 flex justify-center" : "mt-6",
          )}
        >
          <CaseStudyHeroMedia study={study} />
        </div>
      </CaseStudyHero>

      <MarketingSection
        surface="navy"
        glow="top"
        paddingClassName="py-8 sm:py-10 md:py-12 2xl:py-16"
        aria-labelledby={`${study.slug}-metrics`}
      >
            <HomeEyebrow invert>Results</HomeEyebrow>
            <h2
              id={`${study.slug}-metrics`}
              className={cn(marketingSectionH2Class, "mb-6 text-left md:mb-8")}
            >
              Results by the numbers
            </h2>
            <dl className="relative z-10 grid gap-5 sm:grid-cols-3 sm:gap-8">
              {study.facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/45 sm:text-xs">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-heading text-base font-semibold tracking-tight text-primary-foreground md:text-lg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
      </MarketingSection>

        <div
          className="w-full home-canvas"
          aria-label={`Key results for ${study.clientName}`}
        >
          <div className="section-full flex w-full overflow-x-auto">
            {study.metrics.map((metric, index) => (
              <div
                key={metric.value + metric.label}
                className="sig-telemetry-item min-w-[14rem] flex-1 sm:min-w-[16rem]"
                style={{
                  paddingLeft: index === 0 ? 0 : undefined,
                  paddingRight: index === study.metrics.length - 1 ? 0 : undefined,
                }}
              >
                <span className="font-heading text-3xl font-semibold tracking-tight tabular-nums text-foreground sm:text-4xl min-[1280px]:text-5xl">
                  {metric.value}
                </span>
                <span className="max-w-xs text-xs leading-snug text-muted-foreground sm:text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      <MarketingSection
        aria-labelledby={`${study.slug}-about`}
      >
          <MarketingSectionHeader
            id={`${study.slug}-about`}
            eyebrow="About the project"
            title={
              <>
                Here&apos;s a bit about{" "}
                <span className="text-primary">{study.clientName}</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <CaseStudyLogo study={study} />
            </div>
            <div className="lg:col-span-8 lg:pt-2">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                {study.about.body}{" "}
                <a
                  href={study.clientUrl}
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {study.clientName} website
                </a>
                .
              </p>
            </div>
          </div>

          <dl
            className="mt-8 grid overflow-hidden rounded-md border border-border/80 bg-card sm:mt-10 md:grid-cols-4"
            aria-label={`${study.clientName} snapshot`}
          >
            {aboutFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "min-w-0 px-5 py-5 sm:px-6 sm:py-6",
                  index > 0 && "border-t border-border/80 md:border-t-0 md:border-l",
                )}
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-heading text-base font-semibold tracking-tight text-foreground md:text-lg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
      </MarketingSection>

      <MarketingSection
        surface="tint"
        aria-labelledby={`${study.slug}-impact`}
      >
          <MarketingSectionHeader
            id={`${study.slug}-impact`}
            eyebrow="Impact"
            title={
              <>
                Before and <span className="text-primary">after QApilot</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />

          <div
            className="overflow-hidden rounded-md border border-border/80"
            role="list"
            aria-label={`Before and after QApilot for ${study.clientName}`}
          >
            <div className="hidden grid-cols-2 border-b border-border/80 lg:grid">
              <div className="flex items-center gap-3 bg-muted/40 px-6 py-4 md:px-8">
                <IconWell className="h-8 w-8 rounded-lg border-border/70 bg-muted text-muted-foreground">
                  <Minus className="h-4 w-4" strokeWidth={2.25} />
                </IconWell>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Before
                </p>
              </div>
              <div className="flex items-center gap-3 border-l border-border/80 bg-primary/[0.07] px-6 py-4 md:px-8">
                <IconWell className="h-8 w-8 rounded-lg">
                  <Check className="h-4 w-4" strokeWidth={2.25} />
                </IconWell>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  With QApilot
                </p>
              </div>
            </div>

            {study.beforeAfter.map((row, index) => (
              <article
                key={row.before}
                role="listitem"
                className={cn(
                  "grid lg:grid-cols-2",
                  index > 0 && "border-t border-border/80",
                )}
              >
                <div className="relative bg-muted/25 px-5 py-6 sm:px-6 md:px-8 md:py-7">
                  <div className="mb-3 flex items-center gap-3 lg:hidden">
                    <span className="font-heading text-[11px] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Before
                    </p>
                  </div>
                  <div className="hidden lg:mb-3 lg:flex lg:items-center">
                    <span className="font-heading text-xs font-semibold tabular-nums tracking-[0.18em] text-muted-foreground/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                    {row.before}
                  </p>
                </div>

                <div className="relative border-t border-border/60 bg-primary/[0.05] px-5 py-6 sm:px-6 md:px-8 md:py-7 lg:border-l lg:border-t-0">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary lg:hidden">
                    With QApilot
                  </p>
                  <p className="text-sm leading-relaxed text-foreground md:text-base">
                    {row.after}
                  </p>
                </div>
              </article>
            ))}
          </div>
      </MarketingSection>

      <MarketingSection
        surface="canvas"
        aria-labelledby={`${study.slug}-approach`}
      >
          <MarketingSectionHeader
            id={`${study.slug}-approach`}
            eyebrow="Our approach"
            title={
              <>
                Our <span className="text-primary">engagement</span>
              </>
            }
            description={study.approach.intro}
            marginBottomClassName="mb-10 md:mb-12"
          />

          <ol
            className="relative"
            aria-label={`How QApilot worked with ${study.clientName}`}
          >
            {study.approach.paragraphs.map((paragraph, index) => {
              const isLast = index === study.approach.paragraphs.length - 1;
              return (
                <li key={paragraph.slice(0, 48)} className="relative flex gap-4 sm:gap-6">
                  <div className="flex w-7 shrink-0 flex-col items-center self-stretch">
                    <span
                      className="relative z-[1] flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-background"
                      aria-hidden
                    >
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    {isLast ? null : (
                      <span
                        className="w-px flex-1 bg-gradient-to-b from-primary/40 via-border to-primary/20"
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className={cn("min-w-0 pb-8 sm:pb-10", isLast && "pb-0 sm:pb-0")}>
                    <p className="font-heading text-xs font-semibold tabular-nums tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-foreground/90 md:text-lg">
                      {paragraph}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-12 md:mt-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground md:mb-8">
              Engagement highlights
            </p>
            <MarketingLedger
              cols={2}
              aria-label={`Engagement highlights for ${study.clientName}`}
            >
              {study.highlights.map((item, index) => (
                <MarketingLedgerCell key={item} as="div">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-heading text-sm font-semibold tabular-nums tracking-tight text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-primary/35" aria-hidden />
                  </div>
                  <p className="text-base leading-relaxed text-foreground md:text-lg">
                    {item}
                  </p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
          </div>
      </MarketingSection>

      <MarketingSection
        surface="tint"
        aria-labelledby={`${study.slug}-delivered`}
      >
          <MarketingSectionHeader
            id={`${study.slug}-delivered`}
            eyebrow="What QApilot delivered"
            title={
              <>
                What QApilot <span className="text-primary">shipped</span>
              </>
            }
            marginBottomClassName="mb-8 md:mb-10"
          />

          <div className="mb-10 md:mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Technologies and tools
            </p>
            <ul className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-xl border border-border/80 bg-card px-3.5 py-2 text-sm font-semibold tracking-tight text-foreground shadow-sm"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <MarketingLedger cols={2} aria-label={`What QApilot delivered for ${study.clientName}`}>
            {study.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
              return (
                <MarketingLedgerCell key={service.title}>
                  <div className="flex items-start justify-between gap-4">
                    <IconWell>
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </IconWell>
                    <span className="font-heading text-xs font-semibold tabular-nums tracking-[0.18em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {service.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </MarketingLedgerCell>
              );
            })}
          </MarketingLedger>
      </MarketingSection>

      <MarketingSection
        surface="navy"
        glow="bottom-right"
        aria-labelledby={`${study.slug}-close`}
      >
          <HomeEyebrow invert>Next</HomeEyebrow>
          <h2
            id={`${study.slug}-close`}
            className={cn(
              marketingSectionH2Class,
              "mb-5 w-full text-primary-foreground md:mb-6",
            )}
          >
            Facing similar challenges to {study.clientName}?
          </h2>
          <p className="w-full max-w-4xl text-base leading-relaxed text-[hsl(var(--navy-muted))] md:text-lg 2xl:text-xl">
            {study.takeaway}
          </p>
          <div className="sig-cta-row mt-8 justify-start">
            <BookDemoCtaButton
              className="bg-white text-[hsl(var(--navy))] shadow-none hover:bg-white/90 hover:shadow-none"
            >
              Talk to QApilot
            </BookDemoCtaButton>
          </div>
      </MarketingSection>

      <MarketingSection
        aria-labelledby={`${study.slug}-more`}
      >
          <MarketingSectionHeader
            id={`${study.slug}-more`}
            eyebrow="More stories"
            title={
              <>
                More teams shipping{" "}
                <span className="text-primary">with QApilot</span>
              </>
            }
            marginBottomClassName="mb-8 md:mb-10"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {relatedStudies.map((other) => (
              <Link
                key={other.slug}
                href={caseStudyPath(other.slug)}
                aria-label={`${other.clientName} case study — ${other.about.industry}`}
                className={cn(
                  "group relative flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-border/70 text-left transition",
                  "bg-gradient-to-br from-muted/50 via-background to-background",
                  "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                )}
              >
                <div className="relative z-[1] flex items-start justify-between gap-6 px-5 pt-6 sm:px-7 sm:pt-7">
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                      {other.clientName}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {other.about.industry}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {other.headline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                      Read the story
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        strokeWidth={2.25}
                      />
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={other.logoSrc}
                    alt=""
                    className="mt-1 h-10 w-auto max-w-[7.5rem] shrink-0 object-contain opacity-90 sm:h-12 sm:max-w-[9rem]"
                  />
                </div>
                <div className="relative z-[1] mt-6 grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-muted/20">
                  {other.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-1 px-3 py-4 sm:px-5 sm:py-5">
                      <span className="font-heading text-lg font-semibold tracking-tight tabular-nums text-foreground sm:text-2xl">
                        {metric.value}
                      </span>
                      <span className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-border/60 pt-8 md:mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Explore related capabilities
            </p>
            <ul className="flex flex-wrap gap-2">
              {study.related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground shadow-sm",
                      "transition-colors hover:border-primary/40 hover:text-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </MarketingSection>
    </main>
  );
}
