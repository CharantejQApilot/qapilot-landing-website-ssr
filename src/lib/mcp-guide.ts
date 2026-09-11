import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";

export const MCP_GUIDE_TITLE = "QApilot MCP CLI Guide. Android Automation";
export const MCP_GUIDE_DESCRIPTION =
  "Automate real Android devices and emulators in Claude, Cursor, or any MCP client. Describe test flows in plain English — no Appium code required.";

export const MCP_CLI_INSTALL_URL =
  "https://api.qapilot.io/internal/qapilot-mobile-mcp.tgz";

export const MCP_CLI_INSTALL_COMMAND = `npm install -g ${MCP_CLI_INSTALL_URL}`;

export const MCP_CLI_VERIFY_COMMAND = "npx qapilot-mcp --stdio";

export const MCP_APPIUM_SETUP_COMMANDS = `npm i --location=global appium@2.19.0
appium driver install uiautomator2@4.2.6
appium --allow-insecure chromedriver_autodownload,adb_shell --base-path /wd/hub --allow-cors
adb devices`;

export const MCP_CLAUDE_CONFIG_JSON = `{
  "mcpServers": {
    "qapilot-mobile-mcp": {
      "command": "npx",
      "args": ["-y", "qapilot-mcp", "--stdio"],
      "env": {}
    }
  }
}`;

export const MCP_CODEX_CONFIG_JSON = `{
  "mcpServers": [
    {
      "name": "qapilot-mobile-mcp",
      "command": "npx",
      "args": ["-y", "qapilot-mcp", "--stdio"],
      "env": {}
    }
  ]
}`;

export type McpGuideNavLink = {
  href: string;
  label: string;
};

export type McpGuideNavGroup = {
  heading: string;
  links: readonly McpGuideNavLink[];
};

export const MCP_GUIDE_NAV: readonly McpGuideNavGroup[] = [
  {
    heading: "Getting Started",
    links: [
      { href: "#overview", label: "Overview" },
      { href: "#prereqs", label: "Prerequisites" },
      { href: "#install", label: "Install CLI" },
      { href: "#appium", label: "Appium Setup" },
    ],
  },
  {
    heading: "Configure AI Client",
    links: [
      { href: "#config", label: "Claude Desktop" },
      { href: "#config", label: "Cursor / Codex" },
    ],
  },
  {
    heading: "Using QApilot",
    links: [
      { href: "#register", label: "Register & Login" },
      { href: "#record", label: "Recording Steps" },
      { href: "#preview", label: "Live Preview" },
      { href: "#accept", label: "Accepting Steps" },
      { href: "#execute", label: "Executing Tests" },
      { href: "#reports", label: "Reports" },
    ],
  },
  {
    heading: "Reference",
    links: [{ href: "#all-tools", label: "All MCP Tools" }],
  },
];

export const MCP_GUIDE_CHIPS = [
  { label: "Android + Appium", tone: "blue" },
  { label: "Local device & emulator", tone: "green" },
  { label: "Claude · Cursor · Codex", tone: "amber" },
] as const;

export const MCP_GUIDE_TOOLS: readonly { name: string; description: string }[] =
  [
    {
      name: "mobile_signup",
      description: "Register a new QApilot account; triggers activation email",
    },
    {
      name: "mobile_login",
      description: "Log in; uses env credentials automatically when set",
    },
    { name: "mobile_logout", description: "Clear the current auth token" },
    {
      name: "mobile_start_session",
      description: "One-shot: login + project + device + launch app",
    },
    {
      name: "mobile_list_projects",
      description: "List projects in your QApilot workspace",
    },
    {
      name: "mobile_select_project",
      description: "Set the active project for this session",
    },
    {
      name: "mobile_list_available_devices",
      description: "List connected local Android devices and emulators",
    },
    {
      name: "mobile_use_device",
      description: "Select a specific device when multiple are connected",
    },
    {
      name: "mobile_list_apps",
      description: "List installed apps on the connected device",
    },
    {
      name: "mobile_launch_app",
      description: "Launch an app by package ID; starts Appium session",
    },
    {
      name: "mobile_stop_appium_session",
      description: "End the current Appium session cleanly",
    },
    {
      name: "mobile_submit_plan",
      description: "Submit a structured test plan for execution",
    },
    {
      name: "mobile_execute_plan",
      description: "Run the submitted plan on the device",
    },
    {
      name: "mobile_execute",
      description: "Perform a single manual action (tap, type, swipe…)",
    },
    {
      name: "mobile_get_execution_state",
      description: "Real-time status of the running execution",
    },
    {
      name: "mobile_check_session_status",
      description: "Check whether the Appium session is alive",
    },
    {
      name: "mobile_get_session_info",
      description: "Device capabilities and session metadata",
    },
    {
      name: "mobile_get_preview_url",
      description: "Get the live screenshot stream URL",
    },
    {
      name: "mobile_accept_steps",
      description: "Push happy-path steps to QApilot as a test case",
    },
    {
      name: "mobile_execute_testcases",
      description: "Replay saved test cases by ID",
    },
    {
      name: "mobile_run_excel_testcases",
      description: "Run test cases from an Excel (.xlsx) file",
    },
    {
      name: "mobile_generate_report",
      description: "Generate output.json + report.yaml; clears execution state",
    },
    {
      name: "mobile_get_cache_context",
      description: "Fetch cached XPaths and skills for this app",
    },
    {
      name: "mobile_cache_summary",
      description: "Show what is cached for a given package",
    },
    {
      name: "mobile_get_usage",
      description: "Token and API usage for the current session",
    },
  ];

export function buildMcpGuideJsonLd() {
  const url = `${SITE_BASE_URL}${PATHS.MCP_GUIDE}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "QApilot MCP CLI User Guide",
    description: MCP_GUIDE_DESCRIPTION,
    url,
    mainEntityOfPage: url,
  };
}
