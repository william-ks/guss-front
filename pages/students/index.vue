<template>
  <div class="center">
    <ul class="">
      <li>
        <UiAvatar />
        <h3>William</h3>
        <p>Turma: 2B</p>
        <p>Status: Ativo</p>
        <p>Professor: Gustavo</p>
        <UIcon class="icon" name="si:more-square-vert-duotone" />
      </li>
    </ul>
  </div>
</template>

<script setup>
const actualPage = useState("actualPage");

onMounted(() => {
  actualPage.value = "Students";
});
</script>

<style scoped></style>
