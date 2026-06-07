import { buildRobotsTxt } from "@/lib/robots-txt";

export const dynamic = "force-static";

export function GET() {
  const text = buildRobotsTxt();
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
