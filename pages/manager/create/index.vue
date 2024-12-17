<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="img relative">
        <NuxtImg :src="imageLink" />
        <UPopover v-model:open="popOver">
          <UButton
            rounded
            icon="i-heroicons-pencil-square"
            class="absolute top-[-20px] right-[30px]"
          >
            Edit Image
          </UButton>

          <template #panel>
            <UInput
              @change="handleFileIcon"
              type="file"
              size="sm"
              icon="i-heroicons-folder"
            />
          </template>
        </UPopover>
      </div>
      <UInput type="text" placeholder="Nome..." />
      <UInput type="email" placeholder="E-mail..." />
      <UInput type="text" v-maska="'###.###.###-##'" placeholder="CPF..." />
      <UButton @click="load">teste</UButton>
    </UiCard>
  </div>
</template>

<script setup>
const popOver = ref(false);

const imageLink = ref(
  "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg"
);

const loadingScreen = useState("loadingScreen");

const load = () => {
  loadingScreen.value = !loadingScreen.value;
  console.log(loadingScreen.value);
};

const handleFileIcon = async (file) => {
  const formData = new FormData();
  formData.append("file", file[0]);

  popOver.value = false;

  try {
    loadingScreen.value = true;
    const response = await uploadImage(formData);
    imageLink.value = response.link;
  } catch (e) {
    console.log(e);
  } finally {
    loadingScreen.value = false;
  }
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.img {
  width: 200px;
  height: 200px;
  margin: 0 auto;

  margin-bottom: 15px;
}

.img img {
  width: 100%;
  height: 100%;
  border-radius: 288px;
  box-shadow: 0 5px 10px hsl(var(--shadow));
}
</style>
