/**
 * 變體生成器
 * 
 * 智慧推薦 + 批量生成 + 組合爆破
 */

import { themes, type ThemeConfig } from '@/styles/themes';
import { 
  conductDesignReview, 
  type DesignSubmission, 
  type DesignReviewResult 
} from './design-review';

// ============================================================
// 類型定義
// ============================================================

export type HeroVariant = 'center' | 'split' | 'gradient';
export type FeaturesVariant = 'grid' | 'bento' | 'alternating';

export interface DesignVariant {
  id: string;
  themeId: string;
  theme: ThemeConfig;
  hero: HeroVariant;
  features: FeaturesVariant;
  reason?: string;       // 推薦理由
  confidence?: number;   // 推薦信心度 0-100
}

export interface ClientBrief {
  companyName: string;
  companyType: string;
  targetAudience: string;
  brandKeywords: string[];
  competitors: string[];
}

export interface BatchReviewResult {
  variant: DesignVariant;
  review: DesignReviewResult;
}

// ============================================================
// 常數
// ============================================================

export const heroVariants: HeroVariant[] = ['center', 'split', 'gradient'];
export const featuresVariants: FeaturesVariant[] = ['grid', 'bento', 'alternating'];

export const heroLabels: Record<HeroVariant, string> = {
  center: '置中標題型',
  split: '左文右圖型',
  gradient: '漸層背景型',
};

export const featuresLabels: Record<FeaturesVariant, string> = {
  grid: '網格佈局',
  bento: 'Bento Grid',
  alternating: '左右交錯',
};

// ============================================================
// 智慧推薦引擎
// ============================================================

interface RecommendationRule {
  condition: (brief: ClientBrief) => boolean;
  variants: Partial<DesignVariant>[];
  weight: number;
}

const recommendationRules: RecommendationRule[] = [
  // AI/算力/GPU 相關公司 → 深色科技風
  {
    condition: (brief) => 
      /AI|算力|GPU|顯卡|伺服器|HPC|深度學習/.test(brief.companyType),
    variants: [
      { themeId: 'dark-cyan', hero: 'gradient', features: 'bento', reason: '科技感首選，最符合 AI 產業形象' },
      { themeId: 'dark-black', hero: 'gradient', features: 'grid', reason: 'NVIDIA 風格，高階感十足' },
      { themeId: 'dark-indigo', hero: 'gradient', features: 'bento', reason: '現代電光風格，適合 GPU 產品線' },
    ],
    weight: 10,
  },
  
  // 強調可靠/穩重 → 保守風格
  {
    condition: (brief) => 
      brief.brandKeywords.some(k => /可靠|穩重|信賴|安全|企業級/.test(k)),
    variants: [
      { themeId: 'light-navy', hero: 'split', features: 'grid', reason: '深海藍傳達穩重可靠的企業形象' },
      { themeId: 'dark-cyan', hero: 'center', features: 'grid', reason: '科技感兼顧穩重，適合大型企業' },
    ],
    weight: 8,
  },
  
  // 強調創新 → 現代風格
  {
    condition: (brief) => 
      brief.brandKeywords.some(k => /創新|前沿|突破|領先/.test(k)),
    variants: [
      { themeId: 'dark-cyan', hero: 'gradient', features: 'bento', reason: '漸層背景營造創新未來感' },
      { themeId: 'dark-indigo', hero: 'gradient', features: 'bento', reason: '電光紫藍展現前沿科技感' },
    ],
    weight: 7,
  },
  
  // 目標受眾是工程師 → 極簡風格
  {
    condition: (brief) => 
      /工程師|開發者|技術|IT/.test(brief.targetAudience),
    variants: [
      { themeId: 'light-slate', hero: 'center', features: 'grid', reason: '極簡風格符合工程師審美' },
      { themeId: 'dark-black', hero: 'center', features: 'grid', reason: '純黑科技風，技術導向' },
    ],
    weight: 6,
  },
  
  // 目標受眾是高管/投資人 → 專業企業風
  {
    condition: (brief) => 
      /高管|CEO|投資|採購|決策/.test(brief.targetAudience),
    variants: [
      { themeId: 'light-corporate', hero: 'split', features: 'alternating', reason: '企業藍傳達專業可信賴感' },
      { themeId: 'light-navy', hero: 'center', features: 'grid', reason: '深海藍適合面向高管的溝通' },
    ],
    weight: 7,
  },
  
  // 競品對標 NVIDIA → 深黑風格
  {
    condition: (brief) => 
      brief.competitors.some(c => /NVIDIA|輝達/.test(c)),
    variants: [
      { themeId: 'dark-black', hero: 'gradient', features: 'bento', reason: '對標 NVIDIA 的視覺風格' },
    ],
    weight: 9,
  },
  
  // 競品對標 Dell/HP/Supermicro → 穩重企業風
  {
    condition: (brief) => 
      brief.competitors.some(c => /Dell|HP|HPE|Supermicro/.test(c)),
    variants: [
      { themeId: 'light-navy', hero: 'split', features: 'grid', reason: '企業級品牌風格，對標國際大廠' },
      { themeId: 'dark-cyan', hero: 'split', features: 'grid', reason: '科技感與企業感兼顧' },
    ],
    weight: 8,
  },
];

/**
 * 智慧推薦：根據客戶需求推薦最適合的變體
 */
export function smartRecommend(brief: ClientBrief, limit: number = 5): DesignVariant[] {
  const scored: Map<string, { variant: Partial<DesignVariant>; score: number }> = new Map();
  
  // 應用所有規則
  for (const rule of recommendationRules) {
    if (rule.condition(brief)) {
      for (const variant of rule.variants) {
        const key = `${variant.themeId}-${variant.hero}-${variant.features}`;
        const existing = scored.get(key);
        
        if (existing) {
          existing.score += rule.weight;
        } else {
          scored.set(key, { variant, score: rule.weight });
        }
      }
    }
  }
  
  // 如果沒有匹配的規則，提供預設推薦
  if (scored.size === 0) {
    return getDefaultRecommendations();
  }
  
  // 排序並轉換為完整的 DesignVariant
  const sorted = Array.from(scored.entries())
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, limit);
  
  const maxScore = sorted[0]?.[1].score || 1;
  
  return sorted.map(([key, { variant, score }], index) => {
    const theme = themes.find(t => t.id === variant.themeId)!;
    return {
      id: `rec-${index + 1}`,
      themeId: variant.themeId!,
      theme,
      hero: variant.hero!,
      features: variant.features!,
      reason: variant.reason,
      confidence: Math.round((score / maxScore) * 100),
    };
  });
}

/**
 * 預設推薦（當沒有匹配規則時）
 */
function getDefaultRecommendations(): DesignVariant[] {
  return [
    {
      id: 'default-1',
      themeId: 'dark-cyan',
      theme: themes.find(t => t.id === 'dark-cyan')!,
      hero: 'gradient',
      features: 'bento',
      reason: '最受歡迎的科技業組合',
      confidence: 85,
    },
    {
      id: 'default-2',
      themeId: 'light-corporate',
      theme: themes.find(t => t.id === 'light-corporate')!,
      hero: 'split',
      features: 'grid',
      reason: '經典企業風格，適合大多數場景',
      confidence: 80,
    },
    {
      id: 'default-3',
      themeId: 'dark-black',
      theme: themes.find(t => t.id === 'dark-black')!,
      hero: 'gradient',
      features: 'grid',
      reason: '高端科技感，適合展示高階產品',
      confidence: 75,
    },
  ];
}

// ============================================================
// 組合生成器
// ============================================================

/**
 * 生成所有可能的組合
 */
export function generateAllCombinations(): DesignVariant[] {
  const variants: DesignVariant[] = [];
  let id = 1;
  
  for (const theme of themes) {
    for (const hero of heroVariants) {
      for (const features of featuresVariants) {
        variants.push({
          id: `combo-${id++}`,
          themeId: theme.id,
          theme,
          hero,
          features,
        });
      }
    }
  }
  
  return variants;
}

/**
 * 根據篩選條件生成組合
 */
export function generateFilteredCombinations(
  selectedThemes: string[],
  selectedHeroes: HeroVariant[],
  selectedFeatures: FeaturesVariant[]
): DesignVariant[] {
  const variants: DesignVariant[] = [];
  let id = 1;
  
  const filteredThemes = themes.filter(t => selectedThemes.includes(t.id));
  
  for (const theme of filteredThemes) {
    for (const hero of selectedHeroes) {
      for (const features of selectedFeatures) {
        variants.push({
          id: `filtered-${id++}`,
          themeId: theme.id,
          theme,
          hero,
          features,
        });
      }
    }
  }
  
  return variants;
}

// ============================================================
// 批量評審
// ============================================================

/**
 * 批量評審多個變體
 */
export async function batchReview(
  variants: DesignVariant[],
  clientBrief: ClientBrief,
  onProgress?: (completed: number, total: number) => void
): Promise<BatchReviewResult[]> {
  const results: BatchReviewResult[] = [];
  
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    
    const submission: DesignSubmission = {
      themeId: variant.themeId,
      themeConfig: variant.theme,
      blocks: {
        hero: variant.hero,
        features: variant.features,
      },
      clientBrief,
    };
    
    const review = await conductDesignReview(submission);
    results.push({ variant, review });
    
    // 回報進度
    onProgress?.(i + 1, variants.length);
  }
  
  // 依評分排序
  return results.sort((a, b) => b.review.overallScore - a.review.overallScore);
}

/**
 * 快速批量評審（並行處理，更快但可能超過 API 限制）
 */
export async function parallelBatchReview(
  variants: DesignVariant[],
  clientBrief: ClientBrief,
  concurrency: number = 3
): Promise<BatchReviewResult[]> {
  const results: BatchReviewResult[] = [];
  
  // 分批處理
  for (let i = 0; i < variants.length; i += concurrency) {
    const batch = variants.slice(i, i + concurrency);
    
    const batchResults = await Promise.all(
      batch.map(async (variant) => {
        const submission: DesignSubmission = {
          themeId: variant.themeId,
          themeConfig: variant.theme,
          blocks: {
            hero: variant.hero,
            features: variant.features,
          },
          clientBrief,
        };
        
        const review = await conductDesignReview(submission);
        return { variant, review };
      })
    );
    
    results.push(...batchResults);
  }
  
  return results.sort((a, b) => b.review.overallScore - a.review.overallScore);
}

// ============================================================
// 變體比較
// ============================================================

export interface VariantComparison {
  variants: BatchReviewResult[];
  winner: BatchReviewResult;
  analysis: {
    bestForConservative: BatchReviewResult;
    bestForDesign: BatchReviewResult;
    bestForAccount: BatchReviewResult;
    mostBalanced: BatchReviewResult;
  };
}

/**
 * 比較多個變體，找出各項最佳
 */
export function compareVariants(results: BatchReviewResult[]): VariantComparison {
  if (results.length === 0) {
    throw new Error('No variants to compare');
  }
  
  const sorted = [...results].sort((a, b) => b.review.overallScore - a.review.overallScore);
  
  // 各項最佳
  const bestForConservative = [...results].sort(
    (a, b) => b.review.reviews.conservative.score - a.review.reviews.conservative.score
  )[0];
  
  const bestForDesign = [...results].sort(
    (a, b) => b.review.reviews.design.score - a.review.reviews.design.score
  )[0];
  
  const bestForAccount = [...results].sort(
    (a, b) => b.review.reviews.account.score - a.review.reviews.account.score
  )[0];
  
  // 最平衡（三項分數標準差最小）
  const mostBalanced = [...results].sort((a, b) => {
    const scoresA = [
      a.review.reviews.conservative.score,
      a.review.reviews.design.score,
      a.review.reviews.account.score,
    ];
    const scoresB = [
      b.review.reviews.conservative.score,
      b.review.reviews.design.score,
      b.review.reviews.account.score,
    ];
    
    const stdA = standardDeviation(scoresA);
    const stdB = standardDeviation(scoresB);
    
    return stdA - stdB;
  })[0];
  
  return {
    variants: sorted,
    winner: sorted[0],
    analysis: {
      bestForConservative,
      bestForDesign,
      bestForAccount,
      mostBalanced,
    },
  };
}

function standardDeviation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

// ============================================================
// 工具函數
// ============================================================

/**
 * 生成變體的顯示名稱
 */
export function getVariantDisplayName(variant: DesignVariant): string {
  return `${variant.theme.nameZh} + ${heroLabels[variant.hero]} + ${featuresLabels[variant.features]}`;
}

/**
 * 生成變體的簡短標籤
 */
export function getVariantShortLabel(variant: DesignVariant): string {
  return `${variant.theme.nameZh.substring(0, 4)} | ${variant.hero} | ${variant.features}`;
}


