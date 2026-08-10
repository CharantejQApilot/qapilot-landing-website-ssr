"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NavItem } from "@/components/header/HeaderNavItem";
import {
  PATHS,
  PLATFORM_BY_SOLUTION,
  PLATFORM_BY_ROLE,
  PLATFORM_AI_AGENTS,
  RESOURCE_NAV_LINKS,
  COMPANY_NAV_LINKS,
} from "@/lib/routes";
import {
  APP_AUTOMATION_LOGIN_URL,
  DOCS_URL,
  EXTERNAL_NOINDEX_SUBDOMAIN_REL,
} from "@/lib/constants";

const HeaderDesktopPlatformMenu = dynamic(
  () => import("@/components/header/HeaderDesktopPlatformMenu"),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute left-0 top-full z-[9999] mt-2 min-h-[240px] w-[min(860px,calc(100vw-2rem))] rounded-xl border border-border bg-background px-7 py-6 shadow-xl sm:px-8 sm:py-7"
        aria-hidden
      />
    ),
  },
);

/** Dropdowns, mobile drawer, and in-panel links */
const NAV_TEXT_CLASS = "text-[15px]";
/** Desktop top bar only. Slightly larger than dropdown/mobile */
const RIBBON_NAV_TEXT_CLASS = "text-[15.75px]";

const Header = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<
    "platform" | "resources" | "company" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>(
    {},
  );
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

  const isPathActive = (path: string) => {
    if (path === "#") return false;
    const pathOnly = path.split("#")[0] || path;
    return pathname === pathOnly;
  };

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
    path === PATHS.FOR_SRE ||
    path === PATHS.ENTERPRISE;
  const isResourcesActive = [
    PATHS.BLOGS,
    PATHS.QA_GUIDE,
    PATHS.LABS,
    PATHS.FAQS,
  ].some((p) => path === p || path.startsWith(p + "/"));
  const isCompanyActive = [
    PATHS.ABOUT,
    PATHS.ENTERPRISE,
    PATHS.CAREERS,
    PATHS.PARTNERS,
    PATHS.EVENTS,
    PATHS.NEWS,
  ].some((p) => path === p || path.startsWith(p + "/"));

  const dropdownButtonClass = (active: boolean) =>
    `font-heading ${RIBBON_NAV_TEXT_CLASS} flex shrink-0 items-center gap-1.5 font-medium transition-colors rounded-md px-2 py-2 xl:px-3 xl:py-2.5 -mx-1 whitespace-nowrap ${
      active
        ? "text-foreground font-semibold bg-muted/30"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/25"
    }`;

  return (
    <header
      data-site-header
      className="relative z-[1100] w-full border-b border-border bg-background overflow-visible flex flex-col xl:flex-row xl:items-center xl:h-[4.375rem]"
    >
      {/* Bar: same horizontal padding as other sections (section-full); slightly taller than 4rem for ribbon breathing room */}
      <div className="section-full w-full shrink-0 min-w-0 xl:flex-1 flex items-stretch h-[4.375rem]">
        <div className="flex w-full min-w-0 items-center h-[4.375rem]">
          <Link
            href={PATHS.HOME}
            className="inline-flex min-w-0 shrink-0 items-center leading-none"
            aria-label="QApilot home"
          >
            <Logo className="block h-[1.125rem] w-auto max-w-[58vw] sm:h-[1.375rem] sm:max-w-[42vw] md:h-6 md:max-w-[28vw] lg:h-[1.6875rem] lg:max-w-none xl:h-[1.875rem] 2xl:h-8" />
          </Link>

          <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center px-4 2xl:px-6">
            <nav
              ref={navRef}
              className="flex items-center justify-center gap-4 2xl:gap-8 min-w-0"
            >
              {/* Platform dropdown */}
              <div className="relative">
                <button
                  type="button"
                  aria-label="Platform menu"
                  aria-expanded={openDropdown === "platform"}
                  onClick={() =>
                    setOpenDropdown((o) =>
                      o === "platform" ? null : "platform",
                    )
                  }
                  className={dropdownButtonClass(
                    openDropdown === "platform" || isPlatformActive,
                  )}
                >
                  Platform
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      openDropdown === "platform" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "platform" ? (
                  <HeaderDesktopPlatformMenu isPathActive={isPathActive} />
                ) : null}
              </div>

              {/* Resources */}
              <div className="relative">
                <button
                  type="button"
                  aria-label="Resources menu"
                  aria-expanded={openDropdown === "resources"}
                  onClick={() =>
                    setOpenDropdown((o) =>
                      o === "resources" ? null : "resources",
                    )
                  }
                  className={dropdownButtonClass(
                    openDropdown === "resources" || isResourcesActive,
                  )}
                >
                  Resources
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      openDropdown === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "resources" && (
                  <div className="absolute left-0 top-full z-[9999] mt-2 w-max max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-background py-2 pl-2 pr-3 shadow-xl sm:pl-3 sm:pr-4">
                    {RESOURCE_NAV_LINKS.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        isActive={isPathActive(item.path)}
                        className="block whitespace-nowrap px-5 py-3 rounded-lg hover:bg-muted/30"
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
                  className={dropdownButtonClass(
                    openDropdown === "company" || isCompanyActive,
                  )}
                >
                  Company
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      openDropdown === "company" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "company" && (
                  <div className="absolute left-0 top-full z-[9999] mt-2 w-max max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-background py-2 pl-2 pr-3 shadow-xl sm:pl-3 sm:pr-4">
                    {COMPANY_NAV_LINKS.map((item) => (
                      <NavItem
                        key={item.path}
                        to={item.path}
                        isActive={isPathActive(item.path)}
                        className="block whitespace-nowrap px-5 py-3 rounded-lg hover:bg-muted/30"
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={`${DOCS_URL}/`}
                className={`font-heading ${RIBBON_NAV_TEXT_CLASS} shrink-0 whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md px-2 py-2 xl:px-3 xl:py-2.5 -mx-1`}
              >
                Documentation
              </a>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-3 2xl:gap-4">
              <Button
                variant="ghost"
                className={`${RIBBON_NAV_TEXT_CLASS} h-10 px-2 xl:px-3 font-medium text-muted-foreground hover:text-foreground whitespace-nowrap`}
                asChild
              >
                <a
                  href={APP_AUTOMATION_LOGIN_URL}
                  target="_blank"
                  rel={EXTERNAL_NOINDEX_SUBDOMAIN_REL}
                >
                  Log In
                </a>
              </Button>
              <Button
                className={`rounded-lg bg-primary px-4 py-2.5 xl:px-6 ${RIBBON_NAV_TEXT_CLASS} font-semibold text-primary-foreground hover:bg-primary/90 whitespace-nowrap`}
                asChild
              >
                <Link href={PATHS.BOOK_DEMO}>Sign Up</Link>
              </Button>
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="relative z-20 flex items-center justify-center shrink-0 h-11 w-11 min-h-[2.75rem] min-w-[2.75rem] p-2 text-foreground transition-colors hover:text-primary xl:hidden touch-manipulation"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu. Nested collapsible, stacks below header bar */}
      {isMobileMenuOpen && (
        <div className="relative z-20 border-t border-border bg-background xl:hidden w-full shrink-0">
          <nav className="section-full py-5 pb-6">
            <div className="space-y-0">
              {/* Platform */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSection("platform")}
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md ${isPlatformActive ? "bg-muted/25 font-semibold" : ""}`}
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
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md`}
                      >
                        <ChevronRight
                          size={16}
                          className={`shrink-0 transition-transform ${
                            mobileExpanded["platform-solution"]
                              ? "rotate-90"
                              : ""
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
                              className="block py-2 px-2 hover:bg-muted/30 rounded-md"
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
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md`}
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
                              className="block py-2 px-2 hover:bg-muted/30 rounded-md"
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
                        className={`flex w-full items-center gap-2 py-2 px-2 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md`}
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
                              className="block py-2 px-2 hover:bg-muted/30 rounded-md"
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

              {/* Resources */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSection("resources")}
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md ${isResourcesActive ? "bg-muted/25 font-semibold" : ""}`}
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
                        className="block py-2 px-2 hover:bg-muted/30 rounded-md"
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
                  className={`flex w-full items-center gap-2 py-2.5 px-4 text-left ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md ${isCompanyActive ? "bg-muted/25 font-semibold" : ""}`}
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
                        className="block py-2 px-2 hover:bg-muted/30 rounded-md"
                      >
                        {item.label}
                      </NavItem>
                    ))}
                  </div>
                )}
              </div>

              <a
                href={`${DOCS_URL}/`}
                className={`flex items-center gap-2 py-2.5 px-4 ${NAV_TEXT_CLASS} font-medium text-foreground hover:bg-muted/30 rounded-md`}
              >
                <span className="w-[18px] shrink-0" aria-hidden />
                Documentation
              </a>
            </div>

            <div className="flex gap-3 pt-4 px-4 border-t border-border mt-2 pt-4">
              <Button variant="outline" className="flex-1 text-base" asChild>
                <a
                  href={APP_AUTOMATION_LOGIN_URL}
                  target="_blank"
                  rel={EXTERNAL_NOINDEX_SUBDOMAIN_REL}
                >
                  Log In
                </a>
              </Button>
              <Button
                className="flex-1 bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href={PATHS.BOOK_DEMO}>Sign Up</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
