<template>
  <div class="center">
    <UiCard shadow border="simple" style="min-height: 70svh">
        
    </UiCard>
  </div>
</template>

<script setup>
const toast = useToast();

const { params } = useRoute();
const id = params.id;


onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Default Schedules";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}
</style>
