"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import type { SitePromoPayload } from "@/lib/site-promo-banner";

function normalizePathname(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function hrefFromPayload(p: SitePromoPayload): string {
  if (p.kind === "custom") return p.href;
  return p.kind === "news" ? `/news/${p.slug}` : `/blogs/${p.slug}`;
}

/**
 * Top promo strip. Loaded client-side so the root layout never awaits Supabase.
 * Starts at 0 height (no reserved empty slot) so sessions without a promo never CLS.
 * When a promo arrives, the strip expands once. Rarer than the old collapse CLS.
 */
export default function SitePromoBanner() {
  const pathname = usePathname();
  const [payload, setPayload] = useState<SitePromoPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      void (async () => {
        try {
          const res = await fetch("/api/site-promo", { cache: "no-store" });
          const data = (await res.json()) as SitePromoPayload | null;
          if (!cancelled) setPayload(data ?? null);
        } catch {
          if (!cancelled) setPayload(null);
        }
      })();
    };
    /** Defer after first paint so promo fetch does not contend with LCP / first interaction. */
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(run, { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }
    const t = window.setTimeout(run, 1);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!payload) return null;

  const href = hrefFromPayload(payload);
  if (pathname && normalizePathname(pathname) === normalizePathname(href)) {
    return null;
  }

  const opensNewTab = payload.kind === "custom" && payload.external;

  return (
    <a
      href={href}
      id="news-banner"
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      className="block bg-brand-dark text-white transition-opacity hover:opacity-95"
    >
      <div className="section-full py-2.5">
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="text-sm font-medium">{payload.text}</span>
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        </div>
      </div>
    </a>
  );
}
