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
      <UButton @click="addLessonModal = true">Add Lesson</UButton>
    </UiCard>
    <UiModal v-model="addLessonModal">
      <div class="w-full">
        <h3 class="text-center text-2xl mb-7">Create a new lesson</h3>
        <div class="flex flex-col gap-3">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Name (required)</p>
            <UInput v-model="newLesson.name" type="text" placeholder="Name" />
          </div>
          <div class="w-full flex flex-col-reverse gap-3 sm:gap-5 sm:flex-row">
            <div class="item">
              <p class="text-sm font-extralight mb-1">Level (required)</p>
              <UInput v-model="newLesson.level" type="text" placeholder="C1, C2..." />
            </div>

            <div class="item">
              <p class="text-sm font-extralight mb-1">Order (required)</p>
              <UInput v-model="newLesson.order" type="number" placeholder="Order" />
            </div>
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Description (recommended)</p>
            <UTextarea v-model="newLesson.description" type="text" placeholder="Description" autoresize />
          </div>

          <div class="item flex gap-5">
            <p class="text-sm font-extralight mb-1">Is Homework</p>
            <UToggle v-model="hasHomework" />
          </div>

          <div class="item" v-if="hasHomework">
            <p class="text-sm font-extralight mb-1">Homework Name</p>
            <UInput v-model="newLesson.homework.name" type="text" placeholder="Homework Name" />
          </div>

          <div class="item" v-if="hasHomework">
            <p class="text-sm font-extralight mb-1">Homework Description</p>
            <UTextarea v-model="newLesson.homework.description" type="text" placeholder="Homework Description"
              autoresize />
          </div>

          <div class="item w-full flex flex-row justify-between">
            <UButton @click=" addLessonModal = false" variant="ghost" color="red">Cancel</UButton>
            <UButton @click=" addLessonModal = false" variant="soft" color="green">Create</UButton>
          </div>

        </div>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
const toast = useToast();

const { params } = useRoute();
const id = params.id;

const addLessonModal = ref(false);
const hasHomework = ref(false);

const newLesson = ref({
  name: "",
  description: "",
  order: 0,
  level: "",
  scheduleId: id,
  homework: {
    name: "",
    description: "",
  }
});

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

.item {
  width: 100%;
}
</style>
