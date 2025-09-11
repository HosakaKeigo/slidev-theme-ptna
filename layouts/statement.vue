<!--
Statement Layout - 声明・宣言用レイアウト

使用用途:
- 重要な声明や宣言の発表
- PTNAのミッションやビジョンの説明
- メッセージ性の強いコンテンツ
- 呼びかけやアクションの促し

特徴:
- エレガントな枠線で囲まれたデザイン
- 四隅に音符装飾
- Ptnyanキャラクターの装飾（ptnyan-front.png）
- 正式で信頼感のあるデザイン
-->

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
