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
.svg {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}

label {
  width: 100%;
}

input.default {
  all: unset;
  font-weight: 200;
  cursor: text;
  background-color: transparent;
  position: relative;
  width: 100%;
  padding: 10px 5px;
  box-shadow: none;
  color: white;
  font-size: 0.8rem;
}

.content {
  width: 100%;
  position: relative;
}

.content::after {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 15%;
  left: 5px;
  height: 3px;
  border-radius: 8px;
  background: hsl(var(--primary));

  transition:
    width 0.5s,
    background 0.5s;
}

.content:hover::after,
.content:focus::after,
.content.full::after {
  width: calc(100% - 5px);
  background: hsl(var(--secondary));
  box-shadow:
    0 0 5px hsl(var(--secondary)),
    0 0 25px hsl(var(--secondary)),
    0 0 50px hsl(var(--secondary));
}
</style>
