/**
 * 🔬 原子組件類型定義 (Atoms)
 * 
 * 最小不可分割的 UI 單位
 * 每個原子只負責一件事
 */

import type { ReactNode } from 'react';

// ============================================================
// 文字原子 (Text Atoms)
// ============================================================

/** 標題層級 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

/** 標題尺寸 */
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm';

/** 標題對齊 */
export type TextAlign = 'left' | 'center' | 'right';

export interface HeadlineProps {
  /** 標題內容 */
  children: ReactNode;
  /** HTML 標籤層級 */
  as?: HeadingLevel;
  /** 視覺尺寸 */
  size?: HeadingSize;
  /** 對齊方式 */
  align?: TextAlign;
  /** 是否有動畫 */
  animated?: boolean;
  /** 自定義 className */
  className?: string;
}

export interface TextProps {
  /** 文字內容 */
  children: ReactNode;
  /** 文字大小 */
  size?: 'sm' | 'base' | 'lg' | 'xl';
  /** 文字顏色 */
  variant?: 'default' | 'muted' | 'primary' | 'inverse';
  /** 對齊方式 */
  align?: TextAlign;
  /** 最大寬度（限制行長） */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 徽章原子 (Badge Atom)
// ============================================================

export type BadgeVariant = 'default' | 'outline' | 'primary' | 'secondary';

export interface TagBadgeProps {
  /** 徽章文字 */
  children: ReactNode;
  /** 樣式變體 */
  variant?: BadgeVariant;
  /** 尺寸 */
  size?: 'sm' | 'md';
  /** 圖標（Lucide icon name） */
  icon?: string;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 按鈕原子 (Button Atom)
// ============================================================

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIcon = 'arrow' | 'external' | 'download' | 'play' | 'none';

export interface ActionButtonProps {
  /** 按鈕文字 */
  children: ReactNode;
  /** 連結 */
  href?: string;
  /** 樣式變體 */
  variant?: ButtonVariant;
  /** 尺寸 */
  size?: ButtonSize;
  /** 右側圖標 */
  icon?: ButtonIcon;
  /** 是否全寬 */
  fullWidth?: boolean;
  /** 點擊事件 */
  onClick?: () => void;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 統計原子 (Stat Atom)
// ============================================================

export interface StatProps {
  /** 數值 */
  value: string;
  /** 標籤 */
  label: string;
  /** 前綴（如 $, >） */
  prefix?: string;
  /** 後綴（如 %, +） */
  suffix?: string;
  /** 樣式變體 */
  variant?: 'simple' | 'card' | 'highlight';
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 圖標原子 (Icon Atom)
// ============================================================

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconBoxProps {
  /** Lucide icon name */
  name: string;
  /** 尺寸 */
  size?: IconSize;
  /** 是否有背景 */
  withBackground?: boolean;
  /** 背景樣式 */
  backgroundVariant?: 'default' | 'primary' | 'muted';
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 圖片原子 (Image Atom)
// ============================================================

export type ImageFit = 'cover' | 'contain' | 'fill';
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ImageProps {
  /** 圖片來源 */
  src: string;
  /** 替代文字 */
  alt: string;
  /** 寬度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 填充方式 */
  fit?: ImageFit;
  /** 圓角 */
  rounded?: ImageRounded;
  /** 是否有陰影 */
  shadow?: boolean;
  /** 是否灰階 */
  grayscale?: boolean;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// Logo 原子 (Logo Atom)
// ============================================================

export interface LogoProps {
  /** 圖片來源 */
  src: string;
  /** 公司名稱 */
  name: string;
  /** 連結 */
  href?: string;
  /** 高度 */
  height?: 'sm' | 'md' | 'lg';
  /** 是否灰階 */
  grayscale?: boolean;
  /** 自定義 className */
  className?: string;
}

// ============================================================
// 頭像原子 (Avatar Atom)
// ============================================================

export interface AvatarProps {
  /** 圖片來源 */
  src?: string;
  /** 名稱（用於生成首字母） */
  name: string;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 自定義 className */
  className?: string;
}

