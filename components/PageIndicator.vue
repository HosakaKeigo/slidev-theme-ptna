<script setup lang="ts">
import { computed } from 'vue';

const r = 40;
const strokeWidth = 13;
const circumference = 2 * Math.PI * r

const progress = computed(() => {
  return ($slidev.nav.currentPage / $slidev.nav.total) * circumference;
});

const offset = computed(() => {
  return circumference - progress.value;
});
</script>

<template>
  <footer class="abs-br m-3">
    <svg w-24 viewBox="0 0 100 100">
      <circle class="base-circle" cx="50" cy="50" :r="r" fill="none" :stroke-width="strokeWidth" />
      <circle class="progress-circle" ref="progressCircle" cx="50" cy="50" :r="r" transform="rotate(-90 50 50)" fill="none" :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="offset"/>
      <text class="progress-text" font-size="8" x="50" y="53" dominant-baseline="middle" text-anchor="middle">{{ $slidev.nav.currentPage }}</text>
    </svg>
  </footer>
</template>

<style>
:root {
  --bg-stroke-color: #e2e8f0;
  --progress-stroke-color: var(--ptna-primary);
  --text-fill-color: #020617;
}

.base-circle {
  stroke: var(--bg-stroke-color);
}

.progress-circle {
  stroke: var(--progress-stroke-color);
}

.progress-text {
  fill: var(--text-fill-color);
}
</style>
