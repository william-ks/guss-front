<template>
    <Radar :options="chartOptions" :data="props.chartData" />
</template>

<script lang="ts" setup>
import type { IRadialChartData } from "./types/IRadialChartData";

import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const props = defineProps({
  chartData: {
    required: true,
    type: Object as PropType<IRadialChartData>,
  },
});
</script>
