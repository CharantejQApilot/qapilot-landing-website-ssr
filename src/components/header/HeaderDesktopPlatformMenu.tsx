"use client";

import type { LucideIcon } from "lucide-react";
import {
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
  PenLine,
} from "lucide-react";
import { NavItem } from "@/components/header/HeaderNavItem";
import { PLATFORM_AI_AGENTS, PLATFORM_BY_ROLE, PLATFORM_BY_SOLUTION } from "@/lib/routes";

const NAV_TEXT_CLASS = "text-[15px]";

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
  PenLine,
};

export default function HeaderDesktopPlatformMenu({
  isPathActive,
}: {
  isPathActive: (path: string) => boolean;
}) {
  return (
    <div className="absolute left-0 top-full z-[9999] mt-2 w-max max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-background px-7 py-6 shadow-xl sm:px-8 sm:py-7 lg:px-9 lg:py-8">
      <div className="grid w-max max-w-full grid-cols-3 gap-8 sm:gap-9 lg:gap-10 xl:gap-12">
        <div className="min-w-0">
          <div className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}>By Solution</div>
          <ul className="space-y-2">
            {PLATFORM_BY_SOLUTION.map((item) => {
              const Icon = PLATFORM_ICONS[item.icon];
              return (
                <li key={item.path + item.label}>
                  <NavItem
                    to={item.path}
                    isActive={isPathActive(item.path)}
                    className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-muted/30"
                  >
                    {Icon && <Icon size={18} className="shrink-0 text-muted-foreground" />}
                    {item.label}
                  </NavItem>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="min-w-0">
          <div className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}>By Role</div>
          <ul className="space-y-2">
            {PLATFORM_BY_ROLE.map((item) => {
              const Icon = PLATFORM_ICONS[item.icon];
              return (
                <li key={item.path + item.label}>
                  <NavItem
                    to={item.path}
                    isActive={isPathActive(item.path)}
                    className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-muted/30"
                  >
                    {Icon && <Icon size={18} className="shrink-0 text-muted-foreground" />}
                    <span className="min-w-0 leading-snug">{item.label}</span>
                  </NavItem>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="min-w-0">
          <div className={`${NAV_TEXT_CLASS} font-medium text-muted-foreground mb-4`}>AI Agents</div>
          <ul className="space-y-2">
            {PLATFORM_AI_AGENTS.map((item) => {
              const Icon = PLATFORM_ICONS[item.icon];
              return (
                <li key={item.path + item.label}>
                  <NavItem
                    to={item.path}
                    isActive={isPathActive(item.path)}
                    className="flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-muted/30"
                  >
                    {Icon && <Icon size={18} className="shrink-0 text-muted-foreground" />}
                    {item.label}
                  </NavItem>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
