<!--
Fact Layout - 数値・事実強調表示用レイアウト

使用用途:
- 重要な数値や統計の強調表示
- 事実やデータのインパクトのある提示
- 年数、人数、割合等の数値情報
- 「77」「47年」などの象徴的な数字

特徴:
- 中央寄せレイアウトで数値を大きく表示
- Ptnyanキャラクターの装飾（ptnyan-fact.png）
- アニメーション付き音符装飾
- 目を引くインパクトのあるデザイン
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
  <div class="slidev-layout fact" :style="style">
    <PtnaLogo />

    <!-- Main content centered -->
    <div class="h-full flex flex-col items-center justify-center relative z-20">
      <slot />

      <!-- Ptnyan fact character positioned just above the fact -->
      <div class="mt-8">
        <img
          src="/ptnyan/ptnyan-fact.png"
          alt="Ptnyan fact"
          class="h-64 w-auto opacity-80"
        />
      </div>
    </div>

    <MusicalDecorations variant="background" :opacity="0.2" :animate="true" />
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 5s ease-in-out infinite;
  animation-delay: 1s;
}
</style>
