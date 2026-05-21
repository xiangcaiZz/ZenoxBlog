<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Article } from '@/data/articles'

// 接收外部传入的文章对象，为 null 时表示新增模式
const props = defineProps<{
  article?: Article | null
}>()

const emit = defineEmits<{
  close: []
  save: [data: { article: Article; content: string; isNew: boolean }]
}>()

// ---- 表单字段 ----
const title = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const category = ref('技术')
const readTime = ref('5 分钟')
const excerpt = ref('')
const content = ref('')
const image = ref('')
const isNew = ref(true)

// 监听外部 article 变化，同步填充（编辑模式）或重置（新增模式）表单
watch(
  () => props.article,
  (a) => {
    if (a) {
      title.value = a.title
      date.value = a.date
      category.value = a.category
      readTime.value = a.readTime
      excerpt.value = a.excerpt
      image.value = a.image
      isNew.value = false
    } else {
      title.value = ''
      date.value = new Date().toISOString().slice(0, 10)
      category.value = '技术'
      readTime.value = '5 分钟'
      excerpt.value = ''
      image.value = ''
      isNew.value = true
    }
    content.value = ''
  },
  { immediate: true },
)

// 保存：校验标题非空，根据标题生成 slug，组合数据后向上 emit
function handleSave() {
  if (!title.value.trim()) return

  const id = props.article?.id ?? 0
  const slug = props.article?.slug ?? title.value.trim().toLowerCase().replace(/\s+/g, '-')
  const article: Article = {
    id,
    image: image.value || String(Date.now()),
    slug,
    title: title.value.trim(),
    date: date.value,
    category: category.value,
    readTime: readTime.value,
    excerpt: excerpt.value.trim(),
  }

  emit('save', { article, content: content.value, isNew: isNew.value })
}
</script>

<template>
  <Teleport to="body">
    <div class="editor-overlay" @click.self="emit('close')">
      <div class="editor-modal">
        <div class="editor-modal__header">
          <div class="editor-modal__accent-line"></div>
          <h2 class="editor-modal__title">{{ isNew ? '新增文章' : '编辑文章' }}</h2>
          <button class="editor-modal__close" @click="emit('close')" aria-label="关闭">&times;</button>
        </div>

        <div class="editor-modal__body">
          <div class="editor-modal__row">
            <label class="editor-modal__label">标题</label>
            <input v-model="title" class="editor-modal__input" placeholder="文章标题" />
          </div>

          <div class="editor-modal__row editor-modal__row--triple">
            <label class="editor-modal__group">
              <span class="editor-modal__label">日期</span>
              <input v-model="date" type="date" class="editor-modal__input" />
            </label>
            <label class="editor-modal__group">
              <span class="editor-modal__label">分类</span>
              <select v-model="category" class="editor-modal__input">
                <option>技术</option>
                <option>设计</option>
                <option>工程</option>
              </select>
            </label>
            <label class="editor-modal__group">
              <span class="editor-modal__label">阅读时长</span>
              <input v-model="readTime" class="editor-modal__input" placeholder="5 分钟" />
            </label>
          </div>

          <div class="editor-modal__row">
            <label class="editor-modal__label">封面图片（预留）</label>
            <input v-model="image" class="editor-modal__input" placeholder="封面标识，暂与 id 一致" />
          </div>

          <div class="editor-modal__row">
            <label class="editor-modal__label">导言</label>
            <textarea v-model="excerpt" class="editor-modal__textarea editor-modal__textarea--sm"
              placeholder="文章导言摘要..." rows="2"></textarea>
          </div>

          <div class="editor-modal__row editor-modal__row--grow">
            <label class="editor-modal__label">正文 (Markdown)</label>
            <textarea v-model="content" class="editor-modal__textarea editor-modal__textarea--lg"
              placeholder="在此输入 Markdown 正文..."></textarea>
          </div>
        </div>

        <div class="editor-modal__footer">
          <button class="editor-modal__btn editor-modal__btn--cancel" @click="emit('close')">取消</button>
          <button class="editor-modal__btn editor-modal__btn--save" @click="handleSave">保存</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.editor-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 7, 16, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 40px;
}

.editor-modal {
  width: min(800px, 100%);
  max-height: 90vh;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-modal__header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 32px 20px;
  border-bottom: 1px solid var(--color-border);
}

.editor-modal__accent-line {
  width: 32px;
  height: 1px;
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-glow);
  flex-shrink: 0;
}

.editor-modal__title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  flex: 1;
}

.editor-modal__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
  border: 1px solid transparent;
}

.editor-modal__close:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.editor-modal__body {
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.editor-modal__row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.editor-modal__row--triple {
  flex-direction: row;
  gap: 16px;
}

.editor-modal__row--grow {
  flex: 1;
  min-height: 200px;
}

.editor-modal__group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.editor-modal__label {
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.editor-modal__input {
  padding: 10px 14px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  outline: none;
  transition: border-color 0.3s ease;
}

.editor-modal__input:focus {
  border-color: var(--color-accent);
}

select.editor-modal__input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23556885'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

.editor-modal__textarea {
  padding: 12px 14px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  outline: none;
  resize: none;
  transition: border-color 0.3s ease;
}

.editor-modal__textarea:focus {
  border-color: var(--color-accent);
}

.editor-modal__textarea--sm {
  min-height: 56px;
}

.editor-modal__textarea--lg {
  flex: 1;
  min-height: 220px;
}

.editor-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 32px;
  border-top: 1px solid var(--color-border);
}

.editor-modal__btn {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 12px 32px;
  transition: all 0.3s ease;
}

.editor-modal__btn--cancel {
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.editor-modal__btn--cancel:hover {
  color: var(--color-text-primary);
  border-color: var(--color-border-hover);
}

.editor-modal__btn--save {
  background: rgba(0, 200, 232, 0.1);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
}

.editor-modal__btn--save:hover {
  background: rgba(0, 200, 232, 0.18);
  box-shadow: 0 0 24px var(--color-accent-glow), inset 0 0 24px rgba(0, 200, 232, 0.04);
}

@media (max-width: 640px) {
  .editor-overlay {
    padding: 0;
  }

  .editor-modal {
    max-height: 100vh;
    height: 100vh;
    border: none;
  }

  .editor-modal__header {
    padding: 20px 20px 16px;
  }

  .editor-modal__body {
    padding: 20px;
  }

  .editor-modal__row--triple {
    flex-direction: column;
  }

  .editor-modal__footer {
    padding: 16px 20px;
  }
}
</style>
