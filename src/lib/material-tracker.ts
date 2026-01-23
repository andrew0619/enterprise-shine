/**
 * 素材追蹤系統 (Material Tracker)
 * 
 * 追蹤客戶提交的素材狀態，並提供缺項分析
 */

import { 
  generateContentChecklist, 
  type ContentRequirement,
  type ProjectContentChecklist,
} from './content-requirements';

// ============================================================
// Types
// ============================================================

export type MaterialStatus = 
  | 'missing'      // 尚未提供
  | 'pending'      // 已收到，待審核
  | 'approved'     // 已審核通過
  | 'rejected'     // 規格不符，需重新提供
  | 'revision'     // 客戶修改中

export interface MaterialItem {
  requirementId: string;
  requirement: ContentRequirement;
  
  // 狀態
  status: MaterialStatus;
  statusUpdatedAt: string | null;
  
  // 已提交的內容
  submittedValue: string | null;
  submittedFileUrl: string | null;
  submittedAt: string | null;
  
  // 審核資訊
  reviewNote: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  
  // AI 驗證結果
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    score?: number;
  } | null;
}

export interface ProjectMaterialStatus {
  projectId: string;
  clientName: string;
  
  // 進度統計
  progress: {
    total: number;
    submitted: number;
    approved: number;
    rejected: number;
    missing: number;
    completionRate: number; // 百分比
  };
  
  // 分類統計
  byPhase: {
    phase1: { total: number; completed: number };
    phase2: { total: number; completed: number };
    phase3: { total: number; completed: number };
  };
  
  byType: {
    text: { total: number; completed: number };
    image: { total: number; completed: number };
  };
  
  // 所有素材項目
  items: MaterialItem[];
  
  // 缺少的必填項目
  missingRequired: MaterialItem[];
  
  // 需要修改的項目
  needsRevision: MaterialItem[];
  
  // 最後活動時間
  lastActivityAt: string | null;
  
  // 是否可以進入下一步
  canProceed: boolean;
  blockers: string[];
}

export interface ReminderTrigger {
  shouldRemind: boolean;
  urgency: 'gentle' | 'urgent' | 'final';
  daysSinceLastActivity: number;
  missingRequiredCount: number;
  reason: string;
}

// ============================================================
// 核心功能：計算素材狀態
// ============================================================

/**
 * 計算專案的素材收集狀態
 */
export function calculateMaterialStatus(
  projectId: string,
  clientName: string,
  templateId: string,
  selectedModuleIds: string[],
  submittedContent: Array<{
    requirementId: string;
    value?: string;
    fileUrl?: string;
    submittedAt: string;
    status: MaterialStatus;
    validation?: MaterialItem['validation'];
  }>
): ProjectMaterialStatus {
  // 生成需求清單
  const checklist = generateContentChecklist(projectId, templateId, selectedModuleIds);
  const allRequirements = [
    ...checklist.phases.phase1,
    ...checklist.phases.phase2,
    ...checklist.phases.phase3,
  ];
  
  // 建立提交內容的查詢表
  const submittedMap = new Map(
    submittedContent.map(s => [s.requirementId, s])
  );
  
  // 轉換為 MaterialItem
  const items: MaterialItem[] = allRequirements.map(req => {
    const submitted = submittedMap.get(req.id);
    
    if (submitted) {
      return {
        requirementId: req.id,
        requirement: req,
        status: submitted.status,
        statusUpdatedAt: submitted.submittedAt,
        submittedValue: submitted.value || null,
        submittedFileUrl: submitted.fileUrl || null,
        submittedAt: submitted.submittedAt,
        reviewNote: null,
        reviewedAt: null,
        reviewedBy: null,
        validation: submitted.validation || null,
      };
    }
    
    return {
      requirementId: req.id,
      requirement: req,
      status: 'missing',
      statusUpdatedAt: null,
      submittedValue: null,
      submittedFileUrl: null,
      submittedAt: null,
      reviewNote: null,
      reviewedAt: null,
      reviewedBy: null,
      validation: null,
    };
  });
  
  // 統計
  const submitted = items.filter(i => i.status !== 'missing').length;
  const approved = items.filter(i => i.status === 'approved').length;
  const rejected = items.filter(i => i.status === 'rejected').length;
  const missing = items.filter(i => i.status === 'missing').length;
  
  const progress = {
    total: items.length,
    submitted,
    approved,
    rejected,
    missing,
    completionRate: items.length > 0 ? Math.round((approved / items.length) * 100) : 0,
  };
  
  // 按階段統計
  const phase1Items = items.filter(i => i.requirement.collectionPhase === 1);
  const phase2Items = items.filter(i => i.requirement.collectionPhase === 2);
  const phase3Items = items.filter(i => i.requirement.collectionPhase === 3);
  
  const byPhase = {
    phase1: {
      total: phase1Items.length,
      completed: phase1Items.filter(i => i.status === 'approved').length,
    },
    phase2: {
      total: phase2Items.length,
      completed: phase2Items.filter(i => i.status === 'approved').length,
    },
    phase3: {
      total: phase3Items.length,
      completed: phase3Items.filter(i => i.status === 'approved').length,
    },
  };
  
  // 按類型統計
  const textItems = items.filter(i => 
    i.requirement.type === 'text' || i.requirement.type === 'textarea'
  );
  const imageItems = items.filter(i => 
    i.requirement.type === 'image' || i.requirement.type === 'logo' || i.requirement.type === 'icon'
  );
  
  const byType = {
    text: {
      total: textItems.length,
      completed: textItems.filter(i => i.status === 'approved').length,
    },
    image: {
      total: imageItems.length,
      completed: imageItems.filter(i => i.status === 'approved').length,
    },
  };
  
  // 缺少的必填項目
  const missingRequired = items.filter(
    i => i.status === 'missing' && i.requirement.required
  );
  
  // 需要修改的項目
  const needsRevision = items.filter(i => i.status === 'rejected');
  
  // 最後活動時間
  const submittedItems = items.filter(i => i.submittedAt);
  const lastActivityAt = submittedItems.length > 0
    ? submittedItems
        .map(i => i.submittedAt!)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
    : null;
  
  // 是否可以進入下一步
  const blockers: string[] = [];
  if (missingRequired.length > 0) {
    blockers.push(`還有 ${missingRequired.length} 個必填項目未提供`);
  }
  if (needsRevision.length > 0) {
    blockers.push(`有 ${needsRevision.length} 個項目需要重新提供`);
  }
  
  return {
    projectId,
    clientName,
    progress,
    byPhase,
    byType,
    items,
    missingRequired,
    needsRevision,
    lastActivityAt,
    canProceed: blockers.length === 0,
    blockers,
  };
}

// ============================================================
// 提醒觸發邏輯
// ============================================================

/**
 * 判斷是否需要發送提醒
 */
export function checkReminderTrigger(
  status: ProjectMaterialStatus,
  projectCreatedAt: string,
  lastReminderSentAt: string | null
): ReminderTrigger {
  const now = new Date();
  const created = new Date(projectCreatedAt);
  const lastActivity = status.lastActivityAt ? new Date(status.lastActivityAt) : created;
  const lastReminder = lastReminderSentAt ? new Date(lastReminderSentAt) : null;
  
  // 計算天數
  const daysSinceCreated = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  const daysSinceLastReminder = lastReminder 
    ? Math.floor((now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24))
    : daysSinceCreated;
  
  const missingRequiredCount = status.missingRequired.length;
  
  // 如果已經完成，不需要提醒
  if (status.canProceed) {
    return {
      shouldRemind: false,
      urgency: 'gentle',
      daysSinceLastActivity,
      missingRequiredCount,
      reason: '素材已齊全',
    };
  }
  
  // 提醒規則
  // 1. 溫和提醒：3 天沒有活動
  // 2. 緊急提醒：7 天沒有活動
  // 3. 最終提醒：14 天沒有活動
  
  // 確保提醒之間至少間隔 2 天
  if (daysSinceLastReminder < 2) {
    return {
      shouldRemind: false,
      urgency: 'gentle',
      daysSinceLastActivity,
      missingRequiredCount,
      reason: '距離上次提醒不到 2 天',
    };
  }
  
  if (daysSinceLastActivity >= 14) {
    return {
      shouldRemind: true,
      urgency: 'final',
      daysSinceLastActivity,
      missingRequiredCount,
      reason: `已超過 14 天未提供素材，專案可能需要暫停`,
    };
  }
  
  if (daysSinceLastActivity >= 7) {
    return {
      shouldRemind: true,
      urgency: 'urgent',
      daysSinceLastActivity,
      missingRequiredCount,
      reason: `已超過 7 天未提供素材`,
    };
  }
  
  if (daysSinceLastActivity >= 3) {
    return {
      shouldRemind: true,
      urgency: 'gentle',
      daysSinceLastActivity,
      missingRequiredCount,
      reason: `已超過 3 天未提供素材`,
    };
  }
  
  return {
    shouldRemind: false,
    urgency: 'gentle',
    daysSinceLastActivity,
    missingRequiredCount,
    reason: '活動正常，暫不需要提醒',
  };
}

// ============================================================
// 取得下一步建議
// ============================================================

export interface NextStepSuggestion {
  type: 'collect_more' | 'review_pending' | 'fix_rejected' | 'ready_to_build';
  title: string;
  description: string;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

/**
 * 根據狀態提供下一步建議
 */
export function getNextStepSuggestion(status: ProjectMaterialStatus): NextStepSuggestion {
  // 有被拒絕的項目，優先處理
  if (status.needsRevision.length > 0) {
    return {
      type: 'fix_rejected',
      title: '需要重新提供素材',
      description: `有 ${status.needsRevision.length} 個項目不符合規格，需要客戶重新提供`,
      actionItems: status.needsRevision.map(i => 
        `${i.requirement.clientFacingLabel}：${i.reviewNote || '規格不符'}`
      ),
      priority: 'high',
    };
  }
  
  // 有待審核的項目
  const pendingItems = status.items.filter(i => i.status === 'pending');
  if (pendingItems.length > 0) {
    return {
      type: 'review_pending',
      title: '有素材待審核',
      description: `${pendingItems.length} 個項目等待審核`,
      actionItems: pendingItems.map(i => i.requirement.clientFacingLabel),
      priority: 'medium',
    };
  }
  
  // 還有缺少的必填項目
  if (status.missingRequired.length > 0) {
    // 按階段建議
    const phase1Missing = status.missingRequired.filter(i => i.requirement.collectionPhase === 1);
    const phase2Missing = status.missingRequired.filter(i => i.requirement.collectionPhase === 2);
    
    if (phase1Missing.length > 0) {
      return {
        type: 'collect_more',
        title: '需要收集品牌基礎資料',
        description: '請先完成品牌基礎資料的收集',
        actionItems: phase1Missing.map(i => i.requirement.clientFacingLabel),
        priority: 'high',
      };
    }
    
    return {
      type: 'collect_more',
      title: '繼續收集主要內容',
      description: `還有 ${status.missingRequired.length} 個必填項目需要客戶提供`,
      actionItems: phase2Missing.slice(0, 5).map(i => i.requirement.clientFacingLabel),
      priority: 'medium',
    };
  }
  
  // 全部完成
  return {
    type: 'ready_to_build',
    title: '素材已齊全',
    description: '所有必要素材已收集完成，可以開始建置網站',
    actionItems: ['檢視所有內容', '開始網站生成'],
    priority: 'low',
  };
}

// ============================================================
// 匯出統計報告
// ============================================================

export interface MaterialReport {
  generatedAt: string;
  project: {
    id: string;
    clientName: string;
  };
  summary: {
    completionRate: number;
    totalItems: number;
    completedItems: number;
    missingItems: number;
    rejectedItems: number;
  };
  phases: Array<{
    name: string;
    total: number;
    completed: number;
    percentage: number;
  }>;
  missingList: Array<{
    label: string;
    type: string;
    priority: string;
    description: string;
  }>;
  nextSteps: string[];
}

/**
 * 生成素材收集報告
 */
export function generateMaterialReport(status: ProjectMaterialStatus): MaterialReport {
  const nextStep = getNextStepSuggestion(status);
  
  return {
    generatedAt: new Date().toISOString(),
    project: {
      id: status.projectId,
      clientName: status.clientName,
    },
    summary: {
      completionRate: status.progress.completionRate,
      totalItems: status.progress.total,
      completedItems: status.progress.approved,
      missingItems: status.progress.missing,
      rejectedItems: status.progress.rejected,
    },
    phases: [
      {
        name: '品牌基礎資料',
        total: status.byPhase.phase1.total,
        completed: status.byPhase.phase1.completed,
        percentage: status.byPhase.phase1.total > 0 
          ? Math.round((status.byPhase.phase1.completed / status.byPhase.phase1.total) * 100)
          : 0,
      },
      {
        name: '主要內容',
        total: status.byPhase.phase2.total,
        completed: status.byPhase.phase2.completed,
        percentage: status.byPhase.phase2.total > 0
          ? Math.round((status.byPhase.phase2.completed / status.byPhase.phase2.total) * 100)
          : 0,
      },
      {
        name: '補充內容',
        total: status.byPhase.phase3.total,
        completed: status.byPhase.phase3.completed,
        percentage: status.byPhase.phase3.total > 0
          ? Math.round((status.byPhase.phase3.completed / status.byPhase.phase3.total) * 100)
          : 0,
      },
    ],
    missingList: status.missingRequired.map(item => ({
      label: item.requirement.clientFacingLabel,
      type: item.requirement.type === 'image' || item.requirement.type === 'logo' ? '圖片' : '文字',
      priority: item.requirement.priority === 'high' ? '高' : item.requirement.priority === 'medium' ? '中' : '低',
      description: item.requirement.clientFacingDescription,
    })),
    nextSteps: nextStep.actionItems,
  };
}

