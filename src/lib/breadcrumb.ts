import { SITE_BASE_URL } from "./constants";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Builds a BreadcrumbList JSON-LD structure for SEO.
 * Paths are relative (e.g. "/about"); they are turned into full URLs with SITE_BASE_URL.
 */
export function buildBreadcrumbList(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_BASE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}
