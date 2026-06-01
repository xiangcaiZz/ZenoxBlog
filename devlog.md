# DevLog — ZenoxBlog

---

### 2026-06-01

**更新时间: 2026-06-01 12:29**

- **导航栏链接重构** — NavBar 导航项从静态 `<a>` 标签升级为组件化交互。
  - "文章" 改为 `<button>` + `goToArticles()` 函数：当前在首页则平滑滚动至文章区，否则先路由跳转至首页再自动滚动。
  - "简历" 新增为 `<RouterLink to="/resume">`，点击后关闭移动端菜单。
  - "关于"、"订阅" 改为 `<RouterLink to="/">`，为后续独立页面预留路由锚点。
  - 点击任意导航项自动关闭移动端汉堡菜单。
- **简历页面** — 新增 `src/views/ResumePage.vue` + `/resume` 路由。
  - Hero 区：居中大标题"个人简历" + "即将上线，敬请期待"副标题 + 青色强调线。
  - 正文区：深色卡片占位 + "简历内容正在建设中…"提示，统一深空科幻设计语言。
  - 响应式适配：移动端缩减内边距。
  - 包含 `PageFooter`，与全站布局一致。

---

### 2026-05-21

**更新时间: 2026-05-21 20:30**

- **首页加载骨架屏** — 新增 6 张骨架卡片作为默认状态，覆盖请求前、请求中、请求失败三种场景。
  - 骨架卡与真实 `BlogCard` 同尺寸、同布局，含封面占位区 + 四行文字线。
  - 流光扫过动画（`shimmer-sweep`）：`::after` 渐变条从左至右滑过，中心带青色微光，与主题色呼应。
- **移除本地后备数据** — `useArticles` 初始值从 `[...initialArticles]` 改为 `[]`，文章数据完全由 API 驱动，不再预填静态数据。

---

**更新时间: 2026-05-21 18:00**

- **mockDB 数据层 + json-server** — 新增 `public/docs/mockDB.json` 替代全部 `.md` 文章，安装 `json-server@0.17.4` + `axios`。
  - 每篇文章含 `id`、`image`、`slug`、`title`、`date`、`category`、`readTime`、`excerpt`、`content` 九个字段。
  - `npm run db` 启动 `json-server --watch --port 4396`，对外暴露 `GET/POST/PUT/DELETE /articles` 和 `/articles/:id`。
  - 项目不再依赖 `public/docs/*.md` 文件，全部 md 已删除。
- **Axios 请求拦截器** — 新增 `src/utils/request.ts`，baseURL 指向 `http://localhost:4396`。
  - 请求拦截器自动注入 Bearer token；响应拦截器统一处理 401 重定向。
  - 导出 `get`/`post`/`put`/`del` 四个类型安全方法，导出 `ArticleRecord` 完整数据模型。
- **首页 API 驱动** — `HomePage` 挂载时调用 `GET /articles` → `setArticles()` 填充列表，失败回退本地后备数据。
- **详情页按 id 请求** — `ArticlePage` 改为根据 slug 从本地列表查找 `id` → `GET /articles/:id` 获取完整数据 + `marked` 渲染正文。
- **文章封面 Demo** — `BlogCard` 与 `ArticlePage` 新增基于 CSS 渐变的封面图展示。
  - 根据 `image` 字段取 hsl 色相环不同位置，为每篇文章生成唯一色调的渐变色封面。
  - BlogCard 卡片封面含分类 badge；详情页顶部展示 360px 封面 + 分类标签。
- **编辑页 API 同步** — `ArticleEditPage` 增删改操作全量调用 REST API。
  - 新增 `POST /articles`，编辑 `PUT /articles/:id`，删除 `DELETE /articles/:id`。
  - 请求成功/失败均同步本地 `useArticles` 数据，保证列表即时更新。
  - `ArticleEditorModal` 新增封面 `image` 字段输入（预留后续上传能力）。
- **数据模型升级** — `Article` 接口新增 `id`、`image` 字段，`useArticles` 新增 `setArticles` 批量覆盖方法。

---

**更新时间: 2026-05-21 15:00**

- **文章编辑页面** — 新增 `src/views/ArticleEditPage.vue` + `src/components/ArticleEditorModal.vue`。
  - 长按左上角 ZENOX 按钮 2 秒进入编辑页，短按仍为返回首页。
  - 文章卡片网格：虚线 "+" 新增按钮 + 已有文章列表，点击卡片进入编辑模式，右上角 × 悬停显示删除按钮。
  - 弹窗含标题、日期、分类、阅读时长、导言、正文（Markdown）六个字段，深色主题 + 青色强调 + 等宽字体代码区。
  - 保存校验标题非空、自动生成 slug；删除需 confirm 确认，阻止事件冒泡。
- **响应式文章数据层** — 新增 `src/composables/useArticles.ts`。
  - 模块级 `ref<Article[]>` 单例，从 `src/data/articles.ts` 浅拷贝初始值，`addArticle` / `updateArticle` / `removeArticle` 三个方法。
  - 首页、详情页、编辑页统一切换到 `useArticles()`，编辑页的增删改在所有页面即时反映。
- **自定义对话框组件** — 新增 `src/composables/useDialog.ts` + `src/components/CustomDialog.vue`。
  - 基于 Promise 的 `alert(message)` / `confirm(message)` API，模块级单例，全局可用。
  - 居中深色面板、青色强调线 + Orbitron 标题，`alert` 单按钮 / `confirm` 双按钮，scale+opacity 进出场过渡。
  - 全局挂载到 `App.vue`，替换了编辑页的原生 `window.confirm`。
- **页面结构优化** — `NavBar` 从三个页面中提升至 `App.vue` 全局渲染，所有页面共享同一个导航栏实例。

---

**更新时间: 2026-05-21 10:30**

- **Axios 请求封装**（已移除）— 曾安装 `axios` 并创建 `src/utils/request.ts`，含 mockDB.json 数据层与 CRUD mock 路由，后统一清理。

---

### 2026-05-20

**更新时间: 2026-05-20 10:30**

- **文章导航交互优化** — 上下篇跳转、首页卡片点击均自动平滑滚动至页面顶部。
  - Vue Router 新增 `scrollBehavior` 配置，所有路由跳转统一执行 `{ top: 0, behavior: 'smooth' }`。
  - 文章详情页顶部新增"上一篇 / 下一篇"导航按钮（`src/views/ArticlePage.vue`），与底部导航样式一致，以 `border-bottom` 分隔。
  - 首页 Hero "阅读文章"按钮改为平滑滚动至下方文章列表区，使用 `scrollIntoView({ behavior: 'smooth' })`。
- **自定义滚动条组件** — 隐藏原生垂直滚动条，新增 `src/components/ScrollProgress.vue`。
  - 1px 青色发光轨道 + 填充段，随页面滚动从顶部向下增长，附带竖排百分比文字。
  - 全局样式（`src/styles/global.css`）通过 `scrollbar-width: none` 和 `::-webkit-scrollbar` 隐藏原生滚动条。
  - 移动端保留显示（≤640px 缩小边距与轨道高度）。

---

### 2026-05-19

**更新时间: 2026-05-19 17:50**

- **项目全面中文化** — 将项目主语言从英文切换为中文，不改动 ZENOX 品牌署名。
  - 6 篇 demo 文章（`public/docs/*.md`）全文翻译为中文，含 frontmatter 元数据。
  - 首页文案中文化：Hero 标题、副标题、按钮、文章区域标签、Newsletter 订阅区。
  - 导航栏和页脚链接、标语、版权信息中文化。
  - 文章详情页错误提示、上下篇导航按钮中文化。
  - 文章注册表（`src/data/articles.ts`）标题、摘要、分类、阅读时长中文化。
  - `index.html` 页面标题中文化。

---

**更新时间: 2026-05-19 17:35**

- **更新 `README.md`** — 主语言改为中文，补充技术栈表格、项目结构、新增文章流程说明，标注本项目由 **Claude Code + DeepSeek V4** AI Agent 辅助开发。

---

**更新时间: 2026-05-19 17:21**

- **首页设计（Starfield 风格）** — 参考 Bethesda Starfield 官网美术风格，完成深空科幻主题的博客首页。
  - **全局样式** `src/styles/global.css`：深空黑底色 + 青色强调色，Orbitron（标题）+ Inter（正文）字体组合，极细边框、宽字距、辉光阴影等设计令牌。
  - **导航栏** `src/components/NavBar.vue`：固定顶部，毛玻璃效果，响应式汉堡菜单。
  - **文章卡片** `src/components/BlogCard.vue`：半透明深蓝底 + hover 青色辉光上浮效果，改为 `<RouterLink>` 包裹，点击跳转详情页。
  - **页脚** `src/components/PageFooter.vue`：链接导航 + 版权信息。
  - **首页视图** `src/views/HomePage.vue`：全屏 Hero（CSS 星空粒子 + 大号 Orbitron 标题）、文章网格区、Newsletter 订阅区。
- **文章详情页** — 新增 `src/views/ArticlePage.vue`，支持动态路由 `/article/:slug`，通过 frontmatter 解析 + `marked` 渲染 md 文章，含加载/错误状态、前后篇导航。
- **文章数据层** — `public/docs/` 存放 6 篇 demo md 文章，`src/data/articles.ts` 作为文章注册表，新增文章只需添加 md 文件 + 注册一条记录即可自动展示。
- **新增依赖** — 安装 `marked` 用于 markdown 转 HTML 渲染。

---

**更新时间: 2026-05-19 16:35**

- **安装本地 skill `code-review`** — 对代码变更进行多维度审查，输出结构化报告。
- **安装本地 skill `frontend-design`** — 用于创建和优化前端界面，支持多种框架（React、Next.js、Vue、HTML/CSS），提供高质量 UI 设计指导。

---

### 2026-05-18

**更新时间: 2026-05-18 17:46**

- **安装 Claude Code 插件** — 启用 `skill-creator@claude-plugins-official` 和 `superpowers@claude-plugins-official`，配置写入 `.claude/settings.json`。
- **创建本地 skill `update-devlog`** — 用于记录并生成 devlog.md 的项目改动日志。

---

**更新时间: 2026-05-18 17:30**

- **修改 `CLAUDE.md`** — 补充 TypeScript 配置说明、Node 版本要求、Vue DevTools 集成、Vitest 配置细节及构建脚本说明。

---

**更新时间: 2026-05-18 17:22**

- **新增 `CLAUDE.md`** (`84418fb`) — 添加项目架构、命令、路径别名、状态管理、测试和代码格式化等开发指引文档。

---

**更新时间: 2026-05-18 17:04**

- **项目初始化** (`cb9b2b4`) — 使用 Vue 3 + Vite + TypeScript + Pinia + Vue Router 搭建博客前端项目骨架，包含基础目录结构、路由、状态管理示例（counter store）、单元测试配置（Vitest + jsdom）及 Prettier 格式化规范。
