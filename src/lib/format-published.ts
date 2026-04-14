import { format } from "date-fns";

/** `date-fns/format` throws on invalid dates; CMS rows can occasionally be bad. */
export function formatPublishedDate(
  iso: string | null | undefined,
  pattern = "MMMM dd, yyyy",
): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return format(d, pattern);
  } catch {
    return null;
  }
}
