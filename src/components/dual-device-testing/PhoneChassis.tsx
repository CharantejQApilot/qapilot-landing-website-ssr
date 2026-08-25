import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PhoneChassisSize = "default" | "compact" | "home" | "feature";

type PhoneChassisProps = {
  size?: PhoneChassisSize;
  /**
   * `fill` stretches to the parent (dual-device pair).
   * `intrinsic` uses a fixed height so a single phone keeps the 9/20.5 ratio.
   */
  layout?: "fill" | "intrinsic";
  className?: string;
  screenClassName?: string;
  homeIndicatorClassName?: string;
  children: ReactNode;
};

/**
 * Tall modern phone chassis used by Dual Device Testing (home + product heroes).
 */
export function PhoneChassis({
  size = "default",
  layout = "fill",
  className,
  screenClassName,
  homeIndicatorClassName,
  children,
}: PhoneChassisProps) {
  const isSmall = size === "compact" || size === "home";
  const isFeature = size === "feature";

  return (
    <div
      className={cn(
        "relative",
        layout === "fill" && "w-full",
        layout === "fill" && size === "compact" && "aspect-[9/19.5] max-h-[260px]",
        layout === "fill" && size === "home" && "aspect-[9/19.5] max-h-[250px] sm:max-h-[280px]",
        layout === "fill" &&
          size === "default" &&
          "aspect-[9/20.5] max-h-[380px] sm:max-h-[420px] md:max-h-[460px] lg:max-h-[480px]",
        layout === "fill" &&
          isFeature &&
          "aspect-[9/20.5] max-h-[520px] sm:max-h-[560px] md:max-h-[600px] lg:max-h-[640px]",
        layout === "intrinsic" && size === "compact" && "aspect-[9/19.5] h-[260px] w-auto",
        layout === "intrinsic" &&
          size === "home" &&
          "aspect-[9/19.5] h-[250px] w-auto sm:h-[280px]",
        layout === "intrinsic" &&
          size === "default" &&
          "aspect-[9/20.5] h-[380px] w-auto sm:h-[420px] md:h-[460px] lg:h-[480px]",
        layout === "intrinsic" &&
          isFeature &&
          "aspect-[9/20.5] h-[420px] w-auto sm:h-[500px] md:h-[560px] lg:h-[600px] xl:h-[640px]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-0 z-10 -translate-x-[1px] rounded-l-full bg-gradient-to-b from-neutral-500 to-neutral-800",
          isSmall
            ? "top-[16%] h-3 w-[2px]"
            : isFeature
              ? "top-[15%] h-4 w-[2.5px] sm:h-5"
              : "top-[15%] h-3.5 w-[2.5px] sm:h-4",
        )}
      />
      <span
        className={cn(
          "absolute left-0 z-10 -translate-x-[1px] rounded-l-full bg-gradient-to-b from-neutral-500 to-neutral-800",
          isSmall
            ? "top-[24%] h-6 w-[2px]"
            : isFeature
              ? "top-[22%] h-9 w-[2.5px] sm:h-10"
              : "top-[22%] h-8 w-[2.5px] sm:h-9",
        )}
      />
      <span
        className={cn(
          "absolute left-0 z-10 -translate-x-[1px] rounded-l-full bg-gradient-to-b from-neutral-500 to-neutral-800",
          isSmall
            ? "top-[38%] h-6 w-[2px]"
            : isFeature
              ? "top-[36%] h-9 w-[2.5px] sm:h-10"
              : "top-[36%] h-8 w-[2.5px] sm:h-9",
        )}
      />
      <span
        className={cn(
          "absolute right-0 z-10 translate-x-[1px] rounded-r-full bg-gradient-to-b from-neutral-500 to-neutral-800",
          isSmall
            ? "top-[28%] h-9 w-[2px]"
            : isFeature
              ? "top-[26%] h-12 w-[2.5px] sm:h-14"
              : "top-[26%] h-11 w-[2.5px] sm:h-12",
        )}
      />

      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden",
          "bg-[linear-gradient(160deg,#2a2a2e_0%,#0c0c0e_42%,#16161a_100%)]",
          "shadow-[0_28px_50px_-18px_rgba(15,23,42,0.45),0_12px_24px_-16px_rgba(15,23,42,0.3)]",
          "ring-1 ring-white/10",
          isSmall
            ? "rounded-[1.55rem] p-[4px]"
            : isFeature
              ? "rounded-[2rem] p-[6px] sm:rounded-[2.35rem] sm:p-[7px]"
              : "rounded-[1.85rem] p-[5px] sm:rounded-[2.1rem] sm:p-[6px]",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
          aria-hidden
        />

        <div
          className={cn(
            "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f6f7f9]",
            isSmall
              ? "rounded-[1.3rem]"
              : isFeature
                ? "rounded-[1.7rem] sm:rounded-[1.95rem]"
                : "rounded-[1.55rem] sm:rounded-[1.75rem]",
            screenClassName,
          )}
        >
          <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-[7px] sm:pt-2">
            <div
              className={cn(
                "relative rounded-full bg-neutral-950 shadow-inner shadow-black/40",
                isSmall
                  ? "h-3.5 w-[3.6rem]"
                  : isFeature
                    ? "h-[1.15rem] w-[4.75rem] sm:h-5 sm:w-[5.25rem]"
                    : "h-4 w-[4.25rem] sm:h-[1.15rem] sm:w-[4.75rem]",
              )}
            >
              <span className="absolute right-[22%] top-1/2 size-1 -translate-y-1/2 rounded-full bg-neutral-800 ring-1 ring-neutral-700/80 sm:size-1.5" />
            </div>
          </div>

          {children}

          <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center sm:bottom-2">
            <div
              className={cn(
                "rounded-full bg-foreground/20",
                isSmall
                  ? "h-0.5 w-11"
                  : isFeature
                    ? "h-1 w-[4.5rem] sm:w-20"
                    : "h-1 w-16 sm:w-[4.5rem]",
                homeIndicatorClassName,
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
