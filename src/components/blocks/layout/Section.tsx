/**
 * 🏗️ Section 容器組件
 * 
 * 用途：包裝詞彙/分子，控制背景、間距、視覺節奏
 * 這是 NDMD 系統的「句法結構」
 * 
 * 每個 Section 就是一個「段落」，包含多個「詞彙」
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// 類型定義
// ============================================================

export type SectionBackground = 
  | 'transparent'  // 透明，繼承父層
  | 'default'      // 預設背景 bg-background
  | 'muted'        // 淺灰 bg-muted/30
  | 'card'         // 卡片色 bg-card
  | 'dark'         // 深色
  | 'glass'        // 毛玻璃
  | 'gradient';    // 漸層

export type SectionSpacing = 'none' | 'compact' | 'default' | 'relaxed';

export type SectionWidth = 'full' | 'container' | 'narrow';

export interface SectionProps {
  children: ReactNode;
  /** 區塊 ID（用於錨點連結） */
  id?: string;
  /** 背景變體 */
  background?: SectionBackground;
  /** 間距變體 */
  spacing?: SectionSpacing;
  /** 內容寬度 */
  width?: SectionWidth;
  /** 是否有頂部分隔線 */
  dividerTop?: boolean;
  /** 是否有底部分隔線 */
  dividerBottom?: boolean;
  /** 自定義 className */
  className?: string;
  /** 內容 className */
  contentClassName?: string;
}

// ============================================================
// CSS 映射
// ============================================================

const backgroundClasses: Record<SectionBackground, string> = {
  transparent: '',
  default: 'bg-background',
  muted: 'bg-muted/30',
  card: 'bg-card',
  dark: 'bg-slate-900 text-white',
  glass: 'backdrop-blur-xl bg-card/30 border-y border-border/50',
  gradient: 'bg-gradient-to-br from-primary/10 via-background to-accent/10',
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  compact: 'py-12 md:py-16',
  default: 'py-16 md:py-24',
  relaxed: 'py-24 md:py-32',
};

const widthClasses: Record<SectionWidth, string> = {
  full: '',
  container: 'container',
  narrow: 'container max-w-4xl',
};

// ============================================================
// 組件
// ============================================================

export function Section({
  children,
  id,
  background = 'transparent',
  spacing = 'default',
  width = 'container',
  dividerTop = false,
  dividerBottom = false,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        dividerTop && 'border-t border-border',
        dividerBottom && 'border-b border-border',
        className
      )}
    >
      <div className={cn(widthClasses[width], contentClassName)}>
        {children}
      </div>
    </section>
  );
}

// ============================================================
// 預設組合（常用配置）
// ============================================================

/** Hero 區塊 - 大間距，透明背景 */
export function HeroSection({ children, ...props }: Omit<SectionProps, 'spacing'>) {
  return (
    <Section spacing="relaxed" {...props}>
      {children}
    </Section>
  );
}

/** Trust 區塊 - 緊湊間距，毛玻璃背景 */
export function TrustSection({ children, ...props }: Omit<SectionProps, 'spacing' | 'background'>) {
  return (
    <Section spacing="compact" background="glass" {...props}>
      {children}
    </Section>
  );
}

/** Feature 區塊 - 預設間距，淺灰背景 */
export function FeatureSection({ children, ...props }: Omit<SectionProps, 'background'>) {
  return (
    <Section background="muted" {...props}>
      {children}
    </Section>
  );
}

/** CTA 區塊 - 預設間距，深色背景 */
export function CTASection({ children, ...props }: Omit<SectionProps, 'background'>) {
  return (
    <Section background="dark" {...props}>
      {children}
    </Section>
  );
}

export default Section;

