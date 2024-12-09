<template>
  <!-- The AG Grid component -->
  <ClientOnly>
    <div class="gridContainer">
      <ag-grid-vue
        :rowData="rowData"
        :columnDefs="colDefs"
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

const rowData = ref([
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: true },
  { make: "Toyota", model: "Corolla", price: 29600, electric: true },
]);

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
]);

</script>
