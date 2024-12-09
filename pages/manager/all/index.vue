<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <h3>Managers</h3>
    </UiCard>
  </div>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();
const toast = useToast();

const full = ref(false);

onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Managers";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
}


</style>
