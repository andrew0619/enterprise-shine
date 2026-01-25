/**
 * 🧱 FAQAccordion 積木
 * 
 * 用途：展示常見問題與解答
 * 敘事角色：Objection Handler - "解答疑慮"
 */

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
  getAlignmentClass,
} from '../types';
import type { FAQAccordionProps } from './types';

export function FAQAccordion({
  items,
  title = '常見問題',
  subtitle,
  badge,
  variant = 'simple',
  maxWidth = 'lg',
  cta,
  defaultOpen = false,
  alignment = 'center',
  background = 'muted',
  spacing = 'default',
  className,
  id,
}: FAQAccordionProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  const maxWidthClasses = {
    sm: 'max-w-xl',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
  }[maxWidth];

  const itemClasses = {
    simple: '',
    card: 'bg-card rounded-lg px-6 mb-2 border border-border',
    bordered: 'border-b border-border',
  }[variant];

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        <div className={cn(maxWidthClasses, 'mx-auto')}>
          {/* Header */}
          <div className={cn('mb-10', getAlignmentClass(alignment))}>
            {badge && (
              <span className="inline-block text-sm font-medium text-primary mb-3">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* FAQ Items */}
          <Accordion 
            type="single" 
            collapsible 
            defaultValue={defaultOpen ? 'item-0' : undefined}
            className="w-full"
          >
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={itemClasses}
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          {cta && (
            <div className="text-center mt-10">
              <p className="text-muted-foreground mb-4">
                還有其他問題嗎？
              </p>
              <Button asChild variant="outline">
                <a href={cta.href}>
                  {cta.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;

