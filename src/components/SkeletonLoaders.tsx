"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base Skeleton component for loading states
 * Prevents CLS by matching final content dimensions
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => (
  <div className={cn("animate-pulse bg-muted rounded", className)} style={style} />
);

/**
 * Card skeleton for blog/news cards
 */
export const CardSkeleton: React.FC<{ featured?: boolean }> = ({ featured = false }) => (
  <div className="rounded-lg border border-border overflow-hidden">
    <Skeleton className={cn("w-full", featured ? "h-[200px]" : "h-[180px]")} />
    <div className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

/**
 * Grid of card skeletons
 */
export const CardGridSkeleton: React.FC<{ count?: number; columns?: 2 | 3 | 4 }> = ({ 
  count = 6, 
  columns = 3 
}) => (
  <div className={cn(
    "grid gap-6",
    columns === 2 && "grid-cols-1 md:grid-cols-2",
    columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  )}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Hero section skeleton
 */
export const HeroSkeleton: React.FC = () => (
  <div className="py-20 px-4">
    <div className="container mx-auto max-w-4xl text-center space-y-6">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <Skeleton className="h-10 w-32 mx-auto rounded-full" />
    </div>
  </div>
);

/**
 * Image skeleton with aspect ratio
 */
export const ImageSkeleton: React.FC<{ 
  aspectRatio?: string; 
  className?: string 
}> = ({ 
  aspectRatio = '16/9', 
  className 
}) => (
  <Skeleton 
    className={cn("w-full", className)} 
    style={{ aspectRatio }}
  />
);

/**
 * Text content skeleton
 */
export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          "h-4",
          i === lines - 1 ? "w-2/3" : "w-full"
        )} 
      />
    ))}
  </div>
);

export default Skeleton;
