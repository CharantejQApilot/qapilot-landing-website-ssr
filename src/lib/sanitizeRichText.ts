import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { enhanceContentLinks } from "@/utils/seoLinkEnhancer";

marked.setOptions({ gfm: true, breaks: true });

export type RichTextFormat = "html" | "markdown";

/** Guard serverless OOM on pathological CMS payloads (still rare for normal posts). */
const MAX_SANITIZE_INPUT_CHARS = 900_000;
const SANITIZER_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "code",
    "blockquote",
    "hr",
    "br",
    "span",
  ]),
  transformTags: {
    h1: "h2",
  },
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    "*": ["class", "id", "style"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  forbiddenTags: ["link", "meta", "base", "script", "iframe", "object", "embed"],
  allowedStyles: {
    "*": {
      color: [/^.*$/],
      "background-color": [/^.*$/],
      "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      "font-weight": [/^.*$/],
      "font-style": [/^.*$/],
      "text-decoration": [/^.*$/],
    },
  },
};

/**
 * CMS HTML / markdown → sanitized HTML for `dangerouslySetInnerHTML`.
 * Used from Server Components to avoid shipping huge strings through client `useMemo` RSC payloads.
 */
export function sanitizeRichText(
  html: string,
  contentFormat: RichTextFormat = "html",
): string {
  const source = html || "";
  if (source.length > MAX_SANITIZE_INPUT_CHARS) {
    return "<p>This article is too large to render in preview. Please open it in the CMS or shorten the body.</p>";
  }
  try {
    if (contentFormat === "markdown") {
      const raw = marked.parse(source, { async: false }) as string;
      return enhanceContentLinks(sanitizeHtml(raw, SANITIZER_OPTIONS));
    }
    return enhanceContentLinks(sanitizeHtml(source, SANITIZER_OPTIONS));
  } catch {
    return "";
  }
}
