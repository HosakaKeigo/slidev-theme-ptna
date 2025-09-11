<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PianoKeyFooter from '../components/PianoKeyFooter.vue'
import MusicalDecorations from '../components/MusicalDecorations.vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <!-- PTNA Logo positioned absolutely -->
    <div class="absolute top-8 right-8 z-20">
      <img src="/ptna-logo.png" alt="PTNA Logo" class="h-16 w-auto opacity-80" />
    </div>
    <div class="my-auto w-full px-8">
      <slot />
    </div>
    
    <!-- PTNA Logo in corner -->
    <div class="absolute bottom-8 right-8 opacity-30">
      <div class="flex items-center text-white">
        <div class="text-4xl mr-2">♪</div>
        <div class="text-lg font-bold">PTNA</div>
      </div>
    </div>
    
    <MusicalDecorations variant="cover" />
    
    <PianoKeyFooter />
  </div>
</template>