<template>
  <div v-show="loadingScreen" class="fullScreen">
    <NuxtImg src="/loading.svg" />
  </div>
</template>

<script setup>
const toggleScroll = () => {
  const body = document.querySelector("body");
  body.classList.toggle("lockScroll");
};

const loadingScreen = useState("loadingScreen", () => false);

onMounted(() => {
  toggleScroll();
});

onUnmounted(() => {
  toggleScroll();
});
</script>

<style scoped>
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullScreen img {
  width: 300px;
  height: 300px;
}
</style>
