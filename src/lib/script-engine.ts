/**
 * 🎬 Script Engine - 劇本引擎
 * 
 * 根據受眾和目標，生成頁面的「詞彙序列」
 * 這是 NDMD 系統的「導演」
 */

// ============================================================
// 類型定義
// ============================================================

/** 目標受眾 */
export type Persona = 
  | 'executive'   // 急躁的決策者 - 只看結論
  | 'developer'   // 技術開發者 - 在乎細節
  | 'investor'    // 保守投資者 - 看數據和市場
  | 'operator'    // IT 營運者 - 在乎穩定性
  | 'general';    // 一般訪客 - 均衡展示

/** 頁面目標 */
export type PageGoal = 
  | 'lead-gen'    // 收集潛在客戶
  | 'signup'      // 註冊帳號
  | 'demo'        // 預約演示
  | 'contact'     // 聯繫銷售
  | 'awareness';  // 品牌認知

/** 語調 */
export type Tone = 
  | 'urgent'      // 急迫 - 強調限時優惠
  | 'professional'// 專業 - 沉穩可靠
  | 'technical'   // 技術 - 強調規格
  | 'friendly';   // 親切 - 降低門檻

/** 詞彙類型 */
export type VocabularyType = 
  | 'PageHeader'
  | 'CTABlock'
  | 'FeaturePoint'
  | 'StatPoint'
  | 'Testimonial'
  | 'PriceTag'
  | 'MediaBlock'
  | 'TrustStrip'
  | 'SplitBlock'
  | 'ListItem'
  | 'FAQItem';

/** 區塊類型 */
export type SectionType = 
  | 'hero'
  | 'trust'
  | 'features'
  | 'stats'
  | 'testimonials'
  | 'case-study'
  | 'pricing'
  | 'cta'
  | 'faq';

/** AIDA 階段 */
export type AIDAStage = 
  | 'attention'   // 引起注意
  | 'interest'    // 產生興趣
  | 'desire'      // 激發慾望
  | 'action';     // 採取行動

/** 劇本配置 */
export interface ScriptConfig {
  persona: Persona;
  goal: PageGoal;
  tone: Tone;
}

/** 區塊配置 */
export interface SectionScript {
  type: SectionType;
  aida: AIDAStage;
  vocabulary: VocabularyType[];
  background: 'transparent' | 'muted' | 'glass' | 'dark';
  spacing: 'compact' | 'default' | 'relaxed';
  priority: number; // 1-10，越高越重要
}

/** 完整劇本 */
export interface PageScript {
  config: ScriptConfig;
  sections: SectionScript[];
  notes: string[];
}

// ============================================================
// AIDA 模型映射
// ============================================================

const AIDA_SECTION_MAP: Record<AIDAStage, SectionType[]> = {
  attention: ['hero'],
  interest: ['trust', 'features', 'stats'],
  desire: ['testimonials', 'case-study', 'pricing'],
  action: ['cta', 'faq'],
};

// ============================================================
// 受眾特定的區塊權重
// ============================================================

const PERSONA_WEIGHTS: Record<Persona, Record<SectionType, number>> = {
  executive: {
    hero: 10,
    trust: 8,
    features: 5,
    stats: 9,
    testimonials: 6,
    'case-study': 7,
    pricing: 4,
    cta: 10,
    faq: 3,
  },
  developer: {
    hero: 7,
    trust: 5,
    features: 10,
    stats: 8,
    testimonials: 4,
    'case-study': 6,
    pricing: 7,
    cta: 6,
    faq: 9,
  },
  investor: {
    hero: 8,
    trust: 10,
    features: 6,
    stats: 10,
    testimonials: 8,
    'case-study': 9,
    pricing: 5,
    cta: 7,
    faq: 4,
  },
  operator: {
    hero: 7,
    trust: 9,
    features: 8,
    stats: 8,
    testimonials: 6,
    'case-study': 7,
    pricing: 9,
    cta: 7,
    faq: 10,
  },
  general: {
    hero: 8,
    trust: 7,
    features: 8,
    stats: 7,
    testimonials: 7,
    'case-study': 7,
    pricing: 7,
    cta: 8,
    faq: 7,
  },
};

// ============================================================
// 區塊的詞彙組合
// ============================================================

const SECTION_VOCABULARY: Record<SectionType, VocabularyType[]> = {
  hero: ['PageHeader', 'CTABlock', 'TrustStrip'],
  trust: ['TrustStrip', 'StatPoint'],
  features: ['PageHeader', 'FeaturePoint'],
  stats: ['PageHeader', 'StatPoint'],
  testimonials: ['PageHeader', 'Testimonial'],
  'case-study': ['SplitBlock', 'StatPoint', 'Testimonial', 'MediaBlock'],
  pricing: ['PageHeader', 'PriceTag'],
  cta: ['CTABlock'],
  faq: ['PageHeader', 'FAQItem', 'CTABlock'],
};

// ============================================================
// 視覺節奏規則
// ============================================================

const BACKGROUND_RHYTHM: Record<SectionType, 'transparent' | 'muted' | 'glass' | 'dark'> = {
  hero: 'transparent',
  trust: 'glass',
  features: 'muted',
  stats: 'transparent',
  testimonials: 'muted',
  'case-study': 'transparent',
  pricing: 'muted',
  cta: 'dark',
  faq: 'muted',
};

// ============================================================
// 劇本生成函數
// ============================================================

/**
 * 根據配置生成頁面劇本
 */
export function generateScript(config: ScriptConfig): PageScript {
  const { persona, goal, tone } = config;
  const weights = PERSONA_WEIGHTS[persona];
  const notes: string[] = [];
  
  // 根據權重排序區塊
  const sortedSections = Object.entries(weights)
    .sort(([, a], [, b]) => b - a)
    .map(([type]) => type as SectionType);
  
  // 生成區塊序列
  const sections: SectionScript[] = [];
  let lastBackground: string | null = null;
  
  // 按 AIDA 順序組織
  const aidaOrder: AIDAStage[] = ['attention', 'interest', 'desire', 'action'];
  
  for (const stage of aidaOrder) {
    const stageSections = AIDA_SECTION_MAP[stage];
    const relevantSections = sortedSections.filter(s => stageSections.includes(s));
    
    for (const sectionType of relevantSections) {
      const priority = weights[sectionType];
      
      // 低優先級區塊可能跳過（根據目標）
      if (priority < 5 && goal === 'lead-gen' && sectionType !== 'cta') {
        continue;
      }
      
      // 避免連續相同背景
      let background = BACKGROUND_RHYTHM[sectionType];
      if (background === lastBackground && background !== 'transparent') {
        background = 'transparent';
      }
      lastBackground = background;
      
      sections.push({
        type: sectionType,
        aida: stage,
        vocabulary: SECTION_VOCABULARY[sectionType],
        background,
        spacing: sectionType === 'hero' ? 'relaxed' : 
                 sectionType === 'trust' ? 'compact' : 'default',
        priority,
      });
    }
  }
  
  // 生成筆記
  notes.push(`目標受眾: ${getPersonaDescription(persona)}`);
  notes.push(`頁面目標: ${getGoalDescription(goal)}`);
  notes.push(`語調風格: ${getToneDescription(tone)}`);
  notes.push(`區塊數量: ${sections.length}`);
  
  // 特定建議
  if (persona === 'executive') {
    notes.push('建議: 減少文字，多用數據和圖表');
  }
  if (persona === 'developer') {
    notes.push('建議: 突出技術規格和 API 文檔');
  }
  if (tone === 'urgent') {
    notes.push('建議: 加入限時優惠或稀缺性提示');
  }
  
  return {
    config,
    sections,
    notes,
  };
}

/**
 * 為特定區塊生成詞彙序列
 */
export function generateSectionVocabulary(
  sectionType: SectionType,
  persona: Persona
): VocabularyType[] {
  const baseVocabulary = SECTION_VOCABULARY[sectionType];
  
  // 根據受眾調整詞彙
  if (persona === 'executive' && sectionType === 'features') {
    // 決策者喜歡簡潔，減少詞彙
    return baseVocabulary.slice(0, 2);
  }
  
  if (persona === 'developer' && sectionType === 'features') {
    // 開發者喜歡詳細，增加詞彙
    return [...baseVocabulary, 'ListItem'];
  }
  
  return baseVocabulary;
}

/**
 * 驗證劇本的視覺節奏
 */
export function validateVisualRhythm(script: PageScript): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // 檢查連續深色背景
  let consecutiveDark = 0;
  let consecutiveMuted = 0;
  
  for (const section of script.sections) {
    if (section.background === 'dark') {
      consecutiveDark++;
      consecutiveMuted = 0;
      if (consecutiveDark > 1) {
        issues.push(`連續 ${consecutiveDark} 個深色區塊會造成視覺壓迫`);
      }
    } else if (section.background === 'muted') {
      consecutiveMuted++;
      consecutiveDark = 0;
      if (consecutiveMuted > 2) {
        issues.push(`連續 ${consecutiveMuted} 個淺灰區塊會過於單調`);
      }
    } else {
      consecutiveDark = 0;
      consecutiveMuted = 0;
    }
  }
  
  // 檢查 CTA 是否在適當位置
  const ctaIndex = script.sections.findIndex(s => s.type === 'cta');
  if (ctaIndex !== -1 && ctaIndex < script.sections.length * 0.6) {
    issues.push('CTA 區塊位置過早，建議放在頁面後半部分');
  }
  
  return {
    valid: issues.length === 0,
    issues,
  };
}

// ============================================================
// 輔助函數
// ============================================================

function getPersonaDescription(persona: Persona): string {
  const descriptions: Record<Persona, string> = {
    executive: '急躁的決策者 - 只看結論和 ROI',
    developer: '技術開發者 - 在乎規格和 API',
    investor: '保守投資者 - 看數據和市場地位',
    operator: 'IT 營運者 - 在乎穩定性和支援',
    general: '一般訪客 - 均衡展示',
  };
  return descriptions[persona];
}

function getGoalDescription(goal: PageGoal): string {
  const descriptions: Record<PageGoal, string> = {
    'lead-gen': '收集潛在客戶資訊',
    signup: '推動用戶註冊',
    demo: '預約產品演示',
    contact: '促進銷售聯繫',
    awareness: '建立品牌認知',
  };
  return descriptions[goal];
}

function getToneDescription(tone: Tone): string {
  const descriptions: Record<Tone, string> = {
    urgent: '急迫感 - 強調限時優惠',
    professional: '專業風格 - 沉穩可靠',
    technical: '技術導向 - 強調規格',
    friendly: '親切風格 - 降低門檻',
  };
  return descriptions[tone];
}

// ============================================================
// 預設劇本模板
// ============================================================

export const SCRIPT_TEMPLATES: Record<string, ScriptConfig> = {
  'enterprise-lead-gen': {
    persona: 'executive',
    goal: 'lead-gen',
    tone: 'professional',
  },
  'developer-signup': {
    persona: 'developer',
    goal: 'signup',
    tone: 'technical',
  },
  'investor-pitch': {
    persona: 'investor',
    goal: 'contact',
    tone: 'professional',
  },
  'general-awareness': {
    persona: 'general',
    goal: 'awareness',
    tone: 'friendly',
  },
};

