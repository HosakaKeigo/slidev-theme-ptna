<script setup lang="ts">
import { computed } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface WaterfallData {
  name: string;
  value: number;
  type?: 'income' | 'expense' | 'total';
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data: WaterfallData[];
    height?: string;
    width?: string;
    showTotal?: boolean;
    positiveColor?: string;
    negativeColor?: string;
  }>(),
  {
    title: '',
    showTotal: true,
    positiveColor: '#5cb85c',
    negativeColor: '#d9534f',
  }
);

// Calculate accumulated values for waterfall
const processedData = computed(() => {
  let accumulated = 0;
  const placeholder: (number | string)[] = [];
  const income: (number | string)[] = [];
  const expense: (number | string)[] = [];
  const labels: string[] = [];

  props.data.forEach((item, index) => {
    labels.push(item.name);
    
    if (item.type === 'total') {
      // Total bar
      placeholder.push(0);
      income.push(accumulated);
      expense.push('-');
    } else if (item.type === 'expense' || item.value < 0) {
      // Expense (negative)
      const value = Math.abs(item.value);
      placeholder.push(accumulated - value);
      income.push('-');
      expense.push(value);
      accumulated -= value;
    } else {
      // Income (positive)
      placeholder.push(accumulated);
      income.push(item.value);
      expense.push('-');
      accumulated += item.value;
    }
  });

  // Add final total if showTotal is true
  if (props.showTotal && props.data[props.data.length - 1]?.type !== 'total') {
    labels.push('合計');
    placeholder.push(0);
    income.push(accumulated);
    expense.push('-');
  }

  return { labels, placeholder, income, expense };
});

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
    formatter: function (params: any) {
      let tar;
      if (params[1] && params[1].value !== '-') {
        tar = params[1];
      } else {
        tar = params[2];
      }
      return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
    },
  },
  legend: {
    data: ['収入', '支出'],
    bottom: 0,
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
    data: processedData.value.labels,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Placeholder',
      type: 'bar',
      stack: 'Total',
      silent: true,
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent',
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent',
        },
      },
      data: processedData.value.placeholder,
    },
    {
      name: '収入',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
        formatter: (params: any) => {
          return params.value !== '-' ? params.value : '';
        },
      },
      itemStyle: {
        color: props.positiveColor,
      },
      data: processedData.value.income,
      animation: true,
      animationDuration: 800,
      animationEasing: 'cubicOut',
      animationDelay: (idx: number) => idx * 100,
    },
    {
      name: '支出',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'bottom',
        formatter: (params: any) => {
          return params.value !== '-' ? '-' + params.value : '';
        },
      },
      itemStyle: {
        color: props.negativeColor,
      },
      data: processedData.value.expense,
      animation: true,
      animationDuration: 800,
      animationEasing: 'cubicOut',
      animationDelay: (idx: number) => idx * 100,
    },
  ],
}));
</script>

<template>
  <BaseChart :option="option" :height="height" :width="width" />
</template>