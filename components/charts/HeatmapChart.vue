<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import BaseChart from './BaseChart.vue';

type HeatmapData = [string, number] | [number, number, number];

interface CalendarHeatmapData {
  date: string;
  value: number;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data?: HeatmapData[] | CalendarHeatmapData[];
    height?: string;
    width?: string;
    type?: 'calendar' | 'grid';
    year?: string | number;
    min?: number;
    max?: number;
    colorSteps?: number;
    cellSize?: number | [number | string, number | string];
    showYearLabel?: boolean;
    orientation?: 'horizontal' | 'vertical';
    generateRandomData?: boolean;
    xLabels?: string[];
    yLabels?: string[];
    showLabels?: boolean;
  }>(),
  {
    title: '',
    type: 'calendar',
    year: new Date().getFullYear(),
    min: 0,
    max: 10000,
    colorSteps: 5,
    cellSize: ['auto', 13],
    showYearLabel: false,
    orientation: 'horizontal',
    generateRandomData: false,
    showLabels: true,
  }
);

// カレンダーヒートマップ用のデータ生成
const generateCalendarData = (year: string | number): [string, number][] => {
  const yearStr = String(year);
  const date = +echarts.time.parse(yearStr + '-01-01');
  const end = +echarts.time.parse(String(Number(yearStr) + 1) + '-01-01');
  const dayTime = 3600 * 24 * 1000;
  const data: [string, number][] = [];
  
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
      Math.floor(Math.random() * (props.max - props.min) + props.min)
    ]);
  }
  return data;
};

// データの正規化
const normalizeData = (): HeatmapData[] => {
  if (props.generateRandomData && props.type === 'calendar') {
    return generateCalendarData(props.year);
  }
  
  if (!props.data || props.data.length === 0) {
    if (props.type === 'calendar') {
      return generateCalendarData(props.year);
    }
    return [];
  }
  
  // CalendarHeatmapData形式を[string, number]形式に変換
  if (props.data[0] && typeof props.data[0] === 'object' && 'date' in props.data[0]) {
    return (props.data as CalendarHeatmapData[]).map(item => [item.date, item.value]);
  }
  
  return props.data as HeatmapData[];
};

const option = computed<EChartsOption>(() => {
  const heatmapData = normalizeData();
  
  if (props.type === 'calendar') {
    // カレンダーヒートマップ
    return {
      title: {
        text: props.title,
        left: 'center',
        top: 30,
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const date = params.data[0];
          const value = params.data[1];
          return `${date}<br/>値: ${value.toLocaleString()}`;
        },
      },
      visualMap: {
        min: props.min,
        max: props.max,
        type: 'piecewise',
        orient: props.orientation,
        left: 'center',
        top: 65,
        pieces: Array.from({ length: props.colorSteps }, (_, i) => {
          const step = (props.max - props.min) / props.colorSteps;
          const min = props.min + step * i;
          const max = i === props.colorSteps - 1 ? props.max : min + step;
          return {
            min: Math.floor(min),
            max: Math.floor(max),
            label: `${Math.floor(min).toLocaleString()} - ${Math.floor(max).toLocaleString()}`,
          };
        }),
        inRange: {
          color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
        },
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: props.cellSize,
        range: String(props.year),
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#ccc',
        },
        yearLabel: { 
          show: props.showYearLabel,
          fontSize: 14,
        },
        monthLabel: {
          show: true,
          fontSize: 12,
        },
        dayLabel: {
          show: true,
          fontSize: 11,
          firstDay: 0,
        },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: heatmapData,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      },
    };
  } else {
    // グリッドヒートマップ
    return {
      title: {
        text: props.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const x = props.xLabels ? props.xLabels[params.data[0]] : params.data[0];
          const y = props.yLabels ? props.yLabels[params.data[1]] : params.data[1];
          const value = params.data[2];
          return `${x}, ${y}<br/>値: ${value}`;
        },
      },
      grid: {
        top: props.title ? 80 : 40,
        bottom: 60,
        left: 80,
        right: 80,
      },
      xAxis: {
        type: 'category',
        data: props.xLabels || [],
        splitArea: {
          show: true,
        },
        axisLabel: {
          show: props.showLabels,
          rotate: 45,
        },
      },
      yAxis: {
        type: 'category',
        data: props.yLabels || [],
        splitArea: {
          show: true,
        },
        axisLabel: {
          show: props.showLabels,
        },
      },
      visualMap: {
        min: props.min,
        max: props.max,
        calculable: true,
        orient: props.orientation,
        left: props.orientation === 'horizontal' ? 'center' : 'left',
        bottom: props.orientation === 'horizontal' ? 20 : 'center',
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
        },
      },
      series: [{
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      }],
    };
  }
});
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>