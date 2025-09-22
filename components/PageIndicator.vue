<script setup lang="ts">
import { computed } from 'vue';

const r = 34;
const strokeWidth = 6;
const circumference = 2 * Math.PI * r

const progress = computed(() => {
  return ($slidev.nav.currentPage / $slidev.nav.total) * circumference;
});

const offset = computed(() => {
  return circumference - progress.value;
});
</script>

<template>
  <footer class="indicator-wrapper abs-br">
    <svg class="indicator" viewBox="0 0 100 100">
      <circle class="base-circle" cx="50" cy="50" :r="r" fill="none" :stroke-width="strokeWidth" />
      <circle class="progress-circle" ref="progressCircle" cx="50" cy="50" :r="r" transform="rotate(-90 50 50)" fill="none" :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="offset" stroke-linecap="round"/>
      <text class="progress-text" x="50" y="52" dominant-baseline="middle" text-anchor="middle">{{ $slidev.nav.currentPage }}</text>
    </svg>
  </footer>
</template>

<style>
:root {
  --indicator-size: 4.5rem;
  --bg-stroke-color: #e2e8f0;
  --progress-stroke-color: var(--ptna-primary);
  --text-fill-color: #1f2937;
}

.indicator-wrapper {
  margin: 1rem;
}

.indicator {
  width: var(--indicator-size);
  height: var(--indicator-size);
}

.base-circle {
  stroke: var(--bg-stroke-color);
}

.progress-circle {
  stroke: var(--progress-stroke-color);
  transition: stroke-dashoffset 0.4s ease, stroke 0.3s ease;
}

.progress-text {
  fill: var(--text-fill-color);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
}
</style>
