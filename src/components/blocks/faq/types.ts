/**
 * FAQ 積木類型定義
 */

import type { 
  BaseBlockProps, 
  TitledBlockProps,
  FAQItem,
  CTAConfig,
} from '../types';

// ============================================================
// FAQ Accordion
// ============================================================

export type FAQAccordionVariant = 'simple' | 'card' | 'bordered';

export interface FAQAccordionProps extends TitledBlockProps {
  /** FAQ 項目列表 */
  items: FAQItem[];
  /** 顯示變體 */
  variant?: FAQAccordionVariant;
  /** 最大寬度 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** 底部 CTA */
  cta?: CTAConfig;
  /** 是否預設展開第一個 */
  defaultOpen?: boolean;
}

// ============================================================
// FAQ Grid (多欄顯示)
// ============================================================

export interface FAQGridProps extends TitledBlockProps {
  /** FAQ 項目列表 */
  items: FAQItem[];
  /** 列數 */
  columns?: 2 | 3;
}

// ============================================================
// FAQ with Categories
// ============================================================

export interface FAQCategory {
  name: string;
  icon?: string;
  items: FAQItem[];
}

export interface FAQCategorizedProps extends TitledBlockProps {
  /** 分類 FAQ */
  categories: FAQCategory[];
}

