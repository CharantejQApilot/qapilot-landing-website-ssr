import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PATHS } from "@/lib/routes";
import {
  formatEventMetaLine,
  formatEventTypeLabel,
} from "@/lib/events";
import type { QApilotEvent } from "@/lib/events-data";

export function EventListItem({ event }: { event: QApilotEvent }) {
  const href = `${PATHS.EVENTS}/${event.slug}`;

  return (
    <li>
      <Link
        href={href}
        className="group block h-full rounded-2xl border border-border bg-card outline-none ring-offset-background transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
      >
        <article className="flex h-full flex-col gap-3 p-6 sm:gap-4 sm:p-7 md:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide sm:text-sm">
            <span className="text-primary">{formatEventTypeLabel(event.type)}</span>
            <span className="text-muted-foreground">{formatEventMetaLine(event)}</span>
          {event.isTeaser ? (
            <span className="rounded-full border border-dashed border-primary/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary sm:text-xs">
              Teaser
            </span>
          ) : null}
          </div>

          <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-xl">
            {event.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {event.excerpt}
          </p>

          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read more
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </article>
      </Link>
    </li>
  );
}
