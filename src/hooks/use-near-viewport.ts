"use client";

import { useEffect, useRef, useState } from "react";

type UseNearViewportOptions = {
  /** IntersectionObserver rootMargin. Default preloads ~300px before entering view. */
  rootMargin?: string;
  threshold?: number;
  /** When true, stays enabled after first intersection (default). */
  once?: boolean;
};

/**
 * True when the ref element is near or inside the viewport.
 * Used to defer heavy embeds/animations until users scroll close. Visuals unchanged once active.
 */
export function useNearViewport<T extends Element = HTMLDivElement>(
  options: UseNearViewportOptions = {},
) {
  const { rootMargin = "300px 0px", threshold = 0, once = true } = options;
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNear(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsNear(false);
        }
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, isNear };
}
