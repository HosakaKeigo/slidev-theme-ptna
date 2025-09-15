<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
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

const chartOption = computed(() => props.option);
</script>

<template>
  <div class="chart-container" :style="{ width: width || '100%', height: height || '100%' }">
    <v-chart
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