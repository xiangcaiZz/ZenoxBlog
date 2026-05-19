export interface Article {
  slug: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
}

/**
 * Article registry.
 * To add a new article:
 * 1. Create `public/docs/{slug}.md` with frontmatter (title, date, category, readTime, excerpt)
 * 2. Add an entry to this array with the matching slug
 */
export const articles: Article[] = [
  {
    slug: 'the-future-of-edge-computing',
    title: 'The Future of Edge Computing: Beyond the Cloud',
    date: '2026-05-15',
    category: 'Technology',
    readTime: '8 min read',
    excerpt:
      'As computation moves closer to the data source, edge computing is reshaping how we think about latency, privacy, and distributed systems architecture.',
  },
  {
    slug: 'designing-for-the-unknown',
    title: 'Designing for the Unknown: A Systems Approach to UI',
    date: '2026-05-10',
    category: 'Design',
    readTime: '6 min read',
    excerpt:
      'When building interfaces for complex systems, traditional design patterns fall short. A systems-thinking approach changes everything.',
  },
  {
    slug: 'rust-in-production',
    title: 'Rust in Production: Lessons from a Year of Shipping',
    date: '2026-05-03',
    category: 'Engineering',
    readTime: '12 min read',
    excerpt:
      'After migrating core services to Rust, here are the surprising wins, the unexpected friction, and what nobody tells you about the ecosystem.',
  },
  {
    slug: 'local-first-software',
    title: 'The Quiet Revolution of Local-First Software',
    date: '2026-04-28',
    category: 'Technology',
    readTime: '7 min read',
    excerpt:
      'CRDTs, offline-first architectures, and the growing movement to put data back in the hands of users rather than centralized servers.',
  },
  {
    slug: 'typography-as-architecture',
    title: 'Typography as Architecture: Building Visual Hierarchy',
    date: '2026-04-20',
    category: 'Design',
    readTime: '5 min read',
    excerpt:
      'Type is not just about readability — it is the structural framework of any interface. A deep dive into typographic systems for the web.',
  },
  {
    slug: 'beyond-rest-event-driven-apis',
    title: 'Beyond REST: Event-Driven APIs for Modern Applications',
    date: '2026-04-12',
    category: 'Engineering',
    readTime: '9 min read',
    excerpt:
      'WebSockets, SSE, and message queues are changing the API landscape. When should you move beyond request-response patterns?',
  },
]
