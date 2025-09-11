<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PtnaLogo from '../components/PtnaLogo.vue'
import PianoKeyFooter from '../components/PianoKeyFooter.vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <div class="slidev-layout intro" :style="style">
    <PtnaLogo />
    
    <div class="relative z-10">
      <slot />
    </div>
    
    <PianoKeyFooter />
  </div>
</template>