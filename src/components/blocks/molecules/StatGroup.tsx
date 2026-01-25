/**
 * 🧬 StatGroup 分子
 * 
 * 組合：多個 Stat 原子
 * 職責：顯示一組統計數據
 */

import { cn } from '@/lib/utils';
import { Stat } from '../atoms/Stat';
import type { StatGroupProps } from './types';

export function StatGroup({
  stats,
  columns = 4,
  variant = 'simple',
  title,
  className,
}: StatGroupProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns];

  return (
    <div className={className}>
      {title && (
        <p className="text-sm text-muted-foreground text-center mb-8">
          {title}
        </p>
      )}
      
      <div className={cn('grid gap-8', gridCols)}>
        {stats.map((stat, index) => (
          <Stat
            key={index}
            value={stat.value}
            label={stat.label}
            prefix={stat.prefix}
            suffix={stat.suffix}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

export default StatGroup;

