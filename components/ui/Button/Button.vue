<template>
  <button :class="classes" :disabled="props.disabled" v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String as () => "default" | "sm" | "lg",
    default: "default",
  },
  variant: {
    type: String as () => "default" | "outline",
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const baseStyle = {
  variants: {
    default: "default",
    outline: "outline",
  },
  sizes: {
    default: "px-4 py-1",
    sm: "px-2.5 py-1 text-xs font-extralight",
    lg: "px-6 py-3 text-lg",
  },
};

const classes = computed(() => {
  return `${baseStyle.variants[props.variant] || "default"} ${
    props.disabled ?? "disabled"
  } ${baseStyle.sizes[props.size] ?? "default"}`;
});
</script>

<style scoped>
@import url("./styles/default.css");
@import url("./styles/outline.css");

button {
  border: 1px solid hsl(var(--primary));

  text-transform: capitalize;

  border-radius: 999px;

  transition:
    text-shadow 0.25s,
    box-shadow 0.25s,
    background-color 0.25s,
    color 0.25s,
    border-color 0.25s,
    transform 0.25s;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@media screen and (max-width: 750px) {
  button:not(:disabled):active {
    position: relative;
    text-shadow: none;
    box-shadow: 0 0 10px hsl(var(--secondary));
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    border-color: hsl(var(--secondary));
    transform: scale(1.06);
    transition: transform 0.05s;
  }
}
@media screen and (min-width: 751px) {
  button:not(:disabled):hover {
    position: relative;
    text-shadow: none;
    box-shadow: 0 0 10px hsl(var(--secondary));
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    border-color: hsl(var(--secondary));
    transform: scale(1.06);
  }

  button:not(:disabled):active {
    transition: transform 0.05s;
    box-shadow: 0 0 7px hsl(var(--secondary));
    transform: scale(1);
  }
}
</style>
