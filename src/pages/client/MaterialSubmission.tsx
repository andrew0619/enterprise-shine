/**
 * 素材提交頁面（客戶端）
 * 
 * 設計理念：專業服務感，而非自助平台
 * - 隱藏所有技術細節
 * - 語言風格像「委託專業團隊」
 * - 不顯示進度百分比
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Building2,
  Upload,
  FileText,
  Image,
  CheckCircle2,
  Clock,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Send,
  Paperclip,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  generateContentChecklist,
  generateClientFacingSummary,
  type ContentRequirement,
} from '@/lib/content-requirements';

// 模擬專案資料
interface ProjectData {
  id: string;
  companyName: string;
  contactName: string;
  templateId: string;
  selectedModuleIds: string[];
  status: 'collecting' | 'in_progress' | 'review' | 'completed';
}

// 素材提交狀態
type ItemStatus = 'empty' | 'submitted' | 'reviewing' | 'approved' | 'revision_needed';

interface SubmittedItem {
  requirementId: string;
  value?: string;
  fileUrl?: string;
  status: ItemStatus;
  submittedAt: string;
  feedback?: string;
}

export default function MaterialSubmission() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [submittedItems, setSubmittedItems] = useState<Map<string, SubmittedItem>>(new Map());
  const [activePhase, setActivePhase] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // 載入專案資料
  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = () => {
    // 模擬從 Supabase 載入
    try {
      const submissions = JSON.parse(localStorage.getItem('client_submissions') || '[]');
      const found = submissions.find((s: any) => s.id === projectId);
      
      if (found) {
        setProject({
          id: found.id,
          companyName: found.companyName,
          contactName: found.contactName,
          templateId: found.templateId || 'enterprise-shine',
          selectedModuleIds: found.selectedModuleIds || ['brand', 'hero', 'about', 'services', 'contact'],
          status: 'collecting',
        });

        // 載入已提交的素材
        const saved = JSON.parse(localStorage.getItem(`materials_${projectId}`) || '{}');
        setSubmittedItems(new Map(Object.entries(saved)));
      }
    } catch (e) {
      console.error('Failed to load project:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">找不到專案</h1>
          <p className="text-muted-foreground">請確認連結是否正確</p>
        </div>
      </div>
    );
  }

  // 生成需求清單
  const checklist = generateContentChecklist(
    project.id,
    project.templateId,
    project.selectedModuleIds
  );
  const clientSummary = generateClientFacingSummary(checklist);

  // 計算各階段狀態
  const getPhaseStatus = (phase: number) => {
    const phaseItems = phase === 1 ? checklist.phases.phase1 
      : phase === 2 ? checklist.phases.phase2 
      : checklist.phases.phase3;
    
    const submitted = phaseItems.filter(item => submittedItems.has(item.id)).length;
    const total = phaseItems.length;
    
    if (submitted === 0) return 'pending';
    if (submitted >= total) return 'completed';
    return 'in_progress';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">{project.companyName} 官網專案</h1>
                <p className="text-sm text-muted-foreground">素材準備</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              聯繫專案經理
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        {/* Welcome Message */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {project.contactName} 您好！👋
                </h2>
                <p className="text-muted-foreground">
                  感謝您選擇我們為您打造企業官網。為了讓設計團隊能為您創造最佳的網站體驗，
                  請協助準備以下品牌素材。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Tabs */}
        <Tabs value={String(activePhase)} onValueChange={(v) => setActivePhase(Number(v))}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {clientSummary.map((phase) => {
              const status = getPhaseStatus(phase.phase);
              return (
                <TabsTrigger
                  key={phase.phase}
                  value={String(phase.phase)}
                  className="relative"
                >
                  <span className="flex items-center gap-2">
                    {status === 'completed' && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                    {status === 'in_progress' && (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    {phase.title}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {clientSummary.map((phase) => (
            <TabsContent key={phase.phase} value={String(phase.phase)}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{phase.title}</CardTitle>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {phase.items.map((item, index) => {
                    const submitted = submittedItems.get(
                      checklist.phases[`phase${phase.phase}` as keyof typeof checklist.phases][index]?.id
                    );
                    const requirement = checklist.phases[`phase${phase.phase}` as keyof typeof checklist.phases][index];
                    
                    return (
                      <MaterialInputCard
                        key={index}
                        requirement={requirement}
                        label={item.label}
                        description={item.description}
                        type={item.type}
                        required={item.required}
                        submitted={submitted}
                        onSubmit={(value, fileUrl) => {
                          if (!requirement) return;
                          
                          const newItem: SubmittedItem = {
                            requirementId: requirement.id,
                            value,
                            fileUrl,
                            status: 'submitted',
                            submittedAt: new Date().toISOString(),
                          };
                          
                          const newMap = new Map(submittedItems);
                          newMap.set(requirement.id, newItem);
                          setSubmittedItems(newMap);
                          
                          // 儲存到 localStorage
                          const obj = Object.fromEntries(newMap);
                          localStorage.setItem(`materials_${projectId}`, JSON.stringify(obj));
                        }}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              需要協助？
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              如果您在準備素材時遇到任何問題，或有特殊需求想討論，請直接聯繫您的專案經理。
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                留言給專案團隊
              </Button>
              <Button variant="ghost" className="gap-2">
                查看素材準備指南
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>如有任何問題，請聯繫您的專案經理</p>
          <p className="mt-1">© Creative Studio - 專業網站設計服務</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// 素材輸入卡片元件
// ============================================================

interface MaterialInputCardProps {
  requirement?: ContentRequirement;
  label: string;
  description: string;
  type: 'text' | 'image';
  required: boolean;
  submitted?: SubmittedItem;
  onSubmit: (value?: string, fileUrl?: string) => void;
}

function MaterialInputCard({
  requirement,
  label,
  description,
  type,
  required,
  submitted,
  onSubmit,
}: MaterialInputCardProps) {
  const [value, setValue] = useState(submitted?.value || '');
  const [filePreview, setFilePreview] = useState<string | null>(submitted?.fileUrl || null);
  const [isDirty, setIsDirty] = useState(false);

  const handleTextChange = (newValue: string) => {
    setValue(newValue);
    setIsDirty(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      setIsDirty(true);
    }
  };

  const handleSubmit = () => {
    if (type === 'text') {
      onSubmit(value);
    } else {
      onSubmit(undefined, filePreview || undefined);
    }
    setIsDirty(false);
  };

  const getStatusBadge = () => {
    if (!submitted) return null;
    
    switch (submitted.status) {
      case 'submitted':
        return <Badge variant="secondary">已提交</Badge>;
      case 'reviewing':
        return <Badge variant="outline" className="text-yellow-600">審核中</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">已確認</Badge>;
      case 'revision_needed':
        return <Badge variant="destructive">需修改</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${
      submitted?.status === 'approved' 
        ? 'bg-green-50/50 border-green-200 dark:bg-green-950/20 dark:border-green-900' 
        : 'bg-card'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
            type === 'image' 
              ? 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400' 
              : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
          }`}>
            {type === 'image' ? (
              <Image className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>
          <div>
            <Label className="text-base font-medium flex items-center gap-2">
              {label}
              {required && <span className="text-red-500 text-sm">*</span>}
              {getStatusBadge()}
            </Label>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>
      </div>

      {/* 規格提示 */}
      {requirement?.specs.tips && requirement.specs.tips.length > 0 && (
        <div className="mb-3 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
          💡 {requirement.specs.tips[0]}
        </div>
      )}

      {/* 輸入區域 */}
      {type === 'text' ? (
        <div className="space-y-3">
          {requirement?.type === 'textarea' ? (
            <Textarea
              value={value}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={requirement?.placeholder || '請輸入...'}
              rows={4}
              className="resize-none"
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={requirement?.placeholder || '請輸入...'}
            />
          )}
          {requirement?.specs.minLength || requirement?.specs.maxLength ? (
            <div className="text-xs text-muted-foreground text-right">
              {value.length} / {requirement?.specs.maxLength || '不限'} 字
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          {filePreview ? (
            <div className="relative">
              <img 
                src={filePreview} 
                alt="Preview" 
                className="w-full max-h-48 object-contain rounded-lg border"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setFilePreview(null);
                  setIsDirty(true);
                }}
              >
                更換
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm font-medium">點擊上傳圖片</span>
              <span className="text-xs text-muted-foreground mt-1">
                支援 JPG、PNG、WEBP 格式
              </span>
              {requirement?.specs.minWidth && (
                <span className="text-xs text-muted-foreground">
                  建議尺寸 {requirement.specs.minWidth}x{requirement.specs.minHeight} 像素以上
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      )}

      {/* 提交按鈕 */}
      {isDirty && (
        <div className="mt-3 flex justify-end">
          <Button onClick={handleSubmit} size="sm" className="gap-2">
            <Send className="h-4 w-4" />
            提交
          </Button>
        </div>
      )}

      {/* 審核回饋 */}
      {submitted?.feedback && (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg text-sm">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">專案團隊回饋：</p>
          <p className="text-yellow-700 dark:text-yellow-300 mt-1">{submitted.feedback}</p>
        </div>
      )}
    </div>
  );
}


