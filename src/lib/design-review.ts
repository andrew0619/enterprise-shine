/**
 * AI 設計評審系統
 * 
 * 三重評審機制：
 * 1. 保守型客戶評審 - 硬體科技業標準
 * 2. 設計總監評審 - UI/UX 美學標準
 * 3. 客戶總監評審 - 商業需求符合度
 */

import type { ThemeConfig } from '@/styles/themes';

// ============================================================
// 類型定義
// ============================================================

export type ReviewerType = 'conservative' | 'design' | 'account';

export interface ReviewScore {
  reviewerId: ReviewerType;
  reviewerName: string;
  reviewerIcon: string;
  score: number;           // 1-10
  passed: boolean;         // score >= 7
  summary: string;         // 一句話總結
  feedback: string;        // 詳細意見
  strengths: string[];     // 優點
  concerns: string[];      // 問題清單
  suggestions: string[];   // 改進建議
}

export interface DesignReviewResult {
  id: string;
  reviews: {
    conservative: ReviewScore;
    design: ReviewScore;
    account: ReviewScore;
  };
  
  overallScore: number;
  overallPassed: boolean;
  consensus: string;
  recommendation: 'approve' | 'revise' | 'reject';
  
  timestamp: string;
  duration: number;  // 評審耗時（毫秒）
}

// 設計提交資料
export interface DesignSubmission {
  themeId: string;
  themeConfig: ThemeConfig;
  
  // 區塊組合
  blocks: {
    hero: 'center' | 'split' | 'gradient';
    features: 'grid' | 'bento' | 'alternating';
  };
  
  // 客戶需求摘要
  clientBrief: {
    companyName: string;
    companyType: string;      // 例：AI 伺服器製造商
    targetAudience: string;   // 例：企業 IT 採購主管
    brandKeywords: string[];  // 例：可靠、高效能、創新
    competitors: string[];    // 例：Supermicro, Dell
  };
}

// ============================================================
// 評審角色配置
// ============================================================

export const reviewerProfiles = {
  conservative: {
    id: 'conservative' as const,
    name: '保守型客戶評審',
    icon: '🏢',
    role: '硬體科技業資深高管',
    description: '以投資人視角評估設計的專業可信度',
  },
  design: {
    id: 'design' as const,
    name: '設計總監評審',
    icon: '🎨',
    role: '15年經驗 UI/UX 設計總監',
    description: '以設計專業標準評估視覺品質',
  },
  account: {
    id: 'account' as const,
    name: '客戶總監評審',
    icon: '💼',
    role: '專案客戶總監',
    description: '確保設計符合客戶商業需求',
  },
};

// ============================================================
// 評審 Prompts
// ============================================================

export const reviewerPrompts = {
  conservative: `你是一位資深的硬體科技業高階主管，擁有投資人背景，對設計非常挑剔。

你正在評估一個企業官網設計，客戶是硬體科技公司（AI伺服器、GPU算力、顯卡設備等）。

你的評估標準：
1. 專業可信度：這個設計看起來像是一家值得投資的公司嗎？
2. 保守穩重：設計是否過於花俏或冒險？硬體業需要穩重感
3. 競品對標：與 NVIDIA、Supermicro、Dell 等大廠相比如何？
4. 風險規避：有沒有任何元素可能讓投資人或大客戶感到不安？

你應該嚴格檢查並標記問題：
❌ 過於鮮豔的顏色（除非是品牌色）
❌ 過多或過於花俏的動畫效果
❌ 看起來像新創或軟體公司的設計
❌ 任何可能顯得不專業的元素
❌ 過於實驗性的排版或佈局

請以 JSON 格式回覆，包含以下欄位：
{
  "score": 1-10 的整數,
  "summary": "一句話總結評價",
  "feedback": "詳細評價（2-3段）",
  "strengths": ["優點1", "優點2"],
  "concerns": ["問題1", "問題2"],
  "suggestions": ["建議1", "建議2"]
}

評分標準：
- 10: 完全符合企業級硬體科技公司標準，可直接使用
- 8-9: 優秀，有小地方可微調
- 7: 可接受，達到基本標準
- 5-6: 需要修改，有明顯問題
- 1-4: 不適合，需要重新設計`,

  design: `你是一位擁有 15 年經驗的 UI/UX 設計總監，專精企業級 B2B 設計。
你曾在頂尖設計公司工作，作品多次獲得 Awwwards、Dribbble 等獎項。

你正在評估一個企業官網設計的視覺品質。

你的評估標準：
1. 視覺層級：資訊架構是否清晰？視覺焦點是否正確？
2. 色彩運用：配色是否和諧？是否符合品牌調性？
3. 字體排版：字體選擇、層級、間距是否專業？
4. 一致性：設計語言是否統一？是否遵循設計系統？
5. 現代感：設計是否跟上 2024-2026 的設計趨勢？
6. 細節品質：微互動、過渡效果、邊角處理是否精緻？
7. 可及性：對比度、可讀性是否達標？

你應該檢查：
✓ 色彩對比度是否符合 WCAG AA 標準
✓ 字體層級是否清晰（H1-H6、Body、Caption）
✓ 間距是否遵循 4px/8px 網格系統
✓ 響應式斷點處理是否合理
✓ Dark Mode / Light Mode 的處理

請以 JSON 格式回覆，包含以下欄位：
{
  "score": 1-10 的整數,
  "summary": "一句話總結評價",
  "feedback": "詳細評價（2-3段）",
  "strengths": ["優點1", "優點2"],
  "concerns": ["問題1", "問題2"],
  "suggestions": ["建議1", "建議2"]
}

評分標準：
- 10: Dribbble/Awwwards 水準，設計精緻無瑕
- 8-9: 專業水準，可以交付給客戶
- 7: 達到基本專業標準
- 5-6: 需要設計師修正
- 1-4: 設計基礎有問題，需重做`,

  account: `你是一位資深專案客戶總監，負責確保設計符合客戶的商業需求。
你擅長理解客戶需求，並確保設計團隊的產出能夠滿足這些需求。

你正在評估一個企業官網設計是否符合客戶需求。

你的評估標準：
1. 需求吻合度：設計是否滿足客戶的所有核心需求？
2. 品牌一致性：是否符合客戶的品牌調性和關鍵詞？
3. 目標受眾：設計是否能打動目標客戶（企業採購、IT主管）？
4. 轉換優化：CTA 是否清晰？使用者路徑是否順暢？
5. 差異化：與競品相比是否有記憶點？
6. 信任元素：是否適當展示客戶logo、認證、案例？

你應該確認：
✓ 所有必要的資訊區塊都有涵蓋
✓ 聯絡方式、CTA 按鈕位置合理且明顯
✓ 產品/服務的價值主張清楚傳達
✓ 信任元素（客戶 logo、認證標章、案例）適當展示
✓ 符合目標產業的溝通風格

請以 JSON 格式回覆，包含以下欄位：
{
  "score": 1-10 的整數,
  "summary": "一句話總結評價",
  "feedback": "詳細評價（2-3段）",
  "strengths": ["優點1", "優點2"],
  "concerns": ["問題1", "問題2"],
  "suggestions": ["建議1", "建議2"]
}

評分標準：
- 10: 完美符合客戶需求，可直接上線
- 8-9: 符合需求，細節可微調
- 7: 達到基本需求
- 5-6: 有遺漏或偏離，需要修正
- 1-4: 嚴重偏離客戶需求`,
};

// ============================================================
// 模擬 AI 評審（本地版本，不需 API）
// ============================================================

/**
 * 基於規則的評審邏輯
 * 實際生產環境應該連接 OpenAI/Claude API
 */
export function evaluateDesign(
  submission: DesignSubmission,
  reviewerType: ReviewerType
): ReviewScore {
  const profile = reviewerProfiles[reviewerType];
  const theme = submission.themeConfig;
  const blocks = submission.blocks;
  
  let score = 7; // 基礎分數
  const strengths: string[] = [];
  const concerns: string[] = [];
  const suggestions: string[] = [];
  
  // ============================================================
  // 保守型客戶評審邏輯
  // ============================================================
  if (reviewerType === 'conservative') {
    // Dark mode 對硬體科技業是加分
    if (theme.mode === 'dark') {
      score += 0.5;
      strengths.push('深色主題符合科技業專業形象');
    }
    
    // 檢查主色是否為藍色系（最安全）
    const primaryHue = parseInt(theme.colors.primary.split(' ')[0]);
    if (primaryHue >= 200 && primaryHue <= 240) {
      score += 0.5;
      strengths.push('藍色調傳達可信賴感');
    } else if (primaryHue >= 260 && primaryHue <= 290) {
      concerns.push('紫色調可能對保守客戶略顯前衛');
      suggestions.push('考慮使用更保守的藍色調');
    }
    
    // 檢查動畫等級
    if (theme.style.animationLevel === 'enhanced') {
      score -= 0.5;
      concerns.push('動畫效果較多，可能影響專業感');
      suggestions.push('建議將動畫調整為 standard 或 minimal');
    } else if (theme.style.animationLevel === 'minimal') {
      score += 0.3;
      strengths.push('簡潔的動畫風格符合企業形象');
    }
    
    // 檢查圓角
    if (theme.style.borderRadius === 'soft') {
      concerns.push('較圓潤的設計風格可能不夠硬朗');
      suggestions.push('考慮使用 default 或 sharp 圓角');
    } else if (theme.style.borderRadius === 'sharp') {
      score += 0.3;
      strengths.push('銳利的設計風格展現專業感');
    }
    
    // Hero 選擇
    if (blocks.hero === 'gradient') {
      score += 0.5;
      strengths.push('漸層 Hero 營造科技感氛圍');
    } else if (blocks.hero === 'split') {
      strengths.push('分割式 Hero 有效展示產品');
    }
  }
  
  // ============================================================
  // 設計總監評審邏輯
  // ============================================================
  if (reviewerType === 'design') {
    // 一致性檢查
    strengths.push('設計系統保持一致性');
    
    // 根據主題模式評估
    if (theme.mode === 'dark' && theme.effects) {
      score += 0.5;
      strengths.push('Dark mode 的發光效果增添層次感');
    }
    
    // Bento grid 是現代設計趨勢
    if (blocks.features === 'bento') {
      score += 0.5;
      strengths.push('Bento Grid 佈局符合現代設計趨勢');
    }
    
    // 漸層 Hero 視覺效果好
    if (blocks.hero === 'gradient') {
      score += 0.3;
      strengths.push('漸層背景營造視覺深度');
    }
    
    // 交錯式 Features 有良好的閱讀節奏
    if (blocks.features === 'alternating') {
      score += 0.3;
      strengths.push('交錯式佈局創造閱讀節奏');
    }
    
    // 基於圓角風格
    if (theme.style.borderRadius === 'default') {
      strengths.push('圓角處理恰到好處');
    }
    
    // 通用建議
    suggestions.push('確保響應式設計在各斷點都表現良好');
    suggestions.push('驗證色彩對比度符合 WCAG AA 標準');
  }
  
  // ============================================================
  // 客戶總監評審邏輯
  // ============================================================
  if (reviewerType === 'account') {
    // 檢查客戶需求
    const brief = submission.clientBrief;
    
    // 基於品牌關鍵詞檢查
    if (brief.brandKeywords.includes('創新') || brief.brandKeywords.includes('innovation')) {
      if (theme.mode === 'dark' || blocks.hero === 'gradient') {
        score += 0.5;
        strengths.push('設計風格符合「創新」的品牌定位');
      }
    }
    
    if (brief.brandKeywords.includes('可靠') || brief.brandKeywords.includes('reliable')) {
      if (theme.style.animationLevel !== 'enhanced') {
        score += 0.3;
        strengths.push('穩重的設計傳達「可靠」的品牌形象');
      }
    }
    
    // Hero 和目標受眾
    strengths.push('Hero 區塊有效傳達價值主張');
    strengths.push('CTA 位置明確，引導轉換');
    
    // Features 展示
    if (blocks.features === 'grid' || blocks.features === 'bento') {
      strengths.push('特色功能展示清晰，易於理解');
    }
    
    // 建議
    suggestions.push('確保聯絡資訊在明顯位置');
    suggestions.push('考慮添加客戶案例或信任標章');
  }
  
  // 確保分數在範圍內
  score = Math.min(10, Math.max(1, Math.round(score * 10) / 10));
  
  // 生成總結
  const summaries = {
    conservative: score >= 8 
      ? '專業穩重，符合硬體科技業標準' 
      : score >= 7 
        ? '基本符合專業形象，有改進空間'
        : '需要調整以符合企業級標準',
    design: score >= 8
      ? '設計品質優秀，視覺效果精緻'
      : score >= 7
        ? '設計合格，細節可再優化'
        : '需要設計師進一步打磨',
    account: score >= 8
      ? '完全符合客戶需求，可進入提案'
      : score >= 7
        ? '基本滿足需求，建議微調'
        : '有遺漏，需補充或修正',
  };
  
  const feedbacks = {
    conservative: `從硬體科技業的角度來看，${theme.mode === 'dark' ? '深色主題' : '淺色主題'}的選擇${theme.mode === 'dark' ? '符合業界慣例' : '也是可接受的選擇'}。${theme.nameZh} 主題整體呈現專業感。

${blocks.hero === 'gradient' ? 'Hero 區塊的漸層效果營造科技感，' : blocks.hero === 'split' ? 'Hero 區塊的產品展示方式直接有效，' : 'Hero 區塊的置中設計簡潔大方，'}適合用於吸引企業客戶注意力。

整體而言，這個設計方案${score >= 7 ? '可以向投資人和大客戶展示' : '需要進一步調整才適合正式場合'}。`,

    design: `從設計專業角度評估，${theme.nameZh} 主題展現了${theme.mode === 'dark' ? '現代科技感' : '清爽專業感'}的視覺風格。

${blocks.features === 'bento' ? 'Bento Grid 佈局是 2024-2026 年的設計趨勢，' : blocks.features === 'alternating' ? '交錯式佈局創造良好的視覺節奏，' : '網格式佈局保持資訊的清晰度，'}與整體設計語言協調一致。

色彩系統${theme.style.animationLevel === 'enhanced' ? '搭配豐富的動效，' : '保持克制，'}整體呈現${score >= 8 ? '高品質的設計水準' : '合格的專業水準'}。`,

    account: `根據客戶需求分析，${submission.clientBrief.companyName} 作為${submission.clientBrief.companyType}，需要向${submission.clientBrief.targetAudience}傳達品牌價值。

目前的設計方案${score >= 7 ? '基本滿足' : '部分偏離'}客戶的品牌關鍵詞：${submission.clientBrief.brandKeywords.join('、')}。

${score >= 8 ? '建議可以進入客戶提案階段。' : '建議根據回饋進行調整後再提案。'}`,
  };
  
  return {
    reviewerId: reviewerType,
    reviewerName: profile.name,
    reviewerIcon: profile.icon,
    score,
    passed: score >= 7,
    summary: summaries[reviewerType],
    feedback: feedbacks[reviewerType],
    strengths,
    concerns,
    suggestions,
  };
}

// ============================================================
// 執行完整評審
// ============================================================

export async function conductDesignReview(
  submission: DesignSubmission
): Promise<DesignReviewResult> {
  const startTime = Date.now();
  
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // 執行三個評審
  const conservative = evaluateDesign(submission, 'conservative');
  const design = evaluateDesign(submission, 'design');
  const account = evaluateDesign(submission, 'account');
  
  // 計算總分
  const scores = [conservative.score, design.score, account.score];
  const overallScore = Math.round((scores.reduce((a, b) => a + b, 0) / 3) * 10) / 10;
  const overallPassed = scores.every(s => s >= 7);
  const allPassed = conservative.passed && design.passed && account.passed;
  
  // 決定推薦
  let recommendation: 'approve' | 'revise' | 'reject';
  if (allPassed && overallScore >= 7.5) {
    recommendation = 'approve';
  } else if (overallScore >= 6) {
    recommendation = 'revise';
  } else {
    recommendation = 'reject';
  }
  
  // 生成共識結論
  let consensus: string;
  if (recommendation === 'approve') {
    consensus = `此設計變體通過三重評審，整體評分 ${overallScore}/10。設計專業穩重，符合硬體科技業標準，可進入客戶提案階段。`;
  } else if (recommendation === 'revise') {
    const failedReviews = [conservative, design, account].filter(r => !r.passed);
    consensus = `設計需要微調。${failedReviews.map(r => r.reviewerName).join('、')}提出了改進建議，請根據回饋進行優化後重新評審。`;
  } else {
    consensus = `設計未通過評審，建議重新選擇主題和區塊組合。請參考各評審的具體意見進行調整。`;
  }
  
  return {
    id: `review-${Date.now()}`,
    reviews: {
      conservative,
      design,
      account,
    },
    overallScore,
    overallPassed,
    consensus,
    recommendation,
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime,
  };
}

// ============================================================
// 工具函數
// ============================================================

export function getRecommendationLabel(recommendation: string): {
  label: string;
  color: string;
  icon: string;
} {
  switch (recommendation) {
    case 'approve':
      return { label: '核准使用', color: 'text-green-500', icon: '✅' };
    case 'revise':
      return { label: '建議修改', color: 'text-yellow-500', icon: '⚠️' };
    case 'reject':
      return { label: '需要重做', color: 'text-red-500', icon: '❌' };
    default:
      return { label: '待評審', color: 'text-muted-foreground', icon: '⏳' };
  }
}

export function getScoreColor(score: number): string {
  if (score >= 8) return 'text-green-500';
  if (score >= 7) return 'text-blue-500';
  if (score >= 5) return 'text-yellow-500';
  return 'text-red-500';
}

export function getScoreBarColor(score: number): string {
  if (score >= 8) return 'bg-green-500';
  if (score >= 7) return 'bg-blue-500';
  if (score >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
}

