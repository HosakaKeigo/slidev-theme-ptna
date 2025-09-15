<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface SeriesData {
  name: string;
  data: number[];
  smooth?: boolean;
  areaStyle?: object;
  stack?: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    labels: string[];
    series: SeriesData[];
    xAxisName?: string;
    yAxisName?: string;
    height?: string;
    width?: string;
  }>(),
  {
    title: '',
    xAxisName: '',
    yAxisName: '',
  }
);

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    bottom: 0,
    data: props.series.map(s => s.name),
  },
  grid: {
    top: props.title ? '15%' : '5%',
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.labels,
    name: props.xAxisName,
  },
  yAxis: {
    type: 'value',
    name: props.yAxisName,
  },
  series: props.series.map((s, index) => ({
    ...s,
    type: 'line',
    animation: true,
    animationDuration: 1500,
    animationEasing: 'linear',
    animationDelay: index * 200,
  })),
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>