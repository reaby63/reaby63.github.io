# 專案開發文件 (Front-end Build System)

這是一套基於 **Gulp 5** 的前端自動化開發環境，整合了 Pug 模板引擎、SCSS 預處理器、JavaScript 模組化以及多語系 (i18n) 支持。

## 🛠 開發環境需求

請確保你的開發機具備以下版本或更高版本：

| 工具           | 版本要求       | 備註          |
| ------------ | ---------- | ----------- |
| **Node.js**  | `v20.19.0` | 建議使用 LTS 版本 |
| **pnpm**     | `10.10.0`  | 專案主要套件管理工具  |
| **npm**      | `10.9.2`   | 備援套件管理工具    |
| **Gulp CLI** | `3.0.0`    | 全域命令行工具     |
| **Gulp**     | `^5.0.0`   | 自動化任務核心     |

## 專案初始化 (Setup)

取得專案後，請依序執行以下指令進行環境配置：

```bash
pnpm install
```

- 自動執行：`git submodule update --init --recursive`
- 功能：根據 `package.json` 紀錄的 SHA 指標精確還原各個子模組（LatticeCSS, JS 等），確保開發環境的一致性。

---

## Git 分支管理 (Branch Management)

使用強化的安全切換腳本，避免程式碼衝突：

```bash
pnpm co <branch_name>
```

- 運作邏輯：
  
  1. `git fetch` 同步遠端資訊。
  
  2. 檢查工作區是否乾淨（有未提交變更會中斷並警告）。
  
  3. `git pull` 更新目前分支。
  
  4. `git checkout <branch_name>` 切換至目標。

---

## 一鍵提交與推送 (Quick Commit & Push)

符合 Conventional Commits 規範的快速提交指令：

| **指令**             | **說明** | **對應 Git 動作**                |
| ------------------ | ------ | ---------------------------- |
| `pnpm fix "..."`   | 修復 Bug | `git commit -m "fix: ..."`   |
| `pnpm feat "..."`  | 新增功能   | `git commit -m "feat: ..."`  |
| `pnpm docs "..."`  | 更新文件   | `git commit -m "docs: ..."`  |
| `pnpm chore "..."` | 配置/瑣事  | `git commit -m "chore: ..."` |

所有提交指令都會自動執行 `git add .` 與 `git push`

---

## 子模組維護 (Submodule Maintenance)

當需要將 Lattice 生態系統提升至最新版本時使用：

```bash
pnpm update:mod
```

- 行為：
  
  1. `git submodule sync`：確保子模組遠端 URL 正確。
  
  2. `git submodule update --remote --merge`：強制拉取 `.gitmodules` 中指定分支的最新版並自動合併。

- ⚠️ 注意：執行此指令後若確認畫面正常，請務必執行 `pnpm chore "update submodules {SHA}"` 來存檔 SHA 指標。

---

## 建置與部署 (Build & Deploy)

| **指令**        | **執行任務**               | **說明**                    |
| ------------- | ---------------------- | ------------------------- |
| `pnpm dev`    | `gulp dev`             | 開啟開發伺服器與監控任務              |
| `pnpm pro`    | `gulp build --env pro` | 生產環境打包優化                  |
| `pnpm deploy` | `deploy.sh`            | 執行部署腳本（如上傳至 GitHub Pages） |

---

## 🛠 腳本架構 (`/scripts`)

- `git-checkout.js`: 包含 `status` 檢查與 `pull` 的安全切換機制。

- `git-commit.js`: 通用的提交跳板，支援多種 Commit Type。

<!-- ## 🚀 快速開始

### 1. 首次安裝與初始化

取得專案後，請依序執行以下指令進行環境配置：

```bash
# 安裝相依套件
pnpm i
# 初始化並更新 Git Submodule (包含核心組件庫 Lattice)
git submodule update --init --recursive
# 啟動開發伺服器
gulp dev
```

### 2. 日常開發指令
gulp

```bash
# 啟動開發環境 (含監控任務)
gulp dev

# 執行 Demo 部署任務
gulp deploy

# 正式部署
gulp build --env pro

```
pnpm
```bash
# 啟動開發環境 (含監控任務)
pnpm run dev

# 執行 Demo 部署任務
pnpm run deploy

# 正式部署
pnpm run pro

# update Submodule
pnpm run update:mod
```


### 3. Git Submodule 日常開發指令
```bash
# 拉取主專案最新版本
git pull --recurse-submodules

# 更新子模組到最新版本
git submodule update --init --recursive --remote
``` -->

## ⚙️ .env 環境設定

在專案根目錄下建立 `.env` 檔案，用以管理開發參數。

> [!IMPORTANT] **多語系說明**：若 `LANGUAGES` 設定為 `zh,en`，系統會尋找 `src/lang/zh.json` 與 `src/lang/en.json` 作為翻譯來源。

| 變數名稱               | 範例值                      | 說明                       |
| ------------------ | ------------------------ | ------------------------ |
| `LANGUAGES`        | `zh,en`                  | 設定開發語系，多語系以逗號區隔          |
| `NODE_ENV`         | `pug`                    | 模式選擇：`pug` (預設) 或 `html` |
| `IS_PROD`          | `false`                  | 是否開啟代碼壓縮與優化              |
| `IS_WRITE_MAPS`    | `false`                  | 是否生成 CSS/JS Source Maps  |
| `IS_WATCH_SCRIPTS` | `true`                   | 是否監控 JavaScript 檔案變更     |
| `IS_WATCH_STYLES`  | `true`                   | 是否監控 SCSS/CSS 檔案變更       |
| `GIT_DEPLOY`       | `https://github.com/...` | 設定部署用遠端伺服器 Git 位址        |
| `BRANCH`           | `gh-pages`               | 指定部署的分支                  |

## 📁 文件結構示例

```
project/
├── src/                    # 開發原始碼目錄
│   ├── scss/               # 樣式表原始檔
│   │   ├── style.scss      # 主要樣式進入點
│   │   ├── plugin.scss     # 外部套件樣式
│   │   └── LatticeCSS/     # 核心樣式組件庫
│   ├── js/                 # 腳本原始檔
│   │   ├── vendor/         # 第三方外部套件 (如 jQuery, Swiper)
│   │   ├── LatticeJS/      # 自研功能模組庫
│   │   └── custom.js       # 專案自定義腳本
│   ├── pug/                # Pug 模板目錄
│   │   ├── config/         # 頁面全局配置 (_useConfig.pug)
│   │   ├── component/      # 拆分組件 (LatticePug)
│   │   ├── index.pug       # 首頁模板
│   │   └── layout.pug      # 主佈局模板
│   ├── lang/               # 多語系 JSON 設定檔
│   │   ├── zh.json         # 繁體中文
│   │   └── en.json         # 英文
│   ├── img/                # 圖片素材 (原始檔)
│   └── fonts/              # 字體檔案
├── dist/                   # 編譯輸出目錄 (正式環境)
│   ├── styles/             # 編譯後的 CSS 文件
│   └── scripts/            # 編譯後的 JS 文件
├── gulpfile.js             # Gulp 自動化任務邏輯
├── package.json            # 專案套件定義檔
├── .env                    # 環境變數設定檔 (不進入 Git)
└── .gitignore              # Git 忽略清單
```

## 💡 開發備註

- **模組化設計**：建議將重複使用的組件放置於 `src/pug/component/` 下。

- **Git 子模組**：`Lattice` 相關資料夾通常為子模組，更新時請確保執行 `submodule update`。

- **多語系開發**：新增語系時，請確保 `.env` 與 `src/lang/` 同步更新。
