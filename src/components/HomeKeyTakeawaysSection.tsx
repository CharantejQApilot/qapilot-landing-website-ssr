import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeSeam } from "@/components/home/HomeSeam";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import {
  HOME_PAGE_AUTHORITY_SOURCES,
  HOME_PAGE_KEY_TAKEAWAYS,
  HOME_PAGE_LAST_REVIEWED,
  HOME_PAGE_QUESTIONS,
} from "@/lib/home-page-seo";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const TAKEAWAY_LABELS = [
  "Platform",
  "Self-healing",
  "Release readiness",
  "QApilot MCP",
] as const;

function formatReviewedDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Below-fold GEO strip: Key takeaways, FAQ-style Q&A, authority sources, last reviewed.
 * Restates existing homepage claims — styled like other home ledgers.
 */
export default function HomeKeyTakeawaysSection() {
  const reviewedLabel = formatReviewedDate(HOME_PAGE_LAST_REVIEWED);

  return (
    <section
      className="relative overflow-hidden home-tint section-edge w-full"
      aria-labelledby="home-key-takeaways-heading"
    >
      <HomeSeam />
      <div className="section-full relative py-16 md:py-20 lg:py-24">
        <MarketingSectionHeader
          id="home-key-takeaways-heading"
          eyebrow="Summary"
          title={
            <>
              Key <span className="text-primary">takeaways</span>
            </>
          }
          description="What QApilot is, in four lines — the definitions search and AI assistants look for."
          marginBottomClassName="mb-8 md:mb-10 2xl:mb-12"
        />

        <ol className="sig-ledger sig-ledger--2 border border-border bg-background">
          {HOME_PAGE_KEY_TAKEAWAYS.map((item, index) => (
            <li
              key={item}
              className={cn(
                "sig-cell flex flex-col gap-3 md:gap-4",
                index >= HOME_PAGE_KEY_TAKEAWAYS.length - 2 && "border-b-0",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {TAKEAWAY_LABELS[index]}
                </span>
                <span
                  className="font-heading text-sm tabular-nums text-muted-foreground/50"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90 md:text-lg md:leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-14">
          <MarketingSectionHeader
            id="home-common-questions-heading"
            eyebrow="Common questions"
            title={
              <>
                Questions teams ask about{" "}
                <span className="text-primary">mobile app testing</span>
              </>
            }
            description="Direct answers drawn from how QApilot works on this page — no new claims."
            marginBottomClassName="mb-8 md:mb-10"
          />

          <div className="flex flex-col gap-0 border border-border bg-background">
            {HOME_PAGE_QUESTIONS.map((item, index) => (
              <div
                key={item.question}
                className={cn(
                  "flex flex-col gap-3 px-5 py-6 sm:px-6 sm:py-7 md:px-8",
                  index < HOME_PAGE_QUESTIONS.length - 1 &&
                    "border-b border-border",
                )}
              >
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {item.question}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border border-border bg-background px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
          <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Authoritative sources
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Mobile release quality sits alongside established software-assurance
            guidance. For deeper reading on app vetting and assurance practice:
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {HOME_PAGE_AUTHORITY_SOURCES.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary md:text-base"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border/80 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-3 md:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            <Link
              href={PATHS.MCP}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:text-base"
            >
              Explore QApilot MCP
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>
            <Link
              href={PATHS.COMPARE_WEB_FIRST}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:text-base"
            >
              Compare QApilot vs web-first automation
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            Last reviewed:{" "}
            <time dateTime={HOME_PAGE_LAST_REVIEWED}>{reviewedLabel}</time>
          </p>
        </div>
      </div>
    </section>
  );
}
