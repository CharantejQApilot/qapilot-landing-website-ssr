export type EventType = "webinar" | "meetup" | "conference" | "virtual" | "podcast";

export type EventParticipant = {
  name: string;
  role: string;
  imageUrl: string;
  /** CSS object-position for cropping headshots consistently in the portrait frame */
  imagePosition?: string;
};

/** Up to three "Explore QApilot" CTAs on event detail pages. Configure per event in QAPILOT_EVENTS. */
export type EventExploreCta = {
  label: string;
  href: string;
};

export type QApilotEvent = {
  slug: string;
  title: string;
  excerpt: string;
  description: string[];
  type: EventType;
  /** ISO 8601 date (YYYY-MM-DD) */
  date: string;
  /** Human-readable time label, e.g. "12:00 CET" */
  timeLabel?: string;
  location: string;
  isVirtual: boolean;
  isFeatured: boolean;
  /** External registration or recording URL */
  externalUrl?: string;
  /** When true, event is upcoming; otherwise past */
  isUpcoming: boolean;
  /** Host / guest portraits for featured podcast-style events */
  participants?: EventParticipant[];
  /** Distribution platforms shown on podcast cards */
  platforms?: string[];
  /** Optional hrefs for platform chips (e.g. YouTube watch or channel URLs) */
  platformLinks?: { name: string; href: string }[];
  /** Hero/cover image for the event detail page */
  coverImageUrl?: string;
  /** When set, detail page shows an embedded YouTube player instead of a cover image */
  youtubeUrl?: string;
  /** Early-stage event: date locked but stream details still being finalized */
  isTeaser?: boolean;
  /** Optional explore CTAs (max 3). Falls back to site defaults when omitted. */
  exploreCtas?: EventExploreCta[];
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  webinar: "Webinar",
  meetup: "Meetup",
  conference: "Conference",
  virtual: "Virtual event",
  podcast: "Podcast",
};

/** Static events catalog. Update here or migrate to CMS when editorial workflow is ready. */
export const QAPILOT_EVENTS: QApilotEvent[] = [
  {
    slug: "alan-aditya-mobile-qa-podcast",
    title: "AI-Native Mobile Testing: A Conversation Between Alan and Aditya",
    excerpt:
      "Alan Page sits down with Aditya Challa for a recorded conversation on mobile release readiness, agentic QA, and what changes when testing is built for apps, not browsers. Launching June 23 on YouTube, Spotify, Apple Podcasts, and more.",
    description: [
      "Mobile teams are shipping faster than ever, but traditional automation still struggles with real devices, flaky UI, and release decisions that arrive too late.",
      "In this recorded podcast, host Alan Page talks with Aditya Challa about how AI-native mobile testing is reshaping quality engineering: autonomous exploration, intelligent bug detection, and release signals that product and engineering leaders can actually trust.",
      "The episode goes live June 23 on YouTube, Spotify, Apple Podcasts, and additional channels. Watch or listen wherever you follow your favorite QA and engineering conversations.",
    ],
    type: "podcast",
    date: "2026-06-23",
    location: "Virtual",
    isVirtual: true,
    isFeatured: true,
    isUpcoming: true,
    participants: [
      {
        name: "Alan Page",
        role: "Host",
        imageUrl: "/events/alan-podcast-host.png",
        imagePosition: "center 22%",
      },
      {
        name: "Aditya Challa",
        role: "Guest",
        imageUrl: "/events/aditya-podcast-guest.png",
        imagePosition: "center top",
      },
    ],
    platforms: ["YouTube", "Spotify", "Apple Podcasts"],
    coverImageUrl: "/events/alan-aditya-podcast-cover.png",
  },
  {
    slug: "joe-colantonio-qapilot-podcast",
    title: "Mobile Test Automation is Broken. Here's How QApilot Fixes It",
    excerpt:
      "Joe Colantonio interviews QApilot Co-founder Aditya Challa on why mobile test automation breaks at scale, flaky pipelines, and how QApilot's mobile-first autonomous approach delivers tests teams can trust.",
    description: [
      "Mobile test automation is still one of the biggest bottlenecks in modern software delivery. In this interview on Automation Testing with Joe Colantonio, QApilot Co-founder Aditya Challa explains why most AI testing approaches fail and how to fix them.",
      "If your mobile tests are flaky, slow, or hard to trust, you are not alone. Most teams apply LLM-based AI to problems that require deterministic reliability, and that is where things break down.",
      "In this episode, Aditya walks through why mobile automation breaks at scale, how flaky tests destroy pipeline confidence, how QApilot approaches mobile testing differently, and what reliable, scalable mobile automation should look like for release teams.",
      "Watch the full conversation on YouTube for live demos, customer results, Flutter coverage, device farm integrations, and practical advice on where autonomous testing fits in CI/CD.",
    ],
    type: "podcast",
    date: "2026-03-31",
    location: "Virtual",
    isVirtual: true,
    isFeatured: false,
    isUpcoming: false,
    externalUrl: "https://www.youtube.com/watch?v=LGjEVFSAehw",
    participants: [
      {
        name: "Joe Colantonio",
        role: "Host",
        imageUrl: "/events/joe-colantonio-host.jpg",
        imagePosition: "center top",
      },
      {
        name: "Aditya Challa",
        role: "Guest",
        imageUrl: "/events/aditya-podcast-guest.png",
        imagePosition: "center top",
      },
    ],
    platforms: ["YouTube"],
    platformLinks: [
      {
        name: "YouTube",
        href: "https://www.youtube.com/watch?v=LGjEVFSAehw",
      },
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=LGjEVFSAehw",
  },
  {
    slug: "naveen-automation-labs-qapilot-live-webinar",
    title: "Live QApilot Product Showcase on Naveen Automation Labs",
    excerpt:
      "QApilot joins Naveen Khunteta for a live product showcase on the Naveen Automation Labs YouTube channel. The webinar date is locked for July 10. Stream time, agenda, and registration details are coming soon.",
    description: [
      "Naveen Automation Labs is one of the largest automation testing education communities on YouTube, trusted by hundreds of thousands of QA engineers learning Selenium, API testing, CI/CD, and modern test architecture.",
      "QApilot is teaming up with founder Naveen Khunteta for a live YouTube session showcasing the platform: autonomous mobile exploration, agent-assisted authoring, Flutter coverage, and release-ready signals on real devices.",
      "This page is an early teaser while we finalize the stream time and run-of-show. The webinar date is locked for July 10, 2026. Subscribe to Naveen Automation Labs on YouTube so you are notified when the live stream link goes public.",
      "Want a deeper look before the broadcast? Use the demo form at the top of this page to schedule a tailored QApilot walkthrough on your own iOS, Android, or Flutter app.",
    ],
    type: "webinar",
    date: "2026-07-10",
    timeLabel: "YouTube Live · Time TBA",
    location: "Virtual",
    isVirtual: true,
    isFeatured: false,
    isUpcoming: true,
    isTeaser: true,
    externalUrl: "https://www.youtube.com/c/NaveenAutomationLabs",
    participants: [
      {
        name: "Naveen Khunteta",
        role: "Host",
        imageUrl: "/events/naveen-khunteta-host.png",
        imagePosition: "center 22%",
      },
      {
        name: "Aditya Challa",
        role: "Guest",
        imageUrl: "/events/aditya-podcast-guest.png",
        imagePosition: "center top",
      },
    ],
    platforms: ["YouTube Live"],
    platformLinks: [
      {
        name: "YouTube Live",
        href: "https://www.youtube.com/c/NaveenAutomationLabs",
      },
    ],
  },
];
