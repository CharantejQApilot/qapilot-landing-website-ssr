"use client";

import { Button } from "@/components/ui/button";
import { Activity, Shield, BarChart3, Zap } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const EnterpriseHeroSection = () => {
  const { openForm } = useHubSpotForm();
  
  const handleRequestDemoClick = () => {
    openForm("Request Demo", "Fill out the form below and our team will get in touch to schedule a personalized demo.");
  };
  return <section className="relative flex min-h-screen items-center justify-center section-edge w-full py-20 pb-8">
      {/* Enterprise Scale Background - Abstract Network Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Grid Pattern */}
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Network Nodes */}
          <circle cx="200" cy="150" r="3" fill="hsl(var(--primary))" />
          <circle cx="400" cy="200" r="3" fill="hsl(var(--primary))" />
          <circle cx="600" cy="120" r="3" fill="hsl(var(--primary))" />
          <circle cx="800" cy="180" r="3" fill="hsl(var(--primary))" />
          <circle cx="1000" cy="140" r="3" fill="hsl(var(--primary))" />
          
          {/* Connecting Lines */}
          <line x1="200" y1="150" x2="400" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="400" y1="200" x2="600" y2="120" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="600" y1="120" x2="800" y2="180" stroke="hsl(var(--primary))" strokeWidth="1" />
          <line x1="800" y1="180" x2="1000" y2="140" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>

      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-8 items-center min-h-0 sm:gap-12 sm:min-h-[60vh] lg:grid-cols-2 lg:min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground animate-fade-in-up md:text-5xl lg:text-6xl">
              <span className="text-primary">Enterprise-Grade</span> Mobile App Testing with QApilot
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              Deliver flawless apps at scale with autonomous smoke tests, flexible execution, and enterprise-ready reporting.
            </p>

            {/* Stats Highlights */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{
            animationDelay: '0.4s'
          }}>
              <div className="flex items-center gap-4 bg-card/50 border border-border rounded-xl p-4 hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100K+</div>
                  <div className="text-sm text-muted-foreground">Test Steps Executed</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-card/50 border border-border rounded-xl p-4 hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Platform Uptime</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-fade-in-up" style={{
            animationDelay: '0.6s'
          }}>
            <Button 
              onClick={handleRequestDemoClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:shadow-glow relative overflow-hidden"
            >
              <span className="relative z-10">Request Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_2s_ease-in-out_infinite] transform skew-x-12"></div>
              </Button>
            </div>
          </div>

          {/* Right Side - Dashboard Visual */}
          <div className="relative animate-fade-in-up" style={{
          animationDelay: '0.8s'
        }}>
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl hover:shadow-glow transition-all duration-500">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <img src="/lovable-uploads/40829201-8081-41bf-8cf5-1e80143e6a36.png" alt="QApilot" className="h-5 w-5 object-contain" />
                  </div>
                  <span className="font-semibold text-foreground">QApilot Enterprise</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                {/* Running Tests Section */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Execution Reports</p>
                  
                  {/* Test Progress Bars with Animation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-foreground">Crawler_Report_Android</span>
                      </div>
                      <span className="text-xs text-muted-foreground">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full animate-[width_3s_ease-in-out_infinite]" style={{
                      width: '95%'
                    }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-foreground">Crawler_Report_IOS</span>
                      </div>
                      <span className="text-xs text-muted-foreground">67%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full animate-[width_4s_ease-in-out_infinite]" style={{
                      width: '67%'
                    }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#fb923c' }}></div>
                        <span className="text-sm text-foreground">Cross-Platform Tests</span>
                      </div>
                      <span className="text-xs text-muted-foreground">23%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: '23%', backgroundColor: '#fb923c' }}></div>
                    </div>
                  </div>
                </div>

                {/* Device & App Info */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Environment, Device, and App Info</p>
                  <div className="space-y-2">
                    {/* iOS Device */}
                    <div className="flex items-center gap-3 p-2 bg-card/50 rounded-lg border border-border/50">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-sm"></div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-label="Apple logo">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">iPhone 15 Pro Max</div>
                        <div className="text-xs text-muted-foreground">iOS 17.2</div>
                      </div>
                    </div>
                    <div className="ml-9 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 bg-muted rounded-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        </div>
                        <span className="text-foreground">com.ecom.mobile</span>
                        <span className="text-muted-foreground">V2.1.5</span>
                        
                      </div>
                    </div>

                    {/* Android Device */}
                    <div className="flex items-center gap-3 p-2 bg-card/50 rounded-lg border border-border/50">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-label="Android logo">
                        <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"></path>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">Google Pixel 8 Pro</div>
                        <div className="text-xs text-muted-foreground">Android 14</div>
                      </div>
                    </div>
                    <div className="ml-9 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 bg-muted rounded-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
                        </div>
                        <span className="text-foreground">com.gaming.stage</span>
                        <span className="text-muted-foreground">V3.0.12</span>
                        
                      </div>
                    </div>

                    {/* Another iOS Device */}
                    <div className="flex items-center gap-3 p-2 bg-card/50 rounded-lg border border-border/50">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-sm animate-pulse"></div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-label="Apple logo">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">iPad Air 5th Gen</div>
                        <div className="text-xs text-muted-foreground">iPadOS 17.1</div>
                      </div>
                    </div>
                    <div className="ml-9 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 bg-muted rounded-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        </div>
                        <span className="text-foreground">com.banking.prod</span>
                        <span className="text-muted-foreground">V4.2.8</span>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border sm:gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">847</div>
                    <div className="text-xs text-muted-foreground">Tests Run</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-500">823</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500">24</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements around Dashboard */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg animate-float">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center shadow-lg animate-float" style={{
            animationDelay: '1s'
          }}>
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default EnterpriseHeroSection;