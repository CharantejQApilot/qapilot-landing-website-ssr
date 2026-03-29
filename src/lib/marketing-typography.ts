/**
 * Canonical typography for home / marketing sections (single source of truth).
 * Navy banners: use `marketingSectionH2Class` only — `.section-navy h2` sets color.
 */

export const marketingSectionH2Class =
  "font-heading text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold tracking-tight leading-snug";

/** Intro paragraph directly under a section h2 on light backgrounds */
export const marketingSectionIntroClass =
  "text-base leading-relaxed text-muted-foreground md:text-lg 2xl:text-xl";

/** Small caps label above a section h2 */
export const marketingEyebrowClass =
  "text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3 md:mb-4";

/** Lead line under the page h1 (hero) — one step above `marketingSectionIntroClass` */
export const marketingHeroLeadClass =
  "text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl";
