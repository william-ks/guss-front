<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="img relative">
        <NuxtImg :src="photoRef || defaultImage" />

        <UPopover overlay v-model:open="imagePopover">
          <UButton
            rounded
            variant="soft"
            icon="i-heroicons-pencil-square"
            class="w-[122px] absolute top-[-20px] right-[14px]"
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

      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Name (required)</p>
            <UInput v-model="form.name" type="text" placeholder="Name" />
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">CPF (required)</p>
            <UInput
              v-model="form.cpf"
              type="text"
              v-maska="'###.###.###-##'"
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">E-mail (required)</p>
          <UInput v-model="form.email" type="email" placeholder="E-mail" />
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">Address (optional)</p>
          <UInput v-model="form.address" type="text" placeholder="Address" />
        </div>

        <div class="flex flex-col gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Birthday (optional)</p>
            <div class="flex w-[100%]">
              <UInput
                @click="() => (showDatePicker = true)"
                v-model="form.birthday"
                class="w-[100%]"
                type="text"
                v-maska="'##/##/####'"
                icon="material-symbols:edit-calendar-outline"
                placeholder="00/00/0000"
              />

              <UPopover overlay v-model:open="showDatePicker">
                <button></button>
                <template #panel>
                  <UiDatePicker
                    v-model:model-value="selectedDate"
                    @update:model-value="updateDate"
                  />
                </template>
              </UPopover>
            </div>
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Phone (optional)</p>
            <UInput
              v-model="form.phone"
              type="text"
              v-maska="'(##) #####-####'"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">Password (required)</p>
          <UInput
            v-model="form.password"
            type="password"
            placeholder="********"
          />
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <UButton @click="submit">Cadastrar Usuario</UButton>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
import { useStudentStore } from "@/stores/student";

const studentStore = useStudentStore();

const toast = useToast();

const photoRef = ref();
const imagePopover = ref(false);

const showDatePicker = ref(false);
const selectedDate = ref(new Date());

const defaultImage =
  "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";

const form = ref({
  name: "",
  email: "",
  cpf: "",
  address: "",
  phone: "",
  birthday: "",
  password: "",
});

const closeDateModel = () => {
  showDatePicker.value = false;
};

const updateDate = () => {
  closeDateModel();
};

const validateForm = () => {
  console.log(form.value);

  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.cpf ||
    !form.value.password
  ) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "Please fill in all required fields",
    });
    return false;
  }

  if (!form.value.email.includes("@")) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "Please enter a valid email",
    });
    return false;
  }

  if (form.value.cpf.length != 14) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "Please enter a valid cpf",
    });
    return false;
  }

  if (form.value.phone && form.value.phone.length != 15) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "Please enter a valid phone",
    });
    return false;
  }

  return true;
};

const submit = async () => {
  if (!validateForm()) return;

  try {
    await studentStore.createStudent({
      ...form.value,
      birthday: selectedDate.value
        ? selectedDate.value.toLocaleDateString("pt-BR")
        : null,
      photo: photoRef.value,
    });

    toast.clear();
    toast.add({
      color: "green",
      title: "Success",
      description: "User created succesfully",
    });
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error creating student, please try again.",
      description: e.message,
    });
  }
};

const handleFileIcon = async (file) => {
  uploadImage.value = file[0];
  try {
    const reader = new FileReader();

    reader.onload = (e) => {
      photoRef.value = e.target.result;
    };

    reader.readAsDataURL(file[0]);
  } catch (error) {
    toast.clear();
    toast.add({
      title: "Error",
      message: "Error uploading image, please try again",
    });
  } finally {
    imagePopover.value = false;
  }
  return;
};

onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Create Student";
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
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

.item {
  width: 100%;
}
</style>
