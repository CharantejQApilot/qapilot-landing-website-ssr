import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/routes";

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
      <Link href={PATHS.BOOK_DEMO}>{children}</Link>
    </Button>
  );
}
