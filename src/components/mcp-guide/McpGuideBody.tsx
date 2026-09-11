import { Cable, Code2, Hexagon, Smartphone, Zap } from "lucide-react";
import {
  MCP_APPIUM_SETUP_COMMANDS,
  MCP_CLI_INSTALL_COMMAND,
  MCP_CLI_VERIFY_COMMAND,
  MCP_GUIDE_TOOLS,
  MCP_SLACK_INVITE_URL,
} from "@/lib/mcp-guide";
import { McpGuideConfigTabs } from "./McpGuideConfigTabs";
import {
  GuideInlineCode,
  HlCmd,
  HlComment,
  HlFlag,
  HlNum,
  McpGuideCodeBlock,
} from "./McpGuideCodeBlock";
import {
  GuideCallout,
  GuideFeatureCard,
  GuideP,
  GuidePrompt,
  GuidePrompts,
  GuideSection,
  GuideSectionLabel,
  GuideStep,
} from "./McpGuidePrimitives";
import { McpGuideSidebar } from "./McpGuideSidebar";

export function McpGuideBody() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[16.5rem_minmax(0,1fr)] xl:gap-16">
      <McpGuideSidebar />

      <div className="min-w-0">
        <GuideSection id="prereqs">
          <GuideSectionLabel n="0" tone="plain">
            Prerequisites
          </GuideSectionLabel>
          <GuideP>Make sure all five are in place before installing.</GuideP>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <GuideFeatureCard
              icon={<Hexagon className="h-5 w-5" strokeWidth={1.6} />}
              title="Node.js 18+"
            >
              Download from{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                nodejs.org
              </a>{" "}
              or use nvm.
            </GuideFeatureCard>
            <GuideFeatureCard
              icon={<Code2 className="h-5 w-5" strokeWidth={1.6} />}
              title="Java JDK 11+"
            >
              Required by Appium. Set <GuideInlineCode>JAVA_HOME</GuideInlineCode>{" "}
              in your shell profile.
            </GuideFeatureCard>
            <GuideFeatureCard
              icon={<Smartphone className="h-5 w-5" strokeWidth={1.6} />}
              title="Android SDK / Studio"
            >
              Installs adb and platform-tools. Set{" "}
              <GuideInlineCode>ANDROID_HOME</GuideInlineCode> to the SDK path.
            </GuideFeatureCard>
            <GuideFeatureCard
              icon={<Cable className="h-5 w-5" strokeWidth={1.6} />}
              title="Device or Emulator"
            >
              USB device with USB Debugging on, or an AVD emulator. Verify with{" "}
              <GuideInlineCode>adb devices</GuideInlineCode>.
            </GuideFeatureCard>
            <GuideFeatureCard
              icon={<Zap className="h-5 w-5" strokeWidth={1.6} />}
              title="Appium 2.19.0"
            >
              Install globally and add the UIAutomator2 driver. See the{" "}
              <a
                href="#appium"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Appium Setup
              </a>{" "}
              section for exact commands.
            </GuideFeatureCard>
          </div>
        </GuideSection>

        <GuideSection id="install">
          <GuideSectionLabel n="1">Install the CLI</GuideSectionLabel>
          <GuideP>Install QApilot MCP globally from the distribution package:</GuideP>
          <McpGuideCodeBlock lang="bash" copyText={MCP_CLI_INSTALL_COMMAND}>
            <HlCmd>npm install -g</HlCmd> {MCP_CLI_INSTALL_COMMAND.replace(
              "npm install -g ",
              "",
            )}
          </McpGuideCodeBlock>
          <GuideP>Verify the install:</GuideP>
          <McpGuideCodeBlock lang="bash" copyText={MCP_CLI_VERIFY_COMMAND}>
            <HlCmd>npx qapilot-mcp</HlCmd> <HlFlag>--stdio</HlFlag>
            {"\n"}
            <HlComment>
              # Server starts and waits for input — no errors = success
            </HlComment>
          </McpGuideCodeBlock>
        </GuideSection>

        <GuideSection id="appium">
          <GuideSectionLabel n="2">Appium Setup</GuideSectionLabel>
          <GuideP>
            One-time setup — install Appium and its Android driver with the pinned
            versions below, then start the server.
          </GuideP>
          <McpGuideCodeBlock
            lang="bash — one-time setup"
            copyText={MCP_APPIUM_SETUP_COMMANDS}
            copyLabel="Copy all"
          >
            <HlComment># Step 1 — Install Appium</HlComment>
            {"\n"}
            <HlCmd>npm i --location=global</HlCmd> appium@<HlNum>2.19.0</HlNum>
            {"\n\n"}
            <HlComment># Step 2 — Install the UiAutomator2 Android driver</HlComment>
            {"\n"}
            <HlCmd>appium driver install</HlCmd> uiautomator2@<HlNum>4.2.6</HlNum>
            {"\n\n"}
            <HlComment>
              # Step 3 — Start Appium (run this every time before testing)
            </HlComment>
            {"\n"}
            <HlCmd>appium</HlCmd> <HlFlag>--allow-insecure</HlFlag>{" "}
            chromedriver_autodownload,adb_shell \
            {"\n       "}
            <HlFlag>--base-path</HlFlag> /wd/hub \
            {"\n       "}
            <HlFlag>--allow-cors</HlFlag>
            {"\n\n"}
            <HlComment># Step 4 — Confirm device is visible</HlComment>
            {"\n"}
            <HlCmd>adb devices</HlCmd>
            {"\n"}
            <HlComment># → emulator-5554   device</HlComment>
          </McpGuideCodeBlock>
          <GuideCallout tone="warn">
            Use the <strong>exact versions shown</strong> — other Appium or
            driver versions may break the MCP server. Keep Appium running in a
            separate terminal before starting any test session.
          </GuideCallout>
        </GuideSection>

        <GuideSection id="config">
          <GuideSectionLabel n="3" tone="green">
            Configure Your AI Client
          </GuideSectionLabel>
          <GuideP>
            QApilot MCP connects via the Model Context Protocol. Paste the config
            for your client:
          </GuideP>
          <McpGuideConfigTabs />
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Restart your AI client after saving.{" "}
            <strong className="font-semibold text-foreground">
              QApilot Mobile MCP
            </strong>{" "}
            will appear in the connected tools list.
          </p>
        </GuideSection>

        <GuideSection id="register">
          <GuideSectionLabel n="4" tone="amber">
            Register & Login
          </GuideSectionLabel>
          <GuideStep
            n="1"
            title="Create a QApilot account"
            description="Ask your AI to register you — an activation email is sent automatically."
          >
            <GuidePrompts>
              <GuidePrompt label="Sample prompt">
                Sign me up for QApilot with email alice@example.com
              </GuidePrompt>
            </GuidePrompts>
            <GuideCallout tone="info">
              QApilot sends an activation link to your email. Click it to
              activate — your login credentials arrive by email. Use them to
              log in on the next step.
            </GuideCallout>
          </GuideStep>
          <GuideStep
            n="2"
            title="Log in"
            description="If env credentials are set in your config, Claude logs in automatically on first use."
          >
            <GuidePrompts>
              <GuidePrompt label="With env credentials set">
                Log in to QApilot
              </GuidePrompt>
              <GuidePrompt label="Without env credentials">
                Log in to QApilot as alice@example.com with password MyPass123
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
          <GuideStep
            n="3"
            title="Create Project"
            description="Log in to your QApilot account and create a project in which you'd like to have your tests saved."
          />
          <GuideStep
            n="4"
            title="Launch your app"
            description="Provide the Android package ID. The default project and device are selected automatically."
            last
          >
            <GuidePrompts>
              <GuidePrompt label="Sample prompt">
                Launch the CarWale app — package ID is com.carwale
              </GuidePrompt>
              <GuidePrompt label="All-in-one session start">
                Start a QApilot session and open com.carwale on the local
                emulator
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
        </GuideSection>

        <GuideSection id="record">
          <GuideSectionLabel n="5">Recording Test Steps</GuideSectionLabel>
          <GuideP>
            Once the app is launched, describe what you want to test. The AI
            builds a structured plan and executes each step on the device in
            real time.
          </GuideP>
          <GuidePrompts>
            <GuidePrompt label="Search flow">
              Tap Search, type &quot;Honda City&quot;, select the first result,
              and verify the car detail page loads
            </GuidePrompt>
            <GuidePrompt label="Login flow">
              Log in with email user@test.com and password Test@123, then
              screenshot the home screen
            </GuidePrompt>
            <GuidePrompt label="Navigation + assertion">
              Go to Compare, add two cars, and confirm the Compare button is
              visible
            </GuidePrompt>
            <GuidePrompt label="Scroll and filter">
              Scroll down on the Filters page, select Petrol as fuel type, and
              apply the filter
            </GuidePrompt>
            <GuidePrompt label="Form submission">
              Fill the enquiry form: name &quot;John&quot;, phone
              &quot;9999999999&quot;, city &quot;Hyderabad&quot;, then submit
            </GuidePrompt>
          </GuidePrompts>
          <GuideCallout tone="info">
            Step titles are generated automatically (max 50 chars, no XPath) —
            reports and the dashboard always stay readable.
          </GuideCallout>
        </GuideSection>

        <GuideSection id="preview">
          <GuideSectionLabel n="6" tone="green">
            Live Preview
          </GuideSectionLabel>
          <GuideP>Watch the device screen in your browser as steps execute.</GuideP>
          <GuidePrompts>
            <GuidePrompt label="Get preview link">
              Give me the live preview URL for this session
            </GuidePrompt>
            <GuidePrompt label="During execution">
              Open the preview so I can watch the test run
            </GuidePrompt>
          </GuidePrompts>
          <GuideCallout tone="tip">
            The preview URL is returned automatically on every{" "}
            <GuideInlineCode>mobile_launch_app</GuideInlineCode> call — click
            it before the first step starts to watch from the beginning.
          </GuideCallout>
        </GuideSection>

        <GuideSection id="accept">
          <GuideSectionLabel n="7">Accepting Steps</GuideSectionLabel>
          <GuideP>
            After a successful run, push the recorded steps to QApilot as a
            saved test case for future replay.
          </GuideP>
          <GuidePrompts>
            <GuidePrompt label="Sample prompt">
              Steps look good — accept them and push to QApilot
            </GuidePrompt>
            <GuidePrompt label="With a test case name">
              Accept these steps as &quot;Search and select Honda City&quot; in
              QApilot
            </GuidePrompt>
          </GuidePrompts>
          <GuideCallout tone="info">
            Only the happy-path steps are saved (failures excluded). If a step
            failed, fix it first, generate a passed report, then accept.
          </GuideCallout>
        </GuideSection>

        <GuideSection id="execute">
          <GuideSectionLabel n="8" tone="amber">
            Executing Saved Test Cases
          </GuideSectionLabel>
          <GuideP>
            Replay any test cases saved in your QApilot project — one by one,
            in batch, or from an Excel sheet.
          </GuideP>
          <GuideStep n="1" title="List available test cases">
            <GuidePrompts>
              <GuidePrompt label="Sample prompt">
                Show all test cases in the CarWale Android project
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
          <GuideStep n="2" title="Run by ID or batch">
            <GuidePrompts>
              <GuidePrompt label="Single test">
                Run test case TC-101 on the connected emulator
              </GuidePrompt>
              <GuidePrompt label="Multiple tests">
                Execute test cases TC-101, TC-102, and TC-105 in sequence
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
          <GuideStep n="3" title="Run from an Excel sheet">
            <GuidePrompts>
              <GuidePrompt label="Sample prompt">
                Run all test cases from regression_suite.xlsx
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
          <GuideStep n="4" title="Check status" last>
            <GuidePrompts>
              <GuidePrompt label="Sample prompt">
                What&apos;s the current execution status?
              </GuidePrompt>
            </GuidePrompts>
          </GuideStep>
        </GuideSection>

        <GuideSection id="reports">
          <GuideSectionLabel n="9" tone="green">
            Reports
          </GuideSectionLabel>
          <GuideP>
            Generate a report at the end of every session. Reports include step
            results, screenshots, errors, and timing.
          </GuideP>
          <GuidePrompts>
            <GuidePrompt label="Passed session">
              Generate a passed report for this session
            </GuidePrompt>
            <GuidePrompt label="Failed session">
              Generate a failed report — the login button wasn&apos;t found at
              step 3
            </GuidePrompt>
            <GuidePrompt label="HTML report">
              Save an HTML report to ~/Downloads/test-results.html
            </GuidePrompt>
          </GuidePrompts>
          <GuideP>
            Reports are saved to{" "}
            <GuideInlineCode>
              ~/Downloads/qapilotmcpreport/qapilot/&lt;date&gt;/&lt;sessionId&gt;/
            </GuideInlineCode>{" "}
            — includes <GuideInlineCode>output.json</GuideInlineCode>,{" "}
            <GuideInlineCode>report.yaml</GuideInlineCode>, and on pass a{" "}
            <GuideInlineCode>scenario.feature</GuideInlineCode> Gherkin file.
          </GuideP>
          <GuideCallout tone="tip">
            Always generate a report at the end of every session, even on
            failure — it clears execution state so the next test can start
            cleanly.
          </GuideCallout>
        </GuideSection>

        <GuideSection id="community">
          <GuideSectionLabel n="10" tone="green">
            Join the Slack Community
          </GuideSectionLabel>
          <GuideP>
            Questions, prompts, and setup help from other QApilot MCP users —
            join the Slack community and say hello.
          </GuideP>
          <a
            href={MCP_SLACK_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-12 items-center gap-3 rounded-md border border-border bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-primary-light sm:h-14 sm:px-6 sm:text-base"
          >
            <SlackMark className="h-6 w-6 shrink-0" />
            Join Slack
          </a>
        </GuideSection>

        <GuideSection id="all-tools">
          <GuideSectionLabel n="⚙" tone="plain">
            All MCP Tools
          </GuideSectionLabel>
          <GuideP>Every capability the server exposes:</GuideP>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody>
                {MCP_GUIDE_TOOLS.map((tool) => (
                  <tr
                    key={tool.name}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[11.5px] text-primary">
                      {tool.name}
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-muted-foreground">
                      {tool.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GuideSection>
      </div>
    </div>
  );
}

function SlackMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 122.8 122.8"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        fill="#E01E5A"
        d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
      />
      <path
        fill="#36C5F0"
        d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
      />
      <path
        fill="#2EB67D"
        d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
      />
      <path
        fill="#ECB22E"
        d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
      />
    </svg>
  );
}
