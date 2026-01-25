/**
 * Content 積木類型定義
 * 
 * 用於純內容展示的基礎積木
 */

import type { 
  BaseBlockProps, 
  TitledBlockProps,
  ImageConfig,
  CTAConfig,
  AlignmentVariant,
} from '../types';

// ============================================================
// Section Header (區塊標題)
// ============================================================

export interface SectionHeaderProps extends BaseBlockProps {
  /** 徽章文字 */
  badge?: string;
  /** 標題 */
  title: string;
  /** 副標題 */
  subtitle?: string;
  /** 描述 */
  description?: string;
  /** 對齊方式 */
  alignment?: AlignmentVariant;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// ============================================================
// Text Block (純文字區塊)
// ============================================================

export type TextBlockVariant = 'prose' | 'highlight' | 'quote';

export interface TextBlockProps extends BaseBlockProps {
  /** 內容（支援 HTML） */
  content: string;
  /** 顯示變體 */
  variant?: TextBlockVariant;
  /** 對齊方式 */
  alignment?: AlignmentVariant;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================
// Image Block (圖片區塊)
// ============================================================

export type ImageBlockVariant = 'full' | 'contained' | 'rounded';

export interface ImageBlockProps extends BaseBlockProps {
  /** 圖片配置 */
  image: ImageConfig;
  /** 顯示變體 */
  variant?: ImageBlockVariant;
  /** 圖片說明 */
  caption?: string;
  /** 是否可點擊放大 */
  lightbox?: boolean;
}

// ============================================================
// Split Content (左右分割)
// ============================================================

export type SplitContentVariant = 'image-left' | 'image-right';

export interface SplitContentProps extends TitledBlockProps {
  /** 描述文字 */
  description?: string;
  /** 項目列表 */
  items?: string[];
  /** 圖片 */
  image: ImageConfig;
  /** CTA */
  cta?: CTAConfig;
  /** 布局方向 */
  variant?: SplitContentVariant;
}

// ============================================================
// Rich Content (富文本)
// ============================================================

export interface RichContentProps extends BaseBlockProps {
  /** HTML 內容 */
  html: string;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================
// Divider (分隔線)
// ============================================================

export type DividerVariant = 'line' | 'dots' | 'gradient' | 'space';

export interface DividerProps extends BaseBlockProps {
  /** 顯示變體 */
  variant?: DividerVariant;
  /** 高度（space variant 用） */
  height?: 'sm' | 'md' | 'lg';
}

