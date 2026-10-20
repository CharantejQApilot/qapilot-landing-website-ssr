import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
import { caseStudyPath, getCaseStudy } from "@/lib/case-studies-data";

/** Mid-article case study teaser. The case study page itself holds the email gate. */
export function BlogCaseStudyCta() {
  const study = getCaseStudy("wio");
  if (!study) return null;

  return (
    <aside className="my-10 md:my-12" aria-label={`${study.clientName} case study`}>
      <Link
        href={caseStudyPath(study.slug)}
        className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/[0.08] via-primary/[0.03] to-background p-4 shadow-[0_10px_30px_-18px_hsl(215_60%_30%/0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_18px_36px_-16px_hsl(215_60%_30%/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 sm:gap-5 sm:p-5"
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary"
          aria-hidden
        />
        <Image
          src={study.logoSrc}
          alt={study.logoAlt}
          width={56}
          height={56}
          className="h-12 w-12 shrink-0 rounded-xl object-contain shadow-[0_6px_16px_-6px_hsl(265_90%_45%/0.55)] ring-1 ring-white/60 sm:h-14 sm:w-14"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Case study · {study.clientName} Bank
          </p>
          <p className="mt-1 font-heading text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
            How a small QA team runs{" "}
            <span className="text-primary">11,025 Flutter test steps</span>{" "}
            every night
          </p>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            89.3% step success across Android and iOS, with almost no
            maintenance.
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary sm:hidden">
            Read the story
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_6px_16px_-8px_hsl(215_60%_30%/0.7)] transition-colors group-hover:bg-primary/90 sm:inline-flex">
          Read the story
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </aside>
  );
}

/** Mid-article demo prompt. Opens the booking calendar like every other Book a Demo CTA. */
export function BlogBookDemoCta() {
  return (
    <aside
      className="my-10 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/[0.06] via-primary/[0.03] to-transparent p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 md:my-12"
      aria-label="Book a demo"
    >
      <div className="min-w-0 flex-1">
        <p className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground">
          See this on your own app
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          A live walkthrough on your iOS or Android build. No scripts to write.
        </p>
      </div>
      <BookDemoLinkButton className="h-11 w-fit shrink-0 rounded-lg px-6 text-sm font-semibold shadow-none">
        Book a Demo
      </BookDemoLinkButton>
    </aside>
  );
}
