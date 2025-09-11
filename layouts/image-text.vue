<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'
import PageIndicator from '../components/PageIndicator.vue'
import MusicalDecorations from '../components/MusicalDecorations.vue'

const props = defineProps({
  background: {
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  imagePosition: {
    type: String,
    default: 'right', // 'left' or 'right'
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout image-text" :style="style">
    <PtnaLogo />
    
    <div class="grid grid-cols-2 gap-8 h-full items-center">
      <!-- Left column -->
      <div class="relative">
        <div v-if="imagePosition === 'left'" class="image-column flex items-center justify-center">
          <img 
            v-if="image" 
            :src="image" 
            alt="Image" 
            class="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
          <slot v-else name="image" />
        </div>
        
        <div v-else class="text-column">
          <slot />
        </div>
        
        <!-- Vertical divider with musical theme (only between columns) -->
        <div class="absolute -right-4 top-0 bottom-0 w-0.5 bg-ptna-primary opacity-20"></div>
        <div class="absolute -right-6 top-1/2 transform -translate-y-1/2">
          <MusicalDecorations variant="divider" :opacity="0.3" />
        </div>
      </div>
      
      <!-- Right column -->
      <div>
        <div v-if="imagePosition === 'right'" class="image-column flex items-center justify-center">
          <img 
            v-if="image" 
            :src="image" 
            alt="Image" 
            class="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
          <slot v-else name="image" />
        </div>
        
        <div v-else class="text-column">
          <slot />
        </div>
      </div>
    </div>
    
    <PageIndicator />
  </div>
</template>

<style scoped>
.slidev-layout.image-text {
  padding: 2rem 3rem;
}

.image-column {
  height: 100%;
  padding: 1rem;
}

.text-column {
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-column :deep(h1) {
  margin-top: 0;
}

.text-ptna-primary {
  color: var(--ptna-primary);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .slidev-layout.image-text {
    padding: 1rem;
  }
  
  .slidev-layout.image-text .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .image-column,
  .text-column {
    padding: 0.5rem;
  }
}
</style>