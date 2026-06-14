import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

/** Single source for home `metadata` + JSON-LD (avoid og:image vs schema drift). */
export const HOME_PAGE_TITLE =
  "QApilot — AI-Powered Mobile App Testing & QA Automation";

export const HOME_PAGE_DESCRIPTION =
  "QApilot is the AI-native mobile app testing platform that autonomously explores your app, generates coverage, and self-heals broken tests. iOS, Android & Flutter. Book a demo.";

export const HOME_PAGE_OG_TITLE = HOME_PAGE_TITLE;

export const HOME_PAGE_OG_DESCRIPTION = HOME_PAGE_DESCRIPTION;

export const HOME_PAGE_TWITTER_TITLE = HOME_PAGE_TITLE;

export const HOME_PAGE_TWITTER_DESCRIPTION = HOME_PAGE_DESCRIPTION;

const canonicalUrl = `${SITE_BASE_URL}/`;

/**
 * Homepage-only structured data: aligns primary image with og:image/twitter (no UI).
 * @see https://schema.org/WebPage
 * @see https://schema.org/primaryImageOfPage
 */
export const homeWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: canonicalUrl,
  name: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  isPartOf: {
    "@type": "WebSite",
    url: SITE_BASE_URL,
    name: "QApilot",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: defaultOpenGraphImage.url,
    width: defaultOpenGraphImage.width,
    height: defaultOpenGraphImage.height,
    caption: defaultOpenGraphImage.alt,
  },
};
