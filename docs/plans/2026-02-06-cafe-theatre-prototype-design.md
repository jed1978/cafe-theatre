# 咖啡小劇場 - 原型設計文件

**日期：** 2026-02-06
**類型：** 原型驗證
**目標：** 驗證視覺風格、互動體驗與使用者流程

---

## 專案概述

建構「咖啡小劇場」一頁式咖啡豆銷售網站的原型，重點驗證：
- **視覺風格**：極簡現代劇場風格、黑底白字、聚光燈效果
- **互動體驗**：滾動動效、Modal、商品卡片 hover
- **資訊架構**：從瀏覽商品到下單的完整流程

---

## 技術架構

### 技術選型

**前端技術：**
- HTML5 語義化標籤
- CSS3 + CSS Custom Properties
- Vanilla JavaScript (ES6 Modules)
- Intersection Observer API

**部署：**
- Vercel 靜態部署
- 無後端、不串金流
- 表單僅前端驗證（原型階段）

### 檔案結構

```
cafe-theatre/
├── index.html                 # 單頁應用主檔
├── css/
│   ├── reset.css             # CSS Reset
│   ├── variables.css         # 設計系統變數
│   ├── base.css              # 全域樣式
│   ├── layout.css            # 區塊佈局
│   ├── components.css        # 可重用元件
│   └── animations.css        # 動畫定義
├── js/
│   ├── main.js               # 初始化入口
│   ├── data.js               # 商品資料
│   ├── navigation.js         # 導覽列與購物車
│   ├── products.js           # 商品渲染與 Modal
│   ├── scroll-animations.js  # 滾動動效
│   └── form.js               # 表單驗證
├── assets/
│   ├── images/               # 圖片資源
│   └── icons/                # SVG icons
└── docs/
    └── plans/                # 設計文件
```

### 載入策略

1. **CSS 載入順序：** reset → variables → base → layout → components → animations
2. **JS 模組化：** 所有 script 使用 `type="module"`，main.js 作為入口點
3. **資源優化：** 圖片 lazy loading、字體 preload

---

## 設計系統

### 色彩計畫

```css
--primary-black: #0A0A0A        /* 主背景 - 深邃舞台 */
--primary-white: #F5F5F0        /* 主文字 - 聚光燈下的白 */
--accent-gray: #2A2A2A          /* 卡片/區塊背景 */
--mid-gray: #888888             /* 次要文字 */
--highlight: #FFFFFF            /* 強調元素 - 純白聚光 */
--subtle-warm: #C8B8A2          /* 點綴色 - 咖啡溫度 */
--divider: #333333              /* 分隔線 */
```

### 字體系統

```css
--font-display: 'Playfair Display', 'Noto Serif TC', serif;
--font-body: 'Inter', 'Noto Sans TC', sans-serif;
```

**流體字級（使用 clamp）：**
- H1 (Hero)：`clamp(3rem, 8vw, 6rem)`
- H2 (區塊標題)：`clamp(2rem, 5vw, 3.5rem)`
- Body：`clamp(1rem, 2vw, 1.125rem)`

### 間距系統

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 2rem;     /* 32px */
--space-lg: 4rem;     /* 64px */
--space-xl: 8rem;     /* 128px */
```

---

## 原型範圍

### 包含區塊

1. **Hero 主視覺區**
   - 全螢幕高度
   - 品牌名稱大字居中
   - 聚光燈滑鼠追蹤效果
   - 向下滾動提示

2. **品牌故事區**
   - 左右分欄佈局（桌面）
   - 品牌理念文字 + 意象圖片
   - 細線框裝飾

3. **商品展示區**
   - 6 款精心設計的虛構商品
   - Grid 佈局（桌面 3 欄）
   - 商品卡片 hover 效果
   - 點擊開啟 Modal 詳情

4. **訂購流程說明區**
   - 3-4 步驟水平流程圖
   - 圓形 icon + 標題 + 說明

5. **訂購表單區**
   - 自訂 UI 設計
   - 即時驗證
   - 提交成功動畫（不串接後端）

### 簡化功能

- **購物車**：簡化為計數器 + 滾動到表單（不實作側邊欄）
- **響應式**：僅實作桌面（1024px+）和手機（<768px）兩個斷點
- **表單提交**：僅前端驗證和 UI 回饋，不送出資料

---

## 核心元件設計

### 1. 導覽列 (Navigation)

**結構：**
- Logo（左側）
- 錨點連結（中間）：品牌故事、本季劇目、訂購
- 購物車計數器（右側）

**互動：**
- 初始透明，滾動 100px 後背景轉為 `rgba(10, 10, 10, 0.95)`
- 平滑滾動到對應區塊
- 購物車計數從 sessionStorage 讀取

### 2. Hero 聚光燈效果

**實作：**
- CSS radial-gradient 背景
- 監聽 mousemove，更新 CSS Custom Property
- requestAnimationFrame 優化效能

```css
.hero {
  background:
    radial-gradient(
      circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    var(--primary-black);
}
```

### 3. 商品卡片 (Product Card)

**互動狀態：**
- Default：灰底 (#2A2A2A) + 細白框
- Hover：微放大 (scale: 1.02)、框線加粗、陰影增強
- 點擊：觸發 Modal

**資料結構：**
```javascript
{
  id: 1,
  name: "倫敦西區",
  series: "城市系列",
  flavor: "檸檬、白花、佛手柑",
  roast: "淺焙",
  origin: "衣索比亞 耶加雪菲",
  price: 420,
  image: "placeholder.jpg",
  description: "經典永不落幕，如同西區的音樂劇"
}
```

### 4. Modal

**功能：**
- 大圖展示 + 完整商品資訊
- 風味筆記、烘焙度指示器、產區
- 商品故事
- 加入選購按鈕

**關閉方式：**
- X 按鈕
- 點擊遮罩
- ESC 鍵

**動畫：**
```css
/* 進場動畫 */
.modal.is-open .modal__content {
  transform: scale(1);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 商品資料設計

### 城市系列（3 款）

1. **倫敦西區** - 衣索比亞 耶加雪菲，淺焙 / $420
   - 風味：檸檬、白花、佛手柑
   - 故事：經典永不落幕，如同西區的音樂劇

2. **百老匯** - 哥倫比亞 慧蘭，中焙 / $360
   - 風味：焦糖、堅果、黑巧克力
   - 故事：華麗而均衡，百老匯的黃金年代

3. **巴黎左岸** - 瓜地馬拉 安提瓜，中深焙 / $380
   - 風味：莓果、紅酒、煙燻
   - 故事：文人的咖啡館，存在主義的餘韻

### 劇作家系列（3 款）

4. **莎士比亞** - 肯亞 AA，中焙 / $360
   - 風味：黑醋栗、葡萄柚、蜂蜜
   - 故事：悲喜交織，層次豐富

5. **契訶夫** - 巴西 喜拉朵，中深焙 / $380
   - 風味：榛果、奶油、可可
   - 故事：日常的詩意，溫柔而深刻

6. **貝克特** - 印尼 曼特寧，深焙 / $380
   - 風味：雪松、香料、黑糖
   - 故事：等待的藝術，濃郁而內斂

---

## 資料流與互動

### 商品瀏覽流程

```
頁面載入
→ data.js 提供商品陣列
→ products.js 渲染商品卡片
→ 點擊卡片開啟 Modal
→ Modal 中加入選購
→ 更新導覽列計數器
→ 儲存到 sessionStorage
```

### 訂購流程

```
點擊導覽列購物車
→ 平滑滾動到表單區
→ 填寫表單（即時驗證）
→ 提交按鈕
→ 顯示 loading 動畫（1.5 秒）
→ 顯示成功訊息
→ 清空表單和購物車
→ 3 秒後回到頁面頂部
```

### 表單驗證規則

- **姓名**：必填，2-20 字元
- **手機**：必填，格式 `09\d{8}`
- **Email**：選填，但填寫時驗證格式
- **7-11 門市**：必填
- **商品選擇**：至少選一項

---

## 動畫規格

### 1. 滾動淡入（Fade-in-up）

```css
.section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**觸發邏輯：**
- Intersection Observer 監聽所有 `.section`
- 閾值：20%（元素進入視窗 20% 時觸發）
- 只觸發一次

### 2. 商品卡片 Hover

```css
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  border-color: var(--highlight);
}
```

### 3. Modal 進場

```css
.modal {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal.is-open {
  opacity: 1;
  pointer-events: auto;
}

.modal__content {
  transform: scale(0.9);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal.is-open .modal__content {
  transform: scale(1);
}
```

---

## 開發階段

### Phase 1：基礎架構（30 分鐘）
- 建立檔案結構
- CSS Reset 和 Variables
- HTML 骨架
- Google Fonts 載入

### Phase 2：導覽與 Hero（45 分鐘）
- 固定導覽列 + 滾動效果
- Hero 區排版
- 聚光燈滑鼠追蹤
- 向下滾動提示動畫

### Phase 3：品牌故事與商品展示（1 小時）
- 品牌故事區佈局
- 商品資料結構
- 商品卡片渲染
- Grid 響應式佈局

### Phase 4：Modal 與購物流程（1 小時）
- Modal 開啟/關閉邏輯
- 商品詳情填充
- 購物車計數器
- sessionStorage 持久化

### Phase 5：訂購流程與表單（1 小時）
- 流程說明區排版
- 自訂表單 UI
- 即時驗證邏輯
- 提交成功動畫

### Phase 6：動畫與優化（45 分鐘）
- Intersection Observer 設定
- 所有滾動動畫
- 效能優化（lazy loading）
- 手機版基本適配

**預估總時間：** 約 5-6 小時

---

## 原型驗證清單

### 視覺風格驗證
- [ ] 黑底白字是否營造出劇場氛圍
- [ ] 聚光燈效果是否自然且不突兀
- [ ] 商品卡片設計是否有質感
- [ ] 整體留白是否恰當
- [ ] 色彩對比度是否足夠（可讀性）

### 互動體驗驗證
- [ ] 滾動動畫是否流暢不卡頓
- [ ] Modal 開啟/關閉是否順暢
- [ ] 表單驗證回饋是否即時清楚
- [ ] 導覽滾動是否平滑
- [ ] 商品卡片 hover 是否有反饋

### 流程驗證
- [ ] 從瀏覽商品到填表是否順暢
- [ ] 購物車計數是否準確
- [ ] 訂購流程說明是否易懂
- [ ] 整體故事敘述是否連貫
- [ ] CTA（行動呼籲）是否清楚

### 技術驗證
- [ ] 各瀏覽器相容性（Chrome, Safari, Firefox）
- [ ] 手機版基本可用性
- [ ] 效能（Lighthouse 分數 > 85）
- [ ] sessionStorage 持久化是否正常
- [ ] 無障礙性基本要求（語義化 HTML、鍵盤操作）

---

## 交付物

1. **可運行的 HTML 原型** - 可在瀏覽器直接開啟
2. **完整的程式碼** - 清楚註解，標記需替換內容
3. **README.md** - 專案說明與 Vercel 部署指南
4. **設計系統文件** - CSS Variables 使用說明

---

## 後續階段（原型驗證後）

### 如果驗證通過：
1. 補充剩餘區塊（FAQ、評價、社群、Footer）
2. 完整 RWD 實作（4 個斷點）
3. 整合 Google Form 或 Google Apps Script
4. SEO 優化
5. 效能深度優化
6. 正式部署

### 如果需要調整：
1. 根據驗證結果調整設計
2. 快速迭代修正
3. 重新驗證

---

## 技術債與已知限制

- 原型階段未實作完整購物車（無側邊欄）
- 表單不串接真實後端
- 僅兩個響應式斷點
- 商品圖片使用 placeholder
- 未實作完整的無障礙功能（僅基本語義化）

---

**文件版本：** 1.0
**最後更新：** 2026-02-06
