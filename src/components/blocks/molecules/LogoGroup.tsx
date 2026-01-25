/**
 * 🧬 LogoGroup 分子
 * 
 * 組合：多個 Logo 原子
 * 職責：顯示一組公司 Logo
 */

import { cn } from '@/lib/utils';
import { Logo } from '../atoms/Logo';
import type { LogoGroupProps } from './types';

export function LogoGroup({
  logos,
  variant = 'static',
  title,
  grayscale = true,
  columns = 6,
  className,
}: LogoGroupProps) {
  // Static Grid
  if (variant === 'static') {
    const gridCols = {
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-5',
      6: 'grid-cols-3 md:grid-cols-6',
      8: 'grid-cols-4 md:grid-cols-8',
    }[columns];

    return (
      <div className={className}>
        {title && (
          <p className="text-sm text-muted-foreground text-center mb-8">
            {title}
          </p>
        )}
        <div className={cn('grid gap-8 items-center justify-items-center', gridCols)}>
          {logos.map((logo, index) => (
            <Logo
              key={index}
              src={logo.src}
              name={logo.name}
              href={logo.href}
              grayscale={grayscale}
            />
          ))}
        </div>
      </div>
    );
  }

  // Marquee (無限滾動)
  return (
    <div className={cn('overflow-hidden', className)}>
      {title && (
        <p className="text-sm text-muted-foreground text-center mb-6">
          {title}
        </p>
      )}
      <div className="relative">
        {/* 漸變遮罩 */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* 第一組 */}
          {logos.map((logo, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
              <Logo
                src={logo.src}
                name={logo.name}
                href={logo.href}
                grayscale={grayscale}
              />
            </div>
          ))}
          {/* 複製第二組 */}
          {logos.map((logo, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
              <Logo
                src={logo.src}
                name={logo.name}
                href={logo.href}
                grayscale={grayscale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoGroup;

