"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MCP_CLAUDE_CONFIG_JSON,
  MCP_CODEX_CONFIG_JSON,
} from "@/lib/mcp-guide";
import { McpGuideCopyButton } from "./McpGuideCopyButton";
import { GuideInlineCode, HlKey, HlStr } from "./McpGuideCodeBlock";
import { GuideP } from "./McpGuidePrimitives";

function JsonFrame({
  file,
  copyText,
  children,
  annotation,
}: {
  file: string;
  copyText: string;
  children: ReactNode;
  annotation?: React.ReactNode;
}) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-semibold text-primary">
          {file}
        </span>
        <McpGuideCopyButton text={copyText} />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground">
        {children}
      </pre>
      {annotation}
    </div>
  );
}

function ClaudeCursorJson() {
  return (
    <>
      {"{\n  "}
      <HlKey>&quot;mcpServers&quot;</HlKey>
      {": {\n    "}
      <HlKey>&quot;qapilot-mobile-mcp&quot;</HlKey>
      {": {\n      "}
      <HlKey>&quot;command&quot;</HlKey>
      {": "}
      <HlStr>&quot;npx&quot;</HlStr>
      {",\n      "}
      <HlKey>&quot;args&quot;</HlKey>
      {": ["}
      <HlStr>&quot;-y&quot;</HlStr>
      {", "}
      <HlStr>&quot;qapilot-mcp&quot;</HlStr>
      {", "}
      <HlStr>&quot;--stdio&quot;</HlStr>
      {"],\n      "}
      <HlKey>&quot;env&quot;</HlKey>
      {": {}\n    }\n  }\n}"}
    </>
  );
}

export function McpGuideConfigTabs() {
  return (
    <Tabs defaultValue="claude" className="w-full">
      <TabsList className="mb-4 h-auto w-fit rounded-lg border border-border bg-card p-0">
        <TabsTrigger
          value="claude"
          className="rounded-none border-r border-border px-5 py-2 text-[13px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          Claude Desktop
        </TabsTrigger>
        <TabsTrigger
          value="cursor"
          className="rounded-none border-r border-border px-5 py-2 text-[13px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          Cursor
        </TabsTrigger>
        <TabsTrigger
          value="codex"
          className="rounded-none px-5 py-2 text-[13px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          OpenAI Codex
        </TabsTrigger>
      </TabsList>

      <TabsContent value="claude" className="mt-0">
        <GuideP>
          Open <strong className="font-semibold text-foreground">Claude → Settings → Developer → Edit Config</strong>{" "}
          and add the block below inside your existing{" "}
          <GuideInlineCode>mcpServers</GuideInlineCode> object:
        </GuideP>
        <JsonFrame
          file="claude_desktop_config.json"
          copyText={MCP_CLAUDE_CONFIG_JSON}
          annotation={
            <div className="border-t border-border px-4 py-3">
              <p className="font-mono text-[11px] font-semibold text-primary">
                command + args
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Runs the CLI via npx — no separate install needed
              </p>
            </div>
          }
        >
          <ClaudeCursorJson />
        </JsonFrame>
      </TabsContent>

      <TabsContent value="cursor" className="mt-0">
        <GuideP>
          Go to{" "}
          <strong className="font-semibold text-foreground">
            Cursor → Settings → Features → MCP Servers → Add new
          </strong>
          , or edit <GuideInlineCode>~/.cursor/mcp.json</GuideInlineCode>{" "}
          directly:
        </GuideP>
        <JsonFrame file="~/.cursor/mcp.json" copyText={MCP_CLAUDE_CONFIG_JSON}>
          <ClaudeCursorJson />
        </JsonFrame>
      </TabsContent>

      <TabsContent value="codex" className="mt-0">
        <GuideP>
          Add to your <GuideInlineCode>codex.json</GuideInlineCode>{" "}
          configuration:
        </GuideP>
        <JsonFrame file="codex.json" copyText={MCP_CODEX_CONFIG_JSON}>
          {"{\n  "}
          <HlKey>&quot;mcpServers&quot;</HlKey>
          {": [\n    {\n      "}
          <HlKey>&quot;name&quot;</HlKey>
          {": "}
          <HlStr>&quot;qapilot-mobile-mcp&quot;</HlStr>
          {",\n      "}
          <HlKey>&quot;command&quot;</HlKey>
          {": "}
          <HlStr>&quot;npx&quot;</HlStr>
          {",\n      "}
          <HlKey>&quot;args&quot;</HlKey>
          {": ["}
          <HlStr>&quot;-y&quot;</HlStr>
          {", "}
          <HlStr>&quot;qapilot-mcp&quot;</HlStr>
          {", "}
          <HlStr>&quot;--stdio&quot;</HlStr>
          {"],\n      "}
          <HlKey>&quot;env&quot;</HlKey>
          {": {}\n    }\n  ]\n}"}
        </JsonFrame>
      </TabsContent>
    </Tabs>
  );
}
