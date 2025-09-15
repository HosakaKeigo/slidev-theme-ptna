import { registerTheme } from 'echarts/core';

const PTNA_THEME = {
  color: [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#FFD93D',
    '#6C5CE7',
    '#A8E6CF',
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'Avenir, Helvetica Neue, Arial, Helvetica, sans-serif',
  },
  title: {
    textStyle: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtextStyle: {
      color: '#666',
      fontSize: 14,
    },
  },
  legend: {
    textStyle: {
      color: '#333',
      fontSize: 12,
    },
  },
  tooltip: {
    confine: true,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderColor: '#333',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
  axisLine: {
    lineStyle: {
      color: '#ccc',
    },
  },
  splitLine: {
    lineStyle: {
      color: '#e0e0e0',
      type: 'dashed',
    },
  },
  axisLabel: {
    color: '#666',
    fontSize: 12,
  },
};

export function setupEcharts() {
  registerTheme('ptna', PTNA_THEME);
}