# 📖 通用詞彙字典 (Vocabulary Dictionary)
# Narrative-UI DSL v2.0

詞彙是原子的**有意義組合**，是網站設計中反覆出現的「最小有意義單位」。

---

## 📐 層級關係

```
┌─────────────────────────────────────────────────────────────┐
│                    語言比喻                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Atoms (原子)      = 字母 (a, b, c)                          │
│  ↓                                                          │
│  Vocabulary (詞彙) = 單詞 (apple, run, happy) ← 這層！       │
│  ↓                                                          │
│  Molecules (分子)  = 片語 (red apple, runs fast)            │
│  ↓                                                          │
│  Organisms (組織)  = 句子 (The red apple falls fast.)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**關鍵洞察**：原子單獨存在沒有意義（如單個 `Headline`），但詞彙是有意義的最小單位。

---

## 📚 10 個核心詞彙

### 1️⃣ PageHeader - 頁面標題
**組合**：Badge? + Headline + Subtitle? + Description?
**用途**：每個區塊的開頭

```tsx
<PageHeader
  badge="NEW"
  title="AI 驅動的 GPU 雲端服務"
  subtitle="讓您的 AI 模型跑得更快"
  description="詳細描述..."
  align="center"
  maxWidth="lg"
  animated
/>
```

**出現場景**：
- 首頁 Hero 區塊
- 功能區塊開頭
- 定價頁開頭
- 任何需要標題的地方

---

### 2️⃣ CTABlock - 行動呼籲
**組合**：Headline + Text? + ButtonGroup
**用途**：推動用戶採取行動

```tsx
<CTABlock
  title="準備好開始了嗎？"
  subtitle="免費試用 14 天，無需信用卡"
  primaryButton={{ text: "立即開始", href: "/signup" }}
  secondaryButton={{ text: "聯繫銷售", href: "/contact" }}
  align="center"
/>
```

**出現場景**：
- 頁面底部 CTA
- Hero 區塊的按鈕區
- 任何需要轉換的地方

---

### 3️⃣ FeaturePoint - 功能點
**組合**：IconBox + Headline + Text + Link?
**用途**：展示單個功能/優勢

```tsx
<FeaturePoint
  icon="Cpu"
  title="高效能運算"
  description="最新的 NVIDIA GPU，優化的軟體堆疊"
  link={{ text: "了解更多", href: "/features/compute" }}
  variant="card"
/>
```

**出現場景**：
- 功能網格中的每一項
- 產品優勢列表
- 服務說明

---

### 4️⃣ StatPoint - 統計點
**組合**：IconBox? + Stat + Text?
**用途**：展示關鍵數據指標

```tsx
<StatPoint
  icon="TrendingUp"
  value="99.9"
  suffix="%"
  label="Uptime"
  description="企業級穩定性"
  variant="icon-card"
/>
```

**出現場景**：
- 數據展示區
- 案例研究的成果
- Hero 區塊的關鍵指標

---

### 5️⃣ Testimonial - 客戶見證
**組合**：Quote + Avatar + AuthorInfo
**用途**：建立信任

```tsx
<Testimonial
  quote="這是我們用過最好的 GPU 服務..."
  author="Sarah Chen"
  role="CTO"
  company="TechCorp AI"
  avatar="/avatars/sarah.jpg"
  variant="featured"
/>
```

**出現場景**：
- 見證區塊
- 案例研究
- 落地頁

---

### 6️⃣ PriceTag - 價格標籤
**組合**：Badge? + Name + Price + Description + Button
**用途**：定價卡片

```tsx
<PriceTag
  badge="最受歡迎"
  name="NVIDIA H100"
  price="$2.10"
  unit="/ GPU-hour"
  description="最佳性價比..."
  ctaText="立即開始"
  ctaHref="/contact"
  featured
/>
```

**出現場景**：
- 定價頁
- 產品比較

---

### 7️⃣ MediaBlock - 媒體區塊
**組合**：Image + Overlay? + PlayButton? + Caption?
**用途**：圖片/影片展示

```tsx
<MediaBlock
  src="/images/demo.jpg"
  alt="產品演示"
  isVideo
  caption="觀看完整演示"
  aspectRatio="16:9"
  rounded="2xl"
/>
```

**出現場景**：
- 案例研究的視覺
- 產品展示
- 背景媒體

---

### 8️⃣ TrustStrip - 信任標語
**組合**：Text + LogoGroup
**用途**：快速建立信任

```tsx
<TrustStrip
  text="受到全球領先企業的信賴"
  logos={[
    { src: "/logos/nvidia.png", name: "NVIDIA" },
    { src: "/logos/meta.png", name: "Meta" },
  ]}
  variant="marquee"
  grayscale
/>
```

**出現場景**：
- Hero 區塊下方
- 頁面底部
- 任何需要社會證明的地方

---

### 9️⃣ SplitBlock - 左右分割
**組合**：ContentSide + MediaSide
**用途**：圖文並排

```tsx
<SplitBlock
  title="為什麼選擇我們"
  subtitle="企業級解決方案"
  descriptions={[
    "第一段描述...",
    "第二段描述...",
  ]}
  button={{ text: "了解更多", href: "/about" }}
  media={{ src: "/images/product.jpg", alt: "產品圖" }}
  mediaPosition="right"
/>
```

**出現場景**：
- 產品介紹
- 案例研究
- 功能詳細說明

---

### 🔟 ListItem - 列表項目
**組合**：Icon? + Text
**用途**：列表中的單項

```tsx
<ListItem
  checkmark
  text="99.9% Uptime SLA"
  variant="simple"
/>
```

**出現場景**：
- 功能清單
- 優勢列表
- 定價卡片內的功能

---

## 🎯 詞彙組合模式

### 模式 A：Hero 區塊
```
┌─────────────────────────────────────────┐
│  PageHeader(badge, title, subtitle)     │
│  CTABlock(buttons)                      │
│  TrustStrip(logos)                      │
└─────────────────────────────────────────┘
```

### 模式 B：功能區塊
```
┌─────────────────────────────────────────┐
│  PageHeader(title, subtitle)            │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │Point│ │Point│ │Point│  ← FeaturePoint│
│  └─────┘ └─────┘ └─────┘               │
└─────────────────────────────────────────┘
```

### 模式 C：案例研究
```
┌─────────────────────────────────────────┐
│  SplitBlock                             │
│  ├─ Left: MediaBlock(video)             │
│  │         Testimonial(quote)           │
│  └─ Right: PageHeader(title)            │
│            StatPoint × 2                │
└─────────────────────────────────────────┘
```

### 模式 D：定價區塊
```
┌─────────────────────────────────────────┐
│  PageHeader(title, subtitle)            │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │Price│ │Price│ │Price│  ← PriceTag   │
│  └─────┘ └─────┘ └─────┘               │
└─────────────────────────────────────────┘
```

### 模式 E：CTA 區塊
```
┌─────────────────────────────────────────┐
│  CTABlock(title, subtitle, buttons)     │
│  TrustStrip(badges)                     │
└─────────────────────────────────────────┘
```

---

## 📝 使用範例：組合一個完整頁面

```tsx
import {
  // 詞彙
  PageHeader,
  CTABlock,
  FeaturePoint,
  StatPoint,
  Testimonial,
  TrustStrip,
  
  // 容器
  Section,
} from '@/components/blocks';

export function LandingPage() {
  return (
    <PageLayout theme="dark-cyan">
      {/* Hero */}
      <Section spacing="relaxed">
        <PageHeader
          badge="NEW"
          title="AI 驅動的 GPU 雲端服務"
          subtitle="讓您的 AI 模型跑得更快"
          align="center"
          animated
        />
        <CTABlock
          title=""
          primaryButton={{ text: "免費試用", href: "/signup" }}
          secondaryButton={{ text: "觀看演示", href: "/demo" }}
          align="center"
        />
      </Section>

      {/* Trust */}
      <Section background="glass" spacing="compact">
        <TrustStrip
          text="受到全球領先企業的信賴"
          logos={logos}
          variant="marquee"
        />
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-4 gap-8">
          <StatPoint value="99.9" suffix="%" label="Uptime" />
          <StatPoint value="10,000" suffix="+" label="GPUs" />
          <StatPoint value="500" suffix="ms" label="延遲" />
          <StatPoint value="24/7" label="支援" />
        </div>
      </Section>

      {/* Features */}
      <Section background="muted">
        <PageHeader
          title="強大的功能"
          subtitle="為企業級 AI 打造"
          align="center"
        />
        <div className="grid grid-cols-3 gap-8 mt-12">
          <FeaturePoint icon="Cpu" title="..." description="..." variant="card" />
          <FeaturePoint icon="Zap" title="..." description="..." variant="card" />
          <FeaturePoint icon="Shield" title="..." description="..." variant="card" />
        </div>
      </Section>

      {/* Testimonial */}
      <Section>
        <Testimonial
          quote="這是我們用過最好的 GPU 服務..."
          author="Sarah Chen"
          role="CTO"
          company="TechCorp AI"
          variant="featured"
        />
      </Section>

      {/* CTA */}
      <Section background="dark">
        <CTABlock
          title="準備好開始了嗎？"
          subtitle="免費試用 14 天"
          primaryButton={{ text: "立即開始", href: "/signup" }}
          align="center"
        />
      </Section>
    </PageLayout>
  );
}
```

---

## ✅ 詞彙系統檢查清單

| 檢查項目 | ✓ |
|---------|---|
| 每個詞彙是有意義的最小單位 | ✓ |
| 詞彙可以自由組合成區塊 | ✓ |
| 所有內容通過 props 傳入 | ✓ |
| 命名反映用途，不是結構 | ✓ |
| 覆蓋了網站設計的常見模式 | ✓ |
| TypeScript 類型安全 | ✓ |

