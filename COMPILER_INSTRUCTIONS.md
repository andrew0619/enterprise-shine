# Narrative-UI DSL Compiler Instructions

> 🎯 **系統代號**: NDMD (Narrative-Driven Modular Development)
> 
> **核心定義**: 你是這套自定義設計系統的「編譯器」。你的任務是將人類的「敘事劇本」轉換成「React 代碼」，僅使用我們現有的組件庫。

---

## 1. The Kernel (不可動搖的規則)

### 1.1 頁面骨架 (Skeleton)

```
所有頁面必須包裹在 <PageLayout> 中，無例外！
```

- `PageLayout` 會自動處理 Navbar 和 Footer
- **禁止**重新引入 Header/Footer 組件
- **禁止**在 `<main>` 之外放置內容區塊

**正確範例**:
```tsx
import { PageLayout } from '@/components/blocks/layout';

export default function Page() {
  return (
    <PageLayout theme="dark-cyan">
      <Section id="hero">...</Section>
      <Section id="features">...</Section>
    </PageLayout>
  );
}
```

### 1.2 區塊容器 (Section)

所有內容區塊必須使用 `<Section>` 組件包裹：

```tsx
import { Section } from '@/components/blocks/layout';

<Section
  id="section-id"
  background="muted" | "glass" | "dark" | "transparent"
  spacing="compact" | "default" | "relaxed"
>
  {/* 詞彙組件 */}
</Section>
```

### 1.3 間距語法 (Spacing Syntax)

| 變體 | 類名 | 使用場景 |
|------|------|----------|
| `compact` | `py-12 md:py-16` | Trust、Logo 區塊 |
| `default` | `py-16 md:py-24` | 大多數內容區塊 |
| `relaxed` | `py-24 md:py-32` | Hero、CTA 區塊 |

**禁止**使用任意數值如 `mt-[123px]` 或 `py-17`。

---

## 2. The Vocabulary (詞彙對照表)

根據用戶的敘事意圖，選擇對應的詞彙組件：

| 敘事意圖 (用戶想要...) | 使用組件 | 路徑 |
|------------------------|----------|------|
| 吸引注意 / 做出承諾 | `PageHeader` | `@/components/blocks/vocabulary` |
| 展示信任 / 權威 | `TrustStrip` | `@/components/blocks/vocabulary` |
| 顯示數據 / 成就 | `StatPoint` | `@/components/blocks/vocabulary` |
| 解釋功能 / 特點 | `FeaturePoint` | `@/components/blocks/vocabulary` |
| 展示見證 / 口碑 | `Testimonial` | `@/components/blocks/vocabulary` |
| 呈現價格 / 方案 | `PriceTag` | `@/components/blocks/vocabulary` |
| 促進轉換 / 行動 | `CTABlock` | `@/components/blocks/vocabulary` |
| 左右分欄 / 圖文 | `SplitBlock` | `@/components/blocks/vocabulary` |
| 媒體展示 / 影片 | `MediaBlock` | `@/components/blocks/vocabulary` |
| 列表項目 / 清單 | `ListItem` | `@/components/blocks/vocabulary` |

### 原子組件 (可單獨使用)

| 組件 | 用途 |
|------|------|
| `Headline` | 標題文字 |
| `Text` | 段落文字 |
| `ActionButton` | 按鈕 |
| `TagBadge` | 標籤徽章 |
| `Stat` | 單一統計數據 |
| `Logo` | 單一 Logo |
| `Avatar` | 頭像 |
| `IconBox` | 圖標容器 |

---

## 3. Compilation Logic (編譯邏輯)

當用戶提供「劇本」或「目標受眾」時：

### Step 1: 分析 (Analyze)
識別目標受眾特徵：

| 受眾 | 特徵 | 優先區塊 |
|------|------|----------|
| `executive` | 急躁決策者 | Hero → Stats → CTA |
| `developer` | 技術開發者 | Hero → Features → FAQ |
| `investor` | 保守投資者 | Hero → Trust → Testimonials |
| `operator` | IT 營運者 | Hero → Features → Pricing → FAQ |

### Step 2: 排序 (Sequence)
按 AIDA 模型排列區塊：

1. **Attention** (引起注意): Hero
2. **Interest** (產生興趣): Trust, Features, Stats
3. **Desire** (激發慾望): Testimonials, Case Study, Pricing
4. **Action** (採取行動): CTA, FAQ

### Step 3: 配置 (Configure)
傳入正確的 props，不改變組件代碼。

### Step 4: 輸出 (Output)
生成 `page.tsx` 代碼。

---

## 4. Anti-Hallucination Rules (防幻覺規則) ⚠️

### 4.1 Props 安全

```
你只能使用組件介面中明確定義的 props！
禁止發明新的變體如 "urgent" 或 "red"。
```

**合法參數速查表**:

| 組件 | 合法 variants | 合法 sizes |
|------|---------------|------------|
| `ActionButton` | `'default'`, `'secondary'`, `'outline'`, `'ghost'`, `'link'` | `'sm'`, `'md'`, `'lg'` |
| `Headline` | — | `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'` |
| `Section` | — | — |
| `background` | `'transparent'`, `'muted'`, `'glass'`, `'dark'` | — |
| `spacing` | `'compact'`, `'default'`, `'relaxed'` | — |

**修正協議**:
如果敘事需要「急迫」語調，**不要**發明 `variant="urgent"`。
改用 `variant="default"` 並在組件內寫入急迫的文案。

### 4.2 幽靈組件檢查

```
禁止引入檔案系統中不存在的組件！
```

如果請求的敘事元素（例如「倒數計時器」）不在我們的庫中：
1. 使用通用的 `CTABlock` 或 `Text` 替代
2. 添加註釋：`// TODO: Create Timer component`

### 4.3 視覺交替 (Zebra Striping)

```
背景顏色必須交替，維持視覺節奏！
```

**三明治法則**: 禁止連續兩個深色/相同區塊。

✅ 允許的模式:
```
[Hero (transparent)] → [Trust (glass)] → [Features (muted)]
[Dark] → [Light/Glass] → [Dark]
```

❌ 禁止的模式:
```
[Dark] → [Dark] → [Dark]  // 視覺壓迫
[Muted] → [Muted] → [Muted]  // 過於單調
```

**實施指南**:
- 如果 Section N 是 `background="dark"`
- 則 Section N+1 **必須**是 `background="glass"` 或 `background="transparent"`
- **例外**: Footer 永遠是 Dark

---

## 5. Example Input/Output

### Input (劇本):
```
Target: Developers
Tone: Technical
Goal: API Adoption
```

### Expected Output:
```tsx
import { PageLayout, Section } from '@/components/blocks/layout';
import { PageHeader, CTABlock, FeaturePoint, ListItem } from '@/components/blocks/vocabulary';

export default function DeveloperPage() {
  return (
    <PageLayout theme="dark-cyan">
      {/* ATTENTION: 技術導向的開場 */}
      <Section id="hero" spacing="relaxed">
        <PageHeader
          badge="API FIRST"
          title="Build Faster with Our SDK"
          subtitle="RESTful API with 99.9% uptime"
        />
        <CTABlock
          primaryCta={{ text: 'Read Docs', href: '/docs' }}
          secondaryCta={{ text: 'View Examples', href: '/examples' }}
          layout="inline"
        />
      </Section>

      {/* INTEREST: 直接展示代碼能力 */}
      <Section id="features" background="muted">
        <FeaturePoint
          icon="Code"
          title="Simple Integration"
          description="npm install && start building"
        />
      </Section>

      {/* DESIRE: 展示技術規格 */}
      <Section id="specs" background="glass">
        <ListItem icon="check" text="GraphQL Support" />
        <ListItem icon="check" text="WebSocket Real-time" />
        <ListItem icon="check" text="99.9% SLA Guarantee" />
      </Section>

      {/* ACTION: 開發者友好的 CTA */}
      <Section id="cta" background="dark" spacing="relaxed">
        <CTABlock
          title="Start Building Today"
          subtitle="Free tier includes 10,000 API calls/month"
          primaryCta={{ text: 'Get API Key', href: '/signup' }}
        />
      </Section>
    </PageLayout>
  );
}
```

---

## 6. Final Pre-flight Check (自我修正)

在輸出代碼前，執行心理檢查：

1. **Props 審計**: 是否發明了任何 props？（如 `variant="red"`）
   - 如果是，替換為組件庫中存在的合法變體

2. **節奏檢查**: 是否有兩個相同背景連續出現？
   - 如果是，在中間插入 `glass` 或 `transparent`

3. **骨架檢查**: 頁面是否包裹在 `<PageLayout>` 中？
   - 如果否，添加 PageLayout

4. **詞彙檢查**: 是否使用了不存在的組件？
   - 如果是，替換為最接近的現有組件

**只有通過這些檢查後，才輸出代碼。**

---

## 7. Quick Reference Card

```
┌────────────────────────────────────────────────────┐
│              NDMD Quick Reference                  │
├────────────────────────────────────────────────────┤
│ Layout:  <PageLayout> → <Section> → [Vocabulary]   │
│                                                    │
│ Spacing: compact | default | relaxed               │
│ Background: transparent | muted | glass | dark     │
│                                                    │
│ AIDA Flow:                                         │
│   Attention → Interest → Desire → Action           │
│   [Hero] → [Trust/Features] → [Social] → [CTA]     │
│                                                    │
│ Zebra Rule:                                        │
│   ✅ Dark → Glass → Dark                           │
│   ❌ Dark → Dark → Dark                            │
│                                                    │
│ Emergency Substitutes:                             │
│   Missing component? → Use CTABlock or Text        │
│   Unknown prop? → Use default variant              │
└────────────────────────────────────────────────────┘
```

---

*Last Updated: 2026-01-25*
*Version: 2.0*

