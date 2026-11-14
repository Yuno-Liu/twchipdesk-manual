# TwChipDesk 使用手冊（網站原始檔）

這個專案是「TwChipDesk 使用手冊」網站的原始檔，以 [Docusaurus](https://docusaurus.io/) 建置，發布在 GitHub Pages：

<https://yuno-liu.github.io/twchipdesk-manual/>

## 內容來源

`docs/` 裡的手冊內容（文件與截圖）由另一個來源同步而來，**請勿在這裡直接修改內容**。這裡只維護網站設定（`docusaurus.config.js`、`sidebars.js`、樣式與部署流程）。手冊新增或刪除頁面時，需要同步更新 `sidebars.js`。

## 本機預覽

需要 Node.js 20 以上。

```bash
npm ci
npm start          # 開發模式預覽
npm run build      # 建置到 build/
npm run serve      # 預覽建置結果
```

push 到 `main` 後，GitHub Actions 會自動建置並發布（Pages 的來源設定為 GitHub Actions）。
