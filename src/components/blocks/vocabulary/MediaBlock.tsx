/**
 * 📖 MediaBlock 詞彙
 * 
 * 組合：Image + Overlay? + PlayButton? + Caption?
 * 用途：圖片/影片展示
 * 
 * 這是視覺吸引力的關鍵詞彙
 */

import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text } from '../atoms/Text';
import type { MediaBlockProps } from './types';

const aspectRatioMap = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  'auto': '',
};

const roundedMap = {
  none: '',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

export function MediaBlock({
  src,
  alt,
  isVideo = false,
  overlay,
  caption,
  aspectRatio = '16:9',
  rounded = 'xl',
  className,
}: MediaBlockProps) {
  return (
    <figure className={className}>
      <div
        className={cn(
          'relative overflow-hidden',
          aspectRatioMap[aspectRatio],
          roundedMap[rounded]
        )}
      >
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay (for video or overlay content) */}
        {(isVideo || overlay) && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Play Button (for video) */}
        {isVideo && !overlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer hover:bg-primary/30 transition-colors">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Custom Overlay Content */}
        {overlay && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            {overlay}
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-3">
          <Text size="sm" variant="muted" align="center">
            {caption}
          </Text>
        </figcaption>
      )}
    </figure>
  );
}

export default MediaBlock;

