/**
 * 📖 ListItem 詞彙
 * 
 * 組合：Icon? + Text
 * 用途：列表中的單個項目
 * 
 * 這是展示清單的基礎詞彙
 */

import { Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ListItemProps } from './types';

export function ListItem({
  icon,
  checkmark = false,
  text,
  variant = 'simple',
  className,
}: ListItemProps) {
  // 獲取圖標
  const IconComponent = checkmark 
    ? Check 
    : icon 
      ? (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[icon]
      : null;

  // Inline variant - 橫向排列
  if (variant === 'inline') {
    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        {IconComponent && (
          <IconComponent className="h-4 w-4 text-primary shrink-0" />
        )}
        <span>{text}</span>
      </span>
    );
  }

  // Simple variant - 直向排列
  return (
    <li className={cn('flex items-start gap-3', className)}>
      {IconComponent && (
        <IconComponent className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      )}
      <span>{text}</span>
    </li>
  );
}

export default ListItem;

