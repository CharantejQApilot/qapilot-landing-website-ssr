import { NextResponse } from "next/server";
import { DOCS_URL, SITE_BASE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * RFC 9727 API catalog (application/linkset+json).
 * @see https://www.rfc-editor.org/rfc/rfc9727#appendix-A
 */
export function GET() {
  const payload = {
    linkset: [
      {
        anchor: `${SITE_BASE_URL}/api`,
        item: [
          {
            href: `${SITE_BASE_URL}/openapi.json`,
            rel: "service-desc",
            type: "application/openapi+json",
          },
          {
            href: `${DOCS_URL}/`,
            rel: "service-doc",
          },
          {
            href: `${SITE_BASE_URL}/api/health`,
            rel: "status",
          },
        ],
      },
    ],
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
