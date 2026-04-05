import { cn } from "@/lib/utils";

/** Labels for marketing / lead capture forms */
export const marketingFormLabelClass =
  "mb-1.5 block text-sm font-medium text-foreground";

/** Inline field errors */
export const marketingFormFieldErrorClass = "mt-1 text-xs text-destructive";

const MARKETING_CONTROL_BASE =
  "h-10 rounded-md border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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
