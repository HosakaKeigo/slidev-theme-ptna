<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PageIndicator from "../components/PageIndicator.vue";
import MusicalDecorations from "../components/MusicalDecorations.vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout two-cols" :style="style">
    <PtnaLogo />
    <div class="grid grid-cols-2 gap-8 h-full relative">
      <div class="col-left">
        <slot name="left" />
      </div>

      <div class="col-right">
        <slot name="right" />
      </div>

      <!-- Vertical divider with musical theme -->
      <div class="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
        <div class="w-0.5 bg-ptna-primary opacity-20 h-full"></div>
        <MusicalDecorations variant="divider" :opacity="0.3" />
      </div>
    </div>

    <PageIndicator />
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>
