/**
 * 🔬 ActionButton 原子
 * 
 * 最小單位：按鈕
 * 職責：觸發一個動作或導航
 */

import { ArrowRight, ExternalLink, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ActionButtonProps } from './types';

const iconMap = {
  arrow: ArrowRight,
  external: ExternalLink,
  download: Download,
  play: Play,
  none: null,
};

const sizeMap: Record<NonNullable<ActionButtonProps['size']>, 'sm' | 'default' | 'lg'> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
};

export function ActionButton({
  children,
  href,
  variant = 'default',
  size = 'md',
  icon = 'none',
  fullWidth = false,
  onClick,
  className,
}: ActionButtonProps) {
  const Icon = icon !== 'none' ? iconMap[icon] : null;
  
  const button = (
    <Button
      variant={variant}
      size={sizeMap[size]}
      onClick={onClick}
      className={cn(fullWidth && 'w-full', className)}
    >
      {children}
      {Icon && <Icon className="ml-2 h-4 w-4" />}
    </Button>
  );

  if (href) {
    return (
      <a href={href} className={cn(fullWidth && 'w-full block')}>
        {button}
      </a>
    );
  }

  return button;
}

export default ActionButton;

