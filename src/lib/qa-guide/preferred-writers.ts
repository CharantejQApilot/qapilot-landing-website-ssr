/** Default byline writers for QE Guide drafts when none is selected. */
export const PREFERRED_QE_GUIDE_WRITER_NAMES = [
  "Harini Mukesh",
  "Charan Tej Kammara",
] as const;

export function pickRandomPreferredWriterName(
  names: readonly string[] = PREFERRED_QE_GUIDE_WRITER_NAMES,
): string {
  const list = names.length > 0 ? names : PREFERRED_QE_GUIDE_WRITER_NAMES;
  return list[Math.floor(Math.random() * list.length)]!;
}
