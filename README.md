# ZenoxBlog

基于 **Vue 3 + TypeScript + Vite** 构建的个人博客，由 **Claude Code + DeepSeek V4** AI Agent 辅助开发。

## 技术栈

| 类别         | 技术                                      |
| ------------ | ----------------------------------------- |
| 框架         | Vue 3 (Composition API + `<script setup>`) |
| 语言         | TypeScript                                |
| 构建工具     | Vite 8                                    |
| 状态管理     | Pinia                                     |
| 路由         | Vue Router 5                              |
| Markdown 渲染 | marked                                    |
| 代码格式化   | Prettier                                  |
| 单元测试     | Vitest + jsdom + @vue/test-utils          |
| AI 开发工具  | Claude Code + DeepSeek V4                 |

## 项目结构

```
src/
  main.ts              # 应用入口
  App.vue              # 根组件
  styles/global.css    # 全局样式与设计令牌
  router/index.ts      # 路由配置
  data/articles.ts     # 文章注册表
  views/               # 页面视图
    HomePage.vue       # 首页
    ArticlePage.vue    # 文章详情页
  components/          # 公共组件
    NavBar.vue         # 导航栏
    BlogCard.vue       # 文章卡片
    PageFooter.vue     # 页脚
public/docs/           # Markdown 文章存放目录
```

## 开发

```sh
npm install        # 安装依赖
npm run dev        # 启动开发服务器（HMR）
npm run build      # 类型检查 + 生产构建
npm run preview    # 本地预览生产构建
npm run test:unit  # 运行单元测试
npm run type-check # 仅类型检查
npm run format     # Prettier 格式化 src/
```

## 新增文章

1. 在 `public/docs/` 下创建 `{slug}.md`，添加 frontmatter 元数据：

```md
---
title: "文章标题"
date: "2026-05-19"
category: "Technology"
readTime: "5 min read"
excerpt: "文章摘要..."
---

## 正文内容
```

2. 在 `src/data/articles.ts` 注册表中追加一条同 slug 的记录。
3. 首页自动展示新文章卡片，点击进入详情页。

## IDE 推荐

[VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（请禁用 Vetur）。

## 浏览器推荐

- Chromium 内核浏览器（Chrome、Edge、Brave 等）
- 安装 [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- 在 Chrome DevTools 中[启用自定义对象格式化工具](http://bit.ly/object-formatters)
