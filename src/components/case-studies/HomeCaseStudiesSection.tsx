"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CASE_STUDIES, caseStudyPath } from "@/lib/case-studies-data";
import { HomeDarkAtmosphere } from "@/components/home/HomeDarkAtmosphere";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeSeam } from "@/components/home/HomeSeam";
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

/** Time on the active card before advancing (wall time only while not hovered). */
const AUTO_MS = 10_000;
const TICK_MS = 50;

/**
 * Home proof rail: one forefront case-study stripe, auto-advances, company index below.
 * Auto-swipe pauses only while the pointer is over the card; it resumes when the pointer leaves.
 */
export function HomeCaseStudiesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const count = CASE_STUDIES.length;

  const sync = useCallback((instance: CarouselApi) => {
    if (!instance) return;
    setSelected(instance.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    sync(api);
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api, sync]);

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [selected]);

  useEffect(() => {
    if (!api) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      if (pausedRef.current) return;

      elapsedRef.current += TICK_MS;
      const next = Math.min(1, elapsedRef.current / AUTO_MS);
      setProgress(next);

      if (elapsedRef.current >= AUTO_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        api.scrollNext();
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [api]);

  const pauseAuto = () => {
    pausedRef.current = true;
  };

  const resumeAuto = () => {
    pausedRef.current = false;
  };

  return (
    <section
      className="section-edge relative w-full section-navy"
      aria-labelledby="home-case-studies-label"
    >
      <HomeSeam invert />
      <HomeDarkAtmosphere glow="top" />
      <div className="section-full relative py-16 md:py-20 lg:py-24">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <HomeEyebrow invert id="home-case-studies-label">
              Case studies
            </HomeEyebrow>
            <p className="text-sm !text-white/50 md:text-base">
              <span className="font-semibold tabular-nums text-white">
                {count}
              </span>{" "}
              customer stories from teams shipping mobile releases
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => api?.scrollPrev()}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white transition-colors",
                "hover:border-white/35 hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              )}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => api?.scrollNext()}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white transition-colors",
                "hover:border-white/35 hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              )}
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div
          className="w-full min-w-0"
          onMouseEnter={pauseAuto}
          onMouseLeave={resumeAuto}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full min-w-0"
          >
            <CarouselContent className="-ml-0">
              {CASE_STUDIES.map((study) => {
                const industry = study.about.industry;

                return (
                  <CarouselItem key={study.slug} className="basis-full pl-0">
                    <Link
                      href={caseStudyPath(study.slug)}
                      onFocus={pauseAuto}
                      onBlur={resumeAuto}
                      aria-label={`${study.clientName} case study — ${industry}`}
                      className={cn(
                        "home-light-panel group relative flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-white/10 bg-white text-left text-foreground transition-colors",
                        "hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--navy))]",
                      )}
                    >
                      <div className="relative z-[1] grid min-w-0 gap-8 px-5 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 md:px-9 md:pb-8 md:pt-10 lg:gap-16">
                        <div className="min-w-0">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
                            {study.clientName}
                          </p>

                          <h3
                            className={cn(
                              marketingSectionH2Class,
                              "mt-4 text-balance md:mt-5",
                            )}
                          >
                            {industry}
                          </h3>

                          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:leading-relaxed">
                            {study.headline}
                          </p>

                          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                            {study.tags.slice(0, 3).map((tag) => (
                              <li
                                key={tag}
                                className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>

                          <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3 sm:mt-8 sm:text-base">
                            Read the story
                            <ArrowRight
                              className="h-4 w-4 transition group-hover:translate-x-0.5"
                              strokeWidth={2.25}
                            />
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center justify-center self-center md:justify-self-end md:pl-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={study.logoSrc}
                            alt={study.logoAlt}
                            className="h-14 w-auto max-w-[11rem] object-contain opacity-90 transition group-hover:opacity-100 sm:h-16 sm:max-w-[13rem] md:h-[4.5rem] md:max-w-[15rem]"
                          />
                        </div>
                      </div>

                      <div className="relative z-[1] border-t border-border">
                        <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                          {study.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="flex flex-col gap-1.5 px-5 py-4 sm:px-6 sm:py-5"
                            >
                              <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground sm:text-3xl">
                                {metric.value}
                              </span>
                              <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div
                          className="h-0.5 origin-left bg-primary"
                          style={{ transform: `scaleX(${progress})` }}
                          aria-hidden
                        />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-7 border-t border-white/10 pt-5 md:mt-8 md:pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] !text-white/40">
            {count} case studies
          </p>
          <ul
            className="flex flex-wrap items-center gap-x-1 gap-y-2"
            aria-label="Case study links"
          >
            {CASE_STUDIES.map((study, index) => {
              const active = selected === index;
              return (
                <li key={study.slug} className="flex items-center">
                  {index > 0 ? (
                    <span className="mx-2 text-white/20 sm:mx-3" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Link
                    href={caseStudyPath(study.slug)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-1 py-0.5 font-heading text-base font-semibold tracking-tight transition sm:text-lg",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                      active
                        ? "text-white"
                        : "text-white/45 hover:text-white",
                    )}
                  >
                    {study.clientName}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-sm !text-white/40" aria-live="polite">
            Showing{" "}
            <span className="font-medium text-white">{selected + 1}</span> of{" "}
            {count}: {CASE_STUDIES[selected]?.about.industry}
          </p>
        </div>
      </div>
    </section>
  );
}
