/**
 * 📖 CTABlock 詞彙
 * 
 * 組合：Headline + Text? + ButtonGroup
 * 用途：需要用戶採取行動的地方
 * 
 * 這是轉換率的關鍵詞彙
 */

import { cn } from '@/lib/utils';
import { Headline } from '../atoms/Headline';
import { Text } from '../atoms/Text';
import { ButtonGroup } from '../molecules/ButtonGroup';
import type { CTABlockProps } from './types';

export function CTABlock({
  title,
  titleSize = 'lg',
  subtitle,
  primaryButton,
  secondaryButton,
  align = 'center',
  className,
}: CTABlockProps) {
  const alignClass = {
    left: '',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={cn(alignClass, className)}>
      {/* Title */}
      <Headline size={titleSize} align={align} className="mb-4">
        {title}
      </Headline>

      {/* Subtitle */}
      {subtitle && (
        <Text
          size="lg"
          variant="muted"
          align={align}
          maxWidth="lg"
          className="mb-8"
        >
          {subtitle}
        </Text>
      )}

      {/* Buttons */}
      <ButtonGroup
        primary={{
          text: primaryButton.text,
          href: primaryButton.href,
          icon: primaryButton.icon || 'arrow',
        }}
        secondary={secondaryButton ? {
          text: secondaryButton.text,
          href: secondaryButton.href,
        } : undefined}
        align={align}
        size="lg"
      />
    </div>
  );
}

export default CTABlock;

