import type { LucideIcon } from "lucide-react";
import {
  CloudOff,
  Coins,
  Eye,
  FileCode2,
  FileText,
  Gauge,
  KeyRound,
  Lock,
  MonitorSmartphone,
  Server,
} from "lucide-react";
import type { FaqItem } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";

export const MCP_WAITLIST_FORM_ID = "mcp-waitlist-form";
export const MCP_WAITLIST_API_PATH = "/api/hubspot/mcp-waitlist" as const;

export const MCP_AGENTS = [
  "Claude Code",
  "Cursor",
  "Codex",
  "Copilot",
  "Windsurf",
  "Other",
] as const;

export const MCP_FRAMEWORKS = [
  "Android native",
  "iOS native",
  "Flutter",
  "React native",
  "Other",
] as const;

export const MCP_STACKS = ["Android", "iOS", "Flutter", "React Native"] as const;

export type McpAgent = (typeof MCP_AGENTS)[number];
export type McpFramework = (typeof MCP_FRAMEWORKS)[number];

export const MCP_PROBLEM_OUTCOME_PAIRS = [
  {
    problem: "Code faster than you verify",
    outcome: "Verdict at PR time",
  },
  {
    problem: "Someone else's cloud",
    outcome: "Your device, your files",
  },
  {
    problem: "Vendor-locked tests",
    outcome: "YAML in your repo",
  },
  {
    problem: "Login to read reports",
    outcome: "Markdown in-session",
  },
  {
    problem: "Black-box agent runs",
    outcome: "Live device viewer",
  },
  {
    problem: "Surprise LLM spend",
    outcome: "Usage exposed as a tool",
  },
] as const;

export const MCP_DIFFERENTIATORS: readonly {
  title: string;
  tag: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Local-first",
    tag: "Localhost works",
    Icon: CloudOff,
  },
  {
    title: "Portable output",
    tag: "YAML · Appium",
    Icon: FileCode2,
  },
  {
    title: "Agent-readable",
    tag: "Markdown reports",
    Icon: FileText,
  },
  {
    title: "Our planner",
    tag: "Zero context cost",
    Icon: Coins,
  },
  {
    title: "Live viewer",
    tag: "Watch in-editor",
    Icon: Eye,
  },
];

export const MCP_SHIPS_TODAY: readonly {
  title: string;
  tag: string;
  Icon: LucideIcon;
}[] = [
  { title: "OAuth setup", tag: "Token-based config", Icon: KeyRound },
  { title: "Local launcher", tag: "Your device", Icon: MonitorSmartphone },
  { title: "YAML output", tag: "Saved locally", Icon: FileCode2 },
  { title: "Markdown reports", tag: "Agent-queryable", Icon: FileText },
  { title: "Live viewer", tag: "In the agent window", Icon: Eye },
  { title: "Usage tool", tag: "Token stats exposed", Icon: Gauge },
];

export const MCP_BUILDING_TOWARD = [
  "Scenario expansion",
  "Risk ranking",
  "Flow caching",
  "Scenario memory",
  "Failure classification",
  "Regression memory",
] as const;

export const MCP_WORKFLOW_FRAMES = [
  {
    step: "01",
    label: "Intent",
    sample: "Verify checkout still works after this change.",
    Icon: FileText,
  },
  {
    step: "02",
    label: "Device",
    sample: "Live run on your emulator or physical device.",
    Icon: MonitorSmartphone,
  },
  {
    step: "03",
    label: "Report",
    sample: "Markdown your agent can query in the same session.",
    Icon: FileText,
  },
] as const;

export const MCP_FAQS: readonly FaqItem[] = [
  {
    question: "When will this be available?",
    answer:
      "First builds go to early users shortly. Join the list and we email when your build is ready. Nothing else.",
  },
  {
    question: "Does my app leave my machine?",
    answer:
      "No. Local-first by default. Accessibility and design reports only upload with explicit consent.",
  },
  {
    question: "Does planning use my LLM context?",
    answer:
      "No. QApilot's planner runs on our infrastructure. Your agent context stays on your work.",
  },
  {
    question: "What format will tests be?",
    answer: "YAML or Appium code in your repo. You own the suite.",
  },
  {
    question: "Will there be cloud MCP?",
    answer:
      "Later. Local MCP ships first: your device, your data. Cloud MCP will offer no local setup, one cloud device per tenant.",
  },
  {
    question: "How is this different from Maestro MCP?",
    answer: `Maestro runs YAML flows you define. QApilot MCP verifies in your editor: intent in, markdown report out. See ${SITE_BASE_URL}${PATHS.COMPARE_MAESTRO}.`,
  },
];

export const MCP_COMPARE_LINKS = [
  { label: "Maestro", href: PATHS.COMPARE_MAESTRO },
  { label: "Appium", href: PATHS.COMPARE_APPIUM },
] as const;
