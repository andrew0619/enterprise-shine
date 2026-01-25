/**
 * 📄 Page Builder - 頁面生成器（視覺化版本）
 * 
 * 使用真實樣本內容進行排版測試
 * 展示不同受眾的區塊順序和視覺差異
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
import { cn } from '@/lib/utils';

// 樣本內容
import { 
  SAMPLE_OPTIONS,
  getSampleContent,
  getContentStats,
  type SampleId,
} from '@/lib/sample-content';

// ============================================================
// 類型定義
// ============================================================

type ViewMode = 'live' | 'compare' | 'blocks' | 'code';

// ============================================================
// 主組件
// ============================================================

export default function PageBuilder() {
  // 樣本選擇
  const [selectedSample, setSelectedSample] = useState<SampleId>('quantum-horizons');
  
  // 劇本配置
  const [persona, setPersona] = useState<Persona>('executive');
  const [goal, setGoal] = useState<PageGoal>('lead-gen');
  const [tone, setTone] = useState<Tone>('professional');
  
  // 視圖模式
  const [viewMode, setViewMode] = useState<ViewMode>('live');
  
  // 獲取選中的內容
  const content = useMemo(() => getSampleContent(selectedSample), [selectedSample]);
  const contentStats = useMemo(() => getContentStats(selectedSample), [selectedSample]);
  
  // 生成劇本
  const script = useMemo<PageScript>(() => {
    const config: ScriptConfig = { persona, goal, tone };
    return generateScript(config);
  }, [persona, goal, tone]);
  
  // 驗證視覺節奏
  const validation = useMemo(() => validateVisualRhythm(script), [script]);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* 頂部工具欄 */}
      <header className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
        <div className="flex items-center justify-between h-14 px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold">🎬 NDMD Page Builder</h1>
            <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">
              v2.0 - 完整內容測試
            </span>
          </div>
          
          {/* 視圖切換 */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            {(['live', 'compare', 'blocks', 'code'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded text-sm font-medium transition-colors",
                  viewMode === mode 
                    ? "bg-indigo-600 text-white" 
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                )}
              >
                {mode === 'live' && '🖥️ 即時預覽'}
                {mode === 'compare' && '⚖️ 三版對比'}
                {mode === 'blocks' && '🧱 區塊檢視'}
                {mode === 'code' && '💻 代碼'}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* 左側控制面板 */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/50 p-4 min-h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
          <div className="space-y-5">
            
            {/* 樣本選擇 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20">
              <label className="block text-sm font-medium mb-3 text-indigo-300">📦 選擇樣本網站</label>
              <div className="space-y-2">
                {SAMPLE_OPTIONS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedSample(sample.id)}
                    className={cn(
                      "w-full p-3 rounded-lg border text-left transition-all",
                      selectedSample === sample.id
                        ? "border-indigo-500 bg-indigo-500/20 ring-1 ring-indigo-500/50"
                        : "border-slate-700 hover:border-indigo-500/50 bg-slate-800/50"
                    )}
                  >
                    <div className="font-medium text-sm">{sample.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {sample.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 內容統計 */}
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <h3 className="text-sm font-medium mb-3 text-slate-300">📊 內容統計</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(contentStats).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 px-2 bg-slate-700/50 rounded">
                    <span className="text-slate-400">{key}</span>
                    <span className="text-white font-medium">
                      {typeof value === 'string' ? value.substring(0, 15) + '...' : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 快速模板 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">🚀 快速模板</label>
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
                      "px-2 py-1.5 text-xs rounded-lg border transition-colors text-left",
                      persona === template.persona && 
                      goal === template.goal && 
                      tone === template.tone
                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                        : "border-slate-700 hover:border-cyan-500/50 text-slate-400"
                    )}
                  >
                    {key.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 受眾選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">🎯 目標受眾</label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as Persona)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white text-sm"
              >
                <option value="executive">👔 急躁決策者 - 看結論</option>
                <option value="developer">💻 技術開發者 - 看細節</option>
                <option value="investor">💰 保守投資者 - 看數據</option>
                <option value="operator">⚙️ IT 營運者 - 看穩定性</option>
                <option value="general">👥 一般訪客 - 均衡展示</option>
              </select>
            </div>
            
            {/* 目標選擇 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">🎪 頁面目標</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as PageGoal)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white text-sm"
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
              <label className="block text-sm font-medium mb-2 text-slate-300">🎨 語調風格</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white text-sm"
              >
                <option value="professional">🏢 專業沉穩</option>
                <option value="urgent">⚡ 急迫感</option>
                <option value="technical">🔧 技術導向</option>
                <option value="friendly">😊 親切友好</option>
              </select>
            </div>
            
            {/* 驗證狀態 */}
            <div className={cn(
              "p-3 rounded-lg text-sm",
              validation.valid 
                ? "bg-emerald-500/10 border border-emerald-500/30" 
                : "bg-amber-500/10 border border-amber-500/30"
            )}>
              <div className="flex items-center gap-2 mb-1">
                {validation.valid ? (
                  <>
                    <span>✅</span>
                    <span className="font-medium text-emerald-400">視覺節奏正常</span>
                  </>
                ) : (
                  <>
                    <span>⚠️</span>
                    <span className="font-medium text-amber-400">有改善建議</span>
                  </>
                )}
              </div>
              {!validation.valid && (
                <ul className="text-xs text-slate-400 space-y-0.5 mt-2">
                  {validation.issues.map((issue, i) => (
                    <li key={i}>• {issue}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
        
        {/* 主要內容區 */}
        <main className="flex-1 p-6 bg-slate-950">
          {viewMode === 'live' && (
            <LivePreview 
              script={script} 
              content={content} 
              sampleId={selectedSample}
            />
          )}
          
          {viewMode === 'compare' && (
            <CompareView 
              content={content} 
              sampleId={selectedSample}
            />
          )}
          
          {viewMode === 'blocks' && (
            <BlocksView 
              script={script} 
              content={content}
            />
          )}
          
          {viewMode === 'code' && (
            <CodeView script={script} />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================
// 即時預覽 - 顯示真實的頁面排版
// ============================================================

interface LivePreviewProps {
  script: PageScript;
  content: ReturnType<typeof getSampleContent>;
  sampleId: SampleId;
}

function LivePreview({ script, content, sampleId }: LivePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          🖥️ {sampleId === 'quantum-horizons' ? 'Quantum Horizons' : 'NexusAI'} - 重新排版預覽
        </h2>
        <div className="text-sm text-slate-400">
          {script.sections.length} 個區塊 | {script.config.persona} 視角
        </div>
      </div>
      
      {/* 模擬瀏覽器窗口 */}
      <div className="rounded-xl overflow-hidden border border-slate-700 bg-white">
        {/* 瀏覽器頂欄 */}
        <div className="bg-slate-800 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 px-3 py-1 rounded bg-slate-700 text-xs text-slate-400">
            {sampleId === 'quantum-horizons' 
              ? 'https://futurequantum.io'
              : 'https://nexusai.cloud'
            }
          </div>
        </div>
        
        {/* 頁面內容 */}
        <div className="max-h-[70vh] overflow-y-auto">
          {script.sections.map((section, index) => (
            <RenderSection 
              key={`${section.type}-${index}`}
              section={section}
              content={content}
              sampleId={sampleId}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 渲染單個區塊（使用真實內容）
// ============================================================

interface RenderSectionProps {
  section: PageScript['sections'][0];
  content: ReturnType<typeof getSampleContent>;
  sampleId: SampleId;
  index: number;
}

function RenderSection({ section, content, sampleId, index }: RenderSectionProps) {
  const bgClasses: Record<string, string> = {
    transparent: 'bg-white',
    muted: 'bg-slate-50',
    glass: 'bg-gradient-to-br from-slate-50 to-blue-50',
    dark: 'bg-slate-900 text-white',
  };
  
  const spacingClasses: Record<string, string> = {
    compact: 'py-8',
    default: 'py-12',
    relaxed: 'py-16',
  };
  
  // 根據區塊類型渲染真實內容
  const renderContent = () => {
    const isQuantum = sampleId === 'quantum-horizons';
    
    switch (section.type) {
      case 'hero':
        return (
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full mb-4">
              {isQuantum ? content.hero.badge : 'GPU Cloud'}
            </span>
            <h1 className={cn(
              "text-3xl md:text-5xl font-bold mb-4",
              section.background === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
              {content.hero.title}
            </h1>
            <p className={cn(
              "text-lg mb-6 max-w-2xl mx-auto",
              section.background === 'dark' ? 'text-slate-300' : 'text-slate-600'
            )}>
              {content.hero.subtitle}
            </p>
            <div className="flex gap-3 justify-center">
              <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm">
                {content.hero.primaryCta.text} →
              </button>
              <button className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium text-sm">
                {content.hero.secondaryCta?.text || 'Learn More'}
              </button>
            </div>
          </div>
        );
      
      case 'trust':
        return (
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-6">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center gap-8">
              {(isQuantum ? [] : content.partnerLogos || []).slice(0, 6).map((logo: any, i: number) => (
                <div key={i} className="text-2xl opacity-60">
                  {logo.icon || logo.name}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'stats':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className={cn(
                  "text-3xl font-bold",
                  section.background === 'dark' ? 'text-cyan-400' : 'text-indigo-600'
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm mt-1",
                  section.background === 'dark' ? 'text-slate-400' : 'text-slate-500'
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'features':
        const features = isQuantum ? content.coreServices : [
          { title: 'Inference Engine', description: content.inferenceEngine?.description1 || '' },
          { title: 'Cluster Engine', description: content.clusterEngine?.description || '' },
          { title: 'GPU Compute', description: content.gpuCompute?.description || '' },
        ];
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className={cn(
                "text-2xl font-bold",
                section.background === 'dark' ? 'text-white' : 'text-slate-900'
              )}>
                {isQuantum ? 'Our Core Services' : 'The Foundation for Your AI Success'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.slice(0, 3).map((feature: any, i: number) => (
                <div key={i} className={cn(
                  "p-5 rounded-xl border",
                  section.background === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white border-slate-200 shadow-sm'
                )}>
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
                    <span className="text-indigo-600">⚡</span>
                  </div>
                  <h3 className={cn(
                    "font-semibold mb-2",
                    section.background === 'dark' ? 'text-white' : 'text-slate-900'
                  )}>
                    {feature.title}
                  </h3>
                  <p className={cn(
                    "text-sm line-clamp-3",
                    section.background === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  )}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'testimonials':
        const testimonial = isQuantum 
          ? { quote: content.about?.journey?.subtitle || '', author: 'Enterprise Client', company: 'Tech Corp' }
          : content.caseStudy;
        return (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={cn(
              "text-2xl font-bold mb-6",
              section.background === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
              {isQuantum ? 'What Our Clients Say' : 'Proven Results'}
            </h2>
            <blockquote className={cn(
              "text-xl italic mb-4",
              section.background === 'dark' ? 'text-slate-300' : 'text-slate-700'
            )}>
              "{testimonial?.quote || testimonial?.subtitle || 'Great service!'}"
            </blockquote>
            <div className={cn(
              "text-sm",
              section.background === 'dark' ? 'text-slate-400' : 'text-slate-500'
            )}>
              — {testimonial?.author || 'Customer'}, {testimonial?.company || 'Company'}
            </div>
          </div>
        );
      
      case 'faq':
        const faqItems = content.faq?.slice(0, 3) || [];
        return (
          <div className="max-w-3xl mx-auto">
            <h2 className={cn(
              "text-2xl font-bold text-center mb-8",
              section.background === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqItems.map((item: any, i: number) => (
                <div key={i} className={cn(
                  "p-4 rounded-lg border",
                  section.background === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white border-slate-200'
                )}>
                  <h3 className={cn(
                    "font-medium",
                    section.background === 'dark' ? 'text-white' : 'text-slate-900'
                  )}>
                    {item.question}
                  </h3>
                  <p className={cn(
                    "text-sm mt-2 line-clamp-2",
                    section.background === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  )}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'cta':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-3",
              section.background === 'dark' ? 'text-white' : 'text-slate-900'
            )}>
              {content.cta.title}
            </h2>
            <p className={cn(
              "mb-6",
              section.background === 'dark' ? 'text-slate-300' : 'text-slate-600'
            )}>
              {content.cta.subtitle}
            </p>
            <div className="flex gap-3 justify-center">
              <button className={cn(
                "px-6 py-2.5 rounded-lg font-medium",
                section.background === 'dark'
                  ? 'bg-white text-slate-900'
                  : 'bg-indigo-600 text-white'
              )}>
                {content.cta.primaryCta.text} →
              </button>
            </div>
          </div>
        );
      
      case 'case-study':
        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={cn(
                "text-2xl font-bold mb-4",
                section.background === 'dark' ? 'text-white' : 'text-slate-900'
              )}>
                {isQuantum ? content.globalInfrastructure?.title : 'Proven Results'}
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {(isQuantum ? content.stats : content.caseStudy?.stats || []).slice(0, 4).map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-xl h-48 flex items-center justify-center">
              <span className="text-4xl">🌐</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <span className="text-slate-400">[{section.type} 區塊]</span>
          </div>
        );
    }
  };
  
  return (
    <section className={cn(
      bgClasses[section.background],
      spacingClasses[section.spacing],
      'px-6 transition-all'
    )}>
      <div className="max-w-5xl mx-auto relative">
        {/* 區塊標籤 */}
        <div className="absolute -left-2 top-0 flex items-center gap-2">
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded font-medium",
            section.aida === 'attention' && "bg-red-100 text-red-700",
            section.aida === 'interest' && "bg-blue-100 text-blue-700",
            section.aida === 'desire' && "bg-purple-100 text-purple-700",
            section.aida === 'action' && "bg-green-100 text-green-700",
          )}>
            {section.aida.toUpperCase()}
          </span>
          <span className="text-[10px] text-slate-400">
            #{index + 1} {section.type}
          </span>
        </div>
        
        {renderContent()}
      </div>
    </section>
  );
}

// ============================================================
// 三版對比視圖
// ============================================================

interface CompareViewProps {
  content: ReturnType<typeof getSampleContent>;
  sampleId: SampleId;
}

function CompareView({ content, sampleId }: CompareViewProps) {
  const personas: Persona[] = ['executive', 'developer', 'investor'];
  
  const scripts = personas.map(p => ({
    persona: p,
    script: generateScript({ persona: p, goal: 'lead-gen', tone: 'professional' }),
  }));
  
  const personaInfo: Record<Persona, { icon: string; name: string; focus: string; color: string }> = {
    executive: { icon: '👔', name: '決策者', focus: '數據 → CTA', color: 'border-red-500' },
    developer: { icon: '💻', name: '開發者', focus: '功能 → FAQ', color: 'border-blue-500' },
    investor: { icon: '💰', name: '投資者', focus: '信任 → 見證', color: 'border-purple-500' },
    operator: { icon: '⚙️', name: '營運者', focus: '穩定 → 價格', color: 'border-green-500' },
    general: { icon: '👥', name: '一般', focus: '均衡展示', color: 'border-slate-500' },
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">⚖️ 同樣內容，三種排版</h2>
        <p className="text-slate-400">
          使用 {sampleId === 'quantum-horizons' ? 'Quantum Horizons' : 'NexusAI'} 的完整內容，
          展示針對不同受眾的區塊排序差異
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {scripts.map(({ persona, script }) => {
          const info = personaInfo[persona];
          return (
            <div 
              key={persona} 
              className={cn(
                "rounded-xl border-2 overflow-hidden bg-slate-900",
                info.color
              )}
            >
              {/* 標題欄 */}
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{info.icon}</span>
                  <div>
                    <div className="font-semibold">{info.name}版</div>
                    <div className="text-xs text-slate-400">{info.focus}</div>
                  </div>
                </div>
              </div>
              
              {/* 區塊序列 */}
              <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto">
                {script.sections.map((section, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border text-sm",
                      section.background === 'dark' 
                        ? 'bg-slate-800 border-slate-600' 
                        : 'bg-slate-700/50 border-slate-600'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">{section.type}</span>
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded",
                        section.aida === 'attention' && "bg-red-500/20 text-red-400",
                        section.aida === 'interest' && "bg-blue-500/20 text-blue-400",
                        section.aida === 'desire' && "bg-purple-500/20 text-purple-400",
                        section.aida === 'action' && "bg-green-500/20 text-green-400",
                      )}>
                        {section.aida}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded",
                        section.background === 'dark' ? 'bg-slate-600' : 'bg-slate-500/30'
                      )}>
                        {section.background}
                      </span>
                      <span>⬆️ {section.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 說明卡片 */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="font-medium text-red-400 mb-1">👔 決策者版</div>
          <p className="text-xs text-slate-400">
            優先展示數據和成效，快速帶到 CTA。
            跳過技術細節，強調 ROI 和市場地位。
          </p>
        </div>
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="font-medium text-blue-400 mb-1">💻 開發者版</div>
          <p className="text-xs text-slate-400">
            功能和技術規格優先，FAQ 放在顯眼位置。
            展示 API 能力和技術支援。
          </p>
        </div>
        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="font-medium text-purple-400 mb-1">💰 投資者版</div>
          <p className="text-xs text-slate-400">
            信任和見證優先，展示市場地位和客戶案例。
            強調穩定性、合規和市場規模。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 區塊檢視
// ============================================================

interface BlocksViewProps {
  script: PageScript;
  content: ReturnType<typeof getSampleContent>;
}

function BlocksView({ script, content }: BlocksViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">🧱 區塊詳細檢視</h2>
        <div className="text-sm text-slate-400">
          {script.sections.length} 個區塊 | AIDA 模型排序
        </div>
      </div>
      
      {/* AIDA 階段說明 */}
      <div className="flex gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs text-slate-300">Attention 引起注意</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-xs text-slate-300">Interest 產生興趣</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="text-xs text-slate-300">Desire 激發慾望</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-slate-300">Action 採取行動</span>
        </div>
      </div>
      
      {/* 區塊列表 */}
      <div className="space-y-3">
        {script.sections.map((section, index) => (
          <div 
            key={index}
            className={cn(
              "p-4 rounded-xl border-l-4 bg-slate-800/50",
              section.aida === 'attention' && "border-red-500",
              section.aida === 'interest' && "border-blue-500",
              section.aida === 'desire' && "border-purple-500",
              section.aida === 'action' && "border-green-500",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div>
                  <div className="font-semibold text-white">{section.type}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    詞彙: {section.vocabulary.join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  section.background === 'dark' 
                    ? 'bg-slate-700 text-slate-300' 
                    : 'bg-slate-600 text-slate-200'
                )}>
                  {section.background}
                </div>
                <div className="text-xs text-slate-400">
                  {section.spacing}
                </div>
                <div className="text-xs text-yellow-400">
                  優先級: {section.priority}/10
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 劇本筆記 */}
      <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
        <h3 className="font-medium text-indigo-300 mb-2">💡 AI 建議</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          {script.notes.map((note, i) => (
            <li key={i}>• {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================================
// 代碼視圖
// ============================================================

interface CodeViewProps {
  script: PageScript;
}

function CodeView({ script }: CodeViewProps) {
  const [copied, setCopied] = useState(false);
  
  const code = `import { PageLayout, Section } from '@/components/blocks/layout';
import { 
  PageHeader, 
  CTABlock, 
  FeaturePoint, 
  StatPoint, 
  Testimonial 
} from '@/components/blocks/vocabulary';

/**
 * Generated Page for: ${script.config.persona}
 * Goal: ${script.config.goal}
 * Tone: ${script.config.tone}
 */
export default function GeneratedPage() {
  return (
    <PageLayout theme="dark-cyan">
${script.sections.map((s, i) => `      {/* ${i + 1}. ${s.type.toUpperCase()} - ${s.aida} */}
      <Section
        id="${s.type}"
        background="${s.background}"
        spacing="${s.spacing}"
      >
        {/* Vocabulary: ${s.vocabulary.join(', ')} */}
        {/* Priority: ${s.priority}/10 */}
      </Section>`).join('\n\n')}
    </PageLayout>
  );
}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">💻 生成的代碼</h2>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          {copied ? '✓ 已複製' : '📋 複製代碼'}
        </button>
      </div>
      
      <div className="rounded-xl overflow-hidden border border-slate-700">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <span className="text-xs text-slate-400">page.tsx</span>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{script.sections.length} sections</span>
            <span>•</span>
            <span>{script.config.persona}</span>
          </div>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-100 text-sm overflow-x-auto max-h-[65vh] overflow-y-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
