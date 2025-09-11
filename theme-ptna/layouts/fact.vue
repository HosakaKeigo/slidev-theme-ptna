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
  <div class="slidev-layout fact" :style="style">
    <PtnaLogo />
    <div class="relative z-10">
      <slot />
    </div>
    
    <!-- Animated musical notes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-8 left-8 text-ptna-primary opacity-20 text-4xl animate-float">♪</div>
      <div class="absolute top-16 right-16 text-ptna-primary opacity-15 text-5xl animate-float-delayed">♫</div>
      <div class="absolute bottom-16 left-1/4 text-ptna-primary opacity-10 text-6xl animate-float">♬</div>
      <div class="absolute bottom-8 right-8 text-ptna-primary opacity-25 text-3xl animate-float-delayed">♩</div>
    </div>
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 5s ease-in-out infinite;
  animation-delay: 1s;
}
</style>