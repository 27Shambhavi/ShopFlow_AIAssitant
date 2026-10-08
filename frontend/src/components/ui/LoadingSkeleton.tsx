import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const variantStyles = {
    text: 'h-4 rounded-md',
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
  };

  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800/80 ${variantStyles[variant]} ${className}`}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="p-6 bg-white dark:bg-surface-darkCard border border-slate-200 dark:border-surface-darkBorder rounded-2xl flex flex-col gap-4">
    <Skeleton className="w-full h-44 rounded-xl" />
    <div className="flex justify-between items-center">
      <Skeleton className="w-1/3 h-5" />
      <Skeleton className="w-1/4 h-5" />
    </div>
    <Skeleton className="w-full h-10" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="w-1/2 h-9 rounded-xl" />
      <Skeleton className="w-1/2 h-9 rounded-xl" />
    </div>
  </div>
);
