/**
 * 📖 StatPoint 詞彙
 * 
 * 組合：IconBox? + Stat + Text?
 * 用途：展示關鍵數據指標
 * 
 * 這是建立權威感的關鍵詞彙
 */

import { cn } from '@/lib/utils';
import { IconBox } from '../atoms/IconBox';
import { Stat } from '../atoms/Stat';
import { Text } from '../atoms/Text';
import type { StatPointProps } from './types';

export function StatPoint({
  icon,
  value,
  label,
  prefix,
  suffix,
  description,
  variant = 'simple',
  className,
}: StatPointProps) {
  // Simple variant - just the stat
  if (variant === 'simple') {
    return (
      <div className={cn('text-center', className)}>
        <Stat
          value={value}
          label={label}
          prefix={prefix}
          suffix={suffix}
          variant="simple"
        />
        {description && (
          <Text size="sm" variant="muted" className="mt-2">
            {description}
          </Text>
        )}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={cn(
        'text-center p-6 rounded-xl bg-card border border-border',
        className
      )}>
        <Stat
          value={value}
          label={label}
          prefix={prefix}
          suffix={suffix}
          variant="simple"
        />
        {description && (
          <Text size="sm" variant="muted" className="mt-2">
            {description}
          </Text>
        )}
      </div>
    );
  }

  // Icon-card variant - with icon on the left
  return (
    <div className={cn(
      'flex items-start gap-6 p-6 bg-card rounded-xl border border-border',
      className
    )}>
      {icon && (
        <div className="shrink-0">
          <IconBox
            name={icon}
            size="xl"
            withBackground
            backgroundVariant="primary"
          />
        </div>
      )}
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl md:text-5xl font-bold text-primary">
            {prefix}{value}{suffix}
          </span>
          <span className="text-xl font-semibold">{label}</span>
        </div>
        {description && (
          <Text variant="muted">{description}</Text>
        )}
      </div>
    </div>
  );
}

export default StatPoint;

