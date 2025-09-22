<!--
Comparison Layout - 比較表示用レイアウト

使用用途:
- 指導方法やプログラムの比較検討
- 新旧システムの違いの説明
- 長所・短所の対比表示
- オプションや料金プランの比較

特徴:
- 左右または上下に分けた明確な対比表示
- 各項目に音符マークで視覚的な区別
- チェックマークや×マークでの評価表示
- two-colsよりも比較に特化したデザイン

使用方法:
---
layout: comparison
leftTitle: 従来の方法
rightTitle: 新しい方法
---

::left::
- 項目1
- 項目2

::right::
- 項目1
- 項目2
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PageIndicator from "../components/PageIndicator.vue";
import MusicalDecorations from "../components/MusicalDecorations.vue";

const props = defineProps({
  background: {
    default: "",
  },
  leftTitle: {
    type: String,
    default: "",
  },
  rightTitle: {
    type: String,
    default: "",
  },
  highlight: {
    type: String,
    default: "none",
    validator: (value: string) => ["none", "left", "right"].includes(value),
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout comparison" :style="style">
    <PtnaLogo />

    <div class="h-full flex flex-col justify-center px-8 py-6">
      <!-- Main title -->
      <div v-if="$slots.title" class="text-center mb-8">
        <slot name="title" />
      </div>

      <!-- Comparison container -->
      <div class="comparison-container grid grid-cols-2 gap-8 relative">
        <!-- Left side -->
        <div
          :class="[
            'comparison-side left-side',
            highlight === 'left' ? 'highlighted' : '',
            highlight === 'right' ? 'dimmed' : '',
          ]"
        >
          <!-- Left title -->
          <div class="side-header">
            <div class="header-decoration">♪</div>
            <h2 class="side-title">{{ leftTitle || 'Option A' }}</h2>
          </div>

          <!-- Left content -->
          <div class="side-content">
            <slot name="left" />
          </div>
        </div>

        <!-- Center divider -->
        <div class="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
          <div class="divider-line"></div>
        </div>

        <!-- Right side -->
        <div
          :class="[
            'comparison-side right-side',
            highlight === 'right' ? 'highlighted' : '',
            highlight === 'left' ? 'dimmed' : '',
          ]"
        >
          <!-- Right title -->
          <div class="side-header">
            <div class="header-decoration">♫</div>
            <h2 class="side-title">{{ rightTitle || 'Option B' }}</h2>
          </div>

          <!-- Right content -->
          <div class="side-content">
            <slot name="right" />
          </div>
        </div>
      </div>

      <!-- Footer content -->
      <div v-if="$slots.default" class="mt-8 text-center">
        <slot />
      </div>
    </div>

    <MusicalDecorations variant="default" :opacity="0.03" />
    <PageIndicator />
  </div>
</template>

<style scoped>
.slidev-layout.comparison {
  @apply h-full;
  background: white;
}

/* Comparison container */
.comparison-container {
  @apply relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* Side styling */
.comparison-side {
  @apply relative p-6 rounded-lg;
  transition: all 0.3s ease;
}

.comparison-side.left-side {
  background: #ffffff;
  border: 2px solid #000000;
}

.comparison-side.right-side {
  background: #000000;
  color: #ffffff !important;
  border: 2px solid #000000;
}

.right-side * {
  color: #ffffff !important;
}

.comparison-side.highlighted {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}

.comparison-side.dimmed {
  opacity: 0.5;
}

/* Side header */
.side-header {
  @apply flex items-center mb-6 pb-4 border-b-2;
}

.left-side .side-header {
  border-color: rgba(0, 0, 0, 0.2);
}

.right-side .side-header {
  border-color: rgba(255, 255, 255, 0.2);
}

.header-decoration {
  @apply text-3xl mr-3;
}

.left-side .header-decoration {
  color: #000000;
}

.right-side .header-decoration {
  color: #ffffff;
}

.side-title {
  @apply text-2xl font-bold flex-1;
}

.left-side .side-title {
  color: #000000;
}

.right-side .side-title {
  color: #ffffff;
}

/* Side content */
.side-content {
  @apply space-y-3;
}

.side-content :deep(ul),
.side-content :deep(ol) {
  @apply space-y-3;
  padding: 0;
}

.side-content :deep(li) {
  @apply flex items-start;
  position: relative;
}

.right-side .side-content :deep(li) {
  color: #ffffff !important;
}

.side-content :deep(p) {
  @apply text-base leading-relaxed;
}

.left-side .side-content :deep(p) {
  color: #333333;
}

.right-side .side-content :deep(p) {
  color: #ffffff !important;
}

.side-content :deep(h3) {
  @apply text-lg font-semibold mt-4 mb-2;
}

.left-side .side-content :deep(h3) {
  color: #000000;
}

.right-side .side-content :deep(h3) {
  color: #ffffff !important;
}

.side-content :deep(h4) {
  @apply text-base font-medium mt-3 mb-1;
}

.left-side .side-content :deep(h4) {
  color: #666666;
}

.right-side .side-content :deep(h4) {
  color: #cccccc !important;
}

/* Check and cross marks */
.side-content :deep(.check) {
  color: #22c55e;
}

.side-content :deep(.check::before) {
  content: "✓";
  color: #22c55e;
}

.side-content :deep(.cross) {
  color: #ef4444;
}

.side-content :deep(.cross::before) {
  content: "✗";
  color: #ef4444;
}

/* Center divider */
.divider-line {
  @apply absolute w-0.5 h-full;
  background: #666666;
  opacity: 0.3;
}

/* Main title */
.slidev-layout.comparison h1 {
  @apply text-4xl font-bold;
  color: var(--ptna-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .comparison-container {
    @apply grid-cols-1 gap-6;
  }

  .divider-line {
    display: none;
  }

  .versus-badge {
    @apply top-0;
    transform: translate(-50%, -50%);
  }

  .comparison-side {
    @apply p-4;
  }

  .side-title {
    @apply text-xl;
  }

  .header-decoration {
    @apply text-2xl;
  }
}
</style>