export interface Article {
  slug: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
}

/**
 * 文章注册表。
 * 新增文章步骤：
 * 1. 在 `public/docs/{slug}.md` 创建 md 文件，添加 frontmatter（title, date, category, readTime, excerpt）
 * 2. 在本数组中追加一条同 slug 的记录
 */
export const articles: Article[] = [
  {
    slug: 'the-future-of-edge-computing',
    title: '边缘计算的未来：超越云端',
    date: '2026-05-15',
    category: '技术',
    readTime: '8 分钟',
    excerpt:
      '随着计算不断向数据源头靠近，边缘计算正在重塑我们对延迟、隐私和分布式系统架构的认知。',
  },
  {
    slug: 'designing-for-the-unknown',
    title: '为未知而设计：系统化 UI 思维方式',
    date: '2026-05-10',
    category: '设计',
    readTime: '6 分钟',
    excerpt:
      '当为复杂系统构建界面时，传统的设计模式不再适用。系统化思维方式将改变一切。',
  },
  {
    slug: 'rust-in-production',
    title: 'Rust 实战：一年生产环境经验总结',
    date: '2026-05-03',
    category: '工程',
    readTime: '12 分钟',
    excerpt:
      '将核心服务迁移到 Rust 一年后，这里有意想不到的收获、意料之外的摩擦，以及鲜有人提及的生态真相。',
  },
  {
    slug: 'local-first-software',
    title: '本地优先软件的悄然革命',
    date: '2026-04-28',
    category: '技术',
    readTime: '7 分钟',
    excerpt:
      'CRDT、离线优先架构，以及不断壮大的运动——将数据归还给用户，而非集中式服务器。',
  },
  {
    slug: 'typography-as-architecture',
    title: '字体排印即架构：构建视觉层次',
    date: '2026-04-20',
    category: '设计',
    readTime: '5 分钟',
    excerpt:
      '字体不仅仅是可读性——它是任何界面的结构框架。一次关于网页字体排印系统的深度探索。',
  },
  {
    slug: 'beyond-rest-event-driven-apis',
    title: '超越 REST：现代应用的事件驱动 API',
    date: '2026-04-12',
    category: '工程',
    readTime: '9 分钟',
    excerpt:
      'WebSocket、SSE 和消息队列正在改变 API 的格局。何时应该超越请求-响应模式？',
  },
]
