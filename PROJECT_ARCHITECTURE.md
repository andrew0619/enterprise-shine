# PROJECT_ARCHITECTURE.md

## 🗺️ Enterprise-Shine 專案深度結構分析報告

**分析日期**: 2026-01-23  
**分析者**: Cursor AI Agent  
**專案類型**: Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui  
**框架**: 非 Next.js，使用 React Router DOM  

---

## 1. 📄 Page Structure (頁面結構)

### 路由總覽 (來自 `src/App.tsx`)

| 路徑 | 頁面組件 | 用途描述 |
|------|----------|----------|
| `/` | `Index.tsx` | 首頁 - 展示 Hero、產品介紹、客戶案例、FAQ、CTA |
| `/products` | `Products.tsx` | 產品總覽頁面 |
| `/products/gpu-compute` | `GPUCompute.tsx` | GPU 雲端運算服務介紹 |
| `/products/cluster-engine` | `ClusterEngine.tsx` | 集群引擎產品頁 |
| `/products/inference-engine` | `InferenceEngine.tsx` | 推論引擎產品頁 |
| `/products/model-library` | `ModelLibrary.tsx` | AI 模型庫頁面 |
| `/gpus/h200` | `GPUH200.tsx` | NVIDIA H200 GPU 產品頁 |
| `/gpus/gb200` | `GPUGB200.tsx` | NVIDIA GB200 GPU 產品頁 |
| `/gpus/hgx-b200` | `GPUHGXB200.tsx` | NVIDIA HGX B200 系統頁 |
| `/solutions` | `Solutions.tsx` | 解決方案頁面 |
| `/pricing` | `Pricing.tsx` | 定價頁面 |
| `/developers/demo-apps` | `DemoApps.tsx` | 開發者示範應用 |
| `/developers/docs-hub` | `DocsHub.tsx` | 開發者文檔入口 |
| `/docs` | `Docs.tsx` | 技術文檔頁面 |
| `/about` | `About.tsx` | 關於我們 |
| `/blog` | `Blog.tsx` | 部落格 |
| `/partners` | `Partners.tsx` | 合作夥伴 |
| `/careers` | `Careers.tsx` | 職缺頁面 |
| `/studio` | `Studio.tsx` | AI Studio 創作工具 |
| `/contact` | `Contact.tsx` | 聯繫我們 |
| `*` | `NotFound.tsx` | 404 錯誤頁面 |

**總計: 21 個路由頁面**

---

## 2. 🧩 Global Elements (全局元素)

### ✅ 已正確模組化的全局組件

#### Layout 組件 (`src/components/layout/Layout.tsx`)
```
位置: src/components/layout/Layout.tsx
結構:
├── AnnouncementBar (公告欄)
├── Header (導航欄)
├── <main>{children}</main>
└── Footer (頁腳)
```

**確認**: Layout 組件已正確封裝，所有頁面都透過 `<Layout>` 包裹內容。

---

#### Navbar/Header (`src/components/layout/Header.tsx`)
```
位置: src/components/layout/Header.tsx
行數: 505 行
特徵:
- sticky top-0 z-50 (固定在頂部)
- 包含 Logo、桌面導航、語言切換、登入/CTA 按鈕
- 包含移動端 Sheet 選單 (isMobileMenuOpen state)
- 使用 useScrolled 狀態控制陰影
- 完整的 i18n 國際化支持
```

**狀態**: ✅ 已正確模組化為獨立組件

---

#### Footer (`src/components/layout/Footer.tsx`)
```
位置: src/components/layout/Footer.tsx
行數: 164 行
特徵:
- bg-foreground text-background (深色背景)
- 包含 Logo、地址、社交連結、電子報訂閱
- 三欄式導航連結
- 合規徽章 (SOC 2, SGS, AICPA)
- 版權與政策連結
```

**狀態**: ✅ 已正確模組化為獨立組件

---

#### AnnouncementBar (`src/components/layout/AnnouncementBar.tsx`)
```
位置: src/components/layout/AnnouncementBar.tsx
行數: 35 行
特徵:
- 可關閉的公告欄 (isVisible state)
- bg-announcement (自定義背景色)
- 包含關閉按鈕
```

**狀態**: ✅ 已正確模組化為獨立組件

---

## 3. 🔄 Implicit Components & Patterns (隱式組件與重複模式)

### ✅ 已良好模組化的模式

| 模式名稱 | 出現次數 | 組件位置 | 狀態 |
|----------|----------|----------|------|
| Hero Section | 10+ | 各頁面專屬 Hero 組件 | ✅ 已模組化 |
| FAQ Section | 6+ | `FAQSection.tsx` + 各頁面專屬版本 | ✅ 已模組化 |
| CTA Banner | 8+ | `CTASection.tsx` + 各頁面專屬版本 | ✅ 已模組化 |
| Feature Card | 10+ | 使用 shadcn/ui Card | ✅ 已模組化 |
| Pricing Card | 3 | `PricingGPUCards.tsx` | ✅ 已模組化 |

### ⚠️ 可優化的重複模式

#### 1. Page Header Pattern (頁面標題模式)
**發現位置**: `Pricing.tsx`, 以及其他頁面
**重複代碼**:
```tsx
<section className="py-16 md:py-20 bg-background">
  <div className="container">
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
        {t("pricing.title")}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {t("pricing.subtitle")}
      </p>
    </div>
  </div>
</section>
```
**建議**: 可抽取為 `<PageHeader title="" subtitle="" />` 組件

#### 2. Section Wrapper Pattern (區塊包裝模式)
**重複代碼**:
```tsx
<section className="py-20 md:py-24 bg-secondary/30">
  <div className="container max-w-3xl">
    ...
  </div>
</section>
```
**狀態**: 已通過不同的組件分散處理，但間距值不一致

---

## 4. 🏷️ Semantic Issues (語義問題)

### ⚠️ 需要關注的語義問題

#### 4.1 Header.tsx 語義正確
```tsx
// 第 96-100 行
<header className={cn(
  "sticky top-0 z-50 w-full...",
  ...
)}>
```
**狀態**: ✅ 正確使用 `<header>` 標籤

#### 4.2 Footer.tsx 語義正確
```tsx
// 第 50 行
<footer className="bg-foreground text-background">
```
**狀態**: ✅ 正確使用 `<footer>` 標籤

#### 4.3 Navigation 語義正確
```tsx
// Header.tsx 第 112 行
<nav className="hidden md:flex items-center gap-8">
```
**狀態**: ✅ 正確使用 `<nav>` 標籤

#### 4.4 Main Content 語義正確
```tsx
// Layout.tsx 第 15 行
<main className="flex-1">{children}</main>
```
**狀態**: ✅ 正確使用 `<main>` 標籤

#### 4.5 Section 標籤使用
**狀態**: ✅ 大部分頁面區塊都正確使用 `<section>` 標籤

### ⚠️ 潛在問題

#### 4.6 AnnouncementBar 建議
```tsx
// 當前使用 <div>
<div className="bg-announcement text-announcement-foreground py-2.5 px-4">
```
**建議**: 可考慮使用 `<aside role="banner">` 或保持 `<div>` (因為語義上它不是主要內容)

---

## 5. 📊 Component Hierarchy (組件層級結構)

```
App.tsx
├── QueryClientProvider
├── TooltipProvider
├── Toaster (x2)
└── BrowserRouter
    └── Routes
        └── Route → Page Component
                    └── Layout
                        ├── AnnouncementBar
                        ├── Header
                        │   ├── Logo
                        │   ├── DesktopNav (DropdownMenus)
                        │   ├── LanguageSwitcher
                        │   ├── LoginLink
                        │   ├── ContactButton
                        │   └── MobileMenu (Sheet)
                        ├── <main>
                        │   └── {Page Sections}
                        └── Footer
                            ├── Logo & Address
                            ├── SocialLinks
                            ├── Newsletter
                            ├── NavColumns
                            ├── ComplianceBadges
                            └── BottomBar
```

---

## 6. 🌐 Internationalization (國際化)

**i18n 配置**: `src/i18n.ts`

### 支援語言
| 語言代碼 | 語言名稱 | 翻譯檔案 |
|----------|----------|----------|
| `en` | English | `src/locales/en.json` |
| `zh-TW` | 繁體中文 | `src/locales/zh-TW.json` |
| `ja` | 日本語 | (Header 中定義但無檔案) |
| `ko` | 한국어 | (Header 中定義但無檔案) |

**狀態**: ✅ 核心 i18n 架構完整，但 `ja` 和 `ko` 語言檔案缺失

---

## 7. 📁 Component Organization (組件組織)

```
src/components/
├── layout/          # ✅ 全局布局組件 (4 個)
│   ├── AnnouncementBar.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Layout.tsx
├── ui/              # ✅ shadcn/ui 組件 (49 個)
├── sections/        # ✅ 首頁通用區塊 (8 個)
├── home/            # ✅ 首頁專用組件 (2 個)
├── about/           # ✅ About 頁面組件 (8 個)
├── blog/            # ✅ Blog 頁面組件 (3 個)
├── careers/         # ✅ Careers 頁面組件 (4 個)
├── cluster/         # ✅ Cluster 頁面組件 (5 個)
├── developers/      # ✅ Developers 頁面組件 (4 個)
├── docs/            # ✅ Docs 頁面組件 (5 個)
├── gb200/           # ✅ GB200 頁面組件 (6 個)
├── gpu/             # ✅ GPU 頁面組件 (6 個)
├── h200/            # ✅ H200 頁面組件 (6 個)
├── hgxb200/         # ✅ HGX-B200 頁面組件 (6 個)
├── inference/       # ✅ Inference 頁面組件 (6 個)
├── models/          # ✅ Models 頁面組件 (5 個)
├── partners/        # ✅ Partners 頁面組件 (6 個)
├── pricing/         # ✅ Pricing 頁面組件 (4 個)
├── studio/          # ✅ Studio 頁面組件 (6 個)
└── NavLink.tsx      # 單獨的導航連結組件
```

**總計**: ~130+ 個組件，組織結構良好

---

## 8. ✅ Architecture Assessment (架構評估)

### 優點 ✅

1. **模組化程度高**: Layout、Header、Footer 已正確分離
2. **組件組織清晰**: 按頁面/功能分類到對應資料夾
3. **語義標籤正確**: `<header>`, `<footer>`, `<nav>`, `<main>`, `<section>` 使用正確
4. **國際化完整**: i18n 架構完整，支援語言切換
5. **UI 組件庫**: 使用 shadcn/ui，組件一致性高
6. **狀態管理**: 使用 React Query 進行伺服器狀態管理
7. **TypeScript**: 完整的類型支援

### 可改進項目 ⚠️

1. **Page Header 重複**: 可抽取為共用組件
2. **語言檔案不完整**: `ja` 和 `ko` 語言檔案缺失
3. **Section 間距不一致**: `py-16`, `py-20`, `py-24` 混用
4. **部分硬編碼文字**: AnnouncementBar 中的英文文字未使用 i18n

---

## 9. 🎯 Ready for Refactoring

### 確認清單

- [x] Layout 結構已理解 (`Layout.tsx`)
- [x] Navbar 位置已確認 (`Header.tsx`, 505 行)
- [x] Footer 位置已確認 (`Footer.tsx`, 164 行)
- [x] Hero Section 模式已識別 (各頁面專屬)
- [x] FAQ Section 模式已識別 (通用 + 專屬版本)
- [x] CTA Section 模式已識別 (通用 + 專屬版本)
- [x] 語義標籤已驗證 (正確)
- [x] i18n 架構已理解

---

## 10. 📝 結論

**此專案架構評分: 9/10**

這是一個**架構良好、模組化程度高**的 React 專案。主要的全局元素 (Header, Footer, Layout) 已正確分離，不需要大規模重構。

**可以安全進行的操作**:
1. 添加新頁面組件
2. 修改現有組件樣式
3. 擴展 i18n 翻譯
4. 添加新的 UI 組件

**需要謹慎的操作**:
1. 修改 `Header.tsx` 的導航邏輯 (包含複雜的移動端狀態)
2. 修改 `Layout.tsx` 的結構 (影響所有頁面)

---

## 11. 🔧 Modular Template System (模組化模板系統)

### 2026-01-23 重構完成

經過四階段的外科手術式重構，專案現在具備完整的模組化模板系統：

### 新增文件結構

```
src/
├── config/
│   └── site-config.ts          # 🎛️ 功能開關與設定中樞
├── content/
│   ├── index.ts                # 內容層統一入口
│   ├── home.ts                 # 首頁內容配置
│   └── pricing.ts              # 定價頁內容配置
└── components/ui/
    ├── section-header.tsx      # 通用區塊標題組件
    ├── feature-card.tsx        # 通用特色卡片組件
    └── page-header.tsx         # 通用頁面標題組件
```

### 功能開關使用方式

```typescript
// src/config/site-config.ts
export const siteConfig = {
  features: {
    blog: true,      // 設為 false 隱藏 Blog 連結
    careers: true,   // 設為 false 隱藏 Careers 連結
    partners: true,  // 設為 false 隱藏 Partners 連結
    docs: true,      // 設為 false 隱藏 Docs 連結
  },
  navigation: {
    showLanguageSwitcher: true,  // 設為 false 隱藏語言切換器
    showLogin: true,             // 設為 false 隱藏登入按鈕
    showContactSales: true,      // 設為 false 隱藏 CTA 按鈕
    showAnnouncementBar: true,   // 設為 false 隱藏公告欄
  },
};
```

### 快速換皮流程

1. **換品牌**: 修改 `siteConfig.branding`
2. **關功能**: 設定 `siteConfig.features.xxx = false`
3. **改內容**: 編輯 `content/home.ts` 或 `content/pricing.ts`
4. **改文字**: 編輯 `locales/en.json` 或 `locales/zh-TW.json`

### 組件使用範例

```tsx
// 使用 PageHeader 組件
import { PageHeader } from "@/components/ui/page-header";

<PageHeader
  title={t("pricing.title")}
  subtitle={t("pricing.subtitle")}
  variant="gradient"
  spacing="lg"
/>

// 使用 FeatureCard 組件
import { FeatureCard } from "@/components/ui/feature-card";

<FeatureCard
  title="Fast Inference"
  description="Low latency model serving"
  icon={Zap}
  href="/products/inference"
  linkText="Learn more"
  badge="New"
/>
```

---

*此報告由 Cursor AI Agent 自動生成，用於專案重構前的架構理解確認。*
*最後更新: 2026-01-23 - 完成四階段模組化重構*

