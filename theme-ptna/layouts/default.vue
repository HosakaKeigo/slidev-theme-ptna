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
  <div class="slidev-layout default" :style="style">
    <!-- PTNA Logo positioned to avoid conflict with page indicator -->
    <PtnaLogo />
    <slot />
    
    <PageIndicator />
  </div>
</template>

<style scoped>
</style>