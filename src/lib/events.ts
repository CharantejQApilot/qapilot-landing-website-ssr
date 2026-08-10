import { formatPublishedDate } from "@/lib/format-published";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import {
  EVENT_TYPE_LABELS,
  QAPILOT_EVENTS,
  type EventExploreCta,
  type EventType,
  type QApilotEvent,
} from "@/lib/events-data";

const MAX_EVENT_EXPLORE_CTAS = 3;

/** Default explore CTAs when an event does not define its own. */
export const DEFAULT_EVENT_EXPLORE_CTAS: EventExploreCta[] = [
  { label: "Book a demo", href: BOOK_DEMO_CALENDAR_URL },
  { label: "CoWork - 3x Automation, Same QA Team", href: PATHS.COWORK },
  { label: "Flutter Testing Simplified", href: PATHS.FOR_FLUTTER },
];

export function getEventExploreCtas(event: QApilotEvent): EventExploreCta[] {
  const ctas = event.exploreCtas ?? DEFAULT_EVENT_EXPLORE_CTAS;
  return ctas.slice(0, MAX_EVENT_EXPLORE_CTAS);
}

export function getAllEvents(): QApilotEvent[] {
  return [...QAPILOT_EVENTS].sort((a, b) => {
    if (a.isUpcoming !== b.isUpcoming) return a.isUpcoming ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getEventBySlug(slug: string): QApilotEvent | undefined {
  return QAPILOT_EVENTS.find((e) => e.slug === slug);
}

export function getFeaturedEvent(): QApilotEvent | undefined {
  return QAPILOT_EVENTS.find((e) => e.isFeatured);
}

export function getNonFeaturedEvents(): QApilotEvent[] {
  return getAllEvents().filter((e) => !e.isFeatured);
}

export function getRelatedEvents(slug: string, limit = 4): QApilotEvent[] {
  return getAllEvents().filter((e) => e.slug !== slug).slice(0, limit);
}

export function formatEventTypeLabel(type: EventType): string {
  return EVENT_TYPE_LABELS[type];
}

export function formatEventDateLabel(
  event: QApilotEvent,
  pattern = "MMMM d, yyyy",
): string | null {
  return formatPublishedDate(event.date, pattern);
}

/** Meta line like "February 27, 2025 · 12:00 CET · Virtual" */
export function formatEventMetaLine(event: QApilotEvent): string {
  const parts: string[] = [];
  const dateLabel = formatEventDateLabel(event);
  if (dateLabel) parts.push(dateLabel);

  if (event.type === "podcast") {
    parts.push(event.isUpcoming ? "Recorded episode" : "Recorded");
  } else if (event.timeLabel) {
    parts.push(event.timeLabel);
  }

  if (event.isVirtual) {
    if (event.type !== "podcast") parts.push("Virtual");
  } else {
    parts.push(event.location);
  }

  return parts.join(" · ");
}
