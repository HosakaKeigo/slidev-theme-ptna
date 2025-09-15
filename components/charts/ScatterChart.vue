<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface SeriesData {
  name: string;
  data: [number, number][] | Array<[number, number, number]>; // [x, y] or [x, y, size]
  symbolSize?: number | ((value: any) => number);
  itemStyle?: object;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    series: SeriesData[];
    xAxisName?: string;
    yAxisName?: string;
    height?: string;
    width?: string;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
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
    trigger: 'item',
    formatter: (params: any) => {
      const value = params.value;
      return `${params.seriesName}<br/>${props.xAxisName || 'X'}: ${value[0]}<br/>${props.yAxisName || 'Y'}: ${value[1]}${value[2] !== undefined ? `<br/>Size: ${value[2]}` : ''}`;
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
  xAxis: {
    type: 'value',
    name: props.xAxisName,
    min: props.xMin,
    max: props.xMax,
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  yAxis: {
    type: 'value',
    name: props.yAxisName,
    min: props.yMin,
    max: props.yMax,
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  series: props.series.map((s) => ({
    ...s,
    type: 'scatter',
    symbolSize: s.symbolSize || 15,
    animationDuration: 800,
    animationEasing: 'cubicOut',
  })),
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>