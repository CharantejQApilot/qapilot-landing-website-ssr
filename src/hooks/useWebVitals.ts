"use client";

import { useEffect, useCallback } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Web Vitals tracking hook for Core Web Vitals monitoring
 * Tracks LCP, FID/INP, CLS, FCP, TTFB
 */
export function useWebVitals() {
  const sendToAnalytics = useCallback((metric: WebVitalMetric) => {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
        event_label: metric.id,
        non_interaction: true,
        metric_rating: metric.rating,
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, { value: metric.value, rating: metric.rating });
    }
  }, []);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Dynamically import web-vitals to avoid blocking
    const loadWebVitals = async () => {
      try {
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
        
        onCLS(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
        onINP(sendToAnalytics);
      } catch (error) {
        // web-vitals not available, skip tracking
        console.warn('Web Vitals tracking not available:', error);
      }
    };

    // Defer loading until after initial paint
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadWebVitals, { timeout: 2000 });
    } else {
      setTimeout(loadWebVitals, 1000);
    }
  }, [sendToAnalytics]);
}

export default useWebVitals;
