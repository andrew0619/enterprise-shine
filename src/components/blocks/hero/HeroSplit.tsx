/**
 * Hero 變體：左文右圖型
 * 
 * 左側文字，右側產品圖或示意圖
 * 適合：產品頁、服務頁
 */

import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HeroProps } from './types';

export function HeroSplit({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  sideImage,
  badge,
  stats,
  className = '',
  height = 'large',
}: HeroProps) {
  const heightClass = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[65vh]',
  }[height];

  return (
    <section className={`relative ${heightClass} flex items-center overflow-hidden ${className}`}>
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />
      
      <div className="relative container px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左側：文字內容 */}
          <div className="space-y-8">
            {/* Badge */}
            {badge && (
              <Badge 
                variant="secondary" 
                className="px-4 py-1.5 text-sm animate-fade-in"
              >
                {badge}
              </Badge>
            )}
            
            {/* 主標題 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animation-delay-100">
              {title}
            </h1>
            
            {/* 副標題 */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in animation-delay-200">
                {subtitle}
              </p>
            )}
            
            {/* 描述 */}
            {description && (
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-300">
                {description}
              </p>
            )}
            
            {/* CTA 按鈕 */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
              {primaryCta && (
                <Button size="lg" asChild className="h-12 px-8 text-base">
                  <a href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
                  <a href={secondaryCta.href}>
                    <Play className="mr-2 h-4 w-4" />
                    {secondaryCta.text}
                  </a>
                </Button>
              )}
            </div>
            
            {/* 統計數字 */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-8 pt-4 animate-fade-in animation-delay-500">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 右側：圖片 */}
          <div className="relative animate-fade-in animation-delay-300">
            {sideImage ? (
              <div className="relative">
                {/* 背景裝飾 */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-accent/5 rounded-3xl blur-2xl" />
                
                {/* 圖片容器 */}
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <img
                    src={sideImage}
                    alt={title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* 裝飾元素 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
              </div>
            ) : (
              /* 佔位圖 */
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50">
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-2">🖼️</div>
                  <p>產品圖片</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


