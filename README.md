# 亞太日報社台灣前端（Live Data Demo）

這是 React／Redux 新聞前端。公開版直接從亞太日報 WordPress REST API 讀取即時的文章、分類與標籤資料，不需要另外啟動後端。

## 資料接口

- 來源網站：<https://www.apdaily.com.tw/>
- API 根路徑：<https://wp.apdaily.com.tw/wp-json/wp/v2/>
- 使用資源：`categories`、`posts`、`tags`
- API 回傳的 `X-WP-Total` 與 `X-WP-TotalPages` 用於列表分頁。

瀏覽器會直接呼叫以上公開 API。會員登入 API 與原站 Google Analytics 在公開部署中預設停用；若未來要接回會員服務，必須透過私密環境變數提供設定，不能把金鑰提交到 Git。

## 本機開發

此專案源自舊版 Webpack 3，建議使用 Node.js 20。

```bash
npm install
npm start
```

開發站預設位於 <http://127.0.0.1:8888/>。

## GitHub Pages 建置

```bash
npm run pages
```

輸出位於 `docs/`。`index.html` 與 `404.html` 讓 Browser History 路由可在 GitHub Pages 重新整理，`.nojekyll` 避免靜態資源被 Jekyll 忽略。

環境變數範例見 `.env.example`。若 repo 名稱或 GitHub 帳號改變，請同步修改 `PAGE_BASE_PATH`、`PUBLIC_SITE_URL` 與 `package.json` 的 `pages` 指令。

## 公開版限制

- 資料內容、圖片與可用性取決於遠端 WordPress API。
- GitHub Pages 是靜態主機，不執行原專案的 PHP 分享頁與資料庫查詢。
- 登入、註冊、會員資料修改在公開版停用，不會向測試會員後端送出請求。
- 第三方嵌入內容（YouTube、Instagram、Facebook）仍受各服務的 Cookie、瀏覽器隱私設定與區域政策影響。
