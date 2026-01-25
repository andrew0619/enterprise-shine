/**
 * Content Validator Component
 * AI 內容審核元件
 * 
 * 在客戶提交前檢查內容品質和圖片規格
 */

import { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  FileImage,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  validateImage,
  validateText,
  generateValidationReport,
  type ImageValidationResult,
  type TextValidationResult,
  type ValidationReport,
  type ContentFieldSpec,
  FIELD_SPECS,
} from '@/lib/content-validator';

interface ContentValidatorProps {
  projectId: string;
  contentItems: Array<{
    moduleId: string;
    moduleName: string;
    sectionId: string;
    sectionName: string;
    fieldId: string;
    fieldName: string;
    type: 'text' | 'textarea' | 'image';
    value: string | null;
    file?: File;
  }>;
  onValidationComplete?: (report: ValidationReport) => void;
}

interface FieldValidationStatus {
  fieldId: string;
  status: 'pending' | 'validating' | 'valid' | 'warning' | 'error';
  result?: ImageValidationResult | TextValidationResult;
}

export function ContentValidator({
  projectId,
  contentItems,
  onValidationComplete,
}: ContentValidatorProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [fieldStatuses, setFieldStatuses] = useState<Map<string, FieldValidationStatus>>(new Map());
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const runValidation = async () => {
    setIsValidating(true);
    setValidationProgress(0);
    setReport(null);

    const statuses = new Map<string, FieldValidationStatus>();
    const fieldResults: ValidationReport['fieldResults'] = [];

    for (let i = 0; i < contentItems.length; i++) {
      const item = contentItems[i];
      
      // 更新進度
      setValidationProgress(Math.round(((i + 1) / contentItems.length) * 100));

      // 標記為驗證中
      statuses.set(item.fieldId, {
        fieldId: item.fieldId,
        status: 'validating',
      });
      setFieldStatuses(new Map(statuses));

      // 模擬延遲以顯示進度
      await new Promise((r) => setTimeout(r, 100));

      let result: ImageValidationResult | TextValidationResult;
      let isValid = true;
      let score: number | undefined;
      let errors: string[] = [];
      let warnings: string[] = [];
      let suggestions: string[] = [];

      if (item.type === 'image' && item.file) {
        // 驗證圖片
        const spec = getFieldSpec(item.fieldId);
        result = await validateImage(item.file, spec);
        isValid = result.isValid;
        errors = result.errors;
        warnings = result.warnings;
        suggestions = result.suggestions;
      } else if (item.value) {
        // 驗證文字
        const spec = getFieldSpec(item.fieldId);
        result = validateText(item.value, spec);
        isValid = result.isValid;
        score = result.score;
        errors = result.errors;
        warnings = result.warnings;
        suggestions = result.suggestions;
      } else {
        // 空值但非必填
        result = {
          isValid: true,
          score: 100,
          errors: [],
          warnings: [],
          analysis: {
            charCount: 0,
            wordCount: 0,
            sentenceCount: 0,
            readabilityScore: 100,
            hasEmoji: false,
            language: 'unknown',
          },
          suggestions: [],
        } as TextValidationResult;
      }

      // 更新狀態
      const status: FieldValidationStatus['status'] = 
        !isValid ? 'error' : 
        warnings.length > 0 ? 'warning' : 
        'valid';

      statuses.set(item.fieldId, {
        fieldId: item.fieldId,
        status,
        result,
      });
      setFieldStatuses(new Map(statuses));

      // 收集結果
      fieldResults.push({
        moduleId: item.moduleId,
        moduleName: item.moduleName,
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        type: item.type === 'image' ? 'image' : 'text',
        isValid,
        score,
        errors,
        warnings,
        suggestions,
      });
    }

    // 產生報告
    const finalReport = generateValidationReport(projectId, fieldResults);
    setReport(finalReport);
    setIsValidating(false);

    // 展開有問題的模組
    const problemModules = new Set(
      fieldResults
        .filter((f) => !f.isValid || f.warnings.length > 0)
        .map((f) => f.moduleId)
    );
    setExpandedModules(problemModules);

    onValidationComplete?.(finalReport);
  };

  const getFieldSpec = (fieldId: string): ContentFieldSpec => {
    // 嘗試從預定義規格中取得，否則使用預設值
    return FIELD_SPECS[fieldId] || {
      type: 'text',
      minLength: 1,
      required: false,
    };
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getStatusIcon = (status: FieldValidationStatus['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'validating':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  // 按模組分組內容
  const groupedItems = contentItems.reduce((acc, item) => {
    if (!acc[item.moduleId]) {
      acc[item.moduleId] = {
        moduleName: item.moduleName,
        items: [],
      };
    }
    acc[item.moduleId].items.push(item);
    return acc;
  }, {} as Record<string, { moduleName: string; items: typeof contentItems }>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI 內容審核
        </CardTitle>
        <CardDescription>
          自動檢查圖片規格和文案品質，確保內容符合網站需求
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 驗證按鈕與進度 */}
        <div className="space-y-4">
          <Button
            onClick={runValidation}
            disabled={isValidating || contentItems.length === 0}
            className="w-full"
          >
            {isValidating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                審核中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                開始 AI 審核
              </>
            )}
          </Button>

          {isValidating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>審核進度</span>
                <span>{validationProgress}%</span>
              </div>
              <Progress value={validationProgress} />
            </div>
          )}
        </div>

        {/* 審核報告摘要 */}
        {report && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{report.totalFields}</div>
                <div className="text-sm text-muted-foreground">總欄位數</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30">
                <div className="text-2xl font-bold text-green-600">{report.validFields}</div>
                <div className="text-sm text-muted-foreground">通過</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                <div className="text-2xl font-bold text-yellow-600">{report.warningFields}</div>
                <div className="text-sm text-muted-foreground">警告</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/30">
                <div className="text-2xl font-bold text-red-600">{report.invalidFields}</div>
                <div className="text-sm text-muted-foreground">錯誤</div>
              </div>
            </div>

            {/* 整體分數 */}
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">內容品質分數</div>
                <Progress value={report.overallScore} />
              </div>
              <div className={`text-3xl font-bold ${
                report.overallScore >= 80 ? 'text-green-600' :
                report.overallScore >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {report.overallScore}
              </div>
            </div>

            {/* 關鍵問題 */}
            {report.summary.criticalIssues.length > 0 && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  需要處理的問題
                </h4>
                <ul className="space-y-1">
                  {report.summary.criticalIssues.map((issue, i) => (
                    <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                      <XCircle className="h-4 w-4 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 建議 */}
            {report.summary.recommendations.length > 0 && (
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  改進建議
                </h4>
                <ul className="space-y-1">
                  {report.summary.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <Info className="h-4 w-4 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 詳細欄位列表 */}
        {fieldStatuses.size > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">詳細檢查結果</h4>
            
            {Object.entries(groupedItems).map(([moduleId, { moduleName, items }]) => {
              const moduleStatuses = items.map((item) => fieldStatuses.get(item.fieldId));
              const hasError = moduleStatuses.some((s) => s?.status === 'error');
              const hasWarning = moduleStatuses.some((s) => s?.status === 'warning');
              const isExpanded = expandedModules.has(moduleId);

              return (
                <Collapsible key={moduleId} open={isExpanded}>
                  <CollapsibleTrigger
                    onClick={() => toggleModule(moduleId)}
                    className="flex items-center gap-2 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{moduleName}</span>
                    <div className="flex-1" />
                    {hasError && (
                      <Badge variant="destructive" className="text-xs">
                        有錯誤
                      </Badge>
                    )}
                    {!hasError && hasWarning && (
                      <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-300">
                        有警告
                      </Badge>
                    )}
                    {!hasError && !hasWarning && moduleStatuses.some((s) => s?.status === 'valid') && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        通過
                      </Badge>
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="ml-6 space-y-2 pb-2">
                      {items.map((item) => {
                        const fieldStatus = fieldStatuses.get(item.fieldId);
                        const result = fieldStatus?.result;

                        return (
                          <div
                            key={item.fieldId}
                            className="p-3 rounded-lg border bg-card"
                          >
                            <div className="flex items-start gap-3">
                              {getStatusIcon(fieldStatus?.status || 'pending')}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {item.type === 'image' ? (
                                    <FileImage className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className="font-medium text-sm">{item.fieldName}</span>
                                  {'score' in (result || {}) && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Badge variant="outline" className="text-xs">
                                            {(result as TextValidationResult).score}分
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>文案品質分數</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>

                                {/* 錯誤 */}
                                {result?.errors.map((error, i) => (
                                  <p key={i} className="text-sm text-red-600 dark:text-red-400">
                                    ❌ {error}
                                  </p>
                                ))}

                                {/* 警告 */}
                                {result?.warnings.map((warning, i) => (
                                  <p key={i} className="text-sm text-yellow-600 dark:text-yellow-400">
                                    ⚠️ {warning}
                                  </p>
                                ))}

                                {/* 建議 */}
                                {result?.suggestions.map((suggestion, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">
                                    💡 {suggestion}
                                  </p>
                                ))}

                                {/* 圖片詳情 */}
                                {'details' in (result || {}) && (
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    {(result as ImageValidationResult).details.width} × {(result as ImageValidationResult).details.height}px
                                    {' · '}
                                    {(result as ImageValidationResult).details.format}
                                    {' · '}
                                    {formatFileSize((result as ImageValidationResult).details.fileSize)}
                                  </div>
                                )}

                                {/* 文案詳情 */}
                                {'analysis' in (result || {}) && (result as TextValidationResult).analysis.charCount > 0 && (
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    {(result as TextValidationResult).analysis.charCount} 字
                                    {' · '}
                                    {(result as TextValidationResult).analysis.sentenceCount} 句
                                    {' · '}
                                    {(result as TextValidationResult).analysis.language === 'zh-TW' ? '中文' :
                                     (result as TextValidationResult).analysis.language === 'en' ? '英文' : '混合'}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


