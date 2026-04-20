import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/constants";
import { QAPILOT_MARKETING_SKILL_MD } from "@/lib/agent-readiness/marketing-skill-md";

export const dynamic = "force-static";

export function GET() {
  const digest = createHash("sha256")
    .update(QAPILOT_MARKETING_SKILL_MD, "utf8")
    .digest("hex");

  return NextResponse.json(
    {
      $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
      skills: [
        {
          name: "qapilot-marketing",
          type: "skill-md",
          description:
            "Find canonical URLs, documentation links, and public API discovery for the QApilot marketing site.",
          url: `${SITE_BASE_URL}/.well-known/agent-skills/qapilot-marketing/SKILL.md`,
          digest: `sha256:${digest}`,
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
