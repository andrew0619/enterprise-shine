/**
 * AI 內容審核系統 (Content Validator)
 * 
 * 提供圖片規格檢查和文案品質分析功能
 * 協助客戶在提交前確保內容符合網站需求
 */

// ============================================================
// Types
// ============================================================

export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    width: number;
    height: number;
    aspectRatio: string;
    fileSize: number; // bytes
    format: string;
  };
  suggestions: string[];
}

export interface TextValidationResult {
  isValid: boolean;
  score: number; // 0-100
  errors: string[];
  warnings: string[];
  analysis: {
    charCount: number;
    wordCount: number;
    sentenceCount: number;
    readabilityScore: number;
    hasEmoji: boolean;
    language: string;
  };
  suggestions: string[];
}

export interface ContentFieldSpec {
  type: 'text' | 'textarea' | 'image';
  minLength?: number;
  maxLength?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxFileSize?: number; // KB
  allowedFormats?: string[];
  aspectRatio?: string; // e.g., "16:9", "1:1"
  required?: boolean;
}

// ============================================================
// Image Validation
// ============================================================

/**
 * 檢查圖片規格
 */
export async function validateImage(
  file: File,
  spec: ContentFieldSpec
): Promise<ImageValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // 取得圖片資訊
  const imageInfo = await getImageInfo(file);
  
  // 檢查檔案格式
  const format = file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN';
  const allowedFormats = spec.allowedFormats || ['JPEG', 'JPG', 'PNG', 'WEBP'];
  
  if (!allowedFormats.includes(format) && !allowedFormats.includes(format.toLowerCase())) {
    errors.push(`不支援的格式：${format}。請使用 ${allowedFormats.join(', ')} 格式。`);
  }

  // 檢查檔案大小
  const fileSizeKB = file.size / 1024;
  const maxFileSize = spec.maxFileSize || 5000; // 預設 5MB
  
  if (fileSizeKB > maxFileSize) {
    errors.push(`檔案過大：${formatFileSize(file.size)}。最大允許 ${formatFileSize(maxFileSize * 1024)}。`);
    suggestions.push('建議使用圖片壓縮工具（如 TinyPNG）來縮小檔案大小。');
  }

  // 檢查尺寸
  if (spec.minWidth && imageInfo.width < spec.minWidth) {
    errors.push(`圖片寬度不足：${imageInfo.width}px。最小需要 ${spec.minWidth}px。`);
  }
  
  if (spec.minHeight && imageInfo.height < spec.minHeight) {
    errors.push(`圖片高度不足：${imageInfo.height}px。最小需要 ${spec.minHeight}px。`);
  }

  if (spec.maxWidth && imageInfo.width > spec.maxWidth) {
    warnings.push(`圖片寬度較大：${imageInfo.width}px。建議不超過 ${spec.maxWidth}px 以優化載入速度。`);
  }

  if (spec.maxHeight && imageInfo.height > spec.maxHeight) {
    warnings.push(`圖片高度較大：${imageInfo.height}px。建議不超過 ${spec.maxHeight}px。`);
  }

  // 檢查比例
  if (spec.aspectRatio) {
    const [targetW, targetH] = spec.aspectRatio.split(':').map(Number);
    const targetRatio = targetW / targetH;
    const actualRatio = imageInfo.width / imageInfo.height;
    const tolerance = 0.05; // 5% 容差
    
    if (Math.abs(actualRatio - targetRatio) > tolerance) {
      warnings.push(`圖片比例不符：目前為 ${calculateAspectRatio(imageInfo.width, imageInfo.height)}，建議 ${spec.aspectRatio}。`);
      suggestions.push('建議裁切圖片以符合指定比例，確保在網站上顯示最佳效果。');
    }
  }

  // 解析度建議
  if (imageInfo.width < 800 || imageInfo.height < 600) {
    warnings.push('圖片解析度較低，可能在大螢幕上顯示模糊。');
    suggestions.push('建議使用至少 1200x800 像素的圖片以確保清晰度。');
  }

  // 格式優化建議
  if (format === 'PNG' && fileSizeKB > 500) {
    suggestions.push('PNG 檔案較大，如果是照片類圖片，建議轉換為 JPEG 或 WEBP 格式。');
  }

  if (format !== 'WEBP' && fileSizeKB > 200) {
    suggestions.push('建議使用 WEBP 格式可減少 30-50% 檔案大小，同時保持畫質。');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    details: {
      width: imageInfo.width,
      height: imageInfo.height,
      aspectRatio: calculateAspectRatio(imageInfo.width, imageInfo.height),
      fileSize: file.size,
      format,
    },
    suggestions,
  };
}

/**
 * 取得圖片尺寸資訊
 */
async function getImageInfo(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = URL.createObjectURL(file);
  });
}

/**
 * 計算長寬比
 */
function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;
  
  // 簡化比例
  if (w > 50 || h > 50) {
    const ratio = width / height;
    if (Math.abs(ratio - 16 / 9) < 0.1) return '16:9';
    if (Math.abs(ratio - 4 / 3) < 0.1) return '4:3';
    if (Math.abs(ratio - 1) < 0.1) return '1:1';
    if (Math.abs(ratio - 3 / 2) < 0.1) return '3:2';
    return `${width}:${height}`;
  }
  
  return `${w}:${h}`;
}

/**
 * 格式化檔案大小
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ============================================================
// Text/Content Validation
// ============================================================

/**
 * 分析文案品質
 */
export function validateText(
  text: string,
  spec: ContentFieldSpec
): TextValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const trimmedText = text.trim();
  const charCount = trimmedText.length;
  const wordCount = countWords(trimmedText);
  const sentenceCount = countSentences(trimmedText);
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(trimmedText);
  const language = detectLanguage(trimmedText);

  // 必填檢查
  if (spec.required && charCount === 0) {
    errors.push('此欄位為必填。');
  }

  // 長度檢查
  if (spec.minLength && charCount < spec.minLength) {
    errors.push(`內容過短：目前 ${charCount} 字，最少需要 ${spec.minLength} 字。`);
  }

  if (spec.maxLength && charCount > spec.maxLength) {
    errors.push(`內容過長：目前 ${charCount} 字，最多允許 ${spec.maxLength} 字。`);
  }

  // 品質分析
  let score = 100;

  // 檢查空白和格式
  if (/\s{3,}/.test(trimmedText)) {
    warnings.push('發現過多連續空白，建議整理格式。');
    score -= 5;
  }

  // 檢查重複字詞
  const repetitions = findRepetitions(trimmedText);
  if (repetitions.length > 0) {
    warnings.push(`發現重複用詞：「${repetitions.slice(0, 3).join('」「')}」，建議增加用詞變化。`);
    score -= 10;
  }

  // 檢查句子長度
  if (sentenceCount > 0) {
    const avgWordsPerSentence = wordCount / sentenceCount;
    if (avgWordsPerSentence > 40) {
      warnings.push('部分句子較長，建議拆分以提高閱讀性。');
      score -= 5;
    }
  }

  // SEO 建議
  if (spec.type === 'textarea' && charCount > 50 && charCount < 100) {
    suggestions.push('這段文字長度適合作為 Meta Description，建議確保包含主要關鍵字。');
  }

  // 標題特定建議
  if (spec.type === 'text' && spec.maxLength && spec.maxLength <= 100) {
    if (charCount > 60) {
      suggestions.push('標題較長，在搜尋結果中可能會被截斷。建議控制在 60 字以內。');
    }
    if (!/[！？。]$/.test(trimmedText) && !/[.!?]$/.test(trimmedText)) {
      // 標題不需要句號結尾，這是正確的
    }
  }

  // 可讀性評分
  const readabilityScore = calculateReadability(trimmedText, language);

  // 根據分析結果調整總分
  score = Math.max(0, Math.min(100, score));

  return {
    isValid: errors.length === 0,
    score,
    errors,
    warnings,
    analysis: {
      charCount,
      wordCount,
      sentenceCount,
      readabilityScore,
      hasEmoji,
      language,
    },
    suggestions,
  };
}

/**
 * 計算字數（支援中英文）
 */
function countWords(text: string): number {
  // 中文字數 + 英文單字數
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = text
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  return chineseChars + englishWords;
}

/**
 * 計算句子數
 */
function countSentences(text: string): number {
  // 支援中英文標點
  const sentences = text.split(/[。！？.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.length;
}

/**
 * 偵測語言
 */
function detectLanguage(text: string): string {
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  
  if (totalChars === 0) return 'unknown';
  
  const chineseRatio = chineseChars / totalChars;
  
  if (chineseRatio > 0.5) return 'zh-TW';
  if (chineseRatio > 0.2) return 'mixed';
  return 'en';
}

/**
 * 尋找重複詞
 */
function findRepetitions(text: string): string[] {
  const words: Record<string, number> = {};
  
  // 中文詞彙（簡單分詞：2-4 字詞）
  for (let len = 2; len <= 4; len++) {
    for (let i = 0; i <= text.length - len; i++) {
      const word = text.substring(i, i + len);
      if (/^[\u4e00-\u9fa5]+$/.test(word)) {
        words[word] = (words[word] || 0) + 1;
      }
    }
  }
  
  // 英文單字
  const englishWords = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  englishWords.forEach((word) => {
    words[word] = (words[word] || 0) + 1;
  });
  
  return Object.entries(words)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
}

/**
 * 計算可讀性分數（簡化版）
 */
function calculateReadability(text: string, language: string): number {
  // 基於句子長度和詞彙複雜度的簡單評分
  const sentences = countSentences(text);
  const words = countWords(text);
  
  if (sentences === 0 || words === 0) return 50;
  
  const avgWordsPerSentence = words / sentences;
  
  // 理想的平均句長約 15-20 字/詞
  let score = 100;
  
  if (avgWordsPerSentence > 30) score -= 20;
  else if (avgWordsPerSentence > 25) score -= 10;
  else if (avgWordsPerSentence < 5) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

// ============================================================
// Batch Validation
// ============================================================

export interface ValidationReport {
  projectId: string;
  timestamp: string;
  totalFields: number;
  validFields: number;
  invalidFields: number;
  warningFields: number;
  overallScore: number;
  fieldResults: Array<{
    moduleId: string;
    moduleName: string;
    fieldId: string;
    fieldName: string;
    type: 'text' | 'image';
    isValid: boolean;
    score?: number;
    errors: string[];
    warnings: string[];
    suggestions: string[];
  }>;
  summary: {
    criticalIssues: string[];
    recommendations: string[];
  };
}

/**
 * 產生完整的內容驗證報告
 */
export function generateValidationReport(
  projectId: string,
  fieldResults: ValidationReport['fieldResults']
): ValidationReport {
  const validFields = fieldResults.filter((f) => f.isValid).length;
  const invalidFields = fieldResults.filter((f) => !f.isValid).length;
  const warningFields = fieldResults.filter((f) => f.warnings.length > 0).length;
  
  // 計算整體分數
  const scores = fieldResults.filter((f) => f.score !== undefined).map((f) => f.score!);
  const overallScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  // 彙整關鍵問題
  const criticalIssues: string[] = [];
  const recommendations: string[] = [];

  // 統計圖片問題
  const imageIssues = fieldResults.filter((f) => f.type === 'image' && !f.isValid);
  if (imageIssues.length > 0) {
    criticalIssues.push(`${imageIssues.length} 張圖片不符合規格要求`);
  }

  // 統計文案問題
  const textIssues = fieldResults.filter((f) => f.type === 'text' && !f.isValid);
  if (textIssues.length > 0) {
    criticalIssues.push(`${textIssues.length} 個文案欄位需要修正`);
  }

  // 產生建議
  if (invalidFields > 0) {
    recommendations.push('請優先處理標記為「錯誤」的欄位');
  }
  if (warningFields > 5) {
    recommendations.push('有多個欄位出現警告，建議整體檢視內容品質');
  }
  if (overallScore < 70) {
    recommendations.push('整體內容品質分數較低，建議參考各欄位的改進建議');
  }

  return {
    projectId,
    timestamp: new Date().toISOString(),
    totalFields: fieldResults.length,
    validFields,
    invalidFields,
    warningFields,
    overallScore,
    fieldResults,
    summary: {
      criticalIssues,
      recommendations,
    },
  };
}

// ============================================================
// Pre-defined Specs for Common Fields
// ============================================================

export const FIELD_SPECS: Record<string, ContentFieldSpec> = {
  // Hero Section
  hero_title: {
    type: 'text',
    minLength: 5,
    maxLength: 60,
    required: true,
  },
  hero_subtitle: {
    type: 'text',
    minLength: 10,
    maxLength: 120,
    required: true,
  },
  hero_image: {
    type: 'image',
    minWidth: 1920,
    minHeight: 1080,
    maxFileSize: 2000, // 2MB
    aspectRatio: '16:9',
    allowedFormats: ['JPEG', 'JPG', 'PNG', 'WEBP'],
  },
  
  // Logo
  logo: {
    type: 'image',
    minWidth: 200,
    minHeight: 50,
    maxFileSize: 500,
    allowedFormats: ['PNG', 'SVG', 'WEBP'],
  },
  
  // Product Images
  product_image: {
    type: 'image',
    minWidth: 800,
    minHeight: 800,
    maxFileSize: 1000,
    aspectRatio: '1:1',
    allowedFormats: ['JPEG', 'JPG', 'PNG', 'WEBP'],
  },
  
  // Team Member Photo
  team_photo: {
    type: 'image',
    minWidth: 400,
    minHeight: 400,
    maxFileSize: 800,
    aspectRatio: '1:1',
    allowedFormats: ['JPEG', 'JPG', 'PNG', 'WEBP'],
  },
  
  // Description Text
  description: {
    type: 'textarea',
    minLength: 50,
    maxLength: 500,
    required: true,
  },
  
  // Short Description
  short_description: {
    type: 'text',
    minLength: 20,
    maxLength: 160,
    required: true,
  },
  
  // SEO Meta
  meta_title: {
    type: 'text',
    minLength: 30,
    maxLength: 60,
    required: true,
  },
  meta_description: {
    type: 'text',
    minLength: 100,
    maxLength: 160,
    required: true,
  },
};


