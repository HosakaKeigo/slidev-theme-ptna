<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import BaseChart from './BaseChart.vue';

interface RaceData {
  name: string;
  values: { period: string; value: number }[];
  color?: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    data: RaceData[];
    height?: string;
    width?: string;
    updateFrequency?: number;
    maxBars?: number;
    autoPlay?: boolean;
    unit?: string;
  }>(),
  {
    title: '',
    updateFrequency: 1500,
    maxBars: 10,
    autoPlay: true,
    unit: '',
  }
);

const chartRef = ref();
const currentPeriodIndex = ref(0);
const timer = ref<number | null>(null);
const isPlaying = ref(false);

// Extract all periods
const periods = computed(() => {
  const allPeriods = new Set<string>();
  props.data.forEach(item => {
    item.values.forEach(v => allPeriods.add(v.period));
  });
  return Array.from(allPeriods).sort();
});

// Get data for current period
const getCurrentPeriodData = (periodIndex: number) => {
  const period = periods.value[periodIndex];
  const periodData: Array<[number, string]> = [];
  
  props.data.forEach(item => {
    const value = item.values.find(v => v.period === period);
    if (value) {
      periodData.push([value.value, item.name]);
    }
  });
  
  // Sort and limit to maxBars
  return periodData
    .sort((a, b) => b[0] - a[0])
    .slice(0, props.maxBars);
};

// Colors for each item
const itemColors = computed(() => {
  const colors: Record<string, string> = {};
  const defaultColors = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#ff9f7f'
  ];
  
  props.data.forEach((item, index) => {
    colors[item.name] = item.color || defaultColors[index % defaultColors.length];
  });
  
  return colors;
});

const option = computed<EChartsOption>(() => {
  const data = getCurrentPeriodData(currentPeriodIndex.value);
  const currentPeriod = periods.value[currentPeriodIndex.value] || '';
  
  return {
    title: {
      text: props.title,
      left: 'center',
    },
    grid: {
      top: props.title ? 80 : 40,
      bottom: 30,
      left: 150,
      right: 80,
    },
    xAxis: {
      type: 'value',
      max: 'dataMax',
      axisLabel: {
        formatter: (n: number) => {
          return n + (props.unit ? ' ' + props.unit : '');
        },
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      max: props.maxBars - 1,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: (value: string) => {
          return value.length > 15 ? value.substring(0, 15) + '...' : value;
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        type: 'bar',
        data: data,
        realtimeSort: true,
        seriesLayoutBy: 'column',
        itemStyle: {
          color: (param: any) => {
            return itemColors.value[param.value[1]] || '#5470c6';
          },
        },
        encode: {
          x: 0,
          y: 1,
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace',
          formatter: (param: any) => {
            return param.value[0] + (props.unit ? ' ' + props.unit : '');
          },
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: props.updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 80,
          bottom: 40,
          style: {
            text: currentPeriod,
            font: 'bolder 60px monospace',
            fill: 'rgba(100, 100, 100, 0.25)',
          },
          z: 100,
        },
      ],
    },
  };
});

const startAnimation = () => {
  if (isPlaying.value) return;
  isPlaying.value = true;
  
  const animate = () => {
    if (currentPeriodIndex.value < periods.value.length - 1) {
      currentPeriodIndex.value++;
      timer.value = window.setTimeout(animate, props.updateFrequency);
    } else {
      // Animation complete - stop at the end
      isPlaying.value = false;
      // Don't auto-restart
    }
  };
  
  animate();
};

const stopAnimation = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  isPlaying.value = false;
};

const resetAnimation = () => {
  stopAnimation();
  currentPeriodIndex.value = 0;
  if (props.autoPlay) {
    setTimeout(() => startAnimation(), 500);
  }
};

// Auto-start on mount if autoPlay is true
onMounted(() => {
  if (props.autoPlay && periods.value.length > 0) {
    currentPeriodIndex.value = 0;  // Start from beginning
    setTimeout(() => startAnimation(), 1000);
  }
});

// Clean up on unmount
onUnmounted(() => {
  stopAnimation();
});

// Reset animation when slide changes
watch(() => props.autoPlay, (newVal) => {
  if (newVal) {
    resetAnimation();
  } else {
    stopAnimation();
  }
});

defineExpose({
  startAnimation,
  stopAnimation,
  resetAnimation,
});
</script>

<template>
  <div class="race-chart-container">
    <BaseChart 
      ref="chartRef"
      :option="option" 
      :height="height" 
      :width="width" 
    />
    <div class="period-display">
      {{ periods[currentPeriodIndex] || '' }}
    </div>
    <div v-if="!autoPlay" class="controls">
      <button @click="startAnimation" :disabled="isPlaying">開始</button>
      <button @click="stopAnimation" :disabled="!isPlaying">停止</button>
      <button @click="resetAnimation">リセット</button>
    </div>
  </div>
</template>

<style scoped>
.race-chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.period-display {
  position: absolute;
  right: 40px;
  bottom: 40px;
  font-size: 48px;
  font-weight: bold;
  color: rgba(100, 100, 100, 0.4);
  font-family: monospace;
  z-index: 10;
  pointer-events: none;
}

.controls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 1000;
}

.controls button {
  padding: 5px 15px;
  background: #5470c6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover:not(:disabled) {
  background: #3a5aa0;
}

.controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>