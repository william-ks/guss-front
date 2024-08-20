<template>
  <section class="page">
    <div class="center">
      <ul class="flex flex-col items-center justify-center gap-10">
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
        <li class="box">test</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "~/components/Header.vue";

const pageTitle = useState("pageTitle");

useHead({
  title: "Dashboard",
});

onMounted(() => {
  pageTitle.value = "Dashboard";
});
</script>

<style scoped>


.box {
  width: 200px;
  height: 200px;
  background: cadetblue;
}
</style>
