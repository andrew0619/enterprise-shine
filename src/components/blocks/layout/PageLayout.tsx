/**
 * 🔒 PageLayout - 頁面骨架（不可動搖的結構）
 * Narrative-UI DSL v2.0
 * 
 * 這個組件強制執行頁面結構規則：
 * - Navbar 永遠在頂部
 * - Footer 永遠在底部
 * - 內容只能放在中間
 * 
 * AI 無法把 Footer 放到頂部或 Hero 放在 Footer 後面。
 */

import { ReactNode } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

// 支持的主題 ID
export type ThemeId = 
  | 'light-corporate' 
  | 'light-navy' 
  | 'light-slate'
  | 'dark-cyan' 
  | 'dark-indigo' 
  | 'dark-black';

export interface PageLayoutProps {
  children: ReactNode;
  /** 主題 ID */
  theme?: ThemeId;
  /** 是否顯示公告欄 */
  showAnnouncement?: boolean;
  /** 是否顯示導航欄 */
  showNav?: boolean;
  /** 是否顯示頁尾 */
  showFooter?: boolean;
  /** 自定義 className */
  className?: string;
}

/**
 * 頁面骨架組件
 * 
 * @example
 * <PageLayout theme="dark-cyan">
 *   <HeroCenter {...heroProps} />
 *   <LogoCloud logos={logos} />
 *   <FeaturesGrid {...featuresProps} />
 *   <CTABanner {...ctaProps} />
 * </PageLayout>
 */
export function PageLayout({ 
  children, 
  theme = 'dark-cyan',
  showAnnouncement = true,
  showNav = true,
  showFooter = true,
  className,
}: PageLayoutProps) {
  // 根據主題設定 data-theme 屬性
  const themeMode = theme.startsWith('light-') ? 'light' : 'dark';

  return (
    <div 
      data-theme={theme}
      className={cn(
        'min-h-screen flex flex-col',
        'bg-background text-foreground',
        themeMode === 'dark' && 'dark',
        className
      )}
    >
      {/* 🔒 鎖定：公告欄位置（可選） */}
      {showAnnouncement && <AnnouncementBar />}
      
      {/* 🔒 鎖定：導航欄位置 */}
      {showNav && <Header />}
      
      {/* ✏️ 可編輯區域：頁面內容 */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* 🔒 鎖定：頁尾位置 */}
      {showFooter && <Footer />}
    </div>
  );
}

export default PageLayout;

