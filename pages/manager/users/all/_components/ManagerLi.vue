<template>
  <div>
    <NuxtLink :to="nuxtTo">
      <li class="managerBox">
        <div class="state state_card">
          <UButton :color="props.manager.isActive ? 'green' : 'red'" variant="ghost">
            {{ props.manager.isActive ? "Active" : "disabled" }}
          </UButton>
        </div>
        <div class="img">
          <NuxtImg :src="manager.photo ||
            'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'
            " />
        </div>
        <div class="desc">
          <p>{{ props.manager.name }}</p>
          <p>{{ props.manager.email }}</p>
          <p>{{ props.manager.role.title }}</p>
        </div>
      </li>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();

const props = defineProps({
  manager: Object,
});

const nuxtTo = ref(`/manager/users/detail/${props.manager.publicId}`);

onMounted(() => {
  if (props.manager.publicId === managerStore.id) {
    nuxtTo.value = `/manager/users/self`;
  }
});
</script>

<style scoped>
.managerBox {
  width: 100%;
  box-shadow: 0 5px 10px white;
  border-radius: 8px;
  position: relative;
  padding: 16px 2%;
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  z-index: 1;
  cursor: pointer;

  @apply border-[1px] border-white dark:border-gray-900;
  @apply dark:border-gray-800 border-gray-200;
  @apply shadow-[0_5px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_10px_rgba(0,0,0,0.7)];

  transition: transform 0.15s;
}

.state {
  position: absolute;
}

.state_card {
  top: 10px;
  right: 10px;
}

.managerBox p {
  font-size: 0.9rem;
  transition: font-size 0.15s;
}

.managerBox:hover {
  transform: scale(1.02);
}

.managerBox:active {
  transform: scale(0.98);
}

.managerBox .img {
  width: 100px;
  height: 100px;
  transition: width 0.15s, height 0.15s;
}

.managerBox .img img {
  width: 100%;
  height: 100%;
  border-radius: 200px;
}

@media screen and (max-width: 550px) {
  .managerBox {
    padding: 8px 5%;
  }

  .managerBox .img {
    width: 60px;
    height: 60px;
  }

  .managerBox p {
    font-size: 0.7rem;
  }

  .state_card .u-button {
    font-size: 0.8rem;
    /* Ajuste o tamanho da fonte conforme necessário */
  }
}
</style>
