/**
 * 區塊組件庫
 * 
 * 所有可複用的頁面區塊都從這裡導出
 * 
 * 使用方式：
 * import { HeroCenter, FeaturesGrid } from '@/components/blocks';
 */

// Hero 區塊
export * from './hero';

// Features 區塊
export * from './features';

// 類型定義
export type { HeroProps, HeroVariant } from './hero/types';
export type { FeaturesProps, FeatureItem, FeaturesVariant } from './features/types';

