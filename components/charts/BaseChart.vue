<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  FunnelChart,
  SankeyChart,
  TreeChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  PolarComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import type { EChartsOption } from 'echarts';

// EChartsの必要なモジュールを登録
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  FunnelChart,
  SankeyChart,
  TreeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  PolarComponent,
]);

const props = defineProps<{
  option: EChartsOption;
  theme?: string;
  height?: string;
  width?: string;
}>();

const chartRef = ref();
const key = ref(0);
const chartOption = computed(() => props.option);

// Check if we're in Slidev context and watch for slide changes
onMounted(() => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.$slidev) {
    // Initial key based on current page
    // @ts-ignore
    key.value = window.$slidev.nav.currentPage || 0;
    
    watch(
      // @ts-ignore
      () => window.$slidev?.nav?.currentPage,
      (newVal) => {
        if (newVal !== undefined) {
          // Force complete re-render by changing key
          key.value = newVal + Date.now(); // Use timestamp to ensure unique key
        }
      },
      { immediate: false }
    );
  }
});
</script>

<template>
  <div class="chart-container" :style="{ width: width || '100%', height: height || '100%' }">
    <v-chart
      :key="key"
      ref="chartRef"
      class="chart"
      :option="chartOption"
      :theme="theme || 'ptna'"
      autoresize
    />
  </div>
</template>

<style scoped>
.chart-container {
  min-height: 300px;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>