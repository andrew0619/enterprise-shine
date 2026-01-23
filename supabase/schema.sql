-- ============================================================
-- Creative Studio - Supabase Database Schema
-- 網站模板產品化系統資料庫結構
-- ============================================================

-- 啟用 UUID 擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM 類型定義
-- ============================================================

-- 專案狀態
CREATE TYPE project_status AS ENUM (
  'pending',      -- 待處理
  'reviewing',    -- 審核中
  'in_progress',  -- 製作中
  'completed',    -- 已完成
  'cancelled'     -- 已取消
);

-- 時程選項
CREATE TYPE timeline_option AS ENUM (
  '1week',
  '2weeks', 
  '1month',
  'flexible'
);

-- 檔案類型
CREATE TYPE file_type AS ENUM (
  'logo',
  'hero',
  'product',
  'team',
  'document',
  'other'
);

-- ============================================================
-- 客戶資料表
-- ============================================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 公司資訊
  company_name TEXT NOT NULL,
  company_name_en TEXT,
  
  -- 聯絡人資訊
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL UNIQUE,
  contact_phone TEXT,
  
  -- 品牌資訊
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  
  -- 備註
  notes TEXT
);

-- 更新時間觸發器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 專案資料表
-- ============================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 關聯客戶
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  
  -- 專案資訊
  project_name TEXT NOT NULL,
  template_id TEXT NOT NULL, -- 'enterprise-shine' or 'quantum-horizons'
  
  -- 狀態
  status project_status DEFAULT 'pending',
  timeline timeline_option DEFAULT 'flexible',
  
  -- 語言需求
  languages TEXT[] DEFAULT ARRAY['zh-TW'],
  
  -- 其他
  reference_sites TEXT,
  special_requirements TEXT,
  
  -- Agency 備註
  internal_notes TEXT
);

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 專案模組選擇
-- ============================================================

CREATE TABLE project_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL, -- 'hero', 'products', 'about', etc.
  is_selected BOOLEAN DEFAULT TRUE,
  
  UNIQUE(project_id, module_id)
);

-- ============================================================
-- 內容項目（客戶填寫的內容）
-- ============================================================

CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 關聯
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  field_id TEXT NOT NULL,
  
  -- 內容
  content_value TEXT,
  content_json JSONB, -- 用於複雜結構的資料
  
  -- 版本資訊
  version INTEGER DEFAULT 1,
  
  -- 索引
  UNIQUE(project_id, module_id, section_id, field_id)
);

CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 檔案上傳記錄
-- ============================================================

CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 關聯
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- 檔案資訊
  file_name TEXT NOT NULL,
  file_type file_type NOT NULL,
  file_size INTEGER, -- bytes
  mime_type TEXT,
  
  -- 儲存路徑
  storage_path TEXT NOT NULL,
  public_url TEXT,
  
  -- 關聯的內容項目（可選）
  content_item_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
  
  -- 上傳者資訊
  uploaded_by TEXT -- 'client' or 'agency'
);

-- ============================================================
-- 協作留言
-- ============================================================

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 關聯
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  file_id UUID REFERENCES files(id) ON DELETE CASCADE,
  
  -- 留言內容
  author_type TEXT NOT NULL CHECK (author_type IN ('client', 'agency')),
  author_name TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- 是否已讀
  is_read BOOLEAN DEFAULT FALSE
);

-- ============================================================
-- 專案活動記錄
-- ============================================================

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 關聯
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- 活動資訊
  action TEXT NOT NULL, -- 'created', 'status_changed', 'content_updated', 'file_uploaded', etc.
  actor_type TEXT NOT NULL CHECK (actor_type IN ('client', 'agency', 'system')),
  actor_name TEXT,
  
  -- 詳細資料
  details JSONB
);

-- ============================================================
-- 索引
-- ============================================================

CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_project_modules_project_id ON project_modules(project_id);
CREATE INDEX idx_content_items_project_id ON content_items(project_id);
CREATE INDEX idx_files_project_id ON files(project_id);
CREATE INDEX idx_comments_project_id ON comments(project_id);
CREATE INDEX idx_activity_logs_project_id ON activity_logs(project_id);

-- ============================================================
-- RLS (Row Level Security) 政策
-- ============================================================

-- 啟用 RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- 暫時允許所有操作（之後可以根據認證系統調整）
CREATE POLICY "Allow all for now" ON clients FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON project_modules FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON content_items FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON files FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON comments FOR ALL USING (true);
CREATE POLICY "Allow all for now" ON activity_logs FOR ALL USING (true);

-- ============================================================
-- 輔助 Views
-- ============================================================

-- 專案總覽 View
CREATE VIEW project_overview AS
SELECT 
  p.id,
  p.created_at,
  p.updated_at,
  p.project_name,
  p.template_id,
  p.status,
  p.timeline,
  c.company_name,
  c.contact_name,
  c.contact_email,
  (SELECT COUNT(*) FROM files WHERE project_id = p.id) as file_count,
  (SELECT COUNT(*) FROM comments WHERE project_id = p.id AND is_read = false) as unread_comments
FROM projects p
JOIN clients c ON p.client_id = c.id;

