<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface PieData {
  name: string;
  value: number;
  itemStyle?: object;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data: PieData[];
    roseType?: 'radius' | 'area' | false;
    height?: string;
    width?: string;
    showLegend?: boolean;
    radius?: string | string[];
  }>(),
  {
    title: '',
    roseType: false,
    showLegend: true,
    radius: '60%',
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
    orient: 'vertical',
    left: 'left',
    top: 'middle',
    data: props.data.map(d => d.name),
  } : undefined,
  series: [
    {
      name: props.title || 'データ',
      type: 'pie',
      radius: props.radius,
      center: props.showLegend ? ['60%', '50%'] : ['50%', '50%'],
      data: props.data,
      roseType: props.roseType,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => Math.random() * 200,
    },
  ],
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>