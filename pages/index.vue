<template>
  <main>
    <div class="center">
      <UiCard border="full" shadow class="box">
        <h2 class="text-center mb-5 text-3xl">Welcome {{ type }}!</h2>
        <div class="group">
          <label for="student" class="label">
            <input
              @change="change($event, 'emerald')"
              checked
              type="radio"
              id="student"
              name="iam"
            />
            <span class="item red">Student</span>
          </label>
          <label for="gestor" class="label">
            <input
              @change="change($event, 'green')"
              type="radio"
              id="gestor"
              name="iam"
            />
            <span class="item blue">Gestor</span>
          </label>
        </div>
        <ClientOnly>
          <Vueform ref="form">
            <TextElement
              name="email"
              label="E-mail:"
              placeholder="E-mail"
              input-type="email"
            />
            <TextElement
              name="password"
              label="Password:"
              placeholder="Password"
              input-type="password"
            />
          </Vueform>
        </ClientOnly>
        <div class="w-[100%] flex items-center justify-center">
          <UButton @click="submit" class="mt-5"> Sign In </UButton>
        </div>
      </UiCard>
    </div>
  </main>
</template>

<script setup>
const toast = useToast();
const appConfig = useAppConfig();

import { useManagerStore } from "@/stores/manager";
import { useStudentStore } from "@/stores/student";
const managerStore = useManagerStore();
const studentStore = useStudentStore();

const form = ref();

const type = ref("student");

const loginStudent = async () => {
  try {
    const link = await studentStore.login({
      email: form.value.data.email,
      password: form.value.data.password,
    });


    navigateTo(link);
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: e.message,
      description: "Please try again.",
      icon: "ph:warning",
      timeout: 3000,
    });
  }
};

const loginManager = async () => {
  try {
    const link = await managerStore.login({
      email: form.value.data.email,
      password: form.value.data.password,
    });

    navigateTo(link);
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: e.message,
      description: "Please try again.",
      icon: "ph:warning",
      timeout: 3000,
    });
  }
};

const submit = async () => {
  try {
    if (type.value === "student") {
      return loginStudent();
    }

    return loginManager();

    const link = await managerStore.login({
      email: form.value.data.email,
      password: form.value.data.password,
    });

    navigateTo(link);
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: e.message,
      description: "Please try again.",
      icon: "ph:warning",
      timeout: 3000,
    });
  }
};

definePageMeta({
  layout: "nothing",
});

const change = (e, cor) => {
  if (e.target.checked) {
    type.value = e.target.id;
    appConfig.ui.primary = cor;
    localStorage.setItem("nuxt-ui-primary", appConfig.ui.primary);
  }
};

onMounted(() => {
  appConfig.ui.primary = "emerald";
});
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

main .center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4%;
}

.box {
  width: clamp(200px, 98%, 600px);
  padding: 16px 2%;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4) !important;
}

.group {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}

.group .label {
  width: 50%;
  height: 35px;
}

.group .label input {
  display: none;
}

.group .label .item {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgb(62, 59, 65);
  @apply bg-gray-300 text-black;
}

.group .label:first-of-type .item {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.group .label:last-of-type .item {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.group .label input:checked ~ .item.red {
  @apply bg-emerald-500 text-white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}
.group .label input:checked ~ .item.blue {
  @apply bg-green-500 text-white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>
