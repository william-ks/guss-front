<template>
  <aside class="sideBar" :class="{ visible: props.visible }">
    <div class="header">
      <UiTogglePallet />
    </div>
    <nav class="menu">
      <ul @click="$emit('close')">
        <li>
          <NuxtLink to="/manager/dashboard"> Dashboard </NuxtLink>
        </li>
        <li>
          <NuxtLink to=""> Students </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/manager/all"> Managers </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="px-2">
      <UiToggleTheme />
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
});
</script>

<style scoped>
.sideBar {
  width: 0;
  height: 100vh;
  z-index: 9;
  transition: width 0.35s, padding 0.35s;
  padding: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.sideBar.visible {
  padding: 16px 0;
  width: clamp(200px, 97%, 300px);
  @apply border-r-[1px] border-primary-300 dark:border-primary-500 bg-white dark:bg-gray-900;
}

.header {
  margin-bottom: 15px;
}

.menu {
  height: 100%;
  width: 100%;
}

.menu ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.menu ul li {
  width: 100%;
}

.menu ul li a {
  width: 100%;
  cursor: pointer;
  padding: 15px 2%;
  display: inline-block;
  border-bottom: 1px solid #242424;

  @apply border-b-[1px] border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-700;
}

.menu ul li a:hover {
  @apply dark:bg-gray-800 bg-gray-100;
}
</style>
