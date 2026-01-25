/**
 * 🔬 Stat 原子
 * 
 * 最小單位：單個統計數據
 * 職責：顯示一個數字指標
 */

import { cn } from '@/lib/utils';
import type { StatProps } from './types';

export function Stat({
  value,
  label,
  prefix,
  suffix,
  variant = 'simple',
  className,
}: StatProps) {
  const content = (
    <>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">
        {prefix}{value}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">
        {label}
      </div>
    </>
  );

  // Simple variant
  if (variant === 'simple') {
    return (
      <div className={cn('text-center', className)}>
        {content}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={cn(
        'text-center p-6 rounded-xl bg-card border border-border',
        className
      )}>
        {content}
      </div>
    );
  }

  // Highlight variant
  return (
    <div className={cn(
      'text-center p-6 rounded-xl bg-primary/5 border border-primary/10',
      className
    )}>
      {content}
    </div>
  );
}

export default Stat;

