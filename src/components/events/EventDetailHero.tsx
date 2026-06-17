import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { EventDetailLeadForm } from "@/components/events/EventDetailLeadForm";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
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
        "hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible",
        "lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:items-center",
      )}
      aria-label={event.title}
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

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
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                {formatEventTypeLabel(event.type)}
              </span>
              {event.isUpcoming ? (
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                  Upcoming
                </span>
              ) : (
                <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
                  Past event
                </span>
              )}
              {event.isTeaser ? (
                <span className="rounded-full border border-dashed border-primary/40 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                  Teaser
                </span>
              ) : null}
            </div>

            <h1
              className={cn(
                marketingHeroH1Class,
                "w-full text-balance text-left text-gradient",
                "max-lg:text-[clamp(1.75rem,5.5vw,3.25rem)] max-lg:leading-[1.1]",
              )}
            >
              {event.title}
            </h1>

            {dateLabel ? (
              <div
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border/70 bg-card/50 px-4 py-3 text-sm sm:mt-7 sm:gap-x-4 sm:px-4 sm:py-3.5 sm:text-[0.9375rem]"
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
            <div
              className={cn(
                "relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl",
                "border border-border/60 bg-card/90 p-5 shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.28)] backdrop-blur-md",
                "ring-1 ring-primary/[0.06] sm:p-7 md:p-8",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.08] before:via-transparent before:to-transparent",
                "after:pointer-events-none after:absolute after:-right-16 after:-top-16 after:h-48 after:w-48 after:rounded-full after:bg-primary/[0.07] after:blur-3xl",
              )}
            >
              <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>Test Your Mobile App on QApilot</h2>
                <p className={marketingFormIntroClass}>
                  See autonomous mobile testing on your app. Share your details and we&apos;ll
                  schedule a tailored walkthrough.
                </p>
              </div>
              <div
                className="relative z-[1] min-h-0 min-w-0 flex-1 rounded-xl border border-border/40 bg-background/80 p-3 shadow-inner shadow-primary/[0.03] sm:p-4 md:p-5"
              >
                <EventDetailLeadForm eventTitle={event.title} slug={event.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
