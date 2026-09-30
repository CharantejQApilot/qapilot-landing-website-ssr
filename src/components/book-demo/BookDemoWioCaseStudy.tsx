import Link from "next/link";
import { caseStudyPath, getCaseStudy } from "@/lib/case-studies-data";
import { getBookDemoWioHighlights } from "@/lib/book-demo-wio";
import { marketingEyebrowClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function BookDemoWioCaseStudy() {
  const study = getCaseStudy("wio");
  if (!study) return null;

  const highlights = getBookDemoWioHighlights();

  return (
    <article
      className="flex h-full w-full flex-col rounded-md border border-border/80 bg-card p-4 sm:p-5"
      aria-labelledby="book-demo-wio-story"
    >
      <p className={cn(marketingEyebrowClass, "mb-3")}>Customer story</p>

      <div className="flex items-center gap-3">
        <img
          src={study.logoSrc}
          alt={study.logoAlt}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h2
            id="book-demo-wio-story"
            className="font-heading text-lg font-semibold tracking-tight text-foreground"
          >
            {study.clientName}
          </h2>
          <p className="text-sm leading-snug text-muted-foreground">
            {study.tags.join(" · ")}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
        {study.headline}
      </p>

      {highlights.length > 0 ? (
        <dl className="mt-auto grid grid-cols-3 overflow-hidden rounded-md border border-border/70">
          {highlights.map((item) => (
            <div
              key={item.value}
              className="flex min-w-0 flex-col px-1.5 py-3 text-center sm:px-3 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border/70"
            >
              <dd className="order-1 font-heading text-base font-semibold leading-none tracking-tight text-primary sm:text-xl">
                {item.value}
              </dd>
              <dt className="order-2 mt-1.5 text-[0.65rem] font-medium leading-tight text-muted-foreground sm:text-xs">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}

export function BookDemoWioQuote() {
  const study = getCaseStudy("wio");
  if (!study?.quote) return null;

  return (
    <figure className="mt-10 w-full border-t border-border/60 pt-8 sm:mt-12 sm:pt-10">
      <blockquote>
        <p className="font-heading text-lg font-medium leading-snug tracking-tight text-foreground text-pretty sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
          “{study.quote.text}”
        </p>
      </blockquote>
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3">
          <img
            src={study.logoSrc}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">{study.quote.name}</p>
            <p className="text-sm text-muted-foreground">{study.quote.org}</p>
          </div>
        </div>
        <Link
          href={caseStudyPath(study.slug)}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Read the Wio story
        </Link>
      </figcaption>
    </figure>
  );
}
