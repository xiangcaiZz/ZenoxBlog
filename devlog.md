# DevLog — ZenoxBlog

---

### 2026-05-19

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
