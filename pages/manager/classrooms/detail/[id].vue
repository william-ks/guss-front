<template>
  <div class="center">
    <UiCard :shadow="true" border="simple" class="ct">
      <div class="my-5">
        <UProgress v-if="actualProgress <= 0" size="sm" animation="carousel" />
        <UProgress v-else size="sm" :value="actualProgress" :max="100" indicator />
      </div>

      <div class="g">
        <ButtonBox class="block" title="Class Info" icon="material-symbols:info-outline"
          @click="classInfoSideBar = true" />
        <ButtonBox class="block" title="Students" icon="hugeicons:students"
          @click="studentsInfoModal = true" />
        <ButtonBox class="block" title="Schedule" icon="material-symbols:calendar-month-outline" />
      </div>
    </UiCard>

    <!-- slide class info -->
    <ClassInfoSlideOver v-if="downloadedData" :info="classroom" v-model="classInfoSideBar" />
    <ModalStudentsOver :students="classroom.students" v-model="studentsInfoModal" />
  </div>
</template>

<script setup>
// Nuxt imports
import ClassInfoSlideOver from './_components/ClassInfoSlideOver.vue';
import ModalStudentsOver from './_components/ModalStudentsOver.vue';
import StudentsInfoSlideOver from './_components/StudentsInfoSlideOver.vue';
import ButtonBox from '../../_components/ButtonBox.vue';

// TOOLS imports
const actualPage = useState("actualPage");
const toast = useToast();
const id = useRoute().params.id;
const downloadedData = ref(false);


// Refs and reactive variables ------------------------------------
const actualProgress = ref(0);

const classroom = ref({
  id,
  name: null,
  status: null,
  schedule: null,
  teacher: null,
  students: [],
})

// sidebars controllers ------------------------------------
const classInfoSideBar = ref(false);
const studentsInfoModal = ref(true);

// functions ------------------------------------
const downloadClassData = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/classroom/findby/id/${id}`, {
      method: "GET",
      credentials: "include",
    });

    classroom.value = { ...response };
    actualPage.value = `Class: ${response.name}`;
    downloadedData.value = true;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  downloadClassData()
  actualPage.value = "Class";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px);
}

.ct {
  min-height: 70vh;
}

.g {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  justify-content: center;
  align-items: center;
}

.item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5px;
  gap: 5px;
}
</style>