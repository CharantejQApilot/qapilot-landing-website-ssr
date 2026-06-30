import type { ReactNode } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Mic2,
  Radio,
  Video,
} from "lucide-react";
import { EventExploreQApilotSection } from "@/components/events/EventExploreQApilotSection";
import { EventDetailHero } from "@/components/events/EventDetailHero";
import { EventListItem } from "@/components/events/EventListItem";
import { EventParticipantPortraits } from "@/components/events/EventParticipantPortraits";
import {
  EventPlatformLinks,
  hasLogoPlatformLinks,
} from "@/components/events/EventPlatformLinks";
import { PATHS } from "@/lib/routes";
import {
  formatEventDateLabel,
  formatEventMetaLine,
  formatEventTypeLabel,
  getEventExploreCtas,
} from "@/lib/events";
import type { QApilotEvent } from "@/lib/events-data";
import { extractYouTubeId } from "@/utils/youtube";

const CONTENT_MAX =
  "mx-auto w-full max-w-7xl 2xl:max-w-[min(100%,88rem)]";

const RELATED_GRID =
  "grid list-none gap-6 sm:gap-8 md:grid-cols-2";

function EventDetailSidebarRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
        <Icon className="h-4 w-4 text-primary" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-medium text-foreground md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

export function EventDetailView({
  event,
  relatedEvents,
}: {
  event: QApilotEvent;
  relatedEvents: QApilotEvent[];
}) {
  const dateLabel = formatEventDateLabel(event);
  const hasParticipants = event.participants && event.participants.length > 0;
  const exploreCtas = getEventExploreCtas(event);
  const platformLinks = event.platformLinks ?? [];
  const platformHrefByName = new Map(platformLinks.map((link) => [link.name, link.href]));
  const showMorePlatformsChip =
    event.platforms &&
    event.platforms.length > 1 &&
    !event.isTeaser &&
    !hasLogoPlatformLinks(platformLinks) &&
    event.platforms.some((name) => !platformHrefByName.has(name));
  const youtubeVideoId = event.youtubeUrl ? extractYouTubeId(event.youtubeUrl) : null;

  return (
    <main className="relative w-full">
      <EventDetailHero event={event} />

      <div className="section-full bg-background">
        <div className={`${CONTENT_MAX} border-t border-border/60 py-12 md:py-16 lg:py-20`}>
          {youtubeVideoId ? (
            <div className="mb-12 md:mb-16">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                <div className="relative aspect-video w-full">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`}
                    title={event.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : event.coverImageUrl ? (
            <div className="mb-12 md:mb-16">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                <img
                  src={event.coverImageUrl}
                  alt={`${event.title} - recorded session`}
                  width={1400}
                  height={788}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover object-center"
                />
              </div>
            </div>
          ) : null}

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-14">
            <article className="min-w-0">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {event.excerpt}
              </p>

              <div className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground md:mt-12 md:text-lg md:leading-relaxed">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  About this event
                </h2>
                {event.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {event.isTeaser ? (
                <div
                  className="mt-10 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-4 sm:px-5 sm:py-5 md:mt-12"
                >
                  <p className="text-sm font-semibold text-primary">Early teaser</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The webinar date is locked for{" "}
                    {dateLabel ?? "the scheduled day"}. Stream time, agenda, and live link
                    details are still being finalized. Subscribe on YouTube so you are notified
                    when the session goes live.
                  </p>
                  {event.externalUrl ? (
                    <a
                      href={event.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
                    >
                      Visit Naveen Automation Labs on YouTube
                    </a>
                  ) : null}
                </div>
              ) : null}

              {platformLinks.length > 0 ? (
                <section
                  aria-labelledby="event-platforms"
                  className="mt-10 md:mt-12"
                >
                  <h2
                    id="event-platforms"
                    className="mb-4 font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl"
                  >
                    {event.isUpcoming && event.type !== "podcast"
                      ? "Where to watch"
                      : "Where to watch or listen"}
                  </h2>
                  {hasLogoPlatformLinks(platformLinks) ? (
                    <EventPlatformLinks links={platformLinks} />
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {event.platforms?.map((platform) => {
                        const href = platformHrefByName.get(platform);
                        const chipClass =
                          "rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary";

                        return (
                          <li key={platform}>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={chipClass}
                              >
                                {platform}
                              </a>
                            ) : (
                              <span className={chipClass}>{platform}</span>
                            )}
                          </li>
                        );
                      })}
                      {showMorePlatformsChip ? (
                        <li className="rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground">
                          More platforms
                        </li>
                      ) : null}
                    </ul>
                  )}
                </section>
              ) : null}

              <EventExploreQApilotSection ctas={exploreCtas} />
            </article>

            <aside className="mt-10 flex flex-col gap-6 lg:mt-0 lg:sticky lg:top-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  Event details
                </h2>

                <dl className="mt-6 space-y-5">
                  {dateLabel ? (
                    <EventDetailSidebarRow icon={Calendar} label="Date">
                      <time dateTime={event.date}>{formatEventMetaLine(event)}</time>
                    </EventDetailSidebarRow>
                  ) : null}

                  <EventDetailSidebarRow
                    icon={event.type === "podcast" ? Mic2 : Radio}
                    label="Format"
                  >
                    {formatEventTypeLabel(event.type)}
                  </EventDetailSidebarRow>

                  <EventDetailSidebarRow
                    icon={event.isVirtual ? Video : MapPin}
                    label={event.isVirtual ? "Location" : "City"}
                  >
                    {event.isVirtual ? "Virtual" : event.location}
                  </EventDetailSidebarRow>

                  <EventDetailSidebarRow icon={Calendar} label="Status">
                    {event.isTeaser
                      ? "Teaser · Upcoming"
                      : event.isUpcoming
                        ? "Upcoming"
                        : "Past"}
                  </EventDetailSidebarRow>
                </dl>

                {event.platforms && event.platforms.length > 0 ? (
                  <div className="mt-6 border-t border-border pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Platforms
                    </p>
                    <p className="mt-2 text-sm text-foreground">
                      {event.platforms.join(", ")}
                      {event.isTeaser
                        ? " · Details coming soon"
                        : event.platforms.length > (event.platformLinks?.length ?? 0)
                          ? ", and more"
                          : ""}
                    </p>
                  </div>
                ) : null}

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Ready to see QApilot on your stack? Use the demo form at the top of this page.
                  </p>
                  <Link
                    href={PATHS.BOOK_DEMO}
                    className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                  >
                    Or visit the book demo page
                  </Link>
                </div>
              </div>

              {hasParticipants ? (
                <section
                  aria-labelledby="event-featuring"
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h2
                    id="event-featuring"
                    className="font-heading text-lg font-semibold tracking-tight text-foreground"
                  >
                    Featuring
                  </h2>
                  <EventParticipantPortraits
                    participants={event.participants!}
                    size="xs"
                    overlap
                    className="mt-5 justify-center"
                  />
                </section>
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      {relatedEvents.length > 0 ? (
        <section
          aria-labelledby="related-events"
          className="section-full border-t border-border bg-muted/20 py-14 md:py-20"
        >
          <div className={CONTENT_MAX}>
            <div className="mb-8 md:mb-10">
              <h2
                id="related-events"
                className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                More events
              </h2>
              <p className="mt-2 text-base text-muted-foreground md:text-lg">
                Explore other webinars, meetups, and podcasts from QApilot.
              </p>
            </div>
            <ul className={RELATED_GRID}>
              {relatedEvents.map((related) => (
                <EventListItem key={related.slug} event={related} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
