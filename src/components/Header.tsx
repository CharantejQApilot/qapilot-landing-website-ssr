"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Sparkles,
  Bug,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Package,
  TestTube2,
  Users,
  ClipboardList,
  Server,
  Workflow,
  Bot,
  LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import {
  PATHS,
  PLATFORM_BY_SOLUTION,
  PLATFORM_BY_ROLE,
  PLATFORM_AI_AGENTS,
  RESOURCE_NAV_LINKS,
  COMPANY_NAV_LINKS,
} from "@/lib/routes";
import { APP_AUTOMATION_LOGIN_URL, DOCS_URL } from "@/lib/constants";

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Sparkles,
  Bug,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Package,
  TestTube2,
  Users,
  ClipboardList,
  Server,
  Workflow,
  Bot,
};

/** Single nav font size for harmony across all menu items */
const NAV_TEXT_CLASS = "text-[15px]";

const NavItem = ({
  to,
  children,
  isActive,
  className = "",
  forceForeground = false,
}: {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  /** Use foreground color by default (e.g. top-level mobile items) */
  forceForeground?: boolean;
}) => {
  const baseClass =
    `${NAV_TEXT_CLASS} font-medium transition-colors hover:text-foreground ` +
    (forceForeground ? "text-foreground" : "text-muted-foreground");
  const activeClass = isActive
    ? "text-foreground font-semibold bg-primary/5"
    : "";
  if (to.startsWith("#")) {
    return (
      <a href={to} className={`${baseClass} ${activeClass} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to} className={`${baseClass} ${activeClass} ${className}`}>
      {children}
    </Link>
  );
};

const Header = () => {
  const pathname = usePathname();
  const { openForm } = useHubSpotForm();
  const [openDropdown, setOpenDropdown] = useState<
    "platform" | "resources" | "company" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMobileSection = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileExpanded({});
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPathActive = (path: string) =>
    path !== "#" && pathname === path;

  const path = pathname;
  const isPlatformActive =
    path === PATHS.PRODUCT ||
    path.startsWith(`${PATHS.PRODUCT}/`) ||
    path === PATHS.FOR_FLUTTER ||
    path === PATHS.BRING_YOUR_OWN_AGENT ||
    path === PATHS.AGENTIC_ARCHITECTURE ||
    path === PATHS.FOR_RELEASE_MANAGER ||
    path === PATHS.FOR_QA_ENGINEER ||
    path === PATHS.FOR_QA_LEADER ||
    path === PATHS.FOR_PRODUCT_OWNER ||
    path === PATHS.FOR_SRE;
  const isResourcesActive = [PATHS.BLOGS, PATHS.LABS, PATHS.FAQS].some(
    (p) => path === p || path.startsWith(p + "/"),
  );
  const isCompanyActive = [PATHS.ABOUT, PATHS.CAREERS, PATHS.NEWS].some(
    (p) => path === p || path.startsWith(p + "/"),
  );

  const dropdownButtonClass = (active: boolean) =>
    `font-heading ${NAV_TEXT_CLASS} flex items-center gap-1.5 font-medium transition-colors rounded-md px-3 py-2 -mx-1 ${
      active
        ? "text-foreground font-semibold bg-primary/5"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  return (
    <header className="relative z-[1100] w-full border-b border-border bg-background overflow-visible flex flex-col lg:flex-row lg:items-center lg:h-16">
      {/* Bar: same horizontal padding as other sections (section-full); fixed 4rem height + grid so content is truly centered on mobile and desktop */}
      <div className="section-full w-full shrink-0 min-w-0 lg:flex-1 flex items-stretch h-16">
        <div className="flex-1 min-w-0 flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 h-16">
          <Link
            href={PATHS.HOME}
            className="inline-flex items-center justify-center shrink-0 leading-none h-10"
          >
            <Logo className="h-7 w-auto block" />
          </Link>

          <nav
          ref={navRef}
          className="hidden lg:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 flex-1 min-w-0"
        >
          {/* Platform dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-label="Platform menu"
              aria-expanded={openDropdown === "platform"}
              onClick={() =>
                setOpenDropdown((o) => (o === "platform" ? null : "platform"))
              }
              className={dropdownButtonClass(openDropdown === "platform" || isPlatformActive)}
            >
              Platform
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  openDropdown === "platform" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "platform" && (
              <div className="absolute left-0 top-full z-[9999] mt-2 w-[680px] xl:w-[760px] 2xl:w-[820px] rounded-xl border border-border bg-background shadow-xl p-6 lg:p-8">
                <div className="grid grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
                  <div>
                    <div
                      className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}
                    >
                      By Solution
                    </div>
                    <ul className="space-y-2">
                      {PLATFORM_BY_SOLUTION.map((item) => {
                        const Icon = PLATFORM_ICONS[item.icon];
                        return (
                          <li key={item.path + item.label}>
                            <NavItem
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-secondary"
                            >
                              {Icon && (
                                <Icon
                                  size={18}
                                  className="shrink-0 text-muted-foreground"
                                />
                              )}
                              {item.label}
                            </NavItem>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <div
                      className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}
                    >
                      By Role
                    </div>
                    <ul className="space-y-2">
                      {PLATFORM_BY_ROLE.map((item) => {
                        const Icon = PLATFORM_ICONS[item.icon];
                        return (
                          <li key={item.path + item.label}>
                            <NavItem
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-secondary"
                            >
                              {Icon && (
                                <Icon
                                  size={18}
                                  className="shrink-0 text-muted-foreground"
                                />
                              )}
                              {item.label}
                            </NavItem>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <div
                      className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}
                    >
                      AI Agents
                    </div>
                    <ul className="space-y-2">
                      {PLATFORM_AI_AGENTS.map((item) => {
                        const Icon = PLATFORM_ICONS[item.icon];
                        return (
                          <li key={item.path + item.label}>
                            <NavItem
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-secondary"
                            >
                              {Icon && (
                                <Icon
                                  size={18}
                                  className="shrink-0 text-muted-foreground"
                                />
                              )}
                              {item.label}
                            </NavItem>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resources — first among secondary nav */}
          <div className="relative">
            <button
              type="button"
              aria-label="Resources menu"
              aria-expanded={openDropdown === "resources"}
              onClick={() =>
                setOpenDropdown((o) => (o === "resources" ? null : "resources"))
              }
              className={dropdownButtonClass(openDropdown === "resources" || isResourcesActive)}
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  openDropdown === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "resources" && (
              <div className="absolute left-0 top-full z-[9999] mt-2 min-w-[14rem] xl:min-w-[16rem] rounded-xl border border-border bg-background shadow-xl py-2 px-1">
                {RESOURCE_NAV_LINKS.map((item) => (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    isActive={isPathActive(item.path)}
                    className="block px-5 py-3 rounded-lg hover:bg-secondary"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Company menu"
              aria-expanded={openDropdown === "company"}
              onClick={() =>
                setOpenDropdown((o) => (o === "company" ? null : "company"))
              }
              className={dropdownButtonClass(openDropdown === "company" || isCompanyActive)}
            >
              Company
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  openDropdown === "company" ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdown === "company" && (
              <div className="absolute left-0 top-full z-[9999] mt-2 min-w-[12rem] xl:min-w-[14rem] rounded-xl border border-border bg-background shadow-xl py-2 px-1">
                {COMPANY_NAV_LINKS.map((item) => (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    isActive={isPathActive(item.path)}
                    className="block px-5 py-3 rounded-lg hover:bg-secondary"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            )}
          </div>

          <a
            href={`${DOCS_URL}/`}
            className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground transition-colors hover:text-foreground`}
          >
            Documentation
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Button variant="ghost" className="text-base font-medium text-muted-foreground hover:text-foreground" asChild>
            <a href={APP_AUTOMATION_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Log In
            </a>
          </Button>
          <Button
            className="rounded-lg bg-primary px-6 py-2.5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={() => openForm()}
          >
            Get Access
          </Button>
        </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center shrink-0 h-10 w-10 min-h-[2.5rem] p-2 text-foreground transition-colors hover:text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — nested collapsible, stacks below header bar */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden w-full shrink-0">
          <nav className="section-full py-5 pb-6">
            <div className="space-y-0">
              {/* Platform */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSection("platform")}
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md ${isPlatformActive ? "bg-primary/5 font-semibold" : ""}`}
                >
                  <ChevronRight
                    size={18}
                    className={`shrink-0 text-foreground/70 transition-transform ${
                      mobileExpanded["platform"] ? "rotate-90" : ""
                    }`}
                  />
                  Platform
                </button>
                {mobileExpanded["platform"] && (
                  <div className="pl-6 pr-2 pb-1 space-y-0">
                    {/* By Solution */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleMobileSection("platform-solution")}
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md`}
                      >
                        <ChevronRight
                          size={16}
                          className={`shrink-0 transition-transform ${
                            mobileExpanded["platform-solution"] ? "rotate-90" : ""
                          }`}
                        />
                        By Solution
                      </button>
                      {mobileExpanded["platform-solution"] && (
                        <div className="pl-6 space-y-0">
                          {PLATFORM_BY_SOLUTION.map((item) => (
                            <NavItem
                              key={item.path + item.label}
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              forceForeground
                              className="block py-2 px-2 hover:bg-secondary rounded-md"
                            >
                              {item.label}
                            </NavItem>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* By Role */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleMobileSection("platform-role")}
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md`}
                      >
                        <ChevronRight
                          size={16}
                          className={`shrink-0 transition-transform ${
                            mobileExpanded["platform-role"] ? "rotate-90" : ""
                          }`}
                        />
                        By Role
                      </button>
                      {mobileExpanded["platform-role"] && (
                        <div className="pl-6 space-y-0">
                          {PLATFORM_BY_ROLE.map((item) => (
                            <NavItem
                              key={item.path + item.label}
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              forceForeground
                              className="block py-2 px-2 hover:bg-secondary rounded-md"
                            >
                              {item.label}
                            </NavItem>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* AI Agents */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleMobileSection("platform-agents")}
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md`}
                      >
                        <ChevronRight
                          size={16}
                          className={`shrink-0 transition-transform ${
                            mobileExpanded["platform-agents"] ? "rotate-90" : ""
                          }`}
                        />
                        AI Agents
                      </button>
                      {mobileExpanded["platform-agents"] && (
                        <div className="pl-6 space-y-0">
                          {PLATFORM_AI_AGENTS.map((item) => (
                            <NavItem
                              key={item.path + item.label}
                              to={item.path}
                              isActive={isPathActive(item.path)}
                              forceForeground
                              className="block py-2 px-2 hover:bg-secondary rounded-md"
                            >
                              {item.label}
                            </NavItem>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources — before Company */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSection("resources")}
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md ${isResourcesActive ? "bg-primary/5 font-semibold" : ""}`}
                >
                  <ChevronRight
                    size={18}
                    className={`shrink-0 text-foreground/70 transition-transform ${
                      mobileExpanded["resources"] ? "rotate-90" : ""
                    }`}
                  />
                  Resources
                </button>
                {mobileExpanded["resources"] && (
                  <div className="pl-6 pr-2 pb-1 space-y-0">
                    {RESOURCE_NAV_LINKS.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        isActive={isPathActive(item.path)}
                        forceForeground
                        className="block py-2 px-2 hover:bg-secondary rounded-md"
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSection("company")}
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md ${isCompanyActive ? "bg-primary/5 font-semibold" : ""}`}
                >
                  <ChevronRight
                    size={18}
                    className={`shrink-0 text-foreground/70 transition-transform ${
                      mobileExpanded["company"] ? "rotate-90" : ""
                    }`}
                  />
                  Company
                </button>
                {mobileExpanded["company"] && (
                  <div className="pl-6 pr-2 pb-1 space-y-0">
                    {COMPANY_NAV_LINKS.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        isActive={isPathActive(item.path)}
                        forceForeground
                        className="block py-2 px-2 hover:bg-secondary rounded-md"
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={`${DOCS_URL}/`}
                className={`flex items-center gap-2 py-2.5 px-4 ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-secondary rounded-md`}
              >
                <span className="w-[18px] shrink-0" aria-hidden />
                Documentation
              </a>
            </div>

            <div className="flex gap-3 pt-4 px-4 border-t border-border mt-2 pt-4">
              <Button variant="outline" className="flex-1 text-base" asChild>
                <a href={APP_AUTOMATION_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Log In
                </a>
              </Button>
              <Button
                className="flex-1 bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={() => openForm()}
              >
                Get Access
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
