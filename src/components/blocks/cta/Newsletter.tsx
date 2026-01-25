/**
 * 🧱 Newsletter 積木
 * 
 * 用途：收集電子郵件訂閱
 * 敘事角色：Action - "保持聯繫"
 */

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { NewsletterProps } from './types';

export function Newsletter({
  title = '訂閱我們的電子報',
  subtitle = '獲取最新的產品更新和行業洞察',
  buttonText = '訂閱',
  placeholder = '輸入您的電子郵件',
  onSubmit,
  background = 'muted',
  spacing = 'default',
  className,
  id,
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit?.(email);
      setIsSuccess(true);
      setEmail('');
      
      // 3 秒後重置成功狀態
      setTimeout(() => setIsSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          {/* Title */}
          {title && (
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {title}
            </h3>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-muted-foreground mb-6">
              {subtitle}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className="min-w-[120px]"
            >
              {isSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  已訂閱
                </>
              ) : isSubmitting ? (
                '訂閱中...'
              ) : (
                <>
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground mt-4">
            我們尊重您的隱私。您可以隨時取消訂閱。
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;

