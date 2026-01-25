/**
 * 📝 Content Schema - 內容資料結構
 * 
 * 定義頁面內容的標準資料格式
 * 這是「數據與視圖分離」的關鍵
 */

// ============================================================
// 基礎類型
// ============================================================

/** 按鈕配置 */
export interface ButtonContent {
  text: string;
  href: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  icon?: 'arrow' | 'external' | 'download' | 'play' | 'none';
}

/** 圖片配置 */
export interface ImageContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Logo 配置 */
export interface LogoContent {
  src: string;
  name: string;
  href?: string;
}

/** 統計數據配置 */
export interface StatContent {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  icon?: string;
}

/** FAQ 配置 */
export interface FAQContent {
  question: string;
  answer: string;
}

/** 功能配置 */
export interface FeatureContent {
  icon?: string;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

/** 見證配置 */
export interface TestimonialContent {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  logo?: string;
}

/** 定價配置 */
export interface PricingContent {
  badge?: string;
  name: string;
  price?: string;
  unit?: string;
  headline?: string;
  description: string;
  features?: string[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
}

// ============================================================
// 區塊內容類型
// ============================================================

/** Hero 區塊內容 */
export interface HeroContent {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta: ButtonContent;
  secondaryCta?: ButtonContent;
  image?: ImageContent;
  stats?: StatContent[];
  logos?: LogoContent[];
}

/** Trust 區塊內容 */
export interface TrustContent {
  title?: string;
  logos: LogoContent[];
  stats?: StatContent[];
  variant?: 'logos' | 'stats' | 'both';
}

/** Features 區塊內容 */
export interface FeaturesContent {
  badge?: string;
  title: string;
  subtitle?: string;
  features: FeatureContent[];
  layout?: 'grid' | 'bento' | 'alternating';
  columns?: 2 | 3 | 4;
}

/** Testimonials 區塊內容 */
export interface TestimonialsContent {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialContent[];
  variant?: 'single' | 'grid' | 'carousel';
}

/** CTA 區塊內容 */
export interface CTAContent {
  title: string;
  subtitle?: string;
  primaryCta: ButtonContent;
  secondaryCta?: ButtonContent;
  backgroundImage?: ImageContent;
}

/** FAQ 區塊內容 */
export interface FAQSectionContent {
  title?: string;
  subtitle?: string;
  items: FAQContent[];
  cta?: ButtonContent;
}

/** Pricing 區塊內容 */
export interface PricingAreaContent {
  title?: string;
  subtitle?: string;
  plans: PricingContent[];
}

/** Case Study 區塊內容 */
export interface CaseStudyContent {
  title: string;
  subtitle?: string;
  testimonial?: TestimonialContent;
  stats: StatContent[];
  media?: {
    src: string;
    alt: string;
    isVideo?: boolean;
  };
}

// ============================================================
// 完整頁面內容
// ============================================================

/** 完整頁面內容結構 */
export interface PageContent {
  /** 頁面元數據 */
  meta: {
    title: string;
    description: string;
    slug: string;
  };
  
  /** Hero 區塊 */
  hero: HeroContent;
  
  /** Trust 區塊（可選） */
  trust?: TrustContent;
  
  /** Features 區塊（可選） */
  features?: FeaturesContent;
  
  /** Case Study 區塊（可選） */
  caseStudy?: CaseStudyContent;
  
  /** Testimonials 區塊（可選） */
  testimonials?: TestimonialsContent;
  
  /** Pricing 區塊（可選） */
  pricing?: PricingAreaContent;
  
  /** CTA 區塊 */
  cta: CTAContent;
  
  /** FAQ 區塊（可選） */
  faq?: FAQSectionContent;
}

// ============================================================
// 範例數據
// ============================================================

export const samplePageContent: PageContent = {
  meta: {
    title: 'AI GPU 雲端服務',
    description: '企業級 GPU 雲端服務，讓您的 AI 模型跑得更快',
    slug: 'home',
  },
  
  hero: {
    badge: 'NEW',
    title: 'AI 驅動的 GPU 雲端服務',
    subtitle: '讓您的 AI 模型跑得更快',
    description: '企業級 GPU 基礎設施，支援大規模 AI 訓練和推理',
    primaryCta: { text: '免費試用', href: '/signup', icon: 'arrow' },
    secondaryCta: { text: '觀看演示', href: '/demo', icon: 'play' },
    stats: [
      { value: '99.9', suffix: '%', label: 'Uptime' },
      { value: '10,000', suffix: '+', label: 'GPUs' },
      { value: '500', label: 'Clients' },
    ],
  },
  
  trust: {
    title: '受到全球領先企業的信賴',
    logos: [
      { src: '/logos/nvidia.png', name: 'NVIDIA' },
      { src: '/logos/meta.png', name: 'Meta' },
      { src: '/logos/openai.png', name: 'OpenAI' },
    ],
    variant: 'logos',
  },
  
  features: {
    badge: 'FEATURES',
    title: '強大的功能',
    subtitle: '為企業級 AI 打造',
    features: [
      { icon: 'Cpu', title: '高效能運算', description: '最新的 NVIDIA GPU' },
      { icon: 'Zap', title: '快速部署', description: '分鐘級啟動時間' },
      { icon: 'Shield', title: '企業安全', description: 'SOC 2 認證' },
    ],
    layout: 'grid',
    columns: 3,
  },
  
  cta: {
    title: '準備好開始了嗎？',
    subtitle: '免費試用 14 天，無需信用卡',
    primaryCta: { text: '立即開始', href: '/signup', icon: 'arrow' },
    secondaryCta: { text: '聯繫銷售', href: '/contact' },
  },
  
  faq: {
    title: '常見問題',
    items: [
      { question: '如何開始？', answer: '註冊帳號後即可開始使用...' },
      { question: '價格是多少？', answer: '我們提供靈活的定價方案...' },
    ],
    cta: { text: '還有問題？聯繫我們', href: '/contact' },
  },
};

// ============================================================
// 驗證函數
// ============================================================

/** 驗證頁面內容是否完整 */
export function validatePageContent(content: Partial<PageContent>): {
  valid: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  
  // 必填欄位
  if (!content.meta?.title) missing.push('meta.title');
  if (!content.meta?.description) missing.push('meta.description');
  if (!content.hero?.title) missing.push('hero.title');
  if (!content.hero?.primaryCta) missing.push('hero.primaryCta');
  if (!content.cta?.title) missing.push('cta.title');
  if (!content.cta?.primaryCta) missing.push('cta.primaryCta');
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

