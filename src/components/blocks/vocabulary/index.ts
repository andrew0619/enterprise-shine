/**
 * 📖 詞彙字典模組 (Vocabulary)
 * 
 * 詞彙 = 原子的有意義組合
 * 每個詞彙是網站設計中反覆出現的「最小有意義單位」
 * 
 * 10 個核心詞彙：
 * 1. PageHeader - 頁面/區塊標題
 * 2. CTABlock - 行動呼籲
 * 3. FeaturePoint - 功能點
 * 4. StatPoint - 統計點
 * 5. Testimonial - 見證
 * 6. PriceTag - 價格標籤
 * 7. MediaBlock - 媒體區塊
 * 8. TrustStrip - 信任標語
 * 9. SplitBlock - 左右分割
 * 10. ListItem - 列表項目
 */

// 詞彙組件
export { PageHeader } from './PageHeader';
export { CTABlock } from './CTABlock';
export { FeaturePoint } from './FeaturePoint';
export { StatPoint } from './StatPoint';
export { Testimonial } from './Testimonial';
export { PriceTag } from './PriceTag';
export { MediaBlock } from './MediaBlock';
export { TrustStrip } from './TrustStrip';
export { SplitBlock } from './SplitBlock';
export { ListItem } from './ListItem';

// Types
export type {
  PageHeaderProps,
  CTABlockProps,
  FeaturePointProps,
  StatPointProps,
  TestimonialProps,
  PriceTagProps,
  MediaBlockProps,
  TrustStripProps,
  SplitBlockProps,
  ListItemProps,
} from './types';

