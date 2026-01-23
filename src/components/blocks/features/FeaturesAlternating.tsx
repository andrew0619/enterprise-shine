/**
 * Features 變體：左右交錯佈局
 * 
 * 圖文交錯展示，適合詳細說明
 * 適合：產品功能詳解、服務流程
 */

import { Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { FeaturesProps } from './types';

export function FeaturesAlternating({
  badge,
  title,
  subtitle,
  features,
  className = '',
  centered = true,
}: FeaturesProps) {
  return (
    <section className={`py-20 lg:py-32 ${className}`}>
      <div className="container px-4">
        {/* 標題區 */}
        <div className={`max-w-3xl mb-20 ${centered ? 'mx-auto text-center' : ''}`}>
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
        
        {/* 交錯內容 */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={feature.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* 文字側 */}
                <div className={`space-y-6 ${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:order-2'}`}>
                  {/* Icon */}
                  {feature.icon && (
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                  )}
                  
                  {/* 標題 */}
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {feature.title}
                  </h3>
                  
                  {/* 描述 */}
                  <p className="text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  
                  {/* 要點列表（如果描述夠長可以拆成列表） */}
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">企業級安全性與合規性</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">99.99% 服務可用性保證</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">24/7 專業技術支援</span>
                    </li>
                  </ul>
                  
                  {/* CTA */}
                  {feature.link && (
                    <Button variant="outline" asChild className="mt-4">
                      <a href={feature.link.href}>
                        {feature.link.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
                
                {/* 圖片側 */}
                <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {feature.image ? (
                    <div className="relative">
                      {/* 背景裝飾 */}
                      <div className={`
                        absolute -inset-4 rounded-3xl blur-2xl
                        ${isEven 
                          ? 'bg-gradient-to-br from-primary/10 to-accent/5' 
                          : 'bg-gradient-to-bl from-accent/10 to-primary/5'
                        }
                      `} />
                      
                      {/* 圖片 */}
                      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto object-cover aspect-[4/3]"
                        />
                      </div>
                    </div>
                  ) : (
                    /* 佔位圖 */
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50">
                      <div className="text-center text-muted-foreground">
                        <div className="text-5xl mb-2">📊</div>
                        <p>功能示意圖</p>
                      </div>
                    </div>
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

