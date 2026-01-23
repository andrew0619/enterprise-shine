/**
 * 素材狀態面板（Agency 後台用）
 * 
 * 顯示專案的素材收集進度和缺項清單
 */

import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Send,
  RefreshCw,
  Eye,
  Copy,
  FileText,
  Image,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import {
  calculateMaterialStatus,
  checkReminderTrigger,
  getNextStepSuggestion,
  generateMaterialReport,
  type ProjectMaterialStatus,
  type ReminderTrigger,
} from '@/lib/material-tracker';
import {
  generateReminderMessage,
  DEFAULT_REMINDER_CONFIG,
  type ReminderMessage,
} from '@/lib/reminder-generator';

interface MaterialStatusPanelProps {
  projectId: string;
  clientName: string;
  templateId: string;
  selectedModuleIds: string[];
  projectCreatedAt: string;
  lastReminderSentAt?: string;
}

export function MaterialStatusPanel({
  projectId,
  clientName,
  templateId,
  selectedModuleIds,
  projectCreatedAt,
  lastReminderSentAt,
}: MaterialStatusPanelProps) {
  const [status, setStatus] = useState<ProjectMaterialStatus | null>(null);
  const [reminderTrigger, setReminderTrigger] = useState<ReminderTrigger | null>(null);
  const [reminderMessage, setReminderMessage] = useState<ReminderMessage | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));
  const { toast } = useToast();

  useEffect(() => {
    loadStatus();
  }, [projectId]);

  const loadStatus = () => {
    // 從 localStorage 載入已提交的素材
    const saved = localStorage.getItem(`materials_${projectId}`);
    const submittedContent = saved ? Object.entries(JSON.parse(saved)).map(([id, item]: [string, any]) => ({
      requirementId: id,
      value: item.value,
      fileUrl: item.fileUrl,
      submittedAt: item.submittedAt,
      status: item.status,
    })) : [];

    // 計算狀態
    const materialStatus = calculateMaterialStatus(
      projectId,
      clientName,
      templateId,
      selectedModuleIds,
      submittedContent
    );
    setStatus(materialStatus);

    // 檢查是否需要提醒
    const trigger = checkReminderTrigger(
      materialStatus,
      projectCreatedAt,
      lastReminderSentAt || null
    );
    setReminderTrigger(trigger);

    // 如果需要提醒，生成訊息
    if (trigger.shouldRemind) {
      const message = generateReminderMessage(
        materialStatus,
        trigger,
        DEFAULT_REMINDER_CONFIG
      );
      setReminderMessage(message);
    }
  };

  const togglePhase = (phase: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  const copyReminderToClipboard = async () => {
    if (reminderMessage) {
      await navigator.clipboard.writeText(reminderMessage.fullMessage);
      toast({
        title: '已複製',
        description: '提醒訊息已複製到剪貼簿',
      });
    }
  };

  if (!status) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">載入中...</p>
        </CardContent>
      </Card>
    );
  }

  const nextStep = getNextStepSuggestion(status);

  return (
    <div className="space-y-6">
      {/* 進度總覽 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            素材收集狀態
            <Button variant="ghost" size="sm" onClick={loadStatus}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 進度條 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>整體進度</span>
              <span className="font-medium">{status.progress.completionRate}%</span>
            </div>
            <Progress value={status.progress.completionRate} className="h-2" />
          </div>

          {/* 統計數字 */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold">{status.progress.total}</div>
              <div className="text-xs text-muted-foreground">總計</div>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
              <div className="text-lg font-bold text-green-600">{status.progress.approved}</div>
              <div className="text-xs text-muted-foreground">已確認</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
              <div className="text-lg font-bold text-yellow-600">{status.progress.submitted - status.progress.approved}</div>
              <div className="text-xs text-muted-foreground">待審核</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
              <div className="text-lg font-bold text-red-600">{status.progress.missing}</div>
              <div className="text-xs text-muted-foreground">缺少</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 下一步建議 */}
      <Card className={
        nextStep.priority === 'high' ? 'border-red-200 dark:border-red-900' :
        nextStep.priority === 'medium' ? 'border-yellow-200 dark:border-yellow-900' :
        'border-green-200 dark:border-green-900'
      }>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            {nextStep.type === 'ready_to_build' ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : nextStep.priority === 'high' ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
            {nextStep.title}
          </CardTitle>
          <CardDescription>{nextStep.description}</CardDescription>
        </CardHeader>
        {nextStep.actionItems.length > 0 && (
          <CardContent>
            <ul className="space-y-1">
              {nextStep.actionItems.slice(0, 5).map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
              {nextStep.actionItems.length > 5 && (
                <li className="text-sm text-muted-foreground">
                  ...還有 {nextStep.actionItems.length - 5} 項
                </li>
              )}
            </ul>
          </CardContent>
        )}
      </Card>

      {/* AI 提醒建議 */}
      {reminderTrigger?.shouldRemind && reminderMessage && (
        <Card className="border-blue-200 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-500" />
              建議發送提醒
              <Badge variant="outline" className={
                reminderTrigger.urgency === 'gentle' ? 'text-blue-600' :
                reminderTrigger.urgency === 'urgent' ? 'text-orange-600' :
                'text-red-600'
              }>
                {reminderMessage.urgencyLabel}
              </Badge>
            </CardTitle>
            <CardDescription>
              {reminderTrigger.reason}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <p className="font-medium mb-1">主旨：{reminderMessage.subject}</p>
              <p className="text-muted-foreground line-clamp-3">{reminderMessage.preview}</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    預覽完整內容
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>提醒訊息預覽</DialogTitle>
                    <DialogDescription>
                      這是 AI 根據目前狀態生成的提醒訊息
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {reminderMessage.fullMessage}
                    </pre>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={copyReminderToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      複製
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      發送（模擬）
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="sm" className="gap-2" onClick={copyReminderToClipboard}>
                <Copy className="h-4 w-4" />
                複製訊息
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 詳細清單 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">詳細清單</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[1, 2, 3].map((phase) => {
            const phaseItems = status.items.filter(i => i.requirement.collectionPhase === phase);
            if (phaseItems.length === 0) return null;
            
            const completed = phaseItems.filter(i => i.status === 'approved').length;
            const phaseName = phase === 1 ? '品牌基礎資料' : phase === 2 ? '主要內容' : '補充內容';
            
            return (
              <Collapsible key={phase} open={expandedPhases.has(phase)}>
                <CollapsibleTrigger
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => togglePhase(phase)}
                >
                  <div className="flex items-center gap-2">
                    {expandedPhases.has(phase) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium">{phaseName}</span>
                  </div>
                  <Badge variant="outline">
                    {completed} / {phaseItems.length}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 space-y-1 pb-2">
                    {phaseItems.map((item) => (
                      <div
                        key={item.requirementId}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-sm"
                      >
                        <div className="flex items-center gap-2">
                          {item.requirement.type === 'image' || 
                           item.requirement.type === 'logo' ? (
                            <Image className="h-4 w-4 text-purple-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-blue-500" />
                          )}
                          <span>{item.requirement.label}</span>
                          {item.requirement.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'approved':
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          已確認
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          待審核
        </Badge>
      );
    case 'rejected':
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          需修改
        </Badge>
      );
    case 'missing':
    default:
      return (
        <Badge variant="outline" className="text-muted-foreground">
          缺少
        </Badge>
      );
  }
}

