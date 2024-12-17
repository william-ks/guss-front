<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="w-[100%] flex justify-end mb-7">
        <NuxtLink to="/manager/create">
          <UButton icon="material-symbols:add"> New manager </UButton>
        </NuxtLink>
      </div>
      <ul class="w-[100%] flex gap-5 flex-col">
        <ManagerLi
          v-for="manager of managersList"
          :key="manager.id"
          :manager="manager"
        />
      </ul>
    </UiCard>
  </div>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
import ManagerLi from "./_components/ManagerLi";

const managerStore = useManagerStore();
const toast = useToast();
const managersList = ref([]);

const getManagers = async () => {
  managersList.value = await managerStore.readAll();
};

onMounted(() => {
  getManagers();
  const actualPage = useState("actualPage");
  actualPage.value = "Managers";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
}
</style>
