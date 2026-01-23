/**
 * 主題預覽器 + AI 評審系統
 * 
 * 管理後台專用頁面，用於預覽、選擇主題，並進行 AI 品質驗收
 */

import { useState } from 'react';
import { themes, type ThemeConfig } from '@/styles/themes';
import { ThemePreviewCard } from '@/lib/theme-provider';
import { 
  conductDesignReview, 
  type DesignSubmission, 
  type DesignReviewResult 
} from '@/lib/design-review';
import { DesignReviewPanel } from '@/components/admin/DesignReviewPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  Palette, 
  Eye, 
  Sparkles,
  Send,
  Settings2,
} from 'lucide-react';

// ============================================================
// 類型定義
// ============================================================

type HeroVariant = 'center' | 'split' | 'gradient';
type FeaturesVariant = 'grid' | 'bento' | 'alternating';

// ============================================================
// Mock 資料
// ============================================================

const mockHeroData = {
  badge: '🚀 全新上線',
  title: '企業級 AI 算力解決方案',
  subtitle: '為您的 AI 工作負載提供頂級效能',
  description: '從訓練到推理，我們提供完整的 GPU 算力服務，助力企業 AI 轉型。',
  stats: [
    { value: '10,000+', label: 'GPU 節點' },
    { value: '99.99%', label: '可用性' },
    { value: '50+', label: '全球機房' },
  ],
};

const mockFeatures = [
  { id: '1', title: '高效能運算', description: '最新 NVIDIA H100 GPU，提供業界領先的 AI 訓練效能。' },
  { id: '2', title: '彈性擴展', description: '根據需求即時擴展或縮減算力，只為使用付費。' },
  { id: '3', title: '安全合規', description: '符合 ISO 27001、SOC 2 等國際安全標準。' },
];

// ============================================================
// 主組件
// ============================================================

export default function ThemePreview() {
  // 主題選擇
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(themes[0]);
  
  // 區塊選擇
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('gradient');
  const [featuresVariant, setFeaturesVariant] = useState<FeaturesVariant>('bento');
  
  // 客戶資訊
  const [clientBrief, setClientBrief] = useState({
    companyName: 'TechCorp AI',
    companyType: 'AI 伺服器製造商',
    targetAudience: '企業 IT 採購主管、數據中心負責人',
    brandKeywords: ['可靠', '高效能', '創新'],
    competitors: ['Supermicro', 'Dell', 'HPE'],
  });
  
  // 評審狀態
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<DesignReviewResult | null>(null);
  
  // 分類主題
  const lightThemes = themes.filter(t => t.mode === 'light');
  const darkThemes = themes.filter(t => t.mode === 'dark');

  // 提交評審
  const handleSubmitReview = async () => {
    setIsReviewing(true);
    setReviewResult(null);
    
    const submission: DesignSubmission = {
      themeId: selectedTheme.id,
      themeConfig: selectedTheme,
      blocks: {
        hero: heroVariant,
        features: featuresVariant,
      },
      clientBrief,
    };
    
    try {
      const result = await conductDesignReview(submission);
      setReviewResult(result);
    } catch (error) {
      console.error('評審失敗:', error);
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* 頁首 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary" />
              主題系統 + AI 評審
            </h1>
            <p className="text-muted-foreground">
              選擇視覺風格，讓 AI 三重評審把關品質
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleSubmitReview}
            disabled={isReviewing}
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            {isReviewing ? '評審中...' : '提交 AI 評審'}
          </Button>
        </div>

        <div className="grid xl:grid-cols-12 gap-8">
          {/* 左側：主題 + 區塊選擇器 */}
          <div className="xl:col-span-4 space-y-6">
            {/* 主題選擇 */}
            <div className="rounded-xl border bg-card p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                選擇主題
              </h2>
              
              <Tabs defaultValue="dark" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="light" className="gap-2">
                    <Sun className="h-4 w-4" />
                    Light
                  </TabsTrigger>
                  <TabsTrigger value="dark" className="gap-2">
                    <Moon className="h-4 w-4" />
                    Dark
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="light" className="space-y-3">
                  {lightThemes.map(theme => (
                    <ThemePreviewCard
                      key={theme.id}
                      themeConfig={theme}
                      isSelected={selectedTheme.id === theme.id}
                      onSelect={() => setSelectedTheme(theme)}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="dark" className="space-y-3">
                  {darkThemes.map(theme => (
                    <ThemePreviewCard
                      key={theme.id}
                      themeConfig={theme}
                      isSelected={selectedTheme.id === theme.id}
                      onSelect={() => setSelectedTheme(theme)}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* 區塊選擇 */}
            <div className="rounded-xl border bg-card p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                區塊組合
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Hero 區塊</Label>
                  <Select value={heroVariant} onValueChange={(v: HeroVariant) => setHeroVariant(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">置中標題型</SelectItem>
                      <SelectItem value="split">左文右圖型</SelectItem>
                      <SelectItem value="gradient">漸層背景型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Features 區塊</Label>
                  <Select value={featuresVariant} onValueChange={(v: FeaturesVariant) => setFeaturesVariant(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">網格佈局</SelectItem>
                      <SelectItem value="bento">Bento Grid</SelectItem>
                      <SelectItem value="alternating">左右交錯</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* 客戶資訊 */}
            <div className="rounded-xl border bg-card p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Send className="h-4 w-4" />
                客戶需求摘要
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>公司名稱</Label>
                  <Input 
                    value={clientBrief.companyName}
                    onChange={e => setClientBrief({...clientBrief, companyName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>公司類型</Label>
                  <Input 
                    value={clientBrief.companyType}
                    onChange={e => setClientBrief({...clientBrief, companyType: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>目標受眾</Label>
                  <Input 
                    value={clientBrief.targetAudience}
                    onChange={e => setClientBrief({...clientBrief, targetAudience: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>品牌關鍵詞</Label>
                  <div className="flex flex-wrap gap-2">
                    {clientBrief.brandKeywords.map((keyword, i) => (
                      <Badge key={i} variant="secondary">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 中間：即時預覽 */}
          <div className="xl:col-span-5">
            <div className="sticky top-24">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                即時預覽
              </h2>
              
              <div 
                className="rounded-xl border overflow-hidden shadow-lg"
                style={{
                  ...Object.fromEntries(
                    Object.entries(selectedTheme.colors).map(([key, value]) => [
                      `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
                      value
                    ])
                  ),
                  '--radius': selectedTheme.style.borderRadius === 'sharp' ? '0.25rem' 
                    : selectedTheme.style.borderRadius === 'soft' ? '0.75rem' : '0.5rem',
                } as React.CSSProperties}
              >
                {/* 瀏覽器框 */}
                <div className="h-8 bg-muted/50 border-b flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-4">
                    <div className="h-4 bg-background/50 rounded text-xs flex items-center justify-center text-muted-foreground">
                      {clientBrief.companyName.toLowerCase().replace(/\s/g, '')}.com
                    </div>
                  </div>
                </div>

                {/* 預覽內容 */}
                <div 
                  className="overflow-y-auto"
                  style={{
                    height: '65vh',
                    backgroundColor: `hsl(${selectedTheme.colors.background})`,
                    color: `hsl(${selectedTheme.colors.foreground})`,
                  }}
                >
                  {/* Navbar */}
                  <nav 
                    className="h-14 border-b flex items-center justify-between px-4"
                    style={{ borderColor: `hsl(${selectedTheme.colors.border})` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-bold" style={{ color: `hsl(${selectedTheme.colors.primary})` }}>
                        {clientBrief.companyName}
                      </div>
                      <div className="hidden md:flex items-center gap-3 text-xs">
                        {['產品', '解決方案', '定價'].map(item => (
                          <span key={item} style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `hsl(${selectedTheme.colors.primary})`,
                        color: `hsl(${selectedTheme.colors.primaryForeground})`,
                      }}
                    >
                      開始使用
                    </button>
                  </nav>

                  {/* Hero */}
                  <div 
                    className={`py-12 px-4 relative overflow-hidden ${
                      heroVariant === 'center' ? 'text-center' : ''
                    }`}
                  >
                    {/* 背景效果 */}
                    {heroVariant === 'gradient' && (
                      <>
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(${selectedTheme.colors.primary} / 0.15), transparent)`
                          }}
                        />
                        <div 
                          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl opacity-30"
                          style={{ backgroundColor: `hsl(${selectedTheme.colors.primary})` }}
                        />
                      </>
                    )}
                    
                    <div className={`relative ${heroVariant === 'split' ? 'grid grid-cols-2 gap-4 items-center' : ''}`}>
                      <div className={heroVariant === 'center' ? 'max-w-xl mx-auto' : ''}>
                        <span 
                          className="inline-block px-2 py-0.5 text-[10px] rounded-full mb-3"
                          style={{ 
                            backgroundColor: `hsl(${selectedTheme.colors.primary} / 0.1)`,
                            color: `hsl(${selectedTheme.colors.primary})`,
                          }}
                        >
                          {mockHeroData.badge}
                        </span>
                        
                        <h1 className="text-xl md:text-2xl font-bold mb-2">
                          {mockHeroData.title}
                        </h1>
                        
                        <p 
                          className="text-sm mb-4"
                          style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                        >
                          {mockHeroData.subtitle}
                        </p>
                        
                        <div className={`flex gap-2 ${heroVariant === 'center' ? 'justify-center' : ''}`}>
                          <button
                            className="px-4 py-2 rounded text-xs font-medium flex items-center gap-1"
                            style={{
                              backgroundColor: `hsl(${selectedTheme.colors.primary})`,
                              color: `hsl(${selectedTheme.colors.primaryForeground})`,
                            }}
                          >
                            免費試用
                            <ArrowRight className="h-3 w-3" />
                          </button>
                          <button
                            className="px-4 py-2 rounded text-xs font-medium"
                            style={{
                              border: `1px solid hsl(${selectedTheme.colors.border})`,
                            }}
                          >
                            了解更多
                          </button>
                        </div>
                      </div>
                      
                      {heroVariant === 'split' && (
                        <div 
                          className="aspect-video rounded-lg"
                          style={{ 
                            backgroundColor: `hsl(${selectedTheme.colors.muted})`,
                            border: `1px solid hsl(${selectedTheme.colors.border})`,
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className={`flex gap-6 mt-8 ${heroVariant === 'center' ? 'justify-center' : ''}`}>
                      {mockHeroData.stats.map((stat, i) => (
                        <div key={i} className={heroVariant === 'center' ? 'text-center' : ''}>
                          <div 
                            className="text-lg font-bold"
                            style={{ color: `hsl(${selectedTheme.colors.primary})` }}
                          >
                            {stat.value}
                          </div>
                          <div 
                            className="text-[10px]"
                            style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div 
                    className="py-8 px-4"
                    style={{ backgroundColor: `hsl(${selectedTheme.colors.muted})` }}
                  >
                    <h2 className="text-lg font-bold text-center mb-6">核心優勢</h2>
                    
                    <div className={`
                      ${featuresVariant === 'grid' ? 'grid grid-cols-3 gap-3' : ''}
                      ${featuresVariant === 'bento' ? 'grid grid-cols-4 gap-3' : ''}
                      ${featuresVariant === 'alternating' ? 'space-y-4' : ''}
                    `}>
                      {mockFeatures.map((feature, i) => {
                        const isBentoLarge = featuresVariant === 'bento' && i === 0;
                        
                        return (
                          <div
                            key={feature.id}
                            className={`
                              p-4 rounded-lg
                              ${isBentoLarge ? 'col-span-2 row-span-2' : ''}
                              ${featuresVariant === 'bento' && i > 0 ? 'col-span-2' : ''}
                              ${featuresVariant === 'alternating' ? 'flex gap-4 items-center' : ''}
                            `}
                            style={{
                              backgroundColor: `hsl(${selectedTheme.colors.card})`,
                              border: `1px solid hsl(${selectedTheme.colors.border})`,
                            }}
                          >
                            {featuresVariant === 'alternating' && i % 2 === 1 && (
                              <div 
                                className="w-24 h-16 rounded shrink-0"
                                style={{ backgroundColor: `hsl(${selectedTheme.colors.muted})` }}
                              />
                            )}
                            
                            <div>
                              <div 
                                className={`rounded flex items-center justify-center mb-2 ${isBentoLarge ? 'w-10 h-10' : 'w-8 h-8'}`}
                                style={{ backgroundColor: `hsl(${selectedTheme.colors.primary} / 0.1)` }}
                              >
                                <Eye 
                                  className={isBentoLarge ? 'h-5 w-5' : 'h-4 w-4'}
                                  style={{ color: `hsl(${selectedTheme.colors.primary})` }} 
                                />
                              </div>
                              <h3 className={`font-semibold mb-1 ${isBentoLarge ? 'text-base' : 'text-sm'}`}>
                                {feature.title}
                              </h3>
                              <p 
                                className={isBentoLarge ? 'text-xs' : 'text-[10px]'}
                                style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                              >
                                {feature.description}
                              </p>
                            </div>
                            
                            {featuresVariant === 'alternating' && i % 2 === 0 && (
                              <div 
                                className="w-24 h-16 rounded shrink-0 ml-auto"
                                style={{ backgroundColor: `hsl(${selectedTheme.colors.muted})` }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 當前配置摘要 */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{selectedTheme.nameZh}</Badge>
                <Badge variant="outline">Hero: {heroVariant}</Badge>
                <Badge variant="outline">Features: {featuresVariant}</Badge>
              </div>
            </div>
          </div>

          {/* 右側：AI 評審結果 */}
          <div className="xl:col-span-3">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI 三重評審
            </h2>
            
            <DesignReviewPanel
              result={reviewResult}
              isLoading={isReviewing}
              onResubmit={handleSubmitReview}
              onApprove={() => {
                alert('設計已核准！可以開始為客戶建置網站。');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
