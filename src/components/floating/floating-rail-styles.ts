import { cn } from "@/lib/utils";

const floatingRailShellBase = cn(
  "fixed z-[1000] flex flex-col gap-1.5 p-1.5 shadow-xl backdrop-blur-md",
  "border border-white/10 bg-[hsl(var(--navy))]/95",
  "max-sm:gap-1 max-sm:p-1",
);

/** Left edge rail. Rounds only the inward (right) side. */
export const floatingRailShellLeftClass = cn(
  floatingRailShellBase,
  "left-0 rounded-r-xl border-l-0",
);

export const floatingRailButtonClass = cn(
  "flex h-10 w-10 items-center justify-center rounded-lg text-white/55 transition-colors",
  "hover:bg-white/10 hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--navy))]",
  "max-sm:h-9 max-sm:w-9",
);
