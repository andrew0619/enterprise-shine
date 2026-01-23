/**
 * 變體生成器 UI 組件
 * 
 * 智慧推薦 + 批量生成 + 結果比較
 */

import { useState } from 'react';
import { themes } from '@/styles/themes';
import {
  smartRecommend,
  generateFilteredCombinations,
  batchReview,
  compareVariants,
  heroVariants,
  featuresVariants,
  heroLabels,
  featuresLabels,
  getVariantDisplayName,
  type DesignVariant,
  type ClientBrief,
  type BatchReviewResult,
  type HeroVariant,
  type FeaturesVariant,
} from '@/lib/variant-generator';
import { getScoreColor, getScoreBarColor } from '@/lib/design-review';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles,
  Zap,
  Trophy,
  Target,
  Palette,
  LayoutGrid,
  CheckCircle,
  XCircle,
  Crown,
  Medal,
  Loader2,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

// ============================================================
// 推薦卡片
// ============================================================

interface RecommendationCardProps {
  variant: DesignVariant;
  rank: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onPreview?: () => void;
}

function RecommendationCard({ 
  variant, 
  rank, 
  isSelected, 
  onSelect,
  onPreview,
}: RecommendationCardProps) {
  const rankIcons = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  
  return (
    <div 
      className={`
        relative p-4 rounded-xl border-2 transition-all cursor-pointer
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border hover:border-primary/50'
        }
      `}
      onClick={onSelect}
    >
      {/* 排名標記 */}
      <div className="absolute -top-3 -left-3 text-2xl">
        {rankIcons[rank] || `${rank + 1}`}
      </div>
      
      {/* 信心度 */}
      {variant.confidence && (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs">
            信心度 {variant.confidence}%
          </Badge>
        </div>
      )}
      
      {/* 主題預覽色塊 */}
      <div className="flex gap-2 mb-3 mt-2">
        <div 
          className="w-8 h-8 rounded-lg border"
          style={{ backgroundColor: `hsl(${variant.theme.colors.background})` }}
        />
        <div 
          className="w-8 h-8 rounded-lg"
          style={{ backgroundColor: `hsl(${variant.theme.colors.primary})` }}
        />
        {variant.theme.colors.accent && (
          <div 
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: `hsl(${variant.theme.colors.accent})` }}
          />
        )}
      </div>
      
      {/* 組合名稱 */}
      <h4 className="font-semibold mb-1">{variant.theme.nameZh}</h4>
      <p className="text-sm text-muted-foreground mb-2">
        {heroLabels[variant.hero]} + {featuresLabels[variant.features]}
      </p>
      
      {/* 推薦理由 */}
      {variant.reason && (
        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
          💡 {variant.reason}
        </p>
      )}
      
      {/* 操作按鈕 */}
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onPreview?.();
          }}
        >
          預覽
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          variant={isSelected ? 'default' : 'secondary'}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        >
          {isSelected ? '已選中' : '選擇'}
        </Button>
      </div>
    </div>
  );
}

// ============================================================
// 批量評審結果表格
// ============================================================

interface ResultsTableProps {
  results: BatchReviewResult[];
  onSelectVariant?: (variant: DesignVariant) => void;
}

function ResultsTable({ results, onSelectVariant }: ResultsTableProps) {
  if (results.length === 0) return null;
  
  const comparison = compareVariants(results);
  
  return (
    <div className="space-y-6">
      {/* 冠軍 */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🏆</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg flex items-center gap-2">
              最佳推薦
              <Badge className="bg-yellow-500">{comparison.winner.review.overallScore}/10</Badge>
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {getVariantDisplayName(comparison.winner.variant)}
            </p>
            <p className="text-sm">
              {comparison.winner.review.consensus}
            </p>
            <Button 
              size="sm" 
              className="mt-3"
              onClick={() => onSelectVariant?.(comparison.winner.variant)}
            >
              使用此設計
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 各項最佳 */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏢</span>
            <span className="text-sm font-medium">最保守</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {comparison.analysis.bestForConservative.variant.theme.nameZh}
          </p>
          <Badge variant="outline" className="mt-1">
            {comparison.analysis.bestForConservative.review.reviews.conservative.score}/10
          </Badge>
        </div>
        
        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎨</span>
            <span className="text-sm font-medium">設計最佳</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {comparison.analysis.bestForDesign.variant.theme.nameZh}
          </p>
          <Badge variant="outline" className="mt-1">
            {comparison.analysis.bestForDesign.review.reviews.design.score}/10
          </Badge>
        </div>
        
        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💼</span>
            <span className="text-sm font-medium">最符合需求</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {comparison.analysis.bestForAccount.variant.theme.nameZh}
          </p>
          <Badge variant="outline" className="mt-1">
            {comparison.analysis.bestForAccount.review.reviews.account.score}/10
          </Badge>
        </div>
        
        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚖️</span>
            <span className="text-sm font-medium">最平衡</span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {comparison.analysis.mostBalanced.variant.theme.nameZh}
          </p>
          <Badge variant="outline" className="mt-1">
            {comparison.analysis.mostBalanced.review.overallScore}/10
          </Badge>
        </div>
      </div>
      
      {/* 完整排名表 */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">排名</th>
              <th className="text-left p-3 text-sm font-medium">設計組合</th>
              <th className="text-center p-3 text-sm font-medium">🏢</th>
              <th className="text-center p-3 text-sm font-medium">🎨</th>
              <th className="text-center p-3 text-sm font-medium">💼</th>
              <th className="text-center p-3 text-sm font-medium">總分</th>
              <th className="text-center p-3 text-sm font-medium">狀態</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr 
                key={result.variant.id}
                className={`
                  border-t hover:bg-muted/30 transition-colors
                  ${index === 0 ? 'bg-yellow-500/5' : ''}
                `}
              >
                <td className="p-3">
                  <span className="text-lg">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: `hsl(${result.variant.theme.colors.primary})` }}
                    />
                    <div>
                      <p className="font-medium text-sm">{result.variant.theme.nameZh}</p>
                      <p className="text-xs text-muted-foreground">
                        {heroLabels[result.variant.hero]} + {featuresLabels[result.variant.features]}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={`p-3 text-center font-medium ${getScoreColor(result.review.reviews.conservative.score)}`}>
                  {result.review.reviews.conservative.score}
                </td>
                <td className={`p-3 text-center font-medium ${getScoreColor(result.review.reviews.design.score)}`}>
                  {result.review.reviews.design.score}
                </td>
                <td className={`p-3 text-center font-medium ${getScoreColor(result.review.reviews.account.score)}`}>
                  {result.review.reviews.account.score}
                </td>
                <td className="p-3 text-center">
                  <span className={`font-bold ${getScoreColor(result.review.overallScore)}`}>
                    {result.review.overallScore}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {result.review.overallPassed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="h-5 w-5 text-yellow-500 mx-auto" />
                  )}
                </td>
                <td className="p-3">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onSelectVariant?.(result.variant)}
                  >
                    選用
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// 主組件
// ============================================================

interface VariantGeneratorProps {
  clientBrief: ClientBrief;
  onSelectVariant: (variant: DesignVariant) => void;
}

export function VariantGenerator({ clientBrief, onSelectVariant }: VariantGeneratorProps) {
  // 狀態
  const [activeTab, setActiveTab] = useState<'smart' | 'custom'>('smart');
  const [recommendations, setRecommendations] = useState<DesignVariant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Set<string>>(new Set());
  
  // 自訂組合選擇
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['dark-cyan', 'dark-black', 'dark-indigo']);
  const [selectedHeroes, setSelectedHeroes] = useState<HeroVariant[]>(['gradient', 'center']);
  const [selectedFeatures, setSelectedFeatures] = useState<FeaturesVariant[]>(['bento', 'grid']);
  
  // 評審狀態
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewProgress, setReviewProgress] = useState({ current: 0, total: 0 });
  const [reviewResults, setReviewResults] = useState<BatchReviewResult[]>([]);
  
  // 生成推薦
  const generateRecommendations = () => {
    const recs = smartRecommend(clientBrief, 5);
    setRecommendations(recs);
    // 預設選中前三個
    setSelectedVariants(new Set(recs.slice(0, 3).map(r => r.id)));
  };
  
  // 切換選擇
  const toggleVariantSelection = (id: string) => {
    const newSelected = new Set(selectedVariants);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVariants(newSelected);
  };
  
  // 執行批量評審
  const runBatchReview = async () => {
    let variantsToReview: DesignVariant[];
    
    if (activeTab === 'smart') {
      variantsToReview = recommendations.filter(r => selectedVariants.has(r.id));
    } else {
      variantsToReview = generateFilteredCombinations(
        selectedThemes,
        selectedHeroes,
        selectedFeatures
      );
    }
    
    if (variantsToReview.length === 0) {
      alert('請選擇至少一個變體');
      return;
    }
    
    setIsReviewing(true);
    setReviewProgress({ current: 0, total: variantsToReview.length });
    setReviewResults([]);
    
    try {
      const results = await batchReview(
        variantsToReview,
        clientBrief,
        (current, total) => setReviewProgress({ current, total })
      );
      setReviewResults(results);
    } catch (error) {
      console.error('批量評審失敗:', error);
    } finally {
      setIsReviewing(false);
    }
  };
  
  // 計算自訂組合數量
  const customCombinationCount = selectedThemes.length * selectedHeroes.length * selectedFeatures.length;
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'smart' | 'custom')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smart" className="gap-2">
            <Sparkles className="h-4 w-4" />
            智慧推薦
          </TabsTrigger>
          <TabsTrigger value="custom" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            自訂組合
          </TabsTrigger>
        </TabsList>
        
        {/* 智慧推薦 */}
        <TabsContent value="smart" className="space-y-4 mt-4">
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">AI 智慧推薦</h3>
              <p className="text-sm text-muted-foreground mb-4">
                根據「{clientBrief.companyName}」的需求，為您推薦最適合的設計組合
              </p>
              <Button onClick={generateRecommendations}>
                <Zap className="mr-2 h-4 w-4" />
                生成推薦
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  已選擇 {selectedVariants.size} 個變體進行評審
                </p>
                <Button variant="outline" size="sm" onClick={generateRecommendations}>
                  重新推薦
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((variant, index) => (
                  <RecommendationCard
                    key={variant.id}
                    variant={variant}
                    rank={index}
                    isSelected={selectedVariants.has(variant.id)}
                    onSelect={() => toggleVariantSelection(variant.id)}
                    onPreview={() => onSelectVariant(variant)}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        {/* 自訂組合 */}
        <TabsContent value="custom" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* 主題選擇 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                主題 ({selectedThemes.length} 選中)
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {themes.map((theme) => (
                  <label key={theme.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedThemes.includes(theme.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedThemes([...selectedThemes, theme.id]);
                        } else {
                          setSelectedThemes(selectedThemes.filter(t => t !== theme.id));
                        }
                      }}
                    />
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                    />
                    <span className="text-sm">{theme.nameZh}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Hero 選擇 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Hero 區塊 ({selectedHeroes.length} 選中)
              </Label>
              <div className="space-y-2">
                {heroVariants.map((hero) => (
                  <label key={hero} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedHeroes.includes(hero)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedHeroes([...selectedHeroes, hero]);
                        } else {
                          setSelectedHeroes(selectedHeroes.filter(h => h !== hero));
                        }
                      }}
                    />
                    <span className="text-sm">{heroLabels[hero]}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Features 選擇 */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                Features 區塊 ({selectedFeatures.length} 選中)
              </Label>
              <div className="space-y-2">
                {featuresVariants.map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFeatures([...selectedFeatures, feature]);
                        } else {
                          setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                        }
                      }}
                    />
                    <span className="text-sm">{featuresLabels[feature]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">
              將產生 <strong className="text-foreground">{customCombinationCount}</strong> 種組合
              {customCombinationCount > 10 && (
                <span className="text-yellow-600 ml-2">
                  （建議選擇較少組合以加快評審速度）
                </span>
              )}
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* 評審按鈕 */}
      <div className="flex items-center justify-center gap-4">
        <Button 
          size="lg" 
          onClick={runBatchReview}
          disabled={isReviewing || (activeTab === 'smart' && selectedVariants.size === 0) || (activeTab === 'custom' && customCombinationCount === 0)}
          className="min-w-[200px]"
        >
          {isReviewing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              評審中...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-5 w-5" />
              批量評審 {activeTab === 'smart' ? `(${selectedVariants.size} 個)` : `(${customCombinationCount} 個)`}
            </>
          )}
        </Button>
      </div>
      
      {/* 評審進度 */}
      {isReviewing && (
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">評審進度</span>
            <span className="text-sm text-muted-foreground">
              {reviewProgress.current} / {reviewProgress.total}
            </span>
          </div>
          <Progress value={(reviewProgress.current / reviewProgress.total) * 100} />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            三位 AI 評審正在審視每個設計變體...
          </p>
        </div>
      )}
      
      {/* 評審結果 */}
      {reviewResults.length > 0 && !isReviewing && (
        <ResultsTable 
          results={reviewResults} 
          onSelectVariant={onSelectVariant}
        />
      )}
    </div>
  );
}

