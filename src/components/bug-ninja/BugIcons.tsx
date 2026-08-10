import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  variant?: "standard" | "fast" | "rare" | "regression";
};

/** Bright strokes for contrast on the dark arena. */
const VARIANT_STROKE: Record<NonNullable<IconProps["variant"]>, string> = {
  standard: "hsl(210 100% 92%)",
  fast: "hsl(200 100% 80%)",
  rare: "hsl(195 100% 72%)",
  regression: "hsl(220 90% 85%)",
};

const VARIANT_FILL: Record<NonNullable<IconProps["variant"]>, string> = {
  standard: "hsl(210 100% 92% / 0.18)",
  fast: "hsl(200 100% 80% / 0.22)",
  rare: "hsl(195 100% 72% / 0.28)",
  regression: "hsl(220 90% 85% / 0.2)",
};

/** Compact SVG bug family — bright on dark navy. */
export function BugIcon({ className, variant = "standard" }: IconProps) {
  const stroke = VARIANT_STROKE[variant];
  const fill = VARIANT_FILL[variant];

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <ellipse
        cx="16"
        cy="17"
        rx="7"
        ry="8"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <circle
        cx="16"
        cy="8.5"
        r="3.2"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
      />
      <path
        d="M14 6.2 L11.5 3.2 M18 6.2 L20.5 3.2"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14 L6 12.5 M9.2 17.5 L5.5 18 M9.5 21 L6.5 23.5 M22.5 14 L26 12.5 M22.8 17.5 L26.5 18 M22.5 21 L25.5 23.5"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        className={
          variant === "fast"
            ? "origin-center animate-[bug-leg-twitch_0.35s_ease-in-out_infinite]"
            : undefined
        }
      />
      {(variant === "regression" || variant === "rare") && (
        <path
          d="M12 15h3M17 19h4M13 22h2"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.85}
        />
      )}
    </svg>
  );
}

/** Pass / check — bright mint so it reads clearly vs bugs. */
export function PassIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke="hsl(152 70% 62%)"
        strokeWidth="1.5"
        fill="hsl(152 70% 62% / 0.18)"
      />
      <path
        d="M10.5 16.5 L14.2 20 L21.5 12.5"
        stroke="hsl(152 80% 70%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
