"use client";

import { useEffect } from "react";
import { DOCS_URL, SITE_BASE_URL } from "@/lib/constants";

type RegisterToolDef = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: unknown, options: { signal: AbortSignal }) => Promise<unknown>;
};

type ModelContextApi = {
  registerTool: (def: RegisterToolDef) => () => void;
};

function getModelContext(): ModelContextApi | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { modelContext?: ModelContextApi }).modelContext;
}

export default function WebMcpRegister() {
  useEffect(() => {
    const mc = getModelContext();
    if (!mc?.registerTool) return undefined;

    const unreg: (() => void)[] = [];

    unreg.push(
      mc.registerTool({
        name: "open_qapilot_docs",
        description: "Open QApilot product documentation in a new tab.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          window.open(DOCS_URL, "_blank", "noopener,noreferrer");
          return { opened: DOCS_URL };
        },
      }),
    );

    unreg.push(
      mc.registerTool({
        name: "get_marketing_api_discovery",
        description:
          "Return URLs for API catalog (RFC 9727), OpenAPI (service-desc), and agent skills index on the marketing site.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => ({
          apiCatalog: `${SITE_BASE_URL}/.well-known/api-catalog`,
          openapi: `${SITE_BASE_URL}/openapi.json`,
          agentSkillsIndex: `${SITE_BASE_URL}/.well-known/agent-skills/index.json`,
        }),
      }),
    );

    return () => {
      for (const u of unreg) u();
    };
  }, []);

  return null;
}
