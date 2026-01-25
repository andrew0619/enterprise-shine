/**
 * 📖 PageHeader 詞彙
 * 
 * 組合：Badge? + Headline + Subtitle? + Description?
 * 用途：每個區塊/頁面的標題區
 * 
 * 這是最常見的詞彙，幾乎每個區塊都以它開頭
 */

import { cn } from '@/lib/utils';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import { TagBadge } from '../atoms/TagBadge';
import type { PageHeaderProps } from './types';

const maxWidthMap = {
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
  full: '',
};

export function PageHeader({
  badge,
  title,
  as = 'h2',
  size = 'lg',
  subtitle,
  description,
  align = 'center',
  maxWidth = 'lg',
  animated = false,
  className,
}: PageHeaderProps) {
  const alignClass = {
    left: '',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];

  return (
    <header className={cn(maxWidthMap[maxWidth], alignClass, className)}>
      {/* Badge */}
      {badge && (
        <div className={cn('mb-4', animated && 'animate-fade-in')}>
          <TagBadge variant="outline">{badge}</TagBadge>
        </div>
      )}

      {/* Title */}
      <Headline
        as={as}
        size={size}
        align={align}
        animated={animated}
        className="mb-4"
      >
        {title}
      </Headline>

      {/* Subtitle */}
      {subtitle && (
        <Text
          size="xl"
          variant="muted"
          align={align}
          className={cn('mb-4', animated && 'animate-fade-in animation-delay-100')}
        >
          {subtitle}
        </Text>
      )}

      {/* Description */}
      {description && (
        <Text
          size="lg"
          variant="muted"
          align={align}
          className={cn(animated && 'animate-fade-in animation-delay-200')}
        >
          {description}
        </Text>
      )}
    </header>
  );
}

export default PageHeader;

