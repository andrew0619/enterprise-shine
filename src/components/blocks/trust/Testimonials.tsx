/**
 * 🧱 Testimonials 積木
 * 
 * 用途：展示客戶見證/推薦
 * 敘事角色：Desire - "別人用了都說好"
 */

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { TestimonialsProps } from './types';

export function Testimonials({
  testimonials,
  variant = 'single',
  title,
  subtitle,
  background = 'muted',
  spacing = 'default',
  className,
  id,
}: TestimonialsProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Single testimonial (featured) */}
        {variant === 'single' && testimonials[0] && (
          <SingleTestimonial testimonial={testimonials[0]} />
        )}

        {/* Grid layout */}
        {variant === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <TestimonialCard key={index} testimonial={t} />
            ))}
          </div>
        )}

        {/* Carousel - simplified version */}
        {variant === 'carousel' && (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-center"
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// 單一大型見證（Featured）
function SingleTestimonial({ 
  testimonial 
}: { 
  testimonial: TestimonialsProps['testimonials'][0] 
}) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
      <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center justify-center gap-4">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            className="h-14 w-14 rounded-full object-cover"
          />
        )}
        <div className="text-left">
          <div className="font-semibold">{testimonial.author}</div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
        {testimonial.logo && (
          <img
            src={testimonial.logo.src}
            alt={testimonial.logo.alt}
            className="h-8 ml-4 opacity-60"
          />
        )}
      </div>
    </div>
  );
}

// 見證卡片
function TestimonialCard({ 
  testimonial 
}: { 
  testimonial: TestimonialsProps['testimonials'][0] 
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border h-full flex flex-col">
      <Quote className="h-8 w-8 text-primary/30 mb-4" />
      <blockquote className="text-base flex-grow mb-6">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-medium text-sm">{testimonial.author}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;

