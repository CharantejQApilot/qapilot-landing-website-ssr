/**
 * Canonical short slugs for long CMS blog/news URLs (SEO + shareability).
 * CMS rows keep the original slug; the site serves and canonicalizes the short form.
 */

/** short slug → CMS slug */
export const BLOG_SHORT_TO_CMS: Record<string, string> = {
  "image-recognition-self-healing-tests":
    "leveraging-image-recognition-for-robust-and-self-healing-test-automation-with-qapilot",
  "parallel-mobile-app-testing":
    "beyond-sequential-testing-accelerate-your-mobile-app-testing-with-parallel-execution",
};

/**
 * Retired blog slug → the post that replaced it.
 * Kept separate from BLOG_SHORT_TO_CMS so the canonical URL does not resolve back to the retired row.
 */
export const RETIRED_BLOG_SLUGS: Record<string, string> = {
  "best-browserstack-alternatives-2026": "browserstack-alternatives-2026",
};

/** short slug → CMS slug */
export const NEWS_SHORT_TO_CMS: Record<string, string> = {
  "qapilot-qe-conclave-2025":
    "qapilot-s-gold-sponsorship-speaker-session-and-community-engagement-at-qe-conclave-2025",
  "joe-colantonio-flutter-testing-2026":
    "joe-colantonio-on-flutter-testing-in-2026-why-mobile-teams-need-a-new-playbook",
  "qapilot-qualizeal-partnership":
    "qapilot-announces-strategic-partnership-with-qualizeal-to-elevate-mobile-app-quality-engineering",
  "qapilot-nasscom-google-agentic-ai":
    "observing-the-agentic-ai-ecosystem-qapilot-at-the-nasscom-and-google-agentic-ai-roadshow",
  "surendranath-jillela-ceo-insights":
    "surendranath-jillela-featured-in-ceo-insights-leading-ai-native-quality-engineering",
};

function invert(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [short, cms] of Object.entries(map)) {
    out[cms] = short;
  }
  return out;
}

export const BLOG_CMS_TO_SHORT = invert(BLOG_SHORT_TO_CMS);
export const NEWS_CMS_TO_SHORT = invert(NEWS_SHORT_TO_CMS);

export function resolveBlogCmsSlug(urlSlug: string): string {
  return BLOG_SHORT_TO_CMS[urlSlug] ?? urlSlug;
}

export function canonicalBlogSlug(cmsSlug: string): string {
  return BLOG_CMS_TO_SHORT[cmsSlug] ?? cmsSlug;
}

/** If the request used a long CMS slug, return the short canonical to redirect to. */
export function blogSlugRedirectTarget(urlSlug: string): string | null {
  const retired = RETIRED_BLOG_SLUGS[urlSlug];
  if (retired && retired !== urlSlug) return retired;
  const short = BLOG_CMS_TO_SHORT[urlSlug];
  return short && short !== urlSlug ? short : null;
}

export function resolveNewsCmsSlug(urlSlug: string): string {
  return NEWS_SHORT_TO_CMS[urlSlug] ?? urlSlug;
}

export function canonicalNewsSlug(cmsSlug: string): string {
  return NEWS_CMS_TO_SHORT[cmsSlug] ?? cmsSlug;
}

export function newsSlugRedirectTarget(urlSlug: string): string | null {
  const short = NEWS_CMS_TO_SHORT[urlSlug];
  return short && short !== urlSlug ? short : null;
}

/** next.config redirect entries: long CMS path → short canonical path */
export function contentSlugRedirects(): Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> {
  return [
    ...Object.entries(BLOG_CMS_TO_SHORT).map(([cms, short]) => ({
      source: `/blogs/${cms}`,
      destination: `/blogs/${short}`,
      permanent: true,
    })),
    ...Object.entries(RETIRED_BLOG_SLUGS).map(([from, to]) => ({
      source: `/blogs/${from}`,
      destination: `/blogs/${to}`,
      permanent: true,
    })),
    ...Object.entries(NEWS_CMS_TO_SHORT).map(([cms, short]) => ({
      source: `/news/${cms}`,
      destination: `/news/${short}`,
      permanent: true,
    })),
  ];
}
