/**
 * 📖 詞彙字典類型定義 (Vocabulary)
 * 
 * 詞彙 = 原子的有意義組合
 * 每個詞彙是網站設計中反覆出現的「最小有意義單位」
 * 
 * 層級關係：
 * - 原子 (Atoms) = 字母
 * - 詞彙 (Vocabulary) = 單詞 ← 這層！
 * - 分子 (Molecules) = 片語
 * - 組織 (Organisms) = 句子
 */

import type { ReactNode } from 'react';
import type { HeadingLevel, HeadingSize, TextAlign, ButtonIcon } from '../atoms/types';

// ============================================================
// 1. PageHeader 詞彙 - 頁面/區塊標題組合
// ============================================================
// 用於：每個區塊的開頭
// 組合：Badge? + Headline + Subtitle? + Description?

export interface PageHeaderProps {
  /** 徽章（可選） */
  badge?: string;
  /** 主標題 */
  title: string;
  /** 標題層級 */
  as?: HeadingLevel;
  /** 標題尺寸 */
  size?: HeadingSize;
  /** 副標題（可選） */
  subtitle?: string;
  /** 描述文字（可選） */
  description?: string;
  /** 對齊方式 */
  align?: TextAlign;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 動畫 */
  animated?: boolean;
  className?: string;
}

// ============================================================
// 2. CTABlock 詞彙 - 行動呼籲組合
// ============================================================
// 用於：需要用戶採取行動的地方
// 組合：Headline + Text? + ButtonGroup

export interface CTABlockProps {
  /** 標題 */
  title: string;
  /** 標題尺寸 */
  titleSize?: HeadingSize;
  /** 副標題（可選） */
  subtitle?: string;
  /** 主要按鈕 */
  primaryButton: {
    text: string;
    href: string;
    icon?: ButtonIcon;
  };
  /** 次要按鈕（可選） */
  secondaryButton?: {
    text: string;
    href: string;
  };
  /** 對齊方式 */
  align?: TextAlign;
  className?: string;
}

// ============================================================
// 3. FeaturePoint 詞彙 - 單個功能點
// ============================================================
// 用於：功能列表中的每一項
// 組合：IconBox + Headline + Text + Link?

export interface FeaturePointProps {
  /** 圖標名稱 */
  icon?: string;
  /** 標題 */
  title: string;
  /** 描述 */
  description: string;
  /** 連結（可選） */
  link?: {
    text: string;
    href: string;
  };
  /** 樣式變體 */
  variant?: 'minimal' | 'card' | 'bordered';
  /** 是否高亮 */
  highlight?: boolean;
  className?: string;
}

// ============================================================
// 4. StatPoint 詞彙 - 單個統計點
// ============================================================
// 用於：數據展示
// 組合：IconBox? + Stat + Text?

export interface StatPointProps {
  /** 圖標（可選） */
  icon?: string;
  /** 數值 */
  value: string;
  /** 標籤 */
  label: string;
  /** 前綴 */
  prefix?: string;
  /** 後綴 */
  suffix?: string;
  /** 描述（可選） */
  description?: string;
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'icon-card';
  className?: string;
}

// ============================================================
// 5. Testimonial 詞彙 - 見證引言
// ============================================================
// 用於：客戶推薦
// 組合：Quote + Avatar + AuthorInfo

export interface TestimonialProps {
  /** 引言內容 */
  quote: string;
  /** 作者姓名 */
  author: string;
  /** 職稱 */
  role: string;
  /** 公司 */
  company: string;
  /** 頭像 URL */
  avatar?: string;
  /** 公司 Logo URL */
  logo?: string;
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'featured';
  className?: string;
}

// ============================================================
// 6. PriceTag 詞彙 - 價格標籤
// ============================================================
// 用於：定價展示
// 組合：Badge? + ProductName + Price + Description + Button

export interface PriceTagProps {
  /** 標籤（如 "最受歡迎"） */
  badge?: string;
  /** 產品名稱 */
  name: string;
  /** 價格 */
  price: string;
  /** 價格單位 */
  unit?: string;
  /** 或者顯示非價格文字（如 "即將推出"） */
  headline?: string;
  /** 描述 */
  description: string;
  /** 按鈕文字 */
  ctaText: string;
  /** 按鈕連結 */
  ctaHref: string;
  /** 是否高亮 */
  featured?: boolean;
  className?: string;
}

// ============================================================
// 7. MediaBlock 詞彙 - 媒體內容塊
// ============================================================
// 用於：圖片/影片展示
// 組合：Image + Overlay? + PlayButton? + Caption?

export interface MediaBlockProps {
  /** 圖片/影片 URL */
  src: string;
  /** 替代文字 */
  alt: string;
  /** 是否是影片（顯示播放按鈕） */
  isVideo?: boolean;
  /** 覆蓋層內容 */
  overlay?: ReactNode;
  /** 說明文字 */
  caption?: string;
  /** 寬高比 */
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  /** 圓角 */
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

// ============================================================
// 8. TrustStrip 詞彙 - 信任標語
// ============================================================
// 用於：Logo 牆上方的標語
// 組合：Text + LogoGroup

export interface TrustStripProps {
  /** 標語文字 */
  text?: string;
  /** Logo 列表 */
  logos: Array<{
    src: string;
    name: string;
    href?: string;
  }>;
  /** 展示方式 */
  variant?: 'static' | 'marquee';
  /** 是否灰階 */
  grayscale?: boolean;
  className?: string;
}

// ============================================================
// 9. SplitBlock 詞彙 - 左右分割
// ============================================================
// 用於：圖文並排展示
// 組合：ContentSide + MediaSide

export interface SplitBlockProps {
  /** 標題 */
  title: string;
  /** 副標題 */
  subtitle?: string;
  /** 描述（可以是多段） */
  descriptions?: string[];
  /** 按鈕（可選） */
  button?: {
    text: string;
    href: string;
  };
  /** 媒體內容 */
  media: {
    src: string;
    alt: string;
    isVideo?: boolean;
  };
  /** 媒體位置 */
  mediaPosition?: 'left' | 'right';
  className?: string;
}

// ============================================================
// 10. ListItem 詞彙 - 列表項目
// ============================================================
// 用於：功能列表、優勢列表
// 組合：Icon? + Text

export interface ListItemProps {
  /** 圖標 */
  icon?: string;
  /** 是否使用勾選圖標 */
  checkmark?: boolean;
  /** 文字內容 */
  text: string;
  /** 樣式變體 */
  variant?: 'simple' | 'inline';
  className?: string;
}

