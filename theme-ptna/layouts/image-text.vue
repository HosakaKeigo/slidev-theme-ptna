<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'

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
        <div class="absolute -right-6 top-1/2 transform -translate-y-1/2 text-ptna-primary opacity-30 text-xl">♪</div>
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
    
    <!-- Page indicator -->
    <div class="absolute bottom-4 right-4 text-sm text-gray-500">
      <div class="flex items-center">
        <div class="w-2 h-2 bg-ptna-primary rounded-full mr-2"></div>
        <span class="font-mono">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
      </div>
    </div>
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

.bg-ptna-primary {
  background-color: var(--ptna-primary);
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