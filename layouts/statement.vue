<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import MusicalDecorations from "../components/MusicalDecorations.vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout statement" :style="style">
    <div class="relative z-10">
      <slot />
    </div>

    <!-- Elegant border with musical motif -->
    <div
      class="absolute inset-8 border-2 border-ptna-primary opacity-20 rounded-lg pointer-events-none"
    >
      <MusicalDecorations variant="corners" :opacity="1" />
    </div>

    <!-- Ptnyan character -->
    <div class="absolute bottom-12 right-12 opacity-60 pointer-events-none">
      <img src="/ptnyan/ptnyan-front.png" alt="Ptnyan" class="h-32 w-auto" />
    </div>
  </div>
</template>

<style scoped>
.border-ptna-primary {
  border-color: var(--ptna-primary);
}

.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>
