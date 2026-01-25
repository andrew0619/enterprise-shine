/**
 * Site Configuration
 * 網站功能開關與設定中樞
 * 
 * 使用方式：
 * - 設定 features 來控制功能頁面的顯示/隱藏
 * - 設定 navigation 來控制導航欄元素
 * - 設定 branding 來快速更換品牌資訊
 */

export const siteConfig = {
  // 品牌資訊
  branding: {
    name: "NexusAI",
    logo: "N", // 單字母 Logo
    tagline: "Enterprise AI Infrastructure",
  },

  // 功能模組開關
  features: {
    // 產品頁面
    products: true,
    gpuCompute: true,
    clusterEngine: true,
    inferenceEngine: true,
    modelLibrary: true,
    
    // GPU 硬體頁面
    gpus: true,
    gpuH200: true,
    gpuGB200: true,
    gpuHGXB200: true,
    
    // 解決方案
    solutions: true,
    
    // 定價
    pricing: true,
    
    // 開發者
    developers: true,
    demoApps: true,
    docs: true,
    
    // 公司頁面
    blog: true,
    about: true,
    partners: true,
    careers: true,
    
    // 特殊功能
    studio: true,
    contact: true,
  },

  // 導航設定
  navigation: {
    showLanguageSwitcher: true,
    showLogin: true,
    showContactSales: true,
    showAnnouncementBar: true,
    
    // 導航分組開關
    showProductsMenu: true,
    showGPUsMenu: true,
    showDevelopersMenu: true,
    showCompanyMenu: true,
  },

  // 頁腳設定
  footer: {
    showNewsletter: true,
    showSocialLinks: true,
    showComplianceBadges: true,
    address: "278 Castro St, Mountain View, CA 94041",
  },

  // 社交連結
  social: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    discord: "https://discord.com",
  },

  // 語言設定
  i18n: {
    defaultLocale: "en",
    supportedLocales: ["en", "zh-TW", "ja", "ko"],
  },
} as const;

// 類型定義
export type SiteConfig = typeof siteConfig;
export type Features = typeof siteConfig.features;
export type Navigation = typeof siteConfig.navigation;


