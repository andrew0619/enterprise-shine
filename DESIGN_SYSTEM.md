# 🎨 硬體科技業設計系統 (Hardware Tech Design System)

> 專為 AI 伺服器、算力廠、GPU 設備商打造的企業官網設計規範
> 版本: 1.0.0 | 更新日期: 2026-01-23

---

## 📋 目錄

1. [設計定位](#設計定位)
2. [主題變體](#主題變體)
3. [色彩系統](#色彩系統)
4. [字體規範](#字體規範)
5. [間距系統](#間距系統)
6. [組件規範](#組件規範)
7. [動效規範](#動效規範)
8. [禁止事項](#禁止事項)

---

## 🎯 設計定位

### 目標客群
- AI 伺服器廠商
- GPU 算力服務商 / 數據中心
- 顯卡/晶片相關設備商
- 高效能運算 (HPC) 服務商

### 設計關鍵字
```
✅ 可信賴 | 專業 | 穩重 | 技術實力 | 規模感
❌ 潮流 | 創意爆發 | 實驗性 | 個性張揚
```

### 參考調性
- NVIDIA 官網
- Supermicro
- Dell Technologies
- AWS / GCP 基礎設施頁面

---

## 🎨 主題變體

### Light Mode 系列 (L)

| 代號 | 名稱 | 主色 HSL | 適用場景 |
|------|------|----------|----------|
| L1 | 企業藍 | `214 100% 50%` | 通用、安全牌、金融科技 |
| L2 | 深海藍 | `224 76% 33%` | 更穩重、大型企業、政府 |
| L3 | 科技灰藍 | `215 25% 27%` | 極簡、工程師取向 |

### Dark Mode 系列 (D)

| 代號 | 名稱 | 主色 HSL | 適用場景 |
|------|------|----------|----------|
| D1 | 深空青 | `202 100% 50%` | AI/算力、原 Quantum 風格 |
| D2 | 電光紫藍 | `239 84% 67%` | 稍微現代、GPU 產品線 |
| D3 | 純黑科技 | `217 91% 60%` | NVIDIA 風格、高階感 |

---

## 🌈 色彩系統

### 通用規則
- 主色佔比: 30%（按鈕、連結、重要元素）
- 背景佔比: 60%
- 強調色佔比: 10%（CTA、警告、焦點）

### Light Mode 色板

```css
/* L1 企業藍 */
--l1-primary: 214 100% 50%;        /* #0066FF */
--l1-primary-hover: 214 100% 45%;
--l1-accent: 340 82% 52%;          /* Deep Pink */
--l1-background: 0 0% 100%;
--l1-foreground: 215 25% 27%;
--l1-muted: 210 40% 96%;
--l1-border: 214 32% 91%;

/* L2 深海藍 */
--l2-primary: 224 76% 33%;         /* #1E3A8A */
--l2-primary-hover: 224 76% 28%;
--l2-accent: 199 89% 48%;          /* Cyan accent */
--l2-background: 0 0% 100%;
--l2-foreground: 222 47% 11%;
--l2-muted: 210 40% 96%;
--l2-border: 214 32% 91%;

/* L3 科技灰藍 */
--l3-primary: 215 25% 27%;         /* #334155 */
--l3-primary-hover: 215 25% 22%;
--l3-accent: 217 91% 60%;          /* Blue accent */
--l3-background: 0 0% 100%;
--l3-foreground: 215 28% 17%;
--l3-muted: 210 40% 96%;
--l3-border: 214 32% 91%;
```

### Dark Mode 色板

```css
/* D1 深空青 */
--d1-primary: 202 100% 50%;        /* #00A3FF */
--d1-primary-hover: 202 100% 55%;
--d1-accent: 263 70% 50%;          /* Purple */
--d1-background: 222 47% 2%;       /* Deep Space Navy */
--d1-foreground: 0 0% 100%;
--d1-muted: 215 20% 20%;
--d1-border: 215 20% 25%;
--d1-glow: 202 100% 50% / 0.3;

/* D2 電光紫藍 */
--d2-primary: 239 84% 67%;         /* #6366F1 */
--d2-primary-hover: 239 84% 72%;
--d2-accent: 292 91% 73%;          /* Magenta */
--d2-background: 224 71% 4%;
--d2-foreground: 0 0% 100%;
--d2-muted: 215 20% 15%;
--d2-border: 215 20% 20%;
--d2-glow: 239 84% 67% / 0.3;

/* D3 純黑科技 */
--d3-primary: 217 91% 60%;         /* #3B82F6 */
--d3-primary-hover: 217 91% 65%;
--d3-accent: 263 70% 50%;          /* Purple */
--d3-background: 0 0% 0%;          /* Pure Black */
--d3-foreground: 0 0% 100%;
--d3-muted: 0 0% 10%;
--d3-border: 0 0% 15%;
--d3-glow: 217 91% 60% / 0.3;
```

---

## 📝 字體規範

### 字體家族
```css
/* 主要字體 */
--font-sans: 'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif;

/* 等寬字體（程式碼、技術規格） */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 字體層級

| 層級 | 尺寸 | 字重 | 行高 | 字距 |
|------|------|------|------|------|
| H1 | 48-64px | 700 | 1.1 | -0.025em |
| H2 | 36-48px | 600 | 1.15 | -0.02em |
| H3 | 24-32px | 600 | 1.2 | -0.01em |
| H4 | 20-24px | 500 | 1.3 | 0 |
| Body | 16px | 400 | 1.6 | 0 |
| Small | 14px | 400 | 1.5 | 0 |
| Caption | 12px | 500 | 1.4 | 0.02em |

### 響應式調整
```css
/* 手機 */
@media (max-width: 768px) {
  h1 { font-size: 36px; }
  h2 { font-size: 28px; }
  h3 { font-size: 22px; }
}
```

---

## 📐 間距系統

### 基於 4px 網格
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Section 間距
| 裝置 | Section Padding Y |
|------|-------------------|
| Desktop | 80px - 120px |
| Tablet | 64px - 80px |
| Mobile | 48px - 64px |

### 最大寬度
```css
--max-width-content: 1280px;
--max-width-narrow: 768px;
--max-width-wide: 1440px;
```

---

## 🧩 組件規範

### 按鈕 (Button)

#### 尺寸
| Size | Padding | Font Size | Height |
|------|---------|-----------|--------|
| sm | 8px 16px | 14px | 32px |
| md | 12px 24px | 16px | 44px |
| lg | 16px 32px | 18px | 52px |

#### 圓角選項
```css
--radius-sharp: 4px;    /* 工業感 */
--radius-default: 8px;  /* 平衡 */
--radius-soft: 12px;    /* 稍微友善 */
```

#### 狀態
```css
/* Hover */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.15);

/* Active */
transform: translateY(0);

/* Disabled */
opacity: 0.5;
cursor: not-allowed;
```

### 卡片 (Card)

#### Light Mode 風格
```css
.card-light {
  background: white;
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card-light:hover {
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transform: translateY(-4px);
}
```

#### Dark Mode 風格 (Glassmorphism)
```css
.card-dark {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
}

.card-dark:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 0 30px hsl(var(--primary) / 0.2);
}
```

### 輸入框 (Input)
```css
.input {
  height: 44px;
  padding: 0 16px;
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  transition: all 200ms ease;
}

.input:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
}
```

---

## ✨ 動效規範

### 過渡時間
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easing 曲線
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### 頁面進場動畫
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 使用 */
.animate-in {
  animation: fadeInUp 600ms var(--ease-out) forwards;
}

/* Staggered delay */
.stagger-1 { animation-delay: 100ms; }
.stagger-2 { animation-delay: 200ms; }
.stagger-3 { animation-delay: 300ms; }
```

### Hover 效果標準
```css
/* 按鈕/卡片上浮 */
transform: translateY(-2px);
transition: all 300ms var(--ease-default);

/* Dark Mode Glow */
box-shadow: 0 0 30px hsl(var(--primary) / 0.3);
```

---

## 🚫 禁止事項 (Anti-Patterns)

### 絕對禁止的設計元素

| 類別 | 禁止項目 | 原因 |
|------|----------|------|
| 顏色 | 紫色漸層配白底 | AI 生成特徵，缺乏專業感 |
| 顏色 | 彩虹漸層 | 過於花俏，不適合 B2B |
| 字體 | Arial, Roboto, Helvetica | 太通用，無辨識度 |
| 字體 | Space Grotesk, Poppins | 過度使用於 AI 生成 |
| 佈局 | 完全對稱三欄卡片 | 太公式化 |
| 動效 | 閃爍/跳動動畫 | 不專業 |
| 動效 | 超過 800ms 的過渡 | 感覺遲鈍 |
| 圖示 | 不一致的線寬/風格 | 破壞視覺統一 |

### 設計自檢清單

在產出任何頁面/組件前，確認以下項目：

```
☐ 主色是否為藍色系？
☐ 字體是否使用 Inter / Noto Sans TC？
☐ 按鈕 hover 是否有上浮效果？
☐ 頁面進場是否有動畫？
☐ Dark mode 是否有 glow 效果？
☐ Light mode 是否有細膩陰影？
☐ 間距是否遵循 4px 網格？
☐ 響應式是否正常？
☐ 是否避免了禁止列表中的元素？
```

---

## 📁 檔案結構

```
src/
├── styles/
│   ├── themes/
│   │   ├── light-corporate.css    # L1 企業藍
│   │   ├── light-navy.css         # L2 深海藍
│   │   ├── light-slate.css        # L3 科技灰藍
│   │   ├── dark-cyan.css          # D1 深空青
│   │   ├── dark-indigo.css        # D2 電光紫藍
│   │   └── dark-black.css         # D3 純黑科技
│   ├── base.css                   # 基礎重置和通用樣式
│   └── components.css             # 組件樣式
├── components/
│   └── blocks/                    # 可複用區塊組件
│       ├── hero/
│       ├── features/
│       ├── services/
│       ├── products/
│       ├── testimonials/
│       ├── pricing/
│       ├── team/
│       ├── cta/
│       └── contact/
└── lib/
    └── theme-provider.tsx         # 主題切換邏輯
```

---

## 🔄 版本歷史

| 版本 | 日期 | 變更 |
|------|------|------|
| 1.0.0 | 2026-01-23 | 初始版本，基於 Enterprise Shine + Quantum Horizons |

---

> 💡 **提示**: 這份設計系統專為「保守穩重」的硬體科技業客戶打造。
> 在此區間內做細微變化即可，無需追求創意突破。

