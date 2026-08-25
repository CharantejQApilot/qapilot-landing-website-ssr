import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hosts Next.js Image is allowed to optimize (keep in sync with
 * `images.remotePatterns` in next.config.mjs).
 */
export function isOptimizableCmsImageUrl(src: string): boolean {
  try {
    const { protocol, hostname } = new URL(src);
    if (protocol !== "https:" && protocol !== "http:") return false;
    if (hostname === "storage.googleapis.com") return true;
    if (hostname === "img.youtube.com" || hostname === "i.ytimg.com")
      return true;
    if (hostname === "qapilotlabs.s3.us-east-1.amazonaws.com") return true;
    if (
      hostname.endsWith(".amazonaws.com") &&
      (hostname.includes(".s3.") || hostname.startsWith("s3."))
    ) {
      return true;
    }
    const supabaseHost = (() => {
      try {
        const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
        return raw ? new URL(raw).hostname : "";
      } catch {
        return "";
      }
    })();
    if (supabaseHost && hostname === supabaseHost) return true;
    return false;
  } catch {
    return false;
  }
}

/** Descriptive OG/Twitter image alt (not the page title alone). */
export function coverImageAltForTitle(title: string): string {
  const t = title.replace(/\s+/g, " ").trim();
  return t ? `Cover image for “${t}”` : "Cover image";
}

type CmsRemoteImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** LCP heroes should set priority. */
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  fill?: boolean;
};

/**
 * CMS / S3 / YouTube thumbnails via next/image when the host is allowlisted;
 * otherwise a plain img so unknown CDNs still render.
 */
export function CmsRemoteImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  style,
  fill = false,
}: CmsRemoteImageProps) {
  if (!isOptimizableCmsImageUrl(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- host not in remotePatterns
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn(fill && "absolute inset-0 h-full w-full", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={cn(className)}
        priority={priority}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      style={style}
    />
  );
}
