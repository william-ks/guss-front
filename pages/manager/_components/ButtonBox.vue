<template>
  <NuxtLink :to="props.link">
    <UiCard :shadow="true" :border="true" class="buttonBox">
      <div class="icon">
        <UIcon :name="icon" />
      </div>
      <h3>{{ props.title }}</h3>
    </UiCard>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  link: {
    default: "/",
    type: String,
  },
  icon: {
    default: "ph:student",
    type: String,
  },
  title: {
    default: "Title",
    type: String,
  },
});
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
