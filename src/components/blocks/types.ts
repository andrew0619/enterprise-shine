/**
 * 🧱 積木系統核心類型定義
 * Narrative-UI DSL v2.0
 * 
 * 所有積木必須遵循這些標準介面
 */

// ============================================================
// 基礎類型
// ============================================================

/** 間距變體 - 所有積木通用 */
export type SpacingVariant = 'compact' | 'default' | 'relaxed';

/** 背景變體 - 控制視覺節奏 */
export type BackgroundVariant = 
  | 'transparent'  // 透明，繼承父層背景
  | 'default'      // 使用 bg-background
  | 'muted'        // 使用 bg-muted/30（淺灰）
  | 'card'         // 使用 bg-card
  | 'dark'         // 強制深色
  | 'glass';       // 毛玻璃效果

/** 對齊方式 */
export type AlignmentVariant = 'left' | 'center' | 'right';

/** 尺寸變體 */
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';

// ============================================================
// 共用數據結構
// ============================================================

/** 按鈕/連結配置 */
export interface CTAConfig {
  text: string;
  href: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  icon?: 'arrow' | 'external' | 'download' | 'play' | 'none';
}

/** 圖片配置 */
export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/** Logo 配置 */
export interface LogoConfig {
  src: string;
  alt: string;
  href?: string;  // 可選的連結
}

/** 統計數字配置 */
export interface StatConfig {
  value: string;      // 如 "99.9%", "10,000+", "$2M"
  label: string;      // 如 "Uptime", "GPUs", "Saved"
  prefix?: string;    // 如 "$", ">"
  suffix?: string;    // 如 "%", "+"
}

/** FAQ 項目配置 */
export interface FAQItem {
  question: string;
  answer: string;
}

/** 特色項目配置 */
export interface FeatureItemConfig {
  id: string;
  icon?: string;      // Lucide icon name
  title: string;
  description: string;
  image?: ImageConfig;
  link?: CTAConfig;
  highlight?: boolean;
  size?: 'small' | 'medium' | 'large';  // For Bento layout
}

/** 見證/推薦配置 */
export interface TestimonialConfig {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: ImageConfig;
  logo?: ImageConfig;
}

/** 案例研究配置 */
export interface CaseStudyConfig {
  title: string;
  description: string;
  metrics?: StatConfig[];
  image?: ImageConfig;
  logo?: LogoConfig;
  link?: CTAConfig;
  tags?: string[];
}

// ============================================================
// 積木基礎介面
// ============================================================

/** 所有積木的基礎 Props */
export interface BaseBlockProps {
  /** 自定義 className */
  className?: string;
  /** 背景變體 */
  background?: BackgroundVariant;
  /** 間距變體 */
  spacing?: SpacingVariant;
  /** 區塊 ID（用於錨點連結） */
  id?: string;
}

/** 帶標題的積木基礎 Props */
export interface TitledBlockProps extends BaseBlockProps {
  /** 徽章文字（如 "NEW", "FEATURED"） */
  badge?: string;
  /** 區塊標題 */
  title: string;
  /** 區塊副標題 */
  subtitle?: string;
  /** 標題對齊 */
  alignment?: AlignmentVariant;
}

// ============================================================
// CSS 工具函數
// ============================================================

/** 取得間距 CSS class */
export function getSpacingClass(spacing: SpacingVariant = 'default'): string {
  const map: Record<SpacingVariant, string> = {
    compact: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    relaxed: 'py-24 md:py-32',
  };
  return map[spacing];
}

/** 取得背景 CSS class */
export function getBackgroundClass(background: BackgroundVariant = 'transparent'): string {
  const map: Record<BackgroundVariant, string> = {
    transparent: '',
    default: 'bg-background',
    muted: 'bg-muted/30',
    card: 'bg-card',
    dark: 'bg-slate-900 text-white',
    glass: 'backdrop-blur-xl bg-card/30 border-y border-border/50',
  };
  return map[background];
}

/** 取得對齊 CSS class */
export function getAlignmentClass(alignment: AlignmentVariant = 'center'): string {
  const map: Record<AlignmentVariant, string> = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  return map[alignment];
}

