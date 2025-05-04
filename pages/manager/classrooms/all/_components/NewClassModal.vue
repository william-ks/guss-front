<template>
  <UiModal v-model="internalValue">
    <div class="min-h-[40svh]">
      <h3 class="text-center font-semibold text-xl">New Class</h3>
      <UDivider class="my-3" />

      <div class="flex flex-col gap-5">
        <UFormGroup label="Class Name (required)">
          <UInput v-model="name" placeholder="Enter class name" />
        </UFormGroup>
        <UFormGroup label="Teacher (optional)">
          <USelectMenu searchable searchable-placeholder="Search by Schedule name" placeholder="Select a schedule"
            class="w-full" v-model="selectedTeacher" :options="teachers">
            <template #leading>
              <UIcon v-if="selectedTeacher.icon" :name="(selectedTeacher.icon)" class="w-5 h-5" />
              <UAvatar v-else-if="selectedTeacher.avatar" v-bind="(selectedTeacher.avatar)" size="2xs" />
            </template>
          </USelectMenu>
        </UFormGroup>

        <div class="flex sm:flex-wrap gap-5 justify-between items-center">
          <UFormGroup class="w-[45%]" label="Schedule name">
            <UInput class="w-full" v-model="name" placeholder="Enter schedule name" />
          </UFormGroup>

          <UFormGroup class="w-[45%]" label="Schedule base (optional)">
            <USelectMenu v-model="selectedSchedule" searchable searchable-placeholder="Search by Schedule name"
              placeholder="Select a schedule" value-attribute="id" option-attribute="name" :options="schedules" />
          </UFormGroup>

        </div>

        <UFormGroup label="Select students (optional)">
          <USelectMenu multiple searchable searchable-placeholder="Search by student name" placeholder="Select a student"
            class="w-full" v-model="selectedStudents" :options="students">
            <template #leading>
              <UIcon v-if="selectedTeacher.icon" :name="(selectedTeacher.icon)" class="w-5 h-5" />
              <UAvatar v-else-if="selectedTeacher.avatar" v-bind="(selectedTeacher.avatar)" size="2xs" />
            </template>
          </USelectMenu>
        </UFormGroup>

        <UDivider class="my-3" />

        <div class="buttons w-full flex gap-2 justify-between items-center">
          <UButton variant="ghost" color="red" @click="internalValue = false;">Cancel</UButton>
          <UButton variant="soft" color="green" @click="() => { }">Create Class</UButton>
        </div>


      </div>
    </div>
  </UiModal>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
});

const internalValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);


watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  resetAll();
});

// ------------------------------- RESET ALL -------------------------------

const resetAll = () => {
  name.value = null;
  selectedTeacher.value = {
    id: 1,
    label: "No Teacher Assigned",
    icon: 'i-heroicons-user-circle',
  };
  selectedSchedule.value = {
    id: 1,
    name: "No Schedule Assigned",
  };
}


// ----------------------- TEACHERS -----------------------


const teachers = ref([]);

const selectedTeacher = ref({
  id: 1,
  label: "No Teacher Assigned",
  icon: 'i-heroicons-user-circle',
});

const getTeachers = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/manager/read/all`, {
      method: "GET",
      credentials: "include",
    });

    // console.log('Teachers:');
    // console.log(response);

    teachers.value = response.map((teacher) => {
      const teacherName = teacher.name.split(' ')[0];
      // console.log(`${teacherName} (${teacher.role.title})`);
      return {
        id: teacher.publicId,
        label: `${teacherName} (${teacher.role.title})`,
        avatar: {
          src: teacher.photo,
          alt: teacher.name,
        },
      };
    });

    teachers.value.unshift({
      id: 1,
      label: "No Teacher Assigned",
      icon: 'i-heroicons-user-circle',
    });

    selectedTeacher.value = teachers.value[0];


    // console.log('Selected teacher:', teachers.value);
  } catch (e) {
    console.log(e);
  }
}

// ----------------------- Schedules -----------------------


const schedules = ref([]);

const selectedSchedule = ref({
  id: 1,
  name: "No Teacher Assigned",
  avatar: null,
  icon: 'i-heroicons-user-circle',
});

const getSchedules = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/schedule/read/all`, {
      method: "GET",
      credentials: "include",
    });

    // console.log('Teachers:');
    // console.log(response);

    const array = response.map((schedule) => {
      return {
        id: schedule.id,
        name: schedule.name,
      };
    });

    array.push({
      id: 0,
      name: "No Schedule Assigned",
    });

    array.sort((a, b) => a.id - b.id);
    schedules.value = array;
    selectedSchedule.value = schedules.value[0].id;


    // console.log('Selected teacher:', teachers.value);
  } catch (e) {
    console.log(e);
  }
}

//-------------------------- STUDENTS --------------------------
const students = ref(null);
const selectedStudents = ref(null);

const getStudents = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/student/read/all`, {
      method: "GET",
      credentials: "include",
    });

    // console.log('Teachers:');
    // console.log(response);

    students.value = response.map((student) => {
      return {
        id: student.publicId,
        label: student.name,
        avatar: {
          src: student.photo,
          alt: student.name,
        },
      };
    });

    students.value.unshift({
      id: 1,
      label: "No Student Assigned",
      icon: 'i-heroicons-user-circle',
    });


    console.log(students.value);
  } catch (e) {
    console.log(e);
  }
}



//-------------------------- name --------------------------
const name = ref(null);

//------------------------ OnMounted -----------------------

onMounted(() => {
  getTeachers();
  getSchedules();
  getStudents();
});
</script>

<style scoped></style>