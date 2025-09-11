<!--
Center Layout - 中央寄せレイアウト

使用用途:
- コンテンツを中央に寄せて表示したい場合
- コードブロックやダイアグラムの表示
- シンプルなメッセージや情報の強調
- フォーカスしたいコンテンツの表示

特徴:
- コンテンツが画面中央に配置
- 控えめな背景音符装飾（低透明度）
- ページ番号とPTNAロゴの自動配置
- シンプルで見やすいデザイン
-->

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
