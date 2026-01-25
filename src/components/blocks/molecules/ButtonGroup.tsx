/**
 * 🧬 ButtonGroup 分子
 * 
 * 組合：ActionButton + ActionButton
 * 職責：顯示一組按鈕
 */

import { cn } from '@/lib/utils';
import { ActionButton } from '../atoms/ActionButton';
import type { ButtonGroupProps } from './types';

export function ButtonGroup({
  primary,
  secondary,
  direction = 'row',
  align = 'left',
  size = 'md',
  className,
}: ButtonGroupProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[align];

  return (
    <div
      className={cn(
        'flex gap-4',
        direction === 'column' ? 'flex-col' : 'flex-col sm:flex-row',
        alignClasses,
        className
      )}
    >
      {primary && (
        <ActionButton
          href={primary.href}
          variant={primary.variant || 'default'}
          size={size}
          icon={primary.icon || 'arrow'}
          onClick={primary.onClick}
        >
          {primary.text}
        </ActionButton>
      )}
      
      {secondary && (
        <ActionButton
          href={secondary.href}
          variant={secondary.variant || 'outline'}
          size={size}
          icon={secondary.icon || 'none'}
          onClick={secondary.onClick}
        >
          {secondary.text}
        </ActionButton>
      )}
    </div>
  );
}

export default ButtonGroup;

