import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";

/**
 * Static marketing URLs only. Individual `/blogs/:slug` URLs live in the Edge
 * `sitemap-posts` function (image/video sitemap extensions) — see
 * `sitemap-index.xml` and `robots.ts`.
 */
export const revalidate = 3600;

const staticPages: MetadataRoute.Sitemap = [
  { url: `${SITE_BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
  {
    url: `${SITE_BASE_URL}${PATHS.PRODUCT}`,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AUTONOMOUS_TESTING}`,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.COWORK}`,
    changeFrequency: "monthly",
    priority: 0.84,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.INTELLIGENT_BUG_DETECTION}`,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.ENTERPRISE}`,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.BOOK_DEMO}`,
    changeFrequency: "monthly",
    priority: 0.92,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.ABOUT}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_FLUTTER}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.BRING_YOUR_OWN_AGENT}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AGENTIC_ARCHITECTURE}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.NEWS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.EVENTS}`,
    changeFrequency: "weekly",
    priority: 0.78,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.BLOGS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.QA_GUIDE}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.CAREERS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.PARTNERS}`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FAQS}`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.LABS}`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.DEVICE_COVERAGE_MATRIX}`,
    changeFrequency: "weekly",
    priority: 0.78,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.SECURITY_REPORTS}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.AI_SELF_HEALING}`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.COMPARE_WEB_FIRST}`,
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.COMPARE_APPIUM}`,
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.COMPARE_VISUAL_TESTING}`,
    changeFrequency: "monthly",
    priority: 0.78,
  },
  // Platform → By Role (paths must match PLATFORM_BY_ROLE in routes.ts; titles/descriptions also in prerender-meta)
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_QA_LEADER}`,
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_RELEASE_MANAGER}`,
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_QA_ENGINEER}`,
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_PRODUCT_OWNER}`,
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.FOR_SRE}`,
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.TERMS}`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.PRIVACY}`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_BASE_URL}${PATHS.TERMS_CONDITIONS}`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages;
}
