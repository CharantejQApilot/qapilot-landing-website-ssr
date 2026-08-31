import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { EventDetailLeadForm } from "@/components/events/EventDetailLeadForm";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
  marketingHeroFormCardClass,
  marketingHeroFormInnerClass,
} from "@/lib/forms/marketing-form-classes";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  formatEventDateLabel,
  formatEventTypeLabel,
} from "@/lib/events";
import type { QApilotEvent } from "@/lib/events-data";

export function EventDetailHero({ event }: { event: QApilotEvent }) {
  const dateLabel = formatEventDateLabel(event);
  const dateSubtitle =
    event.type === "podcast"
      ? "Recorded episode"
      : [event.timeLabel, event.isVirtual ? "Virtual" : event.location]
          .filter(Boolean)
          .join(" · ");

  const platformHint =
    event.platforms && event.platforms.length > 0
      ? `${event.platforms.join(", ")}, and more`
      : null;

  return (
    <section
      className={cn(
        "hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas",
        "lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:items-center",
      )}
      aria-label={event.title}
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-10 sm:py-14 md:py-20 lg:py-24 2xl:py-28">
        <Link
          href={PATHS.EVENTS}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All events
        </Link>

        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-x-12 lg:gap-y-0",
            "xl:gap-x-16 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-20",
          )}
        >
          <header className="flex min-w-0 flex-col text-left lg:max-w-none lg:h-full lg:justify-center lg:pr-4 xl:pr-6">
            <HomeEyebrow>{formatEventTypeLabel(event.type)}</HomeEyebrow>
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
              {event.isUpcoming ? (
                <span className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                  Upcoming
                </span>
              ) : (
                <span className="rounded-md border border-border bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
                  Past event
                </span>
              )}
              {event.isTeaser ? (
                <span className="rounded-md border border-dashed border-primary/40 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                  Teaser
                </span>
              ) : null}
            </div>

            <h1
                className={cn(
                  marketingHeroH1Class,
                  "w-full text-balance text-left",
                  "max-lg:text-[clamp(1.75rem,5.5vw,3.25rem)] max-lg:leading-[1.1]",
                )}
            >
              {event.title}
            </h1>

            {dateLabel ? (
              <div
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-border/80 bg-card px-4 py-3 text-sm sm:mt-7 sm:gap-x-4 sm:px-4 sm:py-3.5 sm:text-[0.9375rem]"
              >
                <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <time dateTime={event.date}>{dateLabel}</time>
                </span>
                <span className="hidden text-border sm:inline" aria-hidden>·</span>
                <span className="text-muted-foreground">{dateSubtitle}</span>
                {!event.isVirtual ? (
                  <>
                    <span className="hidden text-border sm:inline" aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/80" aria-hidden />
                      {event.location}
                    </span>
                  </>
                ) : null}
                {platformHint ? (
                  <>
                    <span className="hidden text-border sm:inline" aria-hidden>·</span>
                    <span className="text-muted-foreground">{platformHint}</span>
                  </>
                ) : null}
              </div>
            ) : null}
          </header>

          <div className="flex min-w-0 w-full flex-col lg:h-full lg:pl-2 xl:pl-4">
            <div className={marketingHeroFormCardClass}>
              <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>Test Your Mobile App on QApilot</h2>
                <p className={marketingFormIntroClass}>
                  See autonomous mobile testing on your app. Share your details and we&apos;ll
                  schedule a tailored walkthrough.
                </p>
              </div>
              <div className={marketingHeroFormInnerClass}>
                <EventDetailLeadForm eventTitle={event.title} slug={event.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
