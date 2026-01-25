/**
 * 🔬 TagBadge 原子
 * 
 * 最小單位：徽章/標籤
 * 職責：顯示一個小標籤
 */

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TagBadgeProps } from './types';

const sizeClasses: Record<NonNullable<TagBadgeProps['size']>, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export function TagBadge({
  children,
  variant = 'outline',
  size = 'md',
  className,
}: TagBadgeProps) {
  return (
    <Badge
      variant={variant === 'primary' ? 'default' : variant as 'default' | 'outline' | 'secondary'}
      className={cn(sizeClasses[size], className)}
    >
      {children}
    </Badge>
  );
}

export default TagBadge;

