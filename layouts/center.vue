<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'
import PageIndicator from '../components/PageIndicator.vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout center" :style="style">
    <PtnaLogo />
    <div class="relative z-10">
      <slot />
    </div>
    
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      <div class="absolute top-1/4 left-1/4 text-ptna-primary text-6xl transform -rotate-12">♪</div>
      <div class="absolute top-3/4 right-1/4 text-ptna-primary text-5xl transform rotate-12">♫</div>
      <div class="absolute top-1/2 left-1/6 text-ptna-primary text-4xl">♬</div>
      <div class="absolute top-1/2 right-1/6 text-ptna-primary text-4xl">♩</div>
    </div>
    
    <PageIndicator />
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}

</style>