"use client";

import { cn } from "@/lib/utils";

const NODES: { cx: number; cy: number; r: number; label: string; emphasis?: boolean }[] = [
  { cx: 400, cy: 120, r: 28, label: "Screen A", emphasis: true },
  { cx: 220, cy: 260, r: 22, label: "Flow" },
  { cx: 580, cy: 240, r: 22, label: "Flow" },
  { cx: 320, cy: 380, r: 24, label: "Interaction", emphasis: true },
  { cx: 480, cy: 360, r: 20, label: "State" },
  { cx: 640, cy: 400, r: 20, label: "Edge" },
  { cx: 160, cy: 420, r: 18, label: "Screen B" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [1, 6],
];

/**
 * Stylized graph: screens, flows, and relationships — complements copy in the knowledge graph section.
 */
export function AgenticArchitectureKnowledgeGraphVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] via-muted/20 to-background",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.12),transparent_55%)]" />
      <svg
        viewBox="0 0 800 520"
        className="relative z-[1] h-auto w-full"
        role="img"
        aria-label="Knowledge graph connecting screens, flows, and interactions"
      >
        <defs>
          <linearGradient id="kg-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {EDGES.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}-${i}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="url(#kg-edge)"
              strokeWidth="2"
            />
          );
        })}

        {NODES.map((n, i) => (
          <g key={n.label + i}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r + 6}
              fill="hsl(var(--primary))"
              className={n.emphasis ? "opacity-[0.14]" : "opacity-[0.06]"}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth={n.emphasis ? 2.5 : 1.5}
              className={cn(n.emphasis && "opacity-100")}
            />
            <text
              x={n.cx}
              y={n.cy + 5}
              textAnchor="middle"
              className="fill-foreground text-[11px] font-semibold md:text-[12px]"
              style={{ fontFamily: "inherit" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
