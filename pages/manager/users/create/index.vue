<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="img relative">
        <NuxtImg :src="photoRef || defaultImage" />

        <UPopover overlay v-model:open="imagePopover">
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

      <div class="flex flex-col gap-3">
        <div class="flex flex-col-reverse gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Name (required)</p>
            <UInput v-model="form.name" type="text" placeholder="Name" />
          </div>

          <div class="item">
            <p class="text-sm font-extralight mb-1">Role (required)</p>
            <USelectMenu
              v-model="form.roleId"
              searchable
              searchable-placeholder="Search a role..."
              :options="roles"
              placeholder="Role"
              option-attribute="name"
            />
          </div>
        </div>

        <div class="item">
          <p class="text-sm font-extralight mb-1">E-mail (required)</p>
          <UInput v-model="form.email" type="email" placeholder="E-mail" />
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

        <div class="flex flex-col gap-3 sm:gap-5 sm:flex-row">
          <div class="item">
            <p class="text-sm font-extralight mb-1">Birthday (optional)</p>
            <div class="flex w-[100%]">
              <UInput
                @click="() => (showDatePicker = true)"
                v-model="form.birthday"
                readonly
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
      </div>

      <div class="flex justify-center mt-5">
        <UButton @click="submit">Cadastrar Usuario</UButton>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
import { useRoleStore } from "@/stores/roles";
import { useManagerStore } from "@/stores/manager";

const roleStore = useRoleStore();
const managerStore = useManagerStore();

const photoRef = ref();
const imagePopover = ref(false);

const showDatePicker = ref(false);
const selectedDate = ref(new Date());

const defaultImage =
  "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";

const roles = ref([]);

const form = ref({
  name: "",
  email: "",
  cpf: "",
  address: "",
  phone: "",
  birthday: "",
  roleId: null,
});

const closeDateModel = () => {
  showDatePicker.value = false;
};

const updateDate = () => {
  console.log(selectedDate.value);
  closeDateModel();
};

const submit = () => {
  console.log(form.value);
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
        value: el.id,
        disabled: el.points > managerStore.role.points,
      };
    });
  } catch (e) {}
};

onMounted(() => {
  const actualPage = useState("actualPage");
  actualPage.value = "Create Manager";
  getRoles();
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
</style>
