<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface SeriesData {
  name: string;
  data: number[];
  stack?: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    labels: string[];
    series: SeriesData[];
    xAxisName?: string;
    yAxisName?: string;
    horizontal?: boolean;
    height?: string;
    width?: string;
  }>(),
  {
    title: '',
    xAxisName: '',
    yAxisName: '',
    horizontal: false,
  }
);

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
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
  xAxis: props.horizontal ? {
    type: 'value',
    name: props.xAxisName,
  } : {
    type: 'category',
    data: props.labels,
    name: props.xAxisName,
  },
  yAxis: props.horizontal ? {
    type: 'category',
    data: props.labels,
    name: props.yAxisName,
  } : {
    type: 'value',
    name: props.yAxisName,
  },
  series: props.series.map((s) => ({
    ...s,
    type: 'bar',
    emphasis: {
      focus: 'series',
    },
    animationDuration: 800,
    animationEasing: 'cubicOut',
  })),
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>