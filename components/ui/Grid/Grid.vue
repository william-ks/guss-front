<template>
  <!-- The AG Grid component -->
  <ClientOnly>
    <div class="gridContainer">
      <ag-grid-vue
        :rowData="props.data"
        :columnDefs="props.headers"
        style="height: 500px"
        :class="themeClass"
      >
      </ag-grid-vue>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed, ref } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";

const color = useColorMode();

const themeClass = computed(() =>
  color.preference === "dark" ? "ag-theme-material-dark" : "ag-theme-material"
);

const props = defineProps({
  headers: Array,
  data: Array,
});
</script>
