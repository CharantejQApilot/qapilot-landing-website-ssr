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
      className="section-edge relative w-full border-y border-border/70 bg-background"
      aria-labelledby="home-case-studies-label"
    >
      <div className="section-full py-10 md:py-12">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <p
              id="home-case-studies-label"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Case studies
            </p>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              <span className="font-semibold tabular-nums text-foreground">
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
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background text-foreground transition",
                "hover:border-primary/40 hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
              )}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => api?.scrollNext()}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background text-foreground transition",
                "hover:border-primary/40 hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
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
                        "group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 text-left transition",
                        "bg-gradient-to-br from-muted/50 via-background to-background",
                        "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
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
                                className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
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

                      <div className="relative z-[1] border-t border-border/60 bg-muted/20">
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

        <div className="mt-7 border-t border-border/60 pt-5 md:mt-8 md:pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
                    <span className="mx-2 text-border sm:mx-3" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Link
                    href={caseStudyPath(study.slug)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-1 py-0.5 font-heading text-base font-semibold tracking-tight transition sm:text-lg",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {study.clientName}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            Showing{" "}
            <span className="font-medium text-foreground">{selected + 1}</span>{" "}
            of {count}: {CASE_STUDIES[selected]?.about.industry}
          </p>
        </div>
      </div>
    </section>
  );
}
