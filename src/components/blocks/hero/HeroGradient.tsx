/**
 * Hero 變體：漸層背景型
 * 
 * 大膽的漸層背景配合發光效果
 * 適合：Dark Mode、科技感頁面
 */

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HeroProps } from './types';

export function HeroGradient({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  badge,
  stats,
  logoCloud,
  className = '',
  height = 'full',
}: HeroProps) {
  const heightClass = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]',
  }[height];

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${className}`}>
      {/* 複雜漸層背景 */}
      <div className="absolute inset-0 bg-background" />
      
      {/* 主漸層 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
      
      {/* 次要漸層 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--accent)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.08),transparent_40%)]" />
      
      {/* 網格紋理 */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      
      {/* 動態光暈 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[96px] animate-pulse animation-delay-1000" />
      
      {/* 內容 */}
      <div className="relative container px-4 py-20 text-center">
        {/* Badge */}
        {badge && (
          <Badge 
            className="mb-8 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 animate-fade-in"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            {badge}
          </Badge>
        )}
        
        {/* 主標題 - 帶漸層效果 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 animate-fade-in animation-delay-100">
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        
        {/* 副標題 */}
        {subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 max-w-4xl mx-auto animate-fade-in animation-delay-200">
            {subtitle}
          </p>
        )}
        
        {/* 描述 */}
        {description && (
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-300">
            {description}
          </p>
        )}
        
        {/* CTA 按鈕 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in animation-delay-400">
          {primaryCta && (
            <Button 
              size="lg" 
              asChild 
              className="min-w-[200px] h-14 text-base relative overflow-hidden group"
            >
              <a href={primaryCta.href}>
                {/* 按鈕發光效果 */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Button>
          )}
          {secondaryCta && (
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="min-w-[200px] h-14 text-base border-border/50 hover:bg-muted/50"
            >
              <a href={secondaryCta.href}>
                {secondaryCta.text}
              </a>
            </Button>
          )}
        </div>
        
        {/* 統計數字 - 卡片式 */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 animate-fade-in animation-delay-500">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
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
          <div className="animate-fade-in animation-delay-600">
            <p className="text-sm text-muted-foreground mb-8">
              全球領先企業的共同選擇
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {logoCloud.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 底部漸層過渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}


