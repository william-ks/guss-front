<template>
  <div class="avatar-group">
    <template v-for="(icon, index) in visibleIcons" :key="index">
      <UTooltip :text="icon.name">
        <UAvatar
          size="md"
          :class="`avatar avatar-${index + 1}`"
          :alt="icon.name"
          :src="icon.link"
        />
      </UTooltip>
    </template>
    <UTooltip :text="`More ${remainingIcons}`" v-if="remainingIcons > 0">
      <p class="extra text-gray-400 dark:text-gray-600">...</p>
    </UTooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icons: {
    type: Array,
    default: () => [],
  },
});

const maxVisible = 3;

const visibleIcons = computed(() => props.icons.slice(0, maxVisible));
const remainingIcons = computed(() => props.icons.length - maxVisible);
</script>

<style scoped>
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar {
  position: relative;
}

.avatar:not(:first-child) {
  margin-left: -15px;
}

.avatar-1 {
  z-index: 3;
}

.avatar-2 {
  z-index: 2;
}

.avatar-3 {
  z-index: 1;
}

.extra {
  margin-top: 15px;
}
</style>