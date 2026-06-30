import { PRODUCT_HUNT_TOP_POST_BADGE } from "@/lib/product-hunt-badge";
import { cn } from "@/lib/utils";

type ProductHuntTopPostBadgeProps = {
  /** Badge sits in space above a relatively positioned headline block. */
  align?: "center" | "start";
  className?: string;
};

/**
 * Product Hunt #2 Product of the Day badge.
 * In-flow on mobile (avoids clipping under `overflow-x-hidden` heroes); floats above
 * the headline from `sm+` without shifting the headline block.
 */
export default function HomeHeroProductHuntBadge({
  align = "center",
  className,
}: ProductHuntTopPostBadgeProps) {
  return (
    <div
      className={cn(
        "mb-3 flex w-full min-w-0 sm:mb-0",
        align === "center" ? "justify-center" : "justify-start",
        "max-sm:static max-sm:translate-x-0",
        "sm:absolute sm:bottom-full sm:mb-4",
        align === "center"
          ? "sm:left-1/2 sm:-translate-x-1/2 sm:justify-center"
          : "sm:left-0 sm:justify-start",
        className,
      )}
    >
      <a
        href={PRODUCT_HUNT_TOP_POST_BADGE.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full transition-opacity hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Product Hunt embed widget */}
        <img
          alt={PRODUCT_HUNT_TOP_POST_BADGE.imageAlt}
          width={PRODUCT_HUNT_TOP_POST_BADGE.width}
          height={PRODUCT_HUNT_TOP_POST_BADGE.height}
          src={PRODUCT_HUNT_TOP_POST_BADGE.imageSrc}
          className={cn(
            "h-auto max-w-full",
            align === "start"
              ? "w-[min(200px,58vw)] sm:w-[min(200px,55vw)]"
              : "w-[min(220px,58vw)] sm:w-[min(250px,70vw)]",
          )}
        />
      </a>
    </div>
  );
}
