"use client";

import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { cn } from "@/lib/utils";

type BookDemoCtaButtonProps = {
  className?: string;
};

export default function BookDemoCtaButton({ className }: BookDemoCtaButtonProps) {
  const { openForm } = useHubSpotForm();

  return (
    <Button
      type="button"
      onClick={() => openForm()}
      size="lg"
      className={cn(
        "rounded-xl bg-primary px-8 py-5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 sm:px-10 sm:py-7 sm:text-lg",
        className,
      )}
    >
      Book a Demo
    </Button>
  );
}
