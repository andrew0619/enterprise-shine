/**
 * 📖 SplitBlock 詞彙
 * 
 * 組合：ContentSide + MediaSide
 * 用途：左右分割的圖文展示
 * 
 * 這是講故事的關鍵詞彙
 */

import { cn } from '@/lib/utils';
import { PageHeader } from './PageHeader';
import { ActionButton } from '../atoms/ActionButton';
import { Text } from '../atoms/Text';
import { MediaBlock } from './MediaBlock';
import type { SplitBlockProps } from './types';

export function SplitBlock({
  title,
  subtitle,
  descriptions,
  button,
  media,
  mediaPosition = 'right',
  className,
}: SplitBlockProps) {
  const isMediaLeft = mediaPosition === 'left';

  return (
    <div className={cn(
      'grid lg:grid-cols-2 gap-12 items-center',
      className
    )}>
      {/* Content Side */}
      <div className={cn(isMediaLeft && 'lg:order-2')}>
        <PageHeader
          title={title}
          subtitle={subtitle}
          align="left"
          maxWidth="full"
        />

        {/* Descriptions */}
        {descriptions && descriptions.length > 0 && (
          <div className="space-y-4 mt-6">
            {descriptions.map((desc, index) => (
              <Text key={index} variant="muted">
                {desc}
              </Text>
            ))}
          </div>
        )}

        {/* Button */}
        {button && (
          <div className="mt-8">
            <ActionButton href={button.href} icon="arrow">
              {button.text}
            </ActionButton>
          </div>
        )}
      </div>

      {/* Media Side */}
      <div className={cn(isMediaLeft && 'lg:order-1')}>
        <MediaBlock
          src={media.src}
          alt={media.alt}
          isVideo={media.isVideo}
          aspectRatio="16:9"
          rounded="2xl"
        />
      </div>
    </div>
  );
}

export default SplitBlock;

