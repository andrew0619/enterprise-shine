/**
 * Features 變體：網格佈局
 * 
 * 經典的 3-4 欄網格展示
 * 適合：特色功能、服務項目
 */

import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { FeaturesProps } from './types';

export function FeaturesGrid({
  badge,
  title,
  subtitle,
  features,
  columns = 3,
  className = '',
  centered = true,
}: FeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

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
        
        {/* 網格 */}
        <div className={`grid gap-6 lg:gap-8 ${gridCols}`}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              {feature.icon && (
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              )}
              
              {/* 圖片（如果有） */}
              {feature.image && (
                <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-muted">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* 內容 */}
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              
              {/* 連結 */}
              {feature.link && (
                <a 
                  href={feature.link.href}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {feature.link.text}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

