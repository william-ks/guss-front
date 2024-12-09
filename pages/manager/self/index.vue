<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="img">
        <NuxtImg
          src="https://i.pinimg.com/736x/6d/50/9d/6d509d329b23502e4f4579cbad5f3d7f.jpg"
        />
      </div>
      <h3><span class="highlight">Name:</span> {{ user.name }}</h3>
      <h3><span class="highlight">Office:</span> {{ user.role.title }}</h3>
      <h3><span class="highlight">E-mail:</span> {{ user.email }}</h3>
      <h3>
        <span class="highlight">Birthday:</span>
        {{ user.birthday }}
      </h3>

      <div class="flex justify-center items-center">
        <UButton @click="popUp" variant="outline" class="mt-5">Edit</UButton>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();
const toast = useToast();

const actualPage = useState("actualPage");

const user = ref({
  name: managerStore.name || "Unknown",
  role: {
    title: managerStore.role || "Unknown",
  },
  email: managerStore.email || "unknown@example.com",
  birthday: "Unknown",
});

const popUp = () => {
  toast.add({
    color: "amber",
    title: "Essa feature ainda está em desenvolvimento!",
    description: "Por favor tente novamente mais tarde.",
    icon: "ph:warning",
    timeout: 3000,
  });
};

const getData = async () => {
  const data = await managerStore.readSelf();
  user.value = data;
};

onMounted(() => {
  actualPage.value = "My Account";
  getData();
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
}

.box {
  width: clamp(170px, 98%, 550px);
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

h3 {
  font-weight: 200;
}

.highlight {
  margin-top: 5px;
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 300;
}
</style>
