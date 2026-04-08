import { SITE_BASE_URL } from "@/lib/constants";

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

/** Partner & integration marquee logos — blocked for Googlebot-Image in robots.txt */
export const PARTNER_LOGOS_PATH_PREFIX = "/partner-logos-noindex/";
