<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface SankeyNode {
  name: string;
  value?: number;
  itemStyle?: object;
  label?: object;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  lineStyle?: object;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    nodes: SankeyNode[];
    links: SankeyLink[];
    height?: string;
    width?: string;
    orient?: 'horizontal' | 'vertical';
    nodeWidth?: number;
    nodeGap?: number;
    layoutIterations?: number;
    showLabels?: boolean;
    nodeAlign?: 'justify' | 'left' | 'right';
  }>(),
  {
    title: '',
    orient: 'horizontal',
    nodeWidth: 20,
    nodeGap: 8,
    layoutIterations: 32,
    showLabels: true,
    nodeAlign: 'justify',
  }
);

const option = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: (params: any) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>流量: ${params.value}`;
      }
      return `${params.name}<br/>合計: ${params.value || 0}`;
    },
  },
  series: [
    {
      type: 'sankey',
      layout: 'none',
      orient: props.orient,
      nodeWidth: props.nodeWidth,
      nodeGap: props.nodeGap,
      nodeAlign: props.nodeAlign,
      layoutIterations: props.layoutIterations,
      emphasis: {
        focus: 'adjacency',
        blurScope: 'coordinateSystem',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      lineStyle: {
        color: 'gradient',
        opacity: 0.5,
        curveness: 0.5,
      },
      label: {
        show: props.showLabels,
        position: 'right',
        formatter: '{b}',
        fontSize: 12,
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#fff',
      },
      data: props.nodes.map(node => ({
        ...node,
        itemStyle: node.itemStyle || {
          color: null, // Use default color palette
        },
      })),
      links: props.links.map(link => ({
        ...link,
        lineStyle: link.lineStyle || {
          opacity: 0.3,
        },
      })),
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
    },
  ],
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>