<template>
  <div class="center">
    <div class="g">
      <ButtonBox
        link="/manager/users/all"
        icon="hugeicons:manager"
        title="Managers"
      />

      <ButtonBox link="/" icon="hugeicons:hierarchy" title="Roles" />

      <ButtonBox
        link="/manager/students/all"
        icon="ph:student"
        title="Students"
      />

      <ButtonBox link="/" icon="lineicons:blackboard" title="Classes" />
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
