<!--
Default Layout - 標準コンテンツページ用レイアウト

使用用途:
- 一般的なコンテンツページ
- テキスト、リスト、コードブロック等の標準的な内容
- 表やダイアグラムを含む説明ページ
- レイアウトを指定しない場合のデフォルトページ

特徴:
- シンプルで汎用的なデザイン
- PTNAロゴとページ番号の自動表示
- 背景画像対応
- どんなコンテンツにも対応する万能レイアウト
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PageIndicator from "../components/PageIndicator.vue";

const props = defineProps({
  background: {
    default: "",
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout default" :style="style">
    <!-- PTNA Logo positioned to avoid conflict with page indicator -->
    <PtnaLogo />
    <slot />

    <PageIndicator />
  </div>
</template>

<style scoped></style>
