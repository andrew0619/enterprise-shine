/**
 * Features 區塊變體
 * 
 * 展示產品/服務特色的多種佈局
 */

export { FeaturesGrid } from './FeaturesGrid';
export { FeaturesBento } from './FeaturesBento';
export { FeaturesAlternating } from './FeaturesAlternating';
export { type FeaturesProps, type FeatureItem, type FeaturesVariant } from './types';

import { FeaturesGrid } from './FeaturesGrid';
import { FeaturesBento } from './FeaturesBento';
import { FeaturesAlternating } from './FeaturesAlternating';
import type { FeaturesVariant } from './types';

export const featuresVariants = {
  grid: FeaturesGrid,
  bento: FeaturesBento,
  alternating: FeaturesAlternating,
} as const;

export function getFeaturesVariant(variant: FeaturesVariant) {
  return featuresVariants[variant] || FeaturesGrid;
}


