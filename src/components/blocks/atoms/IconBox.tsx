/**
 * 🔬 IconBox 原子
 * 
 * 最小單位：圖標容器
 * 職責：顯示一個圖標
 */

import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IconBoxProps } from './types';

const sizeClasses: Record<NonNullable<IconBoxProps['size']>, { box: string; icon: string }> = {
  xs: { box: 'h-6 w-6', icon: 'h-3 w-3' },
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { box: 'h-12 w-12', icon: 'h-6 w-6' },
  xl: { box: 'h-14 w-14', icon: 'h-7 w-7' },
};

const bgClasses: Record<NonNullable<IconBoxProps['backgroundVariant']>, string> = {
  default: 'bg-muted',
  primary: 'bg-primary/10',
  muted: 'bg-muted/50',
};

export function IconBox({
  name,
  size = 'md',
  withBackground = false,
  backgroundVariant = 'primary',
  className,
}: IconBoxProps) {
  // 動態獲取 Lucide 圖標
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[name];
  
  if (!Icon) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  const { box, icon } = sizeClasses[size];

  if (withBackground) {
    return (
      <div 
        className={cn(
          'inline-flex items-center justify-center rounded-xl',
          box,
          bgClasses[backgroundVariant],
          className
        )}
      >
        <Icon className={cn(icon, 'text-primary')} />
      </div>
    );
  }

  return <Icon className={cn(icon, 'text-primary', className)} />;
}

export default IconBox;

