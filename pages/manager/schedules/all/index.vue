<template>
  <div class="center">
    <UiCard shadow border="simple" style="min-height: 70svh">
      <div class="relative">
        <h2 class="text-center text-2xl">Default models</h2>
        <div class="absolute top-0 right-[5px]">
          <UButton @click="showModalCreate" icon="material-symbols:add">
            New
          </UButton>
        </div>
      </div>

      <ul class="grid grid-cols-1 gap-4 mt-5">
        <li v-for="schedule in schedules" :key="schedule.id">
          <NuxtLink :to="`/manager/schedules/detail/${schedule.id}`">
            <UiCard border="animated" shadow class="cursor-pointer relative">
              <div class="absolute top-[5px] right-[5px]">
                <UButton size="sm" variant="ghost">
                  {{ schedule.isDefault ? "Default" : "Simple" }}
                </UButton>
              </div>
              <h3 class="font-medium text-xl text-gray-700 dark:text-gray-200">
                {{ schedule.name }}
              </h3>
              <p class="text-sm font-light text-gray-400 dark:text-gray-500">
                {{ schedule.description }}
              </p>
            </UiCard>
          </NuxtLink>
        </li>
      </ul>
    </UiCard>

    <UiModal @update:model-value="resetForm" v-model="viewModalCreate">
      <div class="flex flex-col gap-3">
        <div class="item">
          <p class="text-sm font-extralight mb-1">Name (required)</p>
          <UInput v-model="form.name" type="text" placeholder="Name" />
        </div>
        <div class="item">
          <p class="text-sm font-extralight mb-1">Description (recommended)</p>
          <UTextarea placeholder="Description" v-model="form.description" />
        </div>
        <div class="item">
          <p class="text-sm font-extralight mb-1">is Default Schedule ?</p>
          <UToggle v-model="form.isDefault" />
        </div>
        <div class="flex justify-center">
          <UButton @click="createSchedule">Save</UButton>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";
const toast = useToast();

const viewModalCreate = ref(false);
const schedules = ref([]);

const form = ref({
  name: "",
  description: "",
  isDefault: false,
});

const resetForm = () => {
  form.value = {
    name: "",
    description: "",
    isDefault: false,
  };
};

const showModalCreate = () => {
  viewModalCreate.value = true;
};

const createSchedule = async () => {
  try {
    if (!form.value.name) {
      toast.clear();
      toast.add({
        title: "Error",
        description: "Name is required",
        color: "red",
      });
      return;
    }

    const response = await $fetch(`http://localhost:3001/api/schedule/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: {
        name: form.value.name,
        description: form.value.description,
        isDefault: form.value.isDefault,
      },
    });

    console.log(response);

    resetForm();
    getSchedules();
    viewModalCreate.value = false;
  } catch (error) {
    console.log(error);
  }
};

const getSchedules = async () => {
  try {
    const response = await $fetch(
      `http://localhost:3001/api/schedule/read/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );

    schedules.value = response;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getSchedules();
  const actualPage = useState("actualPage");
  actualPage.value = "Default Schedules";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}
</style>
