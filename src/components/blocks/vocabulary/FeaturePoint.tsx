/**
 * 📖 FeaturePoint 詞彙
 * 
 * 組合：IconBox + Headline + Text + Link?
 * 用途：功能列表中的每一項
 * 
 * 這是展示產品能力的基礎詞彙
 */

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconBox } from '../atoms/IconBox';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import type { FeaturePointProps } from './types';

export function FeaturePoint({
  icon,
  title,
  description,
  link,
  variant = 'minimal',
  highlight = false,
  className,
}: FeaturePointProps) {
  const variantClasses = {
    minimal: '',
    card: 'p-6 rounded-xl bg-card border border-border',
    bordered: 'p-6 rounded-xl border border-border',
  }[variant];

  const highlightClass = highlight ? 'ring-2 ring-primary/20 bg-primary/5' : '';

  return (
    <div className={cn(variantClasses, highlightClass, className)}>
      {/* Icon */}
      {icon && (
        <div className="mb-4">
          <IconBox
            name={icon}
            size="lg"
            withBackground
            backgroundVariant="primary"
          />
        </div>
      )}

      {/* Title */}
      <Headline as="h3" size="sm" className="mb-2">
        {title}
      </Headline>

      {/* Description */}
      <Text variant="muted" className={link ? 'mb-4' : ''}>
        {description}
      </Text>

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          {link.text}
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      )}
    </div>
  );
}

export default FeaturePoint;

