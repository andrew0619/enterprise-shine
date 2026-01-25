/**
 * 🧱 ContactForm 積木
 * 
 * 用途：收集潛在客戶資訊
 * 敘事角色：Action - "聯繫我們"
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { ContactFormProps, ContactFormField } from './types';

// 預設表單欄位
const defaultFields: ContactFormField[] = [
  { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '您的姓名' },
  { name: 'email', label: '電子郵件', type: 'email', required: true, placeholder: 'you@company.com' },
  { name: 'company', label: '公司名稱', type: 'text', placeholder: '您的公司' },
  { name: 'message', label: '訊息', type: 'textarea', placeholder: '請描述您的需求...' },
];

export function ContactForm({
  title = '聯繫我們',
  subtitle = '我們的團隊會盡快與您聯繫',
  fields = defaultFields,
  submitText = '送出',
  variant = 'simple',
  onSubmit,
  disclaimer,
  background = 'card',
  spacing = 'default',
  className,
  id,
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit?.(formData);
      setFormData({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  // Inline variant - 單行表單
  if (variant === 'inline') {
    return (
      <section id={id} className={baseClasses}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {title && (
              <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
            )}
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="您的電子郵件"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '送出中...' : submitText}
              </Button>
            </form>
            {disclaimer && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                {disclaimer}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Simple / Detailed variant
  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        <div className={cn(
          'mx-auto',
          variant === 'simple' ? 'max-w-md' : 'max-w-2xl'
        )}>
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && (
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={cn(
              'grid gap-6',
              variant === 'detailed' ? 'md:grid-cols-2' : 'grid-cols-1'
            )}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name] || ''}
                  onChange={(value) => handleChange(field.name, value)}
                  fullWidth={field.type === 'textarea' || variant === 'simple'}
                />
              ))}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? '送出中...' : submitText}
            </Button>

            {disclaimer && (
              <p className="text-xs text-muted-foreground text-center">
                {disclaimer}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// 表單欄位組件
function FormField({
  field,
  value,
  onChange,
  fullWidth = false,
}: {
  field: ContactFormField;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}) {
  const fieldClasses = fullWidth ? 'md:col-span-2' : '';

  return (
    <div className={cn('space-y-2', fieldClasses)}>
      <Label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      {field.type === 'textarea' ? (
        <Textarea
          id={field.name}
          name={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
        />
      ) : field.type === 'select' && field.options ? (
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="">{field.placeholder || '請選擇...'}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
        />
      )}
    </div>
  );
}

export default ContactForm;

