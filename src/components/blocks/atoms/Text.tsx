/**
 * 🔬 Text 原子
 * 
 * 最小單位：段落文字
 * 職責：顯示一段文字
 */

import { cn } from '@/lib/utils';
import type { TextProps } from './types';

const sizeClasses: Record<NonNullable<TextProps['size']>, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl md:text-2xl',
};

const variantClasses: Record<NonNullable<TextProps['variant']>, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  inverse: 'text-white',
};

const alignClasses: Record<NonNullable<TextProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

const maxWidthClasses: Record<NonNullable<TextProps['maxWidth']>, string> = {
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
  none: '',
};

export function Text({
  children,
  size = 'base',
  variant = 'default',
  align = 'left',
  maxWidth = 'none',
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        alignClasses[align],
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </p>
  );
}

export default Text;

