import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyPhoneScreenshot, GemlAppMock } from "@/components/case-studies/CaseStudyPhoneFrame";
import {
  MarketingLedger,
  MarketingLedgerCell,
  MarketingSectionHeader,
} from "@/components/marketing";
import { CASE_STUDIES, caseStudyPath, type CaseStudy } from "@/lib/case-studies-data";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

function CaseStudyLogo({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border border-border/70 bg-card px-8 py-10",
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

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const hasDeviceMedia = Boolean(study.heroImageSrc || study.heroMock);

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

      <section className="section-edge w-full border-b border-border/50 bg-muted/15 py-8 md:py-10">
        <div className="section-full">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.facts.map((fact) => (
              <div key={fact.label} className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-heading text-base font-semibold tracking-tight text-foreground md:text-lg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 py-10 md:py-12">
        <div className="section-full">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Technologies and tools
          </p>
          <ul className="flex flex-wrap gap-2">
            {study.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-lg border border-border/70 bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
          <MarketingSectionHeader
            id={`${study.slug}-metrics`}
            eyebrow="Results"
            title={
              <>
                Results by <span className="text-primary">the numbers</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-border/70 md:grid-cols-3">
            {study.metrics.map((metric, index) => (
              <article
                key={metric.value + metric.label}
                className={cn(
                  "p-6 md:p-8",
                  index > 0 && "border-t border-border/70 md:border-t-0 md:border-l",
                )}
              >
                <p className="font-heading text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {metric.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
          <MarketingSectionHeader
            id={`${study.slug}-about`}
            eyebrow="About the project"
            title={
              <>
                Here&apos;s a bit about <span className="text-primary">{study.clientName}</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Industry
                </dt>
                <dd className="mt-2 text-base text-foreground">{study.about.industry}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Headquarters
                </dt>
                <dd className="mt-2 text-base text-foreground">{study.about.headquarters}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Engagement
                </dt>
                <dd className="mt-2 text-base text-foreground">{study.about.engagement}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Platforms
                </dt>
                <dd className="mt-2 text-base text-foreground">{study.about.platforms}</dd>
              </div>
            </dl>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-7">
              {study.about.body}{" "}
              <a
                href={study.clientUrl}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {study.clientName} website
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
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
          <ul
            className="overflow-hidden rounded-2xl border border-border/70 divide-y divide-border/70"
            aria-label={`Before and after QApilot for ${study.clientName}`}
          >
            {study.beforeAfter.map((row, index) => (
              <li key={row.before}>
                <article className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                  <div className="relative bg-muted/25 px-5 py-6 sm:px-6 md:px-8 md:py-7">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-heading text-[11px] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Before
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground md:text-base">
                      {row.before}
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-center border-y border-border/60 bg-background px-4 py-3 lg:border-x lg:border-y-0 lg:px-3"
                    aria-hidden
                  >
                    <span className="flex size-9 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10">
                      <ArrowRight className="size-4" strokeWidth={2.25} />
                    </span>
                  </div>

                  <div className="relative bg-primary/[0.05] px-5 py-6 sm:px-6 md:px-8 md:py-7">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      With QApilot
                    </p>
                    <p className="text-sm leading-relaxed text-foreground md:text-base">
                      {row.after}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
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
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {study.approach.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
          <MarketingSectionHeader
            id={`${study.slug}-highlights`}
            eyebrow="Highlights"
            title={
              <>
                Engagement <span className="text-primary">highlights</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />
          <ul
            className="grid gap-x-12 gap-y-10 sm:grid-cols-2 xl:gap-x-16 xl:gap-y-12"
            aria-label={`Engagement highlights for ${study.clientName}`}
          >
            {study.highlights.map((item, index) => (
              <li key={item} className="group relative min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-heading text-sm font-semibold tabular-nums tracking-tight text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-px w-8 bg-primary/35 transition-[width] duration-300 group-hover:w-14"
                    aria-hidden
                  />
                </div>
                <p className="text-base leading-relaxed text-foreground md:text-lg md:leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
          <MarketingSectionHeader
            id={`${study.slug}-delivered`}
            eyebrow="What QApilot delivered"
            title={
              <>
                What QApilot <span className="text-primary">shipped</span>
              </>
            }
            marginBottomClassName="mb-10 md:mb-12"
          />
          <MarketingLedger cols={2} aria-label={`What QApilot delivered for ${study.clientName}`}>
            {study.services.map((service, index) => (
              <MarketingLedgerCell key={service.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {service.body}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </MarketingLedgerCell>
            ))}
          </MarketingLedger>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16">
        <div className="section-full">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Facing similar challenges to {study.clientName}?
            </p>
            <p className="mt-4 w-full font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {study.takeaway}
            </p>
            <div className="sig-cta-row mt-8 justify-start">
              <BookDemoCtaButton>Talk to QApilot</BookDemoCtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
        <div className="section-full">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Explore related capabilities:{" "}
            {study.related.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? ", " : null}
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
            .
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            More stories:{" "}
            {CASE_STUDIES.filter((other) => other.slug !== study.slug).map(
              (other, index, list) => (
                <span key={other.slug}>
                  {index > 0 ? (index === list.length - 1 ? ", and " : ", ") : null}
                  <Link href={caseStudyPath(other.slug)} className="text-primary hover:underline">
                    {other.clientName}
                  </Link>
                </span>
              ),
            )}
            .
          </p>
        </div>
      </section>
    </main>
  );
}
