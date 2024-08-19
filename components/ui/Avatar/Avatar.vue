<template>
  <div class="avatar" v-bind="$attrs">
    <NuxtImg v-if="load" :src="src" />
    <div
      v-else
      class="fallback flex h-[100%] w-[100%] items-center justify-center bg-[hsl(var(--primary))]"
    >
      <p>WK</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { src } = defineProps({
  src: String,
});

const load = ref(false);

const checkImg = async () => {
  try {
    const response = await fetch(src, { method: "HEAD" });
    if (!response.ok) {
      load.value = false;
      return;
    }
    load.value = true;
  } catch (e) {
    load.value = false;
  }
};

onMounted(() => {
  checkImg();
});
</script>

<style scoped>
.avatar {
  width: 35px;
  height: 35px;
  /* border: 1px solid #ccc; */
  border-radius: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/public/noImage.png");
  background-size: cover;
  background-position: center;
}

.avatar img {
  width: 100%;
  height: 100%;
}

p {
  text-shadow: 1px 1px 1px black;
  font-weight: 200;
  letter-spacing: 1px;
  user-select: none;
}
</style>
