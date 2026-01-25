/**
 * 🔬 Logo 原子
 * 
 * 最小單位：單個 Logo
 * 職責：顯示一個公司/品牌 Logo
 */

import { cn } from '@/lib/utils';
import type { LogoProps } from './types';

const heightClasses: Record<NonNullable<LogoProps['height']>, string> = {
  sm: 'h-6 md:h-8',
  md: 'h-8 md:h-10',
  lg: 'h-10 md:h-12',
};

export function Logo({
  src,
  name,
  href,
  height = 'md',
  grayscale = false,
  className,
}: LogoProps) {
  const img = (
    <img
      src={src}
      alt={name}
      className={cn(
        heightClasses[height],
        'w-auto object-contain transition-all duration-300',
        grayscale && 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100',
        className
      )}
    />
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        title={name}
        className="block"
      >
        {img}
      </a>
    );
  }

  return img;
}

export default Logo;

