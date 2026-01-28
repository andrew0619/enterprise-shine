/**
 * Supabase Client Configuration
 * Supabase 客戶端配置
 * 
 * 設置步驟：
 * 1. 前往 https://supabase.com 創建免費帳號
 * 2. 創建新專案
 * 3. 在 Project Settings > API 複製 URL 和 anon key
 * 4. 創建 .env 檔案並填入以下變數：
 *    VITE_SUPABASE_URL=your-project-url
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 檢查是否已配置 Supabase
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// 創建 Supabase 客戶端（當未配置時為 null）
// 使用 any 類型來避免複雜的泛型類型推斷問題
const supabaseClient: any = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// 導出供外部使用
export const supabase = supabaseClient;

// 輔助函數：取得確保非空的 Supabase 客戶端
function getSupabase(): any {
  if (!supabaseClient) {
    throw new Error('Supabase is not configured');
  }
  return supabaseClient;
}

// 上傳檔案到 Supabase Storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) {
    // 如果沒有配置 Supabase，返回本地預覽 URL
    return { 
      url: URL.createObjectURL(file), 
      error: null 
    };
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    return { url: null, error: error.message };
  }

  // 獲取公開 URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return { url: urlData.publicUrl, error: null };
}

// 刪除檔案
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    return { success: true, error: null };
  }

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  return { 
    success: !error, 
    error: error?.message || null 
  };
}

// ============================================================
// Data Operations
// ============================================================

import type { 
  Client, 
  ClientInsert, 
  Project, 
  ProjectInsert, 
  ProjectModule,
  FileRecord,
  FileRecordInsert,
  ProjectOverview,
  ProjectStatus,
} from '@/types/supabase';

/**
 * 創建客戶和專案（完整的入口提交流程）
 */
export async function createClientSubmission(data: {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  primaryColor?: string;
  templateId: string;
  selectedModuleIds: string[];
  languages: string[];
  referenceSites?: string;
  specialRequirements?: string;
  timeline: string;
  files?: Array<{
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
}): Promise<{ clientId: string | null; projectId: string | null; error: string | null }> {
  
  // 如果沒有配置 Supabase，使用 localStorage
  if (!supabase) {
    const submission = {
      id: crypto.randomUUID(),
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    
    const existing = JSON.parse(localStorage.getItem('client_submissions') || '[]');
    existing.push(submission);
    localStorage.setItem('client_submissions', JSON.stringify(existing));
    
    return { 
      clientId: submission.id, 
      projectId: submission.id, 
      error: null 
    };
  }

  try {
    const db = getSupabase();
    // 1. 創建或查找客戶
    let clientId: string;
    
    const { data: existingClient } = await db
      .from('clients')
      .select('id')
      .eq('contact_email', data.contactEmail)
      .single();
    
    if (existingClient) {
      clientId = existingClient.id;
    } else {
      const clientInsert: ClientInsert = {
        company_name: data.companyName,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone || null,
        primary_color: data.primaryColor || '#3B82F6',
        logo_url: null,
        company_name_en: null,
        notes: null,
      };
      
      const { data: newClient, error: clientError } = await db
        .from('clients')
        .insert(clientInsert)
        .select('id')
        .single();
      
      if (clientError) throw clientError;
      if (!newClient) throw new Error('Failed to create client');
      clientId = newClient.id;
    }
    
    // 2. 創建專案
    const projectInsert: ProjectInsert = {
      client_id: clientId,
      project_name: `${data.companyName} 官網專案`,
      template_id: data.templateId,
      status: 'pending',
      timeline: data.timeline as any,
      languages: data.languages,
      reference_sites: data.referenceSites || null,
      special_requirements: data.specialRequirements || null,
      internal_notes: null,
    };
    
    const { data: newProject, error: projectError } = await db
      .from('projects')
      .insert(projectInsert)
      .select('id')
      .single();
    
    if (projectError) throw projectError;
    if (!newProject) throw new Error('Failed to create project');
    const projectId = newProject.id;
    
    // 3. 創建模組選擇記錄
    const moduleInserts = data.selectedModuleIds.map(moduleId => ({
      project_id: projectId,
      module_id: moduleId,
      is_selected: true,
    }));
    
    if (moduleInserts.length > 0) {
      const { error: moduleError } = await db
        .from('project_modules')
        .insert(moduleInserts as any);
      
      if (moduleError) throw moduleError;
    }
    
    // 4. 創建檔案記錄
    if (data.files && data.files.length > 0) {
      const fileInserts: FileRecordInsert[] = data.files.map(file => ({
        project_id: projectId,
        file_name: file.name,
        file_type: file.type as any,
        file_size: file.size,
        storage_path: file.url,
        public_url: file.url,
        mime_type: null,
        content_item_id: null,
        uploaded_by: 'client',
      }));
      
      const { error: fileError } = await db
        .from('files')
        .insert(fileInserts as any);
      
      if (fileError) throw fileError;
    }
    
    // 5. 創建活動記錄
    await db
      .from('activity_logs')
      .insert({
        project_id: projectId,
        action: 'created',
        actor_type: 'client',
        actor_name: data.contactName,
        details: { template: data.templateId, modules: data.selectedModuleIds },
      } as any);
    
    return { clientId, projectId, error: null };
    
  } catch (error: any) {
    console.error('Supabase error:', error);
    return { 
      clientId: null, 
      projectId: null, 
      error: error.message || 'Unknown error' 
    };
  }
}

/**
 * 取得所有專案列表
 */
export async function getProjects(): Promise<{ data: ProjectOverview[] | null; error: string | null }> {
  if (!supabase) {
    // 從 localStorage 讀取
    try {
      const submissions = JSON.parse(localStorage.getItem('client_submissions') || '[]');
      const projects: ProjectOverview[] = submissions.map((s: any) => ({
        id: s.id,
        created_at: s.submittedAt,
        updated_at: s.submittedAt,
        project_name: `${s.companyName} 官網專案`,
        template_id: s.templateId || 'enterprise-shine',
        status: s.status || 'pending',
        timeline: s.timeline || 'flexible',
        company_name: s.companyName,
        contact_name: s.contactName,
        contact_email: s.contactEmail,
        file_count: s.files?.length || 0,
        unread_comments: 0,
      }));
      return { data: projects, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
  
  const { data, error } = await supabase
    .from('project_overview')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { 
    data: data as ProjectOverview[] | null, 
    error: error?.message || null 
  };
}

/**
 * 取得單一專案詳情
 */
export async function getProjectById(id: string): Promise<{ 
  data: (Project & { client: Client; modules: ProjectModule[]; files: FileRecord[] }) | null; 
  error: string | null;
}> {
  if (!supabase) {
    // 從 localStorage 讀取
    try {
      const submissions = JSON.parse(localStorage.getItem('client_submissions') || '[]');
      const found = submissions.find((s: any) => s.id === id);
      if (!found) return { data: null, error: 'Not found' };
      
      // 轉換為 Project 格式
      const project = {
        ...found,
        client: {
          company_name: found.companyName,
          contact_name: found.contactName,
          contact_email: found.contactEmail,
          contact_phone: found.contactPhone,
          primary_color: found.primaryColor,
        },
        modules: found.selectedModuleIds?.map((id: string) => ({ module_id: id, is_selected: true })) || [],
        files: found.files || [],
      };
      return { data: project, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
  
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(*),
      modules:project_modules(*),
      files:files(*)
    `)
    .eq('id', id)
    .single();
  
  if (projectError) {
    return { data: null, error: projectError.message };
  }
  
  return { data: project as any, error: null };
}

/**
 * 更新專案狀態
 */
export async function updateProjectStatus(
  id: string, 
  status: ProjectStatus
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    // 更新 localStorage
    try {
      const submissions = JSON.parse(localStorage.getItem('client_submissions') || '[]');
      const updated = submissions.map((s: any) => s.id === id ? { ...s, status } : s);
      localStorage.setItem('client_submissions', JSON.stringify(updated));
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
  
  const { error } = await supabase
    .from('projects')
    .update({ status })
    .eq('id', id);
  
  return { success: !error, error: error?.message || null };
}

/**
 * 刪除專案
 */
export async function deleteProject(id: string): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    // 從 localStorage 刪除
    try {
      const submissions = JSON.parse(localStorage.getItem('client_submissions') || '[]');
      const filtered = submissions.filter((s: any) => s.id !== id);
      localStorage.setItem('client_submissions', JSON.stringify(filtered));
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  return { success: !error, error: error?.message || null };
}

// ============================================================
// Workspace Content Operations
// 內容協作平台資料操作
// ============================================================

import type { ContentItem, Comment } from '@/types/supabase';

/**
 * 取得專案的所有內容項目
 */
export async function getProjectContent(projectId: string): Promise<{
  data: ContentItem[] | null;
  error: string | null;
}> {
  if (!supabase) {
    // 從 localStorage 讀取
    try {
      const content = JSON.parse(localStorage.getItem(`content_${projectId}`) || '[]');
      return { data: content, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  return { data, error: error?.message || null };
}

/**
 * 儲存或更新內容項目
 */
export async function saveContentItem(
  projectId: string,
  moduleId: string,
  sectionId: string,
  fieldId: string,
  value: string | null,
  jsonValue?: Record<string, unknown>
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    // 儲存到 localStorage
    try {
      const key = `content_${projectId}`;
      const content = JSON.parse(localStorage.getItem(key) || '[]');
      
      const existingIndex = content.findIndex(
        (c: any) => c.module_id === moduleId && c.section_id === sectionId && c.field_id === fieldId
      );
      
      const item = {
        id: existingIndex >= 0 ? content[existingIndex].id : crypto.randomUUID(),
        project_id: projectId,
        module_id: moduleId,
        section_id: sectionId,
        field_id: fieldId,
        content_value: value,
        content_json: jsonValue || null,
        updated_at: new Date().toISOString(),
        version: existingIndex >= 0 ? (content[existingIndex].version || 1) + 1 : 1,
      };
      
      if (existingIndex >= 0) {
        content[existingIndex] = item;
      } else {
        content.push(item);
      }
      
      localStorage.setItem(key, JSON.stringify(content));
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // 使用 upsert (插入或更新)
  const { error } = await supabase
    .from('content_items')
    .upsert({
      project_id: projectId,
      module_id: moduleId,
      section_id: sectionId,
      field_id: fieldId,
      content_value: value,
      content_json: jsonValue || null,
    }, {
      onConflict: 'project_id,module_id,section_id,field_id',
    });

  return { success: !error, error: error?.message || null };
}

/**
 * 批量儲存內容
 */
export async function saveContentBatch(
  projectId: string,
  items: Array<{
    moduleId: string;
    sectionId: string;
    fieldId: string;
    value: string | null;
    jsonValue?: Record<string, unknown>;
  }>
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    // 批量儲存到 localStorage
    for (const item of items) {
      const result = await saveContentItem(
        projectId,
        item.moduleId,
        item.sectionId,
        item.fieldId,
        item.value,
        item.jsonValue
      );
      if (!result.success) {
        return result;
      }
    }
    return { success: true, error: null };
  }

  const records = items.map(item => ({
    project_id: projectId,
    module_id: item.moduleId,
    section_id: item.sectionId,
    field_id: item.fieldId,
    content_value: item.value,
    content_json: item.jsonValue || null,
  }));

  const { error } = await supabase
    .from('content_items')
    .upsert(records, {
      onConflict: 'project_id,module_id,section_id,field_id',
    });

  return { success: !error, error: error?.message || null };
}

/**
 * 取得專案的留言
 */
export async function getProjectComments(projectId: string): Promise<{
  data: Comment[] | null;
  error: string | null;
}> {
  if (!supabase) {
    try {
      const comments = JSON.parse(localStorage.getItem(`comments_${projectId}`) || '[]');
      return { data: comments, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  return { data, error: error?.message || null };
}

/**
 * 發送留言
 */
export async function sendComment(
  projectId: string,
  authorType: 'client' | 'agency',
  authorName: string,
  message: string,
  contentItemId?: string,
  fileId?: string
): Promise<{ success: boolean; commentId: string | null; error: string | null }> {
  if (!supabase) {
    try {
      const key = `comments_${projectId}`;
      const comments = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newComment = {
        id: crypto.randomUUID(),
        project_id: projectId,
        content_item_id: contentItemId || null,
        file_id: fileId || null,
        author_type: authorType,
        author_name: authorName,
        message,
        is_read: false,
        created_at: new Date().toISOString(),
      };
      
      comments.push(newComment);
      localStorage.setItem(key, JSON.stringify(comments));
      
      return { success: true, commentId: newComment.id, error: null };
    } catch (error: any) {
      return { success: false, commentId: null, error: error.message };
    }
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      project_id: projectId,
      content_item_id: contentItemId || null,
      file_id: fileId || null,
      author_type: authorType,
      author_name: authorName,
      message,
    })
    .select('id')
    .single();

  return {
    success: !error,
    commentId: data?.id || null,
    error: error?.message || null,
  };
}

/**
 * 標記留言為已讀
 */
export async function markCommentsAsRead(
  projectId: string,
  commentIds: string[]
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    try {
      const key = `comments_${projectId}`;
      const comments = JSON.parse(localStorage.getItem(key) || '[]');
      const updated = comments.map((c: any) => 
        commentIds.includes(c.id) ? { ...c, is_read: true } : c
      );
      localStorage.setItem(key, JSON.stringify(updated));
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  const { error } = await supabase
    .from('comments')
    .update({ is_read: true })
    .in('id', commentIds);

  return { success: !error, error: error?.message || null };
}

/**
 * 取得專案的檔案列表
 */
export async function getProjectFiles(projectId: string): Promise<{
  data: FileRecord[] | null;
  error: string | null;
}> {
  if (!supabase) {
    try {
      const files = JSON.parse(localStorage.getItem(`files_${projectId}`) || '[]');
      return { data: files, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  return { data, error: error?.message || null };
}

/**
 * 新增檔案記錄
 */
export async function addFileRecord(
  projectId: string,
  file: {
    fileName: string;
    fileType: string;
    fileSize: number;
    mimeType: string;
    storagePath: string;
    publicUrl: string;
    uploadedBy: 'client' | 'agency';
    contentItemId?: string;
  }
): Promise<{ success: boolean; fileId: string | null; error: string | null }> {
  if (!supabase) {
    try {
      const key = `files_${projectId}`;
      const files = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newFile = {
        id: crypto.randomUUID(),
        project_id: projectId,
        file_name: file.fileName,
        file_type: file.fileType,
        file_size: file.fileSize,
        mime_type: file.mimeType,
        storage_path: file.storagePath,
        public_url: file.publicUrl,
        uploaded_by: file.uploadedBy,
        content_item_id: file.contentItemId || null,
        created_at: new Date().toISOString(),
      };
      
      files.push(newFile);
      localStorage.setItem(key, JSON.stringify(files));
      
      return { success: true, fileId: newFile.id, error: null };
    } catch (error: any) {
      return { success: false, fileId: null, error: error.message };
    }
  }

  const { data, error } = await supabase
    .from('files')
    .insert({
      project_id: projectId,
      file_name: file.fileName,
      file_type: file.fileType as any,
      file_size: file.fileSize,
      mime_type: file.mimeType,
      storage_path: file.storagePath,
      public_url: file.publicUrl,
      uploaded_by: file.uploadedBy,
      content_item_id: file.contentItemId || null,
    })
    .select('id')
    .single();

  return {
    success: !error,
    fileId: data?.id || null,
    error: error?.message || null,
  };
}

/**
 * 刪除檔案記錄
 */
export async function deleteFileRecord(
  projectId: string,
  fileId: string
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    try {
      const key = `files_${projectId}`;
      const files = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = files.filter((f: any) => f.id !== fileId);
      localStorage.setItem(key, JSON.stringify(filtered));
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  const { error } = await supabase
    .from('files')
    .delete()
    .eq('id', fileId);

  return { success: !error, error: error?.message || null };
}

/**
 * 取得模組進度統計
 */
export async function getModuleProgress(projectId: string): Promise<{
  data: Array<{
    moduleId: string;
    totalFields: number;
    completedFields: number;
  }> | null;
  error: string | null;
}> {
  // 取得專案內容
  const { data: content, error } = await getProjectContent(projectId);
  
  if (error) {
    return { data: null, error };
  }
  
  // 計算每個模組的進度
  const moduleProgress: Record<string, { total: number; completed: number }> = {};
  
  content?.forEach((item) => {
    if (!moduleProgress[item.module_id]) {
      moduleProgress[item.module_id] = { total: 0, completed: 0 };
    }
    moduleProgress[item.module_id].total++;
    if (item.content_value || item.content_json) {
      moduleProgress[item.module_id].completed++;
    }
  });
  
  const result = Object.entries(moduleProgress).map(([moduleId, stats]) => ({
    moduleId,
    totalFields: stats.total,
    completedFields: stats.completed,
  }));
  
  return { data: result, error: null };
}

/**
 * 記錄活動日誌
 */
export async function logActivity(
  projectId: string,
  action: string,
  actorType: 'client' | 'agency' | 'system',
  actorName?: string,
  details?: Record<string, unknown>
): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) {
    // 簡單記錄到 console（開發用）
    console.log('[Activity]', { projectId, action, actorType, actorName, details });
    return { success: true, error: null };
  }

  const { error } = await supabase
    .from('activity_logs')
    .insert({
      project_id: projectId,
      action,
      actor_type: actorType,
      actor_name: actorName || null,
      details: details || null,
    });

  return { success: !error, error: error?.message || null };
}

