/**
 * Hero 區塊變體
 * 
 * 提供三種 Hero 佈局供選擇，所有變體接受相同的 props
 */

export { HeroCenter } from './HeroCenter';
export { HeroSplit } from './HeroSplit';
export { HeroGradient } from './HeroGradient';
export { type HeroProps, type HeroVariant } from './types';

// 變體映射表
import { HeroCenter } from './HeroCenter';
import { HeroSplit } from './HeroSplit';
import { HeroGradient } from './HeroGradient';
import type { HeroVariant } from './types';

export const heroVariants = {
  center: HeroCenter,
  split: HeroSplit,
  gradient: HeroGradient,
} as const;

export function getHeroVariant(variant: HeroVariant) {
  return heroVariants[variant] || HeroCenter;
}

