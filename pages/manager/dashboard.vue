<template>
  <div class="center">
    <div class="g">
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
      <ButtonBox />
    </div>
  </div>
</template>

<script setup>
import ButtonBox from "./_components/ButtonBox";

const actualPage = useState("actualPage");

onMounted(() => {
  actualPage.value = "Dashboard";
});
</script>

<style scoped>
.center {
  height: calc(100vh - 56px - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.g {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 20px;
}
</style>
