<template>
  <div class="center">
    <UiCard :shadow="true" border="simple" class="box">
      <div class="w-[100%] flex justify-end mb-7">
        <NuxtLink to="/manager/students/create">
          <UButton variant="soft" icon="material-symbols:add"> New Student </UButton>
        </NuxtLink>
      </div>
      <ul class="w-[100%] flex gap-5 flex-col" v-if="studentsList.length > 0">
        <StudentLi
          v-for="student of studentsList"
          :key="student.id"
          :student="student"
        />
      </ul>

      <h3 class="text-center" v-else>Sorry we not found students</h3>
    </UiCard>
  </div>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";
import StudentLi from "./_components/StudentLi";

const studentStore = useStudentStore();
const studentsList = ref([]);

const getStudents = async () => {
  studentsList.value = await studentStore.listAll();
  console.log(studentsList.value);
};

onMounted(() => {
  getStudents();
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

.box{
  min-height: 60vh;
}
</style>
