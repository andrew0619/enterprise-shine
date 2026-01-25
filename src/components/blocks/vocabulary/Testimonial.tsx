/**
 * 📖 Testimonial 詞彙
 * 
 * 組合：Quote + Avatar + AuthorInfo
 * 用途：客戶見證/推薦
 * 
 * 這是建立信任的關鍵詞彙
 */

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';
import type { TestimonialProps } from './types';

export function Testimonial({
  quote,
  author,
  role,
  company,
  avatar,
  logo,
  variant = 'card',
  className,
}: TestimonialProps) {
  // Featured variant - large centered
  if (variant === 'featured') {
    return (
      <div className={cn('text-center max-w-4xl mx-auto', className)}>
        <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <Avatar src={avatar} name={author} size="lg" />
          <div className="text-left">
            <div className="font-semibold">{author}</div>
            <Text size="sm" variant="muted">
              {role}, {company}
            </Text>
          </div>
          {logo && (
            <img src={logo} alt={company} className="h-8 ml-4 opacity-60" />
          )}
        </div>
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={cn(
        'p-6 rounded-xl bg-card border border-border h-full flex flex-col',
        className
      )}>
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <blockquote className="text-base flex-grow mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-3">
          <Avatar src={avatar} name={author} size="md" />
          <div>
            <div className="font-medium text-sm">{author}</div>
            <Text size="sm" variant="muted">
              {role}, {company}
            </Text>
          </div>
        </div>
      </div>
    );
  }

  // Simple variant
  return (
    <div className={cn('space-y-4', className)}>
      <blockquote className="text-base italic">"{quote}"</blockquote>
      <div className="flex items-center gap-3">
        <Avatar src={avatar} name={author} size="sm" />
        <Text size="sm" variant="muted">
          {author}, {role} at {company}
        </Text>
      </div>
    </div>
  );
}

export default Testimonial;

