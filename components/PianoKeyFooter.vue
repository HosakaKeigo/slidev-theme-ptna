<script setup lang="ts">
// Piano key pattern: C, C#, D, D#, E, F, F#, G, G#, A, A#, B (black keys: 2, 3, 2, 3 pattern)
const getKeyColor = (index: number) => {
  const keyIndex = (index - 1) % 12;
  // Black keys are at positions: 1, 3, 6, 8, 10 (C#, D#, F#, G#, A#)
  const blackKeys = [1, 3, 6, 8, 10];
  return blackKeys.includes(keyIndex) ? "bg-gray-800" : "bg-white";
};
</script>

<template>
  <div class="absolute bottom-0 left-0 right-0 h-16 opacity-10">
    <div class="flex h-full">
      <div
        v-for="i in 88"
        :key="i"
        :class="['flex-1 border-r border-gray-300', getKeyColor(i)]"
      ></div>
    </div>
  </div>
</template>
