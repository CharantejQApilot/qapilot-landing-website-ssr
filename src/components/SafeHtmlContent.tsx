"use client";

import { useMemo } from "react";
import {
  sanitizeRichText,
  type RichTextFormat,
} from "@/lib/sanitizeRichText";

interface SafeHtmlContentProps {
  html: string;
  className?: string;
  /** Legacy CMS HTML vs Markdown from admin editor. */
  contentFormat?: RichTextFormat;
}

/**
 * Thin client wrapper around {@link sanitizeRichText} for interactive pages.
 * Prefer calling `sanitizeRichText` in a Server Component when the block is static.
 */
export default function SafeHtmlContent({
  html,
  className,
  contentFormat = "html",
}: SafeHtmlContentProps) {
  const sanitized = useMemo(
    () => sanitizeRichText(html, contentFormat),
    [html, contentFormat],
  );

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
