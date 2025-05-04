<template>
  <UiCard :shadow="true" border="simple" class="studentBox">
    <div class="w-full flex justify-between items-center">
      <div class="flex items-center">
        <div class="img">
          <NuxtImg :src="student.photo ||
            'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'
            " />
        </div>
        <div class="desc">
          <p class="text-sm">Student: <span class="text-xs">{{ props.student.name }}</span></p>
          <p class="text-sm">Absences: <span class="text-xs">{{ props.student.absences }}</span></p>
          <p class="text-sm">Presences: <span class="text-xs">{{ props.student.presences }}</span></p>
          <p class="text-sm">Status: <span class="text-xs">{{ props.student.isActive ? 'Ativo' : 'Desativado' }}</span>
          </p>
        </div>
      </div>

      <div class="button">
        <UIcon name="si:more-horiz-square-line" class="text-4xl cursor-pointer" />
      </div>
    </div>
  </UiCard>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";
const studentStore = useStudentStore();

const props = defineProps({
  student: Object,
});


onMounted(() => {

});
</script>

<style scoped>
.studentBox {
  width: 100%;
  display: flex;
  position: relative;
}

.state {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}

.img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
</style>
