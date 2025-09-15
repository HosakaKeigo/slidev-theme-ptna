import { defineAppSetup } from '@slidev/types';
import { setupEcharts } from './echarts';

export default defineAppSetup(({ app, router }) => {
  setupEcharts();
});