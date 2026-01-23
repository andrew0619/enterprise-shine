/**
 * 模板註冊系統 (Template Registry)
 * 
 * 此系統定義了所有可用的網站模板及其內容需求。
 * 當客戶選擇模板後，系統會自動產生對應的內容收集表單。
 */

export interface ContentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'number' | 'select' | 'rich-text';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    imageMinWidth?: number;
    imageMinHeight?: number;
    imageMaxSize?: number; // KB
    imageFormats?: string[];
  };
}

export interface ContentSection {
  id: string;
  name: string;
  description: string;
  fields: ContentField[];
  minItems?: number;
  maxItems?: number;
  repeatable?: boolean;
}

export interface TemplateModule {
  id: string;
  name: string;
  description: string;
  optional: boolean;
  sections: ContentSection[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  previewUrl: string; // 線上預覽網址
  complexity: 'simple' | 'medium' | 'enterprise';
  features: string[];
  modules: TemplateModule[];
  estimatedContentTime: string; // 預估填寫時間
  supportedLanguages: string[];
}

// ============================================================
// 模板定義
// ============================================================

export const quantumHorizonsTemplate: TemplateConfig = {
  id: 'quantum-horizons',
  name: 'Quantum Horizons',
  description: '適合中小型科技公司的現代化官網，包含產品展示、解決方案與新聞中心。',
  thumbnail: '/templates/quantum-horizons-preview.jpg',
  previewUrl: 'https://quantum-horizons.vercel.app',
  complexity: 'medium',
  features: ['多語系支援', '產品展示頁', '新聞中心', '響應式設計'],
  supportedLanguages: ['zh-TW', 'en'],
  estimatedContentTime: '3-5 天',
  modules: [
    // ===== 核心模組（必填）=====
    {
      id: 'brand',
      name: '品牌識別',
      description: '公司基本資訊與品牌元素',
      optional: false,
      sections: [
        {
          id: 'brand-identity',
          name: '品牌資訊',
          description: '公司名稱、Logo 與基本識別',
          fields: [
            {
              id: 'company-name',
              label: '公司名稱',
              type: 'text',
              required: true,
              placeholder: 'Future Quantum',
            },
            {
              id: 'company-name-en',
              label: '公司英文名稱',
              type: 'text',
              required: true,
              placeholder: 'Future Quantum Inc.',
            },
            {
              id: 'logo',
              label: '公司 Logo',
              type: 'image',
              required: true,
              helpText: '建議使用 SVG 或 PNG 透明背景，最小 200x50px',
              validation: {
                imageMinWidth: 200,
                imageMinHeight: 50,
                imageFormats: ['svg', 'png'],
              },
            },
            {
              id: 'tagline',
              label: '品牌標語',
              type: 'text',
              required: false,
              placeholder: '賦能 AI 驅動的創新與成長',
            },
          ],
        },
      ],
    },
    {
      id: 'hero',
      name: '首頁主視覺',
      description: '網站首頁的第一印象區塊',
      optional: false,
      sections: [
        {
          id: 'hero-content',
          name: 'Hero 區塊',
          description: '主視覺標題、副標題與行動呼籲',
          fields: [
            {
              id: 'hero-badge',
              label: 'Badge 標籤',
              type: 'text',
              required: false,
              placeholder: '全新發布',
              helpText: '可選，顯示在標題上方的小標籤',
            },
            {
              id: 'hero-title',
              label: '主標題',
              type: 'text',
              required: true,
              placeholder: '賦能 AI 驅動的創新與成長',
              validation: { maxLength: 50 },
            },
            {
              id: 'hero-subtitle',
              label: '副標題',
              type: 'textarea',
              required: true,
              placeholder: '我們在亞洲為您提供高性能運算和數據中心解決方案...',
              validation: { maxLength: 200 },
            },
            {
              id: 'hero-background',
              label: '背景圖片',
              type: 'image',
              required: true,
              helpText: '建議尺寸 1920x1080px，支援 JPG/PNG',
              validation: {
                imageMinWidth: 1920,
                imageMinHeight: 1080,
                imageMaxSize: 2000,
                imageFormats: ['jpg', 'jpeg', 'png'],
              },
            },
          ],
        },
      ],
    },
    {
      id: 'services',
      name: '核心服務',
      description: '展示公司的主要服務項目',
      optional: false,
      sections: [
        {
          id: 'service-items',
          name: '服務項目',
          description: '填寫 3 個核心服務',
          repeatable: true,
          minItems: 3,
          maxItems: 3,
          fields: [
            {
              id: 'service-title',
              label: '服務名稱',
              type: 'text',
              required: true,
              placeholder: 'AI 伺服器 & 算力租賃',
            },
            {
              id: 'service-description',
              label: '服務描述',
              type: 'textarea',
              required: true,
              placeholder: '提供企業級 NVIDIA GPU 叢集，支援大規模 AI 模型訓練與推論...',
              validation: { maxLength: 300 },
            },
            {
              id: 'service-icon',
              label: '服務圖示',
              type: 'select',
              required: true,
              helpText: '選擇一個代表此服務的圖示',
            },
          ],
        },
      ],
    },
    {
      id: 'stats',
      name: '數據統計',
      description: '展示公司成就的關鍵數據',
      optional: false,
      sections: [
        {
          id: 'stat-items',
          name: '統計數據',
          description: '填寫 4 個關鍵數據',
          repeatable: true,
          minItems: 4,
          maxItems: 4,
          fields: [
            {
              id: 'stat-value',
              label: '數值',
              type: 'text',
              required: true,
              placeholder: '99.99%',
            },
            {
              id: 'stat-label',
              label: '標籤',
              type: 'text',
              required: true,
              placeholder: '全年運行時間',
            },
          ],
        },
      ],
    },
    {
      id: 'contact',
      name: '聯絡資訊',
      description: '公司聯絡方式',
      optional: false,
      sections: [
        {
          id: 'contact-info',
          name: '聯絡方式',
          description: '填寫公司聯絡資訊',
          fields: [
            {
              id: 'address',
              label: '公司地址',
              type: 'text',
              required: true,
              placeholder: '台北市信義區...',
            },
            {
              id: 'phone',
              label: '電話',
              type: 'text',
              required: true,
              placeholder: '+886-2-1234-5678',
            },
            {
              id: 'email',
              label: 'Email',
              type: 'text',
              required: true,
              placeholder: 'contact@company.com',
            },
            {
              id: 'business-hours',
              label: '營業時間',
              type: 'text',
              required: false,
              placeholder: '週一至週五 09:00-18:00',
            },
          ],
        },
        {
          id: 'social-links',
          name: '社群連結',
          description: '社群媒體連結（選填）',
          fields: [
            {
              id: 'linkedin',
              label: 'LinkedIn',
              type: 'text',
              required: false,
              placeholder: 'https://linkedin.com/company/...',
            },
            {
              id: 'twitter',
              label: 'Twitter/X',
              type: 'text',
              required: false,
              placeholder: 'https://twitter.com/...',
            },
            {
              id: 'facebook',
              label: 'Facebook',
              type: 'text',
              required: false,
              placeholder: 'https://facebook.com/...',
            },
          ],
        },
      ],
    },
    {
      id: 'about',
      name: '關於我們',
      description: '公司介紹與核心價值',
      optional: false,
      sections: [
        {
          id: 'about-content',
          name: '公司介紹',
          description: '公司使命與願景',
          fields: [
            {
              id: 'mission',
              label: '公司使命',
              type: 'textarea',
              required: true,
              placeholder: '我們致力於為亞太地區企業提供世界級的高性能運算...',
              validation: { maxLength: 500 },
            },
            {
              id: 'vision',
              label: '公司願景',
              type: 'textarea',
              required: false,
              placeholder: '成為亞太地區領先的 AI 基礎設施服務提供商...',
              validation: { maxLength: 500 },
            },
          ],
        },
        {
          id: 'values',
          name: '核心價值',
          description: '公司核心價值觀（建議 3-4 項）',
          repeatable: true,
          minItems: 3,
          maxItems: 4,
          fields: [
            {
              id: 'value-title',
              label: '價值名稱',
              type: 'text',
              required: true,
              placeholder: '創新驅動',
            },
            {
              id: 'value-description',
              label: '價值描述',
              type: 'textarea',
              required: true,
              placeholder: '我們不斷探索新技術，推動行業創新...',
              validation: { maxLength: 200 },
            },
          ],
        },
      ],
    },

    // ===== 選配模組 =====
    {
      id: 'products',
      name: '產品展示',
      description: '詳細的產品介紹頁面',
      optional: true,
      sections: [
        {
          id: 'product-items',
          name: '產品資訊',
          description: '每個產品需要的詳細資訊',
          repeatable: true,
          minItems: 1,
          maxItems: 10,
          fields: [
            {
              id: 'product-name',
              label: '產品名稱',
              type: 'text',
              required: true,
              placeholder: 'NVIDIA GB200 NVL72',
            },
            {
              id: 'product-tagline',
              label: '產品標語',
              type: 'text',
              required: true,
              placeholder: '下一代 AI 超級運算平台',
            },
            {
              id: 'product-description',
              label: '產品描述',
              type: 'textarea',
              required: true,
              validation: { maxLength: 500 },
            },
            {
              id: 'product-image',
              label: '產品圖片',
              type: 'image',
              required: true,
              validation: {
                imageMinWidth: 800,
                imageMinHeight: 600,
                imageFormats: ['jpg', 'jpeg', 'png'],
              },
            },
            {
              id: 'product-specs',
              label: '產品規格',
              type: 'rich-text',
              required: false,
              helpText: '列出主要規格（如記憶體、效能等）',
            },
            {
              id: 'product-highlights',
              label: '產品亮點',
              type: 'textarea',
              required: false,
              helpText: '每行一個亮點，系統會自動轉為列表',
            },
          ],
        },
      ],
    },
    {
      id: 'news',
      name: '新聞中心',
      description: '公司新聞與動態',
      optional: true,
      sections: [
        {
          id: 'news-articles',
          name: '新聞文章',
          description: '新聞標題、摘要與圖片',
          repeatable: true,
          minItems: 3,
          maxItems: 20,
          fields: [
            {
              id: 'news-title',
              label: '新聞標題',
              type: 'text',
              required: true,
              validation: { maxLength: 100 },
            },
            {
              id: 'news-date',
              label: '發布日期',
              type: 'text',
              required: true,
              placeholder: '2024-01-15',
            },
            {
              id: 'news-summary',
              label: '新聞摘要',
              type: 'textarea',
              required: true,
              validation: { maxLength: 300 },
            },
            {
              id: 'news-image',
              label: '新聞封面圖',
              type: 'image',
              required: true,
              validation: {
                imageMinWidth: 600,
                imageMinHeight: 400,
                imageFormats: ['jpg', 'jpeg', 'png'],
              },
            },
            {
              id: 'news-content',
              label: '新聞內容',
              type: 'rich-text',
              required: false,
              helpText: '完整新聞內容（選填，若不填則只顯示摘要）',
            },
          ],
        },
      ],
    },
    {
      id: 'solutions',
      name: '解決方案',
      description: '客戶案例與解決方案',
      optional: true,
      sections: [
        {
          id: 'case-studies',
          name: '客戶案例',
          description: '成功案例展示',
          repeatable: true,
          minItems: 2,
          maxItems: 6,
          fields: [
            {
              id: 'case-client',
              label: '客戶名稱',
              type: 'text',
              required: true,
            },
            {
              id: 'case-industry',
              label: '產業類別',
              type: 'text',
              required: true,
              placeholder: '金融科技、製造業、醫療保健...',
            },
            {
              id: 'case-challenge',
              label: '挑戰',
              type: 'textarea',
              required: true,
              helpText: '客戶面臨的問題',
            },
            {
              id: 'case-solution',
              label: '解決方案',
              type: 'textarea',
              required: true,
              helpText: '我們提供的解決方案',
            },
            {
              id: 'case-result',
              label: '成果',
              type: 'textarea',
              required: true,
              helpText: '達成的具體成果',
            },
            {
              id: 'case-image',
              label: '案例圖片',
              type: 'image',
              required: false,
            },
          ],
        },
      ],
    },
    {
      id: 'faq',
      name: '常見問題',
      description: '常見問題與解答',
      optional: true,
      sections: [
        {
          id: 'faq-items',
          name: 'FAQ 問答',
          description: '問題與解答',
          repeatable: true,
          minItems: 5,
          maxItems: 15,
          fields: [
            {
              id: 'faq-question',
              label: '問題',
              type: 'text',
              required: true,
            },
            {
              id: 'faq-answer',
              label: '答案',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const enterpriseShineTemplate: TemplateConfig = {
  id: 'enterprise-shine',
  name: 'Enterprise Shine',
  description: '適合大型企業的全功能官網模板，包含完整的產品線展示、部落格、合作夥伴與求職頁面。',
  thumbnail: '/templates/enterprise-shine-preview.jpg',
  previewUrl: 'https://enterprise-shine.vercel.app',
  complexity: 'enterprise',
  features: ['多語系支援', '產品目錄', '部落格系統', '求職頁面', '合作夥伴', '完整定價頁'],
  supportedLanguages: ['zh-TW', 'en'],
  estimatedContentTime: '7-14 天',
  modules: [
    // 基礎模組（同 quantum-horizons 但更完整）
    {
      id: 'brand',
      name: '品牌識別',
      description: '完整的品牌識別系統',
      optional: false,
      sections: [
        {
          id: 'brand-identity',
          name: '品牌資訊',
          description: '公司名稱、Logo 與品牌色彩',
          fields: [
            {
              id: 'company-name',
              label: '公司名稱',
              type: 'text',
              required: true,
            },
            {
              id: 'company-name-en',
              label: '公司英文名稱',
              type: 'text',
              required: true,
            },
            {
              id: 'logo',
              label: '公司 Logo',
              type: 'image',
              required: true,
            },
            {
              id: 'logo-dark',
              label: '深色背景 Logo',
              type: 'image',
              required: false,
              helpText: '用於深色背景的 Logo 版本',
            },
            {
              id: 'favicon',
              label: 'Favicon',
              type: 'image',
              required: false,
              validation: {
                imageMinWidth: 32,
                imageMinHeight: 32,
                imageFormats: ['ico', 'png'],
              },
            },
          ],
        },
      ],
    },
    // ... 更多模組（Blog、Careers、Partners 等）
    {
      id: 'blog',
      name: '部落格',
      description: '公司部落格與文章',
      optional: true,
      sections: [
        {
          id: 'blog-posts',
          name: '部落格文章',
          description: '文章標題、內容與封面圖',
          repeatable: true,
          minItems: 3,
          maxItems: 50,
          fields: [
            {
              id: 'blog-title',
              label: '文章標題',
              type: 'text',
              required: true,
            },
            {
              id: 'blog-author',
              label: '作者',
              type: 'text',
              required: true,
            },
            {
              id: 'blog-category',
              label: '分類',
              type: 'select',
              required: true,
            },
            {
              id: 'blog-content',
              label: '文章內容',
              type: 'rich-text',
              required: true,
            },
            {
              id: 'blog-cover',
              label: '封面圖片',
              type: 'image',
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: 'careers',
      name: '人才招募',
      description: '職缺列表與公司文化',
      optional: true,
      sections: [
        {
          id: 'job-listings',
          name: '職缺',
          description: '開放的職位',
          repeatable: true,
          minItems: 1,
          maxItems: 20,
          fields: [
            {
              id: 'job-title',
              label: '職位名稱',
              type: 'text',
              required: true,
            },
            {
              id: 'job-department',
              label: '部門',
              type: 'text',
              required: true,
            },
            {
              id: 'job-location',
              label: '工作地點',
              type: 'text',
              required: true,
            },
            {
              id: 'job-type',
              label: '工作類型',
              type: 'select',
              required: true,
              helpText: '全職、兼職、約聘等',
            },
            {
              id: 'job-description',
              label: '職位描述',
              type: 'rich-text',
              required: true,
            },
            {
              id: 'job-requirements',
              label: '職位要求',
              type: 'rich-text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: 'partners',
      name: '合作夥伴',
      description: '合作夥伴與客戶 Logo 牆',
      optional: true,
      sections: [
        {
          id: 'partner-logos',
          name: '合作夥伴 Logo',
          description: '上傳合作夥伴或客戶的 Logo',
          repeatable: true,
          minItems: 4,
          maxItems: 20,
          fields: [
            {
              id: 'partner-name',
              label: '夥伴名稱',
              type: 'text',
              required: true,
            },
            {
              id: 'partner-logo',
              label: 'Logo',
              type: 'image',
              required: true,
            },
            {
              id: 'partner-url',
              label: '官網連結',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
    {
      id: 'pricing',
      name: '定價方案',
      description: '產品或服務的定價頁面',
      optional: true,
      sections: [
        {
          id: 'pricing-tiers',
          name: '定價方案',
          description: '不同等級的定價',
          repeatable: true,
          minItems: 2,
          maxItems: 4,
          fields: [
            {
              id: 'tier-name',
              label: '方案名稱',
              type: 'text',
              required: true,
              placeholder: '基礎版、專業版、企業版',
            },
            {
              id: 'tier-price',
              label: '價格',
              type: 'text',
              required: true,
              placeholder: '$99/月 或 聯繫銷售',
            },
            {
              id: 'tier-features',
              label: '功能列表',
              type: 'textarea',
              required: true,
              helpText: '每行一個功能',
            },
            {
              id: 'tier-highlighted',
              label: '是否為推薦方案',
              type: 'select',
              required: false,
            },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// 模板註冊表
// ============================================================

export const templateRegistry: Record<string, TemplateConfig> = {
  'quantum-horizons': quantumHorizonsTemplate,
  'enterprise-shine': enterpriseShineTemplate,
};

/**
 * 取得所有可用模板
 */
export function getAvailableTemplates(): TemplateConfig[] {
  return Object.values(templateRegistry);
}

/**
 * 根據 ID 取得模板配置
 */
export function getTemplateById(id: string): TemplateConfig | undefined {
  return templateRegistry[id];
}

/**
 * 根據模板和選擇的模組，產生內容需求清單
 */
export function generateContentRequirements(
  templateId: string,
  selectedModuleIds: string[]
): TemplateModule[] {
  const template = templateRegistry[templateId];
  if (!template) return [];

  return template.modules.filter(
    (module) => !module.optional || selectedModuleIds.includes(module.id)
  );
}

/**
 * 計算預估內容填寫時間
 */
export function estimateContentTime(modules: TemplateModule[]): string {
  let totalFields = 0;
  modules.forEach((module) => {
    module.sections.forEach((section) => {
      totalFields += section.fields.length * (section.maxItems || 1);
    });
  });

  if (totalFields < 30) return '1-2 天';
  if (totalFields < 60) return '3-5 天';
  if (totalFields < 100) return '5-7 天';
  return '7-14 天';
}

