import { PRODUCT_HUNT_TOP_POST_BADGE } from "@/lib/product-hunt-badge";
import { cn } from "@/lib/utils";

type ProductHuntTopPostBadgeProps = {
  align?: "center" | "start";
  className?: string;
};

/**
 * Product Hunt #2 Product of the Day badge.
 * In-flow only — lives in a dedicated hero top band so it is never clipped by
 * overflow or flex vertical centering.
 */
export default function HomeHeroProductHuntBadge({
  align = "center",
  className,
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
        href={PRODUCT_HUNT_TOP_POST_BADGE.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex max-w-full transition-opacity hover:opacity-90",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Product Hunt embed widget */}
        <img
          alt={PRODUCT_HUNT_TOP_POST_BADGE.imageAlt}
          width={PRODUCT_HUNT_TOP_POST_BADGE.width}
          height={PRODUCT_HUNT_TOP_POST_BADGE.height}
          src={PRODUCT_HUNT_TOP_POST_BADGE.imageSrc}
          className={cn(
            "block h-auto w-full max-w-full object-contain",
            align === "start" ? "max-w-[min(200px,100%)]" : "max-w-[min(250px,100%)]",
          )}
        />
      </a>
    </div>
  );
}
