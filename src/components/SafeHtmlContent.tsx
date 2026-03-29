"use client";

import { useMemo } from "react";
import DOMPurify from "isomorphic-dompurify";
import { enhanceContentLinks } from "@/utils/seoLinkEnhancer";

interface SafeHtmlContentProps {
  html: string;
  className?: string;
}

/**
 * Sanitizes on the server (RSC pass) and client with the same engine so SSR HTML
 * matches hydration and TipTap/CMS HTML is not briefly shown then cleared.
 */
export default function SafeHtmlContent({ html, className }: SafeHtmlContentProps) {
  const sanitized = useMemo(
    () => enhanceContentLinks(DOMPurify.sanitize(html || "")),
    [html]
  );

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
