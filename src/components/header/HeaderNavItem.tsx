"use client";

import type { ReactNode } from "react";
import Link from "next/link";

const NAV_TEXT_CLASS = "text-[15px]";

export function NavItem({
  to,
  children,
  isActive,
  className = "",
  forceForeground = false,
}: {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  forceForeground?: boolean;
}) {
  const baseClass =
    `${NAV_TEXT_CLASS} font-medium transition-colors hover:text-foreground ` +
    (forceForeground ? "text-foreground" : "text-muted-foreground");
  const activeClass = isActive ? "text-foreground font-semibold bg-muted/25" : "";
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
}
