/**
 * AI 提醒訊息生成器 (Reminder Generator)
 * 
 * 根據素材狀態自動生成得體的催促訊息
 * 訊息風格：專業、友善，像真人專案經理寫的
 */

import type { 
  ProjectMaterialStatus, 
  ReminderTrigger,
  MaterialItem,
} from './material-tracker';

// ============================================================
// Types
// ============================================================

export interface ReminderMessage {
  subject: string;
  greeting: string;
  body: string;
  missingItemsList: string;
  closing: string;
  signature: string;
  fullMessage: string;
  
  // 用於 UI 顯示
  preview: string;
  urgencyLabel: string;
}

export interface ReminderConfig {
  agencyName: string;
  projectManagerName: string;
  projectManagerTitle: string;
  contactEmail: string;
  contactPhone?: string;
}

// ============================================================
// 訊息模板
// ============================================================

const GREETINGS = {
  gentle: [
    '您好！',
    '親愛的客戶您好，',
    '感謝您的耐心等待，',
  ],
  urgent: [
    '您好，',
    '親愛的客戶您好，',
  ],
  final: [
    '您好，',
  ],
};

const OPENINGS = {
  gentle: [
    '您的網站專案進展順利！為了讓我們的設計團隊能繼續推進，',
    '感謝您對我們的信任。為了確保您的網站能如期完成，',
    '我們的設計團隊已經開始為您規劃網站架構，',
  ],
  urgent: [
    '提醒您，您的網站專案目前正在等待您提供素材。',
    '我們注意到您的專案素材收集進度稍有延遲，',
    '為了確保能在預定時間內完成您的網站，',
  ],
  final: [
    '這是關於您網站專案的重要通知。',
    '您的專案目前因缺少必要素材而暫停進度，',
  ],
};

const CLOSINGS = {
  gentle: [
    '如果您手邊沒有合適的素材，我們也可以提供建議或協助。有任何問題歡迎隨時聯繫！',
    '如有任何問題或需要協助，請隨時與我聯繫。期待收到您的回覆！',
    '若您在準備素材時遇到任何困難，請隨時告訴我們，我們很樂意提供協助。',
  ],
  urgent: [
    '為了不耽誤後續進度，請您盡快提供上述素材。如有任何困難，請立即與我們聯繫。',
    '請您於本週內提供以上素材，以確保專案能順利進行。謝謝您的配合！',
  ],
  final: [
    '請您於三日內提供上述素材，否則我們可能需要重新安排專案時程。如有任何特殊情況，請盡快告知。',
    '若您因故無法繼續專案，也請告訴我們，我們會妥善處理。',
  ],
};

const SIGNATURES = {
  formal: (config: ReminderConfig) => 
`祝好，

${config.projectManagerName}
${config.projectManagerTitle}
${config.agencyName}
${config.contactEmail}${config.contactPhone ? `\n${config.contactPhone}` : ''}`,
  
  casual: (config: ReminderConfig) =>
`Best regards,

${config.projectManagerName}
${config.agencyName}`,
};

// ============================================================
// 核心功能：生成提醒訊息
// ============================================================

/**
 * 生成完整的提醒訊息
 */
export function generateReminderMessage(
  status: ProjectMaterialStatus,
  trigger: ReminderTrigger,
  config: ReminderConfig
): ReminderMessage {
  const urgency = trigger.urgency;
  
  // 隨機選擇模板變體
  const greeting = randomPick(GREETINGS[urgency]);
  const opening = randomPick(OPENINGS[urgency]);
  const closing = randomPick(CLOSINGS[urgency]);
  const signature = SIGNATURES.formal(config);
  
  // 生成缺項清單
  const missingItemsList = formatMissingItems(status.missingRequired, urgency);
  
  // 生成主體內容
  const body = generateBody(status, trigger, opening);
  
  // 組合完整訊息
  const fullMessage = `${greeting}

${body}

${missingItemsList}

${closing}

${signature}`;

  // 生成主題
  const subject = generateSubject(status, urgency);
  
  // 預覽文字（前 100 字）
  const preview = body.substring(0, 100) + '...';
  
  // 緊急程度標籤
  const urgencyLabel = urgency === 'gentle' ? '提醒' 
    : urgency === 'urgent' ? '急件' 
    : '重要';
  
  return {
    subject,
    greeting,
    body,
    missingItemsList,
    closing,
    signature,
    fullMessage,
    preview,
    urgencyLabel,
  };
}

/**
 * 生成郵件主題
 */
function generateSubject(status: ProjectMaterialStatus, urgency: string): string {
  const prefix = urgency === 'final' ? '【重要】' : urgency === 'urgent' ? '【提醒】' : '';
  return `${prefix}${status.clientName} 官網專案 - 素材準備提醒`;
}

/**
 * 生成訊息主體
 */
function generateBody(
  status: ProjectMaterialStatus, 
  trigger: ReminderTrigger,
  opening: string
): string {
  const { missingRequired, progress, byPhase } = status;
  
  // 根據緊急程度調整語氣
  if (trigger.urgency === 'gentle') {
    if (byPhase.phase1.completed < byPhase.phase1.total) {
      return `${opening}還需要您提供一些品牌基礎資料：`;
    }
    return `${opening}還需要您提供以下內容：`;
  }
  
  if (trigger.urgency === 'urgent') {
    return `${opening}

目前還有 ${missingRequired.length} 項必要素材尚未收到。為了確保能在預定時間內完成您的網站，請盡快提供以下內容：`;
  }
  
  // final
  return `${opening}

由於已超過 ${trigger.daysSinceLastActivity} 天未收到您的素材，我們可能需要調整專案時程。

目前還需要以下 ${missingRequired.length} 項必要素材：`;
}

/**
 * 格式化缺項清單
 */
function formatMissingItems(
  items: MaterialItem[], 
  urgency: string
): string {
  if (items.length === 0) {
    return '';
  }
  
  // 按類型分組
  const textItems = items.filter(i => 
    i.requirement.type === 'text' || i.requirement.type === 'textarea'
  );
  const imageItems = items.filter(i => 
    i.requirement.type === 'image' || i.requirement.type === 'logo' || i.requirement.type === 'icon'
  );
  
  let result = '';
  
  if (textItems.length > 0) {
    result += `📝 **文字內容**\n`;
    textItems.forEach(item => {
      const specs = item.requirement.specs;
      let hint = '';
      if (specs.minLength || specs.maxLength) {
        hint = `（建議 ${specs.minLength || 0}-${specs.maxLength || '不限'} 字）`;
      }
      result += `  • ${item.requirement.clientFacingLabel} ${hint}\n`;
      
      // 緊急程度較低時，加入說明
      if (urgency === 'gentle' && item.requirement.clientFacingDescription) {
        result += `    → ${item.requirement.clientFacingDescription}\n`;
      }
    });
    result += '\n';
  }
  
  if (imageItems.length > 0) {
    result += `🖼️ **圖片素材**\n`;
    imageItems.forEach(item => {
      const specs = item.requirement.specs;
      let hint = '';
      if (specs.minWidth && specs.minHeight) {
        hint = `（建議 ${specs.minWidth}x${specs.minHeight} 像素以上）`;
      }
      result += `  • ${item.requirement.clientFacingLabel} ${hint}\n`;
      
      if (urgency === 'gentle' && item.requirement.specs.tips?.length) {
        result += `    → ${item.requirement.specs.tips[0]}\n`;
      }
    });
  }
  
  return result.trim();
}

// ============================================================
// 特定場景的訊息模板
// ============================================================

/**
 * 專案啟動時的歡迎訊息
 */
export function generateWelcomeMessage(
  clientName: string,
  contactName: string,
  projectName: string,
  templateName: string,
  config: ReminderConfig
): string {
  return `親愛的 ${contactName} 您好，

歡迎選擇 ${config.agencyName}！

我是負責您專案的專案經理 ${config.projectManagerName}，很高興能協助您打造「${projectName}」。

您選擇的是我們的「${templateName}」方案，這是一個非常受歡迎的選擇，能完整展現企業的專業形象。

**接下來的步驟**

為了讓我們的設計團隊能開始為您工作，請先準備以下基礎資料：

📋 **品牌資料**
  • 公司 Logo（建議 PNG 透明背景）
  • 品牌主色（色碼，例如 #3B82F6）
  • 公司基本介紹

您可以直接回覆此郵件附上素材，或登入我們的素材提交系統進行上傳。

如果您有任何問題，歡迎隨時聯繫我。

期待與您合作！

${SIGNATURES.formal(config)}`;
}

/**
 * 素材收到確認訊息
 */
export function generateReceiptConfirmation(
  contactName: string,
  receivedItems: string[],
  remainingItems: string[],
  config: ReminderConfig
): string {
  let message = `${contactName} 您好，

感謝您提供素材！我們已收到以下內容：

${receivedItems.map(item => `✅ ${item}`).join('\n')}

`;

  if (remainingItems.length > 0) {
    message += `
為了完成您的網站，我們還需要：

${remainingItems.map(item => `⏳ ${item}`).join('\n')}

請您在方便時提供，謝謝！
`;
  } else {
    message += `
太好了！所有必要素材已收齊，我們的設計團隊將開始為您打造網站。預計 3-5 個工作天內會有初版供您預覽。

請靜候佳音！
`;
  }

  message += `
${SIGNATURES.casual(config)}`;

  return message;
}

/**
 * 素材規格不符的通知
 */
export function generateRejectionNotice(
  contactName: string,
  rejectedItem: string,
  reason: string,
  suggestion: string,
  config: ReminderConfig
): string {
  return `${contactName} 您好，

感謝您提供「${rejectedItem}」，不過這個素材有一點小問題需要調整：

❌ **問題**：${reason}

💡 **建議**：${suggestion}

請您調整後重新提供，謝謝！如有任何問題，歡迎隨時聯繫我。

${SIGNATURES.casual(config)}`;
}

/**
 * 專案完成準備通知
 */
export function generateReadyToBuildNotice(
  contactName: string,
  projectName: string,
  config: ReminderConfig
): string {
  return `${contactName} 您好，

好消息！「${projectName}」所需的素材已經全部收齊 🎉

我們的設計團隊將開始為您建置網站，預計 3-5 個工作天內會有初版供您預覽。

在等待期間，如果您想到任何補充的內容或有特別的想法，歡迎隨時告訴我們。

感謝您的配合，敬請期待！

${SIGNATURES.formal(config)}`;
}

// ============================================================
// 工具函數
// ============================================================

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// 預設配置
// ============================================================

export const DEFAULT_REMINDER_CONFIG: ReminderConfig = {
  agencyName: 'Creative Studio',
  projectManagerName: '專案團隊',
  projectManagerTitle: '專案經理',
  contactEmail: 'project@creativestudio.com',
};


