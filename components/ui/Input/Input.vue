<template>
  <label :for="name || props.type">
    <div
      v-if="props.type !== 'password'"
      class="content"
      :class="{ full: value }"
    >
      <input
        :type="props.type"
        :id="props.name || props.type"
        :required="props.required"
        v-bind="$attrs"
        @keyup="
          (e) => {
            value = e.target.value;
          }
        "
        class="default"
      />
    </div>
    <div v-else class="content" :class="{ full: value }">
      <input
        :type="canView ? 'text' : 'password'"
        :id="props.name || props.type"
        :required="props.required"
        :placeholder="canView ? 'Senha' : '**********'"
        v-bind="$attrs"
        @keyup="
          (e) => {
            value = e.target?.value;
          }
        "
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
const value = ref("");
const canView = ref(false);

const props = defineProps({
  name: String,
  type: {
    type: String as () => "email" | "text" | "password",
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.svg {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}

input.default {
  all: unset;
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
  bottom: 0;
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
}
</style>
