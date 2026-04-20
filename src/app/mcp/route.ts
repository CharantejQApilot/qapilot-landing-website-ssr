import { NextResponse } from "next/server";

/**
 * Transport URL advertised in \`/.well-known/mcp/server-card.json\`.
 * Full MCP Streamable HTTP is not run on the marketing origin; this route reserves the path.
 */
export function GET() {
  return NextResponse.json(
    {
      message:
        "MCP Streamable HTTP is not deployed on this origin. See /.well-known/mcp/server-card.json for discovery metadata.",
    },
    { status: 200 },
  );
}

export function POST() {
  return NextResponse.json(
    { error: "MCP Streamable HTTP is not implemented on the marketing site." },
    { status: 501 },
  );
}
