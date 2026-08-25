/** Site-wide unlock after case-study lead magnet submit. */
export const CASE_STUDIES_UNLOCK_STORAGE_KEY = "qapilot-case-studies-unlocked-at";

/** Access remains valid for 90 days after unlock. */
const UNLOCK_TTL_MS = 90 * 24 * 60 * 60 * 1000;

function readUnlockedAt(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CASE_STUDIES_UNLOCK_STORAGE_KEY);
    if (!raw) return null;
    const at = Number(raw);
    return Number.isFinite(at) ? at : null;
  } catch {
    return null;
  }
}

export function isCaseStudiesUnlocked(): boolean {
  const at = readUnlockedAt();
  if (at == null) return false;
  return Date.now() - at < UNLOCK_TTL_MS;
}

export function markCaseStudiesUnlocked(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CASE_STUDIES_UNLOCK_STORAGE_KEY, String(Date.now()));
  } catch {
    // Private browsing: unlock still applies for this session via in-memory flag.
  }
  sessionUnlocked = true;
}

/** Fallback when localStorage is unavailable. */
let sessionUnlocked = false;

export function isCaseStudiesUnlockedIncludingSession(): boolean {
  return sessionUnlocked || isCaseStudiesUnlocked();
}
