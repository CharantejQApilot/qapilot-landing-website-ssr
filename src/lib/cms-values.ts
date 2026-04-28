export function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function firstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    const normalized = asTrimmedString(value);
    if (normalized) return normalized;
  }
  return undefined;
}

export function commaSeparatedList(value: unknown): string[] {
  const normalized = asTrimmedString(value);
  if (!normalized) return [];
  return normalized
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
