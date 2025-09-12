<!--
Closing Layout - 結び・終了ページ用レイアウト

使用用途:
- プレゼンテーションの結び・終了ページ
- 感謝のメッセージ表示
- 質疑応答への橋渡し
- 連絡先やフォローアップ情報の案内

特徴:
- 「ご清聴ありがとうございました」メッセージの自動表示
- Ptnyanキャラクターの装飾（ptnyan-thanks.png）
- アニメーション付き音符装飾
- 温かみのあるグラデーション背景
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import MusicalDecorations from "../components/MusicalDecorations.vue";
import ptnyanThanksUrl from '../assets/ptnyan/ptnyan-thanks.png'

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout closing" :style="style">
    <PtnaLogo />

    <div class="h-full flex items-center justify-center">
      <div class="text-center max-w-4xl px-8">
        <!-- Main content -->
        <div class="mb-12">
          <slot />
        </div>

        <!-- Ptnyan thanks character -->
        <div class="flex justify-center mb-8">
          <img
            :src="ptnyanThanksUrl"
            alt="Ptnyan thanks"
            class="h-64 w-auto"
          />
        </div>

        <!-- Thank you message -->
        <div class="text-center opacity-70">
          <p class="text-xl text-ptna-text-secondary mb-4">
            ご清聴ありがとうございました
          </p>
          <p class="text-lg text-ptna-text-muted">
            Thank you for your attention
          </p>
        </div>
      </div>
    </div>

    <MusicalDecorations variant="animated" :opacity="0.1" :animate="true" />
  </div>
</template>

<style scoped>
.slidev-layout.closing {
  @apply h-full;
  padding: 2rem;
  background: var(--ptna-gradient-light);
}

.slidev-layout.closing h1 {
  @apply text-5xl font-bold mb-6;
  color: var(--ptna-primary);
  text-align: center;
}

.slidev-layout.closing h2 {
  @apply text-3xl font-medium mb-4;
  color: var(--ptna-text-primary);
  text-align: center;
}

.slidev-layout.closing p {
  @apply text-xl;
  color: var(--ptna-text-primary);
  text-align: center;
  line-height: 1.6;
}

.text-ptna-primary {
  color: var(--ptna-primary);
}

.text-ptna-text-secondary {
  color: var(--ptna-text-secondary);
}

.text-ptna-text-muted {
  color: var(--ptna-text-muted);
}

/* アニメーション効果 */
@keyframes gentle-pulse {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: gentle-pulse 4s ease-in-out infinite;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .slidev-layout.closing {
    padding: 1rem;
  }

  .slidev-layout.closing h1 {
    @apply text-4xl mb-4;
  }

  .slidev-layout.closing h2 {
    @apply text-2xl mb-3;
  }

  .slidev-layout.closing p {
    @apply text-lg;
  }

  .slidev-layout.closing img {
    height: 12rem !important;
  }
}
</style>
