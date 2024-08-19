<template>
  <section class="page"></section>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "~/components/Header.vue";

const pageTitle = useState("pageTitle");

useHead({
    title: 'Dashboard'
});

onMounted(() => {
  pageTitle.value = 'Dashboard'
})
</script>

<style scoped>
.c {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/bg2.jpg");
  background-size: cover;
  background-position: center;
}
</style>
