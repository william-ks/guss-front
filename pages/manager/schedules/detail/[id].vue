<template>
  <div class="center">
    <UiCard :shadow="true" border="simple" style="min-height: 70svh" class="maxBox">
      <div class="mb-5 text-center">
        <h1 class="text-2xl">{{ schedule.name }}</h1>
        <p>{{ schedule.description }}</p>
        <UButton @click="addLessonModal = true">Add Lesson</UButton>
        <ul class="w-full flex flex-col gap-4 mt-5">
          <li class="" v-for="lesson of schedule.lessons" :key="lesson.id">
            <UiCard :shadow="true" border="simple" class="w-full flex justify-between items-center gap-2 p-3 box relative"
              v-if="lesson.id">
              <h3 class="text-lg font-semibold">{{ lesson.name }}</h3>
              <p class="text-sm font-extralight">{{ lesson.description }}</p>
              <p class="text-sm font-extralight absolute left-[3px] top-[3px]"><span :class="`lvl level-${lesson.level}`">{{ lesson.level }}</span>
              </p>
              <p class="text-sm font-extralight">Order: {{ lesson.order }}</p>
              <p>
                <UButton @click.stop="deleteLesson(lesson.id)" variant="ghost" color="red"
                  icon="material-symbols:delete" />
              </p>
            </UiCard>
          </li>
        </ul>
      </div>

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
              <USelect v-model="newLesson.level" :options="levels" placeholder="Select a level" />
            </div>

            <div class="item">
              <p class="text-sm font-extralight mb-1">Order (required)</p>
              <UInput v-model="newLesson.order" min="1" type="number" placeholder="Order" />
            </div>
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Description (recommended)</p>
            <UTextarea v-model="newLesson.description" type="text" placeholder="Description" autoresize />
          </div>

          <div class="item flex gap-5">
            <p class="text-sm font-extralight mb-1">Has Homework</p>
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
            <UButton @click="resetLessonModal" variant="ghost" color="red">Cancel</UButton>
            <UButton @click="submitNewLesson" variant="soft" color="green">Create</UButton>
          </div>

        </div>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
const toast = useToast();
const actualPage = useState("actualPage");

const { params } = useRoute();
const publicId = params.id;

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

const addLessonModal = ref(false);
const hasHomework = ref(false);

const newLesson = ref({
  name: "",
  description: "",
  order: 1,
  level: null,
  scheduleId: publicId,
  homework: {
    name: "",
    description: "",
  }
});

const schedule = ref({
  name: "",
  description: "",
});

const resetLessonModal = () => {
  addLessonModal.value = false;
  newLesson.value = {
    name: "",
    description: "",
    order: 0,
    level: "",
    scheduleId: publicId,
    homework: {
      name: "",
      description: "",
    }
  };
  hasHomework.value = false;
}


const submitNewLesson = async () => {
  try {
    await $fetch(`http://localhost:3001/api/lesson/create`, {
      method: "POST",
      body: newLesson.value,
    });

    downloadSchedule();

    toast.clear()
    toast.add({
      id: 'lesson-created',
      title: 'Lesson created',
      description: 'The lesson was created successfully',
      icon: 'clarity:success-standard-solid',
      color: 'green',
    });
    resetLessonModal();
  } catch (e) {
    toast.add({
      id: 'lesson-created-error',
      title: 'Error creating lesson',
      description: 'There was an error creating the lesson',
      icon: 'ix:namur-failure-filled',
      color: 'red',
    });
  }
}

const downloadSchedule = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/schedule/read/one/${publicId}`)
    console.log(response);

    const maxOrder = response.lessons.reduce((max, lesson) => {
      return Math.max(max, lesson.order);
    }, 0);

    newLesson.value.order = maxOrder + 1;

    schedule.value = response

    actualPage.value = `Schedule: ${response.name}`;

  } catch (e) {

  }
}

const deleteLesson = async (id) => {
  try {
    await $fetch(`http://localhost:3001/api/lesson/delete/${id}`, {
      method: "DELETE",
    });

    downloadSchedule();

    toast.clear()
    toast.add({
      id: 'lesson-deleted',
      title: 'Lesson deleted',
      description: 'The lesson was deleted successfully',
      icon: 'clarity:success-standard-solid',
      color: 'green',
    });
  } catch (e) {
    toast.add({
      id: 'lesson-deleted-error',
      title: 'Error deleting lesson',
      description: 'There was an error deleting the lesson',
      icon: 'ix:namur-failure-filled',
      color: 'red',
    });
  }
}


onMounted(() => {
  
  actualPage.value = "Schedules";

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

.maxBox{
  max-height: 80vh;
  overflow: hidden;
  overflow-y: auto;
}

.item {
  width: 100%;
}

.box {
  cursor: pointer;
  @apply transition-all duration-[150ms];
}

.box:hover {
  transform: scale(1.005);
}

.box:active {
  @apply transition-transform duration-[1ms];
  transform: scale(1);
}

.lvl{
  padding: 0 5px;
  border-radius: 3px;
}

.level-A1 {
  color: rgb(255, 204, 153);
  background-color: rgba(255, 204, 153, 0.1);
}

.level-A2 {
  color: rgb(255, 178, 102);
  background-color: rgba(255, 178, 102, 0.1);
}

.level-B1 {
  color: rgb(153, 204, 153);
  background-color: rgba(153, 204, 153, 0.1);
}

.level-B2 {
  color: rgb(102, 178, 102);
  background-color: rgba(102, 178, 102, 0.1);
}

.level-C1 {
  color: rgb(153, 153, 255);
  background-color: rgba(153, 153, 255, 0.1);
}

.level-C2 {
  color: rgb(102, 102, 255);
  background-color: rgba(102, 102, 255, 0.1);
}
</style>
