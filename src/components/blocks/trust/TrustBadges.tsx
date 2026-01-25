/**
 * 🧱 TrustBadges 積木
 * 
 * 用途：展示認證徽章、獎項、安全標準
 * 敘事角色：Authority - "我們有認證"
 */

import { Shield, Award, CheckCircle, Lock, Zap, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getSpacingClass, 
  getBackgroundClass,
} from '../types';
import type { TrustBadgesProps } from './types';

// 預設圖標映射
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  award: Award,
  check: CheckCircle,
  lock: Lock,
  zap: Zap,
  globe: Globe,
};

export function TrustBadges({
  badges,
  title,
  layout = 'row',
  background = 'transparent',
  spacing = 'compact',
  className,
  id,
}: TrustBadgesProps) {
  const baseClasses = cn(
    getSpacingClass(spacing),
    getBackgroundClass(background),
    className
  );

  const layoutClasses = {
    row: 'flex flex-wrap items-center justify-center gap-8 md:gap-12',
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6',
  }[layout];

  return (
    <section id={id} className={baseClasses}>
      <div className="container">
        {title && (
          <h3 className="text-lg font-medium text-center text-muted-foreground mb-8">
            {title}
          </h3>
        )}
        
        <div className={layoutClasses}>
          {badges.map((badge, index) => (
            <BadgeItem 
              key={index} 
              badge={badge} 
              layout={layout} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BadgeItem({ 
  badge, 
  layout 
}: { 
  badge: TrustBadgesProps['badges'][0]; 
  layout: TrustBadgesProps['layout'];
}) {
  const Icon = badge.icon ? iconMap[badge.icon] || Shield : Shield;

  // Row layout - compact
  if (layout === 'row') {
    return (
      <div className="flex items-center gap-3 text-muted-foreground">
        {badge.image ? (
          <img src={badge.image} alt={badge.label} className="h-8 w-8 object-contain" />
        ) : (
          <Icon className="h-6 w-6 text-primary" />
        )}
        <span className="text-sm font-medium">{badge.label}</span>
      </div>
    );
  }

  // Grid layout - with description
  return (
    <div className="text-center p-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-3">
        {badge.image ? (
          <img src={badge.image} alt={badge.label} className="h-8 w-8 object-contain" />
        ) : (
          <Icon className="h-6 w-6 text-primary" />
        )}
      </div>
      <div className="font-medium text-sm mb-1">{badge.label}</div>
      {badge.description && (
        <div className="text-xs text-muted-foreground">{badge.description}</div>
      )}
    </div>
  );
}

export default TrustBadges;

