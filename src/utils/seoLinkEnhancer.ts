import { SITE_DOMAIN } from "@/lib/constants";

/**
 * Enhances anchor tags in sanitized HTML content with SEO-friendly attributes.
 * - External links get: rel="noopener", target="_blank", and a title attribute
 * - Internal links (same domain) are left unchanged
 */
export function enhanceContentLinks(html: string, siteDomain = SITE_DOMAIN): string {
  if (!html) return html;

  // Match <a ...> tags and enhance them
  return html.replace(/<a\s([^>]*?)>/gi, (match, attrs: string) => {
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    if (!hrefMatch) return match;

    const href = hrefMatch[1];

    // Skip anchors, mailto, tel, and internal links
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("/") ||
      href.includes(siteDomain)
    ) {
      return match;
    }

    // External link. Enhance with SEO attributes
    let enhanced = attrs;

    // Add target="_blank" if not present
    if (!/target=/i.test(enhanced)) {
      enhanced += ' target="_blank"';
    }

    // Replace or add rel. Use "noopener" (no noreferrer, to pass referral)
    if (/rel=/i.test(enhanced)) {
      enhanced = enhanced.replace(/rel=["'][^"']*["']/i, 'rel="noopener"');
    } else {
      enhanced += ' rel="noopener"';
    }

    // Add title from link text context if not present
    // We can't easily get inner text here, so use the domain as a fallback title
    if (!/title=/i.test(enhanced)) {
      try {
        const domain = new URL(href).hostname.replace("www.", "");
        enhanced += ` title="Visit ${domain}"`;
      } catch {
        // Invalid URL, skip title
      }
    }

    return `<a ${enhanced}>`;
  });
}
