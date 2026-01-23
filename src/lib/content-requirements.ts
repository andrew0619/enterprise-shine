/**
 * 模組內容需求映射系統 (Content Requirements Mapper)
 * 
 * 核心功能：根據客戶選擇的模板和模組，自動計算出完整的內容需求清單
 * 這是「以終為始」策略的關鍵 - 知道最終需要什麼，才能向客戶索取正確的素材
 */

// ============================================================
// Types
// ============================================================

export interface ContentRequirement {
  id: string;
  moduleId: string;
  moduleName: string;
  sectionId: string;
  sectionName: string;
  
  // 內容類型
  type: 'text' | 'textarea' | 'image' | 'logo' | 'icon';
  
  // 顯示資訊
  label: string;
  description: string;
  placeholder?: string;
  
  // 是否必填
  required: boolean;
  priority: 'high' | 'medium' | 'low'; // 收集優先順序
  
  // 規格要求
  specs: {
    // 文字規格
    minLength?: number;
    maxLength?: number;
    
    // 圖片規格
    minWidth?: number;
    minHeight?: number;
    maxFileSize?: number; // KB
    aspectRatio?: string;
    formats?: string[];
    
    // 提示
    tips?: string[];
    examples?: string[];
  };
  
  // 收集階段（分批索取）
  collectionPhase: 1 | 2 | 3;
  
  // 用於前台顯示的友善說明
  clientFacingLabel: string;
  clientFacingDescription: string;
}

export interface ModuleRequirements {
  moduleId: string;
  moduleName: string;
  description: string;
  requirements: ContentRequirement[];
  
  // 可重複項目（如多個產品、多個團隊成員）
  repeatableItems?: {
    minCount: number;
    maxCount: number;
    itemRequirements: ContentRequirement[];
  };
}

export interface ProjectContentChecklist {
  projectId: string;
  templateId: string;
  
  // 按階段分組的需求
  phases: {
    phase1: ContentRequirement[]; // 品牌基礎
    phase2: ContentRequirement[]; // 主要內容
    phase3: ContentRequirement[]; // 補充內容
  };
  
  // 統計
  stats: {
    total: number;
    required: number;
    optional: number;
    byType: {
      text: number;
      image: number;
    };
  };
  
  // 預估時間
  estimatedCollectionDays: number;
}

// ============================================================
// 基礎需求定義
// ============================================================

const BRAND_BASICS: ContentRequirement[] = [
  {
    id: 'brand_logo',
    moduleId: 'brand',
    moduleName: '品牌資訊',
    sectionId: 'identity',
    sectionName: '品牌識別',
    type: 'logo',
    label: 'Logo',
    description: '公司標誌，將顯示於網站導覽列',
    required: true,
    priority: 'high',
    collectionPhase: 1,
    specs: {
      minWidth: 200,
      minHeight: 50,
      maxFileSize: 500,
      formats: ['PNG', 'SVG'],
      tips: [
        '建議使用 PNG 透明背景',
        'SVG 格式可確保任何尺寸都清晰',
      ],
    },
    clientFacingLabel: '公司 Logo',
    clientFacingDescription: '請提供您的公司標誌，建議使用 PNG 透明背景或 SVG 向量格式',
  },
  {
    id: 'brand_color',
    moduleId: 'brand',
    moduleName: '品牌資訊',
    sectionId: 'identity',
    sectionName: '品牌識別',
    type: 'text',
    label: '品牌主色',
    description: '網站的主要色彩',
    placeholder: '#3B82F6',
    required: true,
    priority: 'high',
    collectionPhase: 1,
    specs: {
      tips: ['請提供色碼，例如 #FF5733'],
    },
    clientFacingLabel: '品牌主色',
    clientFacingDescription: '您希望網站使用的主要顏色（色碼）',
  },
  {
    id: 'company_name',
    moduleId: 'brand',
    moduleName: '品牌資訊',
    sectionId: 'identity',
    sectionName: '品牌識別',
    type: 'text',
    label: '公司名稱',
    description: '完整的公司名稱',
    required: true,
    priority: 'high',
    collectionPhase: 1,
    specs: {
      maxLength: 100,
    },
    clientFacingLabel: '公司名稱',
    clientFacingDescription: '您的公司或品牌全名',
  },
  {
    id: 'company_slogan',
    moduleId: 'brand',
    moduleName: '品牌資訊',
    sectionId: 'identity',
    sectionName: '品牌識別',
    type: 'text',
    label: '公司標語',
    description: '簡短的品牌標語',
    required: false,
    priority: 'medium',
    collectionPhase: 1,
    specs: {
      maxLength: 50,
      tips: ['一句話描述您的品牌價值'],
    },
    clientFacingLabel: '品牌標語 (Slogan)',
    clientFacingDescription: '一句話總結您的品牌（選填）',
  },
];

// ============================================================
// Hero 模組需求
// ============================================================

const HERO_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'hero_title',
    moduleId: 'hero',
    moduleName: '首頁主視覺',
    sectionId: 'hero',
    sectionName: '主視覺區塊',
    type: 'text',
    label: '主標題',
    description: '首頁最醒目的標題文字',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minLength: 5,
      maxLength: 60,
      tips: [
        '建議 5-15 個字',
        '傳達您的核心價值主張',
      ],
      examples: [
        '打造智慧未來',
        '您的數位轉型夥伴',
      ],
    },
    clientFacingLabel: '首頁大標題',
    clientFacingDescription: '網站首頁最醒目的標題，建議 5-15 個字，傳達您的核心價值',
  },
  {
    id: 'hero_subtitle',
    moduleId: 'hero',
    moduleName: '首頁主視覺',
    sectionId: 'hero',
    sectionName: '主視覺區塊',
    type: 'textarea',
    label: '副標題',
    description: '補充說明主標題',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minLength: 20,
      maxLength: 150,
    },
    clientFacingLabel: '首頁副標題',
    clientFacingDescription: '補充說明您的服務或產品特色，建議 20-50 字',
  },
  {
    id: 'hero_image',
    moduleId: 'hero',
    moduleName: '首頁主視覺',
    sectionId: 'hero',
    sectionName: '主視覺區塊',
    type: 'image',
    label: '主視覺圖片',
    description: '首頁的背景或主要圖片',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minWidth: 1920,
      minHeight: 1080,
      maxFileSize: 3000,
      aspectRatio: '16:9',
      formats: ['JPG', 'PNG', 'WEBP'],
      tips: [
        '建議尺寸 1920x1080 像素以上',
        '選擇能代表公司形象的專業照片',
        '避免使用過於複雜的圖片',
      ],
    },
    clientFacingLabel: '首頁主視覺圖片',
    clientFacingDescription: '首頁的大圖，建議使用能代表公司形象的專業照片（1920x1080 像素以上）',
  },
  {
    id: 'hero_cta_text',
    moduleId: 'hero',
    moduleName: '首頁主視覺',
    sectionId: 'hero',
    sectionName: '主視覺區塊',
    type: 'text',
    label: '行動按鈕文字',
    description: '主要的 Call-to-Action 按鈕',
    placeholder: '立即了解',
    required: false,
    priority: 'low',
    collectionPhase: 3,
    specs: {
      maxLength: 20,
      examples: ['立即諮詢', '免費體驗', '了解更多'],
    },
    clientFacingLabel: '行動按鈕文字',
    clientFacingDescription: '首頁按鈕上的文字，例如「立即諮詢」、「免費體驗」',
  },
];

// ============================================================
// About 模組需求
// ============================================================

const ABOUT_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'about_intro',
    moduleId: 'about',
    moduleName: '關於我們',
    sectionId: 'introduction',
    sectionName: '公司介紹',
    type: 'textarea',
    label: '公司簡介',
    description: '公司的背景和故事',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minLength: 100,
      maxLength: 500,
      tips: [
        '介紹公司的創立背景',
        '說明核心業務和優勢',
        '建議 200-300 字',
      ],
    },
    clientFacingLabel: '公司簡介',
    clientFacingDescription: '介紹您的公司背景、歷史和核心業務，建議 200-300 字',
  },
  {
    id: 'about_mission',
    moduleId: 'about',
    moduleName: '關於我們',
    sectionId: 'values',
    sectionName: '使命願景',
    type: 'textarea',
    label: '使命與願景',
    description: '公司的使命和願景陳述',
    required: false,
    priority: 'medium',
    collectionPhase: 3,
    specs: {
      minLength: 50,
      maxLength: 300,
    },
    clientFacingLabel: '使命與願景',
    clientFacingDescription: '您的公司希望達成什麼目標？為客戶創造什麼價值？',
  },
  {
    id: 'about_image',
    moduleId: 'about',
    moduleName: '關於我們',
    sectionId: 'introduction',
    sectionName: '公司介紹',
    type: 'image',
    label: '公司形象照',
    description: '代表公司形象的照片',
    required: false,
    priority: 'medium',
    collectionPhase: 2,
    specs: {
      minWidth: 1200,
      minHeight: 800,
      maxFileSize: 2000,
      tips: [
        '可以是辦公室環境、團隊工作照',
        '或公司外觀照片',
      ],
    },
    clientFacingLabel: '公司形象照片',
    clientFacingDescription: '辦公室環境、團隊工作照或公司外觀照片',
  },
];

// ============================================================
// Services 模組需求
// ============================================================

const SERVICES_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'services_intro',
    moduleId: 'services',
    moduleName: '服務項目',
    sectionId: 'overview',
    sectionName: '服務總覽',
    type: 'textarea',
    label: '服務總覽介紹',
    description: '整體服務的概述',
    required: false,
    priority: 'medium',
    collectionPhase: 2,
    specs: {
      maxLength: 200,
    },
    clientFacingLabel: '服務總覽',
    clientFacingDescription: '簡單說明您提供哪些服務',
  },
];

// 服務項目（可重複）
const SERVICE_ITEM_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'service_title',
    moduleId: 'services',
    moduleName: '服務項目',
    sectionId: 'items',
    sectionName: '服務內容',
    type: 'text',
    label: '服務名稱',
    description: '單一服務的名稱',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      maxLength: 50,
    },
    clientFacingLabel: '服務名稱',
    clientFacingDescription: '這項服務的名稱',
  },
  {
    id: 'service_description',
    moduleId: 'services',
    moduleName: '服務項目',
    sectionId: 'items',
    sectionName: '服務內容',
    type: 'textarea',
    label: '服務說明',
    description: '服務的詳細描述',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minLength: 30,
      maxLength: 200,
    },
    clientFacingLabel: '服務說明',
    clientFacingDescription: '這項服務的詳細內容，建議 50-100 字',
  },
  {
    id: 'service_icon',
    moduleId: 'services',
    moduleName: '服務項目',
    sectionId: 'items',
    sectionName: '服務內容',
    type: 'icon',
    label: '服務圖示',
    description: '代表此服務的圖示或圖片',
    required: false,
    priority: 'low',
    collectionPhase: 3,
    specs: {
      minWidth: 128,
      minHeight: 128,
      maxFileSize: 200,
      tips: ['可選擇不提供，我們會使用預設圖示'],
    },
    clientFacingLabel: '服務圖示',
    clientFacingDescription: '代表這項服務的小圖示（選填，可使用預設）',
  },
];

// ============================================================
// Products 模組需求
// ============================================================

const PRODUCTS_OVERVIEW: ContentRequirement[] = [
  {
    id: 'products_intro',
    moduleId: 'products',
    moduleName: '產品展示',
    sectionId: 'overview',
    sectionName: '產品總覽',
    type: 'textarea',
    label: '產品線介紹',
    description: '整體產品線的概述',
    required: false,
    priority: 'medium',
    collectionPhase: 2,
    specs: {
      maxLength: 200,
    },
    clientFacingLabel: '產品總覽',
    clientFacingDescription: '簡單介紹您的產品線',
  },
];

// 產品項目（可重複）
const PRODUCT_ITEM_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'product_name',
    moduleId: 'products',
    moduleName: '產品展示',
    sectionId: 'items',
    sectionName: '產品列表',
    type: 'text',
    label: '產品名稱',
    description: '單一產品的名稱',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      maxLength: 100,
    },
    clientFacingLabel: '產品名稱',
    clientFacingDescription: '產品的完整名稱',
  },
  {
    id: 'product_description',
    moduleId: 'products',
    moduleName: '產品展示',
    sectionId: 'items',
    sectionName: '產品列表',
    type: 'textarea',
    label: '產品說明',
    description: '產品的功能和特色',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minLength: 50,
      maxLength: 300,
    },
    clientFacingLabel: '產品說明',
    clientFacingDescription: '介紹產品的功能、特色和優勢',
  },
  {
    id: 'product_image',
    moduleId: 'products',
    moduleName: '產品展示',
    sectionId: 'items',
    sectionName: '產品列表',
    type: 'image',
    label: '產品圖片',
    description: '產品的展示圖片',
    required: true,
    priority: 'high',
    collectionPhase: 2,
    specs: {
      minWidth: 800,
      minHeight: 800,
      maxFileSize: 1500,
      aspectRatio: '1:1',
      tips: [
        '建議使用正方形圖片',
        '白底或乾淨背景效果最佳',
      ],
    },
    clientFacingLabel: '產品照片',
    clientFacingDescription: '產品的展示照片，建議正方形、白底或乾淨背景',
  },
];

// ============================================================
// Team 模組需求
// ============================================================

const TEAM_OVERVIEW: ContentRequirement[] = [
  {
    id: 'team_intro',
    moduleId: 'team',
    moduleName: '團隊介紹',
    sectionId: 'overview',
    sectionName: '團隊總覽',
    type: 'textarea',
    label: '團隊介紹',
    description: '團隊的整體介紹',
    required: false,
    priority: 'medium',
    collectionPhase: 3,
    specs: {
      maxLength: 200,
    },
    clientFacingLabel: '團隊介紹',
    clientFacingDescription: '簡單介紹您的團隊特色',
  },
];

// 團隊成員（可重複）
const TEAM_MEMBER_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'member_name',
    moduleId: 'team',
    moduleName: '團隊介紹',
    sectionId: 'members',
    sectionName: '團隊成員',
    type: 'text',
    label: '姓名',
    description: '團隊成員姓名',
    required: true,
    priority: 'medium',
    collectionPhase: 3,
    specs: {
      maxLength: 50,
    },
    clientFacingLabel: '姓名',
    clientFacingDescription: '團隊成員姓名',
  },
  {
    id: 'member_title',
    moduleId: 'team',
    moduleName: '團隊介紹',
    sectionId: 'members',
    sectionName: '團隊成員',
    type: 'text',
    label: '職稱',
    description: '職位名稱',
    required: true,
    priority: 'medium',
    collectionPhase: 3,
    specs: {
      maxLength: 50,
    },
    clientFacingLabel: '職稱',
    clientFacingDescription: '在公司的職位',
  },
  {
    id: 'member_photo',
    moduleId: 'team',
    moduleName: '團隊介紹',
    sectionId: 'members',
    sectionName: '團隊成員',
    type: 'image',
    label: '照片',
    description: '團隊成員照片',
    required: true,
    priority: 'medium',
    collectionPhase: 3,
    specs: {
      minWidth: 400,
      minHeight: 400,
      maxFileSize: 800,
      aspectRatio: '1:1',
      tips: [
        '建議使用專業形象照',
        '正方形裁切',
      ],
    },
    clientFacingLabel: '個人照片',
    clientFacingDescription: '專業形象照，建議正方形裁切',
  },
  {
    id: 'member_bio',
    moduleId: 'team',
    moduleName: '團隊介紹',
    sectionId: 'members',
    sectionName: '團隊成員',
    type: 'textarea',
    label: '個人簡介',
    description: '簡短的個人介紹',
    required: false,
    priority: 'low',
    collectionPhase: 3,
    specs: {
      maxLength: 150,
    },
    clientFacingLabel: '個人簡介',
    clientFacingDescription: '簡短介紹專長或經歷（選填）',
  },
];

// ============================================================
// Contact 模組需求
// ============================================================

const CONTACT_REQUIREMENTS: ContentRequirement[] = [
  {
    id: 'contact_email',
    moduleId: 'contact',
    moduleName: '聯絡資訊',
    sectionId: 'info',
    sectionName: '聯絡方式',
    type: 'text',
    label: '聯絡信箱',
    description: '對外的聯絡信箱',
    required: true,
    priority: 'high',
    collectionPhase: 1,
    specs: {},
    clientFacingLabel: '聯絡信箱',
    clientFacingDescription: '網站上顯示的聯絡信箱',
  },
  {
    id: 'contact_phone',
    moduleId: 'contact',
    moduleName: '聯絡資訊',
    sectionId: 'info',
    sectionName: '聯絡方式',
    type: 'text',
    label: '聯絡電話',
    description: '對外的聯絡電話',
    required: false,
    priority: 'medium',
    collectionPhase: 1,
    specs: {},
    clientFacingLabel: '聯絡電話',
    clientFacingDescription: '網站上顯示的聯絡電話（選填）',
  },
  {
    id: 'contact_address',
    moduleId: 'contact',
    moduleName: '聯絡資訊',
    sectionId: 'info',
    sectionName: '聯絡方式',
    type: 'textarea',
    label: '公司地址',
    description: '公司的實際地址',
    required: false,
    priority: 'medium',
    collectionPhase: 1,
    specs: {},
    clientFacingLabel: '公司地址',
    clientFacingDescription: '如果希望顯示公司地址，請填寫',
  },
];

// ============================================================
// 模組需求註冊表
// ============================================================

export const MODULE_REQUIREMENTS: Record<string, ModuleRequirements> = {
  brand: {
    moduleId: 'brand',
    moduleName: '品牌資訊',
    description: '公司的基本識別資訊',
    requirements: BRAND_BASICS,
  },
  hero: {
    moduleId: 'hero',
    moduleName: '首頁主視覺',
    description: '網站首頁的第一印象區塊',
    requirements: HERO_REQUIREMENTS,
  },
  about: {
    moduleId: 'about',
    moduleName: '關於我們',
    description: '公司介紹和背景故事',
    requirements: ABOUT_REQUIREMENTS,
  },
  services: {
    moduleId: 'services',
    moduleName: '服務項目',
    description: '展示您提供的服務',
    requirements: SERVICES_REQUIREMENTS,
    repeatableItems: {
      minCount: 3,
      maxCount: 8,
      itemRequirements: SERVICE_ITEM_REQUIREMENTS,
    },
  },
  products: {
    moduleId: 'products',
    moduleName: '產品展示',
    description: '產品線展示',
    requirements: PRODUCTS_OVERVIEW,
    repeatableItems: {
      minCount: 1,
      maxCount: 20,
      itemRequirements: PRODUCT_ITEM_REQUIREMENTS,
    },
  },
  team: {
    moduleId: 'team',
    moduleName: '團隊介紹',
    description: '展示團隊成員',
    requirements: TEAM_OVERVIEW,
    repeatableItems: {
      minCount: 2,
      maxCount: 12,
      itemRequirements: TEAM_MEMBER_REQUIREMENTS,
    },
  },
  contact: {
    moduleId: 'contact',
    moduleName: '聯絡資訊',
    description: '聯絡方式和表單',
    requirements: CONTACT_REQUIREMENTS,
  },
};

// ============================================================
// 核心功能：生成內容需求清單
// ============================================================

/**
 * 根據選擇的模組生成完整的內容需求清單
 */
export function generateContentChecklist(
  projectId: string,
  templateId: string,
  selectedModuleIds: string[]
): ProjectContentChecklist {
  const allRequirements: ContentRequirement[] = [];
  
  // 品牌資訊永遠是必要的
  if (!selectedModuleIds.includes('brand')) {
    selectedModuleIds = ['brand', ...selectedModuleIds];
  }
  
  // 收集所有需求
  selectedModuleIds.forEach(moduleId => {
    const moduleReq = MODULE_REQUIREMENTS[moduleId];
    if (moduleReq) {
      // 添加基本需求
      allRequirements.push(...moduleReq.requirements);
      
      // 如果有可重複項目，添加最小數量的項目
      if (moduleReq.repeatableItems) {
        const { minCount, itemRequirements } = moduleReq.repeatableItems;
        for (let i = 1; i <= minCount; i++) {
          itemRequirements.forEach(req => {
            allRequirements.push({
              ...req,
              id: `${req.id}_${i}`,
              label: `${req.label} #${i}`,
              clientFacingLabel: `${req.clientFacingLabel} #${i}`,
            });
          });
        }
      }
    }
  });
  
  // 按階段分組
  const phase1 = allRequirements.filter(r => r.collectionPhase === 1);
  const phase2 = allRequirements.filter(r => r.collectionPhase === 2);
  const phase3 = allRequirements.filter(r => r.collectionPhase === 3);
  
  // 統計
  const stats = {
    total: allRequirements.length,
    required: allRequirements.filter(r => r.required).length,
    optional: allRequirements.filter(r => !r.required).length,
    byType: {
      text: allRequirements.filter(r => r.type === 'text' || r.type === 'textarea').length,
      image: allRequirements.filter(r => r.type === 'image' || r.type === 'logo' || r.type === 'icon').length,
    },
  };
  
  // 預估收集時間（每個必填項約 0.5 天）
  const estimatedCollectionDays = Math.ceil(stats.required * 0.5);
  
  return {
    projectId,
    templateId,
    phases: { phase1, phase2, phase3 },
    stats,
    estimatedCollectionDays,
  };
}

/**
 * 取得特定模組的所有需求
 */
export function getModuleRequirements(moduleId: string): ModuleRequirements | null {
  return MODULE_REQUIREMENTS[moduleId] || null;
}

/**
 * 取得按優先順序排列的需求（用於分批索取）
 */
export function getRequirementsByPriority(
  selectedModuleIds: string[]
): {
  high: ContentRequirement[];
  medium: ContentRequirement[];
  low: ContentRequirement[];
} {
  const all: ContentRequirement[] = [];
  
  selectedModuleIds.forEach(moduleId => {
    const moduleReq = MODULE_REQUIREMENTS[moduleId];
    if (moduleReq) {
      all.push(...moduleReq.requirements);
    }
  });
  
  return {
    high: all.filter(r => r.priority === 'high'),
    medium: all.filter(r => r.priority === 'medium'),
    low: all.filter(r => r.priority === 'low'),
  };
}

/**
 * 生成前台友善的需求摘要（給客戶看的）
 */
export function generateClientFacingSummary(
  checklist: ProjectContentChecklist
): {
  phase: number;
  title: string;
  description: string;
  items: Array<{
    label: string;
    description: string;
    type: 'text' | 'image';
    required: boolean;
  }>;
}[] {
  return [
    {
      phase: 1,
      title: '品牌基本資料',
      description: '我們需要了解您的品牌識別',
      items: checklist.phases.phase1.map(r => ({
        label: r.clientFacingLabel,
        description: r.clientFacingDescription,
        type: r.type === 'image' || r.type === 'logo' || r.type === 'icon' ? 'image' : 'text',
        required: r.required,
      })),
    },
    {
      phase: 2,
      title: '主要內容',
      description: '網站的核心文字和圖片',
      items: checklist.phases.phase2.map(r => ({
        label: r.clientFacingLabel,
        description: r.clientFacingDescription,
        type: r.type === 'image' || r.type === 'logo' || r.type === 'icon' ? 'image' : 'text',
        required: r.required,
      })),
    },
    {
      phase: 3,
      title: '補充內容',
      description: '讓網站更完整的額外資訊',
      items: checklist.phases.phase3.map(r => ({
        label: r.clientFacingLabel,
        description: r.clientFacingDescription,
        type: r.type === 'image' || r.type === 'logo' || r.type === 'icon' ? 'image' : 'text',
        required: r.required,
      })),
    },
  ].filter(phase => phase.items.length > 0);
}

