<template>
  <UiModal v-model="internalValue" class="modalMain">
    <div class="min-h-[60svh]">
      <h3 class="text-center font-semibold text-2xl">Students</h3>
      <UDivider class="my-3" />
      <ul>
        <StudentLi v-for="student of props.students" :key="student.id" :student="student" />
      </ul>
    </div>
  </UiModal>
</template>

<script setup>
import StudentLi from './StudentLi.vue';

const props = defineProps({
  modelValue: Boolean,
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

</script>

<style scoped></style>