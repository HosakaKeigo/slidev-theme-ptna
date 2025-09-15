<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface Indicator {
  name: string;
  max: number;
  min?: number;
}

interface RadarData {
  name: string;
  value: number[];
  areaStyle?: object;
  lineStyle?: object;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    indicators: Indicator[];
    data: RadarData[];
    height?: string;
    width?: string;
    shape?: 'polygon' | 'circle';
  }>(),
  {
    title: '',
    shape: 'polygon',
  }
);

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: 0,
    data: props.data.map(d => d.name),
  },
  radar: {
    indicator: props.indicators,
    radius: '65%',
    center: ['50%', '50%'],
    shape: props.shape,
  },
  series: [
    {
      type: 'radar',
      data: props.data.map(d => ({
        ...d,
        emphasis: {
          lineStyle: {
            width: 4,
          },
        },
      })),
      animation: true,
      animationDuration: 1500,
      animationEasing: 'sinusoidalInOut',
    },
  ],
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>