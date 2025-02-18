<template>
  <div>
    <NuxtLink :to="nuxtTo">
      <li class="studentBox">
        <div class="state state_card">
          <UButton
            :color="props.student.isActive ? 'green' : 'red'"
            variant="soft"
          >
            {{ props.student.isActive ? "Active" : "disabled" }}
          </UButton>
        </div>
        <div class="img">
          <NuxtImg
            :src="
              student.photo ||
              'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'
            "
          />
        </div>
        <div class="desc">
          <p>{{ props.student.name }}</p>
          <p>{{ props.student.email }}</p>
          <p v-if="props.student.class">Class: {{ props.student.class }}</p>
        </div>
      </li>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";
const studentStore = useStudentStore();

const props = defineProps({
  student: Object,
});

const nuxtTo = ref(`/manager/students/detail/${props.student.publicId}`);

onMounted(() => {
  if (props.student.publicId === studentStore.id) {
    nuxtTo.value = `/student/users/self`;
  }
});
</script>

<style scoped>
.studentBox {
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

  @apply dark:bg-[rgb(38,38,43)] bg-gray-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_5px_10px_rgba(0,0,0,0.8)];

  transition: transform 0.15s;
}

.state {
  position: absolute;
}

.state_card {
  top: 10px;
  right: 10px;
}

.studentBox p {
  font-size: 0.9rem;
  transition: font-size 0.15s;
}

.studentBox:hover {
  transform: scale(1.02);
}

.studentBox:active {
  transform: scale(0.98);
}

.studentBox .img {
  width: 100px;
  height: 100px;
  transition: width 0.15s, height 0.15s;
}

.studentBox .img img {
  width: 100%;
  height: 100%;
  border-radius: 200px;
}

@media screen and (max-width: 550px) {
  .studentBox .img {
    width: 70px;
    height: 70px;
  }

  .studentBox p {
    font-size: 0.8rem;
  }
}
</style>
