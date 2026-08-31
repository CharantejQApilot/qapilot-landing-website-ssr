import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { MarketingPageShell, MarketingThesisHero } from "@/components/marketing";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { EventListItem } from "@/components/events/EventListItem";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import {
  getAllEvents,
  getFeaturedEvent,
  getNonFeaturedEvents,
} from "@/lib/events";

const EVENTS_PATH = PATHS.EVENTS;
const canonicalUrl = `${SITE_BASE_URL}${EVENTS_PATH}`;

const LIST_MAX_WIDTH = "mx-auto max-w-[1920px]";

/** Two-column grid: full content width like blogs / news listing pages */
const EVENTS_GRID =
  "mx-auto grid w-full max-w-7xl list-none gap-6 sm:gap-8 md:grid-cols-2 xl:gap-10 [&>li:last-child:nth-child(odd)]:md:col-span-2 [&>li:last-child:nth-child(odd)]:md:max-w-3xl [&>li:last-child:nth-child(odd)]:md:justify-self-center [&>li:last-child:nth-child(odd)]:md:w-full";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Events. Webinars, Meetups & Live Talks",
  description:
    "Webinars, meetups, and live talks on AI-native mobile testing, autonomous QA, Flutter validation, and release readiness.",
  path: EVENTS_PATH,
  ogDescription:
    "Practical sessions on AI mobile testing, agentic QA, and safer shipping practices.",
  twitterDescription:
    "Join QApilot webinars and meetups on AI-native mobile testing.",
});

export const revalidate = 3600;

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

export default function EventsPage() {
  const allEvents = getAllEvents();
  const featuredEvent = getFeaturedEvent();
  const listEvents = getNonFeaturedEvents();
  const eventCount = allEvents.length;

  const itemListElements = allEvents.map((event, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: event.title,
    item: `${SITE_BASE_URL}${EVENTS_PATH}/${event.slug}`,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "QApilot Events",
        description:
          "Webinars, meetups, and live talks from the QApilot team on AI-native mobile testing and release readiness.",
        url: canonicalUrl,
        publisher: { "@type": "Organization", name: "QApilot" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: itemListElements.length,
          itemListElement: itemListElements,
        },
      },
      stripJsonLdContext(
        buildBreadcrumbList([
          { name: "Home", path: PATHS.HOME },
          { name: "Events", path: EVENTS_PATH },
        ]),
      ),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingPageShell background="none">
        <main className="relative w-full">
          <MarketingThesisHero
            titleId="events-hero"
            eyebrow="Events"
            title="Webinars, Meetups & Live Talks"
            lead="Practical sessions on AI mobile testing, agentic QA, and the engineering practices that make shipping faster feel safe. Join us live or catch the recordings."
          />

          <div className="section-full home-canvas py-14 md:py-20">
            <div className={LIST_MAX_WIDTH}>
              {eventCount === 0 ? (
                <div className="flex flex-col items-center py-24 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-md border border-border bg-card">
                    <CalendarDays
                      className="h-10 w-10 text-muted-foreground"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    No events scheduled yet
                  </h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    New webinars and meetups will appear here soon.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
                  {featuredEvent ? (
                    <section
                      aria-labelledby="events-featured"
                      className="flex flex-col items-start"
                    >
                      <div className="mb-8 flex w-full flex-col items-start gap-2 text-left md:mb-12">
                        <h2
                          id="events-featured"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          Featured
                        </h2>
                        <p className="text-base text-muted-foreground md:text-lg">
                          Don&apos;t miss what&apos;s coming next.
                        </p>
                      </div>
                      <div className="mx-auto w-full max-w-7xl">
                        <FeaturedEventCard event={featuredEvent} />
                      </div>
                    </section>
                  ) : null}

                  {listEvents.length > 0 ? (
                    <section
                      aria-labelledby="events-all"
                      className="border-t border-border pt-16 md:pt-20"
                    >
                      <div className="mb-8 flex flex-col items-start gap-2 text-left md:mb-12">
                        <h2
                          id="events-all"
                          className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                        >
                          Past &amp; upcoming
                        </h2>
                        <p className="text-base text-muted-foreground md:text-lg">
                          All events · {eventCount}{" "}
                          {eventCount === 1 ? "event" : "events"}
                        </p>
                      </div>
                      <ul className={EVENTS_GRID}>
                        {listEvents.map((event) => (
                          <EventListItem key={event.slug} event={event} />
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </main>
      </MarketingPageShell>
    </>
  );
}
