export type BookDemoTestingMode = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: readonly string[];
  coverageValue: string;
  savingsValue: string;
};

export const BOOK_DEMO_TESTING_MODES: readonly BookDemoTestingMode[] = [
  {
    id: "crawler",
    title: "Crawler-Led Autonomous Testing",
    eyebrow: "Agentic • Autonomous",
    description:
      "Equipped with a crawler that explores apps like a real user, mapping user flows. Agents orchestrate the crawl and generate test cases as output.",
    bullets: [
      "Zero Touch Sanity",
      "Agentic Test Generation",
      "Knowledge Graph For App Context",
    ],
    coverageValue: "10–15%",
    savingsValue: "≈ 70%",
  },
  {
    id: "cowork",
    title: "CoWork",
    eyebrow: "Agentic • Human In The Loop",
    description:
      "CoWork authors test cases from natural-language input. Accelerates authoring by utilizing BDD format input.",
    bullets: [
      "Natural-Language To Test Case",
      "Edit & Refactor Tests",
      "Agent-Assisted Authoring",
    ],
    coverageValue: "30–50%",
    savingsValue: "≈ 50%",
  },
  {
    id: "record-playback",
    title: "Record & Playback",
    eyebrow: "RPA • AI-Assisted",
    description:
      "Capture user actions on the device and replay them. AI-driven robustness keeps recordings stable as the UI shifts.",
    bullets: [
      "Low-Code Authoring Path",
      "AI-Native Auto-Healing",
      "Capture-And-Replay Flows",
    ],
    coverageValue: "80–100%",
    savingsValue: "≈ 30%",
  },
] as const;

export const BOOK_DEMO_BEYOND_QA = {
  title: "Beyond Functional Quality Assurance",
  description:
    "QApilot's release readiness suite goes further with security scans, device metrics, accessibility checks, latency signals, and more. Every build ships with functional and operational confidence.",
} as const;
