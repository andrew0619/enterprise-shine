/**
 * 🧱 SectionHeader 積木
 * 
 * 用途：為其他區塊提供標題
 * 敘事角色：Context Setter - "這個區塊是關於什麼"
 */

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
  getAlignmentClass,
} from '../types';
import type { SectionHeaderProps } from './types';

export function SectionHeader({
  badge,
  title,
  subtitle,
  description,
  alignment = 'center',
  maxWidth = 'lg',
  background = 'transparent',
  spacing = 'compact',
  className,
  id,
}: SectionHeaderProps) {
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
    full: '',
  }[maxWidth];

  return (
    <header id={id} className={baseClasses}>
      <div className="container">
        <div className={cn(maxWidthClasses, getAlignmentClass(alignment))}>
          {/* Badge */}
          {badge && (
            <Badge 
              variant="outline" 
              className="mb-4 px-4 py-1.5 text-sm"
            >
              {badge}
            </Badge>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export default SectionHeader;

