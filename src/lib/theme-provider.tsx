/**
 * 主題提供者 (Theme Provider)
 * 管理主題切換和 CSS 變數注入
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  themes, 
  getThemeById, 
  getDefaultTheme,
  generateCSSVariables,
  type ThemeConfig 
} from '@/styles/themes';

// ============================================================
// Context
// ============================================================

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeConfig[];
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================
// Provider
// ============================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light-corporate',
  storageKey = 'site-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    // 嘗試從 localStorage 讀取
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const found = getThemeById(stored);
        if (found) return found;
      }
    }
    return getThemeById(defaultTheme) || getDefaultTheme('light');
  });

  // 當主題變更時，更新 CSS 變數和 body class
  useEffect(() => {
    const root = document.documentElement;
    
    // 移除舊的主題 class
    root.classList.remove('light', 'dark');
    themes.forEach(t => root.classList.remove(`theme-${t.id}`));
    
    // 添加新的主題 class
    root.classList.add(theme.mode);
    root.classList.add(`theme-${theme.id}`);
    
    // 注入 CSS 變數
    const cssVars = generateCSSVariables(theme);
    root.style.cssText = cssVars.split('\n').map(v => v.trim()).join(' ');
    
    // 儲存到 localStorage
    localStorage.setItem(storageKey, theme.id);
  }, [theme, storageKey]);

  const setTheme = (themeId: string) => {
    const newTheme = getThemeById(themeId);
    if (newTheme) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      availableThemes: themes,
      isDarkMode: theme.mode === 'dark',
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// ============================================================
// 主題選擇器組件
// ============================================================

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  const lightThemes = availableThemes.filter(t => t.mode === 'light');
  const darkThemes = availableThemes.filter(t => t.mode === 'dark');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          🎨 {theme.nameZh}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Light Mode</DropdownMenuLabel>
        {lightThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center justify-between"
          >
            <div>
              <span className="font-medium">{t.nameZh}</span>
              <span className="text-xs text-muted-foreground ml-2">{t.name}</span>
            </div>
            {theme.id === t.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
        {darkThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center justify-between"
          >
            <div>
              <span className="font-medium">{t.nameZh}</span>
              <span className="text-xs text-muted-foreground ml-2">{t.name}</span>
            </div>
            {theme.id === t.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================
// 主題預覽卡片
// ============================================================

interface ThemePreviewCardProps {
  themeConfig: ThemeConfig;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ThemePreviewCard({ themeConfig, isSelected, onSelect }: ThemePreviewCardProps) {
  const primaryColor = `hsl(${themeConfig.colors.primary})`;
  const bgColor = `hsl(${themeConfig.colors.background})`;
  const fgColor = `hsl(${themeConfig.colors.foreground})`;
  
  return (
    <div
      onClick={onSelect}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all
        ${isSelected 
          ? 'border-primary ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50'
        }
      `}
    >
      {/* 預覽區 */}
      <div 
        className="h-24 rounded-lg mb-3 overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* 模擬 Navbar */}
        <div 
          className="h-6 px-2 flex items-center gap-1"
          style={{ backgroundColor: themeConfig.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
          <div className="flex-1" />
          <div className="w-8 h-2 rounded" style={{ backgroundColor: `${fgColor}33` }} />
          <div className="w-8 h-2 rounded" style={{ backgroundColor: `${fgColor}33` }} />
        </div>
        
        {/* 模擬 Hero */}
        <div className="p-2 space-y-1">
          <div className="w-16 h-2 rounded" style={{ backgroundColor: fgColor }} />
          <div className="w-24 h-1.5 rounded" style={{ backgroundColor: `${fgColor}66` }} />
          <div className="w-10 h-3 rounded mt-2" style={{ backgroundColor: primaryColor }} />
        </div>
      </div>
      
      {/* 標籤 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm">{themeConfig.nameZh}</p>
          <p className="text-xs text-muted-foreground">{themeConfig.name}</p>
        </div>
        {isSelected && (
          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}

