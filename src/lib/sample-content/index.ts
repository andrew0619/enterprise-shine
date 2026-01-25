/**
 * 📚 Sample Content Index
 * 
 * 匯出兩個樣本網站的完整真實內容
 * 用於 NDMD 系統的排版驗證測試
 */

import quantumHorizons from './quantum-horizons';
import enterpriseShine from './enterprise-shine';

// ============================================================
// 匯出完整內容
// ============================================================
export { default as quantumHorizons } from './quantum-horizons';
export { default as enterpriseShine } from './enterprise-shine';

// ============================================================
// 樣本選項
// ============================================================
export const SAMPLE_OPTIONS = [
  {
    id: 'quantum-horizons' as const,
    name: 'Quantum Horizons (fQuantum)',
    description: 'AI Infrastructure & Data Center Solutions',
    industry: 'AI Infrastructure',
    color: '#00B4D8',
  },
  {
    id: 'enterprise-shine' as const, 
    name: 'Enterprise Shine (NexusAI)',
    description: 'GPU Cloud Platform',
    industry: 'GPU Cloud',
    color: '#6366F1',
  },
];

export type SampleId = 'quantum-horizons' | 'enterprise-shine';

// ============================================================
// 獲取樣本內容
// ============================================================
export function getSampleContent(id: SampleId) {
  return id === 'quantum-horizons' ? quantumHorizons : enterpriseShine;
}

// ============================================================
// 統計內容數量
// ============================================================
export function getContentStats(id: SampleId) {
  const content = getSampleContent(id);
  
  if (id === 'quantum-horizons') {
    return {
      hero: content.hero.title,
      services: content.coreServices.length,
      products: content.gpuProducts.length,
      advantages: content.coreAdvantages.length,
      caseStudies: content.caseStudies.length,
      faq: content.faq.length,
      newsArticles: content.newsArticles.featured.length + content.newsArticles.latest.length,
      aiModels: content.aiModels.length,
      stats: content.stats.length,
    };
  } else {
    return {
      hero: content.hero.title,
      products: 3, // Inference, Cluster, GPU
      gpuPages: 3, // H200, GB200, HGX B200
      models: content.modelsList.length,
      faq: content.faq.length,
      newsArticles: content.newsArticles.length,
      stats: content.stats.length,
      pricingPlans: content.pricing.gpuPlans.length,
    };
  }
}
