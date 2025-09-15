<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface FunnelData {
  name: string;
  value: number;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data: FunnelData[];
    height?: string;
    width?: string;
    sort?: 'ascending' | 'descending' | 'none';
    align?: 'left' | 'center' | 'right';
    gap?: number;
    minSize?: string;
    maxSize?: string;
    showLegend?: boolean;
  }>(),
  {
    title: '',
    sort: 'descending',
    align: 'center',
    gap: 2,
    minSize: '0%',
    maxSize: '100%',
    showLegend: true,
  }
);

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: props.showLegend ? {
    bottom: 0,
    data: props.data.map(d => d.name),
  } : undefined,
  series: [
    {
      name: props.title || 'ファネル',
      type: 'funnel',
      left: '10%',
      top: props.title ? 80 : 40,
      bottom: props.showLegend ? 60 : 20,
      width: '80%',
      min: Math.min(...props.data.map(d => d.value)),
      max: Math.max(...props.data.map(d => d.value)),
      minSize: props.minSize,
      maxSize: props.maxSize,
      sort: props.sort,
      gap: props.gap,
      funnelAlign: props.align,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}: {c}',
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      data: props.data,
      animation: true,
      animationType: 'expansion',
      animationDuration: 1200,
      animationEasing: 'cubicOut',
    },
  ],
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>