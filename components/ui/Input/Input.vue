<template>
  <label :for="name || props.type">
    <div
      v-if="props.type !== 'password'"
      class="content"
      :class="{ full: modelValue }"
    >
      <p
        v-if="props.desc"
        class="absolute top-[-12px] text-sm font-extralight text-gray-300"
      >
        {{ props.name }}:
      </p>
      <input
        :type="props.type"
        :id="props.name || props.type"
        :required="props.required"
        v-bind="$attrs"
        :value="modelValue"
        @input="updateVal"
        class="default"
      />
    </div>
    <div v-else class="content" :class="{ full: props.modelValue }">
      <p
        v-if="props.desc"
        class="absolute top-[-12px] text-sm font-extralight text-gray-300"
      >
        {{ props.name }}:
      </p>
      <input
        :type="canView ? 'text' : 'password'"
        :id="props.name || props.type"
        :required="props.required"
        :placeholder="canView ? 'Password' : '**********'"
        v-bind="$attrs"
        :value="props.modelValue"
        @input="updateVal"
        class="default"
      />
      <Icon
        @click="canView = !canView"
        class="svg"
        :name="canView ? 'akar-icons:eye-open' : 'octicon:eye-closed-16'"
      />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const canView = ref(false);

const props = defineProps({
  name: String,
  type: {
    type: String as () => "email" | "text" | "password",
    default: "text",
  },
  desc: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateVal = (e: any) => {
  emit("update:modelValue", e?.target?.value);
};
</script>

<style scoped>
@import url("./config/style.css");
</style>
