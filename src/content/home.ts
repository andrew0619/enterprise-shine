/**
 * Home Page Content Configuration
 * 首頁內容配置
 * 
 * 文字內容使用 i18n key，結構化數據在這裡管理
 * 這樣可以快速調整首頁的展示項目、順序、圖標等
 */

import { Cpu, Network, Lock, LucideIcon } from "lucide-react";

// ============================================
// Hero Section - 首頁主視覺
// ============================================
export const heroConfig = {
  // i18n keys
  titleKey: "home.heroTitle",
  subtitleKey: "home.heroSubtitle",
  ctaKey: "common.getStarted",
  ctaLink: "/contact",
  // 視覺資源
  heroImage: "/assets/home/hero-cubes.png",
};

// Partner logos shown in Hero section
export const partnerLogos = [
  { name: "DeepSeek", icon: "🐋" },
  { name: "OpenAI", icon: "◯" },
  { name: "Anthropic", icon: "A" },
  { name: "NVIDIA", icon: "◆" },
  { name: "LangChain", icon: "🔗" },
  { name: "Hugging Face", icon: "🤗" },
  { name: "Meta", icon: "∞" },
  { name: "Mistral", icon: "M" },
] as const;

// ============================================
// Foundation Section - 基礎介紹
// ============================================
export const foundationConfig = {
  titleKey: "home.foundationTitle",
  subtitleKey: "home.foundationSubtitle",
  descriptionKey: "home.foundationDescription",
};

// ============================================
// Inference Section - 推論服務
// ============================================
export interface ModelItem {
  type: string;
  name: string;
  descriptionKey: string;
  icon: string;
  iconColor: string;
  free: boolean;
}

export const inferenceConfig = {
  titleKey: "home.inferenceTitle",
  description1Key: "home.inferenceDescription1",
  description2Key: "home.inferenceDescription2",
  modelsLabelKey: "home.inferenceModelsLabel",
  ctaLink: "/products/inference-engine",
};

export const modelsList: ModelItem[] = [
  {
    type: "Chat",
    name: "DeepSeek R1",
    descriptionKey: "models.deepseekR1.description",
    icon: "🐋",
    iconColor: "text-blue-500",
    free: false,
  },
  {
    type: "Chat",
    name: "DeepSeek R1 Distill Llama 70B Free",
    descriptionKey: "models.deepseekR1Distill.description",
    icon: "🐋",
    iconColor: "text-blue-500",
    free: true,
  },
  {
    type: "Chat",
    name: "Llama 3.3 70B Instruct Turbo Free",
    descriptionKey: "models.llama33.description",
    icon: "∞",
    iconColor: "text-blue-600",
    free: true,
  },
];

// ============================================
// Cluster Section - 集群管理
// ============================================
export const clusterConfig = {
  titleKey: "home.clusterTitle",
  descriptionKey: "home.clusterDescription",
  ctaLink: "/products/cluster-engine",
};

// Dashboard mock data
export const dashboardData = [
  { id: "gpu-001", name: "NVIDIA H100", status: "active" as const, utilization: "94%" },
  { id: "gpu-002", name: "NVIDIA H100", status: "active" as const, utilization: "87%" },
  { id: "gpu-003", name: "NVIDIA A100", status: "active" as const, utilization: "92%" },
  { id: "gpu-004", name: "NVIDIA A100", status: "idle" as const, utilization: "12%" },
  { id: "gpu-005", name: "NVIDIA H100", status: "active" as const, utilization: "78%" },
];

// Team members mock data
export const teamMembers = [
  { name: "John Chen", role: "Admin", avatar: "JC" },
  { name: "Sarah Lin", role: "Developer", avatar: "SL" },
  { name: "Mike Wang", role: "Viewer", avatar: "MW" },
];

// Stats for real-time dashboard
export const clusterStats = [
  { value: "87%", labelKey: "cluster.avgGPUUsage", color: "text-primary" },
  { value: "24", labelKey: "cluster.activeNodes", color: "text-green-600" },
  { value: "1.2TB", labelKey: "cluster.memoryUsed", color: "text-blue-600" },
  { value: "99.9%", labelKey: "cluster.uptime", color: "text-amber-600" },
];

// ============================================
// GPU Compute Section - GPU 計算
// ============================================
export interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

export const gpuComputeConfig = {
  titleKey: "home.gpuTitle",
  descriptionKey: "home.gpuDescription",
  ctaLink: "/gpu-compute",
};

export const gpuFeatures: FeatureItem[] = [
  {
    icon: Cpu,
    titleKey: "gpu.topTierGPUs",
    descriptionKey: "gpu.topTierGPUsDesc",
  },
  {
    icon: Network,
    titleKey: "gpu.infinibandNetworking",
    descriptionKey: "gpu.infinibandNetworkingDesc",
  },
  {
    icon: Lock,
    titleKey: "gpu.secureScalable",
    descriptionKey: "gpu.secureScalableDesc",
  },
];

// ============================================
// CTA Section - 行動呼籲
// ============================================
export const ctaConfig = {
  titleKey: "home.ctaTitle",
  subtitleKey: "home.ctaSubtitle",
  primaryCtaKey: "common.contactSales",
  primaryCtaLink: "/contact",
  secondaryCtaKey: "common.viewPricing",
  secondaryCtaLink: "/pricing",
  backgroundImage: "/assets/home/cta-abstract.jpg",
};

// ============================================
// Page Sections Order - 首頁區塊順序
// ============================================
export const homeSections = [
  "hero",
  "foundation",
  "inference",
  "cluster",
  "gpuCompute",
  "logoMarquee",
  "faq",
  "caseStudy",
  "news",
  "cta",
] as const;

export type HomeSection = typeof homeSections[number];

