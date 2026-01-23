/**
 * Client Intake Form Page
 * 客戶需求收集表單頁面（支援多模板選擇）
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Palette, 
  Globe, 
  FileText,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  LayoutTemplate,
  Sparkles,
  Layers,
  ExternalLink,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileUploader } from '@/components/intake/FileUploader';

import {
  type ClientIntakeFormData,
  type ModuleSelection,
  type TimelineOption,
  type UploadedFile,
  defaultModuleSelection,
  moduleInfo,
  timelineOptions,
} from '@/types/supabase';

import {
  getAvailableTemplates,
  getTemplateById,
  generateContentRequirements,
  type TemplateConfig,
  type TemplateModule,
} from '@/templates/registry';

import { createClientSubmission } from '@/lib/supabase';

// Form validation schema
const formSchema = z.object({
  templateId: z.string().min(1, '請選擇一個模板'),
  selectedModuleIds: z.array(z.string()),
  companyName: z.string().min(1, '請輸入公司名稱'),
  contactName: z.string().min(1, '請輸入聯絡人姓名'),
  contactEmail: z.string().email('請輸入有效的 Email'),
  contactPhone: z.string().optional(),
  primaryColor: z.string().optional(),
  languages: z.array(z.string()).min(1, '請至少選擇一種語言'),
  referenceSites: z.string().optional(),
  specialRequirements: z.string().optional(),
  timeline: z.enum(['1week', '2weeks', '1month', 'flexible']),
});

type FormData = z.infer<typeof formSchema>;

// 步驟定義
const steps = [
  { id: 1, title: '選擇模板', icon: LayoutTemplate },
  { id: 2, title: '基本資訊', icon: Building2 },
  { id: 3, title: '模組選擇', icon: Layers },
  { id: 4, title: '素材上傳', icon: FileText },
  { id: 5, title: '確認送出', icon: CheckCircle2 },
];

// 複雜度標籤樣式
const complexityStyles = {
  simple: { label: '簡易', color: 'bg-green-100 text-green-800' },
  medium: { label: '中等', color: 'bg-blue-100 text-blue-800' },
  enterprise: { label: '企業級', color: 'bg-purple-100 text-purple-800' },
};

export default function ClientIntake() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 檔案狀態
  const [logoFiles, setLogoFiles] = useState<UploadedFile[]>([]);
  const [heroFiles, setHeroFiles] = useState<UploadedFile[]>([]);
  const [productFiles, setProductFiles] = useState<UploadedFile[]>([]);
  const [teamFiles, setTeamFiles] = useState<UploadedFile[]>([]);
  const [documentFiles, setDocumentFiles] = useState<UploadedFile[]>([]);

  // 取得可用模板
  const availableTemplates = getAvailableTemplates();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateId: '',
      selectedModuleIds: [],
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      primaryColor: '#3B82F6',
      languages: ['zh-TW'],
      referenceSites: '',
      specialRequirements: '',
      timeline: 'flexible',
    },
  });

  const watchedTemplateId = watch('templateId');
  const watchedSelectedModuleIds = watch('selectedModuleIds');
  const watchedLanguages = watch('languages');
  const watchedTimeline = watch('timeline');

  // 取得選擇的模板配置
  const selectedTemplate = useMemo(() => {
    return watchedTemplateId ? getTemplateById(watchedTemplateId) : undefined;
  }, [watchedTemplateId]);

  // 計算內容需求
  const contentRequirements = useMemo(() => {
    if (!watchedTemplateId) return [];
    return generateContentRequirements(watchedTemplateId, watchedSelectedModuleIds);
  }, [watchedTemplateId, watchedSelectedModuleIds]);

  // 處理模板選擇
  const handleTemplateSelect = (templateId: string) => {
    setValue('templateId', templateId);
    // 自動選擇必選模組
    const template = getTemplateById(templateId);
    if (template) {
      const requiredModuleIds = template.modules
        .filter(m => !m.optional)
        .map(m => m.id);
      setValue('selectedModuleIds', requiredModuleIds);
    }
  };

  // 處理模組勾選
  const handleModuleChange = (moduleId: string, checked: boolean, isOptional: boolean) => {
    if (!isOptional) return; // 必選模組不能取消
    
    const current = watchedSelectedModuleIds || [];
    if (checked) {
      setValue('selectedModuleIds', [...current, moduleId]);
    } else {
      setValue('selectedModuleIds', current.filter(id => id !== moduleId));
    }
  };

  // 處理語言勾選
  const handleLanguageChange = (lang: string, checked: boolean) => {
    const current = watchedLanguages || [];
    if (checked) {
      setValue('languages', [...current, lang]);
    } else {
      setValue('languages', current.filter(l => l !== lang));
    }
  };

  // 計算已選模組數量
  const selectedModulesCount = watchedSelectedModuleIds?.length || 0;

  // 提交表單
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // 收集所有檔案
      const allFiles = [
        ...logoFiles,
        ...heroFiles,
        ...productFiles,
        ...teamFiles,
        ...documentFiles,
      ].map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.url,
      }));

      // 使用 Supabase 或 localStorage 儲存
      const { clientId, projectId, error } = await createClientSubmission({
        companyName: data.companyName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        primaryColor: data.primaryColor,
        templateId: data.templateId,
        selectedModuleIds: data.selectedModuleIds,
        languages: data.languages,
        referenceSites: data.referenceSites,
        specialRequirements: data.specialRequirements,
        timeline: data.timeline,
        files: allFiles,
      });

      if (error) {
        throw new Error(error);
      }

      // 導航到成功頁面
      navigate('/intake/success', { state: { projectId } });
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 下一步
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 上一步
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 驗證是否可以進入下一步
  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return !!watchedTemplateId;
      case 2:
        return true; // 基本資訊在 submit 時驗證
      case 3:
        return selectedModulesCount > 0;
      default:
        return true;
    }
  }, [currentStep, watchedTemplateId, selectedModulesCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Creative Studio</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">網站建置需求單</span>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs mt-2 hidden sm:block ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-20 h-0.5 mx-1 mt-[-16px] ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: 選擇模板 */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutTemplate className="h-5 w-5 text-primary" />
                  選擇網站模板
                </CardTitle>
                <CardDescription>
                  請選擇最適合您需求的模板。我們會根據您的選擇產生對應的內容需求清單。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {availableTemplates.map((template) => {
                    const isSelected = watchedTemplateId === template.id;
                    const complexity = complexityStyles[template.complexity];
                    
                    return (
                      <div
                        key={template.id}
                        className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md' 
                            : 'border-border hover:border-primary/50 hover:shadow-sm'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Thumbnail placeholder */}
                          <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center shrink-0">
                            <LayoutTemplate className="h-8 w-8 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{template.name}</h3>
                              <Badge className={complexity.color}>
                                {complexity.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {template.description}
                            </p>
                            
                            {/* 預覽網站按鈕 */}
                            <a
                              href={template.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors mb-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-4 w-4" />
                              預覽此模板網站
                            </a>
                            
                            <div className="flex flex-wrap gap-2">
                              {template.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              預估內容準備時間：{template.estimatedContentTime}
                            </p>
                          </div>
                          
                          {/* Selection indicator */}
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? 'border-primary bg-primary' 
                              : 'border-muted'
                          }`}>
                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {errors.templateId && (
                  <p className="text-sm text-destructive mt-4">{errors.templateId.message}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: 基本資訊 */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  基本資訊
                </CardTitle>
                <CardDescription>
                  請填寫您的公司和聯絡資訊
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 公司名稱 */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    公司名稱 <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      placeholder="例：科技創新股份有限公司"
                      className="pl-10"
                      {...register('companyName')}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-sm text-destructive">{errors.companyName.message}</p>
                  )}
                </div>

                {/* 聯絡人姓名 */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">
                    聯絡人姓名 <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactName"
                      placeholder="例：王小明"
                      className="pl-10"
                      {...register('contactName')}
                    />
                  </div>
                  {errors.contactName && (
                    <p className="text-sm text-destructive">{errors.contactName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="example@company.com"
                      className="pl-10"
                      {...register('contactEmail')}
                    />
                  </div>
                  {errors.contactEmail && (
                    <p className="text-sm text-destructive">{errors.contactEmail.message}</p>
                  )}
                </div>

                {/* 電話 */}
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">電話</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactPhone"
                      placeholder="0912-345-678"
                      className="pl-10"
                      {...register('contactPhone')}
                    />
                  </div>
                </div>

                {/* 品牌主色 */}
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">品牌主色</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Palette className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="primaryColor"
                        placeholder="#3B82F6"
                        className="pl-10 w-40"
                        {...register('primaryColor')}
                      />
                    </div>
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer"
                      value={watch('primaryColor') || '#3B82F6'}
                      onChange={(e) => setValue('primaryColor', e.target.value)}
                    />
                  </div>
                </div>

                {/* 語言需求 */}
                <div className="space-y-3">
                  <Label>
                    網站語言 <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {selectedTemplate?.supportedLanguages.map((langCode) => {
                      const langLabels: Record<string, string> = {
                        'zh-TW': '繁體中文',
                        'en': 'English',
                        'ja': '日本語',
                        'ko': '한국어',
                      };
                      return (
                        <div key={langCode} className="flex items-center gap-2">
                          <Checkbox
                            id={`lang-${langCode}`}
                            checked={watchedLanguages?.includes(langCode)}
                            onCheckedChange={(checked) => 
                              handleLanguageChange(langCode, checked as boolean)
                            }
                          />
                          <Label htmlFor={`lang-${langCode}`} className="font-normal cursor-pointer">
                            {langLabels[langCode] || langCode}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {errors.languages && (
                    <p className="text-sm text-destructive">{errors.languages.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: 模組選擇 */}
          {currentStep === 3 && selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  功能模組選擇
                </CardTitle>
                <CardDescription>
                  根據您選擇的 <strong>{selectedTemplate.name}</strong> 模板，請勾選需要的功能模組（已選 {selectedModulesCount} 個）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedTemplate.modules.map((module) => {
                    const isChecked = watchedSelectedModuleIds?.includes(module.id) || false;
                    const isRequired = !module.optional;
                    
                    return (
                      <div
                        key={module.id}
                        className={`relative p-4 rounded-lg border-2 transition-all ${
                          isRequired ? 'cursor-default' : 'cursor-pointer'
                        } ${
                          isChecked 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => !isRequired && handleModuleChange(module.id, !isChecked, module.optional)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isChecked}
                            disabled={isRequired}
                            onCheckedChange={(checked) => 
                              handleModuleChange(module.id, checked as boolean, module.optional)
                            }
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{module.name}</span>
                              {isRequired && (
                                <Badge variant="secondary" className="text-xs">
                                  必選
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.description}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-2">
                              {module.sections.length} 個內容區塊
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: 素材上傳 */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  素材上傳
                </CardTitle>
                <CardDescription>
                  請上傳您的公司 Logo、圖片和文案內容。您也可以稍後透過協作平台補充。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo */}
                <FileUploader
                  label="公司 Logo"
                  description="建議上傳 PNG 或 SVG 格式，背景透明為佳"
                  accept="image/png,image/svg+xml,image/jpeg"
                  maxSize={5}
                  fileType="logo"
                  files={logoFiles}
                  onFilesChange={setLogoFiles}
                />

                <Separator />

                {/* Hero 圖片 */}
                <FileUploader
                  label="首頁主視覺圖片"
                  description="建議尺寸 1920x1080 或更大"
                  accept="image/*"
                  maxSize={10}
                  fileType="hero"
                  files={heroFiles}
                  onFilesChange={setHeroFiles}
                />

                {/* 產品圖片 - 根據選擇的模組顯示 */}
                {watchedSelectedModuleIds?.includes('products') && (
                  <>
                    <Separator />
                    <FileUploader
                      label="產品/服務圖片"
                      description="可上傳多張產品圖片"
                      accept="image/*"
                      multiple
                      maxSize={10}
                      fileType="product"
                      files={productFiles}
                      onFilesChange={setProductFiles}
                    />
                  </>
                )}

                <Separator />

                {/* 文案文件 */}
                <FileUploader
                  label="文案內容"
                  description="請上傳 Word、PDF 或其他文件，包含各區塊的標題和說明文字"
                  accept=".doc,.docx,.pdf,.txt"
                  multiple
                  maxSize={20}
                  fileType="document"
                  files={documentFiles}
                  onFilesChange={setDocumentFiles}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 5: 確認送出 */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  確認並送出
                </CardTitle>
                <CardDescription>
                  請確認以下資訊，然後點擊送出
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 時程 */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    預計上線時間
                  </Label>
                  <RadioGroup
                    value={watchedTimeline}
                    onValueChange={(value) => setValue('timeline', value as TimelineOption)}
                    className="grid grid-cols-2 gap-3"
                  >
                    {(Object.keys(timelineOptions) as TimelineOption[]).map((key) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={`timeline-${key}`} />
                        <Label htmlFor={`timeline-${key}`} className="font-normal cursor-pointer">
                          {timelineOptions[key].labelZh}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                {/* 參考網站 */}
                <div className="space-y-2">
                  <Label htmlFor="referenceSites" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    參考網站（選填）
                  </Label>
                  <Textarea
                    id="referenceSites"
                    placeholder="有沒有喜歡的網站風格？請提供連結"
                    rows={3}
                    {...register('referenceSites')}
                  />
                </div>

                {/* 特殊需求 */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">特殊需求或備註（選填）</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="其他想要告訴我們的事情..."
                    rows={3}
                    {...register('specialRequirements')}
                  />
                </div>

                <Separator />

                {/* 摘要 */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">需求摘要</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">選擇模板</div>
                    <div>{selectedTemplate?.name || '-'}</div>
                    <div className="text-muted-foreground">公司名稱</div>
                    <div>{watch('companyName') || '-'}</div>
                    <div className="text-muted-foreground">聯絡人</div>
                    <div>{watch('contactName') || '-'}</div>
                    <div className="text-muted-foreground">已選模組</div>
                    <div>{selectedModulesCount} 個</div>
                    <div className="text-muted-foreground">上傳檔案</div>
                    <div>
                      {logoFiles.length + heroFiles.length + productFiles.length + 
                       teamFiles.length + documentFiles.length} 個
                    </div>
                  </div>
                </div>

                {/* 內容需求預覽 */}
                {contentRequirements.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      📋 後續需要準備的內容
                    </h4>
                    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      {contentRequirements.map((module) => (
                        <div key={module.id} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{module.name}</span>
                          <span className="text-blue-500">
                            ({module.sections.length} 個區塊)
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      提交後，我們會提供詳細的內容填寫指南，協助您準備所有素材。
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              上一步
            </Button>

            {currentStep < 5 ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                disabled={!canProceed}
                className="gap-2"
              >
                下一步
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    提交中...
                  </>
                ) : (
                  <>
                    確認送出
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 Creative Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
