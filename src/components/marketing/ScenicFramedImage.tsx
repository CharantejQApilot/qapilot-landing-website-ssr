import Image from "next/image";
import { cn } from "@/lib/utils";

type ScenicFramedImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  scenicUrl: string;
  ariaLabel?: string;
  className?: string;
  priority?: boolean;
};

/**
 * Product screenshot inside the same scenic Ken Burns frame as {@link ScenicYoutubeVideo}.
 */
export function ScenicFramedImage({
  src,
  width,
  height,
  alt,
  scenicUrl,
  ariaLabel,
  className,
  priority = false,
}: ScenicFramedImageProps) {
  return (
    <div
      className={cn(
        "relative mb-14 overflow-hidden rounded-2xl border border-border/70 shadow-[0_24px_48px_-12px_hsl(220_20%_12%/0.08)] md:mb-16 2xl:mb-20",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-[-10%] motion-safe:animate-scenic-ken-burns">
            <Image
              src={scenicUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1200px, 100vw"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />
        <div className="absolute inset-0 bg-primary/[0.02]" />
      </div>

      <div className="relative z-[2] px-[6%] py-[6.5%] sm:px-[7%] sm:py-[7%] md:px-[8%] md:py-[7.5%]">
        <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-white shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.06)] outline outline-1 outline-white/25 [outline-offset:0] dark:border-white/15 dark:bg-zinc-950">
          <div
            className="relative w-full overflow-hidden bg-white dark:bg-zinc-950"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain object-left-top"
              sizes="(min-width: 1536px) 1120px, (min-width: 1280px) 960px, 100vw"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
