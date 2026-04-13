"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { SitePromoPayload } from "@/lib/site-promo-banner";

function normalizePathname(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function hrefFromPayload(p: SitePromoPayload): string {
  return p.kind === "news" ? `/news/${p.slug}` : `/blogs/${p.slug}`;
}

/**
 * Top promo strip — loaded client-side so the root layout never awaits Supabase or
 * streams a layout `<Suspense>` boundary that can interact badly with dynamic RSC on Vercel.
 */
export default function SitePromoBanner() {
  const pathname = usePathname();
  const [payload, setPayload] = useState<SitePromoPayload | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-promo", { cache: "no-store" });
        const data = (await res.json()) as SitePromoPayload | null;
        if (!cancelled) setPayload(data ?? null);
      } catch {
        if (!cancelled) setPayload(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (payload === undefined) {
    return <div className="h-[44px] shrink-0" aria-hidden />;
  }
  if (!payload) return null;

  const href = hrefFromPayload(payload);
  if (
    pathname &&
    normalizePathname(pathname) === normalizePathname(href)
  ) {
    return null;
  }

  return (
    <a
      href={href}
      id="news-banner"
      className="block bg-brand-dark text-white transition-opacity hover:opacity-95"
    >
      <div className="section-full py-2.5">
        <div className="flex items-center justify-center text-center">
          <span className="mr-2 text-xl" aria-hidden>
            🎉
          </span>
          <span className="text-sm font-medium">{payload.text}</span>
        </div>
      </div>
    </a>
  );
}
