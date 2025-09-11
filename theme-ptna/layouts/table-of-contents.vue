<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'

const props = defineProps({
  background: {
    default: '',
  },
  columns: {
    type: [String, Number],
    default: 1,
  },
  listClass: {
    type: [String, Array],
    default: '',
  },
  maxDepth: {
    type: [String, Number],
    default: Infinity,
  },
  minDepth: {
    type: [String, Number],
    default: 1,
  },
  mode: {
    type: String,
    default: 'all',
    validator: (value: string) => ['all', 'onlyCurrentTree', 'onlySiblings'].includes(value),
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout table-of-contents" :style="style">
    <PtnaLogo />
    
    <div class="h-full flex flex-col justify-center">
      <!-- Header content -->
      <div class="text-center mb-12">
        <slot name="title">
          <h1 class="text-5xl font-bold mb-4 text-ptna-primary">目次</h1>
          <h2 class="text-2xl text-ptna-text-secondary">Table of Contents</h2>
        </slot>

        <div v-if="$slots.default" class="mt-8 text-lg text-ptna-text-primary">
          <slot />
        </div>
      </div>

      <!-- Table of Contents -->
      <div class="flex-1 flex items-center justify-center">
        <div class="w-full max-w-4xl">
          <Toc
            columns="2"
            :listClass="['ptna-toc-list', listClass].flat().filter(Boolean)"
            :maxDepth="maxDepth"
            :minDepth="minDepth"
            :mode="mode"
          />
        </div>
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute top-1/4 left-1/6 text-ptna-primary text-6xl transform -rotate-12">📖</div>
      <div class="absolute top-3/4 right-1/6 text-ptna-primary text-5xl transform rotate-12">📑</div>
      <div class="absolute bottom-1/4 left-1/4 text-ptna-primary text-4xl">📋</div>
      <div class="absolute bottom-1/4 right-1/4 text-ptna-primary text-4xl">📚</div>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.table-of-contents {
  @apply h-full;
  padding: 3rem;
  /* 背景は白 */
  background: #ffffff;
}

.text-ptna-primary {
  color: var(--ptna-primary);
}

.text-ptna-text-secondary {
  color: var(--ptna-text-secondary);
}

.text-ptna-text-primary {
  color: var(--ptna-text-primary);
}

/* ToC カスタムスタイル */
.slidev-layout.table-of-contents :deep(.ptna-toc-list) {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: toc-item;
}

.slidev-layout.table-of-contents :deep(.ptna-toc-list > li) {
  margin: 0.75rem 0;
  /* バッジをフロー内に置くためグリッド化（見切れ防止） */
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  align-items: center;
  column-gap: 0.75rem;
  /* マルチカラムの境界での見切れ対策 */
  break-inside: avoid-column;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
}

.slidev-layout.table-of-contents :deep(.ptna-toc-list > li > a) {
  color: var(--ptna-text-primary);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  /* テキストは2列目に配置 */
  grid-column: 2;
}

.slidev-layout.table-of-contents :deep(.ptna-toc-list > li > a:hover) {
  color: var(--ptna-primary);
}

/* 連番バッジ（1スタート、黒丸白字） */
.slidev-layout.table-of-contents :deep(.ptna-toc-list > li::before) {
  counter-increment: toc-item;
  content: counter(toc-item);
  /* 1列目に配置して中央揃え。絶対配置はやめて見切れ防止 */
  grid-column: 1;
  justify-self: start;
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #000;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
}

/* 階層別スタイル */
.slidev-layout.table-of-contents :deep(.ptna-toc-list li li) {
  margin: 0.25rem 0 0.25rem 1.25rem;
  padding: 0.25rem 0.5rem;
  border-left: 2px solid var(--ptna-text-secondary);
}

/* マルチカラムサポート */
.slidev-layout.table-of-contents :deep(.ptna-toc-list[style*="column"]) {
  /* CSS Multi-column の隙間を広げる */
  -webkit-column-gap: 5rem;
  column-gap: 5rem;
  /* 念のため grid/flex の場合のギャップも広めに */
  gap: 4rem;
}

/* 以前の“楽譜の切れ端風”装飾は除去 */

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .slidev-layout.table-of-contents {
    padding: 2rem 1rem;
  }
  
  .slidev-layout.table-of-contents :deep(.ptna-toc-list a) {
    font-size: 1.1rem;
  }
  
  .slidev-layout.table-of-contents :deep(.ptna-toc-list li li) {
    margin-left: 1rem;
  }
}
</style>
