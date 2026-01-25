/**
 * 🧱 LogoCloud 積木
 * 
 * 用途：展示合作夥伴/客戶 Logo，建立信任感
 * 敘事角色：Social Proof - "大公司都在用"
 */

import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { LogoCloudProps } from './types';

export function LogoCloud({
  logos,
  variant = 'static',
  title = '受到全球領先企業的信賴',
  grayscale = true,
  columns = 6,
  background = 'muted',
  spacing = 'compact',
  className,
  id,
}: LogoCloudProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  // Static Grid Layout
  if (variant === 'static' || variant === 'grid') {
    const gridCols = {
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-5',
      6: 'grid-cols-3 md:grid-cols-6',
      8: 'grid-cols-4 md:grid-cols-8',
    }[columns];

    return (
      <section id={id} className={baseClasses}>
        <div className="container">
          {title && (
            <p className="text-sm text-muted-foreground text-center mb-8">
              {title}
            </p>
          )}
          <div className={cn('grid gap-8 items-center justify-items-center', gridCols)}>
            {logos.map((logo, index) => (
              <LogoItem 
                key={index} 
                logo={logo} 
                grayscale={grayscale} 
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Marquee Layout (無限滾動)
  return (
    <section id={id} className={cn(baseClasses, 'overflow-hidden')}>
      <div className="container mb-6">
        {title && (
          <p className="text-sm text-muted-foreground text-center">
            {title}
          </p>
        )}
      </div>
      <div className="relative">
        {/* 漸變遮罩 */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* 第一組 */}
          {logos.map((logo, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
              <LogoItem logo={logo} grayscale={grayscale} />
            </div>
          ))}
          {/* 複製第二組實現無縫循環 */}
          {logos.map((logo, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 mx-6 md:mx-10">
              <LogoItem logo={logo} grayscale={grayscale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 單個 Logo 項目
function LogoItem({ 
  logo, 
  grayscale 
}: { 
  logo: LogoCloudProps['logos'][0]; 
  grayscale: boolean;
}) {
  const img = (
    <img
      src={logo.src}
      alt={logo.alt}
      className={cn(
        'h-8 md:h-10 w-auto object-contain transition-all duration-300',
        grayscale && 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
      )}
    />
  );

  if (logo.href) {
    return (
      <a 
        href={logo.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {img}
      </a>
    );
  }

  return img;
}

export default LogoCloud;

