import { cn } from "@/lib/utils";

type HomeSeamProps = {
  /** Dark surfaces use a faint white rule. */
  invert?: boolean;
  className?: string;
};

/**
 * Full-bleed 1px hairline with `+` marks at the content-column edges.
 * Sit this at the top of a `relative` section. Padding matches `.section-full`.
 */
export function HomeSeam({ invert = false, className }: HomeSeamProps) {
  const mark = invert ? "text-white/25" : "text-[hsl(var(--home-cross))]";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-[2]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "h-px w-full",
          invert ? "bg-white/10" : "bg-[hsl(var(--home-hairline))]",
        )}
      />
      <span
        className={cn(
          "absolute left-4 top-0 -translate-x-1/2 -translate-y-1/2 text-[11px] leading-none sm:left-6 md:left-12 lg:left-16 xl:left-20 2xl:left-28",
          mark,
        )}
      >
        +
      </span>
      <span
        className={cn(
          "absolute right-4 top-0 translate-x-1/2 -translate-y-1/2 text-[11px] leading-none sm:right-6 md:right-12 lg:right-16 xl:right-20 2xl:right-28",
          mark,
        )}
      >
        +
      </span>
    </div>
  );
}
