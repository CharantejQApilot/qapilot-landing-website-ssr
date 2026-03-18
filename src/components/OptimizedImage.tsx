"use client";

import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized Image Component for Core Web Vitals
 * - Prevents layout shift with explicit dimensions and aspect-ratio
 * - Uses native lazy loading for below-fold images
 * - Supports priority loading for LCP images
 * - Provides fallback for loading states
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading,
  sizes,
  aspectRatio,
  objectFit = 'cover',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Calculate aspect ratio from width/height if not provided
  const computedAspectRatio = aspectRatio || (width && height ? `${width}/${height}` : undefined);
  
  // Determine loading strategy
  const loadingStrategy = loading || (priority ? 'eager' : 'lazy');

  useEffect(() => {
    // Check if image is already loaded (cached)
    if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imgStyle: React.CSSProperties = {
    aspectRatio: computedAspectRatio,
    objectFit,
    width: '100%',
    height: 'auto',
  };

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={imgStyle}
        role="img"
        aria-label={alt}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loadingStrategy}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`${className} ${isLoaded ? '' : 'bg-muted'}`}
      style={imgStyle}
      onLoad={handleLoad}
      onError={handleError}
      sizes={sizes}
    />
  );
};

export default OptimizedImage;
