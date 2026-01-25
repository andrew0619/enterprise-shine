/**
 * 🧱 Divider 積木
 * 
 * 用途：視覺分隔
 * 敘事角色：Rhythm Control - "視覺呼吸"
 */

import { cn } from '@/lib/utils';
import type { DividerProps } from './types';

export function Divider({
  variant = 'line',
  height = 'md',
  className,
  id,
}: DividerProps) {
  // Space variant - 純空白
  if (variant === 'space') {
    const heightClasses = {
      sm: 'h-8 md:h-12',
      md: 'h-12 md:h-16',
      lg: 'h-16 md:h-24',
    }[height];

    return <div id={id} className={cn(heightClasses, className)} />;
  }

  // Line variant
  if (variant === 'line') {
    return (
      <div id={id} className={cn('py-4', className)}>
        <div className="container">
          <hr className="border-border" />
        </div>
      </div>
    );
  }

  // Dots variant
  if (variant === 'dots') {
    return (
      <div id={id} className={cn('py-8 text-center', className)}>
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
        </div>
      </div>
    );
  }

  // Gradient variant
  return (
    <div id={id} className={cn('py-4', className)}>
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
}

export default Divider;

