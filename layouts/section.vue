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
  <div class="slidev-layout section" :style="style">
    <PtnaLogo />
    <div class="relative z-10">
      <slot />
    </div>
    
    <!-- Musical decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <div class="text-ptna-primary opacity-5 text-9xl">♪</div>
      </div>
      <div class="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
        <div class="text-ptna-primary opacity-5 text-8xl">♫</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>