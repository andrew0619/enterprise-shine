/**
 * CTA (Call-to-Action) 積木類型定義
 */

import type { 
  BaseBlockProps, 
  CTAConfig,
  ImageConfig,
  AlignmentVariant,
} from '../types';

// ============================================================
// CTA Banner
// ============================================================

export type CTABannerVariant = 'simple' | 'split' | 'gradient' | 'image';

export interface CTABannerProps extends BaseBlockProps {
  /** 標題 */
  title: string;
  /** 副標題/描述 */
  subtitle?: string;
  /** 主要 CTA */
  primaryCta: CTAConfig;
  /** 次要 CTA */
  secondaryCta?: CTAConfig;
  /** 顯示變體 */
  variant?: CTABannerVariant;
  /** 背景圖（image variant 用） */
  backgroundImage?: ImageConfig;
  /** 對齊方式 */
  alignment?: AlignmentVariant;
}

// ============================================================
// Contact Form
// ============================================================

export type ContactFormVariant = 'simple' | 'detailed' | 'inline';

export interface ContactFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];  // for select
}

export interface ContactFormProps extends BaseBlockProps {
  /** 表單標題 */
  title?: string;
  /** 表單描述 */
  subtitle?: string;
  /** 表單欄位 */
  fields?: ContactFormField[];
  /** 提交按鈕文字 */
  submitText?: string;
  /** 顯示變體 */
  variant?: ContactFormVariant;
  /** 提交處理函數 */
  onSubmit?: (data: Record<string, string>) => void;
  /** 附加說明 */
  disclaimer?: string;
}

// ============================================================
// Newsletter
// ============================================================

export interface NewsletterProps extends BaseBlockProps {
  /** 標題 */
  title?: string;
  /** 描述 */
  subtitle?: string;
  /** 按鈕文字 */
  buttonText?: string;
  /** placeholder */
  placeholder?: string;
  /** 提交處理 */
  onSubmit?: (email: string) => void;
}

