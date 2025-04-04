<template>
  <div class="center">
    <UiCard shadow border="simple" style="min-height: 70svh">
      <div class="mb-5 text-center">
        <h1 class="text-2xl">{{ schedule.name }}</h1>
        <p>{{ schedule.description }}</p>
        <ul>
          <li class=""></li>
        </ul>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
const toast = useToast();

const { params } = useRoute();
const id = params.id;

const schedule = ref({
  name: "",
  description: "",
});

const downloadSchedule = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/schedule/read/one/${id}`)
    console.log(response);

    schedule.value = response

  } catch (e) {

  }
}


onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Default Schedules";

  downloadSchedule();
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
