import type { ComponentProps } from "react";
import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
import { homeHeroCtaBoxClass } from "@/lib/home-hero-cta";
import { cn } from "@/lib/utils";

type BookDemoCtaButtonProps = {
  className?: string;
  size?: ComponentProps<typeof BookDemoLinkButton>["size"];
  children?: ComponentProps<typeof BookDemoLinkButton>["children"];
};

export default function BookDemoCtaButton({
  className,
  size = "lg",
  children = "Book a Demo",
}: BookDemoCtaButtonProps) {
  return (
    <BookDemoLinkButton
      size={size}
      className={cn(
        homeHeroCtaBoxClass,
        "border-0 bg-primary text-primary-foreground shadow-none hover:bg-primary/90",
        className,
      )}
    >
      {children}
    </BookDemoLinkButton>
  );
}
