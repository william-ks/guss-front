<template>
  <UiModal v-model="internalValue">
    <div class="min-h-[40svh]">
      <h3 class="text-center font-semibold text-xl">New Class</h3>
      <UDivider class="my-3" />

      <div class="flex flex-col gap-5">
        <UFormGroup label="Class Name (required)">
          <UInput v-model="className" placeholder="Enter class name" />
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
            <UInput class="w-full" v-model="scheduleName" placeholder="Enter schedule name" />
          </UFormGroup>

          <UFormGroup class="w-[45%]" label="Schedule base (optional)">
            <USelectMenu v-model="selectedSchedule" searchable searchable-placeholder="Search by Schedule name"
              placeholder="Select a schedule" value-attribute="id" option-attribute="name" :options="schedules" />
          </UFormGroup>

        </div>

        <UFormGroup label="Select students (optional)">
          <USelectMenu multiple searchable searchable-placeholder="Search by student name"
            placeholder="Select the students" class="w-full" v-model="selectedStudent" :options="students" />
        </UFormGroup>

        <UDivider class="my-3" />

        <div class="buttons w-full flex gap-2 justify-between items-center">
          <UButton variant="ghost" color="red" @click="internalValue = false;">Cancel</UButton>
          <UButton variant="soft" color="green" @click="submitForm">Create Class</UButton>
        </div>


      </div>
    </div>
  </UiModal>
</template>

<script setup>
const toast = useToast()

const props = defineProps({
  modelValue: Boolean,
});

const internalValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue', 'classCreated']);


watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  resetAll();
});

// ------------------------------- RESET ALL -------------------------------

const resetAll = () => {
  className.value = null;
  scheduleName.value = null;

  selectedTeacher.value = {
    id: 0,
    label: "No Teacher Assigned",
    icon: 'i-heroicons-user-circle',
  };

  selectedSchedule.value = schedules.value.length > 0 ? schedules.value[0].id : null;

  selectedStudent.value = [];
};


// ----------------------- TEACHERS -----------------------


const teachers = ref([]);

const selectedTeacher = ref({
  id: 0,
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
      id: 0,
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

const createdSchedule = ref(null);

const getSchedules = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/schedule/read/all`, {
      method: "GET",
      credentials: "include",
    });

    // console.log('Teachers:');
    // console.log(response);

    const array = response.map((schedule) => {

      const name = `${schedule.name}${schedule.isDefault ? ' (default)' : ''}`;
      return {
        id: schedule.publicId,
        name: name,
      };
    }).filter(Boolean);

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
const selectedStudent = ref([]);

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
  } catch (e) {
    console.log(e);
  }
}

//-------------------------- refs --------------------------
const className = ref(null);
const scheduleName = ref(null);

//-------------------------- form send ----------------------
const submitSchedule = async () => {
  try {
    const scheduleForm = {
      name: scheduleName.value,
      scheduleId: selectedSchedule.value,
      isDefault: false,
    };

    if (!scheduleForm.name) {
      throw { code: 123, message: 'Schedule name is required' };
    }

    const response = await $fetch(`http://localhost:3001/api/schedule/create`, {
      method: "POST",
      credentials: "include",
      body: scheduleForm,
    });

    createdSchedule.value = response.id;
  } catch (e) {
    toast.clear();
    toast.add({
      title: 'Error',
      color: 'red',
      icon: 'material-symbols:error-rounded',
      description: e.message || 'An error occurred while creating the schedule',
    });
    throw e;

  }
}

const submitForm = async () => {
  const form = {
    name: className.value,
    teacherId: null,
    scheduleId: null,
    studentsIds: selectedStudent.value.map((student) => student.id).filter(Boolean),
  };

  if (scheduleName.value !== null && !selectedSchedule.value) {
    try {await submitSchedule();
      form.scheduleId = createdSchedule.value.id;
    } catch (e) {
      return;
    }
  }

  if(selectedSchedule.value !== null) {
    form.scheduleId = selectedSchedule.value;
  }

  try {

    if (!form.name) {
      toast.clear();
      toast.add({
        title: 'Error',
        color: 'red',
        icon: 'material-symbols:error-rounded',
        description: 'Class name is required',
      });
      return;
    }

    if (selectedTeacher.value.id && selectedTeacher.value.id > 0) {
      form.teacherId = selectedTeacher.value.id;
    }

    const response = await $fetch(`http://localhost:3001/api/classroom/create`, {
      method: "POST",
      credentials: "include",
      body: form,
    });

    console.log('Form:', form);
    toast.clear();
    toast.add({
      title: 'Success',
      color: 'green',
      icon: 'material-symbols:check-circle-rounded',
      description: 'Class created successfully',
    });

    resetAll();
    emit('classCreated');
  } catch (e) {
    console.log(e);
  }
}

//------------------------ OnMounted -----------------------

onMounted(() => {
  getTeachers();
  getSchedules();
  getStudents();
});
</script>

<style scoped></style>