<!--
Timeline Layout - 時系列表示用レイアウト

使用用途:
- PTNAの歴史や沿革の表示
- プロジェクトの進捗やロードマップ
- カリキュラムの進行スケジュール
- イベントや公演の時系列紹介

特徴:
- 五線譜をモチーフにした横軸デザイン
- 時系列に沿った視覚的な情報表示
- 各イベントに音符装飾
- 自動的なアニメーション効果（オプション）

使用方法:
---
layout: timeline
---

::timeline::
## 1977年
PTNAの創設

## 1980年
第1回ピティナ・ピアノコンペティション開催

## 1990年  
指導者育成プログラム開始
::timeline::
-->

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PageIndicator from "../components/PageIndicator.vue";

const props = defineProps({
  background: {
    default: "",
  },
  animate: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (value: string) => ["horizontal", "vertical"].includes(value),
  },
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ""
  }
});

const style = computed(() => handleBackground(props.background));

// Parse items from slots or use props
const items = ref([]);

onMounted(() => {
  if (props.items && props.items.length > 0) {
    items.value = props.items;
  } else {
    // Parse from slot content
    const content = document.querySelector(".timeline-content-parser");
    if (content) {
      const h2Elements = content.querySelectorAll("h2");
      items.value = Array.from(h2Elements).map(item => {
        const year = item.textContent?.trim() || "";
        const nextEl = item.nextElementSibling;
        const description = nextEl?.textContent?.trim() || "";
        return { year, description };
      });
    }
  }
});
</script>

<template>
  <div class="slidev-layout timeline" :style="style">
    <PtnaLogo />

    <!-- Title in top-left -->
    <div v-if="title || $slots.title" class="timeline-title">
      <h1 v-if="title">{{ title }}</h1>
      <slot v-else name="title" />
    </div>

    <div class="h-full flex items-center justify-center px-12">
      <!-- Timeline visualization -->
      <div class="timeline-container w-full max-w-6xl">
        <!-- Hidden content parser -->
        <div class="timeline-content-parser hidden">
          <slot />
        </div>

        <!-- Timeline track with connecting line -->
        <div
          :class="[
            'timeline-track relative',
            direction === 'vertical' ? 'flex flex-col' : 'flex items-center justify-between',
          ]"
        >
          <!-- Horizontal staff lines -->
          <div v-if="direction === 'horizontal'" class="staff-container">
            <!-- Five staff lines -->
            <div class="staff-lines-group">
              <div class="staff-line"></div>
              <div class="staff-line"></div>
              <div class="staff-line"></div>
              <div class="staff-line"></div>
              <div class="staff-line"></div>
            </div>
          </div>
          
          <!-- Timeline items -->
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="[
              'timeline-item',
              direction === 'vertical' ? 'flex items-start mb-8 relative' : 'relative z-10',
              animate ? 'animate-fade-in' : '',
            ]"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <!-- Vertical connecting line for vertical layout -->
            <div v-if="direction === 'vertical' && index < items.length - 1" class="vertical-connector"></div>
            
            <!-- Year marker with icon -->
            <div class="marker-container">
              <div class="year-dot">
                <span class="note-symbol">{{ index % 3 === 0 ? '♪' : index % 3 === 1 ? '♫' : '♬' }}</span>
              </div>
              <div class="year-label">{{ item.year }}</div>
            </div>

            <!-- Description -->
            <div class="description-container">
              <div class="description">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PageIndicator />
  </div>
</template>

<style scoped>
.slidev-layout.timeline {
  @apply h-full;
  background: white;
}

/* Timeline container */
.timeline-container {
  @apply relative;
}

/* Staff container for horizontal timeline */
.staff-container {
  @apply absolute;
  top: 20%;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 1;
}

/* Staff lines group */
.staff-lines-group {
  @apply absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Individual staff line */
.staff-line {
  height: 1px;
  background: #770000;
  opacity: 0.2;
}

/* Timeline track */
.timeline-track {
  @apply relative;
  min-height: 200px;
}

/* Timeline item */
.timeline-item {
  @apply flex flex-col items-center;
}

/* Marker container */
.marker-container {
  @apply flex flex-col items-center;
}

/* Year dot/icon */
.year-dot {
  @apply w-16 h-16 rounded-full flex items-center justify-center;
  background: var(--ptna-primary);
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
}

.note-symbol {
  @apply text-2xl text-white;
}

/* Year label */
.year-label {
  @apply mt-3 text-lg font-bold;
  color: var(--ptna-primary);
}

/* Description */
.description-container {
  @apply mt-4 text-center max-w-[150px];
}

.description {
  @apply text-sm font-medium;
  color: var(--ptna-text-primary);
  line-height: 1.4;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

/* Vertical layout styles */
.timeline-track.flex-col {
  @apply relative;
  padding-left: 4rem;
}

.timeline-track.flex-col .timeline-item {
  @apply flex-row items-start;
}

.timeline-track.flex-col .marker-container {
  @apply absolute left-0;
}

/* Vertical staff lines for vertical layout */
.vertical-connector {
  @apply absolute;
  left: 1.5rem;
  top: 4rem;
  bottom: -2rem;
  width: 40px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}

.vertical-connector::before,
.vertical-connector::after,
.vertical-connector .staff-v-line {
  content: "";
  width: 1.5px;
  background: var(--ptna-primary);
  opacity: 0.3;
}

/* Add middle lines for vertical staff */
.timeline-track.flex-col .timeline-item::after {
  content: "";
  @apply absolute;
  left: 1.5rem;
  top: 4rem;
  bottom: -2rem;
  width: 40px;
  background: repeating-linear-gradient(
    to right,
    transparent,
    transparent 8px,
    var(--ptna-primary) 8px,
    var(--ptna-primary) 9.5px
  );
  opacity: 0.3;
  z-index: 1;
}

.timeline-track.flex-col .description-container {
  @apply ml-6 text-left max-w-none flex-1;
}

.timeline-track.flex-col .description {
  @apply text-base;
}

/* Animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

/* Title styling */
.timeline-title {
  @apply absolute top-12 left-12;
  z-index: 20;
}

.timeline-title h1 {
  @apply text-3xl font-bold;
  color: var(--ptna-primary);
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
}

/* Hidden content parser */
.timeline-content-parser {
  display: none !important;
}

/* Responsive */
@media (max-width: 768px) {
  .slidev-layout.timeline {
    @apply px-4 py-6;
  }

  .timeline-track:not(.flex-col) {
    @apply flex-col;
  }

  .timeline-item {
    @apply mb-8;
  }

  .year-dot {
    @apply w-12 h-12;
  }

  .note-symbol {
    @apply text-2xl;
  }

  .year-label {
    @apply text-lg;
  }

  .description {
    @apply text-sm;
  }
}
</style>