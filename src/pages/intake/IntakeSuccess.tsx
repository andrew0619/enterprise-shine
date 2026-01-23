/**
 * Intake Success Page
 * 需求單提交成功頁面
 */

import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function IntakeSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            <span className="font-bold text-lg">NexusAI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-16 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="absolute -inset-4 rounded-full border-4 border-green-200 animate-ping opacity-50" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            需求單已送出！
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            感謝您的提交，我們已收到您的網站需求。
          </p>

          {/* Info Cards */}
          <div className="grid gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">確認信已發送</p>
                  <p className="text-sm text-muted-foreground">
                    請檢查您的信箱，我們已發送需求確認信
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">1-2 個工作天內回覆</p>
                  <p className="text-sm text-muted-foreground">
                    我們的團隊將盡快審核您的需求並與您聯繫
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3">接下來會發生什麼？</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>我們的團隊會審核您的需求和上傳的素材</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>如有任何問題，我們會透過 Email 聯繫您</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>確認細節後，我們會開始製作您的網站</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                <span>完成後會提供預覽連結供您確認</span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/">
                返回首頁
              </Link>
            </Button>
            <Button asChild>
              <Link to="/intake" className="gap-2">
                提交另一份需求
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          有任何問題？請聯繫{' '}
          <a href="mailto:support@nexusai.com" className="text-primary hover:underline">
            support@nexusai.com
          </a>
        </div>
      </footer>
    </div>
  );
}

