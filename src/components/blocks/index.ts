/**
 * 🧱 積木組件庫 (Block Component Library)
 * Narrative-UI DSL v2.0
 * 
 * 所有可複用的頁面區塊都從這裡導出
 * 
 * 使用方式：
 * import { HeroCenter, LogoCloud, CTABanner } from '@/components/blocks';
 * 
 * 組件分類（依 AIDA 敘事邏輯）：
 * 
 * 1. Hero (Attention) - 吸引注意
 * 2. Trust (Interest/Desire) - 建立信任
 * 3. Features (Interest) - 展示能力
 * 4. CTA (Action) - 推動轉換
 * 5. FAQ (Objection) - 處理異議
 * 6. Content (Support) - 內容展示
 */

// ============================================================
// Hero 區塊 - 吸引注意
// ============================================================
export * from './hero';

// ============================================================
// Trust 區塊 - 建立信任
// ============================================================
export * from './trust';

// ============================================================
// Features 區塊 - 展示能力
// ============================================================
export * from './features';

// ============================================================
// CTA 區塊 - 推動轉換
// ============================================================
export * from './cta';

// ============================================================
// FAQ 區塊 - 處理異議
// ============================================================
export * from './faq';

// ============================================================
// Content 區塊 - 內容展示
// ============================================================
export * from './content';

// ============================================================
// Layout 區塊 - 頁面骨架
// ============================================================
export * from './layout';

// ============================================================
// 共用類型
// ============================================================
export * from './types';

// 類型定義（明確導出以供 AI 編譯器使用）
export type { HeroProps, HeroVariant } from './hero/types';
export type { FeaturesProps, FeatureItem, FeaturesVariant } from './features/types';
export type { 
  LogoCloudProps, 
  StatsRowProps, 
  TestimonialsProps, 
  TrustBadgesProps 
} from './trust/types';
export type { 
  CTABannerProps, 
  ContactFormProps, 
  NewsletterProps 
} from './cta/types';
export type { 
  FAQAccordionProps, 
  FAQGridProps 
} from './faq/types';
export type { 
  SectionHeaderProps, 
  SplitContentProps, 
  DividerProps 
} from './content/types';
