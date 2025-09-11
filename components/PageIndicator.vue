<script setup lang="ts">
// No props needed - uses $slidev global
</script>

<template>
  <div class="absolute bottom-4 right-4 text-sm text-gray-500">
    <div class="flex items-center">
      <div class="w-2 h-2 bg-ptna-primary rounded-full mr-2"></div>
      <span class="font-mono"
        >{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span
      >
    </div>
  </div>
</template>

<style scoped>
.bg-ptna-primary {
  background-color: var(--ptna-primary);
}
</style>
