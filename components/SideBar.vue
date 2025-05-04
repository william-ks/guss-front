<template>
  <aside class="sideBar" :class="{ visible: props.visible }">
    <div class="header">
      <UiTogglePallet />
      <UiToggleTheme />
    </div>
    <nav class="menu">
      <ul @click="$emit('close')">
        <li v-for="item in menuItens" :key="item.id">
          <NuxtLink :to="item.link">
            <div class="flex items-center justify-start gap-3">
              <UIcon :name="item.icon" class="inline-block text-2xl" />
              <p class="">{{ item.name }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="px-2">

    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
});

const menuItens = ref([
  {
    id: 1,
    name: 'Home',
    link: '/manager/home',
    icon: 'material-symbols:home-outline'
  },
  {
    id: 2,
    name: 'Managers',
    link: '/manager/users/all',
    icon: 'ph:users-three-duotone'
  },
  {
    id: 3,
    name: 'Students',
    link: '/manager/students/all',
    icon: 'hugeicons:students'
  },
  {
    id: 4,
    name: 'Classes',
    link: '/manager/classrooms/all',
    icon: 'lineicons:blackboard'
  },
  {
    id: 4,
    name: 'Schedules',
    link: '/manager/schedules/all',
    icon: 'uil:schedule'
  },

]);
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
  @apply bg-white dark:bg-gray-900;
  /* @apply border-r-[1px] border-primary-300 dark:border-primary-500; */
}

.header {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
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
  padding: 15px 3%;
  display: inline-block;
  border-bottom: 1px solid #242424;

  @apply border-b-[1px] border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-700;
}

.menu ul li a:hover {
  @apply dark:bg-gray-800 bg-gray-100;
}
</style>
