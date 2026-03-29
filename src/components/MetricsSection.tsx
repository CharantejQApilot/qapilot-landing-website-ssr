"use client";

import { useEffect, useState, useRef } from 'react';
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 10, suffix: 'K+', label: 'Test Steps Generated' },
  { value: 130, suffix: 'K+', label: 'Test Steps Recorded' },
  { value: 1.7, suffix: 'Mn+', label: 'Test Steps Executed' },
  { value: 1500, suffix: '+', label: 'Critical Bugs Surfaced' },
  { value: 2400, suffix: '+', label: 'Hours Saved for QE Teams' },
];

const useCountUp = (end: number, duration: number = 2000, startCounting: boolean) => {
  const [count, setCount] = useState(0);
  const isDecimal = end % 1 !== 0;

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = easeOutQuart * end;
      setCount(isDecimal ? Math.round(value * 10) / 10 : Math.floor(value));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);
  return count;
};

const MetricCard = ({ metric, startCounting, isLast }: { metric: Metric; startCounting: boolean; isLast: boolean }) => {
  const count = useCountUp(metric.value, 2000, startCounting);
  const isDecimal = metric.value % 1 !== 0;
  /* 5 columns only from 1280px so labels + numbers fit on one line; below that 1 or 2 cols */
  const borderClasses = !isLast
    ? 'border-b border-border min-[1280px]:border-b-0 sm:border-r border-border'
    : '';

  return (
    <div className={`px-4 py-5 sm:px-6 sm:py-8 2xl:px-8 2xl:py-10 min-w-0 ${borderClasses}`}>
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-muted-foreground mb-2 sm:mb-3 break-words leading-tight">
        {metric.label}
      </p>
      <div className="font-heading text-2xl sm:text-3xl min-[1280px]:text-5xl 2xl:text-6xl font-semibold text-foreground tracking-tight tabular-nums">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}{metric.suffix}
      </div>
    </div>
  );
};

const MetricsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '20px 0px 20px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-edge w-full">
      {/* Dark banner title — edge-to-edge */}
      <div className="section-navy w-full">
        <div className="section-full py-8 sm:py-10 md:py-12 2xl:py-16 relative">
          <div className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none" />
          <h2 className={cn(marketingSectionH2Class, "text-center relative z-10 px-2")}>
            QApilot By The Numbers
          </h2>
        </div>
      </div>

      {/* Stats grid — 1 col mobile, 2 col sm; 5 col only from 1280px so labels + numbers fit on one line */}
      <div className="border-b border-border bg-background w-full">
        <div className="section-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1280px]:grid-cols-5">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                metric={metric}
                startCounting={isVisible}
                isLast={index === metrics.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
