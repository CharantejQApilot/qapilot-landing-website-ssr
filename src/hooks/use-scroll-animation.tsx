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
 * (Using useEffect caused one painted frame at full opacity before hiding. Visible flicker.)
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

function parseRootMarginPx(rootMargin: string): number {
  const top = rootMargin.trim().split(/\s+/)[0] ?? "0px";
  const n = parseFloat(top);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Lazy-load content when scrolled near the viewport.
 * Uses a callback ref and an immediate geometry check so content already on screen loads without waiting for IO.
 */
export const useLazyLoad = (rootMargin = "200px 0px") => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rootMarginRef = useRef(rootMargin);
  rootMarginRef.current = rootMargin;

  const markInView = useCallback((node: HTMLElement) => {
    const margin = parseRootMarginPx(rootMarginRef.current);
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight + margin && rect.bottom >= -margin) {
      setShouldLoad(true);
      return true;
    }
    return false;
  }, []);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || shouldLoad) return;

      if (markInView(node)) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: rootMarginRef.current },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [shouldLoad, markInView],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

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
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);
};
