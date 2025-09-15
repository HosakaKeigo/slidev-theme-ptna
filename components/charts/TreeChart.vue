<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
  itemStyle?: object;
  label?: object;
  lineStyle?: object;
  symbol?: string;
  symbolSize?: number;
  collapsed?: boolean;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data: TreeNode | TreeNode[];
    height?: string;
    width?: string;
    orient?: 'LR' | 'RL' | 'TB' | 'BT' | 'radial';
    layout?: 'orthogonal' | 'radial';
    edgeShape?: 'polyline' | 'curve';
    symbolSize?: number | [number, number];
    expandAndCollapse?: boolean;
    initialTreeDepth?: number;
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
    roam?: boolean | 'scale' | 'move';
    zoom?: number;
    edgeForkPosition?: string;
    emphasis?: 'none' | 'self' | 'series' | 'ancestor' | 'descendant';
  }>(),
  {
    title: '',
    orient: 'LR',
    layout: 'orthogonal',
    edgeShape: 'polyline',
    symbolSize: 7,
    expandAndCollapse: true,
    initialTreeDepth: 2,
    top: '10%',
    left: '8%',
    bottom: '10%',
    right: '20%',
    roam: false,
    zoom: 1,
    edgeForkPosition: '50%',
    emphasis: 'descendant',
  }
);

const option = computed<EChartsOption>(() => {
  const treeData = Array.isArray(props.data) ? props.data : [props.data];
  
  return {
    title: {
      text: props.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      formatter: (params: any) => {
        const value = params.value !== undefined ? `<br/>値: ${params.value}` : '';
        return `${params.name}${value}`;
      },
    },
    series: [
      {
        type: 'tree',
        data: treeData,
        top: props.top,
        left: props.left,
        bottom: props.bottom,
        right: props.right,
        layout: props.layout,
        orient: props.orient,
        symbolSize: props.symbolSize,
        edgeShape: props.edgeShape,
        edgeForkPosition: props.edgeForkPosition,
        initialTreeDepth: props.initialTreeDepth,
        lineStyle: {
          width: 2,
          curveness: props.edgeShape === 'curve' ? 0.5 : 0,
        },
        label: {
          show: true,
          backgroundColor: '#fff',
          position: props.orient === 'LR' ? 'left' : props.orient === 'RL' ? 'right' : 'top',
          verticalAlign: 'middle',
          align: props.orient === 'LR' ? 'right' : props.orient === 'RL' ? 'left' : 'center',
          borderColor: '#ccc',
          borderWidth: 0.5,
          borderRadius: 3,
          padding: [2, 5],
          fontSize: 12,
        },
        leaves: {
          label: {
            show: true,
            position: props.orient === 'LR' ? 'right' : props.orient === 'RL' ? 'left' : 'bottom',
            verticalAlign: 'middle',
            align: props.orient === 'LR' ? 'left' : props.orient === 'RL' ? 'right' : 'center',
          },
        },
        emphasis: {
          focus: props.emphasis,
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
          lineStyle: {
            width: 3,
          },
        },
        expandAndCollapse: props.expandAndCollapse,
        roam: props.roam,
        zoom: props.zoom,
        animation: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
        animationEasing: 'cubicOut',
      },
    ],
  };
});
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>