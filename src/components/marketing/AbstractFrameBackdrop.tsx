import { cn } from "@/lib/utils";

type AbstractFrameBackdropProps = {
 /** Softer wash for pale, full-width UI shots */
 scrim?: "default" | "light";
 /** Slow drift on the pattern layer (no image fetch) */
 animate?: boolean;
 className?: string;
};

/**
 * CSS-only atmosphere behind product frames / Core Advantage media. 
 * soft primary wash, diagonal grid, and dots (replaces scenic photos).
 */
export function AbstractFrameBackdrop({
 scrim = "default",
 animate = false,
 className,
}: AbstractFrameBackdropProps) {
 const isLight = scrim === "light";

 return (
 <div
 className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background", className)}
 aria-hidden
 >
 <div className="absolute inset-0 overflow-hidden">
 <div
 className={cn(
 "absolute inset-[-10%]",
 animate && "motion-safe:animate-scenic-ken-burns",
 )}
 >
 <div className="absolute inset-0 bg-scenic-abstract" />
 </div>
 </div>

 <div
 className={
 isLight
 ? "absolute inset-0 bg-gradient-to-b from-background/[0.02] via-transparent to-background/22"
 : "absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/40"
 }
 />
 <div
 className={
 isLight
 ? "absolute inset-0 bg-gradient-to-r from-background/[0.04] via-transparent to-background/[0.04]"
 : "absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10"
 }
 />
 <div
 className={isLight ? "absolute inset-0 bg-primary/[0.01]" : "absolute inset-0 bg-primary/[0.02]"}
 />
 </div>
 );
}
