"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, Clock, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";
import { marketingEyebrowClass, marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import {
  BOOK_DEMO_CALENDAR_URL,
  DOCS_URL,
  EXTERNAL_NOINDEX_SUBDOMAIN_REL,
  STATUS_URL,
} from "@/lib/constants";
import { MOBILE_AGENTS_TRENDING_LABS_TOOLS } from "@/lib/mobile-agents-labs-tools";
import {
  PLATFORM_BY_ROLE,
  PLATFORM_BY_SOLUTION,
  PATHS,
  QE_GUIDE_DISPLAY_NAME,
  COMPARE_NAV_LINKS,
} from "@/lib/routes";
import { SOCIAL_LINKS } from "@/lib/social-links";

/** Shared footer nav link rhythm (all columns use the same padding + gap). */
const footerColumnLinkClass =
  "text-sm leading-normal py-1.5 2xl:text-base text-white/50 hover:text-white transition-colors";

const footerColumnListClass = "flex flex-col gap-1";

const COMPLIANCE_BADGES = [
  {
    src: "/compliance-badges/soc2.png",
    alt: "SOC 2 Type 2 compliance badge",
    label: "SOC 2",
    width: 551,
    height: 700,
  },
  {
    src: "/compliance-badges/hipaa.png",
    alt: "HIPAA compliance badge",
    label: "HIPAA",
    width: 1024,
    height: 1024,
    imageScale: 1.12,
  },
] as const;

const COMPLIANCE_BADGE_FRAME_CLASS =
  "flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:h-[5.5rem] sm:w-[5.5rem] sm:p-2.5";

const ComplianceBadge = ({
  src,
  alt,
  label,
  width,
  height,
  imageScale = 1,
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  imageScale?: number;
}) => (
  <figure className="flex shrink-0 flex-col items-center gap-2.5">
    <div className={COMPLIANCE_BADGE_FRAME_CLASS}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static compliance badge asset */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
        style={
          imageScale !== 1
            ? { transform: `scale(${imageScale})`, transformOrigin: "center" }
            : undefined
        }
      />
    </div>
    <figcaption className="flex items-center gap-1.5 text-[11px] font-medium leading-none tracking-wide text-white/40 sm:text-xs">
      <Clock className="h-3 w-3 shrink-0 text-white/35" strokeWidth={2} aria-hidden />
      <span>
        <span className="sr-only">{label}: </span>
        In Progress
      </span>
    </figcaption>
  </figure>
);

const FOOTER_SOCIAL_ICON_SLUGS: Partial<Record<(typeof SOCIAL_LINKS)[number]["name"], string>> = {
  X: "x",
  YouTube: "youtube",
  Instagram: "instagram",
};

const FooterSocialIconLink = ({ social }: { social: (typeof SOCIAL_LINKS)[number] }) => (
  <a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
    aria-label={social.name}
  >
    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
      {social.name === "LinkedIn" ? (
        <Linkedin className="h-5 w-5 stroke-[1.75]" aria-hidden />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- brand marks via Simple Icons CDN
        <img
          src={`https://cdn.simpleicons.org/${FOOTER_SOCIAL_ICON_SLUGS[social.name]}/ffffff`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain opacity-80"
        />
      )}
    </span>
  </a>
);

const FooterLink = ({
  to,
  children,
  external = false,
  nofollow = false,
}: {
  to: string;
  children: React.ReactNode;
  external?: boolean;
  /** Host is noindex (app login, status); do not pass for docs/social. */
  nofollow?: boolean;
}) => {
  const className = cn("inline-block", footerColumnLinkClass);
  if (external || to.startsWith("http"))
    return (
      <a
        href={to}
        target="_blank"
        rel={nofollow ? EXTERNAL_NOINDEX_SUBDOMAIN_REL : "noopener"}
        className={className}
      >
        {children}
      </a>
    );
  if (to.startsWith("#"))
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <>
      {/* CTA Section — full-width, brand blue / navy (Harvey-style edge-to-edge) */}
      <section className="relative section-navy overflow-hidden section-edge w-full">
        <div className="absolute inset-0 bg-dot-pattern-subtle opacity-20 pointer-events-none" />
        <div className="section-full relative z-10 py-20 md:py-28 2xl:py-36">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 2xl:gap-16">
            <div className="flex-1 w-full min-w-0 text-left">
              <p className={cn(marketingEyebrowClass, "text-primary-foreground/50 mb-3 md:mb-4")}>
                Get started
              </p>
              <h2 className={cn(marketingSectionH2Class, "text-white mb-4")}>
                Start Your Journey to Smarter Mobile App QE
              </h2>
              <p className="w-full min-w-0 max-w-none text-base leading-relaxed text-white/40 md:text-lg 2xl:text-xl">
                Rethink how your team approaches mobile testing.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                size="lg"
                className="bg-white text-[hsl(var(--navy))] hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-lg 2xl:text-lg 2xl:px-10 2xl:py-7"
                asChild
              >
                <a href={BOOK_DEMO_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                  Book a Demo →
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links — edge-to-edge */}
      <footer className="section-dark border-t border-white/[0.06] section-edge w-full">
        <div className="section-full py-16 2xl:py-20">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[minmax(0,2fr)_repeat(6,minmax(0,1fr))] gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 xl:gap-x-12 mb-14 items-start justify-items-start">
            <div className="min-w-0 w-full xs:col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-1 flex flex-col gap-6 xl:max-w-md 2xl:max-w-lg">
              <Link
                href={PATHS.HOME}
                className="inline-flex min-w-0 items-center leading-none"
                aria-label="QApilot home"
              >
                <Logo className="block h-7 w-auto brightness-0 invert sm:h-8" />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-white/50 2xl:text-base">
                AI-powered mobile testing for modern teams. Ship faster with confidence.
              </p>
              <div className="flex flex-wrap items-start gap-x-8 gap-y-4 md:flex-nowrap md:gap-x-6 lg:gap-x-8">
                {COMPLIANCE_BADGES.map((badge) => (
                  <ComplianceBadge
                    key={badge.label}
                    src={badge.src}
                    alt={badge.alt}
                    label={badge.label}
                    width={badge.width}
                    height={badge.height}
                    imageScale={"imageScale" in badge ? badge.imageScale : undefined}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Follow Us
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <FooterSocialIconLink key={social.name} social={social} />
                  ))}
                </div>
              </div>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                By Solution
              </h3>
              <ul className={footerColumnListClass}>
                {PLATFORM_BY_SOLUTION.map((item) => (
                  <li key={item.path + item.label}>
                    <FooterLink to={item.path}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                By Role
              </h3>
              <ul className={footerColumnListClass}>
                {PLATFORM_BY_ROLE.map((item) => (
                  <li key={item.path + item.label}>
                    <FooterLink to={item.path}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                Resources
              </h3>
              <ul className={footerColumnListClass}>
                <li>
                  <FooterLink to={PATHS.BLOGS}>Blogs</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.QA_GUIDE}>{QE_GUIDE_DISPLAY_NAME}</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.LABS}>Labs</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.FAQS}>FAQs</FooterLink>
                </li>
                <li>
                  <FooterLink to={`${DOCS_URL}/`} external>
                    Docs
                  </FooterLink>
                </li>
                <li>
                  <FooterLink to={`${STATUS_URL}/`} external nofollow>
                    Status Page
                  </FooterLink>
                </li>
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                Compare
              </h3>
              <ul className={footerColumnListClass}>
                {COMPARE_NAV_LINKS.map((item) => (
                  <li key={item.path}>
                    <FooterLink to={item.path}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                Company
              </h3>
              <ul className={footerColumnListClass}>
                <li>
                  <FooterLink to={PATHS.ABOUT}>About Us</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.PARTNERS}>Partners</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.CAREERS}>Careers</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.EVENTS}>Events</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.NEWS}>News & Updates</FooterLink>
                </li>
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                QApilot Labs
              </h3>
              <ul className={footerColumnListClass}>
                {MOBILE_AGENTS_TRENDING_LABS_TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <FooterLink
                      to={tool.href}
                      external={tool.external ?? tool.href.startsWith("http")}
                    >
                      {tool.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-sm text-white/30">
              Copyright © {new Date().getFullYear()} | Powered by QApilot
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
              <Link
                href={PATHS.PRIVACY}
                className="text-sm text-white/30 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href={PATHS.TERMS}
                className="text-sm text-white/30 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp size={16} /> Back to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
