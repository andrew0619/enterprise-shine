/**
 * 🧬 TextGroup 分子
 * 
 * 組合：Badge + Headline + Text + Text
 * 職責：顯示一組標題文字
 */

import { cn } from '@/lib/utils';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import { TagBadge } from '../atoms/TagBadge';
import type { TextGroupProps } from './types';

const maxWidthClasses: Record<NonNullable<TextGroupProps['maxWidth']>, string> = {
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
  none: '',
};

export function TextGroup({
  badge,
  title,
  titleAs = 'h2',
  titleSize = 'lg',
  subtitle,
  description,
  align = 'left',
  maxWidth = 'none',
  animated = false,
  className,
}: TextGroupProps) {
  return (
    <div 
      className={cn(
        maxWidthClasses[maxWidth],
        align === 'center' && 'mx-auto text-center',
        align === 'right' && 'ml-auto text-right',
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <div className={cn('mb-4', animated && 'animate-fade-in')}>
          <TagBadge variant="outline">{badge}</TagBadge>
        </div>
      )}

      {/* Title */}
      <Headline
        as={titleAs}
        size={titleSize}
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
    </div>
  );
}

export default TextGroup;

