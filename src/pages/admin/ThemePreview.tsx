/**
 * 主題預覽器
 * 
 * 管理後台專用頁面，用於預覽和選擇主題
 */

import { useState } from 'react';
import { themes, type ThemeConfig, generateCSSVariables } from '@/styles/themes';
import { ThemePreviewCard } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Sun, Moon, Palette, Eye, Copy, Check } from 'lucide-react';

// Hero 預覽用的模擬資料
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

// Feature 預覽用的模擬資料
const mockFeatures = [
  {
    id: '1',
    title: '高效能運算',
    description: '最新 NVIDIA H100 GPU，提供業界領先的 AI 訓練效能。',
  },
  {
    id: '2',
    title: '彈性擴展',
    description: '根據需求即時擴展或縮減算力，只為使用付費。',
  },
  {
    id: '3',
    title: '安全合規',
    description: '符合 ISO 27001、SOC 2 等國際安全標準。',
  },
];

export default function ThemePreview() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(themes[0]);
  const [copied, setCopied] = useState(false);

  const lightThemes = themes.filter(t => t.mode === 'light');
  const darkThemes = themes.filter(t => t.mode === 'dark');

  // 複製 CSS 變數
  const copyCSSVariables = () => {
    const css = generateCSSVariables(selectedTheme);
    navigator.clipboard.writeText(`:root {\n  ${css}\n}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        {/* 頁首 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎨 主題系統</h1>
            <p className="text-muted-foreground">
              選擇適合您客戶的視覺風格
            </p>
          </div>
          <Button onClick={copyCSSVariables} variant="outline">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                已複製
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                複製 CSS 變數
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左側：主題選擇器 */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="light" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light" className="gap-2">
                  <Sun className="h-4 w-4" />
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark" className="gap-2">
                  <Moon className="h-4 w-4" />
                  Dark
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="light" className="space-y-4 mt-4">
                {lightThemes.map(theme => (
                  <ThemePreviewCard
                    key={theme.id}
                    themeConfig={theme}
                    isSelected={selectedTheme.id === theme.id}
                    onSelect={() => setSelectedTheme(theme)}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="dark" className="space-y-4 mt-4">
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

            {/* 主題資訊 */}
            <div className="p-4 rounded-xl border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {selectedTheme.nameZh}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedTheme.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">模式</span>
                  <Badge variant="outline">{selectedTheme.mode}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">圓角</span>
                  <Badge variant="outline">{selectedTheme.style.borderRadius}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">陰影</span>
                  <Badge variant="outline">{selectedTheme.style.shadowIntensity}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">動效</span>
                  <Badge variant="outline">{selectedTheme.style.animationLevel}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：即時預覽 */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-xl border overflow-hidden"
              style={{
                // 注入選中主題的 CSS 變數
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
              {/* 模擬瀏覽器框 */}
              <div className="h-8 bg-muted/50 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-background/50 rounded text-xs flex items-center justify-center text-muted-foreground">
                    preview.example.com
                  </div>
                </div>
              </div>

              {/* 預覽內容 */}
              <div 
                className="overflow-y-auto"
                style={{
                  height: '70vh',
                  backgroundColor: `hsl(${selectedTheme.colors.background})`,
                  color: `hsl(${selectedTheme.colors.foreground})`,
                }}
              >
                {/* 模擬 Navbar */}
                <nav 
                  className="h-16 border-b flex items-center justify-between px-6"
                  style={{ borderColor: `hsl(${selectedTheme.colors.border})` }}
                >
                  <div className="flex items-center gap-6">
                    <div 
                      className="font-bold text-lg"
                      style={{ color: `hsl(${selectedTheme.colors.primary})` }}
                    >
                      TechCorp
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-sm">
                      <span style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}>產品</span>
                      <span style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}>解決方案</span>
                      <span style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}>定價</span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: `hsl(${selectedTheme.colors.primary})`,
                      color: `hsl(${selectedTheme.colors.primaryForeground})`,
                      borderRadius: `var(--radius)`,
                    }}
                  >
                    開始使用
                  </button>
                </nav>

                {/* Hero 區塊 */}
                <div className="py-20 px-6 text-center relative overflow-hidden">
                  {/* 背景裝飾 */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, hsl(${selectedTheme.colors.primary} / 0.15), transparent 60%)`
                    }}
                  />
                  
                  <div className="relative">
                    <span 
                      className="inline-block px-3 py-1 text-xs rounded-full mb-6"
                      style={{ 
                        backgroundColor: `hsl(${selectedTheme.colors.primary} / 0.1)`,
                        color: `hsl(${selectedTheme.colors.primary})`,
                      }}
                    >
                      {mockHeroData.badge}
                    </span>
                    
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {mockHeroData.title}
                    </h1>
                    
                    <p 
                      className="text-lg mb-8 max-w-2xl mx-auto"
                      style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                    >
                      {mockHeroData.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 mb-12">
                      <button
                        className="px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                        style={{
                          backgroundColor: `hsl(${selectedTheme.colors.primary})`,
                          color: `hsl(${selectedTheme.colors.primaryForeground})`,
                        }}
                      >
                        免費試用
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        className="px-6 py-3 rounded-lg font-medium"
                        style={{
                          border: `1px solid hsl(${selectedTheme.colors.border})`,
                          color: `hsl(${selectedTheme.colors.foreground})`,
                        }}
                      >
                        了解更多
                      </button>
                    </div>

                    {/* 統計 */}
                    <div className="flex items-center justify-center gap-12">
                      {mockHeroData.stats.map((stat, i) => (
                        <div key={i}>
                          <div 
                            className="text-2xl font-bold"
                            style={{ color: `hsl(${selectedTheme.colors.primary})` }}
                          >
                            {stat.value}
                          </div>
                          <div 
                            className="text-sm"
                            style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features 區塊 */}
                <div 
                  className="py-16 px-6"
                  style={{ backgroundColor: `hsl(${selectedTheme.colors.muted})` }}
                >
                  <h2 className="text-2xl font-bold text-center mb-12">
                    核心優勢
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {mockFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="p-6 rounded-xl"
                        style={{
                          backgroundColor: `hsl(${selectedTheme.colors.card})`,
                          border: `1px solid hsl(${selectedTheme.colors.border})`,
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                          style={{ backgroundColor: `hsl(${selectedTheme.colors.primary} / 0.1)` }}
                        >
                          <Eye 
                            className="h-5 w-5" 
                            style={{ color: `hsl(${selectedTheme.colors.primary})` }} 
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p 
                          className="text-sm"
                          style={{ color: `hsl(${selectedTheme.colors.mutedForeground})` }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

