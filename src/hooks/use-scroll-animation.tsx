"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered reveal without post-paint flicker.
 * - SSR / first paint: treat as in-view (visible) so HTML never flashes hidden→shown above the fold.
 * - useLayoutEffect runs before the browser paints after hydration: elements strictly below the
 *   viewport switch to hidden once, then IntersectionObserver reveals them on scroll.
 * (Using useEffect caused one painted frame at full opacity before hiding — visible flicker.)
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = currentRef.getBoundingClientRect();
    const vh = window.innerHeight;
    const rootMarginPx = 50;

    if (rect.top <= vh + rootMarginPx) {
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: `${rootMarginPx}px 0px` },
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
