import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { enhanceContentLinks } from "@/utils/seoLinkEnhancer";

marked.setOptions({ gfm: true, breaks: true });

export type RichTextFormat = "html" | "markdown";

/**
 * CMS HTML / markdown → sanitized HTML for `dangerouslySetInnerHTML`.
 * Used from Server Components to avoid shipping huge strings through client `useMemo` RSC payloads.
 */
export function sanitizeRichText(
  html: string,
  contentFormat: RichTextFormat = "html",
): string {
  const source = html || "";
  try {
    if (contentFormat === "markdown") {
      const raw = marked.parse(source, { async: false }) as string;
      return enhanceContentLinks(DOMPurify.sanitize(raw));
    }
    return enhanceContentLinks(DOMPurify.sanitize(source));
  } catch {
    return "";
  }
}
