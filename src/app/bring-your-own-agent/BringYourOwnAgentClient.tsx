"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import DifferentiatorsHeroSection from "@/components/DifferentiatorsHeroSection";
import BYOAIntroSection from "@/components/BYOAIntroSection";
import BYOAFlowSection from "@/components/BYOAFlowSection";
import BYOAMindsetSection from "@/components/BYOAMindsetSection";
import SecurityReportsSection from "@/components/SecurityReportsSection";
import AutoBugFinderSection from "@/components/AutoBugFinderSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

const BringYourOwnAgentClient = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Differentiators", path: PATHS.BRING_YOUR_OWN_AGENT }])) }} />
      <div className="min-h-screen bg-background dark relative">
        <div className="relative z-10">
          <DifferentiatorsHeroSection />
          
          {/* BYOA Feature Section - Unified Background */}
          <div className="relative bg-gradient-to-b from-background via-background-alt to-background">
            {/* Shared Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[20%] left-[20%] w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
            
            <BYOAIntroSection />
            <BYOAFlowSection />
            <BYOAMindsetSection />
          </div>
          
          {/* Security Reports & Auto Bug Finder Feature Sections */}
          <div className="relative bg-gradient-to-b from-background via-background-alt to-background">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute top-[40%] left-[10%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
            
            <SecurityReportsSection />
            <AutoBugFinderSection />
          </div>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BringYourOwnAgentClient;
