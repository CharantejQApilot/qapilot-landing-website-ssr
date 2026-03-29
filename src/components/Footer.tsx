"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Instagram,
} from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import Link from "next/link";
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { DOCS_URL, STATUS_URL } from "@/lib/constants";
import {
  PLATFORM_BY_SOLUTION,
  PLATFORM_BY_ROLE,
  PATHS,
} from "@/lib/routes";

const toolsLinks = [
  {
    name: "Heal My Prompt",
    productHuntUrl:
      "https://www.producthunt.com/products/healmyprompt?launch=heal-my-prompt",
  },
  {
    name: "Price My Agent",
    productHuntUrl:
      "https://www.producthunt.com/products/price-my-agent?launch=price-my-agent",
  },
  {
    name: "Tools For Agent",
    productHuntUrl:
      "https://www.producthunt.com/products/tools-for-agent-2?launch=tools-for-agent-2",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/qapilot/",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://x.com/QApilot", icon: Twitter },
  { name: "GitHub", href: "https://github.com/qapilothq", icon: Github },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@QApilot",
    icon: Youtube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/qapilot/",
    icon: Instagram,
  },
];

const FooterLink = ({
  to,
  children,
  external = false,
}: {
  to: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  const className =
    "text-sm 2xl:text-base text-white/50 hover:text-white transition-colors";
  if (external || to.startsWith("http"))
    return (
      <a href={to} target="_blank" rel="noopener" className={className}>
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
  const { openForm } = useHubSpotForm();

  return (
    <>
      {/* CTA Section — full-width, brand blue / navy (Harvey-style edge-to-edge) */}
      <section className="relative section-navy overflow-hidden section-edge w-full">
        <div className="absolute inset-0 bg-dot-pattern-subtle opacity-20 pointer-events-none" />
        <div className="section-full relative z-10 py-20 md:py-28 2xl:py-36">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 2xl:gap-16">
            <div className="flex-1 w-full min-w-0 text-left">
              <h2 className={cn(marketingSectionH2Class, "text-white mb-4")}>
                Start Your Journey to Smarter Mobile App QE
              </h2>
              <p className="text-white/40 text-base leading-relaxed md:text-lg 2xl:text-xl max-w-xl 2xl:max-w-2xl">
                Rethink how your team approaches mobile testing.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={() => openForm()}
                size="lg"
                className="bg-white text-[hsl(var(--navy))] hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-lg 2xl:text-lg 2xl:px-10 2xl:py-7"
              >
                Get Access →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links — edge-to-edge */}
      <footer className="section-dark border-t border-white/[0.06] section-edge w-full">
        <div className="section-full py-16 2xl:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 items-start justify-items-start">
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                By Solution
              </h3>
              <ul className="space-y-3">
                {PLATFORM_BY_SOLUTION.map((item) => (
                  <li key={item.path + item.label}>
                    <FooterLink to={item.path}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                By Role
              </h3>
              <ul className="space-y-3">
                {PLATFORM_BY_ROLE.map((item) => (
                  <li key={item.path + item.label}>
                    <FooterLink to={item.path}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink to={PATHS.BLOGS}>Blogs</FooterLink>
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
                  <FooterLink to={`${STATUS_URL}/`} external>
                    Status Page
                  </FooterLink>
                </li>
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink to={PATHS.ABOUT}>About Us</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.CAREERS}>Careers</FooterLink>
                </li>
                <li>
                  <FooterLink to={PATHS.NEWS}>News & Updates</FooterLink>
                </li>
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                Our Tools
              </h3>
              <ul className="space-y-3">
                {toolsLinks.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.productHuntUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-sm 2xl:text-base text-white/50 hover:text-white transition-colors"
                    >
                      {tool.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 w-full">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
                Follow Us
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-2 text-sm 2xl:text-base text-white/50 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon size={16} className="shrink-0" />
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/30">
              Copyright © {new Date().getFullYear()} | Powered by QApilot
            </div>
            <div className="flex items-center gap-6">
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
