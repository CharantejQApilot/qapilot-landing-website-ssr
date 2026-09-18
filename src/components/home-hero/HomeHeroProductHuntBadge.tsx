import {
  PRODUCT_HUNT_TOP_POST_BADGE,
  type ProductHuntTopPostBadge,
} from "@/lib/product-hunt-badge";
import { cn } from "@/lib/utils";

type ProductHuntTopPostBadgeProps = {
  align?: "center" | "start";
  className?: string;
  badge?: ProductHuntTopPostBadge;
};

/**
 * Product Hunt top-post badge.
 * In-flow only so it is never clipped by overflow or flex vertical centering.
 */
export default function HomeHeroProductHuntBadge({
  align = "center",
  className,
  badge = PRODUCT_HUNT_TOP_POST_BADGE,
}: ProductHuntTopPostBadgeProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 shrink-0",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <a
        href={badge.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex max-w-full transition-opacity hover:opacity-90",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted PH badge; keep H1 as LCP */}
        <img
          alt={badge.imageAlt}
          width={badge.width}
          height={badge.height}
          src={badge.imageSrc}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          className={cn(
            "block h-auto w-full max-w-full object-contain",
            align === "start"
              ? "max-w-[min(200px,100%)]"
              : "max-w-[min(250px,100%)]",
          )}
        />
      </a>
    </div>
  );
}
