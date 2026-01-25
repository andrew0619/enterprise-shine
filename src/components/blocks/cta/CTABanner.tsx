/**
 * 🧱 CTABanner 積木
 * 
 * 用途：呼籲行動，推動轉換
 * 敘事角色：Action - "現在就行動"
 */

import { ArrowRight, ExternalLink, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
  getAlignmentClass,
} from '../types';
import type { CTABannerProps } from './types';

// 圖標映射
const iconMap = {
  arrow: ArrowRight,
  external: ExternalLink,
  download: Download,
  play: Play,
  none: null,
};

export function CTABanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'simple',
  backgroundImage,
  alignment = 'center',
  background = 'dark',
  spacing = 'default',
  className,
  id,
}: CTABannerProps) {
  // Image variant 有自己的背景處理
  if (variant === 'image' && backgroundImage) {
    return (
      <section 
        id={id} 
        className={cn(
          getSpacingClass(spacing),
          'relative overflow-hidden',
          className
        )}
      >
        {/* 背景圖 */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        {/* 內容 */}
        <div className="container relative z-10">
          <div className={cn('max-w-3xl text-white', getAlignmentClass(alignment))}>
            <CTAContent 
              title={title}
              subtitle={subtitle}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              isDark={true}
            />
          </div>
        </div>
      </section>
    );
  }

  // Gradient variant
  if (variant === 'gradient') {
    return (
      <section 
        id={id} 
        className={cn(
          getSpacingClass(spacing),
          'relative overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground',
          className
        )}
      >
        {/* 裝飾元素 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="container relative z-10">
          <div className={cn('max-w-3xl', getAlignmentClass(alignment))}>
            <CTAContent 
              title={title}
              subtitle={subtitle}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              isDark={true}
              isGradient={true}
            />
          </div>
        </div>
      </section>
    );
  }

  // Split variant
  if (variant === 'split') {
    return (
      <section 
        id={id} 
        className={cn(
          getSpacingClass(spacing),
          getBackgroundClass(background),
          className
        )}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton cta={primaryCta} isPrimary={true} />
              {secondaryCta && (
                <CTAButton cta={secondaryCta} isPrimary={false} />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Simple variant (default)
  return (
    <section 
      id={id} 
      className={cn(
        getSpacingClass(spacing),
        getBackgroundClass(background),
        className
      )}
    >
      <div className="container">
        <div className={cn('max-w-3xl', getAlignmentClass(alignment))}>
          <CTAContent 
            title={title}
            subtitle={subtitle}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            isDark={background === 'dark'}
          />
        </div>
      </div>
    </section>
  );
}

// CTA 內容組件
function CTAContent({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  isDark = false,
  isGradient = false,
}: {
  title: string;
  subtitle?: string;
  primaryCta: CTABannerProps['primaryCta'];
  secondaryCta?: CTABannerProps['secondaryCta'];
  isDark?: boolean;
  isGradient?: boolean;
}) {
  return (
    <>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg md:text-xl mb-8 max-w-xl',
          isDark ? 'opacity-80' : 'text-muted-foreground'
        )}>
          {subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CTAButton 
          cta={primaryCta} 
          isPrimary={true} 
          isDark={isDark}
          isGradient={isGradient}
        />
        {secondaryCta && (
          <CTAButton 
            cta={secondaryCta} 
            isPrimary={false} 
            isDark={isDark}
          />
        )}
      </div>
    </>
  );
}

// CTA 按鈕組件
function CTAButton({
  cta,
  isPrimary,
  isDark = false,
  isGradient = false,
}: {
  cta: CTABannerProps['primaryCta'];
  isPrimary: boolean;
  isDark?: boolean;
  isGradient?: boolean;
}) {
  const Icon = cta.icon !== 'none' ? iconMap[cta.icon || 'arrow'] : null;
  
  let variant = cta.variant || (isPrimary ? 'default' : 'outline');
  
  // 特殊樣式處理
  let buttonClassName = 'min-w-[160px]';
  if (isDark && isPrimary && !isGradient) {
    buttonClassName = cn(buttonClassName, 'bg-white text-black hover:bg-white/90');
  }
  if (isDark && !isPrimary) {
    buttonClassName = cn(buttonClassName, 'border-white/30 text-white hover:bg-white/10');
  }
  if (isGradient && isPrimary) {
    buttonClassName = cn(buttonClassName, 'bg-white text-primary hover:bg-white/90');
  }

  return (
    <Button
      variant={variant as 'default' | 'secondary' | 'outline' | 'ghost'}
      size="lg"
      asChild
      className={buttonClassName}
    >
      <a href={cta.href}>
        {cta.text}
        {Icon && <Icon className="ml-2 h-4 w-4" />}
      </a>
    </Button>
  );
}

export default CTABanner;

