<template>
  <div @click="toggle" class="toggleBox dark:bg-gray-950 bg-gray-100">
    <div class="iconBg" :class="{ darkActive: darkActive }">
      <Icon v-show="!visibleMoon" class="icon" name="material-symbols:sunny" />
      <Icon v-show="visibleMoon" class="moon" name="ic:round-nights-stay" />
    </div>
  </div>
</template>

<script setup>
const darkActive = ref(false);
const visibleMoon = ref(false);

const colorMode = useColorMode();

const toggle = async () => {
  darkActive.value = !darkActive.value;
  setTimeout(() => {
    if (colorMode.preference === "dark") {
      colorMode.preference = "light";
    } else {
      colorMode.preference = "dark";
    }
    visibleMoon.value = !visibleMoon.value;
  }, 250);
};

onMounted(() => {
  if (colorMode.preference === "dark") {
    darkActive.value = true;
    visibleMoon.value = true;
  } else {
    darkActive.value = false;
    visibleMoon.value = false;
  }
});
</script>

<style scoped>
.toggleBox {
  width: 60px;
  height: 20px;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  position: relative;
  box-shadow: 0 5px 10px hsl(var(--shadow));

  /* background-color: hsl(var(--toggleThemeBtn-sub-bg)); */
  border: 1px solid hsl(var(--toggleThemeBtn-border));
}

.iconBg {
  background-color: hsl(var(--toggleThemeBtn-bg));
  color: hsl(var(--toggleThemeBtn-color));
  border: 1px solid hsl(var(--toggleThemeBtn-border));

  box-shadow: 0 2px 5px hsl(var(--shadow));
  position: absolute;
  width: 25px;
  height: 25px;
  top: -16%;
  left: -5px;
  transform: translateY(-50%);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -5px;
  transform: rotate(0deg);
  transition:
    left 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.iconBg.darkActive {
  left: 40px;
  transform: rotate(360deg);
}
</style>
