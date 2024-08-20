<script setup>
import SideButton from "@/components/SideBar/SideButton.vue";
import Avatar from "@/components/ui/Avatar/Avatar.vue";

const { title } = defineProps({
  title: String,
  open: Function,
  isOpened: Boolean,
});
</script>

<template>
  <header class="header">
    <div class="center flex items-center justify-between">
      <SideButton title="header" @toggleSide="open" :isChecked="isOpened" />
      <h2 v-if="title" class="select-none text-lg font-light capitalize">
        {{ title }}
      </h2>
      <Avatar src="/icon.jpg" />
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  padding: 15px 0;
  /* box-shadow: 0 1px 10px hsl(var(--primary)); */
  background: hsl(var(--card));
}
</style>
