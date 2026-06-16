import type { ComponentProps } from "react";
import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
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
        "rounded-xl bg-primary px-8 py-5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 sm:px-10 sm:py-7 sm:text-lg md:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl",
        className,
      )}
    >
      {children}
    </BookDemoLinkButton>
  );
}
