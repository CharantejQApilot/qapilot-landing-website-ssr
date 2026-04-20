import { NextResponse } from "next/server";
import { QAPILOT_MARKETING_SKILL_MD } from "@/lib/agent-readiness/marketing-skill-md";

export const dynamic = "force-static";

export function GET(
  _request: Request,
  context: { params: { segments: string[] } },
) {
  const path = context.params.segments.join("/");
  if (path === "qapilot-marketing/SKILL.md") {
    return new NextResponse(QAPILOT_MARKETING_SKILL_MD, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  return new NextResponse(null, { status: 404 });
}
