<template>
  <div class="center ">
    <UiCard :shadow="true" border="simple" class="ct">
      <div class="w-full flex justify-between">
        <USelect placeholder="Level" :options="levels" />
        <USelect placeholder="Sub Level" :options="['Beginner', 'Intermediary', 'Advanced']" />
        <UButton variant="soft" icon="material-symbols:add" trailing @click="newClassModal = true;">New Class</UButton>
      </div>

      <UDivider class="my-3" />

      <ul class="flex flex-col gap-4 mt-4">
        <UTable sort-asc-icon="i-heroicons-arrow-up-20-solid" sort-desc-icon="i-heroicons-arrow-down-20-solid"
          :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }"
          class="w-full" :rows="classrooms" :columns="columns">
          <template #empty-state>
            <div class="flex flex-col items-center justify-center py-6 gap-3">
              <span class="italic text-sm">No classes here!</span>

            </div>
          </template>
          <template #actions-data="{ row }">
            <UTooltip text="Open">
              <UButton color="gray" @click="openClassroom(row)" variant="ghost" icon="material-symbols:open-in-new" />
            </UTooltip>
          </template>
        </UTable>
      </ul>
    </UiCard>

    <NewClassModal @classCreated="downloadClassrooms" v-model="newClassModal" />
  </div>
</template>

<script setup>
const toast = useToast();
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";
import AvatarGroup from "../../../../components/AvatarGroup.vue";
import NewClassModal from "./_components/NewClassModal.vue";
// import { useClassroomStore } from "@/stores/classroom";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];


const columns = [{
  key: 'actions'
}, {
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'teacher',
  label: 'Teacher',
  sortable: true,
}, {
  key: 'students',
  label: 'Students',
  sortable: true,
}, {
  key: 'level',
  label: 'Level',
  sortable: true,
},]

const classrooms = ref([]);

const openClassroom = row => {

  const classroom = classrooms.value.find((classroom) => classroom.id === row.id);

  if (!classroom) {
    toast.clear();
    toast.add({
      title: "Classroom not found",
      description: "The classroom you are looking for does not exist.",
      icon: "i-heroicons-exclamation-circle-20-solid",
      color: "red",
    });
    return;
  }

  navigateTo(`/manager/classrooms/detail/${classroom.publicId}`);
}
const newClassModal = ref(false);

const downloadClassrooms = async () => {
  newClassModal.value = false;
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

    console.log(response);
    classrooms.value = response.map((classroom) => {
      return {
        ...classroom,
        id: classroom.id,
        name: classroom.name,
        totalStudents: classroom.students.length,
        teacher: classroom.teacherId ? classroom.Teacher.name : "Unassigned",
        students: classroom.students.length,
        level: "A1 Beginner",
      };
    });

    console.log(classrooms.value);
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
