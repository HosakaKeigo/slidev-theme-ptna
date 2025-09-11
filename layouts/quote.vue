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
  <div class="slidev-layout quote" :style="style">
    <PtnaLogo />
    <div class="relative z-10">
      <slot />
    </div>
    
    <!-- Quote decoration with musical theme -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="relative">
        <!-- Large quotation mark with musical note integration -->
        <div class="absolute -top-8 -left-8 text-ptna-primary opacity-20 text-8xl">"</div>
        <div class="absolute -bottom-8 -right-8 text-ptna-primary opacity-20 text-8xl rotate-180">"</div>
        
        <!-- Musical staff lines -->
        <div class="absolute -left-32 -right-32 top-1/2 transform -translate-y-1/2">
          <div class="space-y-4 opacity-5">
            <div v-for="i in 5" :key="i" class="h-0.5 bg-ptna-primary"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Ptnyan quote character -->
    <div class="absolute bottom-16 right-16 opacity-70 pointer-events-none">
      <img src="/ptnyan/quote.png" alt="Ptnyan with book" class="h-48 w-auto" />
    </div>
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}

.bg-ptna-primary {
  background-color: var(--ptna-primary);
}
</style>