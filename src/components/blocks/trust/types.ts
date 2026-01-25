/**
 * Trust/SocialProof 積木類型定義
 */

import type { 
  BaseBlockProps, 
  LogoConfig, 
  StatConfig, 
  TestimonialConfig,
  CaseStudyConfig,
} from '../types';

// ============================================================
// Logo Cloud
// ============================================================

export type LogoCloudVariant = 'static' | 'marquee' | 'grid';

export interface LogoCloudProps extends BaseBlockProps {
  /** Logo 列表 */
  logos: LogoConfig[];
  /** 顯示變體 */
  variant?: LogoCloudVariant;
  /** 標題文字 */
  title?: string;
  /** 是否顯示灰階效果 */
  grayscale?: boolean;
  /** Grid 模式下的列數 */
  columns?: 4 | 5 | 6 | 8;
}

// ============================================================
// Stats Row
// ============================================================

export type StatsRowVariant = 'simple' | 'card' | 'highlight';

export interface StatsRowProps extends BaseBlockProps {
  /** 統計數據列表 */
  stats: StatConfig[];
  /** 顯示變體 */
  variant?: StatsRowVariant;
  /** 標題（可選） */
  title?: string;
  /** 列數 */
  columns?: 2 | 3 | 4;
}

// ============================================================
// Testimonials
// ============================================================

export type TestimonialsVariant = 'single' | 'carousel' | 'grid';

export interface TestimonialsProps extends BaseBlockProps {
  /** 見證列表 */
  testimonials: TestimonialConfig[];
  /** 顯示變體 */
  variant?: TestimonialsVariant;
  /** 標題 */
  title?: string;
  /** 副標題 */
  subtitle?: string;
}

// ============================================================
// Case Study
// ============================================================

export type CaseStudyVariant = 'card' | 'featured' | 'minimal';

export interface CaseStudyBlockProps extends BaseBlockProps {
  /** 案例列表 */
  cases: CaseStudyConfig[];
  /** 顯示變體 */
  variant?: CaseStudyVariant;
  /** 標題 */
  title?: string;
  /** 副標題 */
  subtitle?: string;
  /** 顯示數量限制 */
  limit?: number;
}

// ============================================================
// Trust Badges
// ============================================================

export interface TrustBadge {
  icon?: string;       // Lucide icon name
  image?: string;      // 或使用圖片
  label: string;
  description?: string;
}

export interface TrustBadgesProps extends BaseBlockProps {
  /** 徽章列表 */
  badges: TrustBadge[];
  /** 標題 */
  title?: string;
  /** 排列方式 */
  layout?: 'row' | 'grid';
}

