/**
 * Supabase Database Types
 * 資料庫類型定義
 */

// ============================================================
// Database Schema Types
// ============================================================

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: Client;
        Insert: ClientInsert;
        Update: ClientUpdate;
      };
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      project_modules: {
        Row: ProjectModule;
        Insert: ProjectModuleInsert;
        Update: ProjectModuleUpdate;
      };
      content_items: {
        Row: ContentItem;
        Insert: ContentItemInsert;
        Update: ContentItemUpdate;
      };
      files: {
        Row: FileRecord;
        Insert: FileRecordInsert;
        Update: FileRecordUpdate;
      };
      comments: {
        Row: Comment;
        Insert: CommentInsert;
        Update: CommentUpdate;
      };
      activity_logs: {
        Row: ActivityLog;
        Insert: ActivityLogInsert;
        Update: never;
      };
    };
    Views: {
      project_overview: {
        Row: ProjectOverview;
      };
    };
    Functions: {};
    Enums: {
      project_status: ProjectStatus;
      timeline_option: TimelineOption;
      file_type: FileType;
    };
  };
}

// ============================================================
// Client
// ============================================================

export interface Client {
  id: string;
  created_at: string;
  updated_at: string;
  company_name: string;
  company_name_en: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  logo_url: string | null;
  primary_color: string;
  notes: string | null;
}

export type ClientInsert = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
export type ClientUpdate = Partial<ClientInsert>;

// ============================================================
// Project
// ============================================================

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  project_name: string;
  template_id: string;
  status: ProjectStatus;
  timeline: TimelineOption;
  languages: string[];
  reference_sites: string | null;
  special_requirements: string | null;
  internal_notes: string | null;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectInsert>;

// ============================================================
// Project Module
// ============================================================

export interface ProjectModule {
  id: string;
  project_id: string;
  module_id: string;
  is_selected: boolean;
}

export type ProjectModuleInsert = Omit<ProjectModule, 'id'>;
export type ProjectModuleUpdate = Partial<ProjectModuleInsert>;

// ============================================================
// Content Item
// ============================================================

export interface ContentItem {
  id: string;
  created_at: string;
  updated_at: string;
  project_id: string;
  module_id: string;
  section_id: string;
  field_id: string;
  content_value: string | null;
  content_json: Record<string, unknown> | null;
  version: number;
}

export type ContentItemInsert = Omit<ContentItem, 'id' | 'created_at' | 'updated_at' | 'version'>;
export type ContentItemUpdate = Partial<ContentItemInsert>;

// ============================================================
// File Record
// ============================================================

export interface FileRecord {
  id: string;
  created_at: string;
  project_id: string;
  file_name: string;
  file_type: FileType;
  file_size: number | null;
  mime_type: string | null;
  storage_path: string;
  public_url: string | null;
  content_item_id: string | null;
  uploaded_by: 'client' | 'agency' | null;
}

export type FileRecordInsert = Omit<FileRecord, 'id' | 'created_at'>;
export type FileRecordUpdate = Partial<FileRecordInsert>;

// ============================================================
// Comment
// ============================================================

export interface Comment {
  id: string;
  created_at: string;
  project_id: string;
  content_item_id: string | null;
  file_id: string | null;
  author_type: 'client' | 'agency';
  author_name: string;
  message: string;
  is_read: boolean;
}

export type CommentInsert = Omit<Comment, 'id' | 'created_at' | 'is_read'>;
export type CommentUpdate = Partial<CommentInsert>;

// ============================================================
// Activity Log
// ============================================================

export interface ActivityLog {
  id: string;
  created_at: string;
  project_id: string;
  action: string;
  actor_type: 'client' | 'agency' | 'system';
  actor_name: string | null;
  details: Record<string, unknown> | null;
}

export type ActivityLogInsert = Omit<ActivityLog, 'id' | 'created_at'>;

// ============================================================
// Project Overview (View)
// ============================================================

export interface ProjectOverview {
  id: string;
  created_at: string;
  updated_at: string;
  project_name: string;
  template_id: string;
  status: ProjectStatus;
  timeline: TimelineOption;
  company_name: string;
  contact_name: string;
  contact_email: string;
  file_count: number;
  unread_comments: number;
}

// ============================================================
// Enums
// ============================================================

export type ProjectStatus = 
  | 'pending'      // 待處理
  | 'reviewing'    // 審核中
  | 'in_progress'  // 製作中
  | 'completed'    // 已完成
  | 'cancelled';   // 已取消

export type TimelineOption = '1week' | '2weeks' | '1month' | 'flexible';

export type FileType = 'logo' | 'hero' | 'product' | 'team' | 'document' | 'other';

// ============================================================
// Legacy Types (for backward compatibility)
// ============================================================

// 舊版模組選擇（保留給 Intake 表單使用）
export interface ModuleSelection {
  hero: boolean;
  products: boolean;
  pricing: boolean;
  about: boolean;
  team: boolean;
  contact: boolean;
  faq: boolean;
  blog: boolean;
  partners: boolean;
  careers: boolean;
}

// 上傳的檔案（前端用）
export interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  url: string;
  size: number;
  uploaded_at: string;
}

// 表單輸入類型
export interface ClientIntakeFormData {
  templateId: string;
  selectedModuleIds: string[];
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  primaryColor: string;
  languages: string[];
  referenceSites: string;
  specialRequirements: string;
  timeline: TimelineOption;
}

// ============================================================
// 常量與預設值
// ============================================================

// 預設模組選擇
export const defaultModuleSelection: ModuleSelection = {
  hero: true,
  products: false,
  pricing: false,
  about: false,
  team: false,
  contact: true,
  faq: false,
  blog: false,
  partners: false,
  careers: false,
};

// 模組資訊
export const moduleInfo: Record<keyof ModuleSelection, { label: string; labelZh: string; description: string }> = {
  hero: { 
    label: 'Hero Section', 
    labelZh: '首頁主視覺',
    description: '網站首頁的主視覺區塊，包含標語和行動呼籲按鈕'
  },
  products: { 
    label: 'Products/Services', 
    labelZh: '產品/服務介紹',
    description: '展示您的產品或服務項目'
  },
  pricing: { 
    label: 'Pricing', 
    labelZh: '定價方案',
    description: '價格方案比較表'
  },
  about: { 
    label: 'About Us', 
    labelZh: '關於我們',
    description: '公司介紹和企業理念'
  },
  team: { 
    label: 'Team', 
    labelZh: '團隊介紹',
    description: '展示團隊成員'
  },
  contact: { 
    label: 'Contact Form', 
    labelZh: '聯繫表單',
    description: '讓客戶可以聯繫您'
  },
  faq: { 
    label: 'FAQ', 
    labelZh: '常見問題',
    description: '常見問題與解答'
  },
  blog: { 
    label: 'Blog/News', 
    labelZh: '部落格/最新消息',
    description: '文章和新聞發布'
  },
  partners: { 
    label: 'Partners', 
    labelZh: '合作夥伴',
    description: '展示合作夥伴 Logo'
  },
  careers: { 
    label: 'Careers', 
    labelZh: '職缺招聘',
    description: '招聘資訊頁面'
  },
};

// 時程選項資訊
export const timelineOptions: Record<TimelineOption, { label: string; labelZh: string }> = {
  '1week': { label: 'Within 1 week', labelZh: '1 週內' },
  '2weeks': { label: 'Within 2 weeks', labelZh: '2 週內' },
  '1month': { label: 'Within 1 month', labelZh: '1 個月內' },
  'flexible': { label: 'Flexible, quality first', labelZh: '不急，品質優先' },
};

// 專案狀態資訊
export const projectStatusInfo: Record<ProjectStatus, { label: string; labelZh: string; color: string }> = {
  pending: { label: 'Pending', labelZh: '待處理', color: 'bg-yellow-100 text-yellow-800' },
  reviewing: { label: 'Reviewing', labelZh: '審核中', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'In Progress', labelZh: '製作中', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'Completed', labelZh: '已完成', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', labelZh: '已取消', color: 'bg-gray-100 text-gray-800' },
};
