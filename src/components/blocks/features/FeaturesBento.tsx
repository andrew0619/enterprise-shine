/**
 * Features 變體：Bento Grid 佈局
 * 
 * 不規則大小的卡片佈局，視覺上更有層次
 * 適合：重點功能突出展示
 */

import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { FeaturesProps } from './types';

export function FeaturesBento({
  badge,
  title,
  subtitle,
  features,
  className = '',
  centered = true,
}: FeaturesProps) {
  // 自動分配 bento 大小
  const getBentoClass = (index: number, size?: string) => {
    if (size === 'large') return 'md:col-span-2 md:row-span-2';
    if (size === 'medium') return 'md:col-span-2';
    
    // 預設模式：第一個和第四個較大
    if (index === 0) return 'md:col-span-2 md:row-span-2';
    if (index === 3) return 'md:col-span-2';
    return '';
  };

  return (
    <section className={`py-20 lg:py-32 ${className}`}>
      <div className="container px-4">
        {/* 標題區 */}
        <div className={`max-w-3xl mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
          {badge && (
            <Badge variant="outline" className="mb-4">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Bento Grid */}
        <div className="grid md:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => {
            const bentoClass = getBentoClass(index, feature.size);
            const isLarge = bentoClass.includes('row-span-2');
            
            return (
              <div
                key={feature.id}
                className={`
                  group relative overflow-hidden rounded-2xl
                  bg-card border border-border/50 
                  hover:border-primary/30 hover:shadow-xl
                  transition-all duration-300
                  ${bentoClass}
                  ${feature.highlight ? 'ring-2 ring-primary/20' : ''}
                `}
              >
                {/* 背景漸層（highlighted） */}
                {feature.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                )}
                
                <div className={`relative p-6 lg:p-8 h-full flex flex-col ${isLarge ? 'justify-between' : ''}`}>
                  {/* Icon */}
                  {feature.icon && (
                    <div className={`
                      rounded-xl bg-primary/10 flex items-center justify-center mb-6
                      group-hover:bg-primary/20 transition-colors
                      ${isLarge ? 'w-16 h-16' : 'w-12 h-12'}
                    `}>
                      <feature.icon className={`text-primary ${isLarge ? 'h-8 w-8' : 'h-6 w-6'}`} />
                    </div>
                  )}
                  
                  {/* 內容 */}
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-3 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-muted-foreground ${isLarge ? 'text-base' : 'text-sm'}`}>
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* 圖片（大卡片顯示） */}
                  {isLarge && feature.image && (
                    <div className="mt-6 -mx-8 -mb-8 aspect-video overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* 連結 */}
                  {feature.link && (
                    <a 
                      href={feature.link.href}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4"
                    >
                      {feature.link.text}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

