# 🧱 積木組件庫 (Block Component Library)
# Narrative-UI DSL v2.0

這份文件是 AI 編譯器的「詞彙庫」，定義了所有可用的積木及其參數。

---

## 📐 三層架構

```
┌─────────────────────────────────────────────────────────────┐
│                    積木金字塔架構                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Level 3: Organisms (組織) - 「句子/段落」                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HeroSection, FeatureSection, CTASection, FAQSection│   │
│  │  → 完整的頁面區塊，由分子組成                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↑                                   │
│  Level 2: Molecules (分子) - 「片語」                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  TextGroup, ButtonGroup, StatGroup, LogoGroup,      │   │
│  │  FeatureCard, TestimonialCard                       │   │
│  │  → 由原子組成的功能單元                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↑                                   │
│  Level 1: Atoms (原子) - 「詞」                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Headline, Text, TagBadge, ActionButton, Stat,      │   │
│  │  IconBox, Logo, Avatar                              │   │
│  │  → 最小不可分割的單位                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔬 Level 1: Atoms (原子)

最小不可分割的 UI 單位，每個原子只負責一件事。

### 文字原子

#### Headline
**職責**: 顯示一個標題

```tsx
<Headline
  as="h1" | "h2" | "h3" | "h4"     // HTML 標籤
  size="xl" | "lg" | "md" | "sm"   // 視覺尺寸
  align="left" | "center" | "right"
  animated={true}
>
  AI 驅動的 GPU 雲端服務
</Headline>
```

#### Text
**職責**: 顯示一段文字

```tsx
<Text
  size="sm" | "base" | "lg" | "xl"
  variant="default" | "muted" | "primary" | "inverse"
  align="left" | "center" | "right"
  maxWidth="sm" | "md" | "lg" | "xl" | "none"
>
  讓您的 AI 模型跑得更快
</Text>
```

#### TagBadge
**職責**: 顯示一個小標籤

```tsx
<TagBadge
  variant="default" | "outline" | "primary" | "secondary"
  size="sm" | "md"
>
  NEW
</TagBadge>
```

### 互動原子

#### ActionButton
**職責**: 觸發一個動作或導航

```tsx
<ActionButton
  href="/signup"
  variant="default" | "secondary" | "outline" | "ghost" | "link"
  size="sm" | "md" | "lg"
  icon="arrow" | "external" | "download" | "play" | "none"
  fullWidth={false}
>
  免費試用
</ActionButton>
```

### 數據原子

#### Stat
**職責**: 顯示一個數字指標

```tsx
<Stat
  value="99.9"
  label="Uptime"
  prefix=">"
  suffix="%"
  variant="simple" | "card" | "highlight"
/>
```

### 媒體原子

#### IconBox
**職責**: 顯示一個圖標

```tsx
<IconBox
  name="Cpu"                       // Lucide icon name
  size="xs" | "sm" | "md" | "lg" | "xl"
  withBackground={true}
  backgroundVariant="default" | "primary" | "muted"
/>
```

#### Logo
**職責**: 顯示一個公司 Logo

```tsx
<Logo
  src="/logos/nvidia.png"
  name="NVIDIA"
  href="https://nvidia.com"
  height="sm" | "md" | "lg"
  grayscale={true}
/>
```

#### Avatar
**職責**: 顯示用戶頭像

```tsx
<Avatar
  src="/avatars/john.jpg"
  name="John Doe"
  size="sm" | "md" | "lg" | "xl"
/>
```

---

## 🧬 Level 2: Molecules (分子)

由多個原子組成的功能單元。

### TextGroup
**組合**: Badge + Headline + Text + Text
**職責**: 顯示一組標題文字

```tsx
<TextGroup
  badge="FEATURES"
  title="為什麼選擇我們"
  titleAs="h2"
  titleSize="lg"
  subtitle="企業級 GPU 雲端服務"
  description="詳細描述..."
  align="center"
  maxWidth="lg"
  animated={true}
/>
```

### ButtonGroup
**組合**: ActionButton + ActionButton
**職責**: 顯示一組按鈕

```tsx
<ButtonGroup
  primary={{ text: "免費試用", href: "/signup", icon: "arrow" }}
  secondary={{ text: "了解更多", href: "/about" }}
  direction="row" | "column"
  align="left" | "center" | "right"
  size="md"
/>
```

### StatGroup
**組合**: 多個 Stat 原子
**職責**: 顯示一組統計數據

```tsx
<StatGroup
  stats={[
    { value: "99.9", suffix: "%", label: "Uptime" },
    { value: "10,000", suffix: "+", label: "GPUs" },
  ]}
  columns={2 | 3 | 4}
  variant="simple" | "card" | "highlight"
  title="關鍵指標"
/>
```

### LogoGroup
**組合**: 多個 Logo 原子
**職責**: 顯示一組公司 Logo

```tsx
<LogoGroup
  logos={[
    { src: "/logos/nvidia.png", name: "NVIDIA" },
    { src: "/logos/meta.png", name: "Meta" },
  ]}
  variant="static" | "marquee"
  title="受到全球領先企業的信賴"
  grayscale={true}
  columns={6}
/>
```

### FeatureCard
**組合**: IconBox + Headline + Text + Link
**職責**: 顯示單個功能特色

```tsx
<FeatureCard
  icon="Cpu"
  title="高效能運算"
  description="最新的 NVIDIA GPU..."
  link={{ text: "了解更多", href: "/features/compute" }}
  variant="simple" | "card" | "bordered"
  highlight={false}
/>
```

### TestimonialCard
**組合**: Text (quote) + Avatar + Text (author)
**職責**: 顯示單個客戶見證

```tsx
<TestimonialCard
  quote="這是我們用過最好的 GPU 服務..."
  author="John Doe"
  role="CTO"
  company="TechCorp"
  avatar={{ src: "/avatars/john.jpg", alt: "John" }}
  variant="simple" | "card" | "featured"
/>
```

---

## 🏗️ Level 3: Organisms (組織)

由分子組成的完整頁面區塊。

### Section 容器
**職責**: 包裝任意內容的區塊容器

```tsx
<Section
  background="transparent" | "default" | "muted" | "card" | "dark" | "glass"
  spacing="compact" | "default" | "relaxed"
  id="features"
>
  <TextGroup title="..." />
  <StatGroup stats={...} />
</Section>
```

### HeroSection
**組合**: Section + TextGroup + ButtonGroup + StatGroup? + LogoGroup?

```tsx
<HeroSection
  badge="NEW"
  title="AI 驅動的 GPU 雲端服務"
  subtitle="讓您的 AI 模型跑得更快"
  primaryCta={{ text: "免費試用", href: "/signup" }}
  secondaryCta={{ text: "了解更多", href: "/about" }}
  stats={[...]}          // 可選
  logos={[...]}          // 可選
  variant="center" | "split" | "gradient"
  background="transparent"
/>
```

### FeatureSection
**組合**: Section + TextGroup + FeatureCard[]

```tsx
<FeatureSection
  title="強大的功能"
  subtitle="為企業級 AI 打造"
  features={[
    { icon: "Cpu", title: "...", description: "..." },
  ]}
  layout="grid" | "bento" | "alternating"
  columns={3}
  background="muted"
/>
```

### TrustSection
**組合**: Section + LogoGroup | StatGroup | TestimonialCard[]

```tsx
<TrustSection
  variant="logos" | "stats" | "testimonials"
  title="受到全球領先企業的信賴"
  data={[...]}
  background="glass"
/>
```

### CTASection
**組合**: Section + TextGroup + ButtonGroup

```tsx
<CTASection
  title="準備好開始了嗎？"
  subtitle="免費試用 14 天"
  primaryCta={{ text: "立即開始", href: "/signup" }}
  variant="simple" | "split" | "gradient" | "image"
  background="dark"
/>
```

### FAQSection
**組合**: Section + TextGroup + FAQItem[]

```tsx
<FAQSection
  title="常見問題"
  items={[
    { question: "如何開始？", answer: "..." },
  ]}
  variant="accordion" | "grid"
  background="muted"
/>
```

---

## 📋 組合範例：從詞到句

### 用原子組成分子

```tsx
// 分子 = 原子的組合
<TextGroup>
  ├── <TagBadge>NEW</TagBadge>
  ├── <Headline>AI 驅動的 GPU 雲端服務</Headline>
  ├── <Text>讓您的 AI 模型跑得更快</Text>
  └── <Text>詳細描述...</Text>
</TextGroup>

<ButtonGroup>
  ├── <ActionButton>免費試用</ActionButton>
  └── <ActionButton>了解更多</ActionButton>
</ButtonGroup>
```

### 用分子組成組織

```tsx
// 組織 = 分子的組合
<HeroSection>
  ├── <TextGroup title="..." subtitle="..." />
  ├── <ButtonGroup primary={...} secondary={...} />
  ├── <StatGroup stats={[...]} />
  └── <LogoGroup logos={[...]} />
</HeroSection>
```

### 用組織組成頁面

```tsx
// 頁面 = 組織的排列
<PageLayout theme="dark-cyan">
  <HeroSection ... />
  <TrustSection variant="logos" ... />
  <FeatureSection ... />
  <TrustSection variant="testimonials" ... />
  <CTASection ... />
  <FAQSection ... />
</PageLayout>
```

---

## 🎨 視覺節奏規則

### 背景交替原則 (Zebra Law)

```
✅ 正確: transparent → glass → muted → transparent → dark
✅ 正確: HeroSection → LogoGroup(glass) → FeatureSection(muted) → CTASection(dark)

❌ 錯誤: dark → dark → dark (視覺壓迫)
❌ 錯誤: muted → muted → muted (過於平淡)
```

### 間距標準

| 層級 | spacing prop | 實際值 |
|------|-------------|--------|
| Atom 內部 | - | mb-2, mb-4 |
| Molecule 內部 | - | gap-4, gap-6 |
| Organism 內部 | `default` | py-24 (96px) |
| Organism 之間 | Section 邊界 | 自動 |

---

## 📌 NDMD 劇本範例

```
劇本：針對「急躁的決策者」

[開場 - Attention]
→ HeroSection(variant="center", stats=[ROI數據])
→ 直接用數據說話，不囉嗦

[信任 - Interest]  
→ LogoGroup(variant="marquee", grayscale=true)
→ 大公司都在用

[能力 - Interest]
→ FeatureSection(layout="grid", columns=3)
→ 快速掃過功能

[證明 - Desire]
→ TestimonialCard(variant="featured")
→ 一個強力見證就夠

[轉換 - Action]
→ CTASection(variant="gradient")
→ 強烈的視覺推動

[異議 - Support]
→ FAQSection(variant="accordion")
→ 預先回答常見問題
```

---

## ✅ 檢查清單：積木是否合格？

| 檢查項目 | ✓ |
|---------|---|
| 每個原子只做一件事 | ✓ |
| 分子是原子的組合 | ✓ |
| 組織是分子的組合 | ✓ |
| 所有內容通過 props 傳入 | ✓ |
| TypeScript 類型安全 | ✓ |
| 背景/間距可控 | ✓ |
| 命名語義化 | ✓ |
