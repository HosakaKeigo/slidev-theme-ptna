<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'
import PianoKeyFooter from '../components/PianoKeyFooter.vue'
import PtnaLogo from '../components/PtnaLogo.vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <PtnaLogo />
  
  <div class="slidev-layout title" :style="style">
    <div class="title-content">
      <slot />
    </div>
  </div>

  <PianoKeyFooter />
</template>

<style scoped>
.slidev-layout.title {
  @apply h-full flex items-center justify-center;
  background: white;
  padding: 3rem;
  text-align: center;
}

.title-content {
  max-width: 800px;
  width: 100%;
}

.title-content :deep(h1) {
  @apply text-6xl font-bold mb-6;
  color: var(--ptna-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.title-content :deep(h2) {
  @apply text-3xl font-medium mb-8;
  color: var(--ptna-text-secondary);
  line-height: 1.3;
  margin-bottom: 3rem;
}

.title-content :deep(h3) {
  @apply text-2xl font-medium mb-4;
  color: var(--ptna-primary);
  margin-bottom: 1.5rem;
}

.title-content :deep(h4) {
  @apply text-xl font-normal mb-2;
  color: var(--ptna-text-secondary);
  margin-bottom: 1rem;
}

.title-content :deep(h5) {
  @apply text-lg font-normal;
  color: var(--ptna-text-muted);
  margin-bottom: 0.5rem;
}

.title-content :deep(h6) {
  @apply text-base font-normal;
  color: var(--ptna-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.title-content :deep(p) {
  @apply text-xl;
  color: var(--ptna-text-primary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.title-content :deep(strong) {
  color: var(--ptna-primary);
  font-weight: 700;
}

.title-content :deep(em) {
  color: var(--ptna-text-secondary);
  font-style: italic;
}

.title-content :deep(.subtitle) {
  @apply text-2xl font-light;
  color: var(--ptna-text-secondary);
  margin-bottom: 2rem;
  line-height: 1.4;
}

.title-content :deep(.author) {
  @apply text-xl font-medium;
  color: var(--ptna-primary);
  margin-bottom: 1rem;
}

.title-content :deep(.date) {
  @apply text-lg;
  color: var(--ptna-text-muted);
  margin-bottom: 0.5rem;
}

.title-content :deep(.organization) {
  @apply text-lg;
  color: var(--ptna-text-secondary);
  margin-bottom: 1rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .slidev-layout.title {
    padding: 2rem 1rem;
  }

  .title-content :deep(h1) {
    @apply text-4xl mb-4;
  }

  .title-content :deep(h2) {
    @apply text-2xl mb-6;
  }

  .title-content :deep(.subtitle) {
    @apply text-lg mb-4;
  }

  .title-content :deep(.author) {
    @apply text-lg mb-2;
  }

  .title-content :deep(.date),
  .title-content :deep(.organization) {
    @apply text-base mb-2;
  }
}
</style>