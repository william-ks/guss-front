<template>
  <UiModal v-model="internalValue" class="modalMain">
    <div class="min-h-[60svh]">
      <h3 class="text-center font-semibold text-2xl">Students</h3>
      <UDivider class="my-3" />
      <div class="menu">

        <UButton variant="soft" color="primary" icon="material-symbols:add" trailing
          @click="isAddStudentsModalOpen = true">
          Add Student</UButton>
      </div>
      <UDivider class="my-3" />
      <ul class="flex flex-col gap-5 overflow-y-auto max-h-[50svh]">
        <StudentLi @upgrade="$emit('upgrade')" :classroomId="props.classroomId" v-for="student of props.students"
          :key="student.id" :student="student" />
      </ul>
    </div>
    <ModalAddStudent @upgrade="$emit('upgrade')" :classroomId="props.classroomId"
      v-model:model-value="isAddStudentsModalOpen" :students="props.students"
      @update:model-value="isAddStudentsModalOpen = $event" />
  </UiModal>
</template>

<script setup>
import ModalAddStudent from './ModalAddStudent.vue';
import StudentLi from './StudentLi.vue';

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
const emit = defineEmits(['update:modelValue']);

const resetAll = () => {
}

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  resetAll();
});

// -------------------------------

const isAddStudentsModalOpen = ref(false);

</script>

<style scoped></style>