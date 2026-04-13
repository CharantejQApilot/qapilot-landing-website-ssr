"use client";

import { usePathname } from "next/navigation";

function normalizePathname(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

type NewsBannerPromoProps = {
  href: string;
  text: string;
};

/**
 * Hides the promo when it points at the current URL (e.g. `is_banner` on the post you are
 * reading). A self-targeting layout link has been observed to break the App Router RSC
 * response on Vercel (500 + `__next_error__`) while metadata still renders. Uses `<a>`
 * instead of `next/link` so the banner never participates in RSC prefetch.
 */
export function NewsBannerPromo({ href, text }: NewsBannerPromoProps) {
  const pathname = usePathname();
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
          <span className="text-sm font-medium">{text}</span>
        </div>
      </div>
    </a>
  );
}
