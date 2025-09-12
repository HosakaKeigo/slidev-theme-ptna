<!--
Section Layout - セクション区切り用レイアウト

使用用途:
- プレゼンテーションのセクション・章の区切り
- 大きなタイトルで内容の区分を明示
- 話題の転換点や新しいトピックの導入
- 聴衆の注意を引きつけるインパクトのあるページ

特徴:
- 大きなタイトル表示（h1は6xlサイズ）
- タイトル下に装飾的なアンダーライン
- 背景に大きな薄い音符装飾
- 中央寄せレイアウト
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import MusicalDecorations from "../components/MusicalDecorations.vue";
import ptnyanPianoUrl from '../assets/ptnyan/ptnyan-play-piano.png'

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout section" :style="style">
    <PtnaLogo />
    
    <!-- Ptnyan play piano character -->
    <div class="absolute bottom-8 right-8 z-10">
      <img 
        :src="ptnyanPianoUrl" 
        alt="Ptnyan playing piano" 
        class="h-96 w-auto opacity-80"
      />
    </div>
    
    <div class="relative z-10">
      <slot />
    </div>

    <MusicalDecorations variant="section" :opacity="0.05" />
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}
</style>
