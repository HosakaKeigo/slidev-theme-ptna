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
  <div class="slidev-layout center" :style="style">
    <PtnaLogo />
    <div class="relative z-10">
      <slot />
    </div>

    <MusicalDecorations variant="default" :opacity="0.05" />

    <PageIndicator />
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>
