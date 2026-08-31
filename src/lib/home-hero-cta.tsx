import Link from "next/link";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Fixed box metrics for home hero CTAs. Padding-based sizing caused height drift between buttons.
 */
export const homeHeroCtaBoxClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold leading-none",
  "h-12 min-h-12 px-7 text-base",
  "sm:h-14 sm:min-h-14 sm:px-9",
  "lg:text-lg",
  "2xl:px-10",
);

const homeHeroCtaPrimaryClass = cn(
  "border-0 bg-primary text-primary-foreground shadow-none transition-colors",
  "hover:bg-primary/90",
);

const homeHeroCtaInverseClass = cn(
  "border-0 bg-background text-primary transition-all",
  "shadow-[inset_0_0_0_2px_hsl(var(--primary)),0_4px_14px_-2px_hsl(var(--primary)/0.12)]",
  "hover:bg-primary/10 hover:shadow-[inset_0_0_0_2px_hsl(var(--primary)),0_8px_22px_-4px_hsl(var(--primary)/0.22)]",
);

type HomeHeroCtaProps = {
  href: string;
  variant: "primary" | "inverse";
  children: ReactNode;
  /** Open in a new tab (e.g. external calendar). */
  external?: boolean;
};

/** Matched-size hero CTA link. Primary Book a Demo (inverse kept for other surfaces). */
export function HomeHeroCta({
  href,
  variant,
  children,
  external = false,
}: HomeHeroCtaProps) {
  const className = cn(
    buttonVariants({ variant: "default" }),
    homeHeroCtaBoxClass,
    variant === "primary" ? homeHeroCtaPrimaryClass : homeHeroCtaInverseClass,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
