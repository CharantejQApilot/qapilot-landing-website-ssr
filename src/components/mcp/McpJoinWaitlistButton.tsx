"use client";

import { Button } from "@/components/ui/button";
import { MCP_WAITLIST_FORM_ID } from "@/lib/mcp-page";
import { cn } from "@/lib/utils";

export function McpJoinWaitlistButton({
  className,
  children = "Request Access",
}: {
  className?: string;
  children?: string;
}) {
  const scrollToForm = () => {
    document
      .getElementById(MCP_WAITLIST_FORM_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button
      type="button"
      size="lg"
      onClick={scrollToForm}
      className={cn(
        "rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-shadow hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 sm:px-8 sm:py-4 sm:text-lg",
        className,
      )}
    >
      {children}
    </Button>
  );
}
