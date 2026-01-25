/**
 * 🧱 FAQGrid 積木
 * 
 * 用途：多欄顯示常見問題（適合問題較多時）
 * 敘事角色：Objection Handler - "快速找答案"
 */

import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
  getAlignmentClass,
} from '../types';
import type { FAQGridProps } from './types';

export function FAQGrid({
  items,
  title = '常見問題',
  subtitle,
  badge,
  columns = 2,
  alignment = 'center',
  background = 'default',
  spacing = 'default',
  className,
  id,
}: FAQGridProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  }[columns];

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        {/* Header */}
        <div className={cn('mb-12 max-w-3xl', getAlignmentClass(alignment))}>
          {badge && (
            <span className="inline-block text-sm font-medium text-primary mb-3">
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Grid */}
        <div className={cn('grid gap-8', gridCols)}>
          {items.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-lg">
                {item.question}
              </h3>
              <p className="text-muted-foreground">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQGrid;

