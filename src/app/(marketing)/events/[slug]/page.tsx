import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/events/EventDetailView";
import { MarketingPageShell } from "@/components/marketing";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { articleMainEntityOfPage } from "@/lib/article-jsonld";
import { formatPageTitle } from "@/lib/page-title";
import { getEventBySlug, getRelatedEvents } from "@/lib/events";
import { QAPILOT_EVENTS } from "@/lib/events-data";
import { getYouTubeThumbnail } from "@/utils/youtube";

export const revalidate = 3600;

export function generateStaticParams(): { slug: string }[] {
  return QAPILOT_EVENTS.map((event) => ({ slug: event.slug }));
}

function stripJsonLdContext(node: object): Record<string, unknown> {
  const o = { ...(node as Record<string, unknown>) };
  delete o["@context"];
  return o;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: formatPageTitle("Event not found") };
  }

  const canonicalUrl = `${SITE_BASE_URL}${PATHS.EVENTS}/${event.slug}`;
  const title = `${event.title} | QApilot Events`;
  const coverImageUrl = event.coverImageUrl
    ? `${SITE_BASE_URL}${event.coverImageUrl}`
    : event.youtubeUrl
      ? getYouTubeThumbnail(event.youtubeUrl)
      : null;
  const ogImages = coverImageUrl
    ? [{ url: coverImageUrl, alt: event.title }]
    : [defaultOpenGraphImage];

  return {
    title: formatPageTitle(event.title),
    description: event.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description: event.excerpt,
      siteName: "QApilot",
      locale: "en_US",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: event.excerpt,
      images: coverImageUrl
        ? [{ url: coverImageUrl, alt: event.title }]
        : [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  const canonicalUrl = `${SITE_BASE_URL}${PATHS.EVENTS}/${event.slug}`;
  const relatedEvents = getRelatedEvents(slug, 4);

  const eventSchema: Record<string, unknown> = {
    "@type": "Event",
    name: event.title,
    description: event.excerpt,
    url: canonicalUrl,
    ...articleMainEntityOfPage(canonicalUrl),
    eventAttendanceMode: event.isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: event.isUpcoming
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventPast",
    startDate: event.date,
    location: event.isVirtual
      ? {
          "@type": "VirtualLocation",
          url: event.externalUrl ?? SITE_BASE_URL,
        }
      : {
          "@type": "Place",
          name: event.location,
        },
    organizer: {
      "@type": "Organization",
      name: "QApilot",
      url: SITE_BASE_URL,
    },
  };

  if (event.participants?.length) {
    eventSchema.performer = event.participants.map((participant) => ({
      "@type": "Person",
      name: participant.name,
    }));
  }

  const previewImageUrl = event.coverImageUrl
    ? `${SITE_BASE_URL}${event.coverImageUrl}`
    : event.youtubeUrl
      ? getYouTubeThumbnail(event.youtubeUrl)
      : null;

  if (previewImageUrl) {
    eventSchema.image = previewImageUrl;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      eventSchema,
      stripJsonLdContext(
        buildBreadcrumbList([
          { name: "Home", path: PATHS.HOME },
          { name: "Events", path: PATHS.EVENTS },
          { name: event.title, path: `${PATHS.EVENTS}/${event.slug}` },
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
        <EventDetailView event={event} relatedEvents={relatedEvents} />
      </MarketingPageShell>
    </>
  );
}
