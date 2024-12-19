<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="img relative">
        <NuxtImg :src="photoEdit || user.photo" />
        <UPopover v-if="isEditing">
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

      <div class="group">
        <h3>
          <span class="highlight"> Name: </span>
        </h3>
        <UInput
          class="inputCustom"
          :disabled="!isEditing"
          type="name"
          v-model:model-value="nameEdit"
        />
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Cpf:</span>
        </h3>
        <UInput
          v-maska="'###.###.###-##'"
          :disabled="!isEditing"
          type="text"
          v-model:model-value="cpfEdit"
        />
      </div>

      <div class="group">
        <h3>
          <span class="highlight">E-mail:</span>
        </h3>
        <UInput
          :disabled="!isEditing"
          type="email"
          v-model:model-value="emailEdit"
        />
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Birthday:</span>
        </h3>
        <div @click="() => (showPopover = true)">
          <UInput
            :disabled="!isEditing"
            type="text"
            icon="material-symbols:edit-calendar-outline"
            v-maska="'##/##/####'"
            v-model="birthdayEdit"
          />
        </div>
        <UPopover v-model:open="showPopover">
          <button></button>
          <template #panel>
            <UiDatePicker
              v-model:model-value="selectedDate"
              @update:model-value="updateDate"
              @close="closeDateModel"
            />
          </template>
        </UPopover>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Role:</span>
          <span>
            {{ user.role.title }}
          </span>
        </h3>

        <UInput disabled type="text" v-model:model-value="user.role.title" />
      </div>

      <div class="w-[100%]">
        <h3>
          <span class="highlight"> Authorizations: </span>
          <ul>
            <li v-for="permission of user.permissions" :key="permission.id">
              - {{ permission.permission.name }}
            </li>
          </ul>
        </h3>
      </div>

      <div class="w-[100%] flex justify-between items-center gap-16 mt-5">
        <UButton
          v-if="!isEditing"
          @click="isEditing = true"
          variant="outline"
          icon="i-heroicons-pencil-square"
        >
          Edit
        </UButton>

        <UButton
          v-if="isEditing"
          @click="resetFields"
          color="red"
          variant="outline"
        >
          Cancelar
        </UButton>

        <UButton
          v-if="isEditing"
          @click="updateUser"
          variant="outline"
          color="green"
        >
          Salvar
        </UButton>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
import { useManagerStore } from "@/stores/manager";
const managerStore = useManagerStore();
const toast = useToast();
const showPopover = ref(false);
const selectedDate = ref(new Date());
const isEditing = ref(false);

const emailEdit = ref("");
const nameEdit = ref("");
const cpfEdit = ref("");
const photoEdit = ref("");
const birthdayEdit = ref("");

const user = ref({
  name: "Unknown",
  photo:
    "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg",
  cpf: "Unknown",
  role: { title: managerStore.role.title || "Unknown" },
  email: "unknown@example.com",
  birthday: "00/00/0000",
});

const loadingScreen = useState("loadingScreen");
const uploadImage = ref();

const handleFileIcon = async (file) => {
  uploadImage.value = file[0];
  try {
    const reader = new FileReader();

    reader.onload = (e) => {
      photoEdit.value = e.target.result;
    };

    reader.readAsDataURL(file[0]);
  } catch (error) {
    console.log(error);
    console.log("não deu");
  }
  return;
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const updateDate = () => {
  birthdayEdit.value = formatDate(selectedDate.value);
};

const closeDateModel = () => {
  showPopover.value = false;
};

const resetFields = () => {
  isEditing.value = false;

  emailEdit.value = user.value.email;
  nameEdit.value = user.value.name;
  cpfEdit.value = user.value.cpf;
  photoEdit.value = "";
  birthdayEdit.value = user.value.birthday || "00/00/0000";
};

const showToast = (message) => {
  toast.clear();
  toast.add({
    color: "green",
    title: "Success",
    description: message,
  });
};

const updateUser = async () => {
  try {
    const form = {
      name: nameEdit.value,
      email: emailEdit.value,

      cpf: cpfEdit.value,
      birthday: birthdayEdit.value,
    };

    if (uploadImage.value) {
      console.log("here");
      const formData = new FormData();
      formData.append("file", uploadImage.value);

      try {
        loadingScreen.value = true;
        const response = await uploadImage(formData);
        photoEdit.value = response.link;
      } catch (e) {
        throw e;
      } finally {
        loadingScreen.value = false;
      }
    }

    if (photoEdit.value) {
      form.photo = photoEdit.value;
    }

    await managerStore.updateSelf(form);
    showToast("User has been updated.");
    await getUserData();
    isEditing.value = false;
  } catch (error) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: error.message,
    });
  }
};

const getUserData = async () => {
  try {
    const data = await managerStore.readSelf();
    user.value = data;

    if (!data.photo) {
      user.value.photo =
        "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";
    }

    emailEdit.value = data.email;
    nameEdit.value = data.name;
    cpfEdit.value = data.cpf;
    birthdayEdit.value = data.birthday || "00/00/0000";
  } catch (error) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "There was an error loading user data.",
    });
  }
};

onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "My Account";
  getUserData();
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
  margin-right: 3px;
  font-weight: 300;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
