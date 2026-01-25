/**
 * Hero 區塊共用型別
 */

export type HeroVariant = 'center' | 'split' | 'gradient';

export interface HeroProps {
  // 主要內容
  title: string;
  subtitle?: string;
  description?: string;
  
  // 按鈕
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  
  // 視覺
  backgroundImage?: string;
  sideImage?: string;
  
  // 標籤（如：NEW、HOT）
  badge?: string;
  
  // 統計數字
  stats?: Array<{
    value: string;
    label: string;
  }>;
  
  // Logo 牆
  logoCloud?: Array<{
    src: string;
    alt: string;
  }>;
  
  // 樣式選項
  className?: string;
  height?: 'full' | 'large' | 'medium';
  alignment?: 'left' | 'center' | 'right';
}


