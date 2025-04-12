<template>
  <div class="center">
    <UiCard class="box">
      <div class="img relative">
        <NuxtImg :src="photoRef || defaultImage" />

        <UPopover overlay v-model:open="imagePopover">
          <UButton rounded icon="i-heroicons-pencil-square" class="absolute top-[-20px] right-[30px]">
            Edit Image
          </UButton>

          <template #panel>
            <UInput @change="handleFileIcon" type="file" size="sm" icon="i-heroicons-folder" />
          </template>
        </UPopover>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-col-reverse gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Name (required)</p>
            <UInput v-model="form.name" type="text" placeholder="Name" />
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Role (required)</p>
            <USelectMenu v-model="form.role" searchable searchable-placeholder="Search a role..." :options="roles"
              placeholder="Role" option-attribute="name" />
          </div>
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">E-mail (required)</p>
          <UInput v-model="form.email" type="email" placeholder="E-mail" />
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">CPF (required)</p>
          <UInput v-model="form.cpf" type="text" v-maska="'###.###.###-##'" placeholder="000.000.000-00" />
        </div>

        <div class="flex flex-col gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Birthday (optional)</p>
            <div class="flex w-[100%]">
              <UInput @click="showDatePicker = true" v-model="form.birthday" class="w-[100%]" type="text"
                v-maska="'##/##/####'" icon="material-symbols:edit-calendar-outline" placeholder="00/00/0000" />

              <UPopover overlay v-model:open="showDatePicker">
                <button></button>
                <template #panel>
                  <UiDatePicker v-model:model-value="selectedDate" @update:model-value="updateDate" />
                </template>
              </UPopover>
            </div>
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Phone (optional)</p>
            <UInput v-model="form.phone" type="text" v-maska="'(##) #####-####'" placeholder="(00) 00000-0000" />
          </div>
        </div>

        <div class="item">
          <UButton @click="permissionModal = true">Select Permissions</UButton>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <UButton @click="submit">Cadastrar Usuario</UButton>
      </div>
    </UiCard>

    <UiModal v-if="permissionModal" v-model="permissionModal">
      <div class="modalItens">
        <div class="modalItem">
          <h3>Permissions:</h3>
          <ul class="permissions">
            <li v-for="permission of permissionsRef" :key="permission.id">
              <label for="null">
                <input type="checkbox" class="checkbox" :id="`checkbox${permission.id}`" :checked="permission.selected"
                  @click="
                    toggleItem({
                      type: 'permission',
                      id: permission.id,
                      code: permission.code,
                      disabled: permission.disabled,
                    })
                    " />
                <label :for="`checkbox${permission.id}`">
                  <div :class="{
                    modalPermission: true,
                    disabled: permission.disabled,
                  }">
                    {{ permission.name }}
                  </div>
                </label>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex justify-center mt-5">
        <UButton @click="permissionModal = false" label="Next" icon="material-symbols:arrow-forward" trailing />
      </div>
    </UiModal>
  </div>
</template>

<script setup>
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";
import { usePermissionStore } from "@/stores/permissions";

const permissionModal = ref(false);
const toast = useToast();

const roleStore = useRoleStore();
const managerStore = useManagerStore();
const permissionStore = usePermissionStore();

const photoRef = ref();
const imagePopover = ref(false);

const showDatePicker = ref(false);
const selectedDate = ref(new Date());

const uploadImage = ref();

const defaultImage =
  "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";

const roles = ref([]);
const permissionsRef = ref([]);

const form = ref({
  name: "Ray",
  email: "rs@gmail.com",
  cpf: "020.088.306-24",
  address: "",
  phone: "",
  birthday: "",
  role: null,
  photo: null,
  permissions: [],
});

const getPermissions = async () => {
  const data = await permissionStore.listAll();
  permissionsRef.value = data.map((el) => {
    const userHaveThisPermission = managerStore.permissions.includes(el.code);
    return { ...el, disabled: !userHaveThisPermission, selected: false };
  });
};

const toggleItem = (item) => {
  if (!item.type) return;

  if (item.type === "permission") {
    if (item.disabled) {
      toast.clear();
      toast.add({
        color: "red",
        title: "You should only edit permissions that you have.",
        description: "And you don't have this permission",
      });
      document.querySelector(`#checkbox${item.id}`).checked = false;
      permissionsRef.value = permissionsRef.value.map((el) =>
        el.code === item.code
          ? {
            ...el,
            selected: document.querySelector(`#checkbox${item.id}`).checked,
          }
          : el
      );
      return;
    }

    const alreadyExists = form.value.permissions.find(
      (el) => el.code === item.code
    );

    if (alreadyExists) {
      form.value.permissions = form.value.permissions.filter(
        (el) => el.code !== item.code
      );
      return;
    }

    form.value.permissions.push(item.code);
    return;
  }
};

const closeDateModel = () => {
  showDatePicker.value = false;
};

const updateDate = () => {
  form.value.birthday = selectedDate.value.toLocaleDateString();
  closeDateModel();
};

const submit = async () => {
  try {
    if (uploadImage.value) {
      const formData = new FormData();
      formData.append("file", uploadImage.value);

      try {
        loadingScreen.value = true;
        const response = await managerStore.uploadPhoto(formData);

        photoRef.value = `${response}`;
      } catch (e) {
        throw e;
      } finally {
        loadingScreen.value = false;
      }
    }



    await managerStore.create({
      name: form.value.name,
      email: form.value.email,
      cpf: form.value.cpf,
      roleId: form.value.role.value,
      birthday: form.value.birthday ? form.value.birthday : null,
      photo: photoRef.value ?? null,
      permissions: form.value.permissions,
    });

    toast.clear();
    toast.add({
      title: "Success",
      description: `${form.value.role.name ?? 'User'} created successfully`,
    });
    navigateTo('/manager/users/all')
  } catch (e) {
    console.log(e);
    toast.clear();
    toast.add({
      title: "Error",
      description: "error",
      color: 'red'
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

const getRoles = async () => {
  try {
    const rolesFounded = await roleStore.listAll();

    roles.value = rolesFounded.map((el) => {
      if (el.points <= managerStore.role.points) {
      }

      return {
        name: el.title,
        value: +el.id,
        disabled: el.points > managerStore.role.points,
      };
    });

  } catch (e) { }
};

onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Create Manager";
  getRoles();
  getPermissions();
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

.item {
  width: 100%;
}


.modalItens h3 {
  font-size: 1.8rem;
  text-align: center;
  font-weight: 300;
  margin-bottom: 15px;
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

.modalItem .permissions {
  width: 100%;
  /*
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.modalItem .permissions li {
  /* width: 33.3%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 2px;
}

.modalItem .modalPermission {
  display: inline-block;
  user-select: none;
  padding: 3px 10px;
  border-radius: 50px;
  transition: transform 0.05s, background 0.25s, opacity 0.25s, border 0.25s,
    color, 0.25s;
  border: 1px solid;
  cursor: pointer;
  font-weight: 300;
  /* box-shadow: 0 5px 10px black; */

  @apply dark:border-gray-800 dark:bg-gray-800 dark:opacity-95 opacity-85 shadow-[0_5px_5px_hsl(var(--shadow))] text-gray-600 border-gray-200 bg-gray-100;
}

.modalItem .modalPermission.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.modalItem input:not(:checked)~label .modalPermission {
  transform: scale(0.98);
}

.modalItem input:checked~label .modalPermission {
  transform: scale(1);
  @apply dark:border-primary-500 border-primary-500 text-primary-500 opacity-100;
}

.modalItem input {
  display: none !important;
}

@media screen and (max-width: 770px) {
  .modalItem .permissions li {
    width: auto;
  }
}

@media screen and (max-width: 550px) {
  .modalItem .permissions li {
    width: auto;
  }

  .modalItem .permissions {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
