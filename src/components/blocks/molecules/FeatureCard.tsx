/**
 * 🧬 FeatureCard 分子
 * 
 * 組合：IconBox + Headline + Text + ActionButton
 * 職責：顯示單個功能特色
 */

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconBox } from '../atoms/IconBox';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import type { FeatureCardProps } from './types';

export function FeatureCard({
  icon,
  title,
  description,
  link,
  variant = 'simple',
  highlight = false,
  className,
}: FeatureCardProps) {
  const baseClasses = {
    simple: '',
    card: 'p-6 rounded-xl bg-card border border-border',
    bordered: 'p-6 rounded-xl border border-border',
  }[variant];

  const highlightClasses = highlight 
    ? 'ring-2 ring-primary/20 bg-primary/5' 
    : '';

  return (
    <div className={cn(baseClasses, highlightClasses, className)}>
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
      <Text variant="muted" className="mb-4">
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

export default FeatureCard;

