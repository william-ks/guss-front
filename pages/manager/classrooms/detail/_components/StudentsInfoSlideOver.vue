<template>
  <USlideover v-model="internalValue" class="text-gray-700 dark:text-blue-50">
    <div class="border-l-[1px] border-primary-500 h-full w-full flex flex-col justify-start items-start gap-5 p-5">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UIcon class="w-5 h-5" name="material-symbols:info-outline" />
          <h2 class="text-xl font-bold">Students Info</h2>
        </div>

        <UButton variant="soft" color="gray" icon="material-symbols:close" class="" square padded
          @click="internalValue = false" />


      </div>

      <UDivider class="" />

      <div class="flex flex-col w-full gap-4">

      </div>
    </div>
  </USlideover>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,

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