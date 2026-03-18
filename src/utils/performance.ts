/**
 * Performance utilities for Core Web Vitals optimization
 */

/**
 * Debounce function to reduce frequency of expensive operations
 * Improves INP by preventing excessive handler calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 100
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit = 100
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Schedule non-critical work for idle periods
 * Improves INP by yielding to main thread
 */
export function scheduleIdleWork(
  callback: () => void,
  options: { timeout?: number } = {}
): void {
  const { timeout = 2000 } = options;
  
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for Safari
    setTimeout(callback, 1);
  }
}

/**
 * Break up long tasks into smaller chunks
 * Prevents blocking the main thread
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => void,
  chunkSize = 50
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    chunk.forEach((item, index) => processor(item, i + index));
    
    // Yield to main thread between chunks
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

/**
 * Create an intersection observer for lazy loading
 */
export function createLazyObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '200px 0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
}

/**
 * Prefetch a page on hover for faster navigation
 */
export function prefetchOnHover(href: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Mark content as non-critical for containment
 * Reduces layout recalculation costs
 */
export const containmentStyles: React.CSSProperties = {
  contain: 'layout style paint',
};

/**
 * Get optimal image sizes for responsive images
 */
export function getResponsiveSizes(containerWidth: 'full' | 'container' | 'half' | 'third'): string {
  switch (containerWidth) {
    case 'full':
      return '100vw';
    case 'container':
      return '(max-width: 1280px) 100vw, 1280px';
    case 'half':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px';
    case 'third':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 427px';
    default:
      return '100vw';
  }
}
