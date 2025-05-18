<template>
  <USlideover v-model="internalValue" class="text-gray-700 dark:text-blue-50">
    <div class="border-l-[1px] border-primary-500 h-full w-full flex flex-col justify-start items-start gap-5 p-5">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UIcon class="w-5 h-5" name="material-symbols:info-outline" />
          <h2 class="text-xl font-bold">Class Info</h2>
        </div>

        <UButton variant="soft" color="gray" icon="material-symbols:close" class="" square padded
          @click="internalValue = false" />


      </div>

      <UDivider class="" />

      <div class="flex flex-col w-full gap-4">
        <!-- NAME -->
        <div class="relative mb-3">
          <div class="flex items-center gap-3">
            <h2 class="font-semibold">Class Name</h2>
            <UButton v-show="!isEditingField.name" size="2xs" variant="link" color="gray"
              icon="material-symbols:edit-rounded" @click="isEditingField.name = true" />
          </div>

          <UInput @dblclick="isEditingField.name = true" :readonly="!isEditingField.name" v-model="infoEdit.name"
            placeholder="Class Name" class="w-full" />

          <div v-show="isEditingField.name" class="absolute mt-1 w-full flex justify-between ">
            <UButton icon="material-symbols:check-small" variant="ghost" size="2xs" class="" color="red" trailing
              @click="cancel('name')">
              Cancel
            </UButton>

            <UButton icon="line-md:confirm" variant="soft" size="2xs" color="green" class="" trailing
              @click="save('name')">
              Save</UButton>
          </div>
        </div>

        <!-- STATUS -->
        <div class="mb-3">
          <h2 class="font-semibold">Status</h2>
          <UInput readonly v-model="props.info.status" placeholder="Not Started" class="w-full" />
        </div>

        <!-- TEACHER -->
        <div class="relative mb-3">
          <div class="flex items-center gap-3">
            <h2 class="font-semibold">Teacher</h2>

            <UButton v-show="!isEditingField.teacher" size="2xs" variant="link" color="gray"
              icon="material-symbols:edit-rounded" @click="isEditingField.teacher = true" />
          </div>

          <UInput class="w-full" v-if="!isEditingField.teacher" :placeholder="!isEditingField.teacher ? 'Instructor Not Assigned' : 'Teacher Name'"
             @dblclick="isEditingField.teacher = true" />


          <USelectMenu class="w-full" v-else v-model="selected" :options="teachers" >
            <template #leading>
              <UIcon v-if="selected.icon" :name="(selected.icon)" class="w-5 h-5" />
              <UAvatar v-else-if="selected.avatar" v-bind="(selected.avatar)" size="2xs" />
            </template>
          </USelectMenu>

          <!-- Fazer um select para teachers -->
          <div v-show="isEditingField.teacher" class="absolute mt-1 w-full flex justify-between ">
            <UButton icon="material-symbols:check-small" variant="ghost" size="2xs" class="" color="red" trailing
              @click="cancel('teacher')">
              Cancel
            </UButton>

            <UButton icon="line-md:confirm" variant="soft" size="2xs" color="green" class="" trailing
              @click="save('teacher')">
              Save</UButton>
          </div>
        </div>

        <!-- SCHEDULE -->
        <div class="relative mb-3">
          <div class="flex items-center gap-3">
            <h2 class="font-semibold">Schedule</h2>
            <UButton size="2xs" variant="link" color="gray" icon="lucide:external-link" @click="toSchedule" />
          </div>

          <UInput v-if="!info.schedule" readonly value="" placeholder="No Schedule Defined" class="w-full" />
          <UInput v-else readonly v-model="infoEdit.schedule.name" placeholder="Schedule Name" class="w-full" />
        </div>
      </div>
    </div>
  </USlideover>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  info: {
    type: Object,
    default: () => ({
      name: "",
      students: [],
      scheduleId: null,
      schedule: {},
      teacherId: null,
      teacher: null,
    }),
  },
  toSchedule: {
    type: Function,
    
  },
  
});

const internalValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

const resetAll = () => {
  isEditingField.value.name = false;
  isEditingField.value.status = false;
  isEditingField.value.teacher = false;
  isEditingField.value.schedule = false;
}

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  resetAll();
});

// -------------------------------

const teachers = ref([]);

const selected = ref({
  id: 1,
  name: "No Teacher Assigned",
  avatar: null,
  icon: 'i-heroicons-user-circle',
});

// ---------------------------

const infoEdit = ref({
  name: props.info.name,
  students: props.info.students,
  scheduleId: props.info.scheduleId,
  schedule: props.info.schedule,
  teacherId: props.info.teacherId,
  teacher: props.info.teacher,
});

const isEditingField = ref({
  name: false,
  status: false,
  teacher: false,
  schedule: false,
})

// --------------------------- FUNCTIONS ---------------------------

const test = (item) => {
  console.log('Returned item:', item);
  return false;
}

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

    if(!props.info.teacher) {
      selected.value = teachers.value[0];
    } else {
      selected.value = teachers.value.find((teacher) => teacher.id === props.info.teacher.id) || teachers.value[0];
    }

    // console.log('Selected teacher:', teachers.value);
  } catch (e) {
    console.log(e);
  }
}
const cancel = (field) => {
  // console.log('Cancelling field:', field);
  isEditingField.value[field] = false;
}

const save = (field) => {
  // console.log('Saving field:', field);
  isEditingField.value[field] = false;
}

onMounted(() => {
  // console.log('teste');
  // console.log(props.info);
  getTeachers();
});
</script>

<style scoped></style>