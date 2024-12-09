<template>
  <UiCard :shadow="true" :border="true" class="buttonBox">
    <div class="icon">
      <UIcon name="ph:student" />
    </div>
    <h3>Students</h3>
  </UiCard>
</template>

<script setup>
</script>

<style scoped>
.buttonBox {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.1s;
}

.buttonBox:hover {
  transform: scale(1.06);
}

.buttonBox .icon {
  font-size: 45px;
}
</style>
