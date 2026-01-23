/**
 * 內容匯出系統 (Content Exporter)
 * 
 * 將客戶內容打包下載，支援多種格式
 */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { ContentItem, FileRecord, Project, Client } from '@/types/supabase';

// ============================================================
// Types
// ============================================================

export interface ExportOptions {
  format: 'json' | 'markdown' | 'html' | 'zip';
  includeFiles: boolean;
  includeMetadata: boolean;
  groupByModule: boolean;
}

export interface ExportData {
  project: {
    id: string;
    name: string;
    templateId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  client: {
    companyName: string;
    contactName: string;
    contactEmail: string;
    primaryColor?: string;
  };
  modules: Array<{
    moduleId: string;
    moduleName: string;
    sections: Array<{
      sectionId: string;
      sectionName: string;
      fields: Array<{
        fieldId: string;
        fieldName: string;
        value: string | null;
        jsonValue?: Record<string, unknown>;
      }>;
    }>;
  }>;
  files: Array<{
    id: string;
    fileName: string;
    fileType: string;
    url: string;
    uploadedAt: string;
  }>;
  exportedAt: string;
}

// ============================================================
// Data Preparation
// ============================================================

/**
 * 準備匯出資料
 */
export function prepareExportData(
  project: Project & { client: Client },
  contentItems: ContentItem[],
  files: FileRecord[],
  templateModules: Array<{
    id: string;
    name: string;
    sections: Array<{
      id: string;
      name: string;
      fields: Array<{ id: string; label: string }>;
    }>;
  }>
): ExportData {
  // 按模組和區塊組織內容
  const moduleMap = new Map<string, Map<string, Map<string, ContentItem>>>();
  
  contentItems.forEach((item) => {
    if (!moduleMap.has(item.module_id)) {
      moduleMap.set(item.module_id, new Map());
    }
    const sectionMap = moduleMap.get(item.module_id)!;
    
    if (!sectionMap.has(item.section_id)) {
      sectionMap.set(item.section_id, new Map());
    }
    sectionMap.get(item.section_id)!.set(item.field_id, item);
  });

  // 建構匯出結構
  const modules = templateModules.map((module) => {
    const sectionMap = moduleMap.get(module.id) || new Map();
    
    return {
      moduleId: module.id,
      moduleName: module.name,
      sections: module.sections.map((section) => {
        const fieldMap = sectionMap.get(section.id) || new Map();
        
        return {
          sectionId: section.id,
          sectionName: section.name,
          fields: section.fields.map((field) => {
            const item = fieldMap.get(field.id);
            return {
              fieldId: field.id,
              fieldName: field.label,
              value: item?.content_value || null,
              jsonValue: item?.content_json as Record<string, unknown> || undefined,
            };
          }),
        };
      }),
    };
  });

  return {
    project: {
      id: project.id,
      name: project.project_name,
      templateId: project.template_id,
      status: project.status,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    },
    client: {
      companyName: project.client.company_name,
      contactName: project.client.contact_name,
      contactEmail: project.client.contact_email,
      primaryColor: project.client.primary_color || undefined,
    },
    modules: modules.filter((m) => m.sections.some((s) => s.fields.some((f) => f.value))),
    files: files.map((f) => ({
      id: f.id,
      fileName: f.file_name,
      fileType: f.file_type,
      url: f.public_url || f.storage_path,
      uploadedAt: f.created_at,
    })),
    exportedAt: new Date().toISOString(),
  };
}

// ============================================================
// Export Formats
// ============================================================

/**
 * 匯出為 JSON
 */
export function exportToJSON(data: ExportData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * 匯出為 Markdown
 */
export function exportToMarkdown(data: ExportData): string {
  const lines: string[] = [];
  
  // Header
  lines.push(`# ${data.client.companyName} - 網站內容`);
  lines.push('');
  lines.push(`> 匯出時間：${formatDate(data.exportedAt)}`);
  lines.push(`> 專案狀態：${data.project.status}`);
  lines.push(`> 使用模板：${data.project.templateId}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  
  // 客戶資訊
  lines.push('## 客戶資訊');
  lines.push('');
  lines.push(`- **公司名稱**：${data.client.companyName}`);
  lines.push(`- **聯絡人**：${data.client.contactName}`);
  lines.push(`- **Email**：${data.client.contactEmail}`);
  if (data.client.primaryColor) {
    lines.push(`- **品牌主色**：\`${data.client.primaryColor}\``);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  
  // 內容模組
  data.modules.forEach((module) => {
    lines.push(`## ${module.moduleName}`);
    lines.push('');
    
    module.sections.forEach((section) => {
      lines.push(`### ${section.sectionName}`);
      lines.push('');
      
      section.fields.forEach((field) => {
        if (field.value) {
          lines.push(`**${field.fieldName}**`);
          lines.push('');
          lines.push(field.value);
          lines.push('');
        }
      });
    });
    
    lines.push('---');
    lines.push('');
  });
  
  // 檔案清單
  if (data.files.length > 0) {
    lines.push('## 上傳檔案');
    lines.push('');
    lines.push('| 檔案名稱 | 類型 | 上傳日期 |');
    lines.push('|---------|------|---------|');
    data.files.forEach((file) => {
      lines.push(`| ${file.fileName} | ${file.fileType} | ${formatDate(file.uploadedAt)} |`);
    });
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * 匯出為 HTML
 */
export function exportToHTML(data: ExportData): string {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.client.companyName)} - 網站內容</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    h1 { color: ${data.client.primaryColor || '#3B82F6'}; border-bottom: 2px solid; padding-bottom: 0.5rem; }
    h2 { color: #555; margin-top: 2rem; }
    h3 { color: #666; }
    .meta { background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
    .meta p { margin: 0.25rem 0; }
    .field { margin: 1rem 0; padding: 1rem; background: #fafafa; border-left: 3px solid ${data.client.primaryColor || '#3B82F6'}; }
    .field-label { font-weight: bold; color: #333; margin-bottom: 0.5rem; }
    .field-value { white-space: pre-wrap; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    hr { border: none; border-top: 1px solid #eee; margin: 2rem 0; }
    .footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; color: #999; font-size: 0.875rem; }
  </style>
</head>
<body>
  <h1>${escapeHtml(data.client.companyName)} - 網站內容</h1>
  
  <div class="meta">
    <p><strong>匯出時間：</strong>${formatDate(data.exportedAt)}</p>
    <p><strong>專案狀態：</strong>${data.project.status}</p>
    <p><strong>使用模板：</strong>${data.project.templateId}</p>
  </div>
  
  <h2>客戶資訊</h2>
  <div class="meta">
    <p><strong>公司名稱：</strong>${escapeHtml(data.client.companyName)}</p>
    <p><strong>聯絡人：</strong>${escapeHtml(data.client.contactName)}</p>
    <p><strong>Email：</strong>${escapeHtml(data.client.contactEmail)}</p>
    ${data.client.primaryColor ? `<p><strong>品牌主色：</strong><span style="display:inline-block;width:20px;height:20px;background:${data.client.primaryColor};vertical-align:middle;border-radius:4px;margin-right:8px;"></span>${data.client.primaryColor}</p>` : ''}
  </div>
  
  <hr>
  
  ${data.modules.map((module) => `
    <h2>${escapeHtml(module.moduleName)}</h2>
    ${module.sections.map((section) => `
      <h3>${escapeHtml(section.sectionName)}</h3>
      ${section.fields.filter((f) => f.value).map((field) => `
        <div class="field">
          <div class="field-label">${escapeHtml(field.fieldName)}</div>
          <div class="field-value">${escapeHtml(field.value || '')}</div>
        </div>
      `).join('')}
    `).join('')}
  `).join('')}
  
  ${data.files.length > 0 ? `
    <hr>
    <h2>上傳檔案</h2>
    <table>
      <thead>
        <tr>
          <th>檔案名稱</th>
          <th>類型</th>
          <th>上傳日期</th>
        </tr>
      </thead>
      <tbody>
        ${data.files.map((file) => `
          <tr>
            <td><a href="${escapeHtml(file.url)}" target="_blank">${escapeHtml(file.fileName)}</a></td>
            <td>${escapeHtml(file.fileType)}</td>
            <td>${formatDate(file.uploadedAt)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : ''}
  
  <div class="footer">
    <p>此文件由內容協作平台自動產生</p>
  </div>
</body>
</html>`;

  return html;
}

/**
 * 匯出為 ZIP（包含所有檔案）
 */
export async function exportToZIP(
  data: ExportData,
  fileContents?: Map<string, Blob>
): Promise<Blob> {
  const zip = new JSZip();
  
  // 加入 JSON 資料
  zip.file('content.json', exportToJSON(data));
  
  // 加入 Markdown 版本
  zip.file('content.md', exportToMarkdown(data));
  
  // 加入 HTML 版本
  zip.file('content.html', exportToHTML(data));
  
  // 加入檔案（如果有提供）
  if (fileContents && fileContents.size > 0) {
    const filesFolder = zip.folder('files');
    if (filesFolder) {
      for (const [fileName, blob] of fileContents) {
        filesFolder.file(fileName, blob);
      }
    }
  }
  
  // 產生 README
  const readme = `# ${data.client.companyName} - 網站內容匯出

## 檔案說明

- \`content.json\` - JSON 格式的完整資料
- \`content.md\` - Markdown 格式，方便閱讀
- \`content.html\` - HTML 格式，可直接在瀏覽器開啟
- \`files/\` - 所有上傳的檔案

## 匯出資訊

- **專案 ID**：${data.project.id}
- **模板**：${data.project.templateId}
- **匯出時間**：${formatDate(data.exportedAt)}

## 使用方式

### 開發者
使用 \`content.json\` 匯入到您的專案中。

### 設計師
參考 \`content.md\` 或 \`content.html\` 查看內容結構。

### 客戶審閱
開啟 \`content.html\` 在瀏覽器中查看。
`;
  
  zip.file('README.md', readme);
  
  return zip.generateAsync({ type: 'blob' });
}

// ============================================================
// Download Functions
// ============================================================

/**
 * 下載 JSON 檔案
 */
export function downloadJSON(data: ExportData, filename?: string): void {
  const json = exportToJSON(data);
  const blob = new Blob([json], { type: 'application/json' });
  const name = filename || `${sanitizeFilename(data.client.companyName)}_content.json`;
  saveAs(blob, name);
}

/**
 * 下載 Markdown 檔案
 */
export function downloadMarkdown(data: ExportData, filename?: string): void {
  const md = exportToMarkdown(data);
  const blob = new Blob([md], { type: 'text/markdown' });
  const name = filename || `${sanitizeFilename(data.client.companyName)}_content.md`;
  saveAs(blob, name);
}

/**
 * 下載 HTML 檔案
 */
export function downloadHTML(data: ExportData, filename?: string): void {
  const html = exportToHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const name = filename || `${sanitizeFilename(data.client.companyName)}_content.html`;
  saveAs(blob, name);
}

/**
 * 下載 ZIP 檔案
 */
export async function downloadZIP(
  data: ExportData,
  fileContents?: Map<string, Blob>,
  filename?: string
): Promise<void> {
  const blob = await exportToZIP(data, fileContents);
  const name = filename || `${sanitizeFilename(data.client.companyName)}_content.zip`;
  saveAs(blob, name);
}

// ============================================================
// Helper Functions
// ============================================================

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

// ============================================================
// Export All
// ============================================================

export async function exportProject(
  data: ExportData,
  options: ExportOptions,
  fileContents?: Map<string, Blob>
): Promise<void> {
  switch (options.format) {
    case 'json':
      downloadJSON(data);
      break;
    case 'markdown':
      downloadMarkdown(data);
      break;
    case 'html':
      downloadHTML(data);
      break;
    case 'zip':
      await downloadZIP(data, options.includeFiles ? fileContents : undefined);
      break;
  }
}

