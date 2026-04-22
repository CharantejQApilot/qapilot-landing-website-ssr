import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return accept
    .split(",")
    .map((part) => part.trim().split(";")[0]?.trim() ?? "")
    .includes("text/markdown");
}

/**
 * Previously this middleware short-circuited social-preview crawlers
 * (LinkedInBot / facebookexternalhit / Twitterbot / etc.) to a Supabase
 * `prerender-meta` edge function. That existed as a defensive workaround
 * back when serverless RSC cold starts were occasionally 500-ing on
 * `/blogs/[slug]`, `/case-studies/[slug]`, `/news/[slug]`.
 *
 * Those routes are now hardened with `generateStaticParams` (build-time
 * prerender), `revalidate = 120` (ISR), and `generateMetadata` wrapped in
 * try/catch. The Next.js metadata pipeline produces the canonical OG /
 * Twitter tags for every article — including custom CMS images, titles,
 * descriptions and `article:published_time`.
 *
 * The Supabase fallback was actively *wrong* whenever the deployed edge
 * function fell behind this repo (e.g. case studies looked like the generic
 * QApilot website preview because the deployed prerender-meta predated the
 * `/case-studies/:slug` handler). Crawlers were getting stale metadata even
 * though Next.js was rendering the right thing.
 *
 * We now let Next.js answer crawler requests directly. Source-of-truth lives
 * in each route's `generateMetadata`, which can never silently drift.
 */
export async function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (pathname !== "/") {
    return NextResponse.next();
  }
  /** Let React Server Components / router internals through (not public markdown). */
  if (request.headers.has("RSC") || request.headers.has("Next-Router-State-Tree")) {
    return NextResponse.next();
  }
  if (!wantsMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const { getHomePageMarkdown } = await import("@/lib/agent-readiness/home-markdown");
  const body = getHomePageMarkdown();
  const approxTokens = Math.ceil(body.length / 4);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(approxTokens),
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!api/|_next/|favicon\\.ico|\\.well-known/|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|avif|woff2?|xml|json|txt)$).*)",
  ],
};
