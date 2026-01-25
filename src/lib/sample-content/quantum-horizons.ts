/**
 * 📦 Quantum Horizons 樣本網站完整內容
 * 
 * 這是從 quantum-horizons 專案提取的真實內容
 * 用於 NDMD 系統驗證測試
 * 
 * ⚠️ 不要修改任何文字或圖片，保持原汁原味
 */

import type { PageContent } from '../content-schema';

// ============================================================
// 圖片資源路徑（來自 quantum-horizons/src/assets/）
// ============================================================
export const QUANTUM_IMAGES = {
  heroBg: '/quantum-horizons/hero-space-bg.jpg',
  globe: '/quantum-horizons/holographic-globe.png',
  serverRack: '/quantum-horizons/server-rack-dark.jpg',
  datacenter: '/quantum-horizons/datacenter-aisle.jpg',
  neuralNetwork: '/quantum-horizons/neural-network.jpg',
  aiChip: '/quantum-horizons/ai-chip-closeup.jpg',
  dataAbstract: '/quantum-horizons/data-abstract-blue.jpg',
} as const;

// ============================================================
// Quantum Horizons 完整頁面內容
// ============================================================
export const quantumHorizonsContent: PageContent = {
  meta: {
    title: 'Quantum Horizons - AI Infrastructure Solutions',
    description: 'High-performance computing and data center solutions across Asia',
    slug: 'quantum-horizons',
  },
  
  // ============================================================
  // Hero Section
  // ============================================================
  hero: {
    badge: 'New Release',
    title: 'Empowering AI-Driven Innovation and Growth',
    subtitle: 'We provide high-performance computing and data center solutions across Asia, helping enterprises in Taiwan and globally scale faster and achieve more',
    primaryCta: {
      text: 'Contact Us',
      href: '/contact',
      icon: 'arrow',
    },
    secondaryCta: {
      text: 'Learn More',
      href: '/about',
    },
    // Hero 區沒有內嵌 stats，stats 在獨立區塊
  },
  
  // ============================================================
  // Trust Section (Logo Strip)
  // ============================================================
  // Quantum Horizons 沒有 Logo Strip，但有地圖展示
  
  // ============================================================
  // Features Section (Core Services)
  // ============================================================
  features: {
    badge: 'SERVICES',
    title: 'Our Core Services',
    features: [
      {
        icon: 'Server',
        title: 'AI Server & Computing Rental',
        description: 'Enterprise-grade NVIDIA GPU clusters supporting large-scale AI model training and inference. Flexible rental plans with on-demand computing resources to help you rapidly deploy AI applications.',
        link: {
          text: 'Learn More',
          href: '/services/compute',
        },
      },
      {
        icon: 'Building',
        title: 'IDC Construction & Fiber Networks',
        description: 'From planning to construction, providing complete data center solutions. High-availability design combined with low-latency fiber networks ensures your business never stops.',
        link: {
          text: 'Learn More',
          href: '/services/idc',
        },
      },
      {
        icon: 'Cpu',
        title: 'AI Platform & Large Model Development',
        description: 'Custom AI platform development supporting enterprise-specific large language model training. End-to-end AI solutions from data processing to model deployment.',
        link: {
          text: 'Learn More',
          href: '/services/ai-platform',
        },
      },
    ],
    layout: 'grid',
    columns: 3,
  },
  
  // ============================================================
  // Case Study (Global Infrastructure)
  // ============================================================
  caseStudy: {
    title: 'Global Infrastructure Network',
    subtitle: 'Asia-Pacific Data Center Layout',
    stats: [
      { value: '15', suffix: '+', label: 'Data Centers' },
      { value: '99.99', suffix: '%', label: 'Annual Uptime' },
      { value: '24/7', label: 'Technical Support' },
      { value: '500', suffix: '+', label: 'Enterprise Clients' },
    ],
    media: {
      src: QUANTUM_IMAGES.globe,
      alt: 'Global Infrastructure Network',
    },
  },
  
  // ============================================================
  // CTA Section
  // ============================================================
  cta: {
    title: 'Ready to Transform Your Business?',
    subtitle: 'Join hundreds of companies already leveraging our AI infrastructure solutions to drive innovation. Let\'s build the future together.',
    primaryCta: {
      text: 'Contact Us',
      href: '/contact',
      icon: 'arrow',
    },
    secondaryCta: {
      text: 'Learn More',
      href: '/about',
    },
  },
};

// ============================================================
// Quick Access Cards（首頁上方的三個快捷入口）
// ============================================================
export const quickAccessCards = [
  {
    icon: 'Server',
    title: 'AI Server & Computing Rental',
    description: 'High-performance computing infrastructure',
    href: '/services/compute',
  },
  {
    icon: 'Building',
    title: 'IDC Construction & Fiber Networks',
    description: 'Data center construction and connectivity',
    href: '/services/idc',
  },
  {
    icon: 'Cpu',
    title: 'AI Platform & Large Model Development',
    description: 'Enterprise AI model training and inference',
    href: '/services/ai-platform',
  },
];

// ============================================================
// Stats 數據（獨立展示）
// ============================================================
export const statsData = [
  { value: '15+', label: 'Data Centers' },
  { value: '99.99%', label: 'Annual Uptime' },
  { value: '24/7', label: 'Technical Support' },
  { value: '500+', label: 'Enterprise Clients' },
];

export default quantumHorizonsContent;

