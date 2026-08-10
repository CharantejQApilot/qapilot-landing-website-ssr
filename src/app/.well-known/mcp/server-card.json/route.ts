import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/** MCP Server Card (SEP-1649). Transport \`endpoint\` for Streamable HTTP. */
export function GET() {
  const endpoint = `${SITE_BASE_URL}/mcp`;
  return NextResponse.json(
    {
      serverInfo: {
        name: "QApilot Marketing",
        version: "1.0.0",
      },
      endpoint,
      transport: "streamable-http",
      capabilities: {
        tools: true,
        resources: false,
        prompts: false,
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
