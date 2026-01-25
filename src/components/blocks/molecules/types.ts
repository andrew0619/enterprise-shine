/**
 * 🧬 分子組件類型定義 (Molecules)
 * 
 * 由多個原子組成的功能單元
 * 每個分子完成一個小型任務
 */

import type { 
  HeadingLevel, 
  HeadingSize, 
  TextAlign,
  ButtonVariant,
  ButtonIcon,
  StatProps,
} from '../atoms/types';

// ============================================================
// TextGroup 分子 - 標題 + 副標題 + 描述
// ============================================================

export interface TextGroupProps {
  /** 徽章文字 */
  badge?: string;
  /** 標題 */
  title: string;
  /** 標題層級 */
  titleAs?: HeadingLevel;
  /** 標題尺寸 */
  titleSize?: HeadingSize;
  /** 副標題 */
  subtitle?: string;
  /** 描述 */
  description?: string;
  /** 對齊方式 */
  align?: TextAlign;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** 是否有動畫 */
  animated?: boolean;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// ButtonGroup 分子 - 主按鈕 + 次按鈕
// ============================================================

export interface ButtonConfig {
  text: string;
  href?: string;
  variant?: ButtonVariant;
  icon?: ButtonIcon;
  onClick?: () => void;
}

export interface ButtonGroupProps {
  /** 主要按鈕 */
  primary?: ButtonConfig;
  /** 次要按鈕 */
  secondary?: ButtonConfig;
  /** 排列方向 */
  direction?: 'row' | 'column';
  /** 對齊方式 */
  align?: 'left' | 'center' | 'right';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 自定義 className */
  className?: string;
}

// ============================================================
// StatGroup 分子 - 多個統計數據
// ============================================================

export interface StatGroupProps {
  /** 統計數據列表 */
  stats: StatProps[];
  /** 列數 */
  columns?: 2 | 3 | 4;
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'highlight';
  /** 標題 */
  title?: string;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// LogoGroup 分子 - 多個 Logo
// ============================================================

export interface LogoItem {
  src: string;
  name: string;
  href?: string;
}

export type LogoGroupVariant = 'static' | 'marquee';

export interface LogoGroupProps {
  /** Logo 列表 */
  logos: LogoItem[];
  /** 顯示變體 */
  variant?: LogoGroupVariant;
  /** 標題 */
  title?: string;
  /** 是否灰階 */
  grayscale?: boolean;
  /** 列數（static 模式） */
  columns?: 4 | 5 | 6 | 8;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// FeatureCard 分子 - 單個功能卡片
// ============================================================

export interface FeatureCardProps {
  /** 圖標名稱 */
  icon?: string;
  /** 標題 */
  title: string;
  /** 描述 */
  description: string;
  /** 連結 */
  link?: {
    text: string;
    href: string;
  };
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'bordered';
  /** 是否高亮 */
  highlight?: boolean;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// TestimonialCard 分子 - 單個見證卡片
// ============================================================

export interface TestimonialCardProps {
  /** 引言 */
  quote: string;
  /** 作者姓名 */
  author: string;
  /** 職稱 */
  role: string;
  /** 公司 */
  company: string;
  /** 頭像 */
  avatar?: {
    src: string;
    alt: string;
  };
  /** 公司 Logo */
  logo?: {
    src: string;
    alt: string;
  };
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'featured';
  /** 自定義 className */
  className?: string;
}

// ============================================================
// FAQItem 分子 - 單個 FAQ
// ============================================================

export interface FAQItemProps {
  /** 問題 */
  question: string;
  /** 答案 */
  answer: string;
  /** 是否預設展開 */
  defaultOpen?: boolean;
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'bordered';
  /** 自定義 className */
  className?: string;
}

