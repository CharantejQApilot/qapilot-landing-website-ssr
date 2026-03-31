"use client";

import { useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { enhanceContentLinks } from "@/utils/seoLinkEnhancer";

marked.setOptions({ gfm: true, breaks: true });

interface SafeHtmlContentProps {
  html: string;
  className?: string;
  /** Legacy CMS HTML vs Markdown from admin editor. */
  contentFormat?: "html" | "markdown";
}

/**
 * Sanitizes on the server (RSC pass) and client with the same engine so SSR HTML
 * matches hydration and TipTap/CMS HTML is not briefly shown then cleared.
 */
export default function SafeHtmlContent({
  html,
  className,
  contentFormat = "html",
}: SafeHtmlContentProps) {
  const sanitized = useMemo(() => {
    const source = html || "";
    if (contentFormat === "markdown") {
      const raw = marked.parse(source, { async: false }) as string;
      return enhanceContentLinks(DOMPurify.sanitize(raw));
    }
    return enhanceContentLinks(DOMPurify.sanitize(source));
  }, [html, contentFormat]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
