/**
 * 🧱 SplitContent 積木
 * 
 * 用途：左右分割的內容展示（圖文並茂）
 * 敘事角色：Feature Highlight - "重點說明"
 */

import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { SplitContentProps } from './types';

export function SplitContent({
  badge,
  title,
  subtitle,
  description,
  items,
  image,
  cta,
  variant = 'image-right',
  alignment = 'left',
  background = 'default',
  spacing = 'default',
  className,
  id,
}: SplitContentProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  const isImageLeft = variant === 'image-left';

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        <div className={cn(
          'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
          isImageLeft && 'lg:flex-row-reverse'
        )}>
          {/* Content */}
          <div className={cn(
            isImageLeft && 'lg:order-2'
          )}>
            {/* Badge */}
            {badge && (
              <Badge 
                variant="outline" 
                className="mb-4 px-4 py-1.5 text-sm"
              >
                {badge}
              </Badge>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl text-muted-foreground mb-4">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="text-muted-foreground mb-6">
                {description}
              </p>
            )}

            {/* List Items */}
            {items && items.length > 0 && (
              <ul className="space-y-3 mb-8">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            {cta && (
              <Button asChild size="lg">
                <a href={cta.href}>
                  {cta.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Image */}
          <div className={cn(
            'relative',
            isImageLeft && 'lg:order-1'
          )}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  'w-full h-auto object-cover',
                  image.className
                )}
              />
            </div>
            {/* 裝飾元素 */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitContent;

