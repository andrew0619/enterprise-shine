/**
 * 📄 Page Builder - 頁面生成器
 * 
 * 整合劇本引擎、內容架構、頁面組合器的完整預覽系統
 * 支持使用樣本網站的真實內容進行排版測試
 */

import React, { useState, useMemo } from 'react';
import { 
  generateScript, 
  validateVisualRhythm,
  SCRIPT_TEMPLATES,
  type Persona,
  type PageGoal,
  type Tone,
  type ScriptConfig,
  type PageScript
} from '@/lib/script-engine';
import type { PageContent } from '@/lib/content-schema';
import { composePage, generatePageCode } from '@/lib/page-composer';
import { cn } from '@/lib/utils';

// 樣本內容
import { 
  quantumHorizonsContent, 
  enterpriseShineContent,
  SAMPLE_OPTIONS,
  type SampleId,
} from '@/lib/sample-content';

// ============================================================
// 類型定義
// ============================================================

type ViewMode = 'preview' | 'code' | 'script' | 'compare';

// ============================================================
// 主組件
// ============================================================

export default function PageBuilder() {
  // 樣本選擇
  const [selectedSample, setSelectedSample] = useState<SampleId>('enterprise-shine');
  
  // 劇本配置
  const [persona, setPersona] = useState<Persona>('executive');
  const [goal, setGoal] = useState<PageGoal>('lead-gen');
  const [tone, setTone] = useState<Tone>('professional');
  
  // 視圖模式
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  
  // 獲取選中的內容
  const content = useMemo<PageContent>(() => {
    return selectedSample === 'quantum-horizons' 
      ? quantumHorizonsContent 
      : enterpriseShineContent;
  }, [selectedSample]);
  
  // 生成劇本
  const script = useMemo<PageScript>(() => {
    const config: ScriptConfig = { persona, goal, tone };
    return generateScript(config);
  }, [persona, goal, tone]);
  
  // 驗證視覺節奏
  const validation = useMemo(() => {
    return validateVisualRhythm(script);
  }, [script]);
  
  // 生成頁面代碼
  const pageCode = useMemo(() => {
    return generatePageCode(script, content);
  }, [script, content]);
  
  return (
    <div className="min-h-screen bg-background">
      {/* 頂部工具欄 */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">🎬 Page Builder</h1>
            <span className="text-sm text-muted-foreground">
              使用真實樣本內容測試排版
            </span>
          </div>
          
          {/* 視圖切換 */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            {(['preview', 'compare', 'code', 'script'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  viewMode === mode 
                    ? "bg-background shadow-sm" 
                    : "hover:bg-background/50"
                )}
              >
                {mode === 'preview' && '👁️ 預覽'}
                {mode === 'compare' && '⚖️ 對比'}
                {mode === 'code' && '💻 代碼'}
                {mode === 'script' && '📜 劇本'}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* 左側控制面板 */}
        <aside className="w-80 border-r border-border bg-card p-6 min-h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <div className="space-y-6">
            
            {/* 樣本選擇 */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <label className="block text-sm font-medium mb-3">📦 選擇樣本網站</label>
              <div className="space-y-2">
                {SAMPLE_OPTIONS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedSample(sample.id)}
                    className={cn(
                      "w-full p-3 rounded-lg border text-left transition-all",
                      selectedSample === sample.id
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-medium">{sample.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {sample.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 當前內容摘要 */}
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="text-sm font-medium mb-2">📋 內容摘要</h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Hero: {content.hero.title.substring(0, 30)}...</p>
                <p>• Features: {content.features?.features.length || 0} 項</p>
                <p>• FAQ: {content.faq?.items.length || 0} 項</p>
                <p>• CTA: {content.cta.title.substring(0, 25)}...</p>
              </div>
            </div>
            
            <hr className="border-border" />
            
            {/* 快速模板 */}
            <div>
              <label className="block text-sm font-medium mb-2">🚀 快速模板</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(SCRIPT_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPersona(template.persona);
                      setGoal(template.goal);
                      setTone(template.tone);
                    }}
                    className={cn(
                      "px-3 py-2 text-xs rounded-lg border transition-colors text-left",
                      persona === template.persona && 
                      goal === template.goal && 
                      tone === template.tone
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {key.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 受眾選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2">🎯 目標受眾</label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as Persona)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
              >
                <option value="executive">👔 急躁決策者</option>
                <option value="developer">💻 技術開發者</option>
                <option value="investor">💰 保守投資者</option>
                <option value="operator">⚙️ IT 營運者</option>
                <option value="general">👥 一般訪客</option>
              </select>
            </div>
            
            {/* 目標選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2">🎪 頁面目標</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as PageGoal)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
              >
                <option value="lead-gen">📧 收集潛客</option>
                <option value="signup">✍️ 註冊帳號</option>
                <option value="demo">🎥 預約演示</option>
                <option value="contact">📞 聯繫銷售</option>
                <option value="awareness">🌟 品牌認知</option>
              </select>
            </div>
            
            {/* 語調選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2">🎨 語調風格</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
              >
                <option value="professional">🏢 專業沉穩</option>
                <option value="urgent">⚡ 急迫感</option>
                <option value="technical">🔧 技術導向</option>
                <option value="friendly">😊 親切友好</option>
              </select>
            </div>
            
            {/* 驗證狀態 */}
            <div className={cn(
              "p-4 rounded-lg",
              validation.valid ? "bg-green-500/10" : "bg-yellow-500/10"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {validation.valid ? (
                  <>
                    <span>✅</span>
                    <span className="font-medium text-green-600">視覺節奏正常</span>
                  </>
                ) : (
                  <>
                    <span>⚠️</span>
                    <span className="font-medium text-yellow-600">有改善建議</span>
                  </>
                )}
              </div>
              {!validation.valid && (
                <ul className="text-xs text-muted-foreground space-y-1">
                  {validation.issues.map((issue, i) => (
                    <li key={i}>• {issue}</li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* 劇本摘要 */}
            <div className="p-4 rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2">📋 劇本摘要</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                {script.notes.map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        
        {/* 主要內容區 */}
        <main className="flex-1 p-6">
          {viewMode === 'preview' && (
            <PreviewPane script={script} content={content} />
          )}
          
          {viewMode === 'compare' && (
            <ComparePane content={content} />
          )}
          
          {viewMode === 'code' && (
            <CodePane code={pageCode} />
          )}
          
          {viewMode === 'script' && (
            <ScriptPane script={script} />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================
// 預覽面板
// ============================================================

interface PreviewPaneProps {
  script: PageScript;
  content: PageContent;
}

function PreviewPane({ script, content }: PreviewPaneProps) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      <div className="bg-muted px-4 py-2 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          {content.meta.title} - 重新排版預覽
        </span>
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        {composePage({ script, content })}
      </div>
    </div>
  );
}

// ============================================================
// 對比面板 - 顯示不同受眾的排版差異
// ============================================================

interface ComparePaneProps {
  content: PageContent;
}

function ComparePane({ content }: ComparePaneProps) {
  const personas: Persona[] = ['executive', 'developer', 'investor'];
  
  const scripts = personas.map(p => ({
    persona: p,
    script: generateScript({ persona: p, goal: 'lead-gen', tone: 'professional' }),
  }));
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">📊 排版對比：同樣內容，不同受眾</h2>
        <p className="text-muted-foreground">
          使用「{content.meta.title}」的完整內容，展示針對不同受眾的排版差異
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {scripts.map(({ persona, script }) => (
          <div key={persona} className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border">
              <div className="font-medium">
                {persona === 'executive' && '👔 決策者版'}
                {persona === 'developer' && '💻 開發者版'}
                {persona === 'investor' && '💰 投資者版'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                區塊順序：{script.sections.map(s => s.type).join(' → ')}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto text-sm">
              {/* 簡化版區塊列表 */}
              <div className="p-4 space-y-2">
                {script.sections.map((section, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border",
                      section.aida === 'attention' && "border-red-200 bg-red-50",
                      section.aida === 'interest' && "border-blue-200 bg-blue-50",
                      section.aida === 'desire' && "border-purple-200 bg-purple-50",
                      section.aida === 'action' && "border-green-200 bg-green-50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{section.type}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white">
                        {section.aida}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      bg: {section.background} | priority: {section.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 說明 */}
      <div className="p-6 rounded-xl bg-muted/30 border border-border">
        <h3 className="font-semibold mb-3">🔍 排版差異說明</h3>
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-medium text-red-600 mb-1">👔 決策者版</div>
            <p className="text-muted-foreground">
              優先展示數據和成效，快速帶到 CTA。減少技術細節，強調 ROI。
            </p>
          </div>
          <div>
            <div className="font-medium text-blue-600 mb-1">💻 開發者版</div>
            <p className="text-muted-foreground">
              功能和技術規格優先，FAQ 放在顯眼位置。展示 API 和整合能力。
            </p>
          </div>
          <div>
            <div className="font-medium text-purple-600 mb-1">💰 投資者版</div>
            <p className="text-muted-foreground">
              信任和見證優先，展示市場地位和客戶案例。強調穩定性和市場規模。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 代碼面板
// ============================================================

interface CodePaneProps {
  code: string;
}

function CodePane({ code }: CodePaneProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <span className="text-xs text-slate-400">page.tsx</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          {copied ? '✓ 已複製' : '📋 複製'}
        </button>
      </div>
      <pre className="p-4 bg-slate-900 text-slate-100 text-sm overflow-x-auto max-h-[calc(100vh-12rem)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ============================================================
// 劇本面板
// ============================================================

interface ScriptPaneProps {
  script: PageScript;
}

function ScriptPane({ script }: ScriptPaneProps) {
  return (
    <div className="space-y-6">
      {/* 配置卡片 */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold mb-4">🎯 劇本配置</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-muted-foreground">目標受眾</span>
            <p className="font-medium">{script.config.persona}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">頁面目標</span>
            <p className="font-medium">{script.config.goal}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">語調風格</span>
            <p className="font-medium">{script.config.tone}</p>
          </div>
        </div>
      </div>
      
      {/* 區塊序列 */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold mb-4">📦 區塊序列（AIDA 模型）</h3>
        <div className="space-y-3">
          {script.sections.map((section, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{section.type}</span>
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded",
                    section.aida === 'attention' && "bg-red-500/10 text-red-500",
                    section.aida === 'interest' && "bg-blue-500/10 text-blue-500",
                    section.aida === 'desire' && "bg-purple-500/10 text-purple-500",
                    section.aida === 'action' && "bg-green-500/10 text-green-500",
                  )}>
                    {section.aida.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span>bg: {section.background}</span>
                  <span>spacing: {section.spacing}</span>
                  <span>priority: {section.priority}/10</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">詞彙</div>
                <div className="text-xs">
                  {section.vocabulary.slice(0, 3).join(', ')}
                  {section.vocabulary.length > 3 && '...'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 建議筆記 */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold mb-4">💡 建議筆記</h3>
        <ul className="space-y-2">
          {script.notes.map((note, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
