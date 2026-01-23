/**
 * 設計評審面板組件
 * 
 * 顯示 AI 三重評審的結果
 */

import { useState } from 'react';
import {
  type DesignReviewResult,
  type ReviewScore,
  getRecommendationLabel,
  getScoreColor,
  getScoreBarColor,
} from '@/lib/design-review';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Clock,
  RefreshCw,
} from 'lucide-react';

// ============================================================
// 單一評審卡片
// ============================================================

interface ReviewCardProps {
  review: ReviewScore;
  defaultOpen?: boolean;
}

function ReviewCard({ review, defaultOpen = false }: ReviewCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={`
      rounded-xl border transition-all
      ${review.passed 
        ? 'border-green-500/30 bg-green-500/5' 
        : 'border-yellow-500/30 bg-yellow-500/5'
      }
    `}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center gap-4 text-left hover:bg-muted/30 transition-colors rounded-t-xl">
            {/* Icon */}
            <div className="text-3xl">{review.reviewerIcon}</div>
            
            {/* 資訊 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{review.reviewerName}</span>
                {review.passed ? (
                  <Badge variant="outline" className="text-green-600 border-green-600/30 bg-green-500/10">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    通過
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600/30 bg-yellow-500/10">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    需改進
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {review.summary}
              </p>
            </div>
            
            {/* 分數 */}
            <div className="text-right">
              <div className={`text-2xl font-bold ${getScoreColor(review.score)}`}>
                {review.score}
                <span className="text-sm text-muted-foreground font-normal">/10</span>
              </div>
              {/* 分數條 */}
              <div className="w-20 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${getScoreBarColor(review.score)}`}
                  style={{ width: `${review.score * 10}%` }}
                />
              </div>
            </div>
            
            {/* 展開指示 */}
            <div className="text-muted-foreground">
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-4">
            {/* 詳細評價 */}
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {review.feedback}
            </div>
            
            {/* 優點 */}
            {review.strengths.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                  優點
                </h4>
                <ul className="space-y-1">
                  {review.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 問題 */}
            {review.concerns.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  需注意
                </h4>
                <ul className="space-y-1">
                  {review.concerns.map((concern, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 建議 */}
            {review.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-blue-600">
                  <Lightbulb className="h-4 w-4" />
                  改進建議
                </h4>
                <ul className="space-y-1">
                  {review.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5 shrink-0">→</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// ============================================================
// 主面板
// ============================================================

interface DesignReviewPanelProps {
  result: DesignReviewResult | null;
  isLoading?: boolean;
  onResubmit?: () => void;
  onApprove?: () => void;
}

export function DesignReviewPanel({ 
  result, 
  isLoading = false,
  onResubmit,
  onApprove,
}: DesignReviewPanelProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI 評審進行中</h3>
          <p className="text-sm text-muted-foreground">
            三位評審正在審視您的設計方案...
          </p>
          <div className="flex items-center gap-4 mt-4 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🏢</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>🎨</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>💼</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold mb-2">尚未提交評審</h3>
        <p className="text-sm text-muted-foreground">
          選擇主題和區塊組合後，點擊「提交評審」開始 AI 品質驗收
        </p>
      </div>
    );
  }
  
  const recommendation = getRecommendationLabel(result.recommendation);
  
  return (
    <div className="space-y-6">
      {/* 總覽卡片 */}
      <div className={`
        rounded-xl border p-6
        ${result.overallPassed 
          ? 'border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent' 
          : 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent'
        }
      `}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {recommendation.icon} {recommendation.label}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              評審耗時 {(result.duration / 1000).toFixed(1)} 秒
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold">
              <span className={getScoreColor(result.overallScore)}>
                {result.overallScore}
              </span>
              <span className="text-lg text-muted-foreground">/10</span>
            </div>
            <p className="text-xs text-muted-foreground">總體評分</p>
          </div>
        </div>
        
        {/* 共識結論 */}
        <div className="p-4 rounded-lg bg-background/50 border">
          <h4 className="text-sm font-medium mb-2">📋 評審共識</h4>
          <p className="text-sm text-muted-foreground">
            {result.consensus}
          </p>
        </div>
        
        {/* 操作按鈕 */}
        <div className="flex items-center gap-3 mt-4">
          {result.recommendation === 'approve' ? (
            <Button onClick={onApprove} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              核准並使用此設計
            </Button>
          ) : (
            <Button onClick={onApprove} variant="outline" className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              仍要使用（忽略建議）
            </Button>
          )}
          <Button onClick={onResubmit} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            重新生成
          </Button>
        </div>
      </div>
      
      {/* 三個評審結果 */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">詳細評審結果</h3>
        
        <ReviewCard 
          review={result.reviews.conservative} 
          defaultOpen={!result.reviews.conservative.passed}
        />
        <ReviewCard 
          review={result.reviews.design}
          defaultOpen={!result.reviews.design.passed}
        />
        <ReviewCard 
          review={result.reviews.account}
          defaultOpen={!result.reviews.account.passed}
        />
      </div>
    </div>
  );
}

// ============================================================
// 迷你版本（用於側邊欄或摘要）
// ============================================================

interface DesignReviewBadgeProps {
  result: DesignReviewResult;
}

export function DesignReviewBadge({ result }: DesignReviewBadgeProps) {
  const recommendation = getRecommendationLabel(result.recommendation);
  
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
      <span>{recommendation.icon}</span>
      <span className={`font-medium ${recommendation.color}`}>
        {result.overallScore}/10
      </span>
      <span className="text-muted-foreground">
        {recommendation.label}
      </span>
    </div>
  );
}

