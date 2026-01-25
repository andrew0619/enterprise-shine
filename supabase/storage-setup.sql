-- ============================================================
-- Supabase Storage Setup
-- 檔案儲存設定
-- ============================================================

-- 注意：Bucket 需要在 Supabase Dashboard 手動建立
-- 此檔案僅記錄需要的設定和 RLS 政策

-- ============================================================
-- 建立 Bucket 步驟（在 Supabase Dashboard 執行）
-- ============================================================
-- 
-- 1. 前往 Storage 頁面
-- 2. 點擊 "New bucket"
-- 3. 建立以下 bucket：
--    - 名稱: project-files
--    - Public: Yes（允許公開讀取）
--    - File size limit: 50MB
--    - Allowed MIME types: image/*, application/pdf, application/msword, 
--      application/vnd.openxmlformats-officedocument.wordprocessingml.document

-- ============================================================
-- Storage RLS 政策
-- ============================================================

-- 允許已認證用戶上傳檔案
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-files');

-- 允許公開讀取
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-files');

-- 允許擁有者刪除
CREATE POLICY "Allow owner delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================================
-- 如果不使用認證，使用以下簡化政策
-- ============================================================

-- 允許所有人上傳（開發用，生產環境建議加上認證）
-- CREATE POLICY "Allow all uploads" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'project-files');

-- 允許所有人讀取
-- CREATE POLICY "Allow all read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'project-files');

-- 允許所有人刪除（開發用）
-- CREATE POLICY "Allow all delete" ON storage.objects FOR DELETE TO public USING (bucket_id = 'project-files');


