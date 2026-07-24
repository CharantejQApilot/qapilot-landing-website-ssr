import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";

type BookDemoLinkButtonProps = {
  className?: string;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
  children?: ReactNode;
};

export function BookDemoLinkButton({
  className,
  size,
  variant,
  children = "Book a Demo",
}: BookDemoLinkButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={BOOK_DEMO_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}
