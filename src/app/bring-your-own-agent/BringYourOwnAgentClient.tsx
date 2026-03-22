"use client";
import Footer from "@/components/Footer";
import DifferentiatorsHeroSection from "@/components/DifferentiatorsHeroSection";
import BYOAIntroSection from "@/components/BYOAIntroSection";
import BYOAFlowSection from "@/components/BYOAFlowSection";
import BYOAMindsetSection from "@/components/BYOAMindsetSection";
import SecurityReportsSection from "@/components/SecurityReportsSection";
import AutoBugFinderSection from "@/components/AutoBugFinderSection";

const BringYourOwnAgentClient = () => {
  return (
    <>
          <DifferentiatorsHeroSection />
          
          {/* BYOA Feature Section - Unified Background */}
          <div className="section-edge relative w-full overflow-hidden bg-gradient-to-b from-background via-background-alt to-background">
            {/* Shared Background Effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-[10%] left-[15%] h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="absolute top-[40%] right-[10%] h-96 w-96 rounded-full bg-accent/5 blur-3xl"></div>
              <div className="absolute bottom-[20%] left-[20%] h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
            </div>
            
            <BYOAIntroSection />
            <BYOAFlowSection />
            <BYOAMindsetSection />
          </div>
          
          {/* Security Reports & Auto Bug Finder Feature Sections */}
          <div className="section-edge relative w-full overflow-hidden bg-gradient-to-b from-background via-background-alt to-background">
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-[10%] right-[15%] h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="absolute top-[40%] left-[10%] h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
              <div className="absolute bottom-[20%] right-[20%] h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
            </div>
            
            <SecurityReportsSection />
            <AutoBugFinderSection />
          </div>
          
          <Footer />
    </>
  );
};

export default BringYourOwnAgentClient;
