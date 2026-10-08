import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'interactive' | 'flat';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-white dark:bg-surface-darkCard border border-slate-200/90 dark:border-surface-darkBorder shadow-sm rounded-2xl',
    glass:
      'glass-panel rounded-2xl shadow-glass dark:shadow-glass-dark',
    interactive:
      'bg-white dark:bg-surface-darkCard border border-slate-200/80 dark:border-surface-darkBorder hover:border-brand-300 dark:hover:border-brand-500/50 shadow-sm hover:shadow-lg dark:hover:shadow-brand-950/40 transition-all duration-300 rounded-2xl group',
    flat:
      'bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-2xl',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
