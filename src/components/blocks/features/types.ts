/**
 * Features 區塊共用型別
 */

import { LucideIcon } from 'lucide-react';

export type FeaturesVariant = 'grid' | 'bento' | 'alternating';

export interface FeatureItem {
  id: string;
  icon?: LucideIcon;
  iconName?: string; // 用於動態載入
  title: string;
  description: string;
  image?: string;
  link?: {
    text: string;
    href: string;
  };
  // Bento 專用
  size?: 'small' | 'medium' | 'large';
  highlight?: boolean;
}

export interface FeaturesProps {
  // 區塊標題
  badge?: string;
  title: string;
  subtitle?: string;
  
  // 特色項目
  features: FeatureItem[];
  
  // 佈局選項
  columns?: 2 | 3 | 4;
  
  // 樣式
  className?: string;
  centered?: boolean;
}

