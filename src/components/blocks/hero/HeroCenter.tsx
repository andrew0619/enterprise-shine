/**
 * Hero 變體：置中標題型
 * 
 * 最通用的 Hero 佈局，標題和 CTA 置中
 * 適合：企業首頁、產品總覽頁
 */

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HeroProps } from './types';

export function HeroCenter({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  badge,
  stats,
  logoCloud,
  className = '',
  height = 'large',
}: HeroProps) {
  const heightClass = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[65vh]',
  }[height];

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${className}`}>
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.03),transparent_50%)]" />
      
      {/* 內容 */}
      <div className="relative container px-4 py-20 text-center">
        {/* Badge */}
        {badge && (
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-1.5 text-sm animate-fade-in"
          >
            {badge}
          </Badge>
        )}
        
        {/* 主標題 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          {title}
        </h1>
        
        {/* 副標題 */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto animate-fade-in animation-delay-100">
            {subtitle}
          </p>
        )}
        
        {/* 描述 */}
        {description && (
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            {description}
          </p>
        )}
        
        {/* CTA 按鈕 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in animation-delay-300">
          {primaryCta && (
            <Button size="lg" asChild className="min-w-[180px] h-12 text-base">
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {secondaryCta && (
            <Button variant="outline" size="lg" asChild className="min-w-[180px] h-12 text-base">
              <a href={secondaryCta.href}>
                {secondaryCta.text}
              </a>
            </Button>
          )}
        </div>
        
        {/* 統計數字 */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12 animate-fade-in animation-delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Logo Cloud */}
        {logoCloud && logoCloud.length > 0 && (
          <div className="pt-8 border-t border-border/50 animate-fade-in animation-delay-500">
            <p className="text-sm text-muted-foreground mb-6">
              受到全球領先企業的信賴
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {logoCloud.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 object-contain"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

