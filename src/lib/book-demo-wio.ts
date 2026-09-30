import { getCaseStudy } from "@/lib/case-studies-data";

const HIGHLIGHT_ORDER = ["89.3%", "11,025", "97%"] as const;

const HIGHLIGHT_LABELS: Record<(typeof HIGHLIGHT_ORDER)[number], string> = {
  "89.3%": "Step success",
  "11,025": "Nightly steps",
  "97%": "Overnight runs",
};

export function getBookDemoWioHighlights() {
  const study = getCaseStudy("wio");
  if (!study) return [];

  return HIGHLIGHT_ORDER.flatMap((value) => {
    const metric = study.metrics.find((entry) => entry.value === value);
    if (!metric) return [];
    return [{ value: metric.value, label: HIGHLIGHT_LABELS[value] }];
  });
}
