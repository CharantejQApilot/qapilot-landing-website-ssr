/** Shared Article JSON-LD fields for CMS-backed content pages. */
export function articleMainEntityOfPage(pageUrl: string): {
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
} {
  return {
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}
