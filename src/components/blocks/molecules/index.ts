/**
 * 🧬 分子組件模組 (Molecules)
 * 
 * 由多個原子組成的功能單元
 * 每個分子完成一個小型任務
 */

// 文字分子
export { TextGroup } from './TextGroup';

// 互動分子
export { ButtonGroup } from './ButtonGroup';

// 數據分子
export { StatGroup } from './StatGroup';

// 媒體分子
export { LogoGroup } from './LogoGroup';

// 卡片分子
export { FeatureCard } from './FeatureCard';
export { TestimonialCard } from './TestimonialCard';

// Types
export type {
  TextGroupProps,
  ButtonGroupProps,
  ButtonConfig,
  StatGroupProps,
  LogoGroupProps,
  LogoItem,
  LogoGroupVariant,
  FeatureCardProps,
  TestimonialCardProps,
  FAQItemProps,
} from './types';

