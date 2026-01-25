/**
 * 📖 TrustStrip 詞彙
 * 
 * 組合：Text + LogoGroup
 * 用途：信任標語 + Logo 展示
 * 
 * 這是建立即時信任的關鍵詞彙
 */

import { cn } from '@/lib/utils';
import { Text } from '../atoms/Text';
import { LogoGroup } from '../molecules/LogoGroup';
import type { TrustStripProps } from './types';

export function TrustStrip({
  text = '受到全球領先企業的信賴',
  logos,
  variant = 'static',
  grayscale = true,
  className,
}: TrustStripProps) {
  return (
    <div className={className}>
      {/* Trust Text */}
      {text && (
        <Text
          size="sm"
          variant="muted"
          align="center"
          className="mb-6"
        >
          {text}
        </Text>
      )}

      {/* Logo Group */}
      <LogoGroup
        logos={logos}
        variant={variant}
        grayscale={grayscale}
        columns={6}
      />
    </div>
  );
}

export default TrustStrip;

