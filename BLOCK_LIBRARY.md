# 🧱 積木組件庫 (Block Component Library)
# Narrative-UI DSL v2.0

這份文件是 AI 編譯器的「詞彙庫」，定義了所有可用的積木及其參數。

---

## 📋 積木總覽

| 分類 | 敘事角色 | 組件 | 位置 |
|------|---------|------|------|
| **Hero** | Attention - 吸引注意 | HeroCenter, HeroSplit, HeroGradient | `/blocks/hero` |
| **Trust** | Interest/Desire - 建立信任 | LogoCloud, StatsRow, Testimonials, TrustBadges | `/blocks/trust` |
| **Features** | Interest - 展示能力 | FeaturesGrid, FeaturesBento, FeaturesAlternating | `/blocks/features` |
| **CTA** | Action - 推動轉換 | CTABanner, ContactForm, Newsletter | `/blocks/cta` |
| **FAQ** | Objection - 處理異議 | FAQAccordion, FAQGrid | `/blocks/faq` |
| **Content** | Support - 內容展示 | SectionHeader, SplitContent, Divider | `/blocks/content` |
| **Layout** | Structure - 頁面骨架 | PageLayout | `/blocks/layout` |

---

## 🎨 共用 Props (所有積木通用)

```typescript
// 背景變體
background?: 'transparent' | 'default' | 'muted' | 'card' | 'dark' | 'glass';

// 間距變體
spacing?: 'compact' | 'default' | 'relaxed';

// 自定義樣式
className?: string;

// 錨點 ID
id?: string;
```

---

## 1️⃣ Hero 積木

### HeroCenter
**用途**: 置中標題，最通用的首屏

```typescript
<HeroCenter
  title="AI 驅動的 GPU 雲端服務"           // 必填
  subtitle="讓您的 AI 模型跑得更快"         // 可選
  description="..."                         // 可選
  primaryCta={{ text: "免費試用", href: "/signup" }}
  secondaryCta={{ text: "了解更多", href: "/about" }}
  badge="NEW"                               // 可選徽章
  height="full" | "large" | "medium"        // 預設 large
  stats={[{ value: "99.9%", label: "Uptime" }]}
  logoCloud={[{ src: "...", alt: "Partner" }]}
  background="transparent"
/>
```

### HeroSplit
**用途**: 左右分割，適合有主視覺圖片時

```typescript
<HeroSplit
  title="..."
  sideImage={{ src: "...", alt: "..." }}    // 右側圖片
  alignment="left"                          // 文字靠左
  // ...其他同 HeroCenter
/>
```

### HeroGradient
**用途**: 漸層背景，強調科技感

```typescript
<HeroGradient
  title="..."
  // ...同 HeroCenter
/>
```

---

## 2️⃣ Trust 積木

### LogoCloud
**用途**: 展示合作夥伴/客戶 Logo

```typescript
<LogoCloud
  logos={[
    { src: "/logos/nvidia.png", alt: "NVIDIA" },
    { src: "/logos/meta.png", alt: "Meta" },
  ]}
  title="受到全球領先企業的信賴"
  variant="static" | "marquee" | "grid"     // marquee = 滾動
  grayscale={true}                          // 是否灰階
  columns={6}                               // grid 模式列數
  background="muted"
/>
```

### StatsRow
**用途**: 展示關鍵數據指標

```typescript
<StatsRow
  stats={[
    { value: "99.9", suffix: "%", label: "Uptime" },
    { value: "10,000", suffix: "+", label: "GPUs" },
    { value: "500", suffix: "ms", label: "延遲" },
  ]}
  variant="simple" | "card" | "highlight"
  columns={3}
  background="transparent"
/>
```

### Testimonials
**用途**: 客戶見證/推薦

```typescript
<Testimonials
  testimonials={[
    {
      quote: "這是我們用過最好的 GPU 服務...",
      author: "John Doe",
      role: "CTO",
      company: "TechCorp",
      avatar: { src: "...", alt: "..." },
    }
  ]}
  title="客戶怎麼說"
  variant="single" | "grid" | "carousel"
  background="muted"
/>
```

### TrustBadges
**用途**: 展示認證徽章

```typescript
<TrustBadges
  badges={[
    { icon: "shield", label: "SOC 2 認證" },
    { icon: "lock", label: "ISO 27001" },
  ]}
  title="企業級安全"
  layout="row" | "grid"
/>
```

---

## 3️⃣ Features 積木

### FeaturesGrid
**用途**: 格狀展示多個功能

```typescript
<FeaturesGrid
  title="為什麼選擇我們"
  features={[
    {
      id: "1",
      iconName: "Cpu",
      title: "高效能運算",
      description: "...",
    }
  ]}
  columns={3}
  background="default"
/>
```

### FeaturesBento
**用途**: Bento Box 風格，視覺更豐富

```typescript
<FeaturesBento
  features={[
    { id: "1", title: "...", size: "large", highlight: true },
    { id: "2", title: "...", size: "medium" },
  ]}
/>
```

### FeaturesAlternating
**用途**: 左右交替排列

```typescript
<FeaturesAlternating
  features={[
    { id: "1", title: "...", image: { src: "...", alt: "..." } },
  ]}
/>
```

---

## 4️⃣ CTA 積木

### CTABanner
**用途**: 呼籲行動橫幅

```typescript
<CTABanner
  title="準備好開始了嗎？"
  subtitle="免費試用 14 天，無需信用卡"
  primaryCta={{ text: "立即開始", href: "/signup" }}
  secondaryCta={{ text: "聯繫銷售", href: "/contact" }}
  variant="simple" | "split" | "gradient" | "image"
  backgroundImage={{ src: "...", alt: "..." }}  // image variant
  background="dark"
/>
```

### ContactForm
**用途**: 聯繫表單

```typescript
<ContactForm
  title="聯繫我們"
  subtitle="我們的團隊會盡快與您聯繫"
  fields={[
    { name: "name", label: "姓名", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
  ]}
  submitText="送出"
  variant="simple" | "detailed" | "inline"
  background="card"
/>
```

### Newsletter
**用途**: 電子報訂閱

```typescript
<Newsletter
  title="訂閱我們的電子報"
  subtitle="獲取最新的產品更新"
  buttonText="訂閱"
  background="muted"
/>
```

---

## 5️⃣ FAQ 積木

### FAQAccordion
**用途**: 手風琴式 FAQ

```typescript
<FAQAccordion
  title="常見問題"
  items={[
    { question: "如何開始？", answer: "..." },
    { question: "價格是多少？", answer: "..." },
  ]}
  variant="simple" | "card" | "bordered"
  maxWidth="lg"
  defaultOpen={true}
  cta={{ text: "還有問題？聯繫我們", href: "/contact" }}
  background="muted"
/>
```

### FAQGrid
**用途**: 多欄 FAQ（問題較多時）

```typescript
<FAQGrid
  title="常見問題"
  items={[...]}
  columns={2}
/>
```

---

## 6️⃣ Content 積木

### SectionHeader
**用途**: 區塊標題

```typescript
<SectionHeader
  badge="FEATURES"
  title="強大的功能"
  subtitle="為企業級 AI 打造"
  alignment="center"
  maxWidth="lg"
/>
```

### SplitContent
**用途**: 左右分割內容

```typescript
<SplitContent
  title="為什麼選擇我們"
  description="..."
  items={["優勢 1", "優勢 2", "優勢 3"]}
  image={{ src: "...", alt: "..." }}
  cta={{ text: "了解更多", href: "/about" }}
  variant="image-left" | "image-right"
/>
```

### Divider
**用途**: 視覺分隔

```typescript
<Divider variant="line" | "dots" | "gradient" | "space" />
```

---

## 7️⃣ Layout 積木

### PageLayout
**用途**: 頁面骨架（🔒 結構鎖定）

```typescript
<PageLayout
  theme="dark-cyan"                         // 主題 ID
  showAnnouncement={true}
  showNav={true}
  showFooter={true}
>
  {/* 內容只能放這裡 */}
  <HeroCenter {...} />
  <LogoCloud {...} />
  <FeaturesGrid {...} />
  <CTABanner {...} />
</PageLayout>
```

**可用主題:**
- `light-corporate` - L1 企業藍
- `light-navy` - L2 深海藍
- `light-slate` - L3 科技灰藍
- `dark-cyan` - D1 深空青
- `dark-indigo` - D2 電光紫藍
- `dark-black` - D3 純黑科技

---

## 🎨 視覺節奏規則

### 背景交替原則 (Zebra Law)

```
✅ 正確: Dark → Glass → Dark → Muted → Dark
✅ 正確: Hero(Dark) → Stats(Glass) → Features(Card) → CTA(Dark)

❌ 錯誤: Dark → Dark → Dark (視覺壓迫)
❌ 錯誤: Muted → Muted → Muted (過於平淡)
```

### 間距標準

| 語境 | spacing prop | 實際值 |
|------|-------------|--------|
| 主要區塊間 | `default` | py-24 (96px) |
| 緊湊區塊 | `compact` | py-16 (64px) |
| 寬鬆區塊 | `relaxed` | py-32 (128px) |

---

## 📌 AIDA 模型建議順序

```
1. [ATTENTION] Hero → 第一印象
2. [TRUST]     LogoCloud / Stats → 即時建立信任
3. [INTEREST]  Features → 展示能力
4. [DESIRE]    Testimonials / CaseStudy → 證明效果
5. [ACTION]    CTA → 轉換
6. [SUPPORT]   FAQ → 處理異議
```

