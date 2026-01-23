/**
 * Module Editor Page
 * 模組內容編輯頁面 - 讓客戶填寫特定模組的內容
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Save,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { FileUploader } from '@/components/intake/FileUploader';
import type { UploadedFile } from '@/types/supabase';
import { getProjectContent, saveContentBatch, logActivity } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface FieldConfig {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'color' | 'select';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  maxLength?: number;
  options?: string[];
  imageSpec?: {
    minWidth: number;
    minHeight: number;
    formats: string[];
    maxSize: number; // KB
  };
}

interface SectionConfig {
  id: string;
  name: string;
  description: string;
  fields: FieldConfig[];
  repeatable?: boolean;
  minItems?: number;
  maxItems?: number;
}

// 模組配置（之後會從 API 取得）
const moduleConfigs: Record<string, { name: string; description: string; sections: SectionConfig[] }> = {
  brand: {
    name: '品牌識別',
    description: '定義您的品牌基本資訊，這些內容會顯示在網站的各個位置。',
    sections: [
      {
        id: 'basic',
        name: '基本資訊',
        description: '公司名稱和標語',
        fields: [
          {
            id: 'company_name',
            label: '公司名稱',
            type: 'text',
            required: true,
            placeholder: '例：科技創新股份有限公司',
            helpText: '將顯示在網站標題和頁尾',
          },
          {
            id: 'company_name_en',
            label: '公司英文名稱',
            type: 'text',
            required: false,
            placeholder: 'Tech Innovation Inc.',
          },
          {
            id: 'tagline',
            label: '品牌標語',
            type: 'text',
            required: false,
            placeholder: '賦能 AI 驅動的創新與成長',
            maxLength: 50,
            helpText: '簡短有力的品牌口號（建議 50 字以內）',
          },
        ],
      },
      {
        id: 'visual',
        name: '視覺識別',
        description: 'Logo 和品牌色彩',
        fields: [
          {
            id: 'logo',
            label: '公司 Logo',
            type: 'image',
            required: true,
            helpText: '建議使用 PNG 或 SVG 格式，背景透明',
            imageSpec: {
              minWidth: 200,
              minHeight: 50,
              formats: ['png', 'svg', 'jpg'],
              maxSize: 2000,
            },
          },
          {
            id: 'primary_color',
            label: '品牌主色',
            type: 'color',
            required: true,
            helpText: '將用於按鈕、連結等主要元素',
          },
        ],
      },
    ],
  },
  hero: {
    name: '首頁主視覺',
    description: '網站首頁最重要的區塊，訪客的第一印象。',
    sections: [
      {
        id: 'content',
        name: '文字內容',
        description: '主標題和副標題',
        fields: [
          {
            id: 'badge',
            label: 'Badge 標籤',
            type: 'text',
            required: false,
            placeholder: '全新發布',
            maxLength: 20,
            helpText: '顯示在標題上方的小標籤（可選）',
          },
          {
            id: 'title',
            label: '主標題',
            type: 'text',
            required: true,
            placeholder: '賦能 AI 驅動的創新與成長',
            maxLength: 50,
            helpText: '網站最重要的標題，建議 20-50 字',
          },
          {
            id: 'subtitle',
            label: '副標題',
            type: 'textarea',
            required: true,
            placeholder: '我們在亞洲為您提供高性能運算和數據中心解決方案...',
            maxLength: 200,
            helpText: '補充說明主標題，建議 100-200 字',
          },
        ],
      },
      {
        id: 'visual',
        name: '背景圖片',
        description: '主視覺背景',
        fields: [
          {
            id: 'background',
            label: '背景圖片',
            type: 'image',
            required: true,
            helpText: '建議尺寸 1920x1080 或更大，將自動裁切適配',
            imageSpec: {
              minWidth: 1920,
              minHeight: 1080,
              formats: ['jpg', 'jpeg', 'png'],
              maxSize: 5000,
            },
          },
        ],
      },
    ],
  },
  services: {
    name: '核心服務',
    description: '展示您的主要服務項目。',
    sections: [
      {
        id: 'service_items',
        name: '服務項目',
        description: '填寫 3 個核心服務',
        repeatable: true,
        minItems: 3,
        maxItems: 3,
        fields: [
          {
            id: 'title',
            label: '服務名稱',
            type: 'text',
            required: true,
            placeholder: 'AI 伺服器租賃',
          },
          {
            id: 'description',
            label: '服務描述',
            type: 'textarea',
            required: true,
            placeholder: '提供企業級 NVIDIA GPU 叢集，支援大規模 AI 模型訓練與推論...',
            maxLength: 300,
          },
          {
            id: 'icon',
            label: '圖示',
            type: 'select',
            required: true,
            options: ['server', 'cloud', 'cpu', 'database', 'shield', 'zap'],
            helpText: '選擇一個代表此服務的圖示',
          },
        ],
      },
    ],
  },
  stats: {
    name: '數據統計',
    description: '展示公司成就的關鍵數據。',
    sections: [
      {
        id: 'stat_items',
        name: '統計數據',
        description: '填寫 4 個關鍵數據',
        repeatable: true,
        minItems: 4,
        maxItems: 4,
        fields: [
          {
            id: 'value',
            label: '數值',
            type: 'text',
            required: true,
            placeholder: '99.99%',
          },
          {
            id: 'label',
            label: '標籤',
            type: 'text',
            required: true,
            placeholder: '全年運行時間',
          },
        ],
      },
    ],
  },
  contact: {
    name: '聯絡資訊',
    description: '讓客戶可以聯繫您。',
    sections: [
      {
        id: 'info',
        name: '聯絡方式',
        description: '公司聯絡資訊',
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
            id: 'hours',
            label: '營業時間',
            type: 'text',
            required: false,
            placeholder: '週一至週五 09:00-18:00',
          },
        ],
      },
      {
        id: 'social',
        name: '社群連結',
        description: '社群媒體（選填）',
        fields: [
          {
            id: 'linkedin',
            label: 'LinkedIn',
            type: 'text',
            required: false,
            placeholder: 'https://linkedin.com/company/...',
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
  about: {
    name: '關於我們',
    description: '介紹公司的使命和價值觀。',
    sections: [
      {
        id: 'mission',
        name: '公司使命',
        description: '公司的核心使命',
        fields: [
          {
            id: 'mission',
            label: '使命宣言',
            type: 'textarea',
            required: true,
            placeholder: '我們致力於為亞太地區企業提供世界級的高性能運算...',
            maxLength: 500,
          },
          {
            id: 'vision',
            label: '願景',
            type: 'textarea',
            required: false,
            placeholder: '成為亞太地區領先的 AI 基礎設施服務提供商...',
            maxLength: 500,
          },
        ],
      },
      {
        id: 'values',
        name: '核心價值',
        description: '公司核心價值觀（3-4 項）',
        repeatable: true,
        minItems: 3,
        maxItems: 4,
        fields: [
          {
            id: 'title',
            label: '價值名稱',
            type: 'text',
            required: true,
            placeholder: '創新驅動',
          },
          {
            id: 'description',
            label: '價值描述',
            type: 'textarea',
            required: true,
            placeholder: '我們不斷探索新技術...',
            maxLength: 200,
          },
        ],
      },
    ],
  },
};

export default function ModuleEditor() {
  const { projectId, moduleId } = useParams<{ projectId: string; moduleId: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [files, setFiles] = useState<Record<string, UploadedFile[]>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const config = moduleId ? moduleConfigs[moduleId] : null;

  // 載入現有內容
  useEffect(() => {
    if (projectId && moduleId && config) {
      loadContent();
    }
  }, [projectId, moduleId]);

  useEffect(() => {
    // 初始化展開所有區塊
    if (config) {
      const expanded: Record<string, boolean> = {};
      config.sections.forEach((section) => {
        expanded[section.id] = true;
      });
      setExpandedSections(expanded);
    }
  }, [moduleId]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const { data: content, error } = await getProjectContent(projectId!);
      if (error) {
        console.error('Failed to load content:', error);
        return;
      }

      // 將內容轉換為 formData 格式
      const loadedData: Record<string, any> = {};
      content?.filter(c => c.module_id === moduleId).forEach((item) => {
        const key = `${item.section_id}.${item.field_id}`;
        loadedData[key] = item.content_value || item.content_json;
      });
      
      setFormData(loadedData);
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (sectionId: string, fieldId: string, value: any, index?: number) => {
    setFormData((prev) => {
      const key = index !== undefined ? `${sectionId}.${index}.${fieldId}` : `${sectionId}.${fieldId}`;
      return { ...prev, [key]: value };
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!projectId || !moduleId) return;
    
    setSaving(true);
    try {
      // 將 formData 轉換為批量儲存格式
      const items = Object.entries(formData).map(([key, value]) => {
        const parts = key.split('.');
        let sectionId: string;
        let fieldId: string;
        
        if (parts.length === 3) {
          // 可重複區塊: sectionId.index.fieldId
          sectionId = `${parts[0]}.${parts[1]}`;
          fieldId = parts[2];
        } else {
          // 一般區塊: sectionId.fieldId
          sectionId = parts[0];
          fieldId = parts[1];
        }
        
        return {
          moduleId: moduleId!,
          sectionId,
          fieldId,
          value: typeof value === 'string' ? value : null,
          jsonValue: typeof value === 'object' ? value : undefined,
        };
      });

      const { success, error } = await saveContentBatch(projectId!, items);
      
      if (success) {
        setHasChanges(false);
        toast({
          title: '儲存成功',
          description: '您的內容已儲存為草稿',
        });
        
        // 記錄活動
        await logActivity(projectId!, 'content_saved', 'client', undefined, {
          moduleId,
          fieldsCount: items.length,
        });
      } else {
        throw new Error(error || '儲存失敗');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      toast({
        title: '儲存失敗',
        description: err.message || '請稍後再試',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    // 先儲存
    await handleSave();
    
    setSubmitting(true);
    try {
      // 記錄提交審核
      await logActivity(projectId!, 'content_submitted', 'client', undefined, {
        moduleId,
      });
      
      toast({
        title: '提交成功',
        description: '我們會盡快審核您的內容',
      });
    } catch (err: any) {
      console.error('Submit error:', err);
      toast({
        title: '提交失敗',
        description: err.message || '請稍後再試',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (!config) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">找不到此模組</h2>
        <p className="text-muted-foreground">請從左側選單選擇一個模組</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div>
        <h1 className="text-2xl font-bold">{config.name}</h1>
        <p className="text-muted-foreground">{config.description}</p>
      </div>

      {/* Help Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>填寫提示</AlertTitle>
        <AlertDescription>
          帶有 <span className="text-red-500">*</span> 的欄位為必填。填寫完成後請點擊「儲存草稿」，確認無誤後再「提交審核」。
        </AlertDescription>
      </Alert>

      {/* Sections */}
      <div className="space-y-4">
        {config.sections.map((section) => (
          <Card key={section.id}>
            <Collapsible
              open={expandedSections[section.id]}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{section.name}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    {expandedSections[section.id] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {section.repeatable ? (
                    // 可重複的區塊
                    <div className="space-y-6">
                      {Array.from({ length: section.minItems || 1 }).map((_, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-muted/30">
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline">#{index + 1}</Badge>
                            {section.name}
                          </div>
                          <div className="space-y-4">
                            {section.fields.map((field) => (
                              <FieldRenderer
                                key={field.id}
                                field={field}
                                value={formData[`${section.id}.${index}.${field.id}`]}
                                onChange={(value) => handleFieldChange(section.id, field.id, value, index)}
                                files={files[`${section.id}.${index}.${field.id}`] || []}
                                onFilesChange={(newFiles) => 
                                  setFiles((prev) => ({
                                    ...prev,
                                    [`${section.id}.${index}.${field.id}`]: newFiles,
                                  }))
                                }
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 一般區塊
                    <div className="space-y-4">
                      {section.fields.map((field) => (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          value={formData[`${section.id}.${field.id}`]}
                          onChange={(value) => handleFieldChange(section.id, field.id, value)}
                          files={files[`${section.id}.${field.id}`] || []}
                          onFilesChange={(newFiles) => 
                            setFiles((prev) => ({
                              ...prev,
                              [`${section.id}.${field.id}`]: newFiles,
                            }))
                          }
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t sticky bottom-0 bg-background py-4">
        <Button variant="ghost" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          需要協助？
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSave}
            disabled={saving}
            className="gap-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            儲存草稿
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={submitting}
            className="gap-2"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            提交審核
          </Button>
        </div>
      </div>
    </div>
  );
}

// 欄位渲染器
interface FieldRendererProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

function FieldRenderer({ field, value, onChange, files, onFilesChange }: FieldRendererProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {field.helpText && (
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              {field.helpText}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {field.type === 'text' && (
        <div className="relative">
          <Input
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
          />
          {field.maxLength && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {(value?.length || 0)}/{field.maxLength}
            </span>
          )}
        </div>
      )}

      {field.type === 'textarea' && (
        <div className="relative">
          <Textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            rows={4}
          />
          {field.maxLength && (
            <span className="absolute right-3 bottom-3 text-xs text-muted-foreground">
              {(value?.length || 0)}/{field.maxLength}
            </span>
          )}
        </div>
      )}

      {field.type === 'color' && (
        <div className="flex items-center gap-3">
          <Input
            id={field.id}
            value={value || '#3B82F6'}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#3B82F6"
            className="w-32 font-mono"
          />
          <input
            type="color"
            value={value || '#3B82F6'}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
        </div>
      )}

      {field.type === 'select' && field.options && (
        <select
          id={field.id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 px-3 rounded-md border bg-background"
        >
          <option value="">請選擇...</option>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      {field.type === 'image' && (
        <div>
          <FileUploader
            label=""
            description={field.imageSpec 
              ? `建議尺寸 ${field.imageSpec.minWidth}x${field.imageSpec.minHeight}px，${field.imageSpec.formats.join('/')} 格式，最大 ${field.imageSpec.maxSize / 1000}MB`
              : '上傳圖片'
            }
            accept="image/*"
            maxSize={field.imageSpec?.maxSize ? field.imageSpec.maxSize / 1000 : 5}
            fileType="other"
            files={files}
            onFilesChange={onFilesChange}
          />
        </div>
      )}
    </div>
  );
}

