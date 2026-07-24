import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  PenLine,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import type { EventExploreCta } from "@/lib/events-data";
import { cn } from "@/lib/utils";

const CTA_ICON_BY_HREF: Partial<Record<string, LucideIcon>> = {
  [BOOK_DEMO_CALENDAR_URL]: Calendar,
  [PATHS.COWORK]: PenLine,
  [PATHS.FOR_FLUTTER]: Smartphone,
};

const PRIMARY_CTA = {
  link: "bg-primary text-primary-foreground shadow-md shadow-primary/30 hover:bg-primary/92 hover:shadow-lg hover:shadow-primary/40",
  iconWrap: "bg-white/15 text-primary-foreground",
  arrowWrap: "bg-white/20 text-primary-foreground",
} as const;

const SECONDARY_CTA = {
  link: "border border-primary/30 bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-background text-foreground hover:border-primary/50 hover:from-primary/[0.16]",
  iconWrap: "bg-primary/12 text-primary",
  arrowWrap: "border border-primary/20 bg-background/80 text-primary",
} as const;

type ExploreLayout = "stack" | "cards";

function ExploreCtaLink({
  cta,
  index,
  layout,
}: {
  cta: EventExploreCta;
  index: number;
  layout: ExploreLayout;
}) {
  const variant = index === 0 ? PRIMARY_CTA : SECONDARY_CTA;
  const Icon = CTA_ICON_BY_HREF[cta.href] ?? ArrowRight;
  const isExternal = /^https?:\/\//.test(cta.href);
  const externalProps = isExternal
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  if (layout === "cards") {
    return (
      <li className="min-w-0">
        <Link
          href={cta.href}
          {...externalProps}
          className={cn(
            "group relative flex h-full min-h-[4.5rem] items-center gap-3.5 overflow-hidden rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 sm:min-h-[5rem] sm:gap-4 sm:px-6 sm:py-5",
            variant.link,
          )}
        >
          {index === 0 ? (
            <div
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_2s_ease-in-out_infinite]"
              aria-hidden
            />
          ) : null}

          <span
            className={cn(
              "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105",
              variant.iconWrap,
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>

          <span className="relative z-10 min-w-0 flex-1 text-sm font-semibold leading-snug sm:text-base">
            {cta.label}
          </span>

          <span
            className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-105",
              variant.arrowWrap,
            )}
          >
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className="min-w-0">
      <Link
        href={cta.href}
        {...externalProps}
        className={cn(
          "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 sm:px-4 sm:py-3.5",
          variant.link,
        )}
      >
        {index === 0 ? (
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_2s_ease-in-out_infinite]"
            aria-hidden
          />
        ) : null}

        <span
          className={cn(
            "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
            variant.iconWrap,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>

        <span className="relative z-10 min-w-0 flex-1 text-sm font-semibold leading-tight sm:text-[0.9375rem]">
          {cta.label}
        </span>

        <span
          className={cn(
            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-105",
            variant.arrowWrap,
          )}
        >
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </li>
  );
}

export function EventExploreQApilotSection({
  ctas,
  className,
  layout = "stack",
  headingId = "event-explore-qapilot",
}: {
  ctas: EventExploreCta[];
  className?: string;
  layout?: ExploreLayout;
  headingId?: string;
}) {
  if (ctas.length === 0) return null;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("mt-10 md:mt-12", className)}
    >
      <h2
        id={headingId}
        className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl"
      >
        Explore QApilot
      </h2>

      <ul
        className={cn(
          "mt-4 list-none sm:mt-5",
          layout === "cards"
            ? "grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5"
            : "flex flex-col gap-2 sm:gap-2.5",
        )}
      >
        {ctas.map((cta, index) => (
          <ExploreCtaLink
            key={`${cta.href}-${cta.label}`}
            cta={cta}
            index={index}
            layout={layout}
          />
        ))}
      </ul>
    </section>
  );
}
