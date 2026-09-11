import type { ReactNode } from "react";
import { McpGuideCopyButton } from "./McpGuideCopyButton";
import { cn } from "@/lib/utils";

export function McpGuideCodeBlock({
  lang,
  copyText,
  copyLabel,
  children,
}: {
  lang: string;
  copyText: string;
  copyLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {lang}
        </span>
        <McpGuideCopyButton text={copyText} label={copyLabel} />
      </div>
      <pre
        className={cn(
          "overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-foreground",
        )}
      >
        {children}
      </pre>
    </div>
  );
}

export function GuideInlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-primary-light px-1.5 py-0.5 font-mono text-[0.8125rem] text-primary">
      {children}
    </code>
  );
}

export function HlCmd({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-primary">{children}</span>;
}

export function HlFlag({ children }: { children: ReactNode }) {
  return <span className="text-orange">{children}</span>;
}

export function HlNum({ children }: { children: ReactNode }) {
  return <span className="text-violet-600">{children}</span>;
}

export function HlComment({ children }: { children: ReactNode }) {
  return <span className="italic text-muted-foreground">{children}</span>;
}

export function HlKey({ children }: { children: ReactNode }) {
  return <span className="font-medium text-primary">{children}</span>;
}

export function HlStr({ children }: { children: ReactNode }) {
  return <span className="text-emerald-700">{children}</span>;
}
