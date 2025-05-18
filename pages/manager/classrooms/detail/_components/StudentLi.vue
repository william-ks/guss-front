<template>
  <UiCard :shadow="true" border="simple" class="studentBox">
    <div class="w-full flex justify-between items-center">
      <div class="absolute top-0 right-0" v-if="!props.student.isActive">
        <UButton variant="ghost" size="2xs" color="red">Disabled</UButton>
      </div>
      <div class="flex items-center">
        <div class="img">
          <NuxtImg :src="student.photo ||
            'https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg'
            " />
        </div>
        <div class="desc">
          <p class="text-sm">{{ props.student.name }}</p>
          <p class="text-sm"><span class="text-xs">{{ props.student.absences }}</span> Absences</p>
        </div>
      </div>

      <div class="button">

        <UDropdown :items="items" :popper="{ arrow: true, placement: 'bottom-start' }">
          <UButton color="white" icon="si:more-square-vert-duotone" class="text-2xl" />
        </UDropdown>
      </div>
    </div>
  </UiCard>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";
const studentStore = useStudentStore();
const toast = useToast();

const emit = defineEmits(["upgrade"]);

const props = defineProps({
  student: Object,
  classroomId: String,
});

const removeStudent = async () => {
  try {
    await $fetch(`http://localhost:3001/api/classroom/moviment/students`, {
      method: "POST",
      body: {
        classroomId: props.classroomId,
        studentsIds: [props.student.id]
      },
      credentials: "include",
    });
    toast.add({
      title: "Student removed!",
      description: "The student was removed from the classroom.",
      icon: "i-heroicons-check-circle-20-solid",
      color: "green",
    });

    emit('upgrade')
  } catch (error) {
    toast.add({
      title: "Error removing student!",
      description: "The student was not removed from the classroom.",
      icon: "i-heroicons-x-circle-20-solid",
      color: "red",
    });
  }
};

const toggleStudent = async () => {
  try {
    await $fetch(`http://localhost:3001/api/classroom/toggle/${props.classroomId}/${props.student.id}`, {
      method: "PUT",
      credentials: "include",
    });
    toast.add({
      title: `Student ${props.student.isActive ? 'disabled' : 'enabled'}!`,
      description: `The student was ${props.student.isActive ? 'disabled' : 'enabled'}.`,
      icon: "i-heroicons-check-circle-20-solid",
      color: "green",
    });

    emit('upgrade')
  } catch (error) {
    toast.add({
      title: `Error on ${props.student.isActive ? 'disable' : 'enable'} student!`,
      description: `The student was not ${props.student.isActive ? 'disabled' : 'enabled'}.`,
      icon: "i-heroicons-x-circle-20-solid",
      color: "red",
    });
  }
};

const items = [
  [{
    label: props.student.isActive ? 'Desativar aluno' : 'Ativar aluno',
    icon: props.student.isActive ? 'material-symbols:lock' : 'material-symbols:lock-open',
    click: () => {
      toggleStudent()
    }
  }],
  [{
    label: 'Remove student',
    icon: 'i-heroicons-trash-20-solid',
    click: () => { removeStudent() }
  }]
];

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
