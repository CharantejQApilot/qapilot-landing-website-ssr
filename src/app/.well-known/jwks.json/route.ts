import { NextResponse } from "next/server";

export const dynamic = "force-static";

/** Empty JWKS document for discovery (\`jwks_uri\`) when no keys are published on this origin. */
export function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
