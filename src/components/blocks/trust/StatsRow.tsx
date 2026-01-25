/**
 * 🧱 StatsRow 積木
 * 
 * 用途：展示關鍵數據指標
 * 敘事角色：Authority - "用數據說話"
 */

import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { StatsRowProps } from './types';

export function StatsRow({
  stats,
  variant = 'simple',
  title,
  columns = 4,
  background = 'transparent',
  spacing = 'default',
  className,
  id,
}: StatsRowProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns];

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        {title && (
          <h3 className="text-lg font-medium text-center text-muted-foreground mb-8">
            {title}
          </h3>
        )}
        
        <div className={cn('grid gap-8', gridCols)}>
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              stat={stat} 
              variant={variant} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ 
  stat, 
  variant 
}: { 
  stat: StatsRowProps['stats'][0]; 
  variant: StatsRowProps['variant'];
}) {
  const content = (
    <>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
        {stat.prefix}
        {stat.value}
        {stat.suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">
        {stat.label}
      </div>
    </>
  );

  // Simple variant
  if (variant === 'simple') {
    return (
      <div className="text-center">
        {content}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className="text-center p-6 rounded-xl bg-card border border-border">
        {content}
      </div>
    );
  }

  // Highlight variant
  return (
    <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
      {content}
    </div>
  );
}

export default StatsRow;

