/**
 * 🔬 Avatar 原子
 * 
 * 最小單位：頭像
 * 職責：顯示用戶頭像或首字母
 */

import { cn } from '@/lib/utils';
import type { AvatarProps } from './types';

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-14 w-14 text-lg',
};

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: AvatarProps) {
  // 獲取首字母
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          sizeClasses[size],
          'rounded-full object-cover',
          className
        )}
      />
    );
  }

  // 無圖片時顯示首字母
  return (
    <div
      className={cn(
        sizeClasses[size],
        'rounded-full bg-primary/10 text-primary font-medium',
        'flex items-center justify-center',
        className
      )}
    >
      {initials}
    </div>
  );
}

export default Avatar;

