<template>
  <div>
    <NuxtLink :to="nuxtTo">
      <li class="managerBox">
        <div class="img">
          <NuxtImg
            :src="
              manager.photo ||
              'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'
            "
          />
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

const nuxtTo = ref(`/manager/detail/${props.manager.publicId}`);


onMounted(() => {
  if (props.manager.publicId === managerStore.id) {
    nuxtTo.value = `/manager/self`;
  }
});
</script>

<style scoped>
.managerBox {
  width: 100%;
  box-shadow: 0 5px 10px white;
  border-radius: 8px;
  padding: 16px 2%;
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  z-index: 1;
  cursor: pointer;

  @apply dark:bg-[rgb(38,38,43)] bg-gray-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_10px_rgba(0,0,0,0.8)];

  transition: transform 0.15s;
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
  .managerBox .img {
    width: 70px;
    height: 70px;
  }

  .managerBox p {
    font-size: 0.8rem;
  }
}
</style>
