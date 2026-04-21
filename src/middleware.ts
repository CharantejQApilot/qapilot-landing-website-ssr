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
 * Link-preview / social crawlers that should not run the Next.js RSC stack.
 * Intentionally excludes general search crawlers (e.g. Googlebot) so SEO HTML stays normal.
 */
const SOCIAL_PREVIEW_UA =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|SkypeUriPreview|Pinterest|vkShare|Embedly|Quora Link Preview|redditbot/i;

function isSocialPreviewUserAgent(ua: string | null): boolean {
  if (!ua) return false;
  return SOCIAL_PREVIEW_UA.test(ua);
}

async function fetchPrerenderMetaHtml(pathname: string): Promise<string | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) return null;
  const path = pathname.replace(/\/+$/, "") || "/";
  const url = `${base.replace(/\/+$/, "")}/functions/v1/prerender-meta?path=${encodeURIComponent(path)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return await res.text();
}

export async function middleware(request: NextRequest) {
  /** Link-preview crawlers may use HEAD; treat like GET for prerender + avoid accidental 500 fallthrough. */
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  /** Social / chat link expanders: serve OG HTML from Supabase `prerender-meta` (same idea as blogs). */
  if (
    isSocialPreviewUserAgent(request.headers.get("user-agent")) &&
    !request.headers.has("RSC") &&
    !request.headers.has("Next-Router-State-Tree")
  ) {
    try {
      const html = await fetchPrerenderMetaHtml(pathname);
      if (html) {
        return new NextResponse(html, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        });
      }
    } catch {
      // Fall through to Next (e.g. function not deployed or network error).
    }
  }

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
