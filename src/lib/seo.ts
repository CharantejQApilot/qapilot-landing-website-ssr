import type { Metadata } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { formatPageTitle, formatPageTitleString } from "@/lib/page-title";

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
 * Default Open Graph / Twitter share image (hosted on site).
 * Keep dimensions in sync with the file under `public/og/` and with
 * `DEFAULT_OG_IMAGE` / `buildHtml` image dimensions in
 * `supabase/functions/prerender-meta/index.ts`.
 */
export const DEFAULT_SHARE_IMAGE_PATH = "/og/default-share.png";
export const DEFAULT_SHARE_IMAGE_URL = `${SITE_BASE_URL}${DEFAULT_SHARE_IMAGE_PATH}`;
export const DEFAULT_SHARE_IMAGE_WIDTH = 993;
export const DEFAULT_SHARE_IMAGE_HEIGHT = 545;

export const defaultOpenGraphImage = {
  url: DEFAULT_SHARE_IMAGE_URL,
  width: DEFAULT_SHARE_IMAGE_WIDTH,
  height: DEFAULT_SHARE_IMAGE_HEIGHT,
  alt: "QApilot autonomous mobile app testing platform for release readiness",
} as const;

/** Standard OG aspect ratio when CMS dimensions are unknown (no remote probing). */
export const DEFAULT_CMS_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_CMS_OG_IMAGE_HEIGHT = 630;

type OpenGraphImageMeta = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

/** OG/Twitter image metadata without probing remote URLs. */
export function buildOpenGraphImageMeta(
  absoluteUrl: string | undefined,
  alt: string,
): OpenGraphImageMeta | undefined {
  if (!absoluteUrl) return undefined;

  const isDefaultShare =
    absoluteUrl === DEFAULT_SHARE_IMAGE_URL ||
    absoluteUrl.endsWith(DEFAULT_SHARE_IMAGE_PATH);

  return {
    url: absoluteUrl,
    alt,
    width: isDefaultShare ? DEFAULT_SHARE_IMAGE_WIDTH : DEFAULT_CMS_OG_IMAGE_WIDTH,
    height: isDefaultShare ? DEFAULT_SHARE_IMAGE_HEIGHT : DEFAULT_CMS_OG_IMAGE_HEIGHT,
  };
}

/** Partner & integration marquee logos — blocked for Googlebot-Image in robots.txt */
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

  return {
    title: formatPageTitle(title),
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: displayTitle,
      description: ogDescription ?? description,
      siteName: "QApilot",
      locale: "en_US",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: twitterDescription ?? ogDescription ?? description,
      images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
    },
  };
}
