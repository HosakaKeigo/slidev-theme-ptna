<template>
  <span 
    class="musical-note" 
    :class="[
      `note-${type}`,
      `size-${size}`,
      { 
        animated,
        floating: animation === 'float',
        rotating: animation === 'rotate',
        pulsing: animation === 'pulse'
      }
    ]"
    :style="{ 
      color,
      animationDelay: `${delay}ms`,
      transform: `rotate(${rotate}deg)`
    }"
    @click="handleClick"
  >
    {{ noteSymbol }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'quarter' | 'eighth' | 'sixteenth' | 'half' | 'whole' | 'treble' | 'bass' | 'sharp' | 'flat' | 'natural' | 'rest-quarter' | 'rest-eighth' | 'rest-half' | 'rest-whole'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  color?: string
  animation?: 'float' | 'rotate' | 'pulse' | 'none'
  delay?: number
  rotate?: number
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'quarter',
  size: 'md',
  color: 'currentColor',
  animation: 'none',
  delay: 0,
  rotate: 0,
  interactive: false,
})

const emit = defineEmits<{
  click: [type: string]
}>()

// 音楽記号のマッピング
const noteSymbols = {
  // 音符
  'quarter': '♩',        // 四分音符
  'eighth': '♪',         // 八分音符
  'sixteenth': '♬',      // 十六分音符
  'half': '♫',           // 二分音符
  'whole': '𝅝',         // 全音符
  
  // 音部記号
  'treble': '𝄞',        // ト音記号
  'bass': '𝄢',          // ヘ音記号
  
  // 臨時記号
  'sharp': '♯',          // シャープ
  'flat': '♭',           // フラット
  'natural': '♮',        // ナチュラル
  
  // 休符
  'rest-quarter': '𝄽',   // 四分休符
  'rest-eighth': '𝄾',    // 八分休符
  'rest-half': '𝄼',      // 二分休符
  'rest-whole': '𝄻',     // 全休符
}

const noteSymbol = computed(() => {
  return noteSymbols[props.type] || noteSymbols.quarter
})

const animated = computed(() => {
  return props.animation !== 'none'
})

const handleClick = () => {
  if (props.interactive) {
    emit('click', props.type)
  }
}
</script>

<style scoped>
.musical-note {
  display: inline-block;
  font-family: 'Times New Roman', serif;
  line-height: 1;
  user-select: none;
  transition: all 0.3s ease;
}

/* サイズバリエーション */
.size-xs {
  font-size: 0.75rem;
}

.size-sm {
  font-size: 1rem;
}

.size-md {
  font-size: 1.25rem;
}

.size-lg {
  font-size: 1.5rem;
}

.size-xl {
  font-size: 2rem;
}

.size-2xl {
  font-size: 2.5rem;
}

.size-3xl {
  font-size: 3rem;
}

/* 音符タイプ別の特殊スタイリング */
.note-treble,
.note-bass {
  font-weight: bold;
}

.note-sharp,
.note-flat,
.note-natural {
  font-weight: 600;
  margin: 0 0.1em;
}

/* アニメーション */
.floating {
  animation: float 3s ease-in-out infinite;
}

.rotating {
  animation: rotate 4s linear infinite;
}

.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(var(--rotate-deg, 0deg));
  }
  50% {
    transform: translateY(-10px) rotate(var(--rotate-deg, 0deg));
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) rotate(var(--rotate-deg, 0deg));
    opacity: 1;
  }
  50% {
    transform: scale(1.1) rotate(var(--rotate-deg, 0deg));
    opacity: 0.8;
  }
}

/* インタラクティブ */
.musical-note[data-interactive="true"] {
  cursor: pointer;
}

.musical-note[data-interactive="true"]:hover {
  transform: scale(1.2);
  color: var(--ptna-primary);
}

/* 特殊エフェクト */
.musical-note.glow {
  text-shadow: 0 0 10px currentColor;
}

.musical-note.shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* カラーバリエーション */
.musical-note.primary {
  color: var(--ptna-primary);
}

.musical-note.accent {
  color: var(--ptna-accent);
}

.musical-note.muted {
  color: var(--ptna-gray);
  opacity: 0.7;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .size-3xl {
    font-size: 2rem;
  }
  
  .size-2xl {
    font-size: 1.75rem;
  }
  
  .size-xl {
    font-size: 1.25rem;
  }
}

/* グループアニメーション用のディレイ */
.musical-note[style*="animation-delay"] {
  animation-fill-mode: both;
}
</style>
