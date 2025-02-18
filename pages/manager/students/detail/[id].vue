<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="state state_card">
        <UButton
          @click="openToggleModal"
          :color="student.isActive ? 'green' : 'red'"
          variant="soft"
        >
          {{ student.isActive ? "Active" : "disabled" }}
        </UButton>
      </div>

      <div class="img relative">
        <NuxtImg :src="student.photo" />
      </div>

      <div class="group">
        <h3>
          <span class="highlight"> Name: </span>
          <span> {{ student.name }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Cpf:</span>
          <span>{{ student.cpf }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">E-mail:</span>
          <span>{{ student.email }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Phone:</span>
          <span>{{ student.phone }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Address:</span>
          <span>{{ student.address }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Class:</span>
          <span>{{ student.classCourse.name ?? "" }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Professor:</span>
          <span>{{ student.classCourse.professorName }}</span>
        </h3>
      </div>

      <div class="w-[100%] flex justify-center items-center gap-16 mt-5">
        <UButton variant="outline" icon="i-heroicons-pencil-square">
          Toggle Student class
        </UButton>
      </div>
    </UiCard>

    <UiModal
      @update:model-value="resetFields"
      v-if="canToggleStudent"
      v-model="isOpenSecondModal"
    >
      <h2 class="text-center text-xl">
        Are you sure you want to
        {{ student.isActive ? "deactivate" : "activate" }} this student?
      </h2>

      <div class="w-[100%] flex items-center justify-evenly mt-7">
        <UButton
          variant="outline"
          v-on:mouseover="redButton = true"
          v-on:mouseout="redButton = false"
          :color="redButton ? 'red' : 'gray'"
        >
          Cancel
        </UButton>
        <UButton
          @click="toggleStudentFunc(!student.isActive)"
          variant="outline"
          color="green"
        >
          Confirm
        </UButton>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";
import { useManagerStore } from "@/stores/manager";
import { useRoute, useState, useToast } from "#imports";

const studentStore = useStudentStore();
const managerStore = useManagerStore();
const actualPage = useState("actualPage");
const toast = useToast();
const isOpenSecondModal = ref(false);
const canToggleStudent = ref(false);
const redButton = ref(false);

const { params } = useRoute();
const id = params.id;

const student = ref({
  name: "Unknown",
  photo:
    "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg",
  cpf: "Unknown",
  classCourse: { id: null, name: "Unknown", professorName: "Unknown" },
  email: "unknown@example.com",
  phone: "Unknown",
  isActive: true,
});

const openToggleModal = () => {
  if (!canToggleStudent.value) {
    toast.clear();
    toast.add({
      title: "Unauthorized",
      description: "You don't have this permission.",
      color: "red",
    });
    return;
  }
  isOpenSecondModal.value = true;
};

const getStudentData = async () => {
  try {
    const data = await studentStore.readOne(id);
    student.value.name = data.name ?? "Unknown";
    student.value.cpf = data.cpf ?? "Unknown";
    student.value.email = data.email ?? "Unknown";
    student.value.phone = data.phone ?? "Unknown";
    student.value.isActive = data.isActive ?? false;
    student.value.description = data.description ?? "";

    if (!data.photo) {
      student.value.photo =
        "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";
    }

    actualPage.value = `${data.name.split(" ")[0]} Account`;
  } catch (error) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "There was an error loading student data.",
    });
  }
};

const loadPage = async () => {
  await getStudentData();
};

const toggleStudentFunc = async (status) => {

  try {
    await studentStore.toggleStudent({ id, status });

    isOpenSecondModal.value = false;
    toast.clear();
    toast.add({ color: "green", title: "Success data updated." });
    resetFields();
    loadPage();
  } catch (e) {
    toast.clear();
    console.log(e);

    toast.add({ color: "red", title: "Error updating student data" });
  }
};

const resetFields = () => {
  // Reset any fields if necessary
};

onMounted(async () => {
  actualPage.value = `Account`;
  await loadPage();

  const permission = managerStore.permissions.find((p) => {
    return p === "PUT_api_student_toggle_status_:id";
  });

  if (permission) {
    canToggleStudent.value = true;
  }
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.box {
  width: clamp(170px, 98%, 550px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  position: relative;
}

.img {
  width: 150px;
  height: 150px;
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
  margin-right: 3px;
  font-weight: 300;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modalTitle {
  font-size: 2.2rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 15px;
}

.modalItens h3 {
  font-size: 1.5rem;
  font-weight: 300;
}

.modalItens {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
}

.modalItem {
  width: 100%;
}

.modalItem:last-of-type {
  margin-bottom: 25px;
}

.state {
  position: absolute;
}

.state_card {
  top: 10px;
}
</style>
