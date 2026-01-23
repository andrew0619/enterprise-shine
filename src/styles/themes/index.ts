/**
 * 主題變體註冊表
 * 硬體科技業專用 - 6 種預設主題
 */

export interface ThemeConfig {
  id: string;
  name: string;
  nameZh: string;
  mode: 'light' | 'dark';
  description: string;
  
  // CSS 變數
  colors: {
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  
  // Dark mode 專用
  effects?: {
    glow: string;
    glassBackground: string;
    glassBorder: string;
  };
  
  // 樣式變體
  style: {
    borderRadius: 'sharp' | 'default' | 'soft';
    shadowIntensity: 'none' | 'subtle' | 'medium' | 'strong';
    animationLevel: 'minimal' | 'standard' | 'enhanced';
  };
}

// ============================================================
// Light Mode 主題
// ============================================================

export const lightCorporate: ThemeConfig = {
  id: 'light-corporate',
  name: 'Corporate Blue',
  nameZh: 'L1 企業藍',
  mode: 'light',
  description: '經典企業風格，適合大多數科技公司',
  colors: {
    primary: '214 100% 50%',        // #0066FF
    primaryHover: '214 100% 45%',
    primaryForeground: '0 0% 100%',
    accent: '340 82% 52%',          // Deep Pink
    accentForeground: '0 0% 100%',
    background: '0 0% 100%',
    foreground: '215 25% 27%',
    card: '0 0% 100%',
    cardForeground: '215 25% 27%',
    muted: '210 40% 96.1%',
    mutedForeground: '215 16% 47%',
    border: '214 32% 91%',
    input: '214 32% 91%',
    ring: '214 100% 50%',
  },
  style: {
    borderRadius: 'default',
    shadowIntensity: 'medium',
    animationLevel: 'standard',
  },
};

export const lightNavy: ThemeConfig = {
  id: 'light-navy',
  name: 'Navy Professional',
  nameZh: 'L2 深海藍',
  mode: 'light',
  description: '更穩重的深藍調，適合大型企業、政府相關',
  colors: {
    primary: '224 76% 33%',         // #1E3A8A
    primaryHover: '224 76% 28%',
    primaryForeground: '0 0% 100%',
    accent: '199 89% 48%',          // Cyan
    accentForeground: '0 0% 100%',
    background: '0 0% 100%',
    foreground: '222 47% 11%',
    card: '0 0% 100%',
    cardForeground: '222 47% 11%',
    muted: '210 40% 96.1%',
    mutedForeground: '215 16% 47%',
    border: '214 32% 91%',
    input: '214 32% 91%',
    ring: '224 76% 33%',
  },
  style: {
    borderRadius: 'default',
    shadowIntensity: 'subtle',
    animationLevel: 'minimal',
  },
};

export const lightSlate: ThemeConfig = {
  id: 'light-slate',
  name: 'Slate Minimal',
  nameZh: 'L3 科技灰藍',
  mode: 'light',
  description: '極簡灰藍調，適合技術導向、工程師取向的產品',
  colors: {
    primary: '215 25% 27%',         // #334155
    primaryHover: '215 25% 22%',
    primaryForeground: '0 0% 100%',
    accent: '217 91% 60%',          // Blue
    accentForeground: '0 0% 100%',
    background: '0 0% 100%',
    foreground: '215 28% 17%',
    card: '0 0% 100%',
    cardForeground: '215 28% 17%',
    muted: '210 40% 96.1%',
    mutedForeground: '215 16% 47%',
    border: '214 32% 91%',
    input: '214 32% 91%',
    ring: '215 25% 27%',
  },
  style: {
    borderRadius: 'sharp',
    shadowIntensity: 'none',
    animationLevel: 'minimal',
  },
};

// ============================================================
// Dark Mode 主題
// ============================================================

export const darkCyan: ThemeConfig = {
  id: 'dark-cyan',
  name: 'Deep Space Cyan',
  nameZh: 'D1 深空青',
  mode: 'dark',
  description: 'AI/算力服務商首選，科技未來感',
  colors: {
    primary: '202 100% 50%',        // #00A3FF
    primaryHover: '202 100% 55%',
    primaryForeground: '0 0% 100%',
    accent: '263 70% 50%',          // Purple
    accentForeground: '0 0% 100%',
    background: '222 47% 2%',       // Deep Space Navy
    foreground: '0 0% 100%',
    card: '222 47% 4%',
    cardForeground: '0 0% 100%',
    muted: '215 20% 20%',
    mutedForeground: '215 20% 65%',
    border: '215 20% 20%',
    input: '215 20% 20%',
    ring: '202 100% 50%',
  },
  effects: {
    glow: '202 100% 50% / 0.3',
    glassBackground: '222 30% 8% / 0.6',
    glassBorder: '215 20% 25% / 0.5',
  },
  style: {
    borderRadius: 'soft',
    shadowIntensity: 'none',
    animationLevel: 'enhanced',
  },
};

export const darkIndigo: ThemeConfig = {
  id: 'dark-indigo',
  name: 'Electric Indigo',
  nameZh: 'D2 電光紫藍',
  mode: 'dark',
  description: '稍微現代的調性，適合 GPU 產品線展示',
  colors: {
    primary: '239 84% 67%',         // #6366F1
    primaryHover: '239 84% 72%',
    primaryForeground: '0 0% 100%',
    accent: '292 91% 73%',          // Magenta
    accentForeground: '0 0% 100%',
    background: '224 71% 4%',
    foreground: '0 0% 100%',
    card: '224 71% 6%',
    cardForeground: '0 0% 100%',
    muted: '215 20% 15%',
    mutedForeground: '215 20% 65%',
    border: '215 20% 20%',
    input: '215 20% 20%',
    ring: '239 84% 67%',
  },
  effects: {
    glow: '239 84% 67% / 0.3',
    glassBackground: '224 50% 8% / 0.6',
    glassBorder: '239 50% 30% / 0.3',
  },
  style: {
    borderRadius: 'default',
    shadowIntensity: 'none',
    animationLevel: 'enhanced',
  },
};

export const darkBlack: ThemeConfig = {
  id: 'dark-black',
  name: 'Pure Black Tech',
  nameZh: 'D3 純黑科技',
  mode: 'dark',
  description: 'NVIDIA 風格，最高階感的黑底藍光',
  colors: {
    primary: '217 91% 60%',         // #3B82F6
    primaryHover: '217 91% 65%',
    primaryForeground: '0 0% 100%',
    accent: '263 70% 50%',          // Purple
    accentForeground: '0 0% 100%',
    background: '0 0% 0%',          // Pure Black
    foreground: '0 0% 100%',
    card: '0 0% 4%',
    cardForeground: '0 0% 100%',
    muted: '0 0% 10%',
    mutedForeground: '0 0% 65%',
    border: '0 0% 15%',
    input: '0 0% 15%',
    ring: '217 91% 60%',
  },
  effects: {
    glow: '217 91% 60% / 0.4',
    glassBackground: '0 0% 5% / 0.8',
    glassBorder: '0 0% 20% / 0.5',
  },
  style: {
    borderRadius: 'sharp',
    shadowIntensity: 'none',
    animationLevel: 'standard',
  },
};

// ============================================================
// 主題集合
// ============================================================

export const themes: ThemeConfig[] = [
  lightCorporate,
  lightNavy,
  lightSlate,
  darkCyan,
  darkIndigo,
  darkBlack,
];

export const lightThemes = themes.filter(t => t.mode === 'light');
export const darkThemes = themes.filter(t => t.mode === 'dark');

export function getThemeById(id: string): ThemeConfig | undefined {
  return themes.find(t => t.id === id);
}

export function getDefaultTheme(mode: 'light' | 'dark'): ThemeConfig {
  return mode === 'light' ? lightCorporate : darkCyan;
}

// ============================================================
// CSS 變數生成
// ============================================================

export function generateCSSVariables(theme: ThemeConfig): string {
  const vars: string[] = [];
  
  // 基礎色彩
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars.push(`--${cssKey}: ${value};`);
  });
  
  // Dark mode 特效
  if (theme.effects) {
    vars.push(`--glow: ${theme.effects.glow};`);
    vars.push(`--glass-bg: ${theme.effects.glassBackground};`);
    vars.push(`--glass-border: ${theme.effects.glassBorder};`);
  }
  
  // 圓角
  const radiusMap = {
    sharp: '0.25rem',
    default: '0.5rem',
    soft: '0.75rem',
  };
  vars.push(`--radius: ${radiusMap[theme.style.borderRadius]};`);
  
  return vars.join('\n  ');
}

