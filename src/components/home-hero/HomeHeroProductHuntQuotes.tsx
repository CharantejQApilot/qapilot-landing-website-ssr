"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  HOME_HERO_PRODUCT_HUNT_QUOTES,
  HOME_HERO_QUOTE_ROTATE_MS,
  PRODUCT_HUNT_REVIEW_COUNT,
  PRODUCT_HUNT_REVIEW_RATING,
  PRODUCT_HUNT_REVIEWS_URL,
} from "@/lib/product-hunt-reviews";
import { cn } from "@/lib/utils";

type HomeHeroProductHuntQuotesProps = {
  /** Pause rotation while slide 1 is off-screen. */
  active?: boolean;
  className?: string;
};

/**
 * One Product Hunt quote at a time in the lower-right of hero slide 1.
 * Rotates periodically. Only the rating line links out to reviews.
 */
export default function HomeHeroProductHuntQuotes({
  active = true,
  className,
}: HomeHeroProductHuntQuotesProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const pausedRef = useRef(false);
  const fadeTimerRef = useRef<number>(0);

  useEffect(() => {
    if (
      !active ||
      HOME_HERO_PRODUCT_HUNT_QUOTES.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setVisible(false);
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % HOME_HERO_PRODUCT_HUNT_QUOTES.length);
        setVisible(true);
      }, 280);
    }, HOME_HERO_QUOTE_ROTATE_MS);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(fadeTimerRef.current);
    };
  }, [active]);

  const quote = HOME_HERO_PRODUCT_HUNT_QUOTES[index];

  return (
    <figure
      className={cn("flex w-full flex-col items-start", className)}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <blockquote
        aria-live="polite"
        className={cn(
          "flex h-[7.75rem] w-full shrink-0 items-center justify-start overflow-hidden",
          "rounded-md border border-border bg-background",
          "px-5 sm:px-6",
        )}
      >
        <p
          className={cn(
            "text-left font-heading text-xl leading-snug tracking-tight text-foreground/85 sm:text-[1.375rem] sm:leading-snug",
            "line-clamp-3",
            "transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0",
          )}
        >
          “{quote}”
        </p>
      </blockquote>
      <figcaption className="mt-3">
        <a
          href={PRODUCT_HUNT_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Product Hunt · {PRODUCT_HUNT_REVIEW_RATING}
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
          <span className="sr-only">
            , {PRODUCT_HUNT_REVIEW_COUNT} reviews (opens in a new tab)
          </span>
        </a>
      </figcaption>
    </figure>
  );
}
