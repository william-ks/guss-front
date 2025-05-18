<template>
  <UiModal v-model="internalValue" class="modalMain">
    <div class="">
      <h3 class="text-center font-semibold text-2xl">Add Student</h3>
      <UDivider class="my-3" />
      <UFormGroup label="Select students">
        <USelectMenu multiple searchable searchable-placeholder="Search by student name"
          placeholder="Select the students" class="w-full" v-model="selectedStudent" :options="students" />
      </UFormGroup>
      <UDivider class="my-3" />
      <div class="flex justify-between items-center">
        <UButton @click="close" variant="ghost" color="red">Cancel</UButton>
        <UButton :disabled="selectedStudent.length <= 0" variant="soft" color="green" icon="material-symbols:add"
          trailing @click="addStudent">
          Add Selected Student</UButton>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
const toast = useToast();
const props = defineProps({
  modelValue: Boolean,
  classroomId: {
    type: String,
    required: true,
  },
  students: {
    type: Array,
    default: () => [],
  },
});

const internalValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue', 'upgrade']);

const resetAll = () => {
  selectedStudent.value = [];
}

const close = () => {
  internalValue.value = false;
  resetAll();
}

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  resetAll();
});

// -------------------------------

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

    const existingStudentIds = props.students.map((student) => student.id);
    students.value = response.map((student) => {
      return {
        id: student.publicId,
        label: student.name,
        avatar: {
          src: student.photo,
          alt: student.name,
        },
      };
    }).filter((student) => {
      return !existingStudentIds.includes(student.id);
    });
  } catch (e) {
    console.log(e);
  }
}

const addStudent = async () => {
  try {
    const response = await $fetch(`http://localhost:3001/api/classroom/moviment/students`, {
      method: "POST",
      credentials: "include",
      body: {
        studentsIds: selectedStudent.value.map((student) => student.id),
        classroomId: props.classroomId,
      },
    });

    toast.clear();
    toast.add({
      title: "Students added",
      description: "Students added to the classroom successfully",
      icon: "material-symbols:check-circle",
      color: "green",
    });
    emit('upgrade');
    internalValue.value = false;
    resetAll();
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  console.log(props.students)
  getStudents();
}); 
</script>

<style scoped></style>