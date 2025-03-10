<template>
  <div class="card" :class="({ cShadow: props.shadow }, `${border}`)">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  shadow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: String,
    default: "none",
  },
});

const borders = ["simple", "full", "animated"];

const border = ref("");

const borderTypeFound = borders.find(
  (borderType) => borderType === props.border
);

if (borderTypeFound) {
  border.value = `border-${borderTypeFound}`;
}else{
  border.value = "";
}
</script>

<style scoped>
.card {
  width: 100%;
  border-radius: 10px;
  padding: 16px 2%;
  color: hsl(var(--card-foreground));
  transition: border-color 0.15s;
  @apply bg-white dark:bg-gray-900;
  @apply border-[1px] border-white dark:border-gray-900;
}

.card.cShadow {
  box-shadow: 0 5px 10px hsl(var(--shadow));
}

.card.border-simple {
  @apply dark:border-gray-800 border-gray-200;
}

.card.border-full {
  @apply dark:border-primary-800 border-primary-300;
}

.card.border-animated {
  @apply dark:border-gray-800 border-gray-200 hover:dark:border-primary-800 hover:border-primary-300;
}

.card.cBorder:hover {
  border: 1px solid hsl(var(--card-bg));
  @apply border-primary-300 dark:border-primary-500;
}
</style>
