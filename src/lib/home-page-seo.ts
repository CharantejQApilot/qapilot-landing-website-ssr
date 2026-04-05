import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

/** Single source for home `metadata` + JSON-LD (avoid og:image vs schema drift). */
export const HOME_PAGE_TITLE =
  "QApilot - AI-Powered Mobile App Testing & QA Automation | iOS & Android";

export const HOME_PAGE_DESCRIPTION =
  "Automate your mobile app testing with QApilot's AI-powered platform. Get instant test coverage for iOS & Android apps. Start testing in minutes, not hours. Try free today.";

export const HOME_PAGE_OG_TITLE =
  "QApilot - AI-Powered Mobile App Testing & QA Automation";

export const HOME_PAGE_OG_DESCRIPTION =
  "Automate your mobile app testing with AI. Get instant test coverage for iOS & Android. Reduce testing time by 80%. Start free today.";

export const HOME_PAGE_TWITTER_TITLE = "QApilot - AI-Powered Mobile App Testing";

export const HOME_PAGE_TWITTER_DESCRIPTION =
  "Automate mobile app testing with AI. Instant test coverage for iOS & Android. Start free today.";

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
