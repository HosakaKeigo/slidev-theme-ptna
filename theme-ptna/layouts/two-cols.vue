<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout two-cols" :style="style">
    <PtnaLogo />
    <div class="grid grid-cols-2 gap-8 h-full">
      <div class="col-left">
        <slot name="left" />
      </div>
      
      <!-- Vertical divider with musical theme -->
      <div class="relative">
        <div class="absolute -left-4 top-0 bottom-0 w-0.5 bg-ptna-primary opacity-20"></div>
        <div class="absolute -left-6 top-1/2 transform -translate-y-1/2 text-ptna-primary opacity-30 text-xl">♪</div>
        
        <div class="col-right">
          <slot name="right" />
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
.bg-ptna-primary {
  background-color: var(--ptna-primary);
}

.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>