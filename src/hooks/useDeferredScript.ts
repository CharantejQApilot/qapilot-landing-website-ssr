"use client";

import { useEffect, useRef, useCallback } from 'react';

interface DeferredScriptOptions {
  src: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to load third-party scripts after page is interactive
 * Improves LCP and FID by deferring non-critical scripts
 */
export function useDeferredScript({
  src,
  id,
  async = true,
  defer = true,
  onLoad,
  onError,
}: DeferredScriptOptions) {
  const loadedRef = useRef(false);

  const loadScript = useCallback(() => {
    if (loadedRef.current) return;
    
    // Check if script already exists
    if (id && document.getElementById(id)) {
      loadedRef.current = true;
      onLoad?.();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    if (id) script.id = id;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => {
      loadedRef.current = true;
      onLoad?.();
    };
    
    script.onerror = () => {
      onError?.(new Error(`Failed to load script: ${src}`));
    };

    document.body.appendChild(script);
  }, [src, id, async, defer, onLoad, onError]);

  useEffect(() => {
    // Wait for page to be interactive before loading
    if (document.readyState === 'complete') {
      // Use requestIdleCallback for non-critical scripts
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadScript, { timeout: 3000 });
      } else {
        setTimeout(loadScript, 1000);
      }
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadScript, 100);
      }, { once: true });
    }
  }, [loadScript]);

  return { isLoaded: loadedRef.current, load: loadScript };
}

/**
 * Utility to preconnect to origins for faster resource loading
 */
export function addPreconnect(href: string, crossOrigin = true): void {
  if (typeof document === 'undefined') return;
  
  // Check if preconnect already exists
  const existing = document.querySelector(`link[rel="preconnect"][href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  if (crossOrigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Utility to prefetch a resource
 */
export function addPrefetch(href: string): void {
  if (typeof document === 'undefined') return;
  
  const existing = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

export default useDeferredScript;
