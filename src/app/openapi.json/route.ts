import { NextResponse } from "next/server";
import { getPublicOpenApiDocument } from "@/lib/agent-readiness/public-openapi";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getPublicOpenApiDocument(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
