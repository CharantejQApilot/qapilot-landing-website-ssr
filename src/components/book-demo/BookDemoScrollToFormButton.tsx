"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_FORM_ID } from "@/lib/book-demo";
import { cn } from "@/lib/utils";

type BookDemoScrollToFormButtonProps = {
  className?: string;
  children?: ReactNode;
};

export function BookDemoScrollToFormButton({
  className,
  children = "Book a Demo",
}: BookDemoScrollToFormButtonProps) {
  const scrollToForm = () => {
    document.getElementById(BOOK_DEMO_FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button
      type="button"
      size="lg"
      onClick={scrollToForm}
      className={cn(
        "rounded-xl bg-primary px-8 py-5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 sm:px-10 sm:py-7 sm:text-lg md:text-xl",
        className,
      )}
    >
      {children}
    </Button>
  );
}
