"use client";

import { useLayoutEffect } from "react";
import { DOCS_URL, SITE_BASE_URL } from "@/lib/constants";

/**
 * WebMCP tool shape (imperative API + compat `provideContext` bundles).
 * @see https://webmachinelearning.github.io/webmcp/
 */
type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: object, client?: unknown) => Promise<unknown>;
};

type ModelContextCompat = {
  registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => void;
  /** Older / compatibility path expected by some discovery tools (batched tools). */
  provideContext?: (opts: { tools: WebMcpTool[] }) => void | (() => void);
  clearContext?: () => void;
};

function getModelContext(): ModelContextCompat | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { modelContext?: ModelContextCompat }).modelContext;
}

function buildTools(): WebMcpTool[] {
  return [
    {
      name: "open_qapilot_docs",
      title: "Open documentation",
      description: "Open QApilot product documentation in a new tab.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      async execute() {
        window.open(DOCS_URL, "_blank", "noopener,noreferrer");
        return { opened: DOCS_URL };
      },
    },
    {
      name: "get_marketing_api_discovery",
      title: "Marketing API discovery",
      description:
        "Return URLs for API catalog (RFC 9727), OpenAPI (service-desc), and agent skills index on the marketing site.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      async execute() {
        return {
          apiCatalog: `${SITE_BASE_URL}/.well-known/api-catalog`,
          openapi: `${SITE_BASE_URL}/openapi.json`,
          agentSkillsIndex: `${SITE_BASE_URL}/.well-known/agent-skills/index.json`,
        };
      },
    },
  ];
}

export default function WebMcpRegister() {
  useLayoutEffect(() => {
    const mc = getModelContext();
    if (!mc) return undefined;

    const tools = buildTools();
    const abort = new AbortController();

    if (typeof mc.provideContext === "function") {
      const maybeTeardown = mc.provideContext({ tools });
      return () => {
        if (typeof maybeTeardown === "function") {
          maybeTeardown();
        } else if (typeof mc.clearContext === "function") {
          mc.clearContext();
        } else {
          mc.provideContext({ tools: [] });
        }
      };
    }

    if (typeof mc.registerTool === "function") {
      for (const tool of tools) {
        mc.registerTool(tool, { signal: abort.signal });
      }
      return () => abort.abort();
    }

    return undefined;
  }, []);

  return null;
}
