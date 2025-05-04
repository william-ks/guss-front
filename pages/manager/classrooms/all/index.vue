<template>
  <div class="center ">
    <UiCard :shadow="true" border="simple" class="ct">
      <div class="w-full flex justify-end">
        <UButton variant="soft" icon="material-symbols:add" trailing @click="newClassModal = true;">New Class</UButton>
      </div>

      <UDivider class="my-3" />

      <ul class="flex flex-col gap-4 mt-4">
        <li @click="navigate(classroom.publicId)" v-for="classroom of classrooms" :key="classroom.publicId">
          <UiCard :shadow="true" border="simple" class="box relative">
            <AvatarGroup v-if="classroom.studentsIcons.length > 0" :icons="classroom.studentsIcons" />
            <UAvatar v-else src="https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg"
              alt="student-photo" />

            <h3>{{ classroom.name }} - {{ classroom.students.length }}</h3>
            <UButton class="absolute top-0 right-0" variant="soft" size="2xs" color="green" label="60%" />
          </UiCard>
        </li>
      </ul>
    </UiCard>

    <NewClassModal v-model="newClassModal" />
  </div>
</template>

<script setup>
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";
import AvatarGroup from "../../../../components/AvatarGroup.vue";
import NewClassModal from "./_components/NewClassModal.vue";
// import { useClassroomStore } from "@/stores/classroom";

const classrooms = ref([]);
const newClassModal = ref(true);

const downloadClassrooms = async () => {
  try {
    const response = await $fetch(
      `http://localhost:3001/api/classroom/list/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );

    classrooms.value = response;

    for (let i = 0; i < classrooms.value.length; i++) {
      const classroom = classrooms.value[i];
      const students = classroom.students;
      const icons = [];
      for (let j = 0; j < students.length; j++) {
        const student = students[j].student;
        icons.push({
          name: student.name,
          link: student.photo,
        });
      }

      classrooms.value[i].studentsIcons = icons;
    }
  } catch (error) {
    console.log(error);
  }
};

const navigate = (id) => {
  navigateTo(`/manager/classrooms/detail/${id}`);
}

onMounted(() => {
  downloadClassrooms();
  const actualPage = useState("actualPage");
  actualPage.value = "Classes";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.ct {
  min-height: 60vh;
}

.box {
  display: flex;
  gap: 10px;
  align-items: center;
  @apply transition-transform duration-[150ms] ease-in-out;
}

.box:hover {
  transform: scale(1.01);
}

.box:active {
  @apply transition-transform duration-[0ms] ease-in-out;
  transform: scale(1);
}
</style>
