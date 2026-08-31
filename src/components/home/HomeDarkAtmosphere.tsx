import { cn } from "@/lib/utils";

export type HomeDarkGlow =
  | "top"
  | "top-left"
  | "top-right"
  | "left"
  | "right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

const GLOW: Record<HomeDarkGlow, string> = {
  top: "bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,hsl(218_65%_28%/0.35),transparent_70%)]",
  "top-left":
    "bg-[radial-gradient(ellipse_70%_80%_at_0%_0%,hsl(218_65%_28%/0.4),transparent_68%)]",
  "top-right":
    "bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,hsl(218_65%_28%/0.4),transparent_68%)]",
  left: "bg-[radial-gradient(ellipse_55%_90%_at_0%_50%,hsl(218_65%_28%/0.38),transparent_70%)]",
  right:
    "bg-[radial-gradient(ellipse_55%_90%_at_100%_50%,hsl(218_65%_28%/0.38),transparent_70%)]",
  bottom:
    "bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,hsl(218_65%_28%/0.35),transparent_70%)]",
  "bottom-left":
    "bg-[radial-gradient(ellipse_70%_80%_at_0%_100%,hsl(218_65%_28%/0.4),transparent_68%)]",
  "bottom-right":
    "bg-[radial-gradient(ellipse_70%_80%_at_100%_100%,hsl(218_65%_28%/0.4),transparent_68%)]",
};

type HomeDarkAtmosphereProps = {
  /** Where the brand radial sits. Vary per section so dark bands don’t feel cloned. */
  glow?: HomeDarkGlow;
};

/**
 * Navy-section atmosphere: structured grid + brand radial.
 * Sit inside a `relative overflow-hidden` dark surface.
 */
export function HomeDarkAtmosphere({ glow = "top" }: HomeDarkAtmosphereProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-structured-grid opacity-[0.14]"
        aria-hidden
      />
      <div
        className={cn("pointer-events-none absolute inset-0", GLOW[glow])}
        aria-hidden
      />
    </>
  );
}
