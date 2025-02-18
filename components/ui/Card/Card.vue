<template>
  <div class="card" :class="{ cShadow: shadow, cBorder: border }">
    <slot />
  </div>
</template>

<script setup>
const { shadow, border } = defineProps({
  shadow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  border-radius: 10px;
  padding: 16px 2%;
  /* background: hsl(var(--card-bg)); */
  color: hsl(var(--card-foreground));
  @apply bg-white dark:bg-gray-900
}

.card.cShadow {
  box-shadow: 0 5px 10px hsl(var(--shadow));
}

/* .card.cBorder {
  border: 1px solid hsl(var(--border));
} */

.card.cBorder {
  border: 1px solid hsl(var(--card-bg));
}

.card.cBorder:hover {
  border: 1px solid hsl(var(--card-bg));
  @apply border-primary-300 dark:border-primary-500;
}
</style>
