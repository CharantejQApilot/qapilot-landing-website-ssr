/**
 * Client-side first / last touch attribution (UTM > referrer > direct).
 * Persists under a single localStorage key; use getAttributionPayload() for forms / HubSpot later.
 */

export const ATTRIBUTION_STORAGE_KEY = "qapilot_attribution" as const;

const STORAGE_VERSION = 1 as const;

export type AttributionMode = "utm" | "referrer" | "direct" | "unknown";

export type AttributionData = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  landingPage: string | null;
  timestamp: string | null;
  attributionMode: AttributionMode;
};

export type SessionPlatform = "desktop" | "mobile" | "tablet" | "unknown";

export type StoredAttribution = {
  version: typeof STORAGE_VERSION;
  firstTouch: AttributionData | null;
  lastTouch: AttributionData | null;
  originalUrl: string | null;
  currentUrl: string | null;
  sessionEntryChannel: string | null;
  sessionEntryPlatform: SessionPlatform | null;
  gaClientId: string | null;
};

function trimOrNull(v: string | null): string | null {
  if (v === null) return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}

export function parseUtmParams(search: string): {
  hasUtm: boolean;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
} {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const source = trimOrNull(params.get("utm_source"));
  const medium = trimOrNull(params.get("utm_medium"));
  const campaign = trimOrNull(params.get("utm_campaign"));
  const content = trimOrNull(params.get("utm_content"));
  const term = trimOrNull(params.get("utm_term"));
  const hasUtm = Boolean(source || medium || campaign || content || term);
  return { hasUtm, source, medium, campaign, content, term };
}

function hostnameFromReferrer(referrer: string): string | null {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/** True if hostname equals domain or is a subdomain of it (e.g. m.facebook.com). */
function hostMatches(hostname: string, domain: string): boolean {
  const h = hostname;
  const d = domain.toLowerCase();
  return h === d || h.endsWith(`.${d}`);
}

/** Google organic search hosts (exclude non-SERP Google properties). */
function isGoogleSearchHost(hostname: string): boolean {
  if (hostname === "google.com" || hostMatches(hostname, "google.com")) {
    return true;
  }
  // Country TLDs: google.de, google.co.uk, etc.
  if (/^google\.[a-z.]+$/i.test(hostname)) {
    return true;
  }
  return false;
}

export function classifyReferrer(
  referrer: string | null,
): Pick<AttributionData, "source" | "medium" | "attributionMode"> {
  if (!referrer || referrer.trim() === "") {
    return {
      source: "direct",
      medium: "none",
      attributionMode: "direct",
    };
  }

  const hostname = hostnameFromReferrer(referrer);
  if (!hostname) {
    return {
      source: "unknown",
      medium: "unknown",
      attributionMode: "unknown",
    };
  }

  if (hostname === "youtu.be" || hostMatches(hostname, "youtube.com")) {
    return {
      source: "youtube",
      medium: "referral_video",
      attributionMode: "referrer",
    };
  }

  if (
    hostMatches(hostname, "linkedin.com") ||
    hostname === "lnkd.in" ||
    hostMatches(hostname, "lnkd.in")
  ) {
    return {
      source: "linkedin",
      medium: "referral_social",
      attributionMode: "referrer",
    };
  }

  if (
    hostMatches(hostname, "twitter.com") ||
    hostMatches(hostname, "x.com") ||
    hostname === "t.co" ||
    hostMatches(hostname, "t.co")
  ) {
    return {
      source: "twitter",
      medium: "referral_social",
      attributionMode: "referrer",
    };
  }

  if (
    hostname === "l.instagram.com" ||
    hostMatches(hostname, "instagram.com")
  ) {
    return {
      source: "instagram",
      medium: "referral_social",
      attributionMode: "referrer",
    };
  }

  if (hostMatches(hostname, "facebook.com")) {
    return {
      source: "facebook",
      medium: "referral_social",
      attributionMode: "referrer",
    };
  }

  if (
    hostMatches(hostname, "reddit.com") ||
    hostname === "out.reddit.com" ||
    hostMatches(hostname, "out.reddit.com")
  ) {
    return {
      source: "reddit",
      medium: "referral_social",
      attributionMode: "referrer",
    };
  }

  if (isGoogleSearchHost(hostname)) {
    return {
      source: "google",
      medium: "organic_search",
      attributionMode: "referrer",
    };
  }

  if (hostMatches(hostname, "bing.com")) {
    return {
      source: "bing",
      medium: "organic_search",
      attributionMode: "referrer",
    };
  }

  if (hostMatches(hostname, "duckduckgo.com")) {
    return {
      source: "duckduckgo",
      medium: "organic_search",
      attributionMode: "referrer",
    };
  }

  if (
    hostname === "search.yahoo.com" ||
    hostMatches(hostname, "search.yahoo.com")
  ) {
    return {
      source: "yahoo",
      medium: "organic_search",
      attributionMode: "referrer",
    };
  }

  return {
    source: hostname,
    medium: "referral",
    attributionMode: "referrer",
  };
}

function inferSessionPlatform(): SessionPlatform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (
    /iPad|Tablet|PlayBook/i.test(ua) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))
  ) {
    return "tablet";
  }
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) {
    return "mobile";
  }
  if (ua.length > 0) return "desktop";
  return "unknown";
}

export function buildCurrentAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return emptyAttributionData();
  }

  const search = window.location.search || "";
  const utm = parseUtmParams(search);
  const referrer = document.referrer?.trim() ? document.referrer : null;
  const landingPage =
    `${window.location.pathname || "/"}${window.location.search || ""}` || null;
  const timestamp = new Date().toISOString();

  if (utm.hasUtm) {
    return {
      source: utm.source,
      medium: utm.medium,
      campaign: utm.campaign,
      content: utm.content,
      term: utm.term,
      referrer,
      landingPage,
      timestamp,
      attributionMode: "utm",
    };
  }

  const classified = classifyReferrer(referrer);
  return {
    source: classified.source,
    medium: classified.medium,
    campaign: null,
    content: null,
    term: null,
    referrer,
    landingPage,
    timestamp,
    attributionMode: classified.attributionMode,
  };
}

function emptyAttributionData(): AttributionData {
  return {
    source: null,
    medium: null,
    campaign: null,
    content: null,
    term: null,
    referrer: null,
    landingPage: null,
    timestamp: null,
    attributionMode: "unknown",
  };
}

function isAttributionData(v: unknown): v is AttributionData {
  if (v === null || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.attributionMode === "string" &&
    ["utm", "referrer", "direct", "unknown"].includes(
      o.attributionMode as string,
    )
  );
}

function emptyStored(): StoredAttribution {
  return {
    version: STORAGE_VERSION,
    firstTouch: null,
    lastTouch: null,
    originalUrl: null,
    currentUrl: null,
    sessionEntryChannel: null,
    sessionEntryPlatform: null,
    gaClientId: null,
  };
}

export function getStoredAttribution(): StoredAttribution {
  if (typeof window === "undefined") {
    return emptyStored();
  }
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return emptyStored();
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== "object") return emptyStored();
    const o = parsed as Record<string, unknown>;
    if (o.version !== STORAGE_VERSION) return emptyStored();

    const firstTouch = isAttributionData(o.firstTouch) ? o.firstTouch : null;
    const lastTouch = isAttributionData(o.lastTouch) ? o.lastTouch : null;

    const sessionEntryPlatform =
      o.sessionEntryPlatform === "desktop" ||
      o.sessionEntryPlatform === "mobile" ||
      o.sessionEntryPlatform === "tablet" ||
      o.sessionEntryPlatform === "unknown"
        ? o.sessionEntryPlatform
        : null;

    return {
      version: STORAGE_VERSION,
      firstTouch,
      lastTouch,
      originalUrl: typeof o.originalUrl === "string" ? o.originalUrl : null,
      currentUrl: typeof o.currentUrl === "string" ? o.currentUrl : null,
      sessionEntryChannel:
        typeof o.sessionEntryChannel === "string"
          ? o.sessionEntryChannel
          : null,
      sessionEntryPlatform,
      gaClientId: typeof o.gaClientId === "string" ? o.gaClientId : null,
    };
  } catch {
    return emptyStored();
  }
}

function touchToFlatPrefix(
  prefix: "first" | "last",
  t: AttributionData | null,
): Record<string, string> {
  const p = prefix;
  return {
    [`${p}_source`]: t?.source ?? "",
    [`${p}_medium`]: t?.medium ?? "",
    [`${p}_campaign`]: t?.campaign ?? "",
    [`${p}_content`]: t?.content ?? "",
    [`${p}_term`]: t?.term ?? "",
    [`${p}_referrer`]: t?.referrer ?? "",
    [`${p}_landing_page`]: t?.landingPage ?? "",
    [`${p}_landing_timestamp`]: t?.timestamp ?? "",
  };
}

/** HubSpot / API field names (single source of truth). */
export const ATTRIBUTION_PAYLOAD_FIELD_NAMES = [
  "first_source",
  "first_medium",
  "first_campaign",
  "first_content",
  "first_term",
  "first_referrer",
  "first_landing_page",
  "first_landing_timestamp",
  "last_source",
  "last_medium",
  "last_campaign",
  "last_content",
  "last_term",
  "last_referrer",
  "last_landing_page",
  "last_landing_timestamp",
  "attribution_mode",
  "original_url",
  "current_url",
  "session_entry_channel",
  "session_entry_platform",
  "ga_client_id",
] as const;

export type AttributionPayloadFieldName =
  (typeof ATTRIBUTION_PAYLOAD_FIELD_NAMES)[number];

/** Drop empty / whitespace-only strings so HubSpot is not overwritten with blanks. */
export function omitEmptyStringValues(
  obj: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => typeof v === "string" && v.trim() !== "",
    ),
  );
}

/** Attribution fields only, non-empty. Merge into form POST bodies or HubSpot `fields`. */
export function getCleanAttributionPayloadForHubSpot(): Record<string, string> {
  return omitEmptyStringValues(getAttributionPayload());
}

/** Flat snake_case strings for hidden form fields or APIs. */
export function getAttributionPayload(): Record<string, string> {
  const data = getStoredAttribution();
  return {
    ...touchToFlatPrefix("first", data.firstTouch),
    ...touchToFlatPrefix("last", data.lastTouch),
    attribution_mode: data.lastTouch?.attributionMode ?? "",
    original_url: data.originalUrl ?? "",
    current_url: data.currentUrl ?? "",
    session_entry_channel: data.sessionEntryChannel ?? "",
    session_entry_platform: data.sessionEntryPlatform ?? "",
    ga_client_id: data.gaClientId ?? "",
  };
}

export function saveAttribution(): void {
  if (typeof window === "undefined") return;

  const current = buildCurrentAttribution();
  const existing = getStoredAttribution();

  const isFirst = existing.firstTouch === null;
  const firstTouch = existing.firstTouch ?? current;
  const lastTouch = current;

  const href = window.location.href;
  const originalUrl =
    existing.originalUrl ?? (isFirst ? href : existing.originalUrl);
  const currentUrl = href;

  const sessionEntryChannel =
    existing.sessionEntryChannel ?? firstTouch.source ?? "unknown";

  const sessionEntryPlatform =
    existing.sessionEntryPlatform ?? inferSessionPlatform();

  const next: StoredAttribution = {
    version: STORAGE_VERSION,
    firstTouch,
    lastTouch,
    originalUrl,
    currentUrl,
    sessionEntryChannel,
    sessionEntryPlatform,
    gaClientId: existing.gaClientId,
  };

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota or private mode. Ignore
  }
}

/** For tests or future GA wiring: set client id into stored state. */
export function setGaClientIdForAttribution(clientId: string | null): void {
  if (typeof window === "undefined") return;
  const s = getStoredAttribution();
  const next: StoredAttribution = {
    ...s,
    gaClientId: clientId?.trim() || null,
  };
  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
