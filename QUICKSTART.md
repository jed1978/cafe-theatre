# 🚀 快速啟動指南

## ⚡ 立即查看網站

### 方法 1：本地伺服器（推薦）✅

**使用 Python（內建）：**
```bash
cd /Users/jed/Codes/cafe-theatre
python -m http.server 8000
```
然後開啟瀏覽器前往：`http://localhost:8000`

**使用 Node.js：**
```bash
npx http-server -p 8000
```

**使用 PHP：**
```bash
php -S localhost:8000
```

### 方法 2：直接開啟（基本功能）⚠️

```bash
open index.html
```

**限制**：
- ✅ 可以看到所有內容和佈局
- ❌ JavaScript 互動功能無法使用（商品 Modal、購物車、表單等）
- ❌ 原因：ES6 Modules 在 `file://` 協定下受 CORS 限制

## 🎯 完整功能測試清單

使用本地伺服器後，請測試：

### 導覽與動畫
- [ ] 向下滾動時導覽列變色
- [ ] 各區塊滾動淡入動畫
- [ ] Hero 區聚光燈跟隨滑鼠

### 商品功能
- [ ] 點擊商品卡片開啟 Modal
- [ ] Modal 中點擊「加入選購」
- [ ] 導覽列購物車數量更新
- [ ] 點擊購物車圖示開啟側邊欄

### 表單功能
- [ ] 填寫訂購表單
- [ ] 測試欄位驗證（姓名、手機格式）
- [ ] 查看已選商品與總金額
- [ ] 提交表單（目前為模擬提交）

### FAQ 與評價
- [ ] 點擊 FAQ 問題展開/收合
- [ ] 查看顧客評價區塊

### 響應式
- [ ] 調整視窗大小測試響應式佈局
- [ ] 手機視窗（< 768px）
- [ ] 平板視窗（768px - 1024px）
- [ ] 桌面視窗（> 1024px）

## 🔧 故障排除

### 問題：一片黑，看不到內容
**已修正！** 現在即使 JavaScript 未載入，內容也能正常顯示。

### 問題：點擊商品沒反應
**原因**：使用 `file://` 開啟，JavaScript 無法執行。
**解決**：使用本地伺服器（見上方方法 1）。

### 問題：控制台顯示 CORS 錯誤
**原因**：ES6 Modules 需要 HTTP(S) 協定。
**解決**：使用本地伺服器。

## 🚢 部署到線上

### Vercel（推薦）

```bash
# 推送到 GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 前往 vercel.com
# 1. 點擊 "New Project"
# 2. Import Git Repository
# 3. 選擇此專案
# 4. Framework: Other
# 5. Deploy
```

部署後，所有功能都會正常運作！

## 📝 注意事項

1. **JavaScript 依賴**：商品展示、購物車、表單驗證等功能需要 JavaScript
2. **本地開發**：強烈建議使用本地伺服器測試
3. **生產環境**：部署到 Vercel/Netlify 等平台後，所有功能完全正常

---

**快速命令（複製貼上即可）：**

```bash
# 啟動本地伺服器（選一個）
python -m http.server 8000      # Python
npx http-server -p 8000         # Node.js
php -S localhost:8000           # PHP

# 開啟瀏覽器
# macOS: open http://localhost:8000
# Windows: start http://localhost:8000
# Linux: xdg-open http://localhost:8000
```

🎭 享受咖啡小劇場！
