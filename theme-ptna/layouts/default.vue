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
  <div class="slidev-layout default" :style="style">
    <!-- PTNA Logo positioned to avoid conflict with page indicator -->
    <PtnaLogo />
    <slot />
    
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
</style>