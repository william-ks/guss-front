<template>
  <header
    class=" bg-white dark:bg-gray-900 shadow-[0_5px_10px_hsl(var(--shadow))]"
  >
    <UContainer class="py-[15px]">
      <div class="flex justify-between items-center">
        <UIcon
          v-if="!sideBarView"
          class="cursor-pointer text-3xl"
          name="uil:bars"
          @click="$emit('changeSideBar')"
        />
        <UIcon
          v-else
          class="cursor-pointer text-3xl"
          name="material-symbols-light:close"
          @click="$emit('changeSideBar')"
        />
        <h3>{{ actualPage }}</h3>
        <ProfileIcon :userIcon="managerStore.photo" />
      </div>
    </UContainer>
  </header>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
const toast = useToast();
const managerStore = useManagerStore();

const actualPage = useState("actualPage", () => "");

const props = defineProps({
  sideBarView: Boolean,
});
</script>

<style scoped>
header {
  width: 100%;
  /* box-shadow: 0 5px 10px hsl(var(--shadow)); */
  /* background-color: hsl(var(--card-bg)); */
}
</style>
