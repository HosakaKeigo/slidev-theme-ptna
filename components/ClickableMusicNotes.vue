<!--
ClickableMusicNotes Component - インタラクティブな音符表示コンポーネント

使用用途:
- v-clickと連携した段階的な情報表示
- プレゼンテーションでの順次説明
- 音符をクリックして関連情報を表示
- アニメーション付きのインタラクティブな演出

特徴:
- Slidevのv-click機能と連携
- クリックごとに音符が増えていく演出
- 各音符に関連付けられた情報の表示
- 音楽的なアニメーション効果

使用方法:
<ClickableMusicNotes :items="[
  { note: '♪', label: 'ポイント1', description: '説明文1' },
  { note: '♫', label: 'ポイント2', description: '説明文2' },
  { note: '♬', label: 'ポイント3', description: '説明文3' }
]" />
-->

<script setup lang="ts">
import { ref, computed } from 'vue';

interface MusicNoteItem {
  note?: string;
  label: string;
  description?: string;
  color?: string;
}

const props = defineProps<{
  items: MusicNoteItem[];
  layout?: 'horizontal' | 'vertical' | 'circle';
  animate?: boolean;
  size?: 'small' | 'medium' | 'large';
}>();

const currentIndex = ref(0);
const hoveredIndex = ref<number | null>(null);

const noteDefaults = ['♪', '♫', '♬', '♩', '♭', '♮'];

const layoutClass = computed(() => {
  switch (props.layout) {
    case 'vertical':
      return 'flex-col space-y-6';
    case 'circle':
      return 'circle-layout';
    default:
      return 'flex-row space-x-8';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return {
        note: 'text-3xl',
        label: 'text-sm',
        description: 'text-xs',
        container: 'w-20 h-20',
      };
    case 'large':
      return {
        note: 'text-6xl',
        label: 'text-xl',
        description: 'text-base',
        container: 'w-32 h-32',
      };
    default:
      return {
        note: 'text-4xl',
        label: 'text-base',
        description: 'text-sm',
        container: 'w-24 h-24',
      };
  }
});

const getItemStyle = (item: MusicNoteItem, index: number) => {
  if (props.layout === 'circle') {
    const angle = (360 / props.items.length) * index;
    const radius = 150;
    const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
    const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  }
  return {};
};
</script>

<template>
  <div class="clickable-music-notes">
    <div 
      :class="['notes-container flex items-center justify-center', layoutClass]"
      :style="layout === 'circle' ? 'position: relative; width: 400px; height: 400px; margin: 0 auto;' : ''"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        v-click
        :class="[
          'note-item',
          layout === 'circle' ? 'absolute' : 'relative',
          animate ? 'animate-bounce-in' : '',
        ]"
        :style="getItemStyle(item, index)"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Note container -->
        <div 
          :class="[
            'note-container rounded-full flex items-center justify-center transition-all duration-300',
            sizeClasses.container,
            hoveredIndex === index ? 'transform scale-110' : '',
          ]"
          :style="{
            background: item.color || 'var(--ptna-primary)',
            boxShadow: hoveredIndex === index ? '0 8px 20px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.1)',
          }"
        >
          <span :class="['note-symbol text-white', sizeClasses.note]">
            {{ item.note || noteDefaults[index % noteDefaults.length] }}
          </span>
        </div>

        <!-- Label -->
        <div :class="['note-label mt-3 text-center font-semibold', sizeClasses.label]">
          {{ item.label }}
        </div>

        <!-- Description (shown on hover) -->
        <div 
          v-if="item.description"
          :class="[
            'note-description absolute top-full mt-2 p-3 rounded-lg shadow-lg transition-opacity duration-300',
            sizeClasses.description,
            hoveredIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible',
          ]"
          style="
            background: white;
            border: 1px solid rgba(0,0,0,0.1);
            min-width: 200px;
            z-index: 10;
          "
        >
          {{ item.description }}
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div v-if="items.length > 1" class="progress-bar mt-8 mx-auto max-w-md">
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-ptna-primary to-ptna-secondary transition-all duration-500"
          :style="{ width: `${((currentIndex + 1) / items.length) * 100}%` }"
        ></div>
      </div>
      <div class="flex justify-between mt-2">
        <span 
          v-for="(item, index) in items" 
          :key="`dot-${index}`"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            index <= currentIndex ? 'bg-ptna-primary' : 'bg-gray-300',
          ]"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clickable-music-notes {
  @apply relative py-8;
}

.note-item {
  @apply cursor-pointer;
}

.note-label {
  color: var(--ptna-text-primary);
}

.note-description {
  color: var(--ptna-text-primary);
}

/* Animations */
@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(90deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Circle layout specific styles */
.circle-layout .note-item {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -48px; /* Half of container width */
  margin-top: -48px; /* Half of container height */
}

/* Custom colors */
.bg-ptna-primary {
  background-color: var(--ptna-primary);
}

.bg-ptna-secondary {
  background-color: var(--ptna-secondary, var(--ptna-primary));
}

.from-ptna-primary {
  --tw-gradient-from: var(--ptna-primary);
}

.to-ptna-secondary {
  --tw-gradient-to: var(--ptna-secondary, var(--ptna-primary));
}

/* Hover effects */
.note-container:hover {
  animation: rotate 1s ease-in-out;
}

@keyframes rotate {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .notes-container.flex-row {
    @apply flex-col space-x-0 space-y-6;
  }

  .circle-layout {
    transform: scale(0.7);
  }
}
</style>