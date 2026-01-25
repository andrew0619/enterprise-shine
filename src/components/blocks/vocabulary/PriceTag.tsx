/**
 * 📖 PriceTag 詞彙
 * 
 * 組合：Badge? + ProductName + Price + Description + Button
 * 用途：定價卡片
 * 
 * 這是轉換的關鍵詞彙
 */

import { cn } from '@/lib/utils';
import { TagBadge } from '../atoms/TagBadge';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import { ActionButton } from '../atoms/ActionButton';
import type { PriceTagProps } from './types';

export function PriceTag({
  badge,
  name,
  price,
  unit,
  headline,
  description,
  ctaText,
  ctaHref,
  featured = false,
  className,
}: PriceTagProps) {
  return (
    <div
      className={cn(
        'bg-card border rounded-xl p-6 flex flex-col h-full',
        featured ? 'border-primary ring-2 ring-primary' : 'border-border',
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-2">
          <TagBadge variant="primary" size="sm">{badge}</TagBadge>
        </div>
      )}

      {/* Product Name */}
      <Headline as="h3" size="sm" className="mb-4">
        {name}
      </Headline>

      {/* Price or Headline */}
      <div className="mb-4">
        {price ? (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary">{price}</span>
            {unit && (
              <span className="text-muted-foreground ml-1">{unit}</span>
            )}
          </div>
        ) : headline ? (
          <span className="text-2xl font-bold">{headline}</span>
        ) : null}
      </div>

      {/* Description */}
      <Text variant="muted" size="sm" className="flex-grow mb-6">
        {description}
      </Text>

      {/* CTA Button */}
      <ActionButton href={ctaHref} fullWidth>
        {ctaText}
      </ActionButton>
    </div>
  );
}

export default PriceTag;

