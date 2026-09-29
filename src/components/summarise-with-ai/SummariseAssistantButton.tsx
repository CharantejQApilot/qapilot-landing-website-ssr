"use client";

import type { ReactNode } from "react";

type SummariseAssistantButtonProps = {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
};

/** Opens the assistant URL on click so crawlers do not fetch bot-blocked hosts. */
export function SummariseAssistantButton({
  href,
  label,
  className,
  children,
}: SummariseAssistantButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={() => {
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {children}
    </button>
  );
}
