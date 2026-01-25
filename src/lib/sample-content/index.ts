/**
 * 📚 Sample Content Index
 * 
 * 匯出兩個樣本網站的真實內容
 * 用於 NDMD 系統的排版驗證測試
 */

export { 
  quantumHorizonsContent, 
  quickAccessCards as quantumQuickAccess,
  statsData as quantumStats,
  QUANTUM_IMAGES,
} from './quantum-horizons';

export { 
  enterpriseShineContent, 
  partnerLogos as shinePartnerLogos,
  newsArticles as shineNews,
  gpuFeatures as shineGpuFeatures,
  modelsList as shineModels,
  SHINE_IMAGES,
} from './enterprise-shine';

// 樣本選項
export const SAMPLE_OPTIONS = [
  {
    id: 'quantum-horizons',
    name: 'Quantum Horizons',
    description: 'AI Infrastructure & Data Center Solutions',
    industry: 'AI Infrastructure',
  },
  {
    id: 'enterprise-shine', 
    name: 'Enterprise Shine (NexusAI)',
    description: 'GPU Cloud Platform',
    industry: 'GPU Cloud',
  },
] as const;

export type SampleId = typeof SAMPLE_OPTIONS[number]['id'];

