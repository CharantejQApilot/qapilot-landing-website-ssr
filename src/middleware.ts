import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return accept
    .split(",")
    .map((part) => part.trim().split(";")[0]?.trim() ?? "")
    .includes("text/markdown");
}

export async function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname !== "/") {
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
  matcher: ["/"],
};
