<template>
    <Bar :data="props.chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import type { IChartBarData } from "./types/IChartBarData";

// Registrar componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

// Definir as props para chartData e chartOptions
const props = defineProps({
  chartData: {
    type: Object as PropType<IChartBarData>,

    required: true,
  },
});
</script>
