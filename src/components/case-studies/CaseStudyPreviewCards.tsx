import Link from "next/link";
import { CASE_STUDIES, caseStudyPath } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";

type CaseStudyPreviewCardsProps = {
  className?: string;
  compact?: boolean;
};

export function CaseStudyPreviewCards({
  className,
  compact = false,
}: CaseStudyPreviewCardsProps) {
  return (
    <ul className={cn("grid gap-6 md:grid-cols-3", className)}>
      {CASE_STUDIES.map((study) => (
        <li key={study.slug}>
          <Link
            href={caseStudyPath(study.slug)}
            className={cn(
              "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-left transition-colors",
              "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center border-b border-border/60 bg-muted/20 px-8",
                compact ? "min-h-[7.5rem] py-6" : "min-h-[9rem] py-8",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={study.logoSrc}
                alt={study.logoAlt}
                className="max-h-12 w-auto max-w-[11rem] object-contain"
              />
            </div>
            <div
              className={cn(
                "flex flex-1 flex-col",
                compact ? "p-4 md:p-5" : "p-5 md:p-6",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {study.tags[0]}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-foreground">
                {study.clientName}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {study.headline}
              </p>
              <p className="mt-auto pt-5 text-sm font-semibold text-primary">
                Read the story
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
