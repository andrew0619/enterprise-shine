/**
 * Pricing Page Content Configuration
 * 定價頁內容配置
 * 
 * 集中管理定價方案、功能列表等
 * 便於快速調整價格和方案內容
 */

// ============================================
// GPU Pricing Plans
// ============================================
export interface GPUPlan {
  name: string;
  labelKey: string;
  price?: string;
  unit?: string;
  headlineKey?: string;
  descriptionKey: string;
  ctaKey: string;
  ctaLink: string;
  featured?: boolean;
}

export const gpuPlans: GPUPlan[] = [
  {
    name: "NVIDIA H200",
    labelKey: "pricing.gpuPlans.h200.label",
    price: "$2.50",
    unit: "/ GPU-hour",
    descriptionKey: "pricing.gpuPlans.h200.description",
    ctaKey: "pricing.gpuPlans.h200.cta",
    ctaLink: "/contact",
  },
  {
    name: "NVIDIA H100",
    labelKey: "pricing.gpuPlans.h100.label",
    price: "$2.10",
    unit: "/ GPU-hour",
    descriptionKey: "pricing.gpuPlans.h100.description",
    ctaKey: "pricing.gpuPlans.h100.cta",
    ctaLink: "/contact",
    featured: true,
  },
  {
    name: "NVIDIA Blackwell Platforms",
    labelKey: "pricing.gpuPlans.blackwell.label",
    headlineKey: "pricing.gpuPlans.blackwell.headline",
    descriptionKey: "pricing.gpuPlans.blackwell.description",
    ctaKey: "pricing.gpuPlans.blackwell.cta",
    ctaLink: "/contact",
  },
];

// ============================================
// Service Engine Pricing
// ============================================
export interface ServicePlan {
  name: string;
  labelKey: string;
  priceKey: string;
  featuresKeys: string[];
  ctaKey: string;
  ctaLink: string;
  featured?: boolean;
}

export const servicePlans: ServicePlan[] = [
  {
    name: "Inference Engine",
    labelKey: "pricing.service.inference.label",
    priceKey: "pricing.service.inference.price",
    featuresKeys: [
      "pricing.service.inference.feature1",
      "pricing.service.inference.feature2",
      "pricing.service.inference.feature3",
    ],
    ctaKey: "pricing.service.inference.cta",
    ctaLink: "/products/inference-engine",
  },
  {
    name: "Cluster Engine",
    labelKey: "pricing.service.cluster.label",
    priceKey: "pricing.service.cluster.price",
    featuresKeys: [
      "pricing.service.cluster.feature1",
      "pricing.service.cluster.feature2",
      "pricing.service.cluster.feature3",
    ],
    ctaKey: "pricing.service.cluster.cta",
    ctaLink: "/products/cluster-engine",
    featured: true,
  },
];

// ============================================
// Pricing Page Config
// ============================================
export const pricingConfig = {
  titleKey: "pricing.title",
  subtitleKey: "pricing.subtitle",
  ctaBannerTitleKey: "pricing.cta.title",
  ctaBannerSubtitleKey: "pricing.cta.subtitle",
  ctaBannerLink: "/contact",
};

// ============================================
// FAQ Items
// ============================================
export const pricingFAQs = [
  { questionKey: "pricing.faq.q1.question", answerKey: "pricing.faq.q1.answer" },
  { questionKey: "pricing.faq.q2.question", answerKey: "pricing.faq.q2.answer" },
  { questionKey: "pricing.faq.q3.question", answerKey: "pricing.faq.q3.answer" },
  { questionKey: "pricing.faq.q4.question", answerKey: "pricing.faq.q4.answer" },
];


