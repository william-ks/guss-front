<template>
  <div class="center">
    <UiCard :shadow="true" :border="true" class="box">
      <div class="state state_card">
        <UButton
          @click="openToggleModal"
          :color="user.isActive ? 'green' : 'red'"
          variant="soft"
        >
          {{ user.isActive ? "Active" : "disabled" }}
        </UButton>
      </div>

      <div class="img relative">
        <NuxtImg :src="user.photo" />
      </div>

      <div class="group">
        <h3>
          <span class="highlight"> Name: </span>
          <span> {{ user.name }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Cpf:</span>
          <span>{{ user.cpf }}</span>
        </h3>
      </div>

      <div class="group">
        <h3>
          <span class="highlight">Role:</span>
          <span>
            {{ user.role.title }}
          </span>
        </h3>
      </div>
      <div class="group">
        <h3>
          <span class="highlight">E-mail:</span>
          <span>{{ user.email }}</span>
        </h3>
      </div>
      <div class="group">
        <h3>
          <span class="highlight">Birthday:</span>
          <span>{{ user.birthday || "00/00/0000" }}</span>
        </h3>
      </div>

      <div class="w-[100%]">
        <h3>
          <span class="highlight"> Permissions: </span>
          <ul>
            <li v-for="permission of user.permissions" :key="permission.id">
              - {{ permission.permission.name }}
            </li>
          </ul>
        </h3>
      </div>

      <div class="w-[100%] flex justify-center items-center gap-16 mt-5">
        <UButton
          v-if="canEdit"
          :disabled="!user.isActive"
          @click="isOpenModal = true"
          variant="outline"
          :color="user.isActive ? 'primary' : 'gray'"
          icon="i-heroicons-pencil-square"
        >
          Edit This User
        </UButton>
      </div>
    </UiCard>

    <UiModal
      @update:model-value="resetFields"
      v-if="canEdit"
      v-model="isOpenModal"
    >
      <h2 class="modalTitle">Edit User</h2>

      <div class="modalItens">
        <div class="modalItem">
          <h3>Role:</h3>

          <USelect
            @change="toggleItem({ type: 'role' })"
            v-model="role"
            :options="roles"
            option-attribute="name"
          />
        </div>

        <div class="modalItem">
          <h3>Permissions:</h3>
          <ul class="permissions">
            <li v-for="permission of permissionsRef" :key="permission.id">
              <label :for="`checkbox${permission.id}`">
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="permission.selected"
                  :id="`checkbox${permission.id}`"
                  @click="toggleItem({ type: 'permission', id: permission.id })"
                />
                <div class="modalPermission">{{ permission.name }}</div>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex justify-center items-center mt-5">
        <UButton
          variant="outline"
          :color="
            dataToUpdate.permissions.length <= 0 && !dataToUpdate.roleId
              ? 'gray'
              : 'primary'
          "
          :disabled="
            dataToUpdate.permissions.length <= 0 && !dataToUpdate.roleId
          "
          @click="tryUpdate"
        >
          Update data
        </UButton>
      </div>
    </UiModal>

    <UiModal
      @update:model-value="resetFields"
      v-if="canEdit"
      v-model="isOpenSecondModal"
    >
      <h2 class="text-center text-xl">
        Are you sure you want to
        {{ user.isActive ? "deactivate" : "activate" }} this user?
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
          @click="toggleManager(!user.isActive)"
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
import { useManagerStore } from "@/stores/manager";
import { useRoleStore } from "@/stores/roles";
import { usePermissionStore } from "@/stores/permissions";
const managerStore = useManagerStore();
const roleStore = useRoleStore();
const permissionStore = usePermissionStore();
const actualPage = useState("actualPage");
const toast = useToast();
const isOpenModal = ref(false);
const isOpenSecondModal = ref(false);
const canEdit = ref(false);
const canToggleManager = ref(false);

const redButton = ref(false);

const { params } = useRoute();
const id = params.id;

const roles = ref([]);
const role = ref(0);

const dataToUpdate = ref({
  roleId: null,
  permissions: [],
});

const permissionsRef = ref([]);

const openToggleModal = () => {
  if (!canToggleManager.value) {
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

const user = ref({
  name: "Unknown",
  photo:
    "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg",
  cpf: "Unknown",
  role: { title: managerStore.role || "Unknown", id: null },
  email: "unknown@example.com",
  birthday: "00/00/0000",
  isActive: true,
});

const getUserData = async () => {
  try {
    const data = await managerStore.readOther(id);
    user.value = data;
    if (!data.photo) {
      user.value.photo =
        "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";
    }

    role.value = data.roleId;

    roles.value = roles.value.map((el) => {
      if (el.value < managerStore.role.id) {
        return { ...el, disabled: true };
      }

      return el;
    });

    permissionsRef.value = permissionsRef.value.map((el) => {
      const findPermissions = data.permissions.find((e) => {
        return e.permissionId === el.id;
      });

      if (findPermissions) {
        return {
          ...el,
          selected: true,
        };
      } else {
        return { ...el };
      }
    });

    actualPage.value = `${data.name.split(" ")[0]} Account`;
  } catch (error) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error",
      description: "There was an error loading user data.",
    });
  }
};

const getRoles = async () => {
  const data = await roleStore.listAll();
  if (data) {
    roles.value = data.map((el) => {
      return {
        name: el.title,
        value: el.id,
      };
    });
  }
};

const getPermissions = async () => {
  const data = await permissionStore.listAll();
  permissionsRef.value = data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      selected: false,
    };
  });
};

const loadPage = async () => {
  await getPermissions();
  await getRoles();
  await getUserData();
};

const toggleManager = async (status) => {
  try {
    await managerStore.toggleManager({
      managerId: user.value.publicId,
      status,
    });

    isOpenModal.value = false;
    isOpenSecondModal.value = false;

    toast.clear();
    toast.add({
      color: "green",
      title: "Success data updated.",
    });

    resetFields();
    loadPage();
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error updating user data",
    });
  }
};

const toggleItem = async (item) => {
  if (!item.type) {
    return;
  }

  if (item.type === "permission") {
    const managerHaveThisPermission = managerStore.permissions.find((el) => {
      return el.permissionId === item.id;
    });

    if (!managerHaveThisPermission) {
      toast.clear();
      toast.add({
        color: "red",
        title: "You should only edit permissions that you have.",
        description: "And you don't have this permission",
      });

      permissionsRef.value = permissionsRef.value.map((el) => {
        if (el.id === item.id) {
          return {
            ...el,
            selected: el.selected,
          };
        }

        return el;
      });
    }

    const alreadyExists = dataToUpdate.value.permissions.find((el) => {
      return el.id === item.id;
    });

    if (alreadyExists) {
      dataToUpdate.value.permissions = dataToUpdate.value.permissions.filter(
        (el) => el.id !== item.id
      );
      return;
    }

    const userAlreadyHaveThisPermission = user.value.permissions.find((el) => {
      return el.permissionId === item.id;
    });

    dataToUpdate.value.permissions.push({
      id: item.id,
      toAdd: !userAlreadyHaveThisPermission ? true : false,
      toRemove: userAlreadyHaveThisPermission ? true : false,
    });

    return;
  }

  if (item.type === "role") {
    if (+role.value === user.value.roleId) {
      dataToUpdate.value.roleId = null;
      return;
    }

    dataToUpdate.value.roleId = +role.value;
    return;
  }
};

const resetFields = () => {
  dataToUpdate.value = {
    roleId: null,
    permissions: [],
  };
  isOpenModal.value = false;
  loadPage();
};

const tryUpdate = async () => {
  if (
    !dataToUpdate.value.roleId &&
    dataToUpdate.value.permissions.length <= 0 &&
    dataToUpdate.value.roleId !== user.value.roleId
  ) {
    toast.clear();
    toast.add({
      color: "orange",
      title: "Warning",
      description: "To update user, you first need change anything.",
    });

    return;
  }

  try {
    await managerStore.updateOther(dataToUpdate.value, user.value.publicId);

    toast.clear();
    toast.add({
      color: "green",
      title: "Success data updated.",
    });

    resetFields();
    loadPage();
  } catch (e) {
    toast.clear();
    toast.add({
      color: "red",
      title: "Error updating user data",
    });
  }
};

onMounted(async () => {
  actualPage.value = `Account`;
  await loadPage();

  if (managerStore.role.id <= user.value.roleId) {
    canEdit.value = true;
  }

  const canToggle = managerStore.permissions.find(
    (el) => el.permission.code === "toggle_manager_status"
  );

  if (canToggle) {
    canToggleManager.value = true;
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

.modalItem .permissions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.modalItem .permissions li {
  /* width: 33.3%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 2px;
}

.state {
  position: absolute;
}

.state_card {
  top: 10px;
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

  @apply dark:border-gray-800 dark:bg-gray-800 dark:opacity-90 opacity-80 shadow-[0_5px_5px_hsl(var(--shadow))] text-gray-600 border-gray-200 bg-gray-100;
}

.modalItem input:not(:checked) ~ .modalPermission {
  transform: scale(0.98);
}

.modalItem input:checked ~ .modalPermission {
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
