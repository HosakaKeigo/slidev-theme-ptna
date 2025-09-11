<template>
  <div class="piano-keys" :class="{ small, large, vertical }" :style="{ width: width + 'px' }">
    <div
      v-for="(key, index) in keys"
      :key="index"
      :class="[
        'piano-key',
        key.type,
        { 
          active: activeKeys.includes(key.note),
          highlight: highlightKeys.includes(key.note)
        }
      ]"
      :style="key.style"
      @click="playNote(key.note)"
    >
      <span v-if="showNotes" class="note-label">{{ key.note }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  octaves?: number
  startOctave?: number
  width?: number
  height?: number
  showNotes?: boolean
  activeKeys?: string[]
  highlightKeys?: string[]
  small?: boolean
  large?: boolean
  vertical?: boolean
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  octaves: 1,
  startOctave: 4,
  width: 480,
  height: 80,
  showNotes: false,
  activeKeys: () => [],
  highlightKeys: () => [],
  small: false,
  large: false,
  vertical: false,
  interactive: false,
})

const emit = defineEmits<{
  noteClick: [note: string]
}>()

// 1オクターブのキー配置
const octavePattern = [
  { note: 'C', type: 'white', offset: 0 },
  { note: 'C#', type: 'black', offset: 35 },
  { note: 'D', type: 'white', offset: 48 },
  { note: 'D#', type: 'black', offset: 83 },
  { note: 'E', type: 'white', offset: 96 },
  { note: 'F', type: 'white', offset: 144 },
  { note: 'F#', type: 'black', offset: 179 },
  { note: 'G', type: 'white', offset: 192 },
  { note: 'G#', type: 'black', offset: 227 },
  { note: 'A', type: 'white', offset: 240 },
  { note: 'A#', type: 'black', offset: 275 },
  { note: 'B', type: 'white', offset: 288 },
]

const keys = computed(() => {
  const allKeys = []
  const octaveWidth = props.width / props.octaves
  
  for (let octave = 0; octave < props.octaves; octave++) {
    const currentOctave = props.startOctave + octave
    
    for (const keyData of octavePattern) {
      const absolutePosition = (octave * octaveWidth) + (keyData.offset * (octaveWidth / 336))
      
      allKeys.push({
        note: `${keyData.note}${currentOctave}`,
        type: keyData.type,
        style: props.vertical ? {
          top: `${absolutePosition}px`,
          left: '0px',
          width: keyData.type === 'white' ? '80px' : '50px',
          height: keyData.type === 'white' ? '40px' : '25px',
        } : {
          left: `${absolutePosition}px`,
          top: '0px',
          width: keyData.type === 'white' ? `${octaveWidth / 7}px` : `${octaveWidth / 14}px`,
          height: keyData.type === 'white' ? `${props.height}px` : `${props.height * 0.6}px`,
        }
      })
    }
  }
  
  // 白鍵を先に、黒鍵を後に描画するためにソート
  return allKeys.sort((a, b) => {
    if (a.type === 'white' && b.type === 'black') return -1
    if (a.type === 'black' && b.type === 'white') return 1
    return 0
  })
})

const playNote = (note: string) => {
  if (props.interactive) {
    emit('noteClick', note)
  }
}
</script>

<style scoped>
.piano-keys {
  position: relative;
  display: inline-block;
  user-select: none;
}

.piano-keys.small {
  transform: scale(0.7);
}

.piano-keys.large {
  transform: scale(1.3);
}

.piano-keys.vertical {
  writing-mode: vertical-lr;
}

.piano-key {
  position: absolute;
  border-radius: 0 0 4px 4px;
  cursor: default;
  transition: all 0.15s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
}

.piano-key.white {
  background: linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%);
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.piano-key.black {
  background: linear-gradient(to bottom, #333 0%, #000 100%);
  border: 1px solid #000;
  border-top: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 2;
}

.piano-key.white:hover {
  background: linear-gradient(to bottom, #f0f0f0 0%, #e8e8e8 100%);
  cursor: pointer;
}

.piano-key.black:hover {
  background: linear-gradient(to bottom, #555 0%, #333 100%);
  cursor: pointer;
}

.piano-key.active {
  transform: translateY(2px);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.piano-key.white.active {
  background: linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%);
}

.piano-key.black.active {
  background: linear-gradient(to bottom, #666 0%, #444 100%);
}

.piano-key.highlight {
  background: var(--ptna-primary) !important;
  color: white;
  animation: highlight-pulse 2s infinite;
}

@keyframes highlight-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.note-label {
  font-size: 10px;
  font-weight: 500;
  color: #666;
  text-align: center;
}

.piano-key.black .note-label {
  color: #ccc;
}

.piano-key.highlight .note-label {
  color: white;
}

/* Vertical layout adjustments */
.piano-keys.vertical .piano-key {
  border-radius: 4px 0 0 4px;
}

.piano-keys.vertical .piano-key.white {
  border-left: none;
  border-right: 1px solid #ccc;
}

.piano-keys.vertical .piano-key.black {
  border-left: none;
  border-right: 1px solid #000;
}

/* Dark mode */
html.dark .piano-key.white {
  background: linear-gradient(to bottom, #e0e0e0 0%, #d0d0d0 100%);
  border-color: #999;
}

html.dark .piano-key.white:hover {
  background: linear-gradient(to bottom, #f0f0f0 0%, #e0e0e0 100%);
}

html.dark .note-label {
  color: #333;
}
</style>
