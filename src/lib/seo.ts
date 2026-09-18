import type { Metadata } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import {
  META_DESCRIPTION_MAX_LEN,
  META_DESCRIPTION_MIN_LEN,
  ensureMetaDescriptionLength,
} from "@/lib/meta-text";
import { formatPageTitle, formatPageTitleString } from "@/lib/page-title";

export { META_DESCRIPTION_MAX_LEN, META_DESCRIPTION_MIN_LEN };

/** Pad short / trim long descriptions into the 140–160 SERP window. */
export function formatMetaDescription(
  raw: string,
  maxLen = META_DESCRIPTION_MAX_LEN,
): string {
  return ensureMetaDescriptionLength(raw, META_DESCRIPTION_MIN_LEN, maxLen);
}

/** Organization / schema.org logo (not used for og:image or header wordmark). */
export const ORG_LOGO_PATH = "/QApilotLogo.svg";
export const ORG_LOGO_URL = `${SITE_BASE_URL}${ORG_LOGO_PATH}`;
export const ORG_LOGO_WIDTH = 100;
export const ORG_LOGO_HEIGHT = 100;

/**
 * Tab favicon: `public/favicon.ico` + `public/primary-favicon.svg`, Apple:
 * `src/app/apple-icon.svg` (also `public/primary-favicon.svg`).
 */

/**
 * Hosted Open Graph / Twitter share cards under `public/og/`.
 * Keep dimensions in sync with those files and with
 * `DEFAULT_OG_IMAGE` / `buildHtml` image dimensions in
 * `supabase/functions/prerender-meta/index.ts`.
 */
export const DEFAULT_SHARE_IMAGE_PATH = "/og/default-share.png";
export const DEFAULT_SHARE_IMAGE_URL = `${SITE_BASE_URL}${DEFAULT_SHARE_IMAGE_PATH}`;
export const DEFAULT_SHARE_IMAGE_WIDTH = 1024;
export const DEFAULT_SHARE_IMAGE_HEIGHT = 537;
export const DEFAULT_SHARE_IMAGE_ALT =
  "Mobile-first businesses need mobile-first app testing — QApilot";

type OpenGraphImageMeta = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

type StaticOgImageEntry = {
  path: string;
  alt: string;
};

/**
 * Per-route share cards for static marketing pages.
 * Dynamic CMS pages (blog/news/event posts) keep their own cover images.
 */
const STATIC_PAGE_OG_IMAGES: Record<string, StaticOgImageEntry> = {
  "/": {
    path: DEFAULT_SHARE_IMAGE_PATH,
    alt: DEFAULT_SHARE_IMAGE_ALT,
  },
  "/about": {
    path: "/og/about.png",
    alt: "About QApilot",
  },
  "/blogs": {
    path: "/og/blogs.png",
    alt: "The QApilot Blog",
  },
  "/careers": {
    path: "/og/careers.png",
    alt: "Careers at QApilot",
  },
  "/case-studies": {
    path: "/og/case-studies.png",
    alt: "QApilot case studies",
  },
  "/enterprise": {
    path: "/og/enterprise.png",
    alt: "QApilot for Enterprise",
  },
  "/events": {
    path: "/og/events.png",
    alt: "QApilot events and webinars",
  },
  "/faqs": {
    path: "/og/faqs.png",
    alt: "QApilot frequently asked questions",
  },
  "/for-flutter": {
    path: "/og/for-flutter.png",
    alt: "Flutter testing that works post-build",
  },
  "/for-product-owner": {
    path: "/og/for-product-owner.png",
    alt: "Know what ships before it ships",
  },
  "/for-qa-engineer": {
    path: "/og/for-qa-engineer.png",
    alt: "Less maintenance. More testing.",
  },
  "/for-qa-leader": {
    path: "/og/for-qa-leader.png",
    alt: "Coverage you can report on",
  },
  "/for-release-manager": {
    path: "/og/for-release-manager.png",
    alt: "Every release, signed off on time",
  },
  "/for-sre": {
    path: "/og/for-sre.png",
    alt: "Catch mobile failures before users do",
  },
  "/labs": {
    path: "/og/labs.png",
    alt: "QApilot Labs",
  },
  "/mcp/guide": {
    path: "/og/mcp-guide.png",
    alt: "QApilot MCP Server",
  },
  "/news": {
    path: "/og/news.png",
    alt: "QApilot news and updates",
  },
  "/news-updates": {
    path: "/og/news.png",
    alt: "QApilot news and updates",
  },
  "/partners": {
    path: "/og/partners.png",
    alt: "Partner with QApilot",
  },
  "/product": {
    path: "/og/product.png",
    alt: "One platform for mobile quality",
  },
  "/product/autonomous-testing": {
    path: "/og/product-autonomous-testing.png",
    alt: "Autonomous mobile app testing",
  },
  "/product/cowork": {
    path: "/og/product-cowork.png",
    alt: "CoWork: 3× automation, same QE team",
  },
  "/cowork": {
    path: "/og/product-cowork.png",
    alt: "CoWork: 3× automation, same QE team",
  },
  "/product/dual-device-testing": {
    path: "/og/product-dual-device-testing.png",
    alt: "Dual device testing",
  },
  "/product/release-readiness-suite": {
    path: "/og/product-release-readiness-suite.png",
    alt: "The Release Readiness Suite",
  },
  "/qa-guide": {
    path: "/og/qa-guide.png",
    alt: "The QE Guide",
  },
};

function normalizeStaticPath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";
  return trimmed.replace(/\/+$/, "");
}

function isHostedStaticOgImage(absoluteUrl: string): boolean {
  try {
    const { pathname } = new URL(absoluteUrl);
    return pathname.startsWith("/og/") && pathname.endsWith(".png");
  } catch {
    return /\/og\/[^/]+\.png(?:\?|$)/.test(absoluteUrl);
  }
}

/** OG/Twitter image for a static marketing path; falls back to the default share card. */
export function openGraphImageForPath(path: string): OpenGraphImageMeta {
  const entry = STATIC_PAGE_OG_IMAGES[normalizeStaticPath(path)];
  const imagePath = entry?.path ?? DEFAULT_SHARE_IMAGE_PATH;
  return {
    url: `${SITE_BASE_URL}${imagePath}`,
    width: DEFAULT_SHARE_IMAGE_WIDTH,
    height: DEFAULT_SHARE_IMAGE_HEIGHT,
    alt: entry?.alt ?? DEFAULT_SHARE_IMAGE_ALT,
  };
}

export const defaultOpenGraphImage = openGraphImageForPath("/");

/** Standard OG aspect ratio when CMS dimensions are unknown (no remote probing). */
export const DEFAULT_CMS_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_CMS_OG_IMAGE_HEIGHT = 630;

/** OG/Twitter image metadata without probing remote URLs. */
export function buildOpenGraphImageMeta(
  absoluteUrl: string | undefined,
  alt: string,
): OpenGraphImageMeta | undefined {
  if (!absoluteUrl) return undefined;

  const isStaticOg = isHostedStaticOgImage(absoluteUrl);

  return {
    url: absoluteUrl,
    alt,
    width: isStaticOg
      ? DEFAULT_SHARE_IMAGE_WIDTH
      : DEFAULT_CMS_OG_IMAGE_WIDTH,
    height: isStaticOg
      ? DEFAULT_SHARE_IMAGE_HEIGHT
      : DEFAULT_CMS_OG_IMAGE_HEIGHT,
  };
}

/** Partner & integration marquee logos. Blocked for Googlebot-Image in robots.txt */
export const PARTNER_LOGOS_PATH_PREFIX = "/partner-logos-noindex/";

type StaticPageMetadataInput = {
  /** Base title without trailing `| QApilot`. */
  title: string;
  description: string;
  path: string;
  ogDescription?: string;
  twitterDescription?: string;
};

/** Consistent metadata for static marketing pages (avoids duplicate brand suffix). */
export function buildStaticPageMetadata({
  title,
  description,
  path,
  ogDescription,
  twitterDescription,
}: StaticPageMetadataInput): Metadata {
  const canonicalUrl = `${SITE_BASE_URL}${path}`;
  const displayTitle = formatPageTitleString(title);
  const metaDescription = formatMetaDescription(description);
  const ogDesc = formatMetaDescription(ogDescription ?? description);
  const twitterDesc = formatMetaDescription(
    twitterDescription ?? ogDescription ?? description,
  );
  const ogImage = openGraphImageForPath(path);

  return {
    title: formatPageTitle(title),
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: displayTitle,
      description: ogDesc,
      siteName: "QApilot",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: twitterDesc,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}
