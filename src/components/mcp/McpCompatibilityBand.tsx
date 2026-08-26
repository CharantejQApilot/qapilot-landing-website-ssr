import type { ReactNode } from "react";
import { MCP_AGENTS, MCP_STACKS } from "@/lib/mcp-page";

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold tracking-tight text-foreground sm:text-sm">
      {children}
    </span>
  );
}

export function McpCompatibilityBand() {
  return (
    <section
      className="section-edge w-full border-y border-border/60 bg-muted/20"
      aria-label="Supported agents and mobile stacks"
    >
      <div className="section-full py-6 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-12 xl:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              Agents
            </span>
            <div className="flex flex-wrap gap-2">
              {MCP_AGENTS.filter((a) => a !== "Other").map((agent) => (
                <Pill key={agent}>{agent}</Pill>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
              Stacks
            </span>
            <div className="flex flex-wrap gap-2">
              {MCP_STACKS.map((stack) => (
                <Pill key={stack}>{stack}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
