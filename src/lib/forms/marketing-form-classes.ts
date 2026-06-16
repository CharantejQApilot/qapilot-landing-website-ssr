import { cn } from "@/lib/utils";

/**
 * Root wrapper for marketing / lead capture forms.
 * Pairs with `.marketing-form-surface` rules in `globals.css` (Source Sans 3 body stack).
 */
export const marketingFormRootClass = "marketing-form-surface font-sans antialiased";

/** Panel title above a lead form (Space Grotesk — matches marketing h2). */
export const marketingFormTitleClass =
  "marketing-form-title font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl";

/** Short intro under a form panel title. */
export const marketingFormIntroClass =
  "max-w-prose text-sm leading-snug text-muted-foreground font-sans sm:text-[0.9375rem]";

/** Labels for marketing / lead capture forms */
export const marketingFormLabelClass =
  "mb-1.5 block text-sm font-medium text-foreground font-sans";

/** Inline field errors */
export const marketingFormFieldErrorClass = "mt-1 text-xs text-destructive font-sans";

export const marketingFormStatusSuccessClass =
  "rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm font-sans text-green-700 dark:text-green-400";

export const marketingFormStatusErrorClass =
  "rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-sans text-destructive";

export const marketingFormSubmitClass = "w-full rounded-full font-semibold font-sans";

/** Inner segment of composite fields (e.g. phone number beside country code) — no own border. */
export const marketingFormCompositeSegmentClass =
  "min-w-0 flex-1 h-full border-0 bg-transparent px-3 py-2 text-sm text-foreground font-sans shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

const MARKETING_CONTROL_BASE =
  "h-10 rounded-md border bg-background px-3 py-2 text-sm text-foreground font-sans shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Text inputs, URL inputs, and native `<select>` — same height and typography.
 * For selects, pass `selectPlaceholder` when `value === ""` so the empty option matches placeholder tone.
 */
export function marketingFormControlClass(options?: {
  invalid?: boolean;
  selectPlaceholder?: boolean;
  /** Default true; set false for flex row segments (e.g. phone field). */
  fullWidth?: boolean;
}) {
  const fullWidth = options?.fullWidth !== false;
  return cn(
    MARKETING_CONTROL_BASE,
    fullWidth && "w-full",
    !fullWidth && "min-w-0 flex-1",
    options?.invalid ? "border-destructive" : "border-input",
    options?.selectPlaceholder && "text-muted-foreground",
  );
}
