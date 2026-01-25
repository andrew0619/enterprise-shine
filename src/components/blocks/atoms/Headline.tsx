/**
 * 🔬 Headline 原子
 * 
 * 最小單位：標題文字
 * 職責：顯示一個標題
 */

import { cn } from '@/lib/utils';
import type { HeadlineProps } from './types';

const sizeClasses: Record<NonNullable<HeadlineProps['size']>, string> = {
  xl: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight',
  lg: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  md: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  sm: 'text-xl md:text-2xl font-semibold',
};

const alignClasses: Record<NonNullable<HeadlineProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Headline({
  children,
  as: Tag = 'h2',
  size = 'lg',
  align = 'left',
  animated = false,
  className,
}: HeadlineProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        alignClasses[align],
        animated && 'animate-fade-in',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export default Headline;

