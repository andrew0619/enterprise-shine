

# 首頁 Hero Banner 高品質重新生成計畫

## 目標

生成一張全新的高品質 3D 方塊 Banner 圖片來替換現有的 `hero-cubes.png`，用於首頁主視覺區域。

## 現有圖片分析

**目前圖片特徵：**
- 三個 3D 金屬質感方塊並排
- 深藍/銀灰色調的金屬光澤
- 分別標示：「GPUs」、「AI/ML Ops」、「Inference」
- 白色背景，乾淨的企業風格
- 尺寸約 1200px 寬的橫幅格式

## 生成方案

使用 AI 圖片生成工具 (Nano banana pro) 創建一張全新的高品質 Banner：

**生成提示詞設計：**
```
Three premium 3D metallic cubes arranged side by side on a clean white background. 
Left cube: silver-blue metallic finish with "GPUs" text. 
Center cube: darker navy blue metallic with "AI/ML Ops" text. 
Right cube: medium blue-grey metallic with "Inference" text. 
Soft studio lighting, photorealistic rendering, enterprise technology aesthetic, 
subtle reflections and highlights, professional product photography style.
16:9 landscape aspect ratio.
```

## 實施步驟

### 步驟 1: 生成新圖片
- 使用 `google/gemini-3-pro-image-preview` 模型生成高品質圖片
- 寬高比設定為 16:9（橫幅格式）
- 風格保持與現有設計系統一致的企業科技感

### 步驟 2: 替換現有圖片
- 將生成的圖片保存到 `src/assets/home/hero-cubes.png`
- 覆蓋原有檔案，無需修改任何程式碼

### 步驟 3: 驗證效果
- 確認首頁正確載入新圖片
- 檢查圖片品質和顯示效果

## 預期成果

- 全新的高品質 3D 渲染圖片
- 保持原有的三方塊概念（GPUs、AI/ML Ops、Inference）
- 更精緻的金屬質感和光影效果
- 與網站整體設計風格一致

---

**技術細節：**
- 檔案位置：`src/assets/home/hero-cubes.png`
- 使用組件：`src/components/sections/HeroSection.tsx`
- 圖片格式：PNG（保持透明度兼容性）

