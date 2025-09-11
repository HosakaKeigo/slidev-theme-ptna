<!--
Intro Layout - 導入ページ用レイアウト

使用用途:
- プレゼンテーションの導入・はじめにページ
- 背景紹介や概要説明のページ
- PTNAの紹介や団体情報の説明
- カバーページの次に置く内容紹介

特徴:
- ピアノ鍵盤パターンの下部装飾
- PTNAロゴの自動配置
- カバーページと統一されたデザイン
- シンプルで読みやすいレイアウト
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PianoKeyFooter from "../components/PianoKeyFooter.vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout intro" :style="style">
    <PtnaLogo />

    <div class="relative z-10">
      <slot />
    </div>

    <PianoKeyFooter />
  </div>
</template>
