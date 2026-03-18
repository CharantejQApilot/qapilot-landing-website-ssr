"use client";

import { useEffect, useState } from "react";
import { enhanceContentLinks } from "@/utils/seoLinkEnhancer";

interface SafeHtmlContentProps {
  html: string;
  className?: string;
}

export default function SafeHtmlContent({ html, className }: SafeHtmlContentProps) {
  const [sanitized, setSanitized] = useState(html);

  useEffect(() => {
    import("dompurify").then((mod) => {
      const DOMPurify = mod.default;
      setSanitized(enhanceContentLinks(DOMPurify.sanitize(html)));
    });
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
