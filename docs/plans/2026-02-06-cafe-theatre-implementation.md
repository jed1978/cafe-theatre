# 咖啡小劇場原型 - 實作計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目標：** 建立咖啡小劇場一頁式銷售網站的可運行原型，驗證極簡劇場風格、互動體驗與用戶流程

**架構：** 純前端靜態網站，使用語義化 HTML5、模組化 CSS（CSS Custom Properties）、Vanilla JavaScript ES6 Modules。採用 Intersection Observer API 實現滾動動畫，sessionStorage 管理購物車狀態。

**技術棧：** HTML5, CSS3, Vanilla JavaScript (ES6), Google Fonts (Playfair Display, Inter, Noto Serif TC, Noto Sans TC)

---

## Task 1: 建立專案結構與基礎檔案

**Files:**
- Create: `css/reset.css`
- Create: `css/variables.css`
- Create: `css/base.css`
- Create: `css/layout.css`
- Create: `css/components.css`
- Create: `css/animations.css`
- Create: `js/main.js`
- Create: `js/data.js`
- Create: `js/navigation.js`
- Create: `js/products.js`
- Create: `js/scroll-animations.js`
- Create: `js/form.js`
- Create: `assets/images/.gitkeep`
- Create: `assets/icons/.gitkeep`

**Step 1: 建立 CSS 目錄與檔案**

Run:
```bash
mkdir -p css js assets/images assets/icons
touch css/{reset,variables,base,layout,components,animations}.css
```

Expected: 目錄和檔案成功建立

**Step 2: 建立 JS 目錄與檔案**

Run:
```bash
touch js/{main,data,navigation,products,scroll-animations,form}.js
touch assets/images/.gitkeep assets/icons/.gitkeep
```

Expected: 所有 JS 檔案和 placeholder 成功建立

**Step 3: 驗證檔案結構**

Run:
```bash
ls -R css/ js/ assets/
```

Expected:
```
css/:
animations.css  base.css  components.css  layout.css  reset.css  variables.css

js/:
data.js  form.js  main.js  navigation.js  products.js  scroll-animations.js

assets/:
icons  images

assets/icons:

assets/images:
```

**Step 4: Commit**

```bash
git add css/ js/ assets/
git commit -m "chore: 建立專案檔案結構

- 建立 CSS 模組檔案 (reset, variables, base, layout, components, animations)
- 建立 JS 模組檔案 (main, data, navigation, products, scroll-animations, form)
- 建立 assets 目錄 (images, icons)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: 實作 CSS Reset

**Files:**
- Modify: `css/reset.css`

**Step 1: 寫入 modern CSS reset**

在 `css/reset.css` 寫入：

```css
/* Modern CSS Reset */
/* 基於 Andy Bell's Modern CSS Reset，針對專案需求調整 */

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  text-rendering: optimizeSpeed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

/* 移除 number input 的箭頭 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
```

**Step 2: 驗證檔案內容**

Run:
```bash
cat css/reset.css | head -20
```

Expected: 顯示 CSS reset 內容的前 20 行

**Step 3: Commit**

```bash
git add css/reset.css
git commit -m "feat: 新增 modern CSS reset

- 基於 Andy Bell's Modern CSS Reset
- 包含 box-sizing, smooth scroll, font-smoothing
- 移除預設 margin/padding
- 優化表單元素預設樣式

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: 實作設計系統變數

**Files:**
- Modify: `css/variables.css`

**Step 1: 寫入 CSS Custom Properties**

在 `css/variables.css` 寫入：

```css
/* 設計系統變數 - 咖啡小劇場 */

:root {
  /* ===== 色彩計畫 ===== */
  --primary-black: #0a0a0a; /* 主背景 - 深邃舞台 */
  --primary-white: #f5f5f0; /* 主文字 - 聚光燈下的白 */
  --accent-gray: #2a2a2a; /* 卡片/區塊背景 */
  --mid-gray: #888888; /* 次要文字 */
  --highlight: #ffffff; /* 強調元素 - 純白聚光 */
  --subtle-warm: #c8b8a2; /* 點綴色 - 咖啡溫度 */
  --divider: #333333; /* 分隔線 */

  /* ===== 字體系統 ===== */
  --font-display: "Playfair Display", "Noto Serif TC", serif;
  --font-body: "Inter", "Noto Sans TC", sans-serif;

  /* 流體字級 (使用 clamp) */
  --font-size-h1: clamp(3rem, 8vw, 6rem); /* 48-96px */
  --font-size-h2: clamp(2rem, 5vw, 3.5rem); /* 32-56px */
  --font-size-h3: clamp(1.5rem, 3vw, 2rem); /* 24-32px */
  --font-size-body: clamp(1rem, 2vw, 1.125rem); /* 16-18px */
  --font-size-small: clamp(0.875rem, 1.5vw, 1rem); /* 14-16px */

  /* 字重 */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* ===== 間距系統 (8px base) ===== */
  --space-xs: 0.5rem; /* 8px */
  --space-sm: 1rem; /* 16px */
  --space-md: 2rem; /* 32px */
  --space-lg: 4rem; /* 64px */
  --space-xl: 8rem; /* 128px */
  --space-2xl: 12rem; /* 192px */

  /* ===== 過渡動畫 ===== */
  --transition-fast: 0.2s ease;
  --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ===== 邊框與陰影 ===== */
  --border-thin: 1px solid var(--divider);
  --border-highlight: 2px solid var(--highlight);
  --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-strong: 0 8px 32px rgba(255, 255, 255, 0.1);

  /* ===== Z-index 層級 ===== */
  --z-nav: 1000;
  --z-modal: 2000;
  --z-overlay: 1900;

  /* ===== 聚光燈效果變數（動態更新）===== */
  --spotlight-x: 50%;
  --spotlight-y: 50%;

  /* ===== 響應式斷點（僅供 JS 參考）===== */
  --breakpoint-mobile: 768px;
  --breakpoint-desktop: 1024px;
}
```

**Step 2: 驗證檔案內容**

Run:
```bash
wc -l css/variables.css
```

Expected: 顯示約 60+ 行

**Step 3: Commit**

```bash
git add css/variables.css
git commit -m "feat: 建立設計系統 CSS 變數

- 色彩計畫：劇場風格黑白灰色系
- 流體字級系統 (clamp)
- 8px 基礎間距系統
- 過渡動畫時間函數
- 陰影與邊框規格
- Z-index 層級管理

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: 實作全域基礎樣式

**Files:**
- Modify: `css/base.css`

**Step 1: 寫入全域樣式**

在 `css/base.css` 寫入：

```css
/* 全域基礎樣式 */

/* Google Fonts 載入 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;700&family=Playfair+Display:wght@400;700&display=swap");

body {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  color: var(--primary-white);
  background-color: var(--primary-black);
  overflow-x: hidden;
}

/* 標題樣式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

h1 {
  font-size: var(--font-size-h1);
}

h2 {
  font-size: var(--font-size-h2);
}

h3 {
  font-size: var(--font-size-h3);
}

/* 段落與小字 */
p {
  line-height: 1.8;
  margin-bottom: var(--space-sm);
}

small {
  font-size: var(--font-size-small);
}

/* 連結 */
a {
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--subtle-warm);
}

a:focus-visible {
  outline: 2px solid var(--highlight);
  outline-offset: 4px;
}

/* 按鈕基礎樣式 */
button {
  transition: all var(--transition-fast);
}

button:focus-visible {
  outline: 2px solid var(--highlight);
  outline-offset: 4px;
}

/* 圖片 */
img {
  height: auto;
}

/* 區塊通用樣式 */
.section {
  padding: var(--space-xl) var(--space-md);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Container */
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

/* 視覺輔助 - 僅開發時使用 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Step 2: 驗證檔案內容**

Run:
```bash
grep -c "font-family" css/base.css
```

Expected: 至少 2（body 和 h1-h6）

**Step 3: Commit**

```bash
git add css/base.css
git commit -m "feat: 新增全域基礎樣式

- 載入 Google Fonts (Inter, Noto Sans/Serif TC, Playfair Display)
- 設定 body 和標題預設樣式
- 定義連結、按鈕、圖片通用樣式
- 新增 section, container, sr-only 工具類別
- 加入 focus-visible 無障礙樣式

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: 建立 HTML 骨架

**Files:**
- Create: `index.html`

**Step 1: 寫入 HTML 結構**

建立 `index.html`：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="咖啡小劇場 - 每一杯，都是一場獨白" />
    <title>咖啡小劇場 | 精品咖啡豆</title>

    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- CSS 載入順序很重要 -->
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/variables.css" />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/layout.css" />
    <link rel="stylesheet" href="css/components.css" />
    <link rel="stylesheet" href="css/animations.css" />
  </head>
  <body>
    <!-- Navigation -->
    <nav class="nav" id="nav" data-scrolled="false">
      <div class="container nav__container">
        <a href="#hero" class="nav__logo">咖啡小劇場</a>
        <ul class="nav__links">
          <li><a href="#story">品牌故事</a></li>
          <li><a href="#products">本季劇目</a></li>
          <li><a href="#order">訂購</a></li>
        </ul>
        <button class="nav__cart" id="navCart">
          <span class="cart-count" id="cartCount">0</span> 件
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="section hero" id="hero">
      <h1 class="hero__title">咖啡小劇場</h1>
      <p class="hero__subtitle">每一杯，都是一場獨白</p>
      <a href="#story" class="hero__scroll-hint">
        <span class="sr-only">向下滾動</span>
        <svg class="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 5v14M19 12l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </section>

    <!-- Brand Story Section -->
    <section class="section story" id="story">
      <div class="container">
        <div class="story__content">
          <div class="story__text">
            <h2 class="story__title">品牌理念</h2>
            <!-- REPLACE: 品牌故事內容 -->
            <p>在這個快節奏的時代，我們相信每一杯咖啡都應該是一場值得品味的演出。咖啡小劇場不只是販售咖啡豆，更是邀請你參與一場感官的劇場體驗。</p>
            <p>我們精選來自世界各地的優質咖啡豆，每一款都有自己的故事與個性。從淺焙的花香果酸，到深焙的醇厚濃郁，每種風味都是一段獨特的敘事。</p>
            <p>讓咖啡成為你生活中的主角，而非配角。在這裡，每個人都是品味生活的觀眾，也是創造故事的演員。</p>
          </div>
          <div class="story__image">
            <!-- REPLACE: 實際圖片 -->
            <div class="placeholder-image" style="background: var(--accent-gray); aspect-ratio: 4/5; display: flex; align-items: center; justify-content: center; color: var(--mid-gray);">
              品牌意象圖片
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="section products" id="products">
      <div class="container">
        <h2 class="products__title">本季劇目</h2>
        <div class="products__grid" id="productsGrid">
          <!-- 商品卡片將由 JS 動態渲染 -->
        </div>
      </div>
    </section>

    <!-- Order Process Section -->
    <section class="section order-process" id="order-process">
      <div class="container">
        <h2 class="order-process__title">如何帶走你的故事</h2>
        <div class="order-process__steps">
          <div class="step">
            <div class="step__icon">🎭</div>
            <h3 class="step__title">選擇你的劇目</h3>
            <p class="step__desc">挑選心儀的咖啡豆</p>
          </div>
          <div class="step">
            <div class="step__icon">📝</div>
            <h3 class="step__title">填寫觀眾資訊</h3>
            <p class="step__desc">完成訂購表單</p>
          </div>
          <div class="step">
            <div class="step__icon">🏪</div>
            <h3 class="step__title">7-11 取件付款</h3>
            <p class="step__desc">到店取貨，輕鬆付款</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Order Form Section -->
    <section class="section order-form" id="order">
      <div class="container">
        <h2 class="order-form__title">預約你的座位</h2>
        <form class="form" id="orderForm">
          <div class="form__group">
            <label for="name" class="form__label">姓名 *</label>
            <input type="text" id="name" name="name" class="form__input" required />
            <span class="form__error" id="nameError"></span>
          </div>

          <div class="form__group">
            <label for="phone" class="form__label">手機號碼 *</label>
            <input type="tel" id="phone" name="phone" class="form__input" required />
            <span class="form__error" id="phoneError"></span>
          </div>

          <div class="form__group">
            <label for="email" class="form__label">Email</label>
            <input type="email" id="email" name="email" class="form__input" />
            <span class="form__error" id="emailError"></span>
          </div>

          <div class="form__group">
            <label for="store" class="form__label">7-11 取貨門市 *</label>
            <input type="text" id="store" name="store" class="form__input" placeholder="例：台北市中正區重慶門市" required />
            <span class="form__error" id="storeError"></span>
          </div>

          <div class="form__group">
            <label class="form__label">選購商品 *</label>
            <div id="selectedProducts" class="selected-products">
              <!-- 已選商品將由 JS 動態渲染 -->
              <p class="form__hint">請先點選商品加入選購</p>
            </div>
          </div>

          <div class="form__group">
            <label for="note" class="form__label">備註</label>
            <textarea id="note" name="note" class="form__textarea" rows="3"></textarea>
          </div>

          <div class="form__total">
            <span>訂單總金額：</span>
            <strong id="totalAmount">$0</strong>
          </div>

          <button type="submit" class="btn btn--primary" id="submitBtn">
            確認訂購
          </button>
        </form>

        <!-- 成功訊息（初始隱藏）-->
        <div class="form__success" id="formSuccess" style="display: none;">
          <h3>🎉 您的座位已保留！</h3>
          <p>我們將盡快為您安排演出。</p>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div class="modal" id="productModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <button class="modal__close" id="modalClose">✕</button>
        <div class="modal__body" id="modalBody">
          <!-- 商品詳情將由 JS 動態填充 -->
        </div>
      </div>
    </div>

    <!-- JavaScript Modules -->
    <script type="module" src="js/main.js"></script>
  </body>
</html>
```

**Step 2: 驗證 HTML 結構**

Run:
```bash
grep -c "section class" index.html
```

Expected: 5（hero, story, products, order-process, order-form）

**Step 3: 在瀏覽器開啟確認**

Run:
```bash
open index.html
```

Expected: 頁面可開啟，但尚無樣式（僅看到純文字內容）

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: 建立 HTML 骨架結構

- 語義化 HTML5 標籤
- 5 個主要 sections: hero, story, products, order-process, order-form
- 導覽列與購物車計數器
- 訂購表單與成功訊息
- Modal 結構
- 預留商品與表單動態渲染區域

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: 實作佈局樣式

**Files:**
- Modify: `css/layout.css`

**Step 1: 寫入佈局樣式**

在 `css/layout.css` 寫入：

```css
/* 佈局樣式 - 各區塊的結構與排版 */

/* ===== Navigation ===== */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--space-sm) 0;
  background-color: transparent;
  transition: background-color var(--transition-smooth);
  z-index: var(--z-nav);
}

.nav[data-scrolled="true"] {
  background-color: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
}

.nav__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
}

.nav__links {
  display: flex;
  gap: var(--space-md);
}

.nav__links a {
  font-size: var(--font-size-small);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
}

.nav__links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--highlight);
  transition: width var(--transition-fast);
}

.nav__links a:hover::after {
  width: 100%;
}

.nav__cart {
  font-size: var(--font-size-small);
  color: var(--primary-white);
  padding: var(--space-xs) var(--space-sm);
  border: var(--border-thin);
  border-radius: 4px;
  transition: all var(--transition-fast);
}

.nav__cart:hover {
  border-color: var(--highlight);
  background-color: rgba(255, 255, 255, 0.05);
}

.cart-count {
  font-weight: var(--font-weight-bold);
  color: var(--subtle-warm);
}

/* ===== Hero Section ===== */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background: radial-gradient(
      circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    var(--primary-black);
}

.hero__title {
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em;
}

.hero__subtitle {
  font-family: var(--font-display);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-light);
  color: var(--subtle-warm);
  font-style: italic;
}

.hero__scroll-hint {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  color: var(--mid-gray);
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 32px;
  height: 32px;
}

/* ===== Brand Story Section ===== */
.story {
  min-height: auto;
}

.story__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: center;
}

.story__title {
  margin-bottom: var(--space-md);
}

.story__text {
  padding: var(--space-lg);
  border: var(--border-thin);
}

.story__text p {
  color: var(--mid-gray);
}

.story__image {
  position: relative;
}

/* ===== Products Section ===== */
.products {
  min-height: auto;
}

.products__title {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

/* ===== Order Process Section ===== */
.order-process {
  min-height: auto;
}

.order-process__title {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.order-process__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* 步驟之間的連接線 */
.order-process__steps::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 20%;
  width: 60%;
  height: 1px;
  background-color: var(--divider);
  z-index: -1;
}

.step {
  text-align: center;
}

.step__icon {
  font-size: 3rem;
  margin-bottom: var(--space-sm);
}

.step__title {
  font-size: var(--font-size-h3);
  margin-bottom: var(--space-xs);
}

.step__desc {
  color: var(--mid-gray);
  font-size: var(--font-size-small);
}

/* ===== Order Form Section ===== */
.order-form {
  min-height: auto;
}

.order-form__title {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.form {
  max-width: 600px;
  margin: 0 auto;
}

.form__group {
  margin-bottom: var(--space-md);
}

.form__label {
  display: block;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-small);
}

.form__input,
.form__textarea {
  width: 100%;
  padding: var(--space-sm);
  background-color: var(--accent-gray);
  border: var(--border-thin);
  border-radius: 4px;
  color: var(--primary-white);
  font-size: var(--font-size-body);
  transition: border-color var(--transition-fast);
}

.form__input:focus,
.form__textarea:focus {
  outline: none;
  border-color: var(--highlight);
}

.form__error {
  display: block;
  margin-top: var(--space-xs);
  font-size: var(--font-size-small);
  color: #ff6b6b;
}

.form__hint {
  color: var(--mid-gray);
  font-size: var(--font-size-small);
}

.selected-products {
  background-color: var(--accent-gray);
  padding: var(--space-sm);
  border-radius: 4px;
  min-height: 60px;
}

.form__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-h3);
  margin: var(--space-lg) 0;
  padding: var(--space-md) 0;
  border-top: var(--border-thin);
  border-bottom: var(--border-thin);
}

.form__success {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: var(--space-xl);
  background-color: var(--accent-gray);
  border: 2px solid var(--subtle-warm);
  border-radius: 8px;
}

.form__success h3 {
  margin-bottom: var(--space-sm);
  color: var(--subtle-warm);
}

/* ===== Modal ===== */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-modal);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-smooth);
}

.modal.is-open {
  opacity: 1;
  pointer-events: auto;
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: -1;
}

.modal__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--accent-gray);
  border: var(--border-thin);
  padding: var(--space-lg);
  transition: transform var(--transition-bounce);
}

.modal.is-open .modal__content {
  transform: translate(-50%, -50%) scale(1);
}

.modal__close {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-white);
  background-color: transparent;
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.modal__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* ===== 響應式設計 ===== */
@media (max-width: 768px) {
  /* Navigation */
  .nav__links {
    gap: var(--space-sm);
  }

  .nav__links a {
    font-size: 0.75rem;
  }

  /* Hero */
  .hero__subtitle {
    font-size: 1.2rem;
  }

  /* Story */
  .story__content {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .story__text {
    padding: var(--space-md);
  }

  /* Products */
  .products__grid {
    grid-template-columns: 1fr;
  }

  /* Order Process */
  .order-process__steps {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .order-process__steps::before {
    display: none;
  }

  /* Modal */
  .modal__content {
    width: 95%;
    padding: var(--space-md);
  }
}
```

**Step 2: 在瀏覽器驗證佈局**

Run:
```bash
open index.html
```

Expected: 頁面有基本佈局，導覽列、Hero 區、各 section 已排版

**Step 3: Commit**

```bash
git add css/layout.css
git commit -m "feat: 實作佈局樣式

- 固定導覽列，滾動後變色
- Hero 區聚光燈背景（靜態版）
- 品牌故事左右分欄佈局
- 商品 grid 佈局（3 欄）
- 訂購流程水平排列
- 表單樣式與 Modal 定位
- 手機版響應式（<768px）

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: 實作元件樣式

**Files:**
- Modify: `css/components.css`

**Step 1: 寫入元件樣式**

在 `css/components.css` 寫入：

```css
/* 元件樣式 - 可重用的 UI 元件 */

/* ===== 按鈕 ===== */
.btn {
  display: inline-block;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn--primary {
  width: 100%;
  background-color: var(--primary-white);
  color: var(--primary-black);
  border: 2px solid var(--primary-white);
}

.btn--primary:hover {
  background-color: transparent;
  color: var(--primary-white);
}

.btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--secondary {
  background-color: transparent;
  color: var(--primary-white);
  border: var(--border-thin);
}

.btn--secondary:hover {
  border-color: var(--highlight);
  background-color: rgba(255, 255, 255, 0.05);
}

/* ===== 商品卡片 ===== */
.product-card {
  background-color: var(--accent-gray);
  border: var(--border-thin);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth),
    border-color var(--transition-smooth);
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-strong);
  border-color: var(--highlight);
}

.product-card__image {
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--divider);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mid-gray);
  font-size: var(--font-size-small);
}

.product-card__body {
  padding: var(--space-sm);
}

.product-card__series {
  font-size: var(--font-size-small);
  color: var(--subtle-warm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-xs);
}

.product-card__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-xs);
}

.product-card__flavor {
  font-size: var(--font-size-small);
  color: var(--mid-gray);
  margin-bottom: var(--space-sm);
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-sm);
  border-top: var(--border-thin);
}

.product-card__price {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--highlight);
}

/* ===== Modal 內商品詳情 ===== */
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.product-detail__image {
  aspect-ratio: 1;
  background-color: var(--divider);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mid-gray);
  border-radius: 4px;
}

.product-detail__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.product-detail__series {
  font-size: var(--font-size-small);
  color: var(--subtle-warm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-detail__name {
  font-family: var(--font-display);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-sm);
}

.product-detail__section {
  margin-bottom: var(--space-md);
}

.product-detail__section h4 {
  font-size: var(--font-size-small);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mid-gray);
  margin-bottom: var(--space-xs);
}

.product-detail__flavor {
  color: var(--primary-white);
}

.product-detail__roast {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--divider);
  border-radius: 4px;
  font-size: var(--font-size-small);
}

.product-detail__description {
  color: var(--mid-gray);
  line-height: 1.8;
  font-style: italic;
  border-left: 2px solid var(--divider);
  padding-left: var(--space-sm);
}

.product-detail__price {
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--highlight);
  margin: var(--space-md) 0;
}

/* ===== 已選商品列表 ===== */
.selected-product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm);
  margin-bottom: var(--space-xs);
  background-color: var(--divider);
  border-radius: 4px;
}

.selected-product-item__name {
  font-weight: var(--font-weight-medium);
}

.selected-product-item__price {
  color: var(--subtle-warm);
}

/* ===== Loading Spinner ===== */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-white);
  animation: spin 0.8s linear infinite;
}

/* ===== 響應式調整 ===== */
@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }

  .product-card__name {
    font-size: 1.25rem;
  }
}
```

**Step 2: 驗證元件樣式**

Run:
```bash
grep -c "product-card" css/components.css
```

Expected: 多次出現（至少 5+）

**Step 3: Commit**

```bash
git add css/components.css
git commit -m "feat: 實作元件樣式

- 按鈕樣式（primary, secondary）
- 商品卡片與 hover 效果
- Modal 內商品詳情佈局
- 已選商品列表樣式
- Loading spinner
- 手機版元件調整

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: 實作動畫樣式

**Files:**
- Modify: `css/animations.css`

**Step 1: 寫入動畫定義**

在 `css/animations.css` 寫入：

```css
/* 動畫定義 */

/* ===== Keyframes ===== */

/* 向下箭頭跳動 */
@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

/* Loading spinner 旋轉 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 淡入上移 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 脈衝效果 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* ===== 滾動動畫類別 ===== */

/* 預設狀態：隱藏且下移 */
.section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* 進入視窗後：顯示且歸位 */
.section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero 區例外：始終可見 */
.section.hero {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 工具動畫類別 ===== */

.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.pulse {
  animation: pulse 2s ease infinite;
}

/* ===== Reduced Motion 支援 ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .section {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Step 2: 驗證動畫**

Run:
```bash
grep "@keyframes" css/animations.css | wc -l
```

Expected: 4（bounce, spin, fadeInUp, pulse）

**Step 3: Commit**

```bash
git add css/animations.css
git commit -m "feat: 實作動畫樣式

- Keyframes: bounce, spin, fadeInUp, pulse
- 滾動淡入動畫（.section.is-visible）
- Hero 區例外處理（始終可見）
- 工具動畫類別
- Reduced motion 無障礙支援

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: 實作商品資料模組

**Files:**
- Modify: `js/data.js`

**Step 1: 寫入商品資料**

在 `js/data.js` 寫入：

```javascript
/**
 * 商品資料模組
 * 提供所有商品資料與 FAQ 資料
 */

export const products = [
  {
    id: 1,
    name: "倫敦西區",
    series: "城市系列",
    flavor: "檸檬、白花、佛手柑",
    roast: "淺焙",
    origin: "衣索比亞 耶加雪菲",
    price: 420,
    image: "london.jpg", // REPLACE: 實際圖片路徑
    description: "經典永不落幕，如同西區的音樂劇。明亮的檸檬酸質與細緻的白花香氣交織，尾韻帶有優雅的佛手柑清香，是一場感官的盛宴。",
  },
  {
    id: 2,
    name: "百老匯",
    series: "城市系列",
    flavor: "焦糖、堅果、黑巧克力",
    roast: "中焙",
    origin: "哥倫比亞 慧蘭",
    price: 360,
    image: "broadway.jpg",
    description: "華麗而均衡，百老匯的黃金年代。甜美的焦糖香氣，搭配堅果的醇厚口感，黑巧克力的尾韻為整場演出畫下完美句點。",
  },
  {
    id: 3,
    name: "巴黎左岸",
    series: "城市系列",
    flavor: "莓果、紅酒、煙燻",
    roast: "中深焙",
    origin: "瓜地馬拉 安提瓜",
    price: 380,
    image: "paris.jpg",
    description: "文人的咖啡館，存在主義的餘韻。莓果的酸甜與紅酒般的醇厚交融，細緻的煙燻香氣彷彿左岸咖啡館的時光。",
  },
  {
    id: 4,
    name: "莎士比亞",
    series: "劇作家系列",
    flavor: "黑醋栗、葡萄柚、蜂蜜",
    roast: "中焙",
    origin: "肯亞 AA",
    price: 360,
    image: "shakespeare.jpg",
    description: "悲喜交織，層次豐富。如同莎翁筆下的劇作，黑醋栗的濃郁、葡萄柚的明亮、蜂蜜的甜美，每一口都是一段故事。",
  },
  {
    id: 5,
    name: "契訶夫",
    series: "劇作家系列",
    flavor: "榛果、奶油、可可",
    roast: "中深焙",
    origin: "巴西 喜拉朵",
    price: 380,
    image: "chekhov.jpg",
    description: "日常的詩意，溫柔而深刻。榛果的溫潤、奶油的柔滑、可可的綿密，像契訶夫筆下那些細膩的生活切片。",
  },
  {
    id: 6,
    name: "貝克特",
    series: "劇作家系列",
    flavor: "雪松、香料、黑糖",
    roast: "深焙",
    origin: "印尼 曼特寧",
    price: 380,
    image: "beckett.jpg",
    description: "等待的藝術,濃郁而內斂。雪松的沉穩、香料的複雜、黑糖的甜蜜,如同貝克特的荒謬劇場,餘韻悠長。",
  },
];

/**
 * 根據 ID 取得單一商品
 * @param {number} id - 商品 ID
 * @returns {object|null} 商品物件或 null
 */
export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

/**
 * 根據系列名稱篩選商品
 * @param {string} series - 系列名稱
 * @returns {array} 商品陣列
 */
export function getProductsBySeries(series) {
  return products.filter((product) => product.series === series);
}
```

**Step 2: 驗證資料模組**

Run:
```bash
node -e "import('./js/data.js').then(m => console.log('Products count:', m.products.length))"
```

Expected: Products count: 6

**Step 3: Commit**

```bash
git add js/data.js
git commit -m "feat: 新增商品資料模組

- 6 款虛構商品資料（城市系列 3 款 + 劇作家系列 3 款）
- getProductById 輔助函數
- getProductsBySeries 輔助函數
- 完整的商品屬性：id, name, series, flavor, roast, origin, price, image, description

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: 實作導覽列與購物車模組

**Files:**
- Modify: `js/navigation.js`

**Step 1: 寫入導覽邏輯**

在 `js/navigation.js` 寫入：

```javascript
/**
 * 導覽列與購物車模組
 */

// 購物車狀態（使用 sessionStorage 持久化）
let cart = [];

/**
 * 初始化導覽列
 */
export function initNavigation() {
  const nav = document.getElementById("nav");
  const cartCountElement = document.getElementById("cartCount");
  const navCartBtn = document.getElementById("navCart");

  // 從 sessionStorage 載入購物車
  loadCartFromStorage();
  updateCartCount();

  // 滾動事件：改變導覽列背景
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.setAttribute("data-scrolled", "true");
    } else {
      nav.setAttribute("data-scrolled", "false");
    }
    lastScrollY = window.scrollY;
  });

  // 平滑滾動到錨點
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 點擊購物車：滾動到表單區
  navCartBtn.addEventListener("click", () => {
    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
      // 添加高亮效果
      orderSection.classList.add("pulse");
      setTimeout(() => {
        orderSection.classList.remove("pulse");
      }, 2000);
    }
  });
}

/**
 * 新增商品到購物車
 * @param {object} product - 商品物件
 */
export function addToCart(product) {
  // 檢查是否已存在
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // 如果已存在，不重複新增（簡化版：每個商品只能選一次）
    return;
  }

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  saveCartToStorage();
  updateCartCount();
}

/**
 * 從購物車移除商品
 * @param {number} productId - 商品 ID
 */
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCartToStorage();
  updateCartCount();
}

/**
 * 清空購物車
 */
export function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartCount();
}

/**
 * 取得購物車內容
 * @returns {array} 購物車陣列
 */
export function getCart() {
  return cart;
}

/**
 * 計算購物車總金額
 * @returns {number} 總金額
 */
export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

/**
 * 更新導覽列購物車計數器
 */
function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

/**
 * 儲存購物車到 sessionStorage
 */
function saveCartToStorage() {
  sessionStorage.setItem("cafe-theatre-cart", JSON.stringify(cart));
}

/**
 * 從 sessionStorage 載入購物車
 */
function loadCartFromStorage() {
  const saved = sessionStorage.getItem("cafe-theatre-cart");
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}
```

**Step 2: 驗證模組語法**

Run:
```bash
node --check js/navigation.js
```

Expected: 無錯誤訊息

**Step 3: Commit**

```bash
git add js/navigation.js
git commit -m "feat: 實作導覽列與購物車模組

- 滾動超過 100px 時改變導覽列背景
- 平滑滾動到錨點
- 購物車狀態管理（add, remove, clear, get）
- sessionStorage 持久化
- 自動更新購物車計數器
- 點擊購物車滾動到表單區並高亮

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: 實作商品渲染與 Modal 模組

**Files:**
- Modify: `js/products.js`

**Step 1: 寫入商品渲染邏輯**

在 `js/products.js` 寫入：

```javascript
/**
 * 商品渲染與 Modal 模組
 */

import { products, getProductById } from "./data.js";
import { addToCart } from "./navigation.js";

let currentProduct = null;

/**
 * 初始化商品展示
 */
export function initProducts() {
  renderProducts();
  initModal();
}

/**
 * 渲染商品卡片到 grid
 */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__image">
        <!-- REPLACE: 實際圖片 -->
        <span>${product.name}</span>
      </div>
      <div class="product-card__body">
        <div class="product-card__series">${product.series}</div>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__flavor">${product.flavor}</p>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price}</span>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  // 為每張卡片綁定點擊事件
  grid.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = parseInt(card.dataset.productId, 10);
      openModal(productId);
    });
  });
}

/**
 * 初始化 Modal
 */
function initModal() {
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = modal.querySelector(".modal__overlay");

  // 關閉 Modal 的方式
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/**
 * 開啟 Modal 並填充商品詳情
 * @param {number} productId - 商品 ID
 */
function openModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  currentProduct = product;

  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("modalBody");

  // 填充商品詳情
  modalBody.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__image">
        <!-- REPLACE: 實際圖片 -->
        <span>${product.name}</span>
      </div>
      <div class="product-detail__info">
        <div class="product-detail__series">${product.series}</div>
        <h2 class="product-detail__name">${product.name}</h2>

        <div class="product-detail__section">
          <h4>風味筆記</h4>
          <p class="product-detail__flavor">${product.flavor}</p>
        </div>

        <div class="product-detail__section">
          <h4>烘焙度</h4>
          <span class="product-detail__roast">${product.roast}</span>
        </div>

        <div class="product-detail__section">
          <h4>產區</h4>
          <p>${product.origin}</p>
        </div>

        <div class="product-detail__section">
          <h4>商品故事</h4>
          <p class="product-detail__description">${product.description}</p>
        </div>

        <div class="product-detail__price">$${product.price} / 半磅</div>

        <button class="btn btn--primary" id="addToCartBtn">
          加入選購
        </button>
      </div>
    </div>
  `;

  // 綁定加入購物車按鈕
  const addToCartBtn = modalBody.querySelector("#addToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    addToCart(currentProduct);
    alert(`已加入「${currentProduct.name}」到選購清單！`);
    closeModal();
  });

  // 顯示 Modal
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden"; // 防止背景滾動
}

/**
 * 關閉 Modal
 */
function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("is-open");
  document.body.style.overflow = ""; // 恢復滾動
  currentProduct = null;
}
```

**Step 2: 驗證模組語法**

Run:
```bash
node --check js/products.js
```

Expected: 無錯誤訊息

**Step 3: Commit**

```bash
git add js/products.js
git commit -m "feat: 實作商品渲染與 Modal 模組

- 渲染商品卡片到 grid
- 點擊卡片開啟 Modal
- Modal 顯示完整商品詳情
- 加入選購按鈕功能
- Modal 關閉方式：X 按鈕、點擊遮罩、ESC 鍵
- 防止 Modal 開啟時背景滾動

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: 實作滾動動畫模組

**Files:**
- Modify: `js/scroll-animations.js`

**Step 1: 寫入 Intersection Observer 邏輯**

在 `js/scroll-animations.js` 寫入：

```javascript
/**
 * 滾動動畫模組
 * 使用 Intersection Observer API 實現滾動淡入效果
 */

/**
 * 初始化滾動動畫
 */
export function initScrollAnimations() {
  // 監聽所有 section（除了 hero）
  const sections = document.querySelectorAll(".section:not(.hero)");

  // 建立 Intersection Observer
  const observerOptions = {
    threshold: 0.2, // 元素進入視窗 20% 時觸發
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 進入視窗：加上 is-visible class
        entry.target.classList.add("is-visible");
        // 只觸發一次，觸發後停止監聽
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 開始監聽所有 section
  sections.forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Hero 區聚光燈滑鼠追蹤效果
 */
export function initSpotlight() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  let rafId = null;

  hero.addEventListener("mousemove", (e) => {
    // 使用 requestAnimationFrame 優化效能
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // 更新 CSS Custom Property
      hero.style.setProperty("--spotlight-x", `${x}%`);
      hero.style.setProperty("--spotlight-y", `${y}%`);
    });
  });

  // 滑鼠離開時重置為中央
  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--spotlight-x", "50%");
    hero.style.setProperty("--spotlight-y", "50%");
  });
}
```

**Step 2: 驗證模組語法**

Run:
```bash
node --check js/scroll-animations.js
```

Expected: 無錯誤訊息

**Step 3: Commit**

```bash
git add js/scroll-animations.js
git commit -m "feat: 實作滾動動畫模組

- Intersection Observer 監聽 section 進入視窗
- 閾值設為 20%（進入視窗 20% 時觸發）
- 只觸發一次，觸發後停止監聽
- Hero 區聚光燈滑鼠追蹤效果
- 使用 requestAnimationFrame 優化效能
- 滑鼠離開時重置聚光燈位置

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: 實作表單驗證與提交模組

**Files:**
- Modify: `js/form.js`

**Step 1: 寫入表單邏輯**

在 `js/form.js` 寫入：

```javascript
/**
 * 表單驗證與提交模組
 */

import { getCart, getCartTotal, clearCart } from "./navigation.js";

/**
 * 初始化表單
 */
export function initForm() {
  const form = document.getElementById("orderForm");
  const submitBtn = document.getElementById("submitBtn");

  // 即時更新已選商品與總金額
  updateSelectedProducts();

  // 監聽購物車變化（透過自定義事件）
  window.addEventListener("cart-updated", updateSelectedProducts);

  // 表單提交事件
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 驗證表單
    if (!validateForm()) {
      return;
    }

    // 檢查是否有選購商品
    const cart = getCart();
    if (cart.length === 0) {
      alert("請先選購商品！");
      return;
    }

    // 顯示 loading 狀態
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> 處理中...';

    // 模擬提交延遲（1.5 秒）
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 顯示成功訊息
    showSuccessMessage();

    // 清空表單和購物車
    form.reset();
    clearCart();
    updateSelectedProducts();

    // 恢復按鈕狀態
    submitBtn.disabled = false;
    submitBtn.textContent = "確認訂購";

    // 3 秒後滾動到頂部
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      hideSuccessMessage();
    }, 3000);
  });

  // 即時驗證（blur 事件）
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const storeInput = document.getElementById("store");

  nameInput.addEventListener("blur", () => validateName());
  phoneInput.addEventListener("blur", () => validatePhone());
  emailInput.addEventListener("blur", () => validateEmail());
  storeInput.addEventListener("blur", () => validateStore());
}

/**
 * 更新已選商品與總金額
 */
function updateSelectedProducts() {
  const cart = getCart();
  const total = getCartTotal();
  const container = document.getElementById("selectedProducts");
  const totalElement = document.getElementById("totalAmount");

  if (cart.length === 0) {
    container.innerHTML = '<p class="form__hint">請先點選商品加入選購</p>';
  } else {
    container.innerHTML = cart
      .map(
        (item) => `
      <div class="selected-product-item">
        <span class="selected-product-item__name">${item.name}</span>
        <span class="selected-product-item__price">$${item.price}</span>
      </div>
    `
      )
      .join("");
  }

  totalElement.textContent = `$${total}`;
}

/**
 * 驗證整個表單
 * @returns {boolean} 是否通過驗證
 */
function validateForm() {
  const nameValid = validateName();
  const phoneValid = validatePhone();
  const emailValid = validateEmail();
  const storeValid = validateStore();

  return nameValid && phoneValid && emailValid && storeValid;
}

/**
 * 驗證姓名
 * @returns {boolean} 是否通過驗證
 */
function validateName() {
  const input = document.getElementById("name");
  const error = document.getElementById("nameError");
  const value = input.value.trim();

  if (value.length === 0) {
    showError(error, "請輸入姓名");
    return false;
  }

  if (value.length < 2 || value.length > 20) {
    showError(error, "姓名長度需介於 2-20 字元");
    return false;
  }

  clearError(error);
  return true;
}

/**
 * 驗證手機號碼
 * @returns {boolean} 是否通過驗證
 */
function validatePhone() {
  const input = document.getElementById("phone");
  const error = document.getElementById("phoneError");
  const value = input.value.trim();

  if (value.length === 0) {
    showError(error, "請輸入手機號碼");
    return false;
  }

  // 台灣手機格式：09 開頭 + 8 位數字
  const phoneRegex = /^09\d{8}$/;
  if (!phoneRegex.test(value)) {
    showError(error, "請輸入正確的手機號碼格式（例：0912345678）");
    return false;
  }

  clearError(error);
  return true;
}

/**
 * 驗證 Email
 * @returns {boolean} 是否通過驗證
 */
function validateEmail() {
  const input = document.getElementById("email");
  const error = document.getElementById("emailError");
  const value = input.value.trim();

  // Email 選填，若未填寫則通過
  if (value.length === 0) {
    clearError(error);
    return true;
  }

  // 簡單的 Email 格式驗證
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(error, "請輸入正確的 Email 格式");
    return false;
  }

  clearError(error);
  return true;
}

/**
 * 驗證門市
 * @returns {boolean} 是否通過驗證
 */
function validateStore() {
  const input = document.getElementById("store");
  const error = document.getElementById("storeError");
  const value = input.value.trim();

  if (value.length === 0) {
    showError(error, "請輸入取貨門市");
    return false;
  }

  clearError(error);
  return true;
}

/**
 * 顯示錯誤訊息
 * @param {HTMLElement} errorElement - 錯誤訊息元素
 * @param {string} message - 錯誤訊息
 */
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

/**
 * 清除錯誤訊息
 * @param {HTMLElement} errorElement - 錯誤訊息元素
 */
function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

/**
 * 顯示成功訊息
 */
function showSuccessMessage() {
  const form = document.getElementById("orderForm");
  const success = document.getElementById("formSuccess");

  form.style.display = "none";
  success.style.display = "block";
  success.classList.add("fade-in");
}

/**
 * 隱藏成功訊息
 */
function hideSuccessMessage() {
  const form = document.getElementById("orderForm");
  const success = document.getElementById("formSuccess");

  form.style.display = "block";
  success.style.display = "none";
}
```

**Step 2: 驗證模組語法**

Run:
```bash
node --check js/form.js
```

Expected: 無錯誤訊息

**Step 3: Commit**

```bash
git add js/form.js
git commit -m "feat: 實作表單驗證與提交模組

- 即時驗證：姓名、手機、Email、門市
- 手機格式驗證（09開頭 + 8位數字）
- Email 格式驗證（選填）
- 自動更新已選商品與總金額
- 模擬提交流程（1.5秒 loading）
- 提交成功後顯示訊息、清空表單與購物車
- 3秒後自動滾動回頂部

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: 實作主程式入口

**Files:**
- Modify: `js/main.js`

**Step 1: 寫入主程式邏輯**

在 `js/main.js` 寫入：

```javascript
/**
 * 主程式入口
 * 初始化所有模組
 */

import { initNavigation } from "./navigation.js";
import { initProducts } from "./products.js";
import { initScrollAnimations, initSpotlight } from "./scroll-animations.js";
import { initForm } from "./form.js";

/**
 * 當 DOM 載入完成後執行
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎭 咖啡小劇場 - 初始化中...");

  // 初始化各模組
  initNavigation();
  initProducts();
  initScrollAnimations();
  initSpotlight();
  initForm();

  console.log("✅ 所有模組已載入完成");
});

/**
 * 監聽購物車變化事件（供其他模組觸發）
 */
import { getCart } from "./navigation.js";

// 為 addToCart 和 removeFromCart 加上事件觸發
const originalAddToCart = window.addToCart;
if (originalAddToCart) {
  window.addToCart = function (...args) {
    const result = originalAddToCart.apply(this, args);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    return result;
  };
}
```

**Step 2: 在瀏覽器測試完整功能**

Run:
```bash
open index.html
```

Expected:
- 頁面正常載入，所有樣式生效
- 導覽列滾動後變色
- Hero 區聚光燈跟隨滑鼠
- 商品卡片正常顯示（6 款）
- 點擊商品開啟 Modal
- Modal 可正常關閉
- 加入選購後計數器更新
- 表單驗證正常運作
- 提交後顯示成功訊息

**Step 3: 檢查 console 是否有錯誤**

在瀏覽器開發者工具 Console 檢查：

Expected:
```
🎭 咖啡小劇場 - 初始化中...
✅ 所有模組已載入完成
```

**Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: 實作主程式入口

- DOMContentLoaded 事件監聽
- 初始化所有模組（navigation, products, scroll-animations, form）
- 加入 console 訊息方便除錯
- 購物車變化事件觸發機制

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: 建立 README 與部署指南

**Files:**
- Create: `README.md`
- Create: `vercel.json`

**Step 1: 寫入 README**

建立 `README.md`：

```markdown
# ☕ 咖啡小劇場 | Café Theatre

> 每一杯，都是一場獨白

精品咖啡豆一頁式銷售網站原型 — 極簡現代劇場風格

---

## 📋 專案說明

這是「咖啡小劇場」的原型網站，用於驗證：

- **視覺風格**：極簡劇場風格、黑底白字、聚光燈效果
- **互動體驗**：滾動動效、Modal 詳情、商品卡片 hover
- **資訊架構**：從瀏覽商品到下單的完整流程

## 🚀 技術棧

- **HTML5** - 語義化標籤
- **CSS3** - CSS Custom Properties, Grid, Flexbox
- **Vanilla JavaScript** - ES6 Modules
- **Intersection Observer API** - 滾動動畫
- **sessionStorage** - 購物車持久化

**無外部依賴** - 純前端靜態網站

## 📁 檔案結構

```
cafe-theatre/
├── index.html              # 單頁應用主檔
├── css/                    # 樣式檔案
│   ├── reset.css          # CSS Reset
│   ├── variables.css      # 設計系統變數
│   ├── base.css           # 全域樣式
│   ├── layout.css         # 佈局樣式
│   ├── components.css     # 元件樣式
│   └── animations.css     # 動畫定義
├── js/                     # JavaScript 模組
│   ├── main.js            # 主程式入口
│   ├── data.js            # 商品資料
│   ├── navigation.js      # 導覽與購物車
│   ├── products.js        # 商品渲染與 Modal
│   ├── scroll-animations.js # 滾動動畫
│   └── form.js            # 表單驗證
├── assets/                 # 資源檔案
│   ├── images/            # 圖片
│   └── icons/             # SVG icons
└── docs/                   # 文件
    └── plans/             # 設計與實作計畫
```

## 🎨 設計系統

### 色彩

- `#0A0A0A` - 主背景（深邃舞台）
- `#F5F5F0` - 主文字（聚光燈白）
- `#2A2A2A` - 卡片背景
- `#C8B8A2` - 點綴色（咖啡溫度）

### 字體

- **標題**：Playfair Display / Noto Serif TC
- **內文**：Inter / Noto Sans TC

## 🛠️ 本地開發

### 1. Clone 專案

```bash
git clone <repository-url>
cd cafe-theatre
```

### 2. 直接開啟 HTML

由於是純前端靜態網站，可以直接在瀏覽器開啟：

```bash
open index.html
```

或使用本地伺服器（推薦，避免 CORS 問題）：

```bash
# 使用 Python
python3 -m http.server 8000

# 或使用 Node.js (需先安裝 http-server)
npx http-server -p 8000
```

然後在瀏覽器開啟 `http://localhost:8000`

## 🌐 部署到 Vercel

### 方式一：使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel
```

### 方式二：透過 GitHub 整合

1. 將專案推送到 GitHub
2. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
3. 點擊 "Import Project"
4. 選擇你的 GitHub repository
5. Vercel 會自動偵測為靜態網站並部署

## ✅ 功能清單

### 已實作

- [x] 固定導覽列，滾動後變色
- [x] Hero 區聚光燈滑鼠追蹤效果
- [x] 品牌故事區左右分欄佈局
- [x] 商品展示 Grid（6 款虛構商品）
- [x] 商品卡片 hover 效果
- [x] 點擊商品開啟 Modal 詳情
- [x] 加入選購功能
- [x] 購物車計數器（sessionStorage 持久化）
- [x] 訂購流程說明
- [x] 自訂表單 UI 與即時驗證
- [x] 提交成功動畫與訊息
- [x] 滾動淡入動畫（Intersection Observer）
- [x] 手機版響應式（基本）

### 原型階段簡化功能

- 購物車：僅計數器，點擊滾動到表單（無側邊欄）
- 響應式：僅兩個斷點（桌面 1024px+、手機 <768px）
- 表單提交：僅前端驗證，不串接後端

## 🔄 後續擴展（原型驗證後）

1. 補充剩餘區塊（FAQ、評價、社群、Footer）
2. 完整 RWD（4 個斷點）
3. 整合 Google Form 或 Google Apps Script
4. 替換真實商品圖片
5. SEO 優化
6. 效能深度優化

## 📝 商品資料

目前包含 6 款虛構咖啡豆：

**城市系列**

- 倫敦西區 - 衣索比亞 耶加雪菲，淺焙 / $420
- 百老匯 - 哥倫比亞 慧蘭，中焙 / $360
- 巴黎左岸 - 瓜地馬拉 安提瓜，中深焙 / $380

**劇作家系列**

- 莎士比亞 - 肯亞 AA，中焙 / $360
- 契訶夫 - 巴西 喜拉朵，中深焙 / $380
- 貝克特 - 印尼 曼特寧，深焙 / $380

商品資料位於 `js/data.js`，可輕鬆修改。

## 🐛 已知問題與限制

- 原型階段未實作完整購物車側邊欄
- 商品圖片使用 placeholder
- 表單不串接真實後端
- 未實作完整無障礙功能（僅基本語義化）

## 📄 授權

© 2025 咖啡小劇場 All Rights Reserved.

---

**原型版本：** 1.0
**最後更新：** 2026-02-06
```

**Step 2: 建立 Vercel 設定檔**

建立 `vercel.json`：

```json
{
  "version": 2,
  "public": true,
  "cleanUrls": true,
  "trailingSlash": false
}
```

**Step 3: 驗證 README 格式**

Run:
```bash
head -20 README.md
```

Expected: 顯示 README 前 20 行，格式正確

**Step 4: Commit**

```bash
git add README.md vercel.json
git commit -m "docs: 新增 README 與 Vercel 部署設定

- 完整的專案說明文件
- 技術棧與檔案結構
- 本地開發指引
- Vercel 部署教學
- 功能清單與已知限制
- 商品資料說明

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 16: 最終驗證與優化

**Files:**
- Modify: `css/layout.css` (minor fixes if needed)

**Step 1: 完整功能測試**

在瀏覽器執行以下測試：

1. **導覽列測試**
   - 滾動頁面，確認導覽列背景變化
   - 點擊錨點連結，確認平滑滾動
   - 點擊購物車，確認滾動到表單區

2. **Hero 區測試**
   - 移動滑鼠，確認聚光燈跟隨
   - 滑鼠離開，確認聚光燈回到中央

3. **商品展示測試**
   - 確認 6 款商品正常顯示
   - hover 商品卡片，確認放大與陰影效果
   - 點擊商品，確認 Modal 正常開啟
   - 測試 Modal 關閉（X 按鈕、點擊遮罩、ESC 鍵）
   - 點擊「加入選購」，確認購物車計數器更新

4. **表單測試**
   - 測試即時驗證（blur 事件）
   - 輸入錯誤格式，確認錯誤訊息顯示
   - 未選購商品時提交，確認提示訊息
   - 完整填寫並提交，確認成功流程
   - 確認表單清空與購物車重置
   - 確認 3 秒後自動滾動回頂部

5. **滾動動畫測試**
   - 緩慢滾動頁面，確認各 section 淡入效果

6. **手機版測試**
   - 調整瀏覽器視窗至 < 768px
   - 確認佈局改為單欄
   - 確認所有功能正常運作

**Step 2: 效能檢測（可選）**

Run:
```bash
# 使用 Lighthouse（需要在瀏覽器開發者工具執行）
# 或使用 web.dev/measure
```

Expected: Performance > 85, Accessibility > 85

**Step 3: 建立最終版本標籤**

Run:
```bash
git tag -a v1.0-prototype -m "Prototype v1.0 - 咖啡小劇場原型完成

功能完整的原型版本，包含：
- 極簡劇場風格視覺設計
- 完整的商品瀏覽與選購流程
- 表單驗證與提交體驗
- 滾動動畫與互動效果
- 基本響應式設計

準備進行原型驗證。"

git push origin v1.0-prototype
```

**Step 4: 最終 Commit**

```bash
git add .
git commit -m "chore: 原型完成，準備驗證

- 所有核心功能已實作並測試
- 程式碼已清理與優化
- 文件已完成
- 準備部署到 Vercel 進行驗證

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## 驗證清單

完成實作後，請按照以下清單驗證原型：

### 視覺風格驗證
- [ ] 黑底白字營造出劇場氛圍
- [ ] 聚光燈效果自然不突兀
- [ ] 商品卡片有質感
- [ ] 整體留白恰當
- [ ] 色彩對比度足夠（可讀性）

### 互動體驗驗證
- [ ] 滾動動畫流暢不卡頓
- [ ] Modal 開啟/關閉順暢
- [ ] 表單驗證回饋即時清楚
- [ ] 導覽滾動平滑
- [ ] 商品卡片 hover 有反饋

### 流程驗證
- [ ] 從瀏覽商品到填表順暢
- [ ] 購物車計數準確
- [ ] 訂購流程說明易懂
- [ ] 整體故事敘述連貫
- [ ] CTA（行動呼籲）清楚

### 技術驗證
- [ ] Chrome 可正常運作
- [ ] Safari 可正常運作
- [ ] Firefox 可正常運作
- [ ] 手機版基本可用
- [ ] sessionStorage 持久化正常
- [ ] Console 無錯誤訊息
- [ ] 所有圖片載入（placeholder）

---

## 部署步驟

完成驗證後，依照以下步驟部署：

```bash
# 1. 確認所有變更已 commit
git status

# 2. 推送到 GitHub（如果還沒有）
git remote add origin <your-repo-url>
git push -u origin main

# 3. 使用 Vercel CLI 部署
vercel

# 或前往 Vercel Dashboard 透過 GitHub 整合部署
```

---

**預估總開發時間：** 5-6 小時
**檔案總數：** 13 個主要檔案
**程式碼行數：** 約 1500+ 行

---

**計畫版本：** 1.0
**建立日期：** 2026-02-06
