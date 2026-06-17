import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PATHS } from "@/lib/routes";
import {
  formatEventDateLabel,
  formatEventMetaLine,
  formatEventTypeLabel,
} from "@/lib/events";
import type { EventParticipant, QApilotEvent } from "@/lib/events-data";
import { cn } from "@/lib/utils";

function CircularPortrait({ participant }: { participant: EventParticipant }) {
  return (
    <div
      className="relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-full border-2 border-primary/30 bg-muted shadow-lg ring-[3px] ring-card sm:h-20 sm:w-20 md:h-[5.25rem] md:w-[5.25rem]"
    >
      <img
        src={participant.imageUrl}
        alt={`${participant.name}, ${participant.role}`}
        width={220}
        height={220}
        className="h-full w-full object-cover"
        style={{ objectPosition: participant.imagePosition ?? "center" }}
        decoding="async"
      />
    </div>
  );
}

function FeaturedEventCta({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 sm:text-base",
        className,
      )}
    >
      View event
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

function ParticipantClusterWithCta({
  participants,
  ctaHref,
}: {
  participants: EventParticipant[];
  ctaHref: string;
}) {
  return (
    <div className="relative flex flex-col items-end" aria-label="Podcast hosts">
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rounded-full bg-primary/20 blur-2xl sm:h-36 sm:w-36"
        aria-hidden
      />
      <div className="relative flex items-center justify-end">
        {participants.map((participant, index) => (
          <div
            key={participant.name}
            className={cn(index > 0 && "-ml-4 sm:-ml-5")}
            style={{ zIndex: participants.length - index }}
          >
            <CircularPortrait participant={participant} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex w-full min-w-0 flex-col items-end gap-2 text-right sm:mt-4 sm:gap-2.5">
        {participants.map((participant) => (
          <div key={participant.name} className="min-w-0 max-w-full">
            <p className="text-[11px] leading-snug sm:text-xs">
              <span className="font-semibold text-foreground">{participant.name}</span>
              <span className="text-muted-foreground"> · {participant.role}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 sm:mt-6">
        <FeaturedEventCta href={ctaHref} />
      </div>
    </div>
  );
}

export function FeaturedEventCard({ event }: { event: QApilotEvent }) {
  const href = `${PATHS.EVENTS}/${event.slug}`;
  const dateLabel = formatEventDateLabel(event);
  const hasParticipants = event.participants && event.participants.length > 0;

  return (
    <article className="relative overflow-hidden rounded-2xl border-2 border-primary/15 bg-card shadow-md transition-shadow hover:shadow-lg">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.1] via-background to-primary/[0.05]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden
      />

      <span
        className="absolute left-0 top-8 bottom-8 z-10 w-1 rounded-r-full bg-gradient-to-b from-primary/40 via-primary to-primary/50 sm:top-10 sm:bottom-10"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 flex flex-col gap-8 p-7 pl-8 sm:p-9 sm:pl-10 md:p-10 md:pl-12 lg:p-11 lg:pl-14",
          hasParticipants && "sm:flex-row sm:items-start sm:justify-between sm:gap-10",
        )}
      >
        <div className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:max-w-[58%]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
            {event.isUpcoming ? "Upcoming" : "Featured"}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary sm:text-sm">
            <span>{formatEventTypeLabel(event.type)}</span>
            {dateLabel ? (
              <span className="text-muted-foreground">{formatEventMetaLine(event)}</span>
            ) : null}
          </div>

          <h2 className="font-heading text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {event.title}
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {event.excerpt}
          </p>

          {event.platforms && event.platforms.length > 0 ? (
            <p className="text-sm font-medium text-muted-foreground md:text-base">
              <span className="text-foreground">Available on </span>
              {event.platforms.join(" · ")}
              {event.platforms.length >= 3 ? " · more" : ""}
            </p>
          ) : null}

          {!hasParticipants ? (
            <div className="mt-1">
              <FeaturedEventCta href={href} />
            </div>
          ) : null}
        </div>

        {hasParticipants ? (
          <div className="shrink-0 self-end sm:self-start">
            <ParticipantClusterWithCta
              participants={event.participants!}
              ctaHref={href}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
