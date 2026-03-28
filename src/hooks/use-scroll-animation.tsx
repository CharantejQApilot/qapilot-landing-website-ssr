"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Optimized scroll animation hook for Core Web Vitals
 * Uses IntersectionObserver for efficient visibility detection
 * Disconnects observer after element becomes visible (single trigger)
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // IntersectionObserver often fires asynchronously; if the section is already
    // in (or near) the viewport, show content immediately so it never stays opacity-0.
    if (typeof window !== "undefined") {
      const rect = currentRef.getBoundingClientRect();
      const margin = 50;
      const vh = window.innerHeight;
      if (rect.bottom >= -margin && rect.top <= vh + margin) {
        setIsVisible(true);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first visibility to save resources
          observer.disconnect();
        }
      },
      { 
        threshold,
        // Add rootMargin to trigger slightly before element is visible
        // This provides a smoother animation experience
        rootMargin: '50px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};

/**
 * Hook for lazy loading content when scrolled into view
 * Returns true when element is near viewport
 */
export const useLazyLoad = (rootMargin = '200px 0px') => {
  const ref = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return { ref, shouldLoad };
};

/**
 * Debounced scroll handler hook
 * Prevents excessive scroll event firing
 */
export const useDebounceScroll = (callback: () => void, delay = 100) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => {
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);
};
